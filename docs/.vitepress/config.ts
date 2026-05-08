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
      { text: 'v0.3.0 overview', link: '/en/versions/v0.3.0/overview' },
      { text: 'v0.3.0', link: '/en/versions/v0.3.0/specification' },
      { text: 'v0.2.0 overview', link: '/en/versions/v0.2.0/overview' },
      { text: 'v0.2.0', link: '/en/versions/v0.2.0/specification' },
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
      { text: 'v0.3.0 概览', link: '/zh/versions/v0.3.0/overview' },
      { text: 'v0.3.0', link: '/zh/versions/v0.3.0/specification' },
      { text: 'v0.2.0 概览', link: '/zh/versions/v0.2.0/overview' },
      { text: 'v0.2.0', link: '/zh/versions/v0.2.0/specification' },
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
      { text: 'Artifact and canvas', link: '/en/surfaces/artifact-canvas' },
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
      { text: 'Ecosystem boundaries', link: '/en/reference/ecosystem-boundaries' },
      { text: 'Research sources', link: '/en/reference/research-sources' }
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
      { text: 'v0.3.0 overview', link: '/en/versions/v0.3.0/overview' },
      { text: 'v0.3.0 specification', link: '/en/versions/v0.3.0/specification' },
      { text: 'v0.3.0 changelog', link: '/en/versions/v0.3.0/changelog' },
      { text: 'v0.2.0 overview', link: '/en/versions/v0.2.0/overview' },
      { text: 'v0.2.0 specification', link: '/en/versions/v0.2.0/specification' },
      { text: 'v0.2.0 changelog', link: '/en/versions/v0.2.0/changelog' },
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
      { text: 'Artifact 与 Canvas', link: '/zh/surfaces/artifact-canvas' },
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
      { text: '生态边界', link: '/zh/reference/ecosystem-boundaries' },
      { text: '调研来源', link: '/zh/reference/research-sources' }
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
      { text: 'v0.3.0 概览', link: '/zh/versions/v0.3.0/overview' },
      { text: 'v0.3.0 规范', link: '/zh/versions/v0.3.0/specification' },
      { text: 'v0.3.0 变更记录', link: '/zh/versions/v0.3.0/changelog' },
      { text: 'v0.2.0 概览', link: '/zh/versions/v0.2.0/overview' },
      { text: 'v0.2.0 规范', link: '/zh/versions/v0.2.0/specification' },
      { text: 'v0.2.0 变更记录', link: '/zh/versions/v0.2.0/changelog' },
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
