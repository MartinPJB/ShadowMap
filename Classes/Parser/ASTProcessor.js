/* Dependencies */
import LuauKeywords from "./Utils/LuauKeywords.js";

/* ASTProcessor */
export default class ASTProcessor {
    constructor(fileName, identifiersMap, robloxAPI) {
        this.allIdentifiers = identifiersMap;
        this.RobloxAPI = robloxAPI;

        identifiersMap[fileName] = {};

        this.map = identifiersMap[fileName];
        this.variableCounter = 0
    }

    /**
     * Generates a new random identifier string in order to anonymize the original identifier.
     * @returns {string} - A random string of 22 characters
     */
    generateNewIdentifier = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const allChars = chars + "0123456789";
        let result = chars[Math.floor(Math.random() * chars.length)];
        for (let i = 0; i < 21; i++) {
            result += allChars[Math.floor(Math.random() * allChars.length)];
        }
        return result;
    }


    /**
     *
     * @param {*} typeAnnotation
     * @returns
     */
    collectTypeAnnotations(typeAnnotation) {
        const types = [];

        function traverse(annotation) {
            if (!annotation) return;
            switch (annotation.type) {
                case "TypeAnnotation":
                    types.push(annotation.typeAnnotation);
                    break;

                case "UnionTypeAnnotation":
                    for (const subAnnotation of annotation.types) {
                        traverse(subAnnotation);
                    }
                    break;

                case "NullableTypeAnnotation":
                    traverse(annotation.typeAnnotation);
                    break;

                default:
                    // Other annotation types can be handled here if needed
                    break;
            }
        }

        traverse(typeAnnotation);
        return types;
    }


    /**
     *
     * @param {*} BaseType
     * @param {*} Identifier
     * @returns
     */
    isIdentifierInRobloxAPI(BaseType, Identifier) {
        const types = this.collectTypeAnnotations(BaseType);

        for (const type of types) {
            const classInfo = this.RobloxAPI.getClassByName(type);
            if (classInfo && this.RobloxAPI.getClassMemberByName(classInfo.Name, Identifier.name)) {
                return true;
            }
        }

        return false;
    }


    /**
     * Handles any Identifier node in the AST and proceeds to anonymize it using `generateNewIdentifier`.
     * @param {*} Node - The node to process
     * @returns - The anonymized node
     */
    Identifier(Node) {
        this.map.Identifiers = this.map.Identifiers || new Map();

        const name = Node.name;
        const type = Node.typeAnnotation;

        let newName = this.generateNewIdentifier();

        // Special cases: starts with one or two underscores like __foo or __index
        if (name.startsWith("__")) {
            newName = name;
        }

        // Keywords / globals
        if (LuauKeywords.has(name)) {
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
        const { indexer: Indexer, identifier: Identifier, base: Base } = Node;

        const newBase = this[Base.type](Base);
        let newIdentifier = this[Identifier.type](Identifier);

        // Process Base type annotation for Roblox API checks
        const BaseType = Base.typeAnnotation;
        const isBaseRobloxAPI = BaseType && BaseType !== "any" && BaseType !== "unknown";

        if (isBaseRobloxAPI && this.isIdentifierInRobloxAPI(BaseType, Identifier)) {
            newIdentifier = Identifier; // Keep it safe as it belongs to Roblox's API.
        } else {
            // Fallback: Check if the Identifier belongs to any Roblox API class
            const isIdentifierPartOfRobloxAPI = this.RobloxAPI.getClassesThatGotMemberByName(Identifier.name);
            if (isIdentifierPartOfRobloxAPI?.length > 0) {
                const classesNames = isIdentifierPartOfRobloxAPI.join(", ");
                console.warn(`ShadowMap> Ambiguous member expression: ${Base.name}${Indexer}${Identifier.name} - This member (${Identifier.name}) belongs to classes: ${classesNames}. It has not been anonymized.`);
                newIdentifier = Identifier; // Keep it safe.
            }
        }

        return {
            type: "MemberExpression",
            indexer: Indexer,
            identifier: newIdentifier,
            base: newBase,
        };
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