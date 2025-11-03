# 🚀 How Do You Detect a Cycle in a Linked List?

There are multiple ways to detect if a **singly linked list** contains a cycle (loop).  
Below are the most common and efficient methods.

---

## ✅ 1. Floyd’s Cycle Detection Algorithm (Tortoise and Hare)

**Idea:**  
Use two pointers:
- `slow` moves one step at a time  
- `fast` moves two steps at a time  

If there’s a cycle, they will eventually meet.  
If `fast` becomes `None`, no cycle exists.

**Complexity:**  
- Time → O(n)  
- Space → O(1)

**Code (Python):**
```python
def has_cycle(head):
    slow = head
    fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False
```

---

## 🎯 Finding the Start of the Cycle

After detecting a cycle (when `slow == fast`),  
reset `slow` to the head and move both one step at a time.  
They meet at the **start of the cycle**.

```python
def find_cycle_start(head):
    slow = fast = head

    # detect cycle
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            break
    else:
        return None  # no cycle

    # find cycle start
    slow = head
    while slow is not fast:
        slow = slow.next
        fast = fast.next
    return slow
```

---

## 🔁 Finding the Length of the Cycle

Once a cycle is detected (meeting point found),  
keep one pointer fixed and move the other until it comes back to the same node.

```python
def cycle_length(meeting_node):
    length = 1
    curr = meeting_node.next
    while curr is not meeting_node:
        curr = curr.next
        length += 1
    return length
```

---

## 💡 2. Using a Hash Set (Simple but Extra Space)

**Idea:**  
Keep track of visited nodes using a set.  
If a node repeats → cycle exists.

**Complexity:**  
- Time → O(n)  
- Space → O(n)

```python
def has_cycle_hash(head):
    visited = set()
    curr = head
    while curr:
        if curr in visited:
            return True
        visited.add(curr)
        curr = curr.next
    return False
```

---

## ⚠️ 3. Marking Visited Nodes (Not Recommended)

Modify node data or pointers to mark visits.  
This is **destructive** and not safe if nodes are shared.

---

## 🧠 Edge Cases

- Empty list → no cycle  
- Single node pointing to itself → cycle  
- Two-node loop → cycle  
- Long tail then loop → still works

---

## 🏁 Summary

| Method | Time | Space | Safe | Notes |
|--------|------|--------|------|-------|
| **Floyd’s Algorithm** | O(n) | O(1) | ✅ Yes | Best overall |
| **Hash Set** | O(n) | O(n) | ✅ Yes | Easier to understand |
| **Marking Nodes** | O(n) | O(1) | ❌ No | Modifies data |

---

**👉 Recommended:** Use **Floyd’s Tortoise and Hare Algorithm** —  
it’s efficient, elegant, and works without extra memory.
