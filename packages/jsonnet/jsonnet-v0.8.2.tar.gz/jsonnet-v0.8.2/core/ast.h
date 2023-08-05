/*
Copyright 2015 Google Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

#ifndef JSONNET_AST_H
#define JSONNET_AST_H

#include <cstdlib>

#include <iostream>
#include <string>
#include <map>
#include <vector>

#include "core/lexer.h"
#include "core/string.h"

enum ASTType {
    AST_APPLY,
    AST_ARRAY,
    AST_ARRAY_COMPREHENSION,
    AST_ARRAY_COMPREHENSION_SIMPLE,
    AST_ASSERT,
    AST_BINARY,
    AST_BUILTIN_FUNCTION,
    AST_CONDITIONAL,
    AST_ERROR,
    AST_FUNCTION,
    AST_IMPORT,
    AST_IMPORTSTR,
    AST_INDEX,
    AST_LOCAL,
    AST_LITERAL_BOOLEAN,
    AST_LITERAL_NULL,
    AST_LITERAL_NUMBER,
    AST_LITERAL_STRING,
    AST_OBJECT,
    AST_OBJECT_COMPREHENSION,
    AST_OBJECT_COMPREHENSION_SIMPLE,
    AST_SELF,
    AST_SUPER,
    AST_UNARY,
    AST_VAR
};

/** Represents a variable / parameter / field name. */
struct Identifier {
    String name;
    Identifier(const String &name)
      : name(name)
    { }
};

static inline std::ostream &operator<<(std::ostream &o, const Identifier *id)
{
    o << encode_utf8(id->name);
    return o;
}


/** All AST nodes are subtypes of this class.
 */
struct AST {
    LocationRange location;
    ASTType type;
    std::vector<const Identifier *> freeVariables;
    AST(const LocationRange &location, ASTType type)
      : location(location), type(type)
    {
    }
    virtual ~AST(void)
    {
    }
};

/** Used in Object & Array Comprehensions. */
struct ComprehensionSpec {
    enum Kind {
        FOR,
        IF
    };
    Kind kind;
    const Identifier *var;  // Null when kind != SPEC_FOR.
    AST *expr;
    ComprehensionSpec(Kind kind, const Identifier *var, AST *expr)
      : kind(kind), var(var), expr(expr)
    { }
};


/** Represents function calls. */
struct Apply : public AST {
    AST *target;
    std::vector<AST*> arguments;
    bool tailstrict;
    Apply(const LocationRange &lr, AST *target, const std::vector<AST*> &arguments, bool tailstrict)
      : AST(lr, AST_APPLY), target(target), arguments(arguments), tailstrict(tailstrict)
    { }
};

/** Represents array constructors [1, 2, 3]. */
struct Array : public AST {
    std::vector<AST*> elements;
    Array(const LocationRange &lr, const std::vector<AST*> &elements)
      : AST(lr, AST_ARRAY), elements(elements)
    { }
};

/** Represents array constructors [1, 2, 3]. */
struct ArrayComprehension : public AST {
    AST* body;
    std::vector<ComprehensionSpec> specs;
    ArrayComprehension(const LocationRange &lr, AST *body,
                       const std::vector<ComprehensionSpec> &specs)
      : AST(lr, AST_ARRAY_COMPREHENSION), body(body), specs(specs)
    { }
};

enum BinaryOp {
    BOP_MULT,
    BOP_DIV,

    BOP_PLUS,
    BOP_MINUS,

    BOP_SHIFT_L,
    BOP_SHIFT_R,

    BOP_GREATER,
    BOP_GREATER_EQ,
    BOP_LESS,
    BOP_LESS_EQ,

    BOP_MANIFEST_EQUAL,
    BOP_MANIFEST_UNEQUAL,

    BOP_BITWISE_AND,
    BOP_BITWISE_XOR,
    BOP_BITWISE_OR,

    BOP_AND,
    BOP_OR
};

static inline std::string bop_string (BinaryOp bop)
{
    switch (bop) {
        case BOP_MULT: return "*";
        case BOP_DIV: return "/";

        case BOP_PLUS: return "+";
        case BOP_MINUS: return "-";

        case BOP_SHIFT_L: return "<<";
        case BOP_SHIFT_R: return ">>";

        case BOP_GREATER: return ">";
        case BOP_GREATER_EQ: return ">=";
        case BOP_LESS: return "<";
        case BOP_LESS_EQ: return "<=";

        case BOP_MANIFEST_EQUAL: return "==";
        case BOP_MANIFEST_UNEQUAL: return "!=";

        case BOP_BITWISE_AND: return "&";
        case BOP_BITWISE_XOR: return "^";
        case BOP_BITWISE_OR: return "|";

        case BOP_AND: return "&&";
        case BOP_OR: return "||";

        default:
        std::cerr << "INTERNAL ERROR: Unrecognised binary operator: " << bop << std::endl;
        std::abort();
    }
}

/** Represents binary operators. */
struct Binary : public AST {
    AST *left;
    BinaryOp op;
    AST *right;
    Binary(const LocationRange &lr, AST *left, BinaryOp op, AST *right)
      : AST(lr, AST_BINARY), left(left), op(op), right(right)
    { }
};

/** Represents built-in functions.
 *
 * There is no parse rule to build this AST.  Instead, it is used to build the std object in the
 * interpreter.
 */
struct BuiltinFunction : public AST {
    unsigned long id;
    std::vector<const Identifier*> params;
    BuiltinFunction(const LocationRange &lr, unsigned long id,
                    const std::vector<const Identifier*> &params)
      : AST(lr, AST_BUILTIN_FUNCTION), id(id), params(params)
    { }
};

/** Represents if then else. */
struct Conditional : public AST {
    AST *cond;
    AST *branchTrue;
    AST *branchFalse;
    Conditional(const LocationRange &lr, AST *cond, AST *branchTrue, AST *branchFalse)
      : AST(lr, AST_CONDITIONAL), cond(cond), branchTrue(branchTrue), branchFalse(branchFalse)
    { }
};

/** Represents error e. */
struct Error : public AST {
    AST *expr;
    Error(const LocationRange &lr, AST *expr)
      : AST(lr, AST_ERROR), expr(expr)
    { }
};

/** Represents function calls. */
struct Function : public AST {
    std::vector<const Identifier*> parameters;
    AST *body;
    Function(const LocationRange &lr, const std::vector<const Identifier*> &parameters, AST *body)
      : AST(lr, AST_FUNCTION), parameters(parameters), body(body)
    { }
};

/** Represents import "file". */
struct Import : public AST {
    String file;
    Import(const LocationRange &lr, const String &file)
      : AST(lr, AST_IMPORT), file(file)
    { }
};

/** Represents importstr "file". */
struct Importstr : public AST {
    String file;
    Importstr(const LocationRange &lr, const String &file)
      : AST(lr, AST_IMPORTSTR), file(file)
    { }
};

/** Represents both e[e] and the syntax sugar e.f. */
struct Index : public AST {
    AST *target;
    AST *index;
    Index(const LocationRange &lr, AST *target, AST *index)
      : AST(lr, AST_INDEX), target(target), index(index)
    { }
};

/** Represents local x = e; e. */
struct Local : public AST {
    typedef std::map<const Identifier*, AST*> Binds;
    Binds binds;
    AST *body;
    Local(const LocationRange &lr, const Binds &binds, AST *body)
      : AST(lr, AST_LOCAL), binds(binds), body(body)
    { }
};

/** Represents true and false. */
struct LiteralBoolean : public AST {
    bool value;
    LiteralBoolean(const LocationRange &lr, bool value)
      : AST(lr, AST_LITERAL_BOOLEAN), value(value)
    { }
};

/** Represents the null keyword. */
struct LiteralNull : public AST {
    LiteralNull(const LocationRange &lr)
      : AST(lr, AST_LITERAL_NULL)
    { }
};

/** Represents JSON numbers. */
struct LiteralNumber : public AST {
    double value;
    LiteralNumber(const LocationRange &lr, double value)
      : AST(lr, AST_LITERAL_NUMBER), value(value)
    { }
};

/** Represents JSON strings. */
struct LiteralString : public AST {
    String value;
    LiteralString(const LocationRange &lr, const String &value)
      : AST(lr, AST_LITERAL_STRING), value(value)
    { }
};

/** Represents object constructors { f: e ... }. */
struct Object : public AST {
    struct Field {
        enum Hide {
            INHERIT,  // f: v
            HIDDEN,  // f:: v
            VISIBLE  // f::: v
        };
        AST *name;
        enum Hide hide;
        AST *body;
        Field(AST *name, enum Hide hide, AST *body)
            : name(name), hide(hide), body(body)
        { }
    };
    typedef std::list<Field> Fields;
    Fields fields;
    // These asserts are desugared to insert error throwing code, see parser.cpp.
    std::vector<AST*> asserts;
    Object(const LocationRange &lr, const Fields &fields, std::vector<AST*> asserts)
      : AST(lr, AST_OBJECT), fields(fields), asserts(asserts)
    { }
};

/** Represents object comprehension { [e]: e for x in e for.. if... }. */
struct ObjectComprehension : public AST {
    AST *field;
    AST *value;
    std::vector<ComprehensionSpec> specs;
    ObjectComprehension(const LocationRange &lr, AST *field, AST *value,
                        const std::vector<ComprehensionSpec> &specs)
                        
      : AST(lr, AST_OBJECT_COMPREHENSION), field(field), value(value), specs(specs)
    { }
};

/** Represents post-desugaring object comprehension { [e]: e for x in e }. */
struct ObjectComprehensionSimple : public AST {
    AST *field;
    AST *value;
    const Identifier *id;
    AST *array;
    ObjectComprehensionSimple(const LocationRange &lr, AST *field, AST *value,
                              const Identifier *id, AST *array)
      : AST(lr, AST_OBJECT_COMPREHENSION_SIMPLE), field(field), value(value), id(id), array(array)
    { }
};

/** Represents the self keyword. */
struct Self : public AST {
    Self(const LocationRange &lr)
      : AST(lr, AST_SELF)
    { }
};

/** Represents the super keyword. */
struct Super : public AST {
    Super(const LocationRange &lr)
      : AST(lr, AST_SUPER)
    { }
};

enum UnaryOp {
    UOP_NOT,
    UOP_BITWISE_NOT,
    UOP_PLUS,
    UOP_MINUS
};

static inline std::string uop_string (UnaryOp uop)
{
    switch (uop) {
        case UOP_PLUS: return "+";
        case UOP_MINUS: return "-";
        case UOP_BITWISE_NOT: return "~";
        case UOP_NOT: return "!";

        default:
        std::cerr << "INTERNAL ERROR: Unrecognised unary operator: " << uop << std::endl;
        std::abort();
    }
}

/** Represents unary operators. */
struct Unary : public AST {
   UnaryOp op;
    AST *expr;
    Unary(const LocationRange &lr, UnaryOp op, AST *expr)
      : AST(lr, AST_UNARY), op(op), expr(expr)
    { }
};

/** Represents variables. */
struct Var : public AST {
    const Identifier *id;
    const Identifier *original;
    Var(const LocationRange &lr, const Identifier *id)
      : AST(lr, AST_VAR), id(id), original(id)
    { }
    Var(const LocationRange &lr, const Identifier *id, const Identifier *original)
      : AST(lr, AST_VAR), id(id), original(original)
    { }
};


/** Allocates ASTs on demand, frees them in its destructor.
 */
class Allocator {
    std::map<String, const Identifier*> internedIdentifiers;
    std::vector<AST*> allocated;
    public:
    template <class T, class... Args> T* make(Args&&... args)
    {
        auto r = new T(std::forward<Args>(args)...);
        allocated.push_back(r);
        return r;
    }
    /** Returns interned identifiers.
     *
     * The location used in the Identifier AST is that of the first one parsed.
     */
    const Identifier *makeIdentifier(const String &name)
    {
        auto it = internedIdentifiers.find(name);
        if (it != internedIdentifiers.end()) {
            return it->second;
        }
        auto r = new Identifier(name);
        internedIdentifiers[name] = r;
        return r;
    }
    ~Allocator()
    {
        for (auto x : allocated) {
            delete x;
        }
        allocated.clear();
        for (auto x : internedIdentifiers) {
            delete x.second;
        }
        internedIdentifiers.clear();
    }
};

#endif  // JSONNET_AST_H
