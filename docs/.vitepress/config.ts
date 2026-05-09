import { defineConfig } from 'vitepress'

const base = process.env.VITEPRESS_BASE || '/'

const versions = ['0.5.0', '0.4.8', '0.4.7', '0.4.6', '0.4.5', '0.4.4', '0.4.3', '0.4.2', '0.4.1', '0.4.0', '0.3.0', '0.2.0', '0.1.0']

const enVersionItems = versions.flatMap((version) => [
  { text: `v${version} overview`, link: `/en/versions/v${version}/overview` },
  { text: `v${version} specification`, link: `/en/versions/v${version}/specification` },
  { text: `v${version} changelog`, link: `/en/versions/v${version}/changelog` }
])

const zhVersionItems = versions.flatMap((version) => [
  { text: `v${version} 概览`, link: `/zh/versions/v${version}/overview` },
  { text: `v${version} 规范`, link: `/zh/versions/v${version}/specification` },
  { text: `v${version} 变更记录`, link: `/zh/versions/v${version}/changelog` }
])

const enNav = [
  { text: 'Guide', link: '/en/what-is-agent-ui' },
  { text: 'Specification', link: '/en/specification' },
  { text: 'Examples', link: '/en/examples/' },
  { text: 'Ecosystem', link: '/en/reference/agent-ecosystem' },
  {
    text: 'Version',
    items: [
      { text: 'latest', link: '/en/specification' },
      ...enVersionItems
    ]
  }
]

const zhNav = [
  { text: '指南', link: '/zh/what-is-agent-ui' },
  { text: '规范', link: '/zh/specification' },
  { text: '示例', link: '/zh/examples/' },
  { text: '生态', link: '/zh/reference/agent-ecosystem' },
  {
    text: '版本',
    items: [
      { text: 'latest', link: '/zh/specification' },
      ...zhVersionItems
    ]
  }
]

const enSidebar = [
  {
    text: 'Start here',
    items: [
      { text: 'Overview', link: '/en/' },
      { text: 'What is Agent UI?', link: '/en/what-is-agent-ui' },
      { text: 'Specification', link: '/en/specification' }
    ]
  },
  {
    text: 'For implementors',
    items: [
      { text: 'Implementation quickstart', link: '/en/authoring/quickstart' },
      { text: 'Best practices', link: '/en/authoring/best-practices' },
      { text: 'Acceptance scenarios', link: '/en/authoring/acceptance-scenarios' }
    ]
  },
  {
    text: 'Surfaces',
    items: [
      { text: 'Composer', link: '/en/surfaces/composer' },
      { text: 'Message parts', link: '/en/surfaces/message-parts' },
      { text: 'Runtime status', link: '/en/surfaces/runtime-status' },
      { text: 'Tool UI', link: '/en/surfaces/tool-ui' },
      { text: 'Task capsule', link: '/en/surfaces/task-capsule' },
      { text: 'Human-in-the-loop', link: '/en/surfaces/human-in-the-loop' },
      { text: 'Artifact Workspace', link: '/en/surfaces/artifact-canvas' },
      { text: 'Timeline and evidence', link: '/en/surfaces/timeline-evidence' },
      { text: 'Session and tabs', link: '/en/surfaces/session-tabs' }
    ]
  },
  {
    text: 'Contracts',
    items: [
      { text: 'Runtime event projection', link: '/en/contracts/runtime-event-projection' },
      { text: 'Backend coordination', link: '/en/contracts/backend-coordination' },
      { text: 'Performance metrics', link: '/en/contracts/performance-metrics' }
    ]
  },
  {
    text: 'For client implementors',
    items: [
      { text: 'Runtime standard', link: '/en/client-implementation/runtime-standard' },
      { text: 'Progressive rendering', link: '/en/client-implementation/progressive-rendering' },
      { text: 'Session hydration', link: '/en/client-implementation/session-hydration' },
      { text: 'Queue and steer', link: '/en/client-implementation/queue-and-steer' }
    ]
  },
  {
    text: 'Reference',
    items: [
      { text: 'Glossary', link: '/en/reference/glossary' },
      { text: 'Flow and taxonomy', link: '/en/reference/flow-and-taxonomy' },
      { text: 'Source index', link: '/en/reference/source-index' },
      { text: 'Agent standards ecosystem', link: '/en/reference/agent-ecosystem' },
      { text: 'Ecosystem boundaries', link: '/en/reference/ecosystem-boundaries' },
      { text: 'Research sources', link: '/en/reference/research-sources' }
    ]
  },
  {
    text: 'Examples',
    items: [
      { text: 'Examples overview', link: '/en/examples/' },
      { text: 'Interactive workbench notes', link: '/en/examples/interactive-workbench' },
      { text: 'Basic agent workbench', link: '/en/examples/basic-agent-workbench' }
    ]
  },
  {
    text: 'Versions',
    items: enVersionItems
  }
]

const zhSidebar = [
  {
    text: '开始',
    items: [
      { text: '概览', link: '/zh/' },
      { text: '什么是 Agent UI', link: '/zh/what-is-agent-ui' },
      { text: '规范', link: '/zh/specification' }
    ]
  },
  {
    text: '实现者',
    items: [
      { text: '快速开始', link: '/zh/authoring/quickstart' },
      { text: '最佳实践', link: '/zh/authoring/best-practices' },
      { text: '验收场景', link: '/zh/authoring/acceptance-scenarios' }
    ]
  },
  {
    text: '表面',
    items: [
      { text: 'Composer', link: '/zh/surfaces/composer' },
      { text: 'Message parts', link: '/zh/surfaces/message-parts' },
      { text: 'Runtime status', link: '/zh/surfaces/runtime-status' },
      { text: 'Tool UI', link: '/zh/surfaces/tool-ui' },
      { text: 'Task capsule', link: '/zh/surfaces/task-capsule' },
      { text: 'Human-in-the-loop', link: '/zh/surfaces/human-in-the-loop' },
      { text: 'Artifact 工作区', link: '/zh/surfaces/artifact-canvas' },
      { text: 'Timeline 与 Evidence', link: '/zh/surfaces/timeline-evidence' },
      { text: 'Session 与 Tab', link: '/zh/surfaces/session-tabs' }
    ]
  },
  {
    text: '契约',
    items: [
      { text: 'Runtime event projection', link: '/zh/contracts/runtime-event-projection' },
      { text: '后端协作', link: '/zh/contracts/backend-coordination' },
      { text: '性能指标', link: '/zh/contracts/performance-metrics' }
    ]
  },
  {
    text: '客户端实现者',
    items: [
      { text: '运行时标准', link: '/zh/client-implementation/runtime-standard' },
      { text: '渐进渲染', link: '/zh/client-implementation/progressive-rendering' },
      { text: 'Session hydration', link: '/zh/client-implementation/session-hydration' },
      { text: 'Queue 与 steer', link: '/zh/client-implementation/queue-and-steer' }
    ]
  },
  {
    text: '参考',
    items: [
      { text: '术语表', link: '/zh/reference/glossary' },
      { text: '全流程与分类', link: '/zh/reference/flow-and-taxonomy' },
      { text: '引用索引', link: '/zh/reference/source-index' },
      { text: 'Agent 标准生态', link: '/zh/reference/agent-ecosystem' },
      { text: '生态边界', link: '/zh/reference/ecosystem-boundaries' },
      { text: '调研来源', link: '/zh/reference/research-sources' }
    ]
  },
  {
    text: '示例',
    items: [
      { text: '示例概览', link: '/zh/examples/' },
      { text: '交互式工作台说明', link: '/zh/examples/interactive-workbench' },
      { text: '基础 Agent 工作台', link: '/zh/examples/basic-agent-workbench' }
    ]
  },
  {
    text: '版本',
    items: zhVersionItems
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
      message: 'Draft runtime-first standard for agent interaction surfaces.',
      copyright: 'Copyright © 2026'
    }
  },
  markdown: {
    lineNumbers: true,
    config(md) {
      const defaultFence = md.renderer.rules.fence
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const language = token.info.trim().split(/\s+/)[0]

        if (language === 'mermaid') {
          const encoded = encodeURIComponent(token.content)
          return `<ClientOnly><MermaidDiagram code="${encoded}" /></ClientOnly>`
        }

        return defaultFence
          ? defaultFence(tokens, idx, options, env, self)
          : self.renderToken(tokens, idx, options)
      }
    }
  }
})
