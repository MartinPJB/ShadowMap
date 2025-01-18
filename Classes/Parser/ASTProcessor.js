/* Dependencies */
import LuauKeywords from "./Utils/LuauKeywords.js";

/* ASTProcessor */
export default class ASTProcessor {
    constructor(fileName, identifiersMap, robloxAPI) {
        this.allIdentifiers = identifiersMap;
        this.RobloxAPI = robloxAPI;

        identifiersMap[fileName] = {};

        this.map = identifiersMap[fileName];
        this.map.Identifiers = this.map.Identifiers || new Map();
        this.map.FilesReferences = this.map.FilesReferences || new Map();

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
     * Checks if the local statement refers to an external file (through a require)
     * @param {*} newInit
     */
    handleCallAssignment(newInit, Variables) {
        newInit.some((Statement) => {
            if (Statement.type === "CallExpression") {
                const Index = newInit.indexOf(Statement);
                const Base = Statement.base;
                const Arguments = Statement.arguments;

                if (Base.type === "Identifier" && Base.value === "require") {

                    // Refers to an external file
                    const Variable = Variables[Index];
                    if (Variable && (Variable.type == "Identifier")) {
                        const FilePath = Arguments[0];
                        let File = null;

                        // In case of :FindFirstChild or other function to find a child
                        if (FilePath.type == "CallExpression") {
                            File = FilePath.arguments[0].raw.replace(/["']|["']$/g, "");
                        }

                        // In case of a direct definition through an identifier
                        if (FilePath.type == "MemberExpression") {
                            File = FilePath.identifier.name
                        }

                        if (File) {
                            this.map.FilesReferences.set(Variable.name, File);
                        } else {
                            if (this.map.FilesReferences.has(Variable.name)) {
                                this.map.FilesReferences.delete(Variable.name);
                            }
                        }
                    }
                }
            }
        });
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
        const name = Node.name;
        const type = Node.typeAnnotation;
        let refersToFile = null;

        let newName = this.generateNewIdentifier();

        // Special cases: starts with one or two underscores like __foo or __index
        if (name.startsWith("__")) {
            newName = name;
        }

        // Keywords / globals
        if (LuauKeywords.has(name)) {
            newName = name;
        }

        // If the identifier already has been anonymized, we will use the already anonymized name
        if (this.map.Identifiers.has(name)) {
            newName = this.map.Identifiers.get(name);
        } else {
            this.map.Identifiers.set(name, newName);
        }

        // If the identifier refers to a file, we will use the file name as the new name
        if (this.map.FilesReferences.has(name)) {
            refersToFile = this.map.FilesReferences.get(name);
        }

        return {
            type: "Identifier",
            value: newName,
            typeAnnotation: Node.typeAnnotation,
            refersToFile: refersToFile,
        }
    }

    LocalStatement(Node) {
        const Variables = Node.variables;
        const Init = Node.init;

        const newInit = [];
        for (const InitStatement of Init) {
            newInit.push(this[InitStatement.type](InitStatement));
        }
        this.handleCallAssignment(newInit, Variables);

        const newVariables = [];
        for (const Variable of Variables) {
            newVariables.push(this[Variable.type](Variable));
        }

        return {
            type: "LocalStatement",
            variables: newVariables,
            init: newInit,
        };
    }

    AssignmentStatement(Node) {
        const Variables = Node.variables;
        const Init = Node.init;

        const newInit = [];
        for (const InitStatement of Init) {
            newInit.push(this[InitStatement.type](InitStatement));
        }
        this.handleCallAssignment(newInit, Variables);

        const newVariables = [];
        for (const Variable of Variables) {
            newVariables.push(this[Variable.type](Variable));
        }

        return {
            type: "AssignmentStatement",
            variables: newVariables,
            init: newInit,
        }
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
            identifier: Identifier ? this[Identifier.type](Identifier) : null,
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

    BooleanLiteral(Node) {
        return {
            type: "BooleanLiteral",
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
                let TargetedBase = Base;
                while (TargetedBase.type == "MemberExpression") {
                    TargetedBase = TargetedBase.identifier;
                }

                console.warn(`ShadowMap> Ambiguous member expression: ${TargetedBase.name}${Indexer}${Identifier.name} - This member (${Identifier.name}) belongs to classes: ${classesNames}. It has not been anonymized.`);
                newIdentifier = Identifier; // Keep it safe.
            }

            // Fallback: Check if the Identifier matches a file name in our current codebase. If it does, we're not touching it as it could likely ruin the integrity.
            if (Object.keys(this.allIdentifiers).includes(Identifier.name)) {

                /**
                 * Warning: This logic preserves identifiers that match file names in the current codebase.
                 * However, if the member is not a script or ModuleScript (e.g., `script.Parent.TextLabel`),
                 * it may still be anonymized. This happens because we can't fully contextualize the entire workspace.
                 *
                 * To avoid potential issues with anonymization, use :FindFirstChild("Name") for children like UI elements
                 * or other instances where ambiguity might occur. This ensures your references remain intact.
                 */

                console.log(`ShadowMap> Preserving member expression: '${Identifier.name}' as it matches a file name.`);
                newIdentifier = Identifier; // Keep it safe.
            }

            // Fallback: The identifier is not part of Roblox's API, but belongs to a property or a method we defined in our codebase.
            // For example, when calling ModuleScript through a require. To keep the integrity of the codebase safe, instead of anonymizing it, we'll use the
            // anonymized output of the file.
            if (newBase.refersToFile) {
                const fileItBelongsTo = this.allIdentifiers[newBase.refersToFile];
                if (fileItBelongsTo) {
                    if (fileItBelongsTo.Identifiers.has(Identifier.name)) {
                        console.log(`ShadowMap> Anonymizing member expression: '${Identifier.name}' using the anonymized output of the file ("${newBase.refersToFile}") it belongs to.`);
                        newIdentifier.value = fileItBelongsTo.Identifiers.get(Identifier.name);
                    } else {
                        console.log(`ShadowMap> ${Base.name}${Indexer}${Identifier.name} refers to a file "${newBase.refersToFile}" in our codebase, however the member ${Identifier.name} hasn't been found in it. It has not been anonymized.`);
                        newIdentifier = Identifier
                    }
                } else {
                    console.log(`ShadowMap> ${Base.name}${Indexer}${Identifier.name} refers to an external file "${newBase.refersToFile}" that wasn't found in the current codebase. Therefore, it has not been anonymized.`);
                    newIdentifier = Identifier;
                }
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

    ElseClause(Node) {
        const Body = Node.body;

        let newBody = [];
        for (const Statement of Body) {
            newBody.push(this[Statement.type](Statement));
        }

        return {
            type: "ElseClause",
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

    LogicalExpression(Node) {
        const Operator = Node.operator;
        const Left = Node.left;
        const Right = Node.right;

        return {
            type: "LogicalExpression",
            operator: Operator,
            left: this[Left.type](Left),
            right: this[Right.type](Right),
        }
    }

    IndexExpression(Node) {
        const Base = Node.base;
        const Index = Node.index;

        const newBase = this[Base.type](Base);
        const newIndex = this[Index.type](Index);

        return {
            type: "IndexExpression",
            base: newBase,
            index: newIndex,
        }
    }
}