/* Dependencies */
import fs from "fs";
import path from "path";
import luaparse from "luaparse";


/* Variables */
const AnonymizerMap = {};
import LuaReserved from "./LuaElements/LuaReserved.js";
import Roblox from "./LuaElements/Roblox.js";


/* Helper Funcs */
function writeLua(node, indent = 0, visited = new Set()) {
    if (!node) return "";
    if (visited.has(node)) throw new Error("Cyclic structure detected in AST");
    visited.add(node);

    const indentStr = "    ".repeat(indent);

    switch (node.type) {
        case "Chunk":
            return node.body.map((n) => writeLua(n, indent, new Set(visited))).join("\n");

        case "LocalStatement":
            const variables = node.variables.map((v) => writeLua(v, indent, new Set(visited))).join(", ");
            const init = node.init ? ` = ${node.init.map((i) => writeLua(i, indent, new Set(visited))).join(", ")}` : "";
            return `${indentStr}local ${variables}${init}`;

        case "AssignmentStatement":
            return `${indentStr}${node.variables.map((v) => writeLua(v, indent, new Set(visited))).join(", ")} = ${node.init.map((i) => writeLua(i, indent, new Set(visited))).join(", ")}`;

        case "FunctionDeclaration":
            const functionName = writeLua(node.identifier, indent, new Set(visited));
            const params = node.parameters.map((p) => writeLua(p, indent, new Set(visited))).join(", ");
            const body = node.body.map((b) => writeLua(b, indent + 1, new Set(visited))).join("\n");
            return `${indentStr}${node.isLocal ? "local " : ""}function ${functionName}(${params})\n${body}\n${indentStr}end`;

        case "ReturnStatement":
            return `${indentStr}return ${node.arguments.map((a) => writeLua(a, indent, new Set(visited))).join(", ")}`;

        case "BinaryExpression":
            return `${writeLua(node.left, indent, new Set(visited))} ${node.operator} ${writeLua(node.right, indent, new Set(visited))}`;

        case "CallStatement":
            return `${indentStr}${writeLua(node.expression, indent, new Set(visited))}`;

        case "CallExpression":
            return `${writeLua(node.base, indent, new Set(visited))}(${node.arguments.map((a) => writeLua(a, indent, new Set(visited))).join(", ")})`;

        case "MemberExpression":
            return `${writeLua(node.base, indent, new Set(visited))}${node.indexer}${writeLua(node.identifier, indent, new Set(visited))}`;

        case "TableConstructorExpression":
            return `{ ${node.fields.map((f) => writeLua(f, indent, new Set(visited))).join(", ")} }`;

        case "TableKeyString":
            return `${writeLua(node.key, indent, new Set(visited))} = ${writeLua(node.value, indent, new Set(visited))}`;

        case "IfStatement":
            return node.clauses.map((clause, i) => writeLua(clause, i === 0 ? indent : indent + 1, new Set(visited))).join(`\n`);

        case "IfClause":
            const ifBody = node.body.map((b) => writeLua(b, indent + 1, new Set(visited))).join("\n");
            return `${indentStr}if ${writeLua(node.condition, indent, new Set(visited))} then\n${ifBody}\n${indentStr}end`;

        case "Identifier":
            return node.name || node.value || "undefined";

        case "StringLiteral":
            return node.raw || `"${node.value}"`;

        case "NumericLiteral":
            return node.value;

        case "BooleanLiteral":
            return node.value ? "true" : "false";

        case "NilLiteral":
            return "nil";

        default:
            return `${indentStr}-- Unknown node type: ${node.type}`;
    }
}


/* Classes */
class NodesProcessor {
    constructor(fileName) {
        AnonymizerMap[fileName] = {};

        this.map = AnonymizerMap[fileName];
        this.variableCounter = 0
    }

    generateVariableName = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const allChars = chars + "0123456789";
        let result = chars[Math.floor(Math.random() * chars.length)];
        for (let i = 0; i < 21; i++) {
            result += allChars[Math.floor(Math.random() * allChars.length)];
        }
        return result;
    }

    LocalStatement(Node) {
        const Variables = Node.variables;
        const Init = Node.init;

        const result = {
            type: "LocalStatement",
            variables: [],
            init: [],
        }

        for (const Variable of Variables) {
            result.variables.push(this[Variable.type](Variable));
        }

        for (const InitStatement of Init) {
            result.init.push(this[InitStatement.type](InitStatement));
        }

        return result;
    }

    AssignmentStatement(Node) {
        const Variables = Node.variables;
        const Inits = Node.init;

        const result = {
            type: "AssignmentStatement",
            variables: [],
            init: [],
        }

        for (const Variable of Variables) {
            result.variables.push(this[Variable.type](Variable));
        }

        for (const InitStatement of Inits) {
            result.init.push(this[InitStatement.type](InitStatement));
        }

        return result;
    }

    FunctionDeclaration(Node) {
        let Type = Node.type;
        let Identifier = Node.identifier;
        let Parameters = Node.parameters;
        let Body = Node.body;
        let IsLocal = Node.isLocal;

        let newParameters = [];
        for (const Parameter of Parameters) {
            newParameters.push(this[Parameter.type](Parameter));
        }

        let newBody = [];
        for (const Statement of Body) {
            newBody.push(this[Statement.type](Statement));
        }

        return {
            type: "FunctionDeclaration",
            type: Type,
            identifier: this[Identifier.type](Identifier),
            parameters: newParameters,
            isLocal: IsLocal,
            body: newBody,
        }
    }

    Identifier(Node) {
        this.map.Identifiers = this.map.Identifiers || new Map();

        const name = Node.name;
        let newName = this.generateVariableName();
        let avoidAnonymizeNext = false;

        // Special cases: starts with one or two underscores like __foo or __index
        if (name.startsWith("__")) {
            newName = name;
        }

        // If it is part of the whitelist
        // TODO: Make this so it detects if the identifier was made through a variable and isn't directly referencing the type.
        if (LuaReserved.has(name) || Roblox.has(name)) {
            newName = name;
            avoidAnonymizeNext = true;
        }

        if (this.map.Identifiers.has(name)) {
            newName = this.map.Identifiers.get(name);
        } else {
            this.map.Identifiers.set(name, newName);
        }

        return {
            type: "Identifier",
            value: newName,
            avoidAnonymizeNext: avoidAnonymizeNext
        }
    }

    MemberExpression(Node) {
        const Indexer = Node.indexer;
        const Identifier = Node.identifier;
        const Base = Node.base;

        return {
            type: "MemberExpression",
            identifier: this[Identifier.type](Identifier),
            base: this[Base.type](Base),
            indexer: Indexer,
        }
    }

    TableConstructorExpression(Node) {
        const fields = Node.fields;
        const result = [];

        for (const Field of fields) {
            result.push(this[Field.type](Field));
        }

        return {
            type: "TableConstructorExpression",
            fields: result,
        }
    }

    TableKeyString(Node) {
        const key = Node.key;
        const value = Node.value;
        const result = {
            type: "TableKeyString",
        }

        result.key = this[key.type](key);
        result.value = this[value.type](value);

        return result;
    }

    StringLiteral(Node) {
        return {
            type: "StringLiteral",
            value: Node.value,
            raw: Node.raw,
        }
    }

    ReturnStatement(Node) {
        const Arguments = Node.arguments;
        const newArguments = [];

        for (const Argument of Arguments) {
            newArguments.push(this[Argument.type](Argument));
        }

        return {
            type: "ReturnStatement",
            arguments: newArguments,
        }
    }

    BinaryExpression(Node) {
        const left = Node.left;
        const right = Node.right;
        const operator = Node.operator;

        return {
            type: "BinaryExpression",
            left: this[left.type](left),
            right: this[right.type](right),
            operator: operator,
        }
    }

    CallExpression(Node) {
        const Base = Node.base;
        const Arguments = Node.arguments;
        const newArguments = [];

        for (const Argument of Arguments) {
            newArguments.push(this[Argument.type](Argument));
        }

        return {
            type: "CallExpression",
            base: this[Base.type](Base),
            arguments: newArguments,
        }
    }

    MemberExpression(Node) {
        const Indexer = Node.indexer;
        const Identifier = Node.identifier;
        const Base = Node.base;

        const newBase = this[Base.type](Base);
        let newIdentifier = null;
        if (!newBase.avoidAnonymizeNext) {
            newIdentifier = this[Identifier.type](Identifier);
        } else {
            newIdentifier = Identifier
        }

        return {
            type: "MemberExpression",
            indexer: Indexer,
            identifier: newIdentifier,
            base: newBase,
        }
    }

    IfStatement(Node) {
        const Clauses = Node.clauses;

        let newClauses = [];
        for (const Clause of Clauses) {
            newClauses.push(this[Clause.type](Clause));
        }

        return {
            type: "IfStatement",
            clauses: newClauses,
        }
    }

    IfClause(Node) {
        const Condition = Node.condition;
        const Body = Node.body;

        let newBody = [];
        for (const Statement of Body) {
            newBody.push(this[Statement.type](Statement));
        }

        return {
            type: "IfClause",
            condition: this[Condition.type](Condition),
            body: Body,
        }
    }

    CallStatement(Node) {
        const Expression = Node.expression;

        return {
            type: "CallStatement",
            expression: this[Expression.type](Expression),
        }
    }

    CallExpression(Node) {
        const Arguments = Node.arguments;
        const Base = Node.base;

        let newArguments = [];
        for (const Argument of Arguments) {
            newArguments.push(this[Argument.type](Argument));
        }

        return {
            type: "CallExpression",
            base: this[Base.type](Base),
            arguments: newArguments,
        }
    }
}


class Anonymizer {
    constructor(filesPath) {
        this.path = filesPath;
    }

    processLua(fileName, content) {
        const nodesProcessor = new NodesProcessor(fileName);

        // Process content before by removing type definitions as luaparse does not support them
        content = content.replace(/--\[\[[\s\S]*?\]\]/gm, "");
        content = content.replace(/--.*|--\[\[[\s\S]*?\]\]/gm, "");
        content = content.replace(/:\s!*([A-Za-z_][A-Za-z0-9_]*\??|{.*?})/gm, "");

        const AST = luaparse.parse(content);
        const ModifiedAST = {
            type: "Chunk",
            body: [],
        };

        if (!AST || AST.type != "Chunk") throw new Error("Couldn't process lua content.");

        const Body = AST.body;
        for (const node of Body) {
            if (nodesProcessor[node.type]) {
                ModifiedAST.body.push(nodesProcessor[node.type](node));
            } else {
                console.log(`Unsupported node type: ${node.type} -`, node);
            }
        }

        return {
            ModifiedAST: ModifiedAST,
        }
    }

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

                // Write modified ast in a json file named "map.json"
                fs.writeFileSync("./map.json", JSON.stringify(ModifiedAST, null, 4));

                const modifiedContent = writeLua(ModifiedAST);

                const outputFolder = path.join("./Build");
                if (!fs.existsSync(outputFolder)) {
                    fs.mkdirSync(outputFolder, { recursive: true });
                }

                fs.writeFileSync(path.join(outputFolder, `${fileName}.lua`), modifiedContent);
            }
        }
    }
}


const anonymizer = new Anonymizer("./tests/");
anonymizer.processPath();
