# Memento Pattern — 20 minute lesson

**Estimated time:** 20 minutes

**Goal:** Learn intent, participants, structure, simple examples (Python + Rust sketch), trade-offs, and how to explain the pattern quickly in an interview. Includes a short quiz and suggestions for when to use alternatives.

---

## 1. Motivation / When to use

You want to capture and restore an object’s internal state without breaking encapsulation. The **Memento Pattern** isolates the state capture logic into a separate object (the *memento*), allowing an originator to save snapshots and later restore to a previous state — useful for undo/redo, checkpoints, and transactional rollbacks.

Common scenarios:
- Implementing undo/redo in editors or UI widgets.
- Checkpointing state during multi-step operations.
- Saving state for rollback in case of errors.

---

## 2. Intent (one-liner)

Capture and externalize an object’s internal state so it can be restored later, without exposing its implementation details.

---

## 3. Participants

- **Originator:** The object whose state needs saving and restoring.
- **Memento:** A small, immutable object that holds the saved state. Often only the originator can access its internal details.
- **Caretaker:** Responsible for storing and retrieving mementos but does not modify or inspect their contents.

---

## 4. Structure (UML-like)

```
Originator ---creates---> Memento
Originator <---restores--- Memento
Caretaker ---stores---> Memento
```

The caretaker keeps mementos (e.g., a stack for undo). The originator creates mementos and restores from them; the memento encapsulates the state and should not be altered by the caretaker.

---

## 5. Simple example (Python)

```python
from dataclasses import dataclass
from typing import List

@dataclass(frozen=True)
class Memento:
    _state: str

class Originator:
    def __init__(self, state: str = ""):
        self._state = state

    def set_state(self, state: str):
        self._state = state

    def save(self) -> Memento:
        # create a memento capturing internal state
        return Memento(self._state)

    def restore(self, m: Memento):
        # restore from memento
        self._state = m._state

    def __str__(self):
        return f"Originator(state={self._state})"

class Caretaker:
    def __init__(self):
        self._history: List[Memento] = []

    def backup(self, m: Memento):
        self._history.append(m)

    def undo(self) -> Memento:
        return self._history.pop()

# Usage
origin = Originator("v1")
caretaker = Caretaker()
caretaker.backup(origin.save())
origin.set_state("v2")
caretaker.backup(origin.save())
origin.set_state("v3")
print(origin)  # v3
origin.restore(caretaker.undo())
print(origin)  # v2
origin.restore(caretaker.undo())
print(origin)  # v1
```

**Notes:** Memento is immutable; caretaker treats it as an opaque token.

---

## 6. Compact example (Rust sketch)

```rust
// Sketch: not complete runnable example, but shows roles
#[derive(Clone)]
struct Memento { state: String }

struct Originator { state: String }
impl Originator {
    fn save(&self) -> Memento { Memento { state: self.state.clone() } }
    fn restore(&mut self, m: &Memento) { self.state = m.state.clone(); }
}

struct Caretaker { history: Vec<Memento> }
impl Caretaker {
    fn backup(&mut self, m: Memento) { self.history.push(m); }
    fn undo(&mut self) -> Option<Memento> { self.history.pop() }
}
```

**Note:** In Rust, cloning state is common for mementos; for large state prefer serializing to an efficient buffer or using Rc/Arc for shared data.

---

## 7. Pros & Cons

**Pros:**
- Clean separation of responsibilities (originator controls state capture).
- Encapsulation preserved: caretaker never inspects internals.
- Simple to implement for small/medium-sized state.

**Cons:**
- Can be memory heavy if many snapshots or large state.
- Memento code and management add complexity.
- If originator state changes structure, older mementos may become incompatible.

---

## 8. Implementation tips

- Keep mementos as small as possible (store deltas when feasible).
- Use compression or serialization formats for large states.
- Limit history size or use checkpointing strategies to bound memory.
- Clearly document versioning and compatibility of memento formats.

---

## 9. Alternatives and related patterns

- **Command Pattern:** Commands can implement undo/redo by storing the inverse operation.
- **Snapshot/Checkpoint (serialization):** Persist full state; useful for larger systems.
- **Event Sourcing:** Rebuild state from events; allows time travel but requires event log management.

---

## 10. Interview checklist (how to explain in 2–3 minutes)

1. State the intent: save and restore object state without exposing internals.
2. Mention participants: Originator, Memento, Caretaker.
3. Explain a use-case: undo/redo in text editor.
4. Mention trade-offs: memory vs simplicity; consider deltas or pruning.
5. Close with alternatives: Command, Event Sourcing.

---

## 11. Quick quiz (2 questions)

1. Who is allowed to access the memento’s internals? (Answer: Originator only.)
2. Name one mitigation when mementos become memory-heavy. (Answer: store deltas, compress, prune history, or checkpoint.)

---

## 12. References / further reading
- Gamma et al., *Design Patterns: Elements of Reusable Object-Oriented Software*
- Eric Evans — Domain-Driven Design (on snapshots vs event-sourcing)


*Prepared for: interview-section/design-patterns — Memento Pattern*

