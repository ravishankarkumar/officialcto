# Iterator Pattern — 20 minute lesson

**Estimated time:** 20 minutes

**Goal:** Understand the intent, participants, structure, simple examples (Python + Rust), trade-offs, and how to present the pattern in an interview. Includes a short quiz and when to use alternatives.

---

## 1. Motivation / When to use

You have a collection (aggregate) and want to traverse its elements without exposing its internal representation. The **Iterator Pattern** provides a standard way to access elements sequentially, enabling multiple traversal strategies and decoupling traversal logic from the collection itself.

Common scenarios:
- Provide a common traversal API for different collection types.
- Allow multiple simultaneous traversals over the same collection.
- Implement custom traversal (e.g., depth-first, breadth-first) without changing the collection.

---

## 2. Intent (one-liner)

Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.

---

## 3. Participants

- **Iterator (interface):** Declares operations for traversing (e.g., `next()`, `has_next()`).
- **ConcreteIterator:** Implements traversal for a specific aggregate; keeps current position.
- **Aggregate (interface):** Declares an interface to create an iterator.
- **ConcreteAggregate:** Implements creation of a concrete iterator and holds the elements.

---

## 4. Structure (UML-like)

```
Client -> Iterator
Client -> Aggregate
Aggregate -> create_iterator() -> ConcreteIterator
ConcreteIterator -> iterates over ConcreteAggregate
```

The client asks the aggregate for an iterator and uses the iterator to walk elements; the aggregate’s internal structure remains encapsulated.

---

## 5. Simple example (Python)

```python
from typing import Protocol, Iterable, Iterator, List

class MyIterator(Protocol):
    def __iter__(self) -> 'MyIterator': ...
    def __next__(self): ...

class ConcreteAggregate:
    def __init__(self, items: List[int]):
        self._items = items

    def __iter__(self) -> Iterator[int]:
        return ConcreteIterator(self._items)

class ConcreteIterator:
    def __init__(self, items: List[int]):
        self._items = items
        self._index = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self._index < len(self._items):
            val = self._items[self._index]
            self._index += 1
            return val
        raise StopIteration

# Usage
col = ConcreteAggregate([10, 20, 30])
for x in col:
    print(x)
```

**Notes:** In Python, the iterator protocol is builtin (`__iter__`/`__next__`). Use generators to implement iterators succinctly.

---

## 6. Compact example (Rust)

```rust
// Rust iterator over a Vec<T>
struct MyIter<'a, T> { data: &'a [T], idx: usize }

impl<'a, T> MyIter<'a, T> {
    fn new(slice: &'a [T]) -> Self { Self { data: slice, idx: 0 } }
}

impl<'a, T> Iterator for MyIter<'a, T>
where T: Copy {
    type Item = T;
    fn next(&mut self) -> Option<Self::Item> {
        if self.idx < self.data.len() {
            let v = self.data[self.idx];
            self.idx += 1;
            Some(v)
        } else {
            None
        }
    }
}

// Usage: let it = MyIter::new(&vec![1,2,3]); for v in it { ... }
```

**Notes:** Rust’s `Iterator` trait is powerful and composable; prefer implementing it for custom collections.

---

## 7. Pros & Cons

**Pros:**
- Separates traversal from collection implementation.
- Supports multiple simultaneous traversals and different traversal algorithms.
- Makes APIs consistent across collection types.

**Cons:**
- Adds complexity (extra objects) for simple use-cases.
- Some languages already have built-in iterator constructs (generators), reducing the need for explicit classes.

---

## 8. Implementation tips

- Use language-native iterator constructs where available (e.g., generators, `yield`).
- Keep iterators lightweight; avoid holding large locks or mutable references that block concurrent access.
- Consider providing both forward and reverse iterators if needed.
- For tree/graph traversal, implement stateful iterators (stack/queue inside the iterator) rather than exposing traversal state externally.

---

## 9. Alternatives and related patterns

- **Visitor:** If you need to perform operations on elements while traversing, visitor separates the operation from traversal.
- **Cursor:** Similar to iterator but may expose more methods and allow modification during traversal.

---

## 10. Interview checklist (how to explain in 2–3 minutes)

1. Intent: provide a way to traverse without exposing representation.
2. Participants: Iterator + Aggregate; show concrete roles.
3. Example: explain Python `__iter__`/`__next__` or Java `Iterator`/`Iterable`.
4. Trade-offs: abstraction vs small overhead.
5. When to prefer other patterns: Visitor for operations; generators for simple lazy sequences.

---

## 11. Quick quiz (2 questions)

1. What method names form the Python iterator protocol? (Answer: `__iter__` and `__next__`.)
2. Why might you implement a custom iterator instead of returning a list? (Answer: to support lazy evaluation, save memory, or hide internal structure.)

---

## 12. References / further reading
- Gamma et al., *Design Patterns: Elements of Reusable Object-Oriented Software*
- Rust documentation: `Iterator` trait and iterator adaptors
- Python docs: Iterator protocol and generator functions

*Prepared for: interview-section/design-patterns — Iterator Pattern*

