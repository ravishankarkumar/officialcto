# Mediator Pattern

**Estimated time:** 20 minutes

**Goal:** Understand the intent, participants, structure, common use-cases, and a small code example (Python + Rust) so you can explain the pattern in an interview and implement a basic mediator in production code.

---

## 1. Motivation / When to use

When many objects interact with each other, the interaction logic can become complex and tightly coupled. The **Mediator Pattern** centralizes this interaction into a single object — the *mediator* — reducing direct dependencies between colleagues and making the system easier to maintain and evolve.

Common scenarios:
- Complex communication protocols between components (UI widgets, subsystems).
- Preventing a many-to-many object relationship explosion.
- Encapsulating control logic that doesn’t belong to any single component.

---

## 2. Intent (one-liner)

Define an object that encapsulates how a set of objects interact. Promote loose coupling by keeping objects from referring to each other explicitly, and let the mediator handle communications.

---

## 3. Participants

- **Mediator (interface / abstract):** Declares methods for communication between colleagues.
- **ConcreteMediator:** Implements mediator behavior, knows and maintains references to colleagues, coordinates interaction.
- **Colleague (interface / abstract):** Declares an interface for components that communicate through the mediator.
- **ConcreteColleague:** Implements behavior and communicates via the mediator instead of calling other colleagues directly.


---

## 4. Structure (UML-like)

```
+---------------+        uses        +------------------+
| ConcreteCol-  |<------------------>|   Mediator       |
| lague A       |                    | (ConcreteMediator)|
+---------------+                    +------------------+
        ^                                     ^
        |                                     |
+---------------+                    +------------------+
| ConcreteCol-  |                    | other colleagues |
| lague B       |                    +------------------+
+---------------+
```

Colleagues send messages to the mediator; the mediator decides which colleague(s) should receive the information and calls them.

---

## 5. Simple example (Python)

```python
from __future__ import annotations
from typing import Protocol

class Mediator(Protocol):
    def notify(self, sender: object, event: str) -> None: ...

class ConcreteMediator:
    def __init__(self):
        self._col_a = None
        self._col_b = None

    def register_a(self, col):
        self._col_a = col

    def register_b(self, col):
        self._col_b = col

    def notify(self, sender, event: str) -> None:
        if event == "A_done":
            print("Mediator reacts on A_done and triggers B.action_b().")
            self._col_b.action_b()
        elif event == "B_done":
            print("Mediator reacts on B_done and triggers A.action_a().")
            self._col_a.action_a()

class ColleagueA:
    def __init__(self, mediator: Mediator):
        self._mediator = mediator

    def action_a(self):
        print("ColleagueA does A and notifies mediator")
        self._mediator.notify(self, "A_done")

class ColleagueB:
    def __init__(self, mediator: Mediator):
        self._mediator = mediator

    def action_b(self):
        print("ColleagueB does B and notifies mediator")
        self._mediator.notify(self, "B_done")

# Usage
m = ConcreteMediator()
a = ColleagueA(m)
b = ColleagueB(m)
m.register_a(a)
m.register_b(b)

# Start chain
a.action_a()
```

**Notes:** colleagues never call each other directly; they call `mediator.notify(...)` with events or messages.

---

## 6. Compact example (Rust)

```rust
// Simple mediator in Rust using trait objects
use std::rc::Rc;
use std::cell::RefCell;

trait Mediator {
    fn notify(&self, sender: &str, event: &str);
}

struct ConcreteMediator {
    a: RefCell<Option<Rc<dyn Colleague>>>,
    b: RefCell<Option<Rc<dyn Colleague>>>,
}

impl ConcreteMediator {
    fn new() -> Self {
        Self { a: RefCell::new(None), b: RefCell::new(None) }
    }
}

impl Mediator for ConcreteMediator {
    fn notify(&self, sender: &str, event: &str) {
        if sender == "A" && event == "A_done" {
            if let Some(b) = &*self.b.borrow() {
                b.receive("Mediator: triggered B")
            }
        }
    }
}

trait Colleague {
    fn receive(&self, message: &str);
}

struct ColleagueA { mediator: Rc<dyn Mediator> }
impl Colleague for ColleagueA {
    fn receive(&self, message: &str) {
        println!("ColleagueA received: {}", message);
    }
}

// (Omitted: wiring up instances to keep snippet short for lesson)
```

**Note:** Rust example is intentionally compact; wiring requires `Rc` and borrowing. In production, prefer explicit ownership models and channels for asynchronous mediation.

---

## 7. Pros & Cons

**Pros:**
- Reduces coupling between components.
- Centralizes control logic and protocol decisions.
- Easier to change interaction logic in one place.

**Cons:**
- Mediator can become a God Object if it grows too complex.
- Adds indirection, which can make flow harder to trace unless documented.

---

## 8. Alternatives and related patterns

- **Observer:** more decentralized; observers independently react to events.
- **Facade:** simplifies interface but doesn’t manage bi-directional interactions between peers.
- **Event Bus / Pub-Sub:** decouples senders and receivers via topics; good for large distributed systems.

---

## 9. Interview checklist (what to say in 2–3 minutes)

1. State the intent: centralize interaction to reduce coupling.
2. Describe participants: Mediator + Colleagues.
3. Explain trade-offs: simpler coupling vs potential God Object.
4. Give a short example: UI widgets notifying mediator which updates other widgets.
5. End with alternatives: Observer and Pub-Sub.

---

## 10. Quick quiz (2 questions)

1. Why might you choose an event bus over a mediator? (Answer: scalability and decentralization when many producers/consumers exist.)
2. What is a primary risk when moving many responsibilities into the mediator? (Answer: it can become a God Object and hard to maintain.)

---

## 11. References / further reading
- Gamma et al., *Design Patterns: Elements of Reusable Object-Oriented Software*
- Martin Fowler — articles on Mediator / Event-driven architectures


---

*Prepared for: interview-section/design-patterns — Mediator Pattern (20 min)*

