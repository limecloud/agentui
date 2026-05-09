<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'

type Locale = 'en' | 'zh'

type DemoEvent = {
  type: string
  owner: string
  scope: string
  phase: string
  surface: string
  title: Record<Locale, string>
  detail: Record<Locale, string>
  payload?: Record<string, string | number>
}

const props = withDefaults(defineProps<{ locale?: Locale }>(), {
  locale: 'en'
})

const copy = {
  en: {
    badge: 'Interactive example',
    title: 'Runtime events projected into Agent UI surfaces',
    subtitle: 'Step through one run and watch the same ordered facts drive message parts, active process, tools, HITL, artifacts, evidence, and timeline archive.',
    play: 'Play stream',
    pause: 'Pause',
    step: 'Step event',
    reset: 'Reset',
    approve: 'Approve HITL action',
    completed: 'Completed',
    running: 'Running',
    waiting: 'Waiting for user',
    idle: 'Idle',
    session: 'Session',
    task: 'Task capsule',
    message: 'Conversation',
    process: 'Inline process',
    tool: 'Tool lifecycle',
    artifact: 'Artifact workspace',
    evidence: 'Evidence',
    raw: 'Ordered event stream',
    payload: 'Latest payload',
    collapseNote: 'Run completed: process details are archived and collapsed by default.',
    expandArchive: 'Show archive details',
    collapseArchive: 'Hide archive details',
    answerPlaceholder: 'Final answer text appears only from text.delta/text.final parts.',
    processPlaceholder: 'Runtime status, reasoning, tools, and actions stay expanded while active.',
    hitlBlocked: 'Playback is blocked until the controlled HITL action is resolved.',
    noPayload: 'No payload yet.',
    artifactEmpty: 'No artifact preview yet.',
    evidenceEmpty: 'No evidence facts yet.'
  },
  zh: {
    badge: '交互示例',
    title: 'Runtime events 投影到 Agent UI 表面',
    subtitle: '逐步播放一次 run，观察同一组有序事实如何驱动 message parts、active process、tools、HITL、artifacts、evidence 与 timeline archive。',
    play: '播放流',
    pause: '暂停',
    step: '前进一步',
    reset: '重置',
    approve: '批准 HITL 动作',
    completed: '已完成',
    running: '运行中',
    waiting: '等待用户',
    idle: '空闲',
    session: '会话',
    task: '任务胶囊',
    message: '对话',
    process: '内联过程',
    tool: '工具生命周期',
    artifact: '产物工作区',
    evidence: '证据',
    raw: '有序事件流',
    payload: '最新 payload',
    collapseNote: 'Run 已完成：过程细节默认归档并折叠。',
    expandArchive: '展开归档细节',
    collapseArchive: '收起归档细节',
    answerPlaceholder: '最终回答正文只来自 text.delta/text.final parts。',
    processPlaceholder: 'Runtime status、reasoning、tools 与 actions 在运行中保持展开。',
    hitlBlocked: '播放已阻塞，直到受控 HITL 动作被解决。',
    noPayload: '暂无 payload。',
    artifactEmpty: '暂无 artifact preview。',
    evidenceEmpty: '暂无 evidence facts。'
  }
} satisfies Record<Locale, Record<string, string>>

const events: DemoEvent[] = [
  {
    type: 'session.opened',
    owner: 'session',
    scope: 'session',
    phase: 'draft',
    surface: 'session_tabs',
    title: { en: 'Session restored', zh: '会话已恢复' },
    detail: { en: 'Thread shell and recent messages are visible before deep timeline hydration.', zh: '先显示 thread shell 与最近消息，再渐进加载完整 timeline。' },
    payload: { sessionId: 'session-roadmap', threadId: 'thread-agentui' }
  },
  {
    type: 'run.started',
    owner: 'runtime',
    scope: 'run',
    phase: 'submitted',
    surface: 'runtime_status',
    title: { en: 'Run accepted', zh: 'Run 已接受' },
    detail: { en: 'The UI binds the listener before submitting the user turn.', zh: 'UI 在提交用户 turn 前先绑定监听器。' },
    payload: { runId: 'run-042', turnId: 'turn-frontend-demo' }
  },
  {
    type: 'run.status',
    owner: 'runtime',
    scope: 'run',
    phase: 'routing',
    surface: 'runtime_status',
    title: { en: 'Routing to coding agent', zh: '路由到编码 Agent' },
    detail: { en: 'Status appears before any assistant text.', zh: '状态先于任何 assistant text 出现。' },
    payload: { stage: 'routing', latencyMs: 184 }
  },
  {
    type: 'context.changed',
    owner: 'context',
    scope: 'turn',
    phase: 'preparing',
    surface: 'composer',
    title: { en: 'Context selected', zh: '上下文已选择' },
    detail: { en: 'Roadmap, prior research, and schema refs are attached as context facts.', zh: '路线图、前序调研与 schema refs 作为 context facts 接入。' },
    payload: { contextRefs: 3, budget: '42k/64k' }
  },
  {
    type: 'plan.delta',
    owner: 'model',
    scope: 'turn',
    phase: 'planning',
    surface: 'inline_process',
    title: { en: 'Plan updated', zh: '计划已更新' },
    detail: { en: '1. inspect standard  2. add demo  3. verify build', zh: '1. 检查标准  2. 增加演示  3. 校验构建' },
    payload: { steps: 3 }
  },
  {
    type: 'reasoning.delta',
    owner: 'model',
    scope: 'part',
    phase: 'reasoning',
    surface: 'inline_process',
    title: { en: 'Reasoning part', zh: 'Reasoning part' },
    detail: { en: 'Thinking is an ordered part, not a header bucket.', zh: 'Thinking 是有序 part，不是顶部桶。' },
    payload: { partId: 'reasoning-1' }
  },
  {
    type: 'tool.started',
    owner: 'tool',
    scope: 'tool_call',
    phase: 'acting',
    surface: 'tool_ui',
    title: { en: 'Tool started: inspect docs', zh: '工具启动：检查文档' },
    detail: { en: 'Safe input summary is visible while the tool is running.', zh: '工具运行时显示安全输入摘要。' },
    payload: { toolCallId: 'tool-docs', name: 'inspect_docs' }
  },
  {
    type: 'tool.progress',
    owner: 'tool',
    scope: 'tool_call',
    phase: 'acting',
    surface: 'tool_ui',
    title: { en: 'Tool progress', zh: '工具进度' },
    detail: { en: 'Scanning example pages and VitePress theme components.', zh: '正在扫描示例页与 VitePress theme components。' },
    payload: { progress: '65%' }
  },
  {
    type: 'tool.result',
    owner: 'tool',
    scope: 'tool_call',
    phase: 'completed',
    surface: 'tool_ui',
    title: { en: 'Tool result', zh: '工具结果' },
    detail: { en: 'Existing examples are documentation-only; a live projection demo is missing.', zh: '现有 examples 偏文档说明，缺少 live projection demo。' },
    payload: { result: 'demo-gap-found' }
  },
  {
    type: 'action.required',
    owner: 'policy',
    scope: 'action_request',
    phase: 'waiting',
    surface: 'hitl',
    title: { en: 'Approval required', zh: '需要审批' },
    detail: { en: 'Publishable examples require an explicit controlled action in this demo.', zh: '本演示中，可发布示例需要显式受控动作。' },
    payload: { actionId: 'approve-demo', control: 'approve' }
  },
  {
    type: 'action.resolved',
    owner: 'policy',
    scope: 'action_request',
    phase: 'accepted',
    surface: 'hitl',
    title: { en: 'Approval resolved', zh: '审批已解决' },
    detail: { en: 'The response goes back through the action owner instead of mutating UI state directly.', zh: '响应写回 action owner，而不是直接篡改 UI state。' },
    payload: { actionId: 'approve-demo', decision: 'approved' }
  },
  {
    type: 'text.delta',
    owner: 'model',
    scope: 'part',
    phase: 'producing',
    surface: 'conversation',
    title: { en: 'Answer text', zh: '回答正文' },
    detail: { en: 'Add an interactive example that proves ordered parts and process archiving.', zh: '增加交互示例，证明有序 parts 与过程归档。' },
    payload: { messageId: 'assistant-1', partId: 'text-1' }
  },
  {
    type: 'artifact.preview.ready',
    owner: 'artifact',
    scope: 'artifact',
    phase: 'producing',
    surface: 'artifact_workspace',
    title: { en: 'Artifact preview ready', zh: '产物预览就绪' },
    detail: { en: 'Frontend projection demo is routed outside the final message body.', zh: '前端投影 demo 被路由到最终消息正文之外。' },
    payload: { artifactId: 'demo-workbench', artifactKind: 'frontend-demo' }
  },
  {
    type: 'evidence.changed',
    owner: 'evidence',
    scope: 'evidence',
    phase: 'producing',
    surface: 'timeline_evidence',
    title: { en: 'Evidence linked', zh: '证据已链接' },
    detail: { en: 'The event stream, projection surfaces, and acceptance rules share the same run id.', zh: '事件流、投影表面与验收规则共享同一个 run id。' },
    payload: { evidenceId: 'evidence-demo', refs: 4 }
  },
  {
    type: 'run.finished',
    owner: 'runtime',
    scope: 'run',
    phase: 'completed',
    surface: 'timeline_evidence',
    title: { en: 'Run finished', zh: 'Run 已完成' },
    detail: { en: 'Active process collapses into a timeline archive after completion.', zh: '完成后 active process 折叠为 timeline archive。' },
    payload: { outcome: 'success' }
  }
]

const t = computed(() => copy[props.locale])
const cursor = ref(0)
const isPlaying = ref(false)
const hitlResolved = ref(false)
const archiveOpen = ref(false)
let timer: ReturnType<typeof setInterval> | undefined

const activeEvents = computed(() => events.slice(0, cursor.value))
const latestEvent = computed(() => activeEvents.value[activeEvents.value.length - 1])
const completed = computed(() => activeEvents.value.some((event) => event.type === 'run.finished'))
const waitingForHitl = computed(() => events[cursor.value]?.type === 'action.resolved' && !hitlResolved.value)
const running = computed(() => cursor.value > 0 && !completed.value && !waitingForHitl.value)
const statusLabel = computed(() => {
  if (completed.value) return t.value.completed
  if (waitingForHitl.value) return t.value.waiting
  if (running.value) return t.value.running
  return t.value.idle
})
const answerText = computed(() => activeEvents.value.filter((event) => event.type === 'text.delta').map((event) => event.detail[props.locale]).join(' '))
const processEvents = computed(() => activeEvents.value.filter((event) => event.surface !== 'conversation' && event.surface !== 'session_tabs'))
const visibleProcessEvents = computed(() => {
  if (!completed.value || archiveOpen.value) return processEvents.value
  return processEvents.value.slice(-3)
})
const toolEvents = computed(() => activeEvents.value.filter((event) => event.type.startsWith('tool.')))
const artifactEvent = computed(() => activeEvents.value.findLast((event) => event.type.startsWith('artifact.')))
const evidenceEvent = computed(() => activeEvents.value.findLast((event) => event.type === 'evidence.changed'))
const payloadText = computed(() => {
  if (!latestEvent.value?.payload) return t.value.noPayload
  return JSON.stringify(latestEvent.value.payload, null, 2)
})
const progressPercent = computed(() => Math.round((cursor.value / events.length) * 100))

function stop() {
  isPlaying.value = false
  if (timer) {
    clearInterval(timer)
    timer = undefined
  }
}

function step() {
  if (cursor.value >= events.length) {
    stop()
    return
  }
  if (waitingForHitl.value) {
    stop()
    return
  }
  cursor.value += 1
  if (cursor.value >= events.length) stop()
}

function play() {
  if (isPlaying.value) {
    stop()
    return
  }
  isPlaying.value = true
  timer = setInterval(step, 720)
}

function approve() {
  hitlResolved.value = true
  step()
}

function reset() {
  stop()
  cursor.value = 0
  hitlResolved.value = false
  archiveOpen.value = false
}

onBeforeUnmount(stop)
</script>

<template>
  <section class="agent-demo" aria-label="Agent UI runtime projection demo">
    <div class="agent-demo__hero">
      <div>
        <p class="agent-demo__badge">{{ t.badge }}</p>
        <h2>{{ t.title }}</h2>
        <p>{{ t.subtitle }}</p>
      </div>
      <div class="agent-demo__status" :data-state="completed ? 'completed' : waitingForHitl ? 'waiting' : running ? 'running' : 'idle'">
        <span>{{ statusLabel }}</span>
        <strong>{{ progressPercent }}%</strong>
      </div>
    </div>

    <div class="agent-demo__controls">
      <button type="button" class="agent-demo__button agent-demo__button--primary" @click="play">
        {{ isPlaying ? t.pause : t.play }}
      </button>
      <button type="button" class="agent-demo__button" :disabled="cursor >= events.length || waitingForHitl" @click="step">
        {{ t.step }}
      </button>
      <button type="button" class="agent-demo__button" :disabled="!waitingForHitl" @click="approve">
        {{ t.approve }}
      </button>
      <button type="button" class="agent-demo__button" @click="reset">
        {{ t.reset }}
      </button>
    </div>

    <p v-if="waitingForHitl" class="agent-demo__notice">{{ t.hitlBlocked }}</p>

    <div class="agent-demo__grid">
      <article class="agent-demo__panel agent-demo__panel--conversation">
        <div class="agent-demo__panel-head">
          <span>{{ t.message }}</span>
          <code>conversation</code>
        </div>
        <div class="agent-demo__bubble agent-demo__bubble--user">Add a frontend example for the Agent UI standard.</div>
        <div class="agent-demo__bubble agent-demo__bubble--assistant">
          <span v-if="answerText">{{ answerText }}</span>
          <span v-else>{{ t.answerPlaceholder }}</span>
        </div>
      </article>

      <article class="agent-demo__panel agent-demo__panel--process">
        <div class="agent-demo__panel-head">
          <span>{{ t.process }}</span>
          <code>inline_process</code>
        </div>
        <p v-if="completed" class="agent-demo__archive-note">{{ t.collapseNote }}</p>
        <button v-if="completed" type="button" class="agent-demo__link-button" @click="archiveOpen = !archiveOpen">
          {{ archiveOpen ? t.collapseArchive : t.expandArchive }}
        </button>
        <div v-if="visibleProcessEvents.length" class="agent-demo__parts">
          <div v-for="event in visibleProcessEvents" :key="`${event.type}-${event.title.en}`" class="agent-demo__part" :data-phase="event.phase">
            <span>{{ event.type }}</span>
            <strong>{{ event.title[locale] }}</strong>
            <p>{{ event.detail[locale] }}</p>
          </div>
        </div>
        <p v-else class="agent-demo__empty">{{ t.processPlaceholder }}</p>
      </article>

      <article class="agent-demo__panel">
        <div class="agent-demo__panel-head">
          <span>{{ t.task }}</span>
          <code>task_capsule</code>
        </div>
        <div class="agent-demo__capsule">
          <strong>run-042</strong>
          <span>{{ statusLabel }}</span>
        </div>
        <div class="agent-demo__facts">
          <span>owner: runtime</span>
          <span>scope: run</span>
          <span>control: interrupt / retry</span>
        </div>
      </article>

      <article class="agent-demo__panel">
        <div class="agent-demo__panel-head">
          <span>{{ t.tool }}</span>
          <code>tool_ui</code>
        </div>
        <div v-if="toolEvents.length" class="agent-demo__tool-list">
          <div v-for="event in toolEvents" :key="event.type" class="agent-demo__tool-row">
            <span>{{ event.type }}</span>
            <p>{{ event.detail[locale] }}</p>
          </div>
        </div>
        <p v-else class="agent-demo__empty">tool.started -> tool.progress -> tool.result</p>
      </article>

      <article class="agent-demo__panel">
        <div class="agent-demo__panel-head">
          <span>{{ t.artifact }}</span>
          <code>artifact_workspace</code>
        </div>
        <div v-if="artifactEvent" class="agent-demo__artifact">
          <strong>{{ artifactEvent.title[locale] }}</strong>
          <p>{{ artifactEvent.detail[locale] }}</p>
        </div>
        <p v-else class="agent-demo__empty">{{ t.artifactEmpty }}</p>
      </article>

      <article class="agent-demo__panel">
        <div class="agent-demo__panel-head">
          <span>{{ t.evidence }}</span>
          <code>timeline_evidence</code>
        </div>
        <div v-if="evidenceEvent" class="agent-demo__artifact agent-demo__artifact--evidence">
          <strong>{{ evidenceEvent.title[locale] }}</strong>
          <p>{{ evidenceEvent.detail[locale] }}</p>
        </div>
        <p v-else class="agent-demo__empty">{{ t.evidenceEmpty }}</p>
      </article>
    </div>

    <div class="agent-demo__bottom">
      <article class="agent-demo__panel">
        <div class="agent-demo__panel-head">
          <span>{{ t.raw }}</span>
          <code>sequence</code>
        </div>
        <ol class="agent-demo__event-list">
          <li v-for="event in events" :key="event.type" :class="{ 'is-active': activeEvents.includes(event), 'is-next': events[cursor] === event }">
            <span>{{ event.type }}</span>
            <small>{{ event.owner }} / {{ event.scope }} / {{ event.phase }} / {{ event.surface }}</small>
          </li>
        </ol>
      </article>

      <article class="agent-demo__panel">
        <div class="agent-demo__panel-head">
          <span>{{ t.payload }}</span>
          <code>payload</code>
        </div>
        <pre>{{ payloadText }}</pre>
      </article>
    </div>
  </section>
</template>

<style scoped>
.agent-demo {
  --au-ink: #132b2f;
  --au-muted: #61777a;
  --au-line: rgba(19, 43, 47, 0.12);
  --au-teal: #0f6f75;
  --au-cyan: #19a0a8;
  --au-amber: #d38b2d;
  --au-paper: rgba(255, 252, 245, 0.86);
  margin: 2rem 0;
  padding: 1.1rem;
  color: var(--au-ink);
  border: 1px solid var(--au-line);
  border-radius: 28px;
  background:
    radial-gradient(circle at top left, rgba(25, 160, 168, 0.18), transparent 32rem),
    radial-gradient(circle at 85% 12%, rgba(211, 139, 45, 0.2), transparent 26rem),
    linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(246, 239, 226, 0.82));
  box-shadow: 0 24px 80px rgba(19, 43, 47, 0.12);
}

.agent-demo__hero,
.agent-demo__controls,
.agent-demo__grid,
.agent-demo__bottom {
  display: grid;
  gap: 1rem;
}

.agent-demo__hero {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
}

.agent-demo__badge {
  margin: 0 0 0.45rem;
  color: var(--au-teal);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.agent-demo h2 {
  margin: 0;
  font-size: clamp(1.5rem, 3vw, 2.3rem);
  line-height: 1.03;
}

.agent-demo__hero p:not(.agent-demo__badge) {
  max-width: 64rem;
  margin: 0.65rem 0 0;
  color: var(--au-muted);
}

.agent-demo__status {
  min-width: 8.5rem;
  padding: 0.8rem 0.95rem;
  border: 1px solid var(--au-line);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.74);
  text-align: right;
}

.agent-demo__status span,
.agent-demo__status strong {
  display: block;
}

.agent-demo__status span {
  color: var(--au-muted);
  font-size: 0.75rem;
  font-weight: 700;
}

.agent-demo__status strong {
  color: var(--au-teal);
  font-size: 1.75rem;
  line-height: 1;
}

.agent-demo__status[data-state='waiting'] strong {
  color: var(--au-amber);
}

.agent-demo__status[data-state='completed'] strong {
  color: #3b7b38;
}

.agent-demo__controls {
  grid-template-columns: repeat(4, max-content);
  margin-top: 1rem;
}

.agent-demo__button,
.agent-demo__link-button {
  border: 1px solid var(--au-line);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  color: var(--au-ink);
  cursor: pointer;
  font-weight: 750;
}

.agent-demo__button {
  padding: 0.65rem 0.95rem;
}

.agent-demo__button--primary {
  border-color: transparent;
  background: linear-gradient(135deg, var(--au-teal), var(--au-cyan));
  color: white;
}

.agent-demo__button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.agent-demo__notice {
  margin: 1rem 0 0;
  padding: 0.75rem 0.9rem;
  border: 1px solid rgba(211, 139, 45, 0.28);
  border-radius: 18px;
  background: rgba(211, 139, 45, 0.12);
  color: #795017;
  font-weight: 720;
}

.agent-demo__grid {
  grid-template-columns: minmax(0, 1.25fr) minmax(19rem, 0.75fr);
  margin-top: 1rem;
}

.agent-demo__panel {
  min-width: 0;
  padding: 1rem;
  border: 1px solid var(--au-line);
  border-radius: 22px;
  background: var(--au-paper);
  backdrop-filter: blur(12px);
}

.agent-demo__panel--conversation,
.agent-demo__panel--process {
  grid-row: span 2;
}

.agent-demo__panel-head {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 0.9rem;
}

.agent-demo__panel-head span {
  font-weight: 850;
}

.agent-demo__panel-head code {
  padding: 0.24rem 0.5rem;
  border-radius: 999px;
  background: rgba(15, 111, 117, 0.09);
  color: var(--au-teal);
  font-size: 0.72rem;
}

.agent-demo__bubble {
  max-width: 92%;
  margin-bottom: 0.75rem;
  padding: 0.85rem 0.95rem;
  border-radius: 20px;
}

.agent-demo__bubble--user {
  margin-left: auto;
  background: var(--au-teal);
  color: white;
}

.agent-demo__bubble--assistant {
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid var(--au-line);
  color: var(--au-ink);
}

.agent-demo__archive-note,
.agent-demo__empty {
  margin: 0 0 0.8rem;
  color: var(--au-muted);
}

.agent-demo__link-button {
  margin-bottom: 0.85rem;
  padding: 0.45rem 0.7rem;
  color: var(--au-teal);
}

.agent-demo__parts,
.agent-demo__tool-list,
.agent-demo__event-list {
  display: grid;
  gap: 0.6rem;
}

.agent-demo__part,
.agent-demo__tool-row {
  padding: 0.7rem 0.8rem;
  border: 1px solid var(--au-line);
  border-left: 4px solid var(--au-cyan);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.68);
}

.agent-demo__part[data-phase='waiting'] {
  border-left-color: var(--au-amber);
}

.agent-demo__part[data-phase='completed'] {
  border-left-color: #3b7b38;
}

.agent-demo__part span,
.agent-demo__tool-row span {
  display: block;
  color: var(--au-muted);
  font-size: 0.72rem;
  font-weight: 780;
}

.agent-demo__part strong,
.agent-demo__part p,
.agent-demo__tool-row p {
  margin: 0.2rem 0 0;
}

.agent-demo__capsule {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  padding: 0.85rem;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(15, 111, 117, 0.1), rgba(211, 139, 45, 0.1));
}

.agent-demo__facts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.75rem;
}

.agent-demo__facts span {
  padding: 0.25rem 0.48rem;
  border-radius: 999px;
  background: rgba(19, 43, 47, 0.06);
  color: var(--au-muted);
  font-size: 0.72rem;
}

.agent-demo__artifact {
  min-height: 7rem;
  padding: 0.9rem;
  border-radius: 18px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.82), rgba(15, 111, 117, 0.08)),
    repeating-linear-gradient(135deg, rgba(15, 111, 117, 0.08) 0 1px, transparent 1px 9px);
}

.agent-demo__artifact--evidence {
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.82), rgba(211, 139, 45, 0.11)),
    repeating-linear-gradient(135deg, rgba(211, 139, 45, 0.1) 0 1px, transparent 1px 9px);
}

.agent-demo__artifact p {
  margin: 0.45rem 0 0;
  color: var(--au-muted);
}

.agent-demo__bottom {
  grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.45fr);
  margin-top: 1rem;
}

.agent-demo__event-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.agent-demo__event-list li {
  display: grid;
  grid-template-columns: minmax(11rem, 0.34fr) minmax(0, 1fr);
  gap: 0.8rem;
  align-items: center;
  padding: 0.52rem 0.65rem;
  border: 1px solid transparent;
  border-radius: 14px;
  color: var(--au-muted);
}

.agent-demo__event-list li.is-active {
  border-color: rgba(15, 111, 117, 0.18);
  background: rgba(15, 111, 117, 0.07);
  color: var(--au-ink);
}

.agent-demo__event-list li.is-next {
  border-color: rgba(211, 139, 45, 0.35);
  background: rgba(211, 139, 45, 0.1);
}

.agent-demo__event-list span {
  font-weight: 780;
}

.agent-demo__event-list small {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.agent-demo pre {
  min-height: 10rem;
  margin: 0;
  padding: 0.9rem;
  overflow: auto;
  border-radius: 18px;
  background: #10282c;
  color: #d7f6ef;
  font-size: 0.78rem;
}

@media (max-width: 860px) {
  .agent-demo__hero,
  .agent-demo__grid,
  .agent-demo__bottom {
    grid-template-columns: 1fr;
  }

  .agent-demo__status {
    width: 100%;
    text-align: left;
  }

  .agent-demo__controls {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .agent-demo__event-list li {
    grid-template-columns: 1fr;
    gap: 0.2rem;
  }
}
</style>
