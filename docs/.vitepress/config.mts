import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Official CTO blogs",
  description: "Tools to become better software engineer and do well in the tech interviews",
  cleanUrls: true,
  head: [['link', { rel: 'icon', href: 'https://officialcto.com/images/favicon.png' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'All Sections', link: '/sections/' },
      {
        text: 'Topics',
        items: [
          { text: 'Interview one pager', link: '/sections/interview-one-pager' },
          { text: 'Object-Oriented Design', link: '/sections/ood' },
          { text: 'Design Patterns', link: '/sections/design-patterns' },
          { text: 'Design Principles', link: '/sections/design-principles' },
          { text: 'Low-Level System Design', link: '/sections/lld' },
          { text: 'Behavioral Skills', link: '/sections/behavioral' },
          { text: 'Domain-Specific Topics', link: '/sections/domain-topics' },
          { text: 'Clean Code', link: '/sections/clean-code' },
          { text: 'Refactoring', link: '/sections/refactoring' },
          { text: 'Mock Practice', link: '/sections/mocks' },
          { text: 'Database', link: '/sections/database' },
          { text: 'High-Level System Design', link: '/sections/hld' }
        ]
      },
      { text: 'About', link: '/about' },
      { text: 'Contact', link: '/contact' }
    ],

    sidebar: {
      '/sections/database': [
        {
          text: 'Database Series Hub',
          link: '/sections/database'
        },
        {
          text: '1. Fundamentals',
          items: [
            { text: 'Database Fundamentals', link: '/sections/database/fundamentals' },
            { text: 'SQL vs NoSQL', link: '/sections/database/sql-vs-nosql' },
            { text: 'CAP Theorem & Consistency Models', link: '/sections/database/cap-theorem' },
            { text: 'Database Indexing', link: '/sections/database/indexing' },
            { text: 'Sharding vs Replication', link: '/sections/database/sharding-vs-replication' }
          ]
        },
        {
          text: '2. Scaling & Advanced Techniques',
          items: [
            { text: 'Database Scaling Patterns', link: '/sections/database/scaling-patterns' },
            { text: 'Specialized Databases', link: '/sections/database/specialized-databases' },
            { text: 'Caching & Query Optimization', link: '/sections/database/caching-and-query-optimization' },
            { text: 'Distributed Transactions & Patterns', link: '/sections/database/distributed-transactions' }
          ]
        },
        {
          text: '3. Real-World & Interviews',
          items: [
            { text: 'Polyglot Persistence & System Design Patterns', link: '/sections/database/polyglot-persistence' },
            { text: 'Case Studies', link: '/sections/database/case-studies' },
            { text: 'Interview Guide: Databases in HLD', link: '/sections/database/interview-guide' }
          ]
        },
        {
          text: '4. Deep Dive: Internals',
          items: [
            { text: 'Database Internals', link: '/sections/database/internals' }
          ]
        }
      ],
      '/sections/hld': [
        {
          text: 'Scaling to millions of users - Quick revision',
          link: '/sections/hld/scaling-to-millions-users'
        },
        {
          text: '1. Foundations',
          items: [
            { text: 'System Design Mindset', link: '/sections/hld/foundations/system-design-mindset' },
            { text: 'Workload Estimation', link: '/sections/hld/foundations/workload-estimation' }
          ]
        },
        {
          text: '2. Databases & Storage',
          items: [
            { text: 'Database for HLD', link: '/sections/hld/database-for-hld' }
          ]
        },
        {
          text: '3. Caching',
          items: [
            { text: 'Cache-aside, Write-through, Write-back', link: '/sections/hld/caching/strategies' },
            { text: 'TTLs & Eviction Policies', link: '/sections/hld/caching/eviction-policies' },
            { text: 'CDN Caching', link: '/sections/hld/caching/cdn-caching' },
            { text: 'Pitfalls: Invalidation & Hot Keys', link: '/sections/hld/caching/pitfalls' }
          ]
        },
        {
          text: '4. Networking & Communication',
          items: [
            { text: 'Protocols', link: '/sections/hld/networking/protocols' },
            { text: 'APIs: REST vs GraphQL', link: '/sections/hld/networking/apis' },
            { text: 'Load Balancing (L4 vs L7)', link: '/sections/hld/networking/load-balancing' },
            { text: 'CDNs & Edge Computing', link: '/sections/hld/networking/cdns-edge' }
          ]
        },
        {
          text: '5. Scalability Patterns',
          items: [
            { text: 'Horizontal vs Vertical Scaling', link: '/sections/hld/scalability/scaling' },
            { text: 'Microservices vs Monoliths', link: '/sections/hld/scalability/microservices-vs-monoliths' },
            { text: 'Event-driven Architectures', link: '/sections/hld/scalability/event-driven' }
          ]
        },
        {
          text: '6. Distributed Systems Concepts',
          items: [
            { text: 'CAP Theorem & PACELC', link: '/sections/hld/distributed/cap-pacelc' },
            { text: 'Consensus Algorithms', link: '/sections/hld/distributed/consensus' },
            { text: 'Quorum Reads/Writes', link: '/sections/hld/distributed/quorum' },
            { text: 'Leader Election, Heartbeats, Failover', link: '/sections/hld/distributed/leader-election' },
            { text: 'Eventual vs Strong Consistency', link: '/sections/hld/distributed/consistency-tradeoffs' }
          ]
        },
        {
          text: '7. Reliability & Fault Tolerance',
          items: [
            { text: 'Replication (Sync vs Async)', link: '/sections/hld/reliability/replication' },
            { text: 'Failover Strategies', link: '/sections/hld/reliability/failover' },
            { text: 'Geo-replication & Multi-region', link: '/sections/hld/reliability/geo-replication' },
            { text: 'Graceful Degradation', link: '/sections/hld/reliability/graceful-degradation' },
            { text: 'Circuit Breakers, Retries, Timeouts', link: '/sections/hld/reliability/circuit-breakers' }
          ]
        },
        {
          text: '8. Security',
          items: [
            { text: 'Authentication vs Authorization', link: '/sections/hld/security/authentication-authorization' },
            { text: 'TLS & Encryption', link: '/sections/hld/security/encryption' },
            { text: 'Rate Limiting & Throttling', link: '/sections/hld/security/rate-limiting' },
            { text: 'DDoS Protection', link: '/sections/hld/security/ddos' }
          ]
        },
        {
          text: '9. Observability',
          items: [
            { text: 'Monitoring', link: '/sections/hld/observability/monitoring' },
            { text: 'Centralized Logging', link: '/sections/hld/observability/logging' },
            { text: 'Distributed Tracing', link: '/sections/hld/observability/tracing' },
            { text: 'Alerting Systems', link: '/sections/hld/observability/alerting' }
          ]
        },
        {
          text: '10. Common System Design Problems',
          items: [
            { text: 'URL Shortener', link: '/sections/hld/problems/url-shortener' },
            { text: 'News Feed', link: '/sections/hld/problems/news-feed' },
            { text: 'Chat System', link: '/sections/hld/problems/chat-system' },
            { text: 'Search', link: '/sections/hld/problems/search' },
            { text: 'Video Streaming', link: '/sections/hld/problems/video-streaming' },
            { text: 'E-commerce Checkout', link: '/sections/hld/problems/ecommerce' },
            { text: 'Ride Hailing', link: '/sections/hld/problems/ride-hailing' },
            { text: 'Payment System', link: '/sections/hld/problems/payment-system' }
          ]
        },
        {
          text: '11. Soft Skills for HLD Interviews',
          items: [
            { text: 'Interview Strategy & Trade-offs', link: '/sections/hld/soft-skills-hld' }
          ]
        },
        {
          text: '12. Scaling to Millions',
          items: [
            { text: 'Scaling One-Pager', link: '/sections/hld/scaling-one-pager' }
          ]
        },
        {
          text: '13. Frequently Asked Problems',
          items: [
            { text: 'Problem Index', link: '/sections/hld/faq-problems/frequently-asked-problems' }
          ]
        }
      ],
            '/sections/behavioral': [
        {
          text: 'Behavioral & Leadership Interview Preparation',
          items: [
            { text: '1. Introduction to Behavioral Interviews & STAR Framework', link: '/sections/behavioral/intro-behavioral' },
            { text: '2. Effective Communication in Technical Settings', link: '/sections/behavioral/communication' },
            { text: '3. Teamwork and Collaboration', link: '/sections/behavioral/teamwork' },
            { text: '4. Leadership: Leading Teams', link: '/sections/behavioral/leadership' },
            { text: '5. Ownership and Innovation', link: '/sections/behavioral/ownership-innovation' },
            { text: '6. Conflict Resolution & Handling Failures', link: '/sections/behavioral/conflict-failure' },
            { text: '7. Problem-Solving and Technical Trade-Offs', link: '/sections/behavioral/problem-solving' },
            { text: '8. Learning, Growth, and Continuous Improvement', link: '/sections/behavioral/learning-growth' },
            { text: '9. Tailoring for Amazon: Leadership Principles', link: '/sections/behavioral/amazon-principles' },
            { text: '10. Tailoring for Google: GCA and Googleyness', link: '/sections/behavioral/google-gca' },
            { text: '11. Tailoring for Meta: Execution Speed & Real-Time Systems', link: '/sections/behavioral/meta-execution' },
            { text: '12. Tailoring for Netflix: Freedom & Responsibility', link: '/sections/behavioral/netflix-responsibility' },
            { text: '13. Influencing & Managing Up/Down', link: '/sections/behavioral/influencing-managing' },
            { text: '14. Common Questions & Conflict Frameworks', link: '/sections/behavioral/common-questions' },
            { text: '15. Capstone: Full Mock Behavioral Interview', link: '/sections/behavioral/capstone-interview' }
          ]
        }
      ],
      '/sections/domain-topics': [
        {
          text: 'Domain-Specific Topics',
          items: [
            { text: '1. Cloud Fundamentals: AWS/GCP/OCI', link: '/sections/domain-topics/cloud-fundamentals' },
            { text: '2. IaC with Terraform', link: '/sections/domain-topics/terraform-iac' },
            { text: '3. Containerization: Docker and Kubernetes', link: '/sections/domain-topics/containerization' },
            { text: '4. Distributed Systems: CAP, Consensus', link: '/sections/domain-topics/distributed-systems' },
            { text: '5. Monitoring and Alerts', link: '/sections/domain-topics/monitoring-alerts' },
            { text: '6. GPU and AI Infra: Telemetry and SCADA', link: '/sections/domain-topics/ai-infra' },
            { text: '7. Microservices Pitfalls and Best Practices', link: '/sections/domain-topics/microservices' },
            { text: '8. CI/CD Pipelines', link: '/sections/domain-topics/cicd-pipelines' },
            { text: '9. Security in Infra: Fraud Prevention', link: '/sections/domain-topics/security-infra' },
            { text: '10. Capstone: Integrating All Sections', link: '/sections/domain-topics/capstone' }
          ]
        }
      ],
      '/sections/clean-code': [
        {
          text: 'Clean Code',
          items: [
            { text: '1. Introduction to Clean Code: Principles and Impact', link: '/sections/clean-code/intro-clean-code' },
            { text: '2. Crafting Readable Code', link: '/sections/clean-code/readable-code' },
            { text: '3. Designing Modular Code', link: '/sections/clean-code/modular-code' },
            { text: '4. Robust Error Handling', link: '/sections/clean-code/error-handling' },
            { text: '5. Writing Testable Code', link: '/sections/clean-code/testable-code' },
            { text: '6. Balancing Performance and Clarity', link: '/sections/clean-code/performance-clarity' },
            { text: '7. Documentation and Code Reviews', link: '/sections/clean-code/documentation-reviews' }
          ]
        }
      ],
      '/sections/refactoring': [
        {
          text: 'Refactoring',
          items: [
            { text: '1. Introduction to Refactoring: Goals and Process', link: '/sections/refactoring/intro-refactoring' },
            { text: '2. Identifying Code Smells', link: '/sections/refactoring/code-smells' },
            { text: '3. Simplifying Code through Refactoring', link: '/sections/refactoring/simplifying-code' },
            { text: '4. Refactoring with Patterns and Principles', link: '/sections/refactoring/patterns-principles' },
            { text: '5. Refactoring for Concurrency and Performance', link: '/sections/refactoring/concurrency-performance' },
            { text: '6. Advanced Refactoring Techniques and Tools', link: '/sections/refactoring/advanced-techniques' },
            { text: '7. Refactoring Case Study: Monolith to Microservices', link: '/sections/refactoring/monolith-microservices' }
          ]
        }
      ],
      '/sections/mocks': [
        {
          text: 'Mock Practice',
          items: [
            { text: '1. Mock Coding Interview', link: '/sections/mocks/coding-interview' },
            { text: '2. Mock System Design Interview', link: '/sections/mocks/system-design-interview' },
            { text: '3. Mock Behavioral Interview', link: '/sections/mocks/behavioral-interview' },
            { text: '4. Capstone: Simulating a Full FAANG Onsite', link: '/sections/mocks/full-onsite' }
          ]
        }
      ],
            '/sections/lld': [
        {
          text: 'Low-Level System Design',
          items: [
            { text: '1. LLD Intro: From HLD to Detailed Design', link: '/sections/lld/intro-lld' },
            { text: '2. Database Design and Indexing', link: '/sections/lld/database-design' },
            { text: '3. API Design: RESTful, Idempotency, Versioning', link: '/sections/lld/api-design' },
            { text: '4. Concurrency Handling: Locks, Threads', link: '/sections/lld/concurrency-handling' },
            { text: '5. Error Handling, Edge Cases, and Resilience', link: '/sections/lld/error-handling' },
            { text: '6. Design a Parking Lot System', link: '/sections/lld/parking-lot' },
            { text: '7. Design an Elevator System', link: '/sections/lld/elevator-system' },
            { text: '8. Design a Vending Machine', link: '/sections/lld/vending-machine' },
            { text: '9. Design an ATM Machine', link: '/sections/lld/atm-machine' },
            { text: '10. Design a Restaurant Management System', link: '/sections/lld/restaurant-management' },
            { text: '11. Design a Library Management System', link: '/sections/lld/library-management' },
            { text: '12. Design a Chess Game', link: '/sections/lld/chess-game' },
            { text: '13. Design Tic-Tac-Toe', link: '/sections/lld/tic-tac-toe' },
            { text: '14. Design Snake and Ladder Game', link: '/sections/lld/snake-ladder' },
            { text: '15. Design a Deck of Cards', link: '/sections/lld/deck-of-cards' },
            { text: '16. Design an LRU Cache', link: '/sections/lld/lru-cache' },
            { text: '17. Design a Rate Limiter', link: '/sections/lld/rate-limiter' },
            { text: '18. Design a Text Editor (e.g., Notepad)', link: '/sections/lld/text-editor' },
            { text: '19. Design a Movie Ticket Booking System', link: '/sections/lld/movie-ticket-booking' },
            { text: '20. Design a File System', link: '/sections/lld/file-system' },
            { text: '21. Design a Logger', link: '/sections/lld/logger' },
            { text: '22. Design a URL Parser', link: '/sections/lld/url-parser' },
            { text: '23. Design a Stack Overflow-like Q&A System (core)', link: '/sections/lld/qa-system' },
            { text: '24. Design a Traffic Light Controller', link: '/sections/lld/traffic-light' },
            { text: '25. Design a Hospital Management System', link: '/sections/lld/hospital-management' },
            { text: '26. Design a Cache with Expiry', link: '/sections/lld/cache-with-expiry' },
            { text: '27. Design a Notification Dispatcher', link: '/sections/lld/notification-dispatcher' },
            { text: '28. Design an Inventory Manager', link: '/sections/lld/inventory-manager' },
            { text: '29. Design a Matchmaking Engine', link: '/sections/lld/matchmaking-engine' },
            { text: '30. Design a Telemetry Collector', link: '/sections/lld/telemetry-collector' },
            { text: '31. Mock LLD Interview: Live Class Diagram Session', link: '/sections/lld/mock-lld-interview' },
            { text: '32. Integrating LLD with Design Patterns/Principles', link: '/sections/lld/lld-design-patterns' },
            { text: '33. Capstone: Combining LLD Components into a System', link: '/sections/lld/capstone-lld' }
          ]
        }
      ],
            '/sections/algorithms': [
        {
          text: 'Algorithms',
          items: [
            { text: 'Overview', link: '/sections/algorithms' },
            { text: '1. Problem-Solving Mindsets', link: '/sections/algorithms/problem-solving-mindsets' },
            { text: '2. Two-Pointers and Sliding Windows', link: '/sections/algorithms/two-pointers-sliding-windows' },
            { text: '3. Prefix Sums and Hashing', link: '/sections/algorithms/prefix-sums-hashing' },
            { text: '4. Linked Lists: Reversal and Cycle Detection', link: '/sections/algorithms/linked-lists-reversal-cycle-detection' },
            { text: '5. Stacks and Queues: BFS/DFS', link: '/sections/algorithms/stacks-queues-bfs-dfs' },
            { text: '6. Trees: Traversals and Balancing', link: '/sections/algorithms/binary-trees-traversals-balancing' },
            { text: '7. Graphs: Shortest Paths', link: '/sections/algorithms/graphs-shortest-paths-topological-sort' },
            { text: '8. Heaps: Priority Queues', link: '/sections/algorithms/heaps-priority-queues' },
            { text: '9. 1D Dynamic Programming', link: '/sections/algorithms/dynamic-programming-1d-patterns' },
            { text: '10. 2D/Multi-DP Patterns', link: '/sections/algorithms/dynamic-programming-2d-patterns' },
            { text: '11. Greedy and Bit Manipulation', link: '/sections/algorithms/greedy-bit-manipulation' },
            { text: '12. Capstone: Mixing Patterns', link: '/sections/algorithms/capstone-mixing-patterns' },
            { text: '13. Union-Find and Optimizations', link: '/sections/algorithms/union-find-optimizations' },
            { text: '14. Segment and Fenwick Trees', link: '/sections/algorithms/segment-fenwick-trees' },
            { text: '15. Advanced String Algorithms', link: '/sections/algorithms/advanced-string-algorithms' }
          ]
        }
      ],
      '/sections/ood': [
        {
          text: 'Object-Oriented Design',
          items: [
            { text: 'Overview', link: '/sections/ood' },
            { text: '1. OOP Fundamentals', link: '/sections/ood/oop-fundamentals' },
            { text: '2. UML and Class Diagrams', link: '/sections/ood/uml-class-diagrams' },
            { text: '3. Designing Simple Systems: Parking Lot', link: '/sections/ood/parking-lot-design' },
            { text: '4. Concurrency in OOD', link: '/sections/ood/concurrency-in-ood' },
            { text: '5. Advanced OOD: Elevator System', link: '/sections/ood/elevator-system-design' },
            { text: '6. OOD for E-Commerce: Inventory Management', link: '/sections/ood/ecommerce-inventory-management' },
            { text: '7. Trade-Offs and Refactoring', link: '/sections/ood/trade-offs-refactoring' },
            { text: '8. Mock Interview: Live OOD', link: '/sections/ood/mock-interview-ood' }
          ]
        }
      ],
      '/sections/design-patterns': [
        {
          text: 'Design Patterns',
          items: [
            { text: 'Overview', link: '/sections/design-patterns' },
            { text: '1. Introduction to Design Patterns', link: '/sections/design-patterns/intro-design-patterns' },
            { text: '2. Singleton Pattern', link: '/sections/design-patterns/singleton-pattern' },
            { text: '3. Factory Method Pattern', link: '/sections/design-patterns/factory-method-pattern' },
            { text: '4. Abstract Factory Pattern', link: '/sections/design-patterns/abstract-factory-pattern' },
            { text: '5. Builder Pattern', link: '/sections/design-patterns/builder-pattern' },
            { text: '6. Adapter Pattern', link: '/sections/design-patterns/adapter-pattern' },
            { text: '7. Decorator Pattern', link: '/sections/design-patterns/decorator-pattern' },
            { text: '8. Facade Pattern', link: '/sections/design-patterns/facade-pattern' },
            { text: '9. Composite Pattern', link: '/sections/design-patterns/composite-pattern' },
            { text: '10. Strategy Pattern', link: '/sections/design-patterns/strategy-pattern' },
            { text: '11. Observer Pattern', link: '/sections/design-patterns/observer-pattern' },
            { text: '12. Command Pattern', link: '/sections/design-patterns/command-pattern' },
            { text: '13. Template Method Pattern', link: '/sections/design-patterns/template-method-pattern' },
            { text: '14. Dependency Injection', link: '/sections/design-patterns/dependency-injection' },
            { text: '15. Mock Interview: Applying Patterns', link: '/sections/design-patterns/mock-interview-patterns' }
          ]
        }
      ],
      '/sections/design-principles': [
        {
          text: 'Design Principles',
          items: [
            { text: 'Overview', link: '/sections/design-principles' },
            { text: '1. Introduction to Design Principles', link: '/sections/design-principles/intro-design-principles' },
            { text: '2. Single Responsibility Principle', link: '/sections/design-principles/single-responsibility-principle' },
            { text: '3. Open-Closed Principle', link: '/sections/design-principles/open-closed-principle' },
            { text: '4. Liskov Substitution Principle', link: '/sections/design-principles/liskov-substitution-principle' },
            { text: '5. Interface Segregation Principle', link: '/sections/design-principles/interface-segregation-principle' },
            { text: '6. Dependency Inversion Principle', link: '/sections/design-principles/dependency-inversion-principle' },
            { text: '7. DRY: Don’t Repeat Yourself', link: '/sections/design-principles/dry-principle' },
            { text: '8. KISS: Keep It Simple, Stupid', link: '/sections/design-principles/kiss-principle' },
            { text: '9. YAGNI: You Aren’t Gonna Need It', link: '/sections/design-principles/yagni-principle' },
            { text: '10. Law of Demeter', link: '/sections/design-principles/law-of-demeter' },
            { text: '11. Separation of Concerns', link: '/sections/design-principles/separation-of-concerns' },
            { text: '12. POLA and GRASP Principles', link: '/sections/design-principles/pola-grasp-principles' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ravishankarkumar/officialcto' }
    ]
  }
})
