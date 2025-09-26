# Interpreter Pattern — 20 minute lesson

**Estimated time:** 20 minutes

**Goal:** Learn the intent, participants, structure, a small example (Python + Rust sketch), trade-offs, and how to explain the pattern in an interview. Includes quick implementation tips and a short quiz.

---

## 1. Motivation / When to use

You need to evaluate sentences in a language (domain-specific language, expression language, or rule language) and want to represent grammar rules as objects. The **Interpreter Pattern** defines a representation for the grammar of a language and an interpreter that uses the representation to interpret sentences in that language.

Common scenarios:
- Expression evaluators (math, boolean expressions).
- Simple scripting inside an application (rules engines, filters).
- Query languages for custom data structures.

---

## 2. Intent (one-liner)

Given a language, define a class representation for its grammar and an interpreter that uses the representation to evaluate sentences in the language.

---

## 3. Participants

- **AbstractExpression (interface):** Declares an `interpret(context)` method.
- **TerminalExpression:** Implements an interpretation for terminal symbols (numbers, variables).
- **NonterminalExpression:** Implements interpretation for grammar rules (operations, combinations).
- **Context:** Holds global information required during interpretation (variables, input tokens).
- **Client:** Builds the abstract syntax tree (AST) and invokes `interpret` on the root.

---

## 4. Structure (UML-like)

```
         +----------------+
         |   Client       |
         +-------+--------+
                 |
                 v
         +-------+--------+      contains
         | NonTerminalExp |-----> [TerminalExp | NonTerminalExp]
         +----------------+
                 |
                 v
         interpret(context)
```

Clients build a tree of expression objects representing the parsed sentence and then call `interpret` on the root node.

---

## 5. Simple example (Python)

```python
from __future__ import annotations
from typing import Dict

class Context:
    def __init__(self, vars: Dict[str, int]):
        self.vars = vars

class Expression:
    def interpret(self, context: Context) -> int:
        raise NotImplementedError

class Number(Expression):
    def __init__(self, value: int):
        self.value = value
    def interpret(self, context: Context) -> int:
        return self.value

class Variable(Expression):
    def __init__(self, name: str):
        self.name = name
    def interpret(self, context: Context) -> int:
        return context.vars[self.name]

class Add(Expression):
    def __init__(self, left: Expression, right: Expression):
        self.left = left; self.right = right
    def interpret(self, context: Context) -> int:
        return self.left.interpret(context) + self.right.interpret(context)

# Usage: interpret (x + 3) where x=4
ctx = Context({'x': 4})
expr = Add(Variable('x'), Number(3))
print(expr.interpret(ctx))  # prints 7
```

**Notes:** This example manually builds an AST. In real-world interpreters you'd typically parse a string into the AST.

---

## 6. Compact example (Rust sketch)

```rust
// Sketch: trait-based interpreter for arithmetic expressions
trait Expression {
    fn interpret(&self, ctx: &Context) -> i64;
}

struct Number(i64);
impl Expression for Number { fn interpret(&self, _ctx:&Context) -> i64 { self.0 } }

struct Add(Box<dyn Expression>, Box<dyn Expression>);
impl Expression for Add { fn interpret(&self, ctx:&Context)-> i64 { self.0.interpret(ctx) + self.1.interpret(ctx) } }

// Context holds variable bindings (HashMap)
```

**Note:** Rust requires `Box<dyn Expression>` for heterogenous AST nodes. For performance, use enums with variants for each node type.

---

## 7. Pros & Cons

**Pros:**
- Cleanly maps grammar to object structure; easy to extend with new expressions.
- Suits small DSLs and simple expression evaluation.

**Cons:**
- Can be inefficient and verbose for complex grammars.
- Building and maintaining a large interpreter manually is error-prone—parser generators or compiler toolkits are preferred for non-trivial languages.

---

## 8. Implementation tips

- For non-trivial languages, separate parsing (lexer + parser) from interpretation.
- Use enums/unions (Rust, Kotlin sealed classes) for performance and exhaustive matching instead of trait objects where possible.
- Cache intermediate results for repeated sub-expressions if evaluation cost is high.
- Consider compiling AST to bytecode for repeated evaluation scenarios.

---

## 9. Alternatives and related patterns

- **Parser generators / Compiler toolkits:** ANTLR, LALR/Yacc — better for complex languages.
- **Visitor pattern:** Useful to implement operations over ASTs (evaluation, pretty-print, transformation).
- **Strategy:** If you only need a few interchangeable evaluation strategies, Strategy may be simpler.

---

## 10. Interview checklist (how to explain in 2–3 minutes)

1. State the intent: map grammar to objects and evaluate sentences.
2. Explain participants: AbstractExpression, Terminal/Nonterminal, Context, Client.
3. Give a short example: arithmetic expression interpreter.
4. Discuss trade-offs: quick for small DSLs, heavy for complex languages.
5. Mention parser generators as the pragmatic alternative for non-trivial grammars.

---

## 11. Quick quiz (2 questions)

1. What role does the Context play? (Answer: holds variable bindings and shared state needed during interpretation.)
2. Why might you prefer a parser generator over the Interpreter Pattern for a big language? (Answer: parser generators handle lexing/parsing and produce robust ASTs; Interpreter Pattern becomes verbose and error-prone for complex grammars.)

---

## 12. References / further reading
- Gamma et al., *Design Patterns: Elements of Reusable Object-Oriented Software*
- AppDev articles / tutorials on building simple expression interpreters
- Parser generators (ANTLR, Lark) and compiler design texts

*Prepared for: interview-section/design-patterns — Interpreter Pattern*