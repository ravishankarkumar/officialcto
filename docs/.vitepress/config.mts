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
          text: 'Scaling to millions of users',
          link: '/sections/hld/scaling-to-millions-users'
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ravishankarkumar/officialcto' }
    ]
  }
})
