# Difference Between Linked List and Array

Both **arrays** and **linked lists** are linear data structures used to store collections of elements, but they differ significantly in how data is stored, accessed, and managed in memory.

---

## 📦 1. Memory Allocation

| Feature | Array | Linked List |
|----------|--------|--------------|
| **Type of allocation** | Contiguous block of memory | Non-contiguous memory locations |
| **Memory management** | Fixed size — must be declared in advance (in static arrays) | Dynamically allocated as nodes are created |
| **Flexibility** | Difficult to resize — requires creating a new array | Easily grows and shrinks as needed |
| **Overhead** | No pointer overhead | Each node stores extra memory for a pointer/reference |

**Example:**

- Array: `int arr[5] = {1, 2, 3, 4, 5}` — occupies one continuous block.
- Linked List: Each node may exist anywhere in memory, connected via pointers.

---

## ⚡ 2. Access Time

| Feature | Array | Linked List |
|----------|--------|--------------|
| **Access method** | Direct (using index) | Sequential (must traverse from head) |
| **Access complexity** | O(1) for any element | O(n) to reach the nth element |
| **Example** | `arr[3]` is instant | Need to follow links `head → next → next → next` |

Arrays are ideal when **random access** is required frequently.

---

## 🔄 3. Insertion and Deletion

| Feature | Array | Linked List |
|----------|--------|--------------|
| **Insertion** | O(n) — may require shifting elements | O(1) if pointer to previous node is known |
| **Deletion** | O(n) — requires shifting elements | O(1) if pointer to node is known |
| **Overhead** | Frequent resizing or shifting | Requires managing pointers carefully |

**Example:**
- Inserting in the middle of an array → shift half the elements.
- Inserting in a linked list → just update two pointers.

---

## 🧠 4. Cache Performance

| Feature | Array | Linked List |
|----------|--------|--------------|
| **Locality of reference** | Excellent — elements are next to each other | Poor — nodes may be scattered in memory |
| **CPU caching** | Cache-friendly | Cache-unfriendly |

Arrays perform better in CPU-intensive tasks due to better **spatial locality**.

---

## 🧩 5. Variants and Use Cases

| Use Case | Prefer Array | Prefer Linked List |
|-----------|---------------|-------------------|
| Random access needed | ✅ Yes | ❌ No |
| Frequent insertion/deletion | ❌ No | ✅ Yes |
| Memory-constrained systems | ✅ Yes | ❌ No |
| Implementing stacks/queues | ✅ Simple arrays | ✅ More flexible with linked lists |
| Reversing or sorting | Easier | Requires traversal and pointer management |

---

## 🧱 6. Example Structures

### Array Example (C++)
```cpp
int arr[5] = {10, 20, 30, 40, 50};
cout << arr[2]; // O(1) access
```

### Linked List Example (C++)
```cpp
struct Node {
    int data;
    Node* next;
};

Node* head = new Node{10, nullptr};
head->next = new Node{20, nullptr};
head->next->next = new Node{30, nullptr};
```

---

## 🏁 7. Summary Table

| Feature | Array | Linked List |
|----------|--------|--------------|
| **Memory allocation** | Contiguous | Non-contiguous |
| **Access time** | O(1) | O(n) |
| **Insertion/Deletion** | O(n) | O(1) (if pointer known) |
| **Memory overhead** | Low | Higher (due to pointers) |
| **Resizing** | Fixed (or costly for dynamic arrays) | Dynamic |
| **Cache performance** | High | Low |
| **Ease of implementation** | Simple | More complex |
| **Use case** | Frequent access | Frequent insert/delete |

---

**In summary:**  
- **Arrays** are best for random access, memory efficiency, and predictable storage.  
- **Linked lists** excel when frequent insertions/deletions are required and memory size is not fixed.

