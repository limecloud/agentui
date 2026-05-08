<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

const props = defineProps<{
  code: string
}>()

const { isDark } = useData()
const source = computed(() => decodeURIComponent(props.code))
const svg = ref('')
const error = ref('')
let renderCount = 0

async function renderDiagram() {
  if (typeof window === 'undefined') return

  try {
    error.value = ''
    const mermaid = (await import('mermaid')).default
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: isDark.value ? 'dark' : 'default'
    })

    renderCount += 1
    const id = `au-mermaid-${Date.now()}-${renderCount}`
    const result = await mermaid.render(id, source.value)
    svg.value = result.svg
  } catch (reason) {
    svg.value = ''
    error.value = reason instanceof Error ? reason.message : String(reason)
  }
}

onMounted(renderDiagram)
watch(() => props.code, renderDiagram)
watch(isDark, renderDiagram)
</script>

<template>
  <figure class="au-mermaid">
    <div v-if="svg" class="au-mermaid__canvas" v-html="svg" />
    <pre v-else class="au-mermaid__fallback"><code>{{ source }}</code></pre>
    <figcaption v-if="error" class="au-mermaid__error">Mermaid render failed: {{ error }}</figcaption>
  </figure>
</template>
