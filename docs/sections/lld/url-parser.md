---
title: Design a URL Parser
description: Learn low-level system design for a URL parser in Java, focusing on parsing and validation for scalable, robust applications.
---

# Design a URL Parser

## Overview
Welcome to the twenty-second lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Designing a URL parser is a practical LLD problem that tests your ability to process and validate structured strings using OOP principles. In this 25-minute lesson, we explore the **low-level design of a URL parser system**, covering parsing (e.g., extracting protocol, host, path) and validation (e.g., format checks, valid characters). Whether building a URL parser for a web application or preparing for FAANG interviews, this lecture equips you to design modular, efficient systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Design Patterns*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **low-level design** principles for a URL parser with parsing and validation.
- Learn to model **classes**, **parsing logic**, and **functionality** in Java.
- Apply **OOP principles** (Section 2, Lecture 1), **design patterns** (Section 3), **design principles** (Section 4), and **HLD concepts** (Section 5) to LLD.
- Write clean, modular Java code (Section 9).

## Why URL Parser Design Matters
A URL parser is a critical component in web applications, enabling routing, API calls, and data processing. Drawing from my experience designing string-processing systems, I’ve applied OOP principles to ensure reliability and extensibility in similar applications. This lecture prepares you to design robust URL parsers and articulate your approach clearly, showcasing your mentorship skills.

In software engineering, URL parser design helps you:
- **Process Structured Data**: Extract URL components accurately.
- **Ensure Validity**: Validate URL formats and characters.
- **Enhance Scalability**: Handle diverse URL structures.
- **Teach Effectively**: Share practical LLD strategies.

## Key Concepts
### 1. URL Parser Components
- **Parsing**: Extract components (protocol, host, port, path, query, fragment).
- **Validation**: Ensure URL format and character validity (e.g., RFC 3986 compliance).
- **Functionality**:
  - Parse a URL string into components.
  - Validate URL structure and components.
  - Handle optional components (e.g., port, query).
- **Edge Cases**: Invalid URLs, missing components, malformed queries.

### 2. Design Patterns
- **Builder Pattern** (Section 3, Lecture 3): For constructing URL objects.
- **Strategy Pattern** (Section 3, Lecture 4): For validation strategies (extensible).
- **Factory Pattern** (Section 3, Lecture 2): For creating URL parsers (optional).

### 3. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation for URL and parser classes.
- **Design Patterns** (Section 3): Builder and Strategy patterns.
- **Design Principles** (Section 4): SoC (Lecture 11) separates parsing and validation logic; KISS (Lecture 8) simplifies design.
- **HLD** (Section 5):
  - URL Shortener (Lecture 18): Similar URL processing.
  - LLD Intro (Lecture 1): Builds on class design.
  - Database Design (Lecture 2): Persisting URL data (optional).
  - API Design (Lecture 3): Exposing parser controls.
  - Concurrency Handling (Lecture 4): Thread-safe parsing (optional).
  - Error Handling (Lecture 5): Handling invalid URLs.
  - Parking Lot (Lecture 6): Similar entity modeling.
  - Elevator System (Lecture 7): Similar state-driven design.
  - Vending Machine (Lecture 8): Similar operation logic.
  - ATM Machine (Lecture 9): Similar transactional design.
  - Restaurant Management (Lecture 10): Similar resource tracking.
  - Library Management (Lecture 11): Similar resource logic.
  - Chess Game (Lecture 12): Similar rule enforcement.
  - Tic-Tac-Toe (Lecture 13): Similar logic.
  - Snake and Ladder (Lecture 14): Similar mechanics.
  - Deck of Cards (Lecture 15): Similar entity management.
  - LRU Cache (Lecture 16): Similar data structure usage.
  - Rate Limiter (Lecture 17): Similar operation control.
  - Text Editor (Lecture 18): Similar data manipulation.
  - Movie Ticket Booking (Lecture 19): Similar resource allocation.
  - File System (Lecture 20): Similar hierarchical structure.
  - Logger (Lecture 21): Similar operation management.
- **Clean Code** (Section 9): Meaningful names for classes and methods.

### 4. Use Case
Design a URL parser for a web application to process and validate URLs for routing or API calls.

## System Design
### Architecture
```
[Client] --> [URLParserController]
                |
                v
            [URLParser]
                |
                v
           [URL]
```

- **Classes**:
  - `URL`: Represents URL components (protocol, host, port, path, query, fragment).
  - `URLParser`: Parses and validates URL strings.
  - `URLParserController`: Exposes API for parsing and validation.
- **Functionality**: Parse URL string into components, validate format.
- **Trade-Offs**:
  - Parsing: Regex (simple, less flexible) vs. manual parsing (robust, complex).
  - Validation: Strict RFC compliance (accurate, complex) vs. lenient (simple, error-prone).

## Code Example: URL Parser System
Below is a Java implementation of a URL parser with parsing and validation.

```java
// Custom exception
public class URLParserException extends Exception {
    public URLParserException(String message) {
        super(message);
    }
}

// URL class
public class URL {
    private String protocol;
    private String host;
    private Integer port;
    private String path;
    private String query;
    private String fragment;

    private URL() {}

    public static class Builder {
        private String protocol;
        private String host;
        private Integer port;
        private String path;
        private String query;
        private String fragment;

        public Builder protocol(String protocol) {
            this.protocol = protocol;
            return this;
        }

        public Builder host(String host) {
            this.host = host;
            return this;
        }

        public Builder port(Integer port) {
            this.port = port;
            return this;
        }

        public Builder path(String path) {
            this.path = path;
            return this;
        }

        public Builder query(String query) {
            this.query = query;
            return this;
        }

        public Builder fragment(String fragment) {
            this.fragment = fragment;
            return this;
        }

        public URL build() throws URLParserException {
            URL url = new URL();
            if (protocol == null || protocol.isEmpty()) {
                throw new URLParserException("Protocol is required");
            }
            if (host == null || host.isEmpty()) {
                throw new URLParserException("Host is required");
            }
            url.protocol = protocol;
            url.host = host;
            url.port = port;
            url.path = path != null ? path : "";
            url.query = query;
            url.fragment = fragment;
            return url;
        }
    }

    public String getProtocol() {
        return protocol;
    }

    public String getHost() {
        return host;
    }

    public Integer getPort() {
        return port;
    }

    public String getPath() {
        return path;
    }

    public String getQuery() {
        return query;
    }

    public String getFragment() {
        return fragment;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(protocol).append("://").append(host);
        if (port != null) {
            sb.append(":").append(port);
        }
        sb.append(path);
        if (query != null) {
            sb.append("?").append(query);
        }
        if (fragment != null) {
            sb.append("#").append(fragment);
        }
        return sb.toString();
    }
}

// URL parser class
public class URLParser {
    public URL parse(String urlString) throws URLParserException {
        if (urlString == null || urlString.trim().isEmpty()) {
            throw new URLParserException("URL string is empty");
        }

        URL.Builder builder = new URL.Builder();

        // Extract protocol
        int protocolEnd = urlString.indexOf("://");
        if (protocolEnd == -1) {
            throw new URLParserException("Invalid URL: missing protocol");
        }
        String protocol = urlString.substring(0, protocolEnd).toLowerCase();
        if (!protocol.matches("https?")) {
            throw new URLParserException("Unsupported protocol: " + protocol);
        }
        builder.protocol(protocol);

        // Extract host and port
        int pathStart = urlString.indexOf('/', protocolEnd + 3);
        String hostPort = pathStart == -1 ? urlString.substring(protocolEnd + 3) : urlString.substring(protocolEnd + 3, pathStart);
        int portDelimiter = hostPort.indexOf(':');
        String host = portDelimiter == -1 ? hostPort : hostPort.substring(0, portDelimiter);
        if (!host.matches("[a-zA-Z0-9.-]+")) {
            throw new URLParserException("Invalid host: " + host);
        }
        builder.host(host);

        if (portDelimiter != -1) {
            String portStr = hostPort.substring(portDelimiter + 1);
            try {
                int port = Integer.parseInt(portStr);
                if (port < 0 || port > 65535) {
                    throw new URLParserException("Invalid port: " + portStr);
                }
                builder.port(port);
            } catch (NumberFormatException e) {
                throw new URLParserException("Invalid port format: " + portStr);
            }
        }

        // Extract path, query, and fragment
        if (pathStart != -1) {
            String rest = urlString.substring(pathStart);
            int queryStart = rest.indexOf('?');
            int fragmentStart = rest.indexOf('#');

            String path = queryStart == -1 && fragmentStart == -1 ? rest :
                          queryStart != -1 && (fragmentStart == -1 || queryStart < fragmentStart) ? rest.substring(0, queryStart) :
                          rest.substring(0, fragmentStart);
            builder.path(path);

            if (queryStart != -1) {
                String query = fragmentStart == -1 ? rest.substring(queryStart + 1) :
                               rest.substring(queryStart + 1, fragmentStart);
                if (!query.matches("[a-zA-Z0-9=&%]*")) {
                    throw new URLParserException("Invalid query: " + query);
                }
                builder.query(query);
            }

            if (fragmentStart != -1) {
                String fragment = rest.substring(fragmentStart + 1);
                if (!fragment.matches("[a-zA-Z0-9]*")) {
                    throw new URLParserException("Invalid fragment: " + fragment);
                }
                builder.fragment(fragment);
            }
        }

        return builder.build();
    }
}

// Controller for API interactions
public class URLParserController {
    private final URLParser parser;

    public URLParserController(URLParser parser) {
        this.parser = parser;
    }

    public URL handleParse(String urlString) {
        try {
            URL url = parser.parse(urlString);
            System.out.println("Parsed URL: " + url);
            return url;
        } catch (URLParserException e) {
            System.err.println("Error: " + e.getMessage());
            return null;
        }
    }
}

// Client to demonstrate usage
public class URLParserClient {
    public static void main(String[] args) {
        URLParser parser = new URLParser();
        URLParserController controller = new URLParserController(parser);

        // Normal flow
        controller.handleParse("https://example.com:8080/path/to/resource?key=value#section");
        controller.handleParse("http://localhost/path");

        // Edge cases
        controller.handleParse(""); // Empty URL
        controller.handleParse("ftp://example.com"); // Unsupported protocol
        controller.handleParse("https://example@com"); // Invalid host
        controller.handleParse("https://example.com:invalid/port"); // Invalid port
        controller.handleParse("https://example.com?key=value#invalid@fragment"); // Invalid fragment
        // Output:
        // Parsed URL: https://example.com:8080/path/to/resource?key=value#section
        // Parsed URL: http://localhost/path
        // Error: URL string is empty
        // Error: Unsupported protocol: ftp
        // Error: Invalid host: example@com
        // Error: Invalid port format: invalid
        // Error: Invalid fragment: invalid@fragment
    }
}
```
- **LLD Principles**:
  - **Parsing**: `URLParser` extracts protocol, host, port, path, query, and fragment.
  - **Validation**: Checks for valid protocol, host, port, and query/fragment formats.
  - **Classes**: `URL`, `URLParser`, `URLParserController`.
  - **Design Patterns**: Builder for `URL` construction, Strategy (extensible for validation).
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates parsing and validation; KISS (Lecture 8) simplifies implementation.
- **Big O**: O(n) for `parse` (n = URL string length).
- **Edge Cases**: Handles empty URLs, invalid protocols, hosts, ports, queries, and fragments.

**UML Diagram**:
```
[Client] --> [URLParserController]
                |
                v
            [URLParser]
                |
                v
           [URL]
```

## Real-World Application
Imagine designing a URL parser for a web application to process and validate URLs for routing or API calls. This LLD—aligned with HLD principles from Section 5 (e.g., URL Shortener, Lecture 18)—ensures accuracy and flexibility, critical for web systems.

## Practice Exercises
Practice URL parser design with these exercises:
- **Easy**: Design a UML diagram and Java code for a simple URL parser (protocol and host).
- **Medium**: Implement a URL parser with path and query parsing.
- **Medium**: Design an LLD for a URL parser with full component parsing and validation.
- **Hard**: Architect a URL parser with Java, integrating multiple design patterns (e.g., Builder, Strategy).

Try designing one system in Java with a UML diagram, explaining parsing and validation.

## Conclusion
Mastering the design of a URL parser equips you to build modular, efficient Java systems, enhancing your LLD skills. This lecture builds on HLD concepts and system design principles, preparing you for FAANG interviews and real-world applications.

**Next Step**: Explore [Design a Parking lot System](/sections/lld/parking-lot) to continue your LLD journey, or check out [all sections](/sections/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>