/* Dependencies */
import fs from "fs";
import path from "path";
import luaparse from "../../Deps/luaparse/luaparse.js";

import ASTProcessor from "./ASTProcessor.js";
import LuaWriter from "./LuaWriter.js";


/* ShadowMap */
class ShadowMap {
    constructor(filesPath) {
        this.fullMap = {};
        this.identifiersMap = {};
        this.path = filesPath;
    }

    /**
     * Processes the AST of a Lua file.
     * @param {string} fileName - The name of the file to be processed.
     * @param {string} content - The content of the file to be processed.
     * @returns - Modified AST.
     */
    processLua(fileName, content) {
        console.log(`ShadowMap> Processing ${fileName}.`);

        const astProcessor = new ASTProcessor(fileName, this.identifiersMap);

        /* Modifies the content to fit our modified luaparse */
        // Translates compbound assignments to binary expressions
        content = content.replace(/(\w+)\s*([\+\-\*\/%\^]=)\s*(.+)/g, (_, variable, operator, expression) => {
            const op = operator.slice(0, -1);
            return `${variable} = ${variable} ${op} ${expression}`;
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
    processPath() {
        const files = fs.readdirSync(this.path);
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