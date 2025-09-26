# Repository Pattern — 20 minute lesson

**Estimated time:** 20 minutes

**Goal:** Understand intent, participants, structure, a simple example (Python + Rust sketch), trade-offs, implementation tips, and what to say in an interview. Includes quick quiz and related patterns.

---

## 1. Motivation / When to use

You want to separate data access logic from business logic so the rest of your application treats the data source as a collection of objects. The **Repository Pattern** abstracts persistence behind a collection-like interface, making code easier to test, maintain, and evolve when storage details change.

Common scenarios:
- Decoupling domain logic from ORM or database specifics.
- Enabling in-memory fakes for unit testing.
- Centralizing query and persistence logic (unit-of-work often pairs with repositories).

---

## 2. Intent (one-liner)

Provide an in-memory collection-like interface for accessing and persisting domain objects, isolating the domain from persistence concerns.

---

## 3. Participants

- **Repository (interface):** Declares methods for retrieving and storing domain objects (e.g., `get_by_id`, `add`, `remove`, `list`, `find`).
- **ConcreteRepository:** Implements persistence details (SQL, ORM, NoSQL, in-memory) behind the interface.
- **Domain Entities / Models:** Plain domain objects the repository returns and accepts.
- **Client / Service:** Uses the repository to perform business operations without knowing persistence details.

---

## 4. Structure (UML-like)

```
Client -> Repository (interface)
Repository -> ConcreteRepository (SQL/ORM/Memory)
ConcreteRepository -> Database
```

Client code depends on the repository interface; concrete wiring happens at composition time (DI container or manual construction).

---

## 5. Simple example (Python — using dataclasses & in-memory repo)

```python
from dataclasses import dataclass
from typing import Dict, List, Optional

@dataclass
class User:
    id: int
    name: str

class UserRepository:
    def add(self, user: User) -> None: ...
    def get(self, user_id: int) -> Optional[User]: ...
    def list(self) -> List[User]: ...

class InMemoryUserRepository(UserRepository):
    def __init__(self):
        self._store: Dict[int, User] = {}

    def add(self, user: User) -> None:
        self._store[user.id] = user

    def get(self, user_id: int) -> Optional[User]:
        return self._store.get(user_id)

    def list(self) -> List[User]:
        return list(self._store.values())

# Usage
repo = InMemoryUserRepository()
repo.add(User(1, "Ravi"))
print(repo.get(1))
```

**Notes:** For real apps, ConcreteRepository might wrap an ORM session/connection and implement transactions or unit-of-work.

---

## 6. Compact example (Rust sketch)

```rust
// Trait-based repository for generic entity types
trait Repository<T> {
    fn add(&mut self, item: T);
    fn get(&self, id: u64) -> Option<&T>;
    fn list(&self) -> Vec<&T>;
}

struct InMemoryRepo<T> { data: Vec<T> }
// Implement add/get/list with indexing or HashMap. Use generics + trait bounds for IDs.
```

**Note:** In Rust, choose concrete types or trait objects carefully; lifetime and ownership make shared mutability explicit.

---

## 7. Pros & Cons

**Pros:**
- Decouples domain from persistence; easier to test with fakes/mocks.
- Centralizes data access logic and queries.
- Encourages single responsibility for repository code.

**Cons:**
- Can become an anemic wrapper over ORM if it only forwards calls — adds indirection without value.
- Over-abstraction for simple CRUD apps; repositories that expose query-specific methods can leak persistence concerns.
- Designing generic repository interfaces that fit all use-cases is hard.

---

## 8. Implementation tips

- Prefer explicit, intention-revealing methods (e.g., `find_active_users()`), not generic `query()` that leaks SQL.
- Keep transaction boundaries outside repositories or use a Unit of Work that composes repositories.
- Return domain objects, not ORM entities, if you want strict layering.
- Provide both sync and async flavors where appropriate (e.g., async DB drivers).
- For testing, provide an in-memory implementation or use test doubles.

---

## 9. Alternatives and related patterns

- **DAO (Data Access Object):** Very similar; DAO often maps one-to-one with tables and CRUD operations.
- **Query Object / Specification:** Encapsulate complex queries as objects instead of many specialized repository methods.
- **Active Record:** Opposite style — domain objects handle their own persistence (simpler but couples domain to DB).
- **ORM Repository hybrid:** Some projects use lightweight repositories atop ORMs to get best of both worlds.

---

## 10. Interview checklist (how to explain in 2–3 minutes)

1. Intent: abstract persistence behind a collection-like interface.
2. Roles: Repository interface, ConcreteRepository, domain entities, client/services.
3. Benefits: testability, decoupling; Drawbacks: potential unnecessary abstraction.
4. Show small code example or explain in-memory repo for tests and SQL repo for production.
5. Mention alternatives: Active Record vs Repository, and when to prefer each.

---

## 11. Quick quiz (2 questions)

1. Why use an in-memory repository implementation in tests? (Answer: to run fast, deterministic unit tests without DB dependency.)
2. What risk do you face if your repository exposes SQL-like queries? (Answer: it leaks persistence concerns into domain layers and reduces portability.)

---

## 12. References / further reading
- Patterns of Enterprise Application Architecture — Martin Fowler
- Domain-Driven Design — Eric Evans (repositories in tactical patterns)
- Articles comparing Repository vs Active Record

*Prepared for: interview-section/design-patterns — Repository Pattern*