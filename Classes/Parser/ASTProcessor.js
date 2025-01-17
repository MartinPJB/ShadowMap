/* Dependencies */
import LuaReserved from "../Roblox/LuaReserved.js";

/* ASTProcessor */
export default class ASTProcessor {
    constructor(fileName, identifiersMap) {
        this.allIdentifiers = identifiersMap

        identifiersMap[fileName] = {};

        this.map = identifiersMap[fileName];
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

        const newVariables = [];
        for (const Variable of Variables) {
            newVariables.push(this[Variable.type](Variable));
        }

        const newInit = [];
        for (const InitStatement of Init) {
            newInit.push(this[InitStatement.type](InitStatement));
        }

        return {
            type: "LocalStatement",
            variables: newVariables,
            init: newInit,
        };
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
        let ReturnType = Node.returnType;

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
            returnType: ReturnType,
        }
    }

    Identifier(Node) {
        this.map.Identifiers = this.map.Identifiers || new Map();

        const name = Node.name;
        let newName = this.generateVariableName();

        // Special cases: starts with one or two underscores like __foo or __index
        if (name.startsWith("__")) {
            newName = name;
        }

        // If it is part of the whitelist
        // TODO: Make this so it detects if the identifier was made through a variable and isn't directly referencing the type.
        if (LuaReserved.has(name)) {
            newName = name;
        }

        if (this.map.Identifiers.has(name)) {
            newName = this.map.Identifiers.get(name);
        } else {
            this.map.Identifiers.set(name, newName);
        }

        return {
            type: "Identifier",
            value: newName,
            typeAnnotation: Node.typeAnnotation,
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

    NumericLiteral(Node) {
        return {
            type: "NumericLiteral",
            value: Node.value,
            raw: Node.raw,
        }
    }

    NilLiteral(Node) {
        return {
            type: "NilLiteral",
            value: "nil",
            raw: "nil",
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
        const newIdentifier = this[Identifier.type](Identifier);

        return {
            type: "MemberExpression",
            indexer: Indexer,
            identifier: newIdentifier,
            base: newBase,
        }
    }

    CallStatement(Node) {
        return {
            type: "CallStatement",
            expression: Node.expression,
        }
    }

    ForGenericStatement(Node) {
        const Variables = Node.variables;
        const Iterators = Node.iterators;
        const Body = Node.body;

        let newVariables = [];
        for (const Variable of Variables) {
            newVariables.push(this[Variable.type](Variable));
        }

        let newIterators = [];
        for (const Iterator of Iterators) {
            newIterators.push(this[Iterator.type](Iterator));
        }

        let newBody = [];
        for (const Statement of Body) {
            newBody.push(this[Statement.type](Statement));
        }

        return {
            type: "ForGenericStatement",
            variables: newVariables,
            iterators: newIterators,
            body: newBody,
        }
    }

    ForNumericStatement(Node) {
        const Variable = Node.variable;
        const Start = Node.start;
        const End = Node.end;
        const Step = Node.step;
        const Body = Node.body;

        let newBody = [];
        for (const Statement of Body) {
            newBody.push(this[Statement.type](Statement));
        }

        return {
            type: "ForNumericStatement",
            variable: this[Variable.type](Variable),
            start: Start,
            end: End,
            step: Step,
            body: newBody,
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
            body: newBody,
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

    ContinueStatement(Node) {
        return {
            type: "ContinueStatement",
        }
    }

    BreakStatement(Node) {
        return {
            type: "BreakStatement",
        }
    }

    UnaryExpression(Node) {
        const Operator = Node.operator;
        const Argument = Node.argument;

        const newArgument = this[Argument.type](Argument);

        return {
            type: "UnaryExpression",
            operator: Operator,
            argument: newArgument,
        }
    }

    RepeatStatement(Node) {
        const Condition = Node.condition;
        const Body = Node.body;

        const newCondition = this[Condition.type](Condition)
        const newBody = [];
        for (const Statement of Body) {
            newBody.push(this[Statement.type](Statement));
        }

        return {
            type: "RepeatStatement",
            condition: newCondition,
            body: newBody,
        }
    }

    DoStatement(Node) {
        const Body = Node.body;

        const newBody = [];
        for (const Statement of Body) {
            newBody.push(this[Statement.type](Statement));
        }

        return {
            type: "DoStatement",
            body: newBody,
        }
    }
}