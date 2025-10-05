import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'
// import MermaidPlugin from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Official CTO blogs",
  description: "Tools to become better software engineer and do well in the tech interviews",
  cleanUrls: true,
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css' }],
    ['link', { rel: 'icon', href: 'https://officialcto.com/images/favicon.png' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Interview Sections', link: '/interview-section/' },
      {
        text: 'Topics',
        items: [
          { text: 'On the day of Interview', link: '/interview-section/facing-interviews' },
          { text: 'CS Fundamentals', link: '/interview-section/fundamentals' },
          { text: 'Object-Oriented Programming & Java Essentials', link: '/interview-section/oop-java' },
          { text: 'Design Principles', link: '/interview-section/design-principles' },
          { text: 'Design Patterns', link: '/interview-section/design-patterns' },
          { text: 'Low-Level System Design', link: '/interview-section/lld' },
          { text: 'Architectural Design Principles', link: '/interview-section/architectural-design-principles' },
          { text: 'Architectural Design Patterns', link: '/interview-section/architectural-design-patterns' },
          { text: 'Database', link: '/interview-section/database' },
          { text: 'High-Level System Design', link: '/interview-section/hld' },
          { text: 'Behavioral Skills', link: '/interview-section/behavioral' },
          { text: 'Clean Code', link: '/interview-section/clean-code' },
          { text: 'Refactoring', link: '/interview-section/refactoring' },
          { text: 'Mock Practice', link: '/interview-section/mocks' }
        ]
      },
      { text: 'About', link: '/about' },
      { text: 'Contact', link: '/contact' }
    ],

    sidebar: {
      '/interview-section/architectural-design-principles': [
        {
          text: 'Architectural Design Principles',
          link: '/interview-section/architectural-design-principles',
          items: [
            { text: 'Introduction', link: '/interview-section/architectural-design-principles/intro' },
            { text: 'Dependency Rule', link: '/interview-section/architectural-design-principles/dependency-rule' },
            { text: 'Component Cohesion (REP, CCP, CRP)', link: '/interview-section/architectural-design-principles/component-cohesion' },
            { text: 'Component Coupling (ADP, SDP, SAP)', link: '/interview-section/architectural-design-principles/component-coupling' },
            { text: 'System-Level Cohesion & Coupling', link: '/interview-section/architectural-design-principles/system-cohesion-coupling' },
            { text: 'DDD Principles (Lite)', link: '/interview-section/architectural-design-principles/ddd-principles' },
            { text: 'Scalability & Availability', link: '/interview-section/architectural-design-principles/scalability-availability' },
            { text: 'Information Hiding', link: '/interview-section/architectural-design-principles/architecture-info-hiding' },
            { text: 'Least Knowledge at Service Boundaries', link: '/interview-section/architectural-design-principles/least-knowledge-services' },
            { text: 'Security Principles', link: '/interview-section/architectural-design-principles/security-principles' },
            { text: 'Architectural Trade-offs', link: '/interview-section/architectural-design-principles/architectural-tradeoffs' },
            { text: 'Evolutionary Architecture', link: '/interview-section/architectural-design-principles/evolutionary-architecture' },
            { text: 'Performance & Caching', link: '/interview-section/architectural-design-principles/performance-caching' },
            { text: 'Resilience & Fault Tolerance', link: '/interview-section/architectural-design-principles/resilience-fault-tolerance' },
            { text: 'Observability Principles', link: '/interview-section/architectural-design-principles/observability' },
          ]
        }
      ],
      '/interview-section/architectural-design-patterns': [
        {
          text: 'Architectural Design Patterns',
          link: '/interview-section/architectural-design-patterns',
          items: [
            { text: 'Layered Architecture', link: '/interview-section/architectural-design-patterns/layered-architecture' },
            { text: 'Hexagonal Architecture', link: '/interview-section/architectural-design-patterns/hexagonal-architecture' },
            { text: 'Onion Architecture', link: '/interview-section/architectural-design-patterns/onion-architecture' },
            { text: 'Microservices vs Modular Monolith', link: '/interview-section/architectural-design-patterns/microservices-vs-monolith' },
            { text: 'Event-Driven Architecture', link: '/interview-section/architectural-design-patterns/event-driven-architecture' },
            { text: 'Event Sourcing', link: '/interview-section/architectural-design-patterns/event-sourcing-pattern' },
            { text: 'CQRS', link: '/interview-section/architectural-design-patterns/cqrs-pattern' },
            { text: 'Saga Pattern', link: '/interview-section/architectural-design-patterns/saga-pattern' },
            { text: 'Strangler Fig Pattern', link: '/interview-section/architectural-design-patterns/strangler-fig' },
            { text: 'Circuit Breaker Pattern', link: '/interview-section/architectural-design-patterns/circuit-breaker' },
            { text: 'API Gateway / BFF Pattern', link: '/interview-section/architectural-design-patterns/api-gateway-bff' },
            { text: 'Database per Service Pattern', link: '/interview-section/architectural-design-patterns/database-per-service' },
          ]
        }
      ],
      '/interview-section/database': [
        {
          text: 'Database Series Hub',
          link: '/interview-section/database'
        },
        {
          text: '1. Fundamentals',
          items: [
            { text: 'Database Fundamentals', link: '/interview-section/database/fundamentals' },
            { text: 'SQL vs NoSQL', link: '/interview-section/database/sql-vs-nosql' },
            { text: 'CAP Theorem & Consistency Models', link: '/interview-section/database/cap-theorem' },
            { text: 'Database Indexing', link: '/interview-section/database/indexing' },
            { text: 'Sharding vs Replication', link: '/interview-section/database/sharding-vs-replication' }
          ]
        },
        {
          text: '2. Scaling & Advanced Techniques',
          items: [
            { text: 'Database Scaling Patterns', link: '/interview-section/database/scaling-patterns' },
            { text: 'Specialized Databases', link: '/interview-section/database/specialized-databases' },
            { text: 'Caching & Query Optimization', link: '/interview-section/database/caching-and-query-optimization' },
            { text: 'Distributed Transactions & Patterns', link: '/interview-section/database/distributed-transactions' }
          ]
        },
        {
          text: '3. Real-World & Interviews',
          items: [
            { text: 'Polyglot Persistence & System Design Patterns', link: '/interview-section/database/polyglot-persistence' },
            { text: 'Case Studies', link: '/interview-section/database/case-studies' },
            { text: 'Interview Guide: Databases in HLD', link: '/interview-section/database/interview-guide' }
          ]
        },
        {
          text: '4. Deep Dive: Internals',
          items: [
            { text: 'Database Internals', link: '/interview-section/database/internals' }
          ]
        }
      ],
      '/interview-section/hld': [
        {
          text: 'Scaling to millions of users - Quick revision',
          link: '/interview-section/hld/scaling-to-millions-users'
        },
        {
          text: '1. Foundations',
          items: [
            { text: 'System Design Mindset', link: '/interview-section/hld/foundations/system-design-mindset' },
            { text: 'Workload Estimation', link: '/interview-section/hld/foundations/workload-estimation' }
          ]
        },
        {
          text: '2. Diagramming',
          items: [
            { text: 'C4 Model', link: '/interview-section/hld/diagramming/c4_model' },
          ]
        },
        {
          text: '3. Databases & Storage',
          items: [
            { text: 'Database for HLD', link: '/interview-section/hld/database-for-hld' }
          ]
        },
        {
          text: '4. Caching',
          items: [
            { text: 'Cache-aside, Write-through, Write-back', link: '/interview-section/hld/caching/strategies' },
            { text: 'TTLs & Eviction Policies', link: '/interview-section/hld/caching/eviction-policies' },
            { text: 'CDN Caching', link: '/interview-section/hld/caching/cdn-caching' },
            { text: 'Pitfalls: Invalidation & Hot Keys', link: '/interview-section/hld/caching/pitfalls' }
          ]
        },
        {
          text: '5. Networking & Communication',
          items: [
            { text: 'Protocols', link: '/interview-section/hld/networking/protocols' },
            { text: 'APIs: REST vs GraphQL', link: '/interview-section/hld/networking/apis' },
            { text: 'Load Balancing (L4 vs L7)', link: '/interview-section/hld/networking/load-balancing' },
            { text: 'CDNs & Edge Computing', link: '/interview-section/hld/networking/cdns-edge' }
          ]
        },
        {
          text: '6. Scalability Patterns',
          items: [
            { text: 'Horizontal vs Vertical Scaling', link: '/interview-section/hld/scalability/scaling' },
            { text: 'Microservices vs Monoliths', link: '/interview-section/hld/scalability/microservices-vs-monoliths' },
            { text: 'Event-driven Architectures', link: '/interview-section/hld/scalability/event-driven' }
          ]
        },
        {
          text: '7. Distributed Systems Concepts',
          items: [
            { text: 'CAP Theorem & PACELC', link: '/interview-section/hld/distributed/cap-pacelc' },
            { text: 'Consensus Algorithms', link: '/interview-section/hld/distributed/consensus' },
            { text: 'Quorum Reads/Writes', link: '/interview-section/hld/distributed/quorum' },
            { text: 'Leader Election, Heartbeats, Failover', link: '/interview-section/hld/distributed/leader-election' },
            { text: 'Eventual vs Strong Consistency', link: '/interview-section/hld/distributed/consistency-tradeoffs' }
          ]
        },
        {
          text: '8. Reliability & Fault Tolerance',
          items: [
            { text: 'Replication (Sync vs Async)', link: '/interview-section/hld/reliability/replication' },
            { text: 'Failover Strategies', link: '/interview-section/hld/reliability/failover' },
            { text: 'Geo-replication & Multi-region', link: '/interview-section/hld/reliability/geo-replication' },
            { text: 'Graceful Degradation', link: '/interview-section/hld/reliability/graceful-degradation' },
            { text: 'Circuit Breakers, Retries, Timeouts', link: '/interview-section/hld/reliability/circuit-breakers' }
          ]
        },
        {
          text: '9. Security',
          items: [
            { text: 'Authentication vs Authorization', link: '/interview-section/hld/security/authentication-authorization' },
            { text: 'TLS & Encryption', link: '/interview-section/hld/security/encryption' },
            { text: 'Rate Limiting & Throttling', link: '/interview-section/hld/security/rate-limiting' },
            { text: 'DDoS Protection', link: '/interview-section/hld/security/ddos' }
          ]
        },
        {
          text: '10. Observability',
          items: [
            { text: 'Monitoring', link: '/interview-section/hld/observability/monitoring' },
            { text: 'Centralized Logging', link: '/interview-section/hld/observability/logging' },
            { text: 'Distributed Tracing', link: '/interview-section/hld/observability/tracing' },
            { text: 'Alerting Systems', link: '/interview-section/hld/observability/alerting' }
          ]
        },
        {
          text: '11. Common System Design Problems',
          items: [
            { text: 'URL Shortener', link: '/interview-section/hld/problems/url-shortener' },
            { text: 'News Feed', link: '/interview-section/hld/problems/news-feed' },
            { text: 'Chat System', link: '/interview-section/hld/problems/chat-system' },
            { text: 'Search', link: '/interview-section/hld/problems/search' },
            { text: 'Video Streaming', link: '/interview-section/hld/problems/video-streaming' },
            { text: 'E-commerce Checkout', link: '/interview-section/hld/problems/ecommerce' },
            { text: 'Ride Hailing', link: '/interview-section/hld/problems/ride-hailing' },
            { text: 'Payment System', link: '/interview-section/hld/problems/payment-system' }
          ]
        },
        {
          text: '12. Soft Skills for HLD Interviews',
          items: [
            { text: 'Interview Strategy & Trade-offs', link: '/interview-section/hld/soft-skills-hld' }
          ]
        },
        {
          text: '13. Scaling to Millions',
          items: [
            { text: 'Scaling One-Pager', link: '/interview-section/hld/scaling-one-pager' }
          ]
        },
        {
          text: '14. Frequently Asked Problems',
          items: [
            { text: 'Problem Index', link: '/interview-section/hld/faq-problems/frequently-asked-problems' }
          ]
        }
      ],
      '/interview-section/behavioral': [
        {
          text: 'Behavioral & Leadership Interview Preparation',
          items: [
            { text: '1. Introduction to Behavioral Interviews & STAR Framework', link: '/interview-section/behavioral/intro-behavioral' },
            { text: '2. Effective Communication in Technical Settings', link: '/interview-section/behavioral/communication' },
            { text: '3. Teamwork and Collaboration', link: '/interview-section/behavioral/teamwork' },
            { text: '4. Leadership: Leading Teams', link: '/interview-section/behavioral/leadership' },
            { text: '5. Ownership and Innovation', link: '/interview-section/behavioral/ownership-innovation' },
            { text: '6. Conflict Resolution & Handling Failures', link: '/interview-section/behavioral/conflict-failure' },
            { text: '7. Problem-Solving and Technical Trade-Offs', link: '/interview-section/behavioral/problem-solving' },
            { text: '8. Learning, Growth, and Continuous Improvement', link: '/interview-section/behavioral/learning-growth' },
            { text: '9. Tailoring for Amazon: Leadership Principles', link: '/interview-section/behavioral/amazon-principles' },
            { text: '10. Tailoring for Google: GCA and Googleyness', link: '/interview-section/behavioral/google-gca' },
            { text: '11. Tailoring for Meta: Execution Speed & Real-Time Systems', link: '/interview-section/behavioral/meta-execution' },
            { text: '12. Tailoring for Netflix: Freedom & Responsibility', link: '/interview-section/behavioral/netflix-responsibility' },
            { text: '13. Influencing & Managing Up/Down', link: '/interview-section/behavioral/influencing-managing' },
            { text: '14. Common Questions & Conflict Frameworks', link: '/interview-section/behavioral/common-questions' },
            { text: '15. Capstone: Full Mock Behavioral Interview', link: '/interview-section/behavioral/capstone-interview' }
          ]
        }
      ],
      // '/interview-section/fundamentals/infra-cloud': [
      //   {
      //     text: 'Domain-Specific Topics',
      //     items: [
      //       { text: '1. Cloud Fundamentals: AWS/GCP/OCI', link: '/interview-section/fundamentals/infra-cloud/cloud-fundamentals' },
      //       { text: '2. IaC with Terraform', link: '/interview-section/fundamentals/infra-cloud/terraform-iac' },
      //       { text: '3. Containerization: Docker and Kubernetes', link: '/interview-section/fundamentals/infra-cloud/containerization' },
      //       { text: '4. Distributed Systems: CAP, Consensus', link: '/interview-section/fundamentals/infra-cloud/distributed-systems' },
      //       { text: '5. Monitoring and Alerts', link: '/interview-section/fundamentals/infra-cloud/monitoring-alerts' },
      //       { text: '6. GPU and AI Infra: Telemetry and SCADA', link: '/interview-section/fundamentals/infra-cloud/ai-infra' },
      //       { text: '7. Microservices Pitfalls and Best Practices', link: '/interview-section/fundamentals/infra-cloud/microservices' },
      //       { text: '8. CI/CD Pipelines', link: '/interview-section/fundamentals/infra-cloud/cicd-pipelines' },
      //       { text: '9. Security in Infra: Fraud Prevention', link: '/interview-section/fundamentals/infra-cloud/security-infra' },
      //       { text: '10. Capstone: Integrating All Sections', link: '/interview-section/fundamentals/infra-cloud/capstone' }
      //     ]
      //   }
      // ],
      '/interview-section/clean-code': [
        {
          text: 'Clean Code',
          items: [
            { text: '1. Introduction to Clean Code: Principles and Impact', link: '/interview-section/clean-code/intro-clean-code' },
            { text: '2. Crafting Readable Code', link: '/interview-section/clean-code/readable-code' },
            { text: '3. Designing Modular Code', link: '/interview-section/clean-code/modular-code' },
            { text: '4. Robust Error Handling', link: '/interview-section/clean-code/error-handling' },
            { text: '5. Writing Testable Code', link: '/interview-section/clean-code/testable-code' },
            { text: '6. Balancing Performance and Clarity', link: '/interview-section/clean-code/performance-clarity' },
            { text: '7. Documentation and Code Reviews', link: '/interview-section/clean-code/documentation-reviews' }
          ]
        }
      ],
      '/interview-section/refactoring': [
        {
          text: 'Refactoring',
          items: [
            { text: '1. Introduction to Refactoring: Goals and Process', link: '/interview-section/refactoring/intro-refactoring' },
            { text: '2. Identifying Code Smells', link: '/interview-section/refactoring/code-smells' },
            { text: '3. Simplifying Code through Refactoring', link: '/interview-section/refactoring/simplifying-code' },
            { text: '4. Refactoring with Patterns and Principles', link: '/interview-section/refactoring/patterns-principles' },
            { text: '5. Refactoring for Concurrency and Performance', link: '/interview-section/refactoring/concurrency-performance' },
            { text: '6. Advanced Refactoring Techniques and Tools', link: '/interview-section/refactoring/advanced-techniques' },
            { text: '7. Refactoring Case Study: Monolith to Microservices', link: '/interview-section/refactoring/monolith-microservices' }
          ]
        }
      ],
      '/interview-section/mocks': [
        {
          text: 'Mock Practice',
          items: [
            { text: '1. Mock Coding Interview', link: '/interview-section/mocks/coding-interview' },
            { text: '2. Mock System Design Interview', link: '/interview-section/mocks/system-design-interview' },
            { text: '3. Mock Behavioral Interview', link: '/interview-section/mocks/behavioral-interview' },
            { text: '4. Capstone: Simulating a Full FAANG Onsite', link: '/interview-section/mocks/full-onsite' }
          ]
        }
      ],
      '/interview-section/lld': [
        {
          text: 'UML Modeling',
          items: [
            { text: 'What is UML Diagram?', link: '/interview-section/lld/uml/what_is_uml' },
            { text: 'Use case Diagrams', link: '/interview-section/lld/uml/use_case_diagrams' },
            { text: 'Class Diagrams', link: '/interview-section/lld/uml/class_diagrams' },
            { text: 'Activity Diagrams', link: '/interview-section/lld/uml/activity_diagrams' },
            { text: 'Sequence Diagrams', link: '/interview-section/lld/uml/sequence_diagrams' },
            { text: 'Component Diagrams', link: '/interview-section/lld/uml/component_diagrams' },
            { text: 'Class Relationships', link: '/interview-section/lld/uml/class_relationships' },
          ]
        },
        {
          text: 'Concepts revision',
          items: [
            { text: 'LLD Intro: From HLD to Detailed Design', link: '/interview-section/lld/intro-lld' },
            { text: 'Database Design and Indexing', link: '/interview-section/lld/database-design' },
            { text: 'API Design: RESTful, Idempotency, Versioning', link: '/interview-section/lld/api-design' },
            { text: 'Concurrency Handling: Locks, Threads', link: '/interview-section/lld/concurrency-handling' },
            { text: 'Error Handling, Edge Cases, and Resilience', link: '/interview-section/lld/error-handling' },
          ]
        },
        {
          text: 'Low-Level System Design',
          items: [
            { text: '1. Design Tic-Tac-Toe', link: '/interview-section/lld/tic-tac-toe' },
            { text: '2. Design a Parking Lot System', link: '/interview-section/lld/parking-lot' },
            { text: '7. Design an Elevator System', link: '/interview-section/lld/elevator-system' },
            { text: '8. Design a Vending Machine', link: '/interview-section/lld/vending-machine' },
            { text: '9. Design an ATM Machine', link: '/interview-section/lld/atm-machine' },
            { text: '10. Design a Restaurant Management System', link: '/interview-section/lld/restaurant-management' },
            { text: '11. Design a Library Management System', link: '/interview-section/lld/library-management' },
            { text: '12. Design a Chess Game', link: '/interview-section/lld/chess-game' },
            { text: '14. Design Snake and Ladder Game', link: '/interview-section/lld/snake-ladder' },
            { text: '15. Design a Deck of Cards', link: '/interview-section/lld/deck-of-cards' },
            { text: '16. Design an LRU Cache', link: '/interview-section/lld/lru-cache' },
            { text: '17. Design a Rate Limiter', link: '/interview-section/lld/rate-limiter' },
            { text: '18. Design a Text Editor (e.g., Notepad)', link: '/interview-section/lld/text-editor' },
            { text: '19. Design a Movie Ticket Booking System', link: '/interview-section/lld/movie-ticket-booking' },
            { text: '20. Design a File System', link: '/interview-section/lld/file-system' },
            { text: '21. Design a Logger', link: '/interview-section/lld/logger' },
            { text: '22. Design a URL Parser', link: '/interview-section/lld/url-parser' },
            { text: '23. Design a Stack Overflow-like Q&A System (core)', link: '/interview-section/lld/qa-system' },
            { text: '24. Design a Traffic Light Controller', link: '/interview-section/lld/traffic-light' },
            { text: '25. Design a Hospital Management System', link: '/interview-section/lld/hospital-management' },
            { text: '26. Design a Cache with Expiry', link: '/interview-section/lld/cache-with-expiry' },
            { text: '27. Design a Notification Dispatcher', link: '/interview-section/lld/notification-dispatcher' },
            { text: '28. Design an Inventory Manager', link: '/interview-section/lld/inventory-manager' },
            { text: '29. Design a Matchmaking Engine', link: '/interview-section/lld/matchmaking-engine' },
            { text: '30. Design a Telemetry Collector', link: '/interview-section/lld/telemetry-collector' },
            { text: '31. Mock LLD Interview: Live Class Diagram Session', link: '/interview-section/lld/mock-lld-interview' },
            { text: '32. Integrating LLD with Design Patterns/Principles', link: '/interview-section/lld/lld-design-patterns' },
            { text: '33. Capstone: Combining LLD Components into a System', link: '/interview-section/lld/capstone-lld' }
          ]
        }
      ],
      '/interview-section/algorithms': [
        {
          text: 'Algorithms',
          items: [
            { text: 'Overview', link: '/interview-section/algorithms' },
            { text: '1. Problem-Solving Mindsets', link: '/interview-section/algorithms/problem-solving-mindsets' },
            { text: '2. Two-Pointers and Sliding Windows', link: '/interview-section/algorithms/two-pointers-sliding-windows' },
            { text: '3. Prefix Sums and Hashing', link: '/interview-section/algorithms/prefix-sums-hashing' },
            { text: '4. Linked Lists: Reversal and Cycle Detection', link: '/interview-section/algorithms/linked-lists-reversal-cycle-detection' },
            { text: '5. Stacks and Queues: BFS/DFS', link: '/interview-section/algorithms/stacks-queues-bfs-dfs' },
            { text: '6. Trees: Traversals and Balancing', link: '/interview-section/algorithms/binary-trees-traversals-balancing' },
            { text: '7. Graphs: Shortest Paths', link: '/interview-section/algorithms/graphs-shortest-paths-topological-sort' },
            { text: '8. Heaps: Priority Queues', link: '/interview-section/algorithms/heaps-priority-queues' },
            { text: '9. 1D Dynamic Programming', link: '/interview-section/algorithms/dynamic-programming-1d-patterns' },
            { text: '10. 2D/Multi-DP Patterns', link: '/interview-section/algorithms/dynamic-programming-2d-patterns' },
            { text: '11. Greedy and Bit Manipulation', link: '/interview-section/algorithms/greedy-bit-manipulation' },
            { text: '12. Capstone: Mixing Patterns', link: '/interview-section/algorithms/capstone-mixing-patterns' },
            { text: '13. Union-Find and Optimizations', link: '/interview-section/algorithms/union-find-optimizations' },
            { text: '14. Segment and Fenwick Trees', link: '/interview-section/algorithms/segment-fenwick-trees' },
            { text: '15. Advanced String Algorithms', link: '/interview-section/algorithms/advanced-string-algorithms' }
          ]
        }
      ],
      '/interview-section/oop-java': [
        { text: 'Overview', link: '/interview-section/oop-java' },
        {
          text: 'Object-Oriented Programming & Java Essentials',
          items: [
            { text: 'Encapsulation', link: '/interview-section/oop-java/essentials/encapsulation' },
            { text: 'Abstraction', link: '/interview-section/oop-java/essentials/abstraction' },
            { text: 'Abstraction vs Encapsulation', link: '/interview-section/oop-java/essentials/abstraction-vs-encapsulation' },
            { text: 'Inheritance', link: '/interview-section/oop-java/essentials/inheritance' },
            { text: 'Polymorphism', link: '/interview-section/oop-java/essentials/polymorphism' },
          ]
        },
        {
          text: 'Java Multithreading and Concurrency',
          items: [
            { text: 'Overview', link: '/interview-section/oop-java/multithreading-concurrency/overview' },
            { text: 'Thread Basics', link: '/interview-section/oop-java/multithreading-concurrency/java-thread-basics' },
            { text: 'Synchronization & Thread Safety', link: '/interview-section/oop-java/multithreading-concurrency/java_synchronization_thread_safety' },
            { text: 'Executor Framework', link: '/interview-section/oop-java/multithreading-concurrency/java_executor_framework' },
            { text: 'Concurrency Utilities in Java', link: '/interview-section/oop-java/multithreading-concurrency/java-concurrency-utilities' },
            { text: 'Advanced Topics in Java Concurrency', link: '/interview-section/oop-java/multithreading-concurrency/java_advanced_concurrency' },
            { text: 'Java Concurrency - Interview & Real-World Scenarios', link: '/interview-section/oop-java/multithreading-concurrency/java_concurrency_misc' }
          ]
        },
        {
          text: 'Locks & Synchronization in Java',
          items: [
            { text: 'Synchronization Basics', link: '/interview-section/oop-java/locks-synchronization/synchronization_basics' },
            { text: 'Explicit Locks in Java — ReentrantLock', link: '/interview-section/oop-java/locks-synchronization/explicit_locks_reentrantlock' },
            { text: 'Read-Write & Stamped Locks', link: '/interview-section/oop-java/locks-synchronization/readwrite_stamped_lock' },
            { text: 'Advanced Locking & Patterns in Java', link: '/interview-section/oop-java/locks-synchronization/advanced_locking_patterns' },
            { text: 'High-Level Abstractions vs Locks in Java', link: '/interview-section/oop-java/locks-synchronization/high_level_abstractions_vs_locks' }
          ]
        },
        {
          text: 'Memory Management & Garbage Collection',
          items: [
            { text: 'Synchronization Basics', link: '/interview-section/oop-java/memory-gc/java_memory_model_basics' },
            { text: 'Garbage Collection Fundamentals in Java', link: '/interview-section/oop-java/memory-gc/garbage_collection_fundamentals' },
            { text: 'Garbage Collection Algorithms', link: '/interview-section/oop-java/memory-gc/gc_algorithms' },
            { text: 'GC Implementations in HotSpot JVM', link: '/interview-section/oop-java/memory-gc/gc_hotspot' },
            { text: 'Tuning & Monitoring Garbage Collection in JVM', link: '/interview-section/oop-java/memory-gc/gc_tuning_monitoring' },
            { text: 'Advanced GC Topics in Java', link: '/interview-section/oop-java/memory-gc/gc_advanced_topics' }
          ]
        },
        {
          text: 'Exceptions & Error Handling in Java',
          link: '/interview-section/oop-java/exceptions_error_handling'
        },
        {
          text: 'Immutability in Java — final, String, and Collections',
          link: '/interview-section/oop-java/immutability_java'
        },
        {
          text: 'Collections Framework & Hashing in Java',
          link: '/interview-section/oop-java/collections_hashing_java'
        },
        {
          text: 'Java 8+ Features (Lambdas, Streams, Optional)',
          items: [
            { text: 'Lambdas & Functional Interfaces in Java', link: '/interview-section/oop-java/java-8/lambdas_functional_interfaces' },
            { text: 'Streams API in Java', link: '/interview-section/oop-java/java-8/streams_api_java' },
            { text: 'Optional in Java', link: '/interview-section/oop-java/java-8/optional_in_java' },
          ]
        }
      ],
      '/interview-section/design-patterns': [
        {
          text: 'Design Patterns',
          items: [
            { text: 'Overview', link: '/interview-section/design-patterns' },
            {
              text: 'Introduction', items: [
                { text: 'Introduction to Design Patterns', link: '/interview-section/design-patterns/intro-design-patterns' },
                { text: 'Classification of Design Patterns', link: '/interview-section/design-patterns/patterns-classification' }
              ]
            },
            {
              text: 'Creational Patterns', items: [
                { text: '1. Singleton Pattern', link: '/interview-section/design-patterns/singleton-pattern' },
                { text: '2. Factory Method Pattern', link: '/interview-section/design-patterns/factory-method-pattern' },
                { text: '3. Abstract Factory Pattern', link: '/interview-section/design-patterns/abstract-factory-pattern' },
                { text: '4. Builder Pattern', link: '/interview-section/design-patterns/builder-pattern' },
                { text: '5. Prototype Pattern', link: '/interview-section/design-patterns/prototype-pattern' }
              ]
            },
            {
              text: 'Structural Patterns', items: [
                { text: '1. Adapter Pattern', link: '/interview-section/design-patterns/adapter-pattern' },
                { text: '2. Decorator Pattern', link: '/interview-section/design-patterns/decorator-pattern' },
                { text: '3. Facade Pattern', link: '/interview-section/design-patterns/facade-pattern' },
                { text: '4. Composite Pattern', link: '/interview-section/design-patterns/composite-pattern' },
                { text: '5. Proxy Pattern', link: '/interview-section/design-patterns/proxy-pattern' },
                { text: '6. Bridge Pattern', link: '/interview-section/design-patterns/bridge-pattern' },
                { text: '7. Flyweight Pattern', link: '/interview-section/design-patterns/flyweight-pattern' }
              ]
            },
            {
              text: 'Behavioral Patterns', items: [
                { text: '1. Strategy Pattern', link: '/interview-section/design-patterns/strategy-pattern' },
                { text: '2. Observer Pattern', link: '/interview-section/design-patterns/observer-pattern' },
                { text: '3. Command Pattern', link: '/interview-section/design-patterns/command-pattern' },
                { text: '4. Template Method Pattern', link: '/interview-section/design-patterns/template-method-pattern' },
                { text: '5. State Pattern', link: '/interview-section/design-patterns/state-pattern' },
                { text: '6. Chain of Responsibility Pattern', link: '/interview-section/design-patterns/chain-of-responsibility-pattern' },
                { text: '7. Mediator Pattern', link: '/interview-section/design-patterns/mediator-pattern' },
                { text: '8. Memento Pattern', link: '/interview-section/design-patterns/memento-pattern' },
                { text: '9. Iterator Pattern', link: '/interview-section/design-patterns/iterator-pattern' },
                { text: '10. Interpreter Pattern', link: '/interview-section/design-patterns/interpreter-pattern' },
                { text: '11. Visitor Pattern', link: '/interview-section/design-patterns/visitor-pattern' }
              ]
            },
            {
              text: 'Modern & Architectural Patterns', items: [
                { text: '1. Dependency Injection', link: '/interview-section/design-patterns/dependency-injection' },
                { text: '2. Repository Pattern', link: '/interview-section/design-patterns/repository-pattern' },
                { text: '3. Event Sourcing', link: '/interview-section/design-patterns/event-sourcing-pattern' },
                { text: '4. CQRS (Command Query Responsibility Segregation)', link: '/interview-section/design-patterns/cqrs-pattern' }
              ]
            },
            {
              text: 'Capstone', items: [
                { text: 'Mock Interview: Applying Patterns', link: '/interview-section/design-patterns/mock-interview-patterns' }
              ]
            }
          ]
        }

      ],
      '/interview-section/design-principles': [
        {
          text: 'Design Principles',
          items: [
            { text: 'Overview', link: '/interview-section/design-principles' },
            { text: '1. Introduction to Design Principles', link: '/interview-section/design-principles/intro-design-principles' },
            {
              text: '2. SOLID Design Principle',
              items: [
                { text: 'Single Responsibility Principle (SRP)', link: '/interview-section/design-principles/single-responsibility-principle' },
                { text: 'Open-Closed Principle (OCP)', link: '/interview-section/design-principles/open-closed-principle' },
                { text: 'Liskov Substitution Principle (LSP)', link: '/interview-section/design-principles/liskov-substitution-principle' },
                { text: 'Interface Segregation Principle (ISP)', link: '/interview-section/design-principles/interface-segregation-principle' },
                { text: 'Dependency Inversion Principle (DIP)', link: '/interview-section/design-principles/dependency-inversion-principle' },
              ]
            },
            { text: '3. Programming to an Interface, not an Implementation', link: '/interview-section/design-principles/program-to-interface' },
            { text: '4. Composition over Inheritance', link: '/interview-section/design-principles/composition-over-inheritance' },
            { text: '5. DRY: Don’t Repeat Yourself', link: '/interview-section/design-principles/dry-principle' },
            { text: '6. KISS: Keep It Simple, Stupid', link: '/interview-section/design-principles/kiss-principle' },
            { text: '7. YAGNI: You Aren’t Gonna Need It', link: '/interview-section/design-principles/yagni-principle' },
            { text: '8. Law of Demeter (Principle of Least Knowledge)', link: '/interview-section/design-principles/law-of-demeter' },
            { text: '9. Separation of Concerns', link: '/interview-section/design-principles/separation-of-concerns' },
            { text: '10. Information Hiding', link: '/interview-section/design-principles/information-hiding' },
            { text: '11. High Cohesion & Low Coupling', link: '/interview-section/design-principles/high-cohesion-low-coupling' },
            { text: '12. Favor Immutability', link: '/interview-section/design-principles/favor-immutability' },
            { text: '13. Principle of Least Privilege / Least Authority', link: '/interview-section/design-principles/least-privilege' },
            { text: '14. POLA and GRASP Principles', link: '/interview-section/design-principles/pola-grasp-principles' }
          ]
        }
      ],
      '/interview-section/fundamentals': [
        {
          text: '1. Networking Basics',
          items: [
            { text: 'OSI vs TCP/IP Model', link: '/interview-section/fundamentals/networking/osi-tcpip' },
            { text: 'How the Internet Works', link: '/interview-section/fundamentals/networking/internet' },
            { text: 'HTTP & HTTPS Basics', link: '/interview-section/fundamentals/networking/http-https-basics' },
            { text: 'SSL/TLS Basics', link: '/interview-section/fundamentals/networking/ssl-tls-basics' },
            { text: 'HTTP Status Codes', link: '/interview-section/fundamentals/networking/http-codes' }
          ]
        },
        {
          text: '2. Operating Systems & Concurrency',
          items: [
            { text: 'Processes vs Threads', link: '/interview-section/fundamentals/os/processes-vs-threads' },
            { text: 'CPU Scheduling & Context Switching', link: '/interview-section/fundamentals/os/scheduling' },
            { text: 'Memory Management', link: '/interview-section/fundamentals/os/memory' },
            { text: 'Concurrency Control', link: '/interview-section/fundamentals/os/concurrency' },
            { text: 'Concurrency vs Parralelism', link: '/interview-section/fundamentals/os/concurrency-vs-parallelism' }
          ]
        },
        {
          text: '3. Computer Architecture',
          items: [
            { text: 'How CPUs Work', link: '/interview-section/fundamentals/architecture/cpu' },
            { text: 'Caches & Memory Hierarchy', link: '/interview-section/fundamentals/architecture/memory-hierarchy' },
            { text: 'Storage (SSD vs HDD)', link: '/interview-section/fundamentals/architecture/storage' },
            { text: 'GPUs & Parallel Computing', link: '/interview-section/fundamentals/architecture/gpus' }
          ]
        },
        {
          text: '4. Security Basics',
          items: [
            { text: 'Authentication vs Authorization', link: '/interview-section/fundamentals/security/auth-vs-authz' },
            { text: 'Public Key Cryptography', link: '/interview-section/fundamentals/security/pki' },
            { text: 'Hashing vs Encryption', link: '/interview-section/fundamentals/security/hashing-encryption' }
          ]
        },
        {
          text: '5. AI & Modern Computing',
          items: [
            { text: 'How AI Works (Layman’s Guide)', link: '/interview-section/fundamentals/ai/how-ai-works' },
            { text: 'Neural Networks at a Glance', link: '/interview-section/fundamentals/ai/neural-networks' },
            { text: 'GPU vs TPU for AI Workloads', link: '/interview-section/fundamentals/ai/gpu-vs-tpu' }
          ]
        },
        {
          text: '6. Infrastructure & Cloud Fundamentals',
          items: [
            { text: 'Cloud Fundamentals: AWS/GCP/OCI', link: '/interview-section/fundamentals/infra-cloud/cloud-fundamentals' },
            { text: 'IaC with Terraform', link: '/interview-section/fundamentals/infra-cloud/terraform-iac' },
            { text: 'Containerization: Docker and Kubernetes', link: '/interview-section/fundamentals/infra-cloud/containerization' },
            { text: 'Distributed Systems: CAP, Consensus', link: '/interview-section/fundamentals/infra-cloud/distributed-systems-cap-consensus' },
            { text: 'Monitoring and Alerts', link: '/interview-section/fundamentals/infra-cloud/monitoring-alerts' },
            { text: 'GPU and AI Infra: Telemetry and SCADA', link: '/interview-section/fundamentals/infra-cloud/ai-infra' },
            { text: 'Microservices Pitfalls and Best Practices', link: '/interview-section/fundamentals/infra-cloud/microservices' },
            { text: 'CI/CD Pipelines', link: '/interview-section/fundamentals/infra-cloud/cicd-pipelines' },
            { text: 'Security in Infra: Fraud Prevention', link: '/interview-section/fundamentals/infra-cloud/security-infra' },
          ]
        },
        {
          text: '7. Miscellaneous Core Topics',
          items: [
            { text: 'DNS Deep Dive', link: '/interview-section/fundamentals/misc/dns' },
            { text: 'CDN Basics', link: '/interview-section/fundamentals/misc/cdn-basics' },
            { text: 'Email Protocols', link: '/interview-section/fundamentals/misc/email' },
            { text: 'Compression & Encoding', link: '/interview-section/fundamentals/misc/compression' },
            { text: 'REST Architecture', link: '/interview-section/fundamentals/misc/rest_architecture' },
            { text: 'Multipart APIs', link: '/interview-section/fundamentals/misc/multipart_apis' },
            { text: 'Circuit Breaker', link: '/interview-section/fundamentals/misc/circuit_breaker' },
            { text: 'Video Streaming Technology', link: '/interview-section/fundamentals/misc/video_streaming_technology' },
            { text: 'Websockets, Server-Sent events, Long Polling, Short Polling', link: '/interview-section/fundamentals/misc/real_time_communication' },
            { text: 'Messaging Queues and Streaming Technologies', link: '/interview-section/fundamentals/misc/messaging_queues_streaming' },
            { text: 'Common terms in Infra and System Design', link: '/interview-section/fundamentals/misc/common_terms' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ravishankarkumar/officialcto' }
    ]
  },
  markdown: {
    math: {
      engine: 'katex' // Explicitly use KaTeX
    },
    config: (md) => {
      md.use(mathjax3)
    }
  },
})
