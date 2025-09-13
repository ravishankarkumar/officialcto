import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Official CTO blogs",
  description: "Tools to become better software engineer and do well in the tech interviews",
  cleanUrls: true,
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
          { text: 'High-Level System Design', link: '/sections/hld' },
          // { text: 'Low-Level System Design', link: '/sections/lld' },
          // { text: 'Behavioral Skills', link: '/sections/behavioral' },
          // { text: 'Domain-Specific Topics', link: '/sections/domain-topics' },
          // { text: 'Clean Code', link: '/sections/clean-code' },
          // { text: 'Refactoring', link: '/sections/refactoring' },
          // { text: 'Mock Practice', link: '/sections/mocks' }
        ]
      },
      { text: 'About', link: '/about' },
      { text: 'Contact', link: '/contact' }
    ],

    sidebar: [
      // {
      //   text: 'Examples',
      //   items: [
      //     { text: 'Markdown Examples', link: '/markdown-examples' },
      //     { text: 'Runtime API Examples', link: '/api-examples' }
      //   ]
      // }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ravishankarkumar/officialcto' }
    ]
  }
})
