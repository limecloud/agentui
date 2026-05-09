import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import MermaidDiagram from './MermaidDiagram.vue'
import AgentWorkbenchDemo from './AgentWorkbenchDemo.vue'
import AgentExamplesGallery from './AgentExamplesGallery.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MermaidDiagram', MermaidDiagram)
    app.component('AgentWorkbenchDemo', AgentWorkbenchDemo)
    app.component('AgentExamplesGallery', AgentExamplesGallery)
  }
} satisfies Theme
