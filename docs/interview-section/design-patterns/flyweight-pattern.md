---
title: Flyweight Pattern
description: Learn the Flyweight Pattern in Java to reduce memory usage by sharing common object state. Includes UML, Java examples, and real-world use cases.
---

# Flyweight Pattern

## Overview
The **Flyweight Pattern** is a **structural design pattern** intended to minimize memory usage by sharing as much data as possible with similar objects — it separates object state into **intrinsic** (shared) and **extrinsic** (context-dependent) parts. Flyweight is especially valuable when an application needs to create large numbers of fine-grained objects (e.g., characters in a document, graphical objects, trees in a game world).

---

## Learning Objectives
- Understand the **intent** of the Flyweight Pattern.
- Distinguish **intrinsic** vs **extrinsic** state.
- Implement Flyweight in **Java** using a factory/registry for shared instances.
- Apply Flyweight in real-world scenarios (text editors, games, rendering engines).
- Evaluate trade-offs (memory vs complexity).

---

## Why Flyweight Matters
- **Memory Savings**: Reduce per-object memory by sharing common data across many objects.
- **Performance**: Lower memory footprint improves cache locality and GC behavior.
- **Scalability**: Enables handling millions of objects that would otherwise exhaust memory.

However, Flyweight increases complexity: clients must supply external state and the pattern can make code harder to understand. Use it when memory is a genuine bottleneck.

---

## Key Concepts
- **Intrinsic State**: Immutable or shareable data stored in the flyweight (e.g., glyph shape, sprite image).
- **Extrinsic State**: Context-specific data provided by the client (e.g., position, color), not stored in the flyweight.
- **Flyweight Factory / Registry**: Maintains and reuses flyweight instances.

---

## UML Diagram
```
+--------------------+      +----------------------+
| FlyweightFactory   |----->| Flyweight            |
+--------------------+      +----------------------+
| +getFlyweight(key) |      | +operation(extrinsic)|
+--------------------+      +----------------------+
                                ^
                                |
                     +------------------------+
                     | ConcreteFlyweight      |
                     +------------------------+
```

---

## Code Example: Character Glyphs (Text Editor)

### Flyweight interface
```java
public interface Glyph {
    void draw(int x, int y, String context); // context is extrinsic
}
```

### Concrete Flyweight (intrinsic state shared)
```java
public class CharacterGlyph implements Glyph {
    private final char symbol;       // intrinsic
    private final byte[] shapeData;  // intrinsic, heavy object like vector shape
    
    public CharacterGlyph(char symbol, byte[] shapeData) {
        this.symbol = symbol;
        this.shapeData = shapeData;
    }
    
    @Override
    public void draw(int x, int y, String context) {
        // Use extrinsic data (x, y, context) to draw
        System.out.println("Drawing '" + symbol + "' at (" + x + "," + y + ") with " + context);
    }
}
```

### Flyweight Factory / Registry
```java
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class GlyphFactory {
    private final Map<Character, Glyph> cache = new ConcurrentHashMap<>();
    
    public Glyph getGlyph(char c) {
        return cache.computeIfAbsent(c, ch -> {
            // Pretend loadShapeData is expensive
            byte[] shape = loadShapeData(ch);
            return new CharacterGlyph(ch, shape);
        });
    }
    
    private byte[] loadShapeData(char ch) {
        // expensive operation simulated by creating a large byte array
        return new byte[1024]; // placeholder
    }
}
```

### Client usage (extrinsic state supplied by client)
```java
public class Editor {
    private final GlyphFactory factory = new GlyphFactory();
    
    public void render(String text) {
        int x = 0;
        int y = 0;
        for (char c : text.toCharArray()) {
            Glyph g = factory.getGlyph(c); // shared glyph (intrinsic state)
            g.draw(x, y, "font=Arial,size=12"); // extrinsic state provided here
            x += 10;
        }
    }
    
    public static void main(String[] args) {
        Editor editor = new Editor();
        // Many repeated characters reuse the same flyweight instances
        editor.render("Hello, Hello, Hello!");
    }
}
```

---

## Memory Comparison (Conceptual)
- Naive approach: store full `Character` objects for every character — memory = N * size(per-character).
- Flyweight: share glyph shapes — memory = uniqueGlyphs * size(shape) + N * size(extrinsic).
If text contains many repeated characters (common in documents), savings can be significant.

---

## Real-World Use Cases
- **Text Editors**: Glyph objects (characters) share shape/metrics.
- **Game Engines**: Reuse sprite or model data for many entities (trees, rocks).
- **Rendering Engines**: Share heavy mesh or texture data across instances.
- **Caching**: Share immutable configuration blobs across many components.

---

## Trade-offs & Pitfalls
- **Added Complexity**: Clients must manage extrinsic state and call flyweights correctly.
- **Thread Safety**: Flyweight factory must be thread-safe if used concurrently (use ConcurrentHashMap).
- **Mutability**: Intrinsic state should be immutable to safely share across contexts.
- **Premature Optimization**: Don't apply Flyweight until you confirm memory is a bottleneck.

---

## Practice Exercises
- **Easy**: Implement a simple `EmojiFactory` that shares emoji image data and supports rendering at different positions.
- **Medium**: Build a `TreeFactory` for a game that shares tree models and positions them in a world.
- **Hard**: Simulate a document renderer that uses Flyweight for glyphs and measure memory usage vs naive implementation.

---

## Conclusion
The Flyweight Pattern is a powerful tool to reduce memory usage by sharing intrinsic state across many fine-grained objects. Use it judiciously when memory and performance demands justify the added complexity. Proper implementation requires immutable intrinsic data, a thread-safe factory, and careful handling of extrinsic context.

**Next Step**: Explore [Proxy Pattern](/interview-section/design-patterns/proxy-pattern) or revisit the [Design Patterns Hub](/interview-section/design-patterns).

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
