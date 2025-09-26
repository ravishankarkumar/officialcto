---
title: Chain of Responsibility Pattern
description: Learn the Chain of Responsibility pattern in Java to decouple senders and receivers by passing requests along a chain of handlers. Includes UML, Java examples, and real-world use cases.
---

# Chain of Responsibility Pattern

## Overview
The **Chain of Responsibility (CoR)** is a **behavioral design pattern** that lets you pass requests along a chain of handlers. Upon receiving a request, a handler either processes it or forwards it to the next handler in the chain. CoR decouples the sender and receiver, allowing multiple handlers to process a request without the sender needing to know which handler will handle it.

---

## Learning Objectives
- Understand the **intent** of Chain of Responsibility.
- Build a chain of handlers that can process or forward requests.
- Implement CoR in **Java** with clear examples.
- Use CoR for tasks like validation, logging, authentication, and request routing.
- Compare CoR with other patterns (e.g., Strategy, Command).

---

## Why Chain of Responsibility Matters
- **Decoupling**: Sender doesn't need to know which handler will handle the request.
- **Flexible Routing**: Handlers can be rearranged dynamically.
- **Multiple Handlers**: Several handlers can examine or partially handle requests.
- **Separation of Concerns**: Each handler focuses on one responsibility.

Common uses: middleware chains, servlet filters, validation pipelines, event processing, and request handling in frameworks.

---

## Key Concepts
- **Handler**: Interface or abstract class declaring a method to handle requests and a reference to the next handler.
- **Concrete Handlers**: Implement specific handling logic; either handle the request or delegate to next.
- **Client**: Builds the chain and submits requests to the first handler.

---

## UML Diagram
```
+---------------------+      +-----------------------+      +-----------------------+
|      Client         |----->|   Handler (abstract)  |----->| ConcreteHandlerA      |
+---------------------+      +-----------------------+      +-----------------------+
                                   | nextHandler
                                   v
                             +-----------------------+
                             | ConcreteHandlerB      |
                             +-----------------------+
```

---

## Code Example: Request Processing Pipeline

We’ll build a simple HTTP-like request processing pipeline with handlers for **Authentication**, **Authorization**, **Validation**, and **Logging**.

### Request Model
```java
public class Request {
    private String user;
    private String action;
    private Map<String, String> params = new HashMap<>();

    public Request(String user, String action) {
        this.user = user;
        this.action = action;
    }

    public String getUser() { return user; }
    public String getAction() { return action; }
    public Map<String, String> getParams() { return params; }
}
```

### Handler Abstract Class
```java
public abstract class Handler {
    private Handler next;

    public Handler setNext(Handler next) {
        this.next = next;
        return next;
    }

    public void handle(Request request) {
        if (!doHandle(request) && next != null) {
            next.handle(request);
        }
    }

    // returns true if handled, false to pass along
    protected abstract boolean doHandle(Request request);
}
```

### Concrete Handlers
```java
public class AuthHandler extends Handler {
    @Override
    protected boolean doHandle(Request request) {
        if (request.getUser() == null || request.getUser().isEmpty()) {
            System.out.println("AuthHandler: missing user, rejecting");
            return true; // handled (rejected)
        }
        System.out.println("AuthHandler: user present");
        return false; // continue
    }
}

public class AuthorizationHandler extends Handler {
    @Override
    protected boolean doHandle(Request request) {
        if ("delete".equals(request.getAction()) && !"admin".equals(request.getUser())) {
            System.out.println("AuthorizationHandler: user not authorized for delete, rejecting");
            return true;
        }
        System.out.println("AuthorizationHandler: authorized or not applicable");
        return false;
    }
}

public class ValidationHandler extends Handler {
    @Override
    protected boolean doHandle(Request request) {
        if (request.getParams().isEmpty()) {
            System.out.println("ValidationHandler: missing parameters, rejecting");
            return true;
        }
        System.out.println("ValidationHandler: parameters present");
        return false;
    }
}

public class LoggingHandler extends Handler {
    @Override
    protected boolean doHandle(Request request) {
        System.out.println("LoggingHandler: logging request for user=" + request.getUser() + " action=" + request.getAction());
        return false; // never fully handles; just logs and allows chain to continue
    }
}
```

### Client: Building the Chain
```java
public class ChainDemo {
    public static void main(String[] args) {
        Handler auth = new AuthHandler();
        Handler authz = new AuthorizationHandler();
        Handler validation = new ValidationHandler();
        Handler logging = new LoggingHandler();

        // Build chain: auth -> authz -> validation -> logging
        auth.setNext(authz).setNext(validation).setNext(logging);

        Request r1 = new Request("alice", "create");
        r1.getParams().put("item", "book");
        auth.handle(r1);
        // Output:
        // AuthHandler: user present
        // AuthorizationHandler: authorized or not applicable
        // ValidationHandler: parameters present
        // LoggingHandler: logging request for user=alice action=create

        Request r2 = new Request(null, "create");
        auth.handle(r2);
        // Output:
        // AuthHandler: missing user, rejecting
    }
}
```

---

## Variations & Enhancements
- **First-match vs All-match**: In some pipelines, you want the first handler that handles the request to stop the chain; in others, you want all handlers to process (e.g., logging + validation). Adjust `doHandle` semantics accordingly.
- **Return Values**: Instead of boolean, handlers can return meaningful response objects or exceptions.
- **Asynchronous Chains**: Handlers can be async (CompletableFuture) for non-blocking processing.
- **Dynamic Chains**: Chains can be built or modified at runtime based on configuration.

---

## Real-World Examples
- **Servlet Filters** and **Interceptors** in web frameworks.
- **Middleware** in Express.js or .NET Core pipeline.
- **Logging/Monitoring Pipelines**, **Validation Pipelines**, **Security Checks**, **Event Processing** chains.
- **Payment Processing**: Fraud checks → balance checks → transaction processing.

---

## Relation to Other Patterns
- **Decorator**: Both involve chaining, but Decorator adds behavior to an object, while CoR passes a request along handlers.
- **Chain vs Pipeline**: Pipeline is often a streamlined form of CoR where each stage must execute.
- **Command**: CoR often wraps command execution but routes commands to appropriate handlers.

---

## Practice Exercises
- **Easy**: Implement a `SpamFilterChain` for email that applies multiple filters.
- **Medium**: Build a middleware chain supporting both synchronous and asynchronous handlers.
- **Hard**: Design a configurable chain where handler order is read from a config file and applied at runtime.

---

## Interview Insights
- *“How is Chain of Responsibility different from Strategy?”*  
  Answer: Strategy selects an algorithm for a client; CoR passes a request along handlers which may handle it — CoR decouples sender and receiver and can involve multiple handlers.

- *“When would you prefer CoR over a switch/if-else?”*  
  Answer: When handlers can be modularized, reordered, or extended without changing the client.

---

## Conclusion
Chain of Responsibility helps build flexible request handling systems by decoupling senders from possible receivers and allowing dynamic composition of handlers. It's widely used in middleware, validation pipelines, and security frameworks.

**Next Step**: Explore [Mediator Pattern](/interview-section/design-patterns/mediator-pattern) or revisit the [Design Patterns Hub](/interview-section/design-patterns).

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
