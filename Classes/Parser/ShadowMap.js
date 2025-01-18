/* Dependencies */
import fs from "fs";
import path from "path";
import luaparse from "../../Deps/luaparse/luaparse.js";
import crypto from "crypto";

import ASTProcessor from "./ASTProcessor.js";
import LuaWriter from "./LuaWriter.js";
import RobloxAPI from "../Roblox/RobloxAPI.js";


/* Helper functions */
function generateRandomBigInt(digits) {
    const min = 10n ** (BigInt(digits) - 1n);
    const max = 10n ** BigInt(digits) - 1n;

    const randomBuffer = new Uint8Array(8); // 8 bytes = 64 bits
    crypto.getRandomValues(randomBuffer);

    let randomBigInt = 0n;
    for (let i = 0; i < randomBuffer.length; i++) {
        randomBigInt = (randomBigInt << 8n) | BigInt(randomBuffer[i]);
    }

    // Scale the random number to the desired range
    const range = max - min;
    randomBigInt = (randomBigInt % (range + 1n)) + min;

    return randomBigInt;
}


/* Variables*/
const Key53 = generateRandomBigInt(16);
const Key14 = Math.floor(Math.random() * 10000);
const inv256 = (() => {
    const inverses = [];
    for (let M = 0; M < 128; M++) {
        let inv = -1;
        do {
            inv += 2;
        } while ((inv * (2 * M + 1)) % 256 !== 1);
        inverses[M] = inv;
    }
    return inverses;
})();


/* ShadowMap */
class ShadowMap {
    constructor(filesPath) {
        this.fullMap = {};
        this.identifiersMap = {};
        this.path = filesPath;
        this.RobloxAPI = new RobloxAPI();
    }

    /**
     *
     * @param {string} str
     * @returns
     */
    encode(str) {
        let K = Key53;
        const F = 16384n + BigInt(Key14);
        return Array.from(str)
            .map((m) => {
                const L = K % 274877906944n; // 2^38
                const H = (K - L) / 274877906944n;
                const M = Number(H % 128n);
                const c = (BigInt(m.charCodeAt(0)) * BigInt(inv256[M]) - (H - BigInt(M)) / 128n) % 256n;
                K = L * F + H + c + BigInt(m.charCodeAt(0));
                return c.toString(16).padStart(2, "0");
            })
            .join("");
    }

    /**
     * Processes the AST of a Lua file.
     * @param {string} fileName - The name of the file to be processed.
     * @param {string} content - The content of the file to be processed.
     * @returns - Modified AST.
     */
    processLua(fileName, content) {
        console.log(`ShadowMap> Processing ${fileName}.lua`);

        const injectedFunction = `local a = string.char
local b = tonumber
function decode(str, Key53, Key14)
	local K, F = Key53, 16384 + Key14
	return (str:gsub('%x%x',
		function(c)
			local L = K % 274877906944
			local H = (K - L) / 274877906944
			local M = H % 128
			c = b(c, 16)
			local m = (c + (H - M) / 128) * (2*M + 1) % 256
			K = L * F + H + c + m
			return a(m)
		end
	))
end
`;

        content = injectedFunction + content;

        const astProcessor = new ASTProcessor(fileName, this.identifiersMap, this.RobloxAPI);

        /* Modifies the content to fit our modified luaparse */
        // Translates compbound assignments to binary expressions
        content = content.replace(/(\w+)\s*([\+\-\*\/%\^]=)\s*(.+)/g, (_, variable, operator, expression) => {
            const op = operator.slice(0, -1);
            return `${variable} = ${variable} ${op} ${expression}`;
        });

        // Translates strings to decode calls
        content = content.replace(/"([^"]*)"/gm, (match, capturedString) => {
            const encryptedString = this.encode(capturedString);
            return `decode("${encryptedString}", ${Key53}, ${Key14})`;
        });


        /* Parses */
        const AST = luaparse.parse(content);
        const ModifiedAST = {
            type: "Chunk",
            body: [],
        };

        if (!AST || AST.type != "Chunk") throw new Error("Couldn't process lua content.");

        const Body = AST.body;
        for (const node of Body) {
            if (astProcessor[node.type]) {
                ModifiedAST.body.push(astProcessor[node.type](node));
            } else {
                console.log(`Unsupported node type: ${node.type} -`, node);
            }
        }

        return {
            ModifiedAST: ModifiedAST,
        }
    }


    /**
     * Processes a path of Lua files.
     */
    async processPath() {
        // Inits Roblox's API
        const resp = await this.RobloxAPI.init();

        const files = await fs.readdirSync(this.path);
        for (const f of files) {
            const fullPath = path.join(this.path, f);
            if (fs.statSync(fullPath).isDirectory()) {
                this.processPath(fullPath);
                continue;
            }

            if (f.endsWith(".lua")) {
                const fileName = f.split(".lua")[0];
                const content = fs.readFileSync(fullPath, "utf-8");

                const { ModifiedAST } = this.processLua(fileName, content);
                const luaWriter = new LuaWriter()
                const modifiedContent = luaWriter.write(ModifiedAST);

                this.fullMap[fileName] = ModifiedAST;

                const outputFolder = path.join("./Build");
                if (!fs.existsSync(outputFolder)) {
                    fs.mkdirSync(outputFolder, { recursive: true });
                }

                fs.writeFileSync(path.join(outputFolder, `${fileName}.lua`), modifiedContent);
            }
        }

        // Writes the full map to a file.
        fs.writeFileSync("./map.json", JSON.stringify(this.fullMap, null, 4));
    }
}

export default ShadowMap;