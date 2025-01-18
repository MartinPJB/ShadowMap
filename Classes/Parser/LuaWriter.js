/* LuaWriter */
export default class LuaWriter {
    constructor() {
        this.visited = new Set();
    }



    write(node, indent = 0) {
        if (!node) return "";
        if (this.visited.has(node)) throw new Error("Cyclic structure detected in AST");
        this.visited.add(node);

        const indentStr = "    ".repeat(indent);

        // TODO: Turn this switch statement into multiple methods
        switch (node.type) {
            case "Chunk":
                return node.body.map((n) => this.write(n, indent)).join("\n");

            case "LocalStatement":
                const variables = node.variables.map((v) => this.write(v, indent)).join(", ");
                const init = node.init ? ` = ${node.init.map((i) => this.write(i, indent)).join(", ")}` : "";
                return `${indentStr}local ${variables}${init}`;

            case "AssignmentStatement":
                return `${indentStr}${node.variables.map((v) => this.write(v, indent)).join(", ")} = ${node.init.map((i) => this.write(i, indent)).join(", ")}`;

            case "FunctionDeclaration":
                const functionName = this.write(node.identifier, indent);
                const params = node.parameters.map((p) => this.write(p, indent)).join(", ");
                const body = node.body.map((b) => this.write(b, indent + 1)).join("\n");
                return `${indentStr}${node.isLocal ? "local " : ""}function ${functionName}(${params})\n${body}\n${indentStr}end`;

            case "ReturnStatement":
                return `${indentStr}return ${node.arguments.map((a) => this.write(a, indent)).join(", ")}`;

            case "ContinueStatement":
                return `${indentStr}continue`;

            case "BreakStatement":
                return `${indentStr}break`;

            case "LogicalExpression":
            case "BinaryExpression":
                return `(${this.write(node.left, indent)} ${node.operator} ${this.write(node.right, indent)})`;

            case "IndexExpression":
                return `(${this.write(node.base, indent)}[${this.write(node.index, indent)}])`;

            case "CallStatement":
                return `${indentStr}${this.write(node.expression, indent)}`;

            case "CallExpression":
                return `${this.write(node.base, indent)}(${node.arguments.map((a) => this.write(a, indent)).join(", ")})`;

            case "MemberExpression":
                return `${this.write(node.base, indent)}${node.indexer}${this.write(node.identifier, indent)}`;

            case "TableConstructorExpression":
                return `{ ${node.fields.map((f) => this.write(f, indent)).join(", ")} }`;

            case "TableKeyString":
                return `${this.write(node.key, indent)} = ${this.write(node.value, indent)}`;

            case "IfStatement":
                return this.writeIfStatement(node, indent);

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

            case "UnaryExpression":
                return `${node.operator} ${this.write(node.argument, indent)}`;

            case "DoStatement":
                return `${indentStr}do\n${node.body.map((b) => this.write(b, indent + 1)).join("\n")}\n${indentStr}end`;

            case "RepeatStatement":
                return `${indentStr}repeat\n${node.body.map((b) => this.write(b, indent + 1)).join("\n")}\n${indentStr} until ${this.write(node.condition, indent)}`;

            case "ForGenericStatement":
                const _variables = node.variables.map((it) => this.write(it, indent)).join(", ");
                const iterators = node.iterators.map((it) => this.write(it, indent)).join(", ");
                const forBody = node.body.map((b) => this.write(b, indent + 1)).join("\n");
                return `${indentStr}for ${_variables} in ${iterators} do\n${forBody}\n${indentStr}end`;

            case "ForNumericStatement":
                const variable = this.write(node.variable, indent);
                const start = this.write(node.start, indent);
                const end = this.write(node.end, indent);
                const step = this.write(node.step, indent);
                const _forBody = node.body.map((b) => this.write(b, indent + 1)).join("\n");
                return `${indentStr}for ${variable} = ${start}, ${end}, ${step} do\n${_forBody}\n${indentStr}end`;

            default:
                return `${indentStr}-- Unknown node type: ${node.type}`;
        }
    }

    writeIfStatement(node, indent) {
        const indentStr = "    ".repeat(indent);
        let result = "";

        node.clauses.forEach((clause, index) => {
            if (clause.type === "IfClause") {
                const condition = this.write(clause.condition, indent);
                const body = clause.body.map((b) => this.write(b, indent + 1)).join("\n");
                result += `${index === 0 ? `${indentStr}if` : `${indentStr}elseif`} ${condition} then\n${body}\n`;
            } else if (clause.type === "ElseClause") {
                const body = clause.body.map((b) => this.write(b, indent + 1)).join("\n");
                result += `${indentStr}else\n${body}\n`;
            }
        });

        result += `${indentStr}end`; // Append "end" once for the whole statement.
        return result;
    }
}
