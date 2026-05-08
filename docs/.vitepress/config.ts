import { defineConfig } from 'vitepress'

const base = process.env.VITEPRESS_BASE || '/'

const enNav = [
  { text: 'Guide', link: '/en/what-is-agent-ui' },
  { text: 'Specification', link: '/en/specification' },
  { text: 'Examples', link: '/en/examples/basic-agent-workbench' },
  {
    text: 'Version',
    items: [
      { text: 'latest', link: '/en/specification' },
      { text: 'v0.1.0 overview', link: '/en/versions/v0.1.0/overview' },
      { text: 'v0.1.0', link: '/en/versions/v0.1.0/specification' }
    ]
  }
]

const zhNav = [
  { text: '指南', link: '/zh/what-is-agent-ui' },
  { text: '规范', link: '/zh/specification' },
  { text: '示例', link: '/zh/examples/basic-agent-workbench' },
  {
    text: '版本',
    items: [
      { text: 'latest', link: '/zh/specification' },
      { text: 'v0.1.0 概览', link: '/zh/versions/v0.1.0/overview' },
      { text: 'v0.1.0', link: '/zh/versions/v0.1.0/specification' }
    ]
  }
]

const enSidebar = [
  {
    text: 'Start here',
    items: [
      { text: 'Overview', link: '/en/' },
      { text: 'What is Agent UI?', link: '/en/what-is-agent-ui' },
      { text: 'UI vs Skills and Knowledge', link: '/en/agent-ui-vs-skills-knowledge' },
      { text: 'Specification', link: '/en/specification' }
    ]
  },
  {
    text: 'For UI authors',
    items: [
      { text: 'Quickstart', link: '/en/authoring/quickstart' },
      { text: 'Best practices', link: '/en/authoring/best-practices' }
    ]
  },
  {
    text: 'For client implementors',
    items: [
      { text: 'Runtime standard', link: '/en/client-implementation/runtime-standard' },
      { text: 'Progressive rendering', link: '/en/client-implementation/progressive-rendering' }
    ]
  },
  {
    text: 'Reference',
    items: [
      { text: 'Glossary', link: '/en/reference/glossary' }
    ]
  },
  {
    text: 'Examples',
    items: [
      { text: 'Basic agent workbench', link: '/en/examples/basic-agent-workbench' }
    ]
  },
  {
    text: 'Versions',
    items: [
      { text: 'v0.1.0 overview', link: '/en/versions/v0.1.0/overview' },
      { text: 'v0.1.0 specification', link: '/en/versions/v0.1.0/specification' },
      { text: 'v0.1.0 changelog', link: '/en/versions/v0.1.0/changelog' }
    ]
  }
]

const zhSidebar = [
  {
    text: '开始',
    items: [
      { text: '概览', link: '/zh/' },
      { text: '什么是 Agent UI', link: '/zh/what-is-agent-ui' },
      { text: 'UI 与 Skills / Knowledge 的边界', link: '/zh/agent-ui-vs-skills-knowledge' },
      { text: '规范', link: '/zh/specification' }
    ]
  },
  {
    text: 'UI 作者',
    items: [
      { text: '快速开始', link: '/zh/authoring/quickstart' },
      { text: '最佳实践', link: '/zh/authoring/best-practices' }
    ]
  },
  {
    text: '客户端实现者',
    items: [
      { text: '运行时标准', link: '/zh/client-implementation/runtime-standard' },
      { text: '渐进渲染', link: '/zh/client-implementation/progressive-rendering' }
    ]
  },
  {
    text: '参考',
    items: [
      { text: '术语表', link: '/zh/reference/glossary' }
    ]
  },
  {
    text: '示例',
    items: [
      { text: '基础 Agent 工作台', link: '/zh/examples/basic-agent-workbench' }
    ]
  },
  {
    text: '版本',
    items: [
      { text: 'v0.1.0 概览', link: '/zh/versions/v0.1.0/overview' },
      { text: 'v0.1.0 规范', link: '/zh/versions/v0.1.0/specification' },
      { text: 'v0.1.0 变更记录', link: '/zh/versions/v0.1.0/changelog' }
    ]
  }
]

export default defineConfig({
  base,
  title: 'Agent UI',
  description: 'A portable standard for agent interaction surfaces.',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'English', items: enNav },
      { text: '中文', items: zhNav }
    ],
    sidebar: {
      '/en/': enSidebar,
      '/zh/': zhSidebar
    },
    search: {
      provider: 'local'
    },
    footer: {
      message: 'Draft sibling standard in the Agent Skills ecosystem.',
      copyright: 'Copyright © 2026'
    }
  }
})
