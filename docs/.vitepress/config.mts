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
          // { text: 'Object-Oriented Design', link: '/sections/ood' },
          // { text: 'Design Patterns', link: '/sections/design-patterns' },
          // { text: 'Design Principles', link: '/sections/design-principles' },
          // { text: 'Low-Level System Design', link: '/sections/lld' },
          // { text: 'Behavioral Skills', link: '/sections/behavioral' },
          // { text: 'Domain-Specific Topics', link: '/sections/domain-topics' },
          // { text: 'Clean Code', link: '/sections/clean-code' },
          // { text: 'Refactoring', link: '/sections/refactoring' },
          // { text: 'Mock Practice', link: '/sections/mocks' }
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
          link: '/sections/database/index'
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
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ravishankarkumar/officialcto' }
    ]
  }
})
