# Visitor Pattern — 20 minute lesson

**Estimated time:** 20 minutes

**Goal:** Understand the intent, participants, structure, a small example (Python + Rust sketch), trade-offs, and how to present the pattern in an interview. Includes tips for double-dispatch, alternatives, and a short quiz.

---

## 1. Motivation / When to use

When you have a structure of objects (often an object graph or AST) and you want to perform many unrelated operations over those objects without polluting the classes of the objects themselves, the **Visitor Pattern** externalizes these operations. It enables adding new operations easily while preserving the object structure.

Common scenarios:
- Performing operations over ASTs (type checking, code generation, pretty printing).
- Traversing complex object graphs where adding methods to element classes is undesirable or impossible.
- When operations vary frequently but the object structure is stable.

---

## 2. Intent (one-liner)

Represent an operation to be performed on elements of an object structure by defining a visitor object that implements that operation for each element type.

---

## 3. Participants

- **Visitor (interface):** Declares visit methods for each ConcreteElement type (e.g., `visitConcreteA`, `visitConcreteB`).
- **ConcreteVisitor:** Implements operations for each element type.
- **Element (interface):** Declares an `accept(visitor)` method that takes a visitor.
- **ConcreteElement:** Implements `accept` by calling `visitor.visitConcreteX(this)`.
- **ObjectStructure:** A collection or composite of elements that can be traversed; it provides a way to iterate elements and accept visitors.

---

## 4. Structure (UML-like)

```
Client -> Visitor
Client -> ObjectStructure
ObjectStructure -> for each element -> element.accept(visitor)
Element.accept(visitor) -> visitor.visitConcreteX(element)
```

Double-dispatch occurs: the runtime type of the element and the visitor determine which concrete `visit` method is executed.

---

## 5. Simple example (Python)

```python
from __future__ import annotations
from typing import Protocol, List

class Visitor(Protocol):
    def visit_number(self, n: "Number") -> None: ...
    def visit_add(self, a: "Add") -> None: ...

class Element(Protocol):
    def accept(self, visitor: Visitor) -> None: ...

class Number:
    def __init__(self, value: int): self.value = value
    def accept(self, visitor: Visitor) -> None:
        visitor.visit_number(self)

class Add:
    def __init__(self, left: Element, right: Element):
        self.left = left; self.right = right
    def accept(self, visitor: Visitor) -> None:
        visitor.visit_add(self)

# Concrete visitor: evaluator
class EvalVisitor:
    def __init__(self):
        self.stack: List[int] = []

    def visit_number(self, n: Number) -> None:
        self.stack.append(n.value)

    def visit_add(self, a: Add) -> None:
        a.left.accept(self)
        a.right.accept(self)
        r = self.stack.pop(); l = self.stack.pop()
        self.stack.append(l + r)

# Usage: evaluate (1 + (2 + 3))
expr = Add(Number(1), Add(Number(2), Number(3)))
visitor = EvalVisitor()
expr.accept(visitor)
print(visitor.stack.pop())  # 6
```

**Notes:** Python lacks strict double-dispatch; the `accept` method delegates to the correct `visit_...` method.

---

## 6. Compact example (Rust sketch)

```rust
// Use enum + match in Rust for performance instead of Visitor trait objects.
// But Visitor can be implemented using traits and double-dispatch with `accept`.

trait Visitor {
    fn visit_number(&mut self, n: &Number);
    fn visit_add(&mut self, a: &Add);
}

trait Element {
    fn accept(&self, v: &mut dyn Visitor);
}

struct Number(i64);
impl Element for Number { fn accept(&self, v: &mut dyn Visitor) { v.visit_number(self) } }

struct Add(Box<dyn Element>, Box<dyn Element>);
impl Element for Add { fn accept(&self, v: &mut dyn Visitor) { v.visit_add(self) } }
```

**Note:** In Rust prefer enums for ASTs to enable exhaustive `match` checks and avoid trait-object overhead, unless extensibility across crates is needed.

---

## 7. Pros & Cons

**Pros:**
- Adding new operations is easy — create another visitor.
- Keeps element classes unchanged.
- Encapsulates related behavior in visitor classes (separation of concerns).

**Cons:**
- Adding new element types is hard — all visitor interfaces must be updated.
- Visitor may need access to element internals; you may expose extra getters or friend-like access.
- Can be verbose (one visit method per element type).

---

## 8. Implementation tips

- For language with pattern matching (Rust, Kotlin), prefer algebraic data types/enums for ASTs and `match` over Visitor unless you need open extensibility.
- Use the Visitor when the object structure is stable and operations vary.
- Keep visitors focused (single responsibility): separate visitors for evaluation, pretty-printing, optimization passes, etc.
- Use traversal helpers in ObjectStructure to centralize order (pre-order, post-order).

---

## 9. Variants & related patterns

- **Double Dispatch:** Visitor uses double-dispatch to select operation based on both visitor and element types.
- **Composite:** Often combined with Visitor to traverse tree-like structures.
- **Interpreter:** Visitor can implement evaluation or transformation over AST produced by Interpreter.

---

## 10. Interview checklist (how to explain in 2–3 minutes)

1. Intent: separate algorithms from object structure.
2. Participants: Visitor, ConcreteVisitor, Element, ConcreteElement, ObjectStructure.
3. Show quick code sketch or mention AST evaluation use-case.
4. Trade-offs: easy to add operations vs hard to add element types.
5. When to prefer other approaches: pattern matching/enums for closed hierarchies.

---

## 11. Quick quiz (2 questions)

1. When is Visitor preferable to adding methods directly to element classes? (Answer: when operations change frequently but element structure is stable.)
2. What is the major maintenance cost of Visitor? (Answer: adding a new element type requires changes across all visitors.)

---

## 12. References / further reading
- Gamma et al., *Design Patterns: Elements of Reusable Object-Oriented Software*
- Articles on AST traversal and compiler design

*Prepared for: interview-section/design-patterns — Visitor Pattern*

