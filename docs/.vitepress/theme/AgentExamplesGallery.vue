<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref } from 'vue'

type Locale = 'en' | 'zh'
type Text = Record<Locale, string>
type StateValue = string | number | boolean | string[]
type ExampleCategory = 'all' | 'conversation' | 'process' | 'control' | 'artifact' | 'evidence' | 'context' | 'system'
type ExampleView = 'session' | 'composer' | 'status' | 'message' | 'process' | 'timeline' | 'tool' | 'hitl' | 'task' | 'artifact' | 'evidence' | 'context' | 'permission' | 'diagnostics'

type ExampleEvent = {
  type: string
  phase: string
  title: Text
  patch: Record<string, StateValue>
  payload?: Record<string, StateValue>
  waitsFor?: string
}

type ExampleControl = {
  id: string
  label: Text
  patch: Record<string, StateValue>
  resolves?: string
  payload?: Record<string, StateValue>
}

type ExampleDefinition = {
  id: string
  category: Exclude<ExampleCategory, 'all'>
  view: ExampleView
  surface: string
  title: Text
  summary: Text
  events: ExampleEvent[]
  controls: ExampleControl[]
  initialState: Record<string, StateValue>
  acceptance: Text[]
}

type ExampleRuntime = {
  cursor: number
  playing: boolean
  blockedBy: string | null
  state: Record<string, StateValue>
  payload: Record<string, StateValue>
  log: string[]
  timer?: ReturnType<typeof setInterval>
}

const props = withDefaults(defineProps<{ locale?: Locale }>(), {
  locale: 'en'
})

const ui = {
  en: {
    eyebrow: 'Runnable examples',
    title: 'Agent UI pattern gallery',
    subtitle: 'Every card is a small runtime projection. Play the events, use the controls, and watch the surface state change without relying on Markdown examples.',
    all: 'All',
    conversation: 'Conversation',
    process: 'Process',
    control: 'Control',
    artifact: 'Artifact',
    evidence: 'Evidence',
    context: 'Context',
    system: 'System',
    play: 'Play',
    pause: 'Pause',
    step: 'Step',
    reset: 'Reset',
    blocked: 'Blocked until user action resolves this event.',
    eventStream: 'Event stream',
    payload: 'Payload',
    acceptance: 'Acceptance',
    state: 'Projected state',
    noPayload: 'No payload yet',
    progress: 'progress'
  },
  zh: {
    eyebrow: '可运行示例',
    title: 'Agent UI 模式 Gallery',
    subtitle: '每张卡都是一个小型 runtime projection。播放事件、点击控件，直接观察 surface state 变化，而不是阅读 Markdown 示例。',
    all: '全部',
    conversation: '对话',
    process: '过程',
    control: '控制',
    artifact: '产物',
    evidence: '证据',
    context: '上下文',
    system: '系统',
    play: '播放',
    pause: '暂停',
    step: '前进',
    reset: '重置',
    blocked: '事件已阻塞，等待用户动作解决。',
    eventStream: '事件流',
    payload: 'Payload',
    acceptance: '验收',
    state: '投影状态',
    noPayload: '暂无 payload',
    progress: '进度'
  }
} satisfies Record<Locale, Record<string, string>>

const filters: ExampleCategory[] = ['all', 'conversation', 'process', 'control', 'artifact', 'evidence', 'context', 'system']
const selectedFilter = ref<ExampleCategory>('all')

const examples: ExampleDefinition[] = [
  {
    id: 'session-shell',
    category: 'system',
    view: 'session',
    surface: 'session_tabs',
    title: { en: 'Session / Thread Shell', zh: 'Session / Thread Shell' },
    summary: { en: 'Open, hydrate, mark stale, and switch sessions without letting late results overwrite the active thread.', zh: '打开、hydrate、标记 stale 并切换会话，避免 late results 覆盖 active thread。' },
    initialState: { active: 'roadmap', hydrated: 'shell', unread: 0, stale: false, pinned: 'roadmap' },
    events: [
      event('session.opened', 'draft', 'Shell opened', 'Shell opened', { active: 'roadmap', hydrated: 'shell' }),
      event('session.hydrated', 'hydrating', 'Recent messages applied', '最近消息已应用', { hydrated: 'recent messages', unread: 2 }),
      event('session.updated', 'hydrating', 'Inactive thread marked stale', '非活跃 thread 标记 stale', { stale: true }),
      event('messages.snapshot', 'hydrating', 'Older history window loaded', '旧 history window 已加载', { hydrated: 'full window' })
    ],
    controls: [
      control('switch', 'Switch thread', '切换 thread', { active: 'support', stale: false }),
      control('pin', 'Toggle pin', '切换 pin', { pinned: 'support' })
    ],
    acceptance: [
      { en: 'Shell appears before full history.', zh: 'Shell 先于完整 history 出现。' },
      { en: 'Stale hydration is explicit.', zh: 'Stale hydration 明确可见。' }
    ]
  },
  {
    id: 'composer',
    category: 'control',
    view: 'composer',
    surface: 'composer',
    title: { en: 'Composer', zh: 'Composer' },
    summary: { en: 'Draft, context chips, queue, steer, and permission preview stay separate from runtime truth.', zh: 'Draft、context chips、queue、steer 与 permission preview 和 runtime truth 分离。' },
    initialState: { draft: 'Ask agent to update docs', mode: 'agent', context: 'none', intent: 'send', permission: 'ask-before-write' },
    events: [
      event('state.delta', 'draft', 'Draft saved locally', '本地 draft 已保存', { draft: 'Ask agent to update docs' }),
      event('context.changed', 'preparing', 'Context chip attached', 'Context chip 已附加', { context: 'roadmap + source-index' }),
      event('permission.changed', 'draft', 'Policy preview visible', 'Policy preview 可见', { permission: 'network blocked, file write asks' }),
      event('queue.changed', 'submitted', 'Turn queued', 'Turn 已入队', { intent: 'queue position 2' })
    ],
    controls: [
      control('queue', 'Queue turn', '加入队列', { intent: 'queued' }),
      control('steer', 'Steer active run', '转向 active run', { intent: 'steer active run' })
    ],
    acceptance: [
      { en: 'Queue and steer are visually different.', zh: 'Queue 与 steer 视觉上不同。' },
      { en: 'Local draft is not runtime truth.', zh: 'Local draft 不是 runtime truth。' }
    ]
  },
  {
    id: 'runtime-status',
    category: 'process',
    view: 'status',
    surface: 'runtime_status',
    title: { en: 'Runtime Status', zh: 'Runtime Status' },
    summary: { en: 'Status renders before text and promotes blocked, failed, retrying, and done states.', zh: 'Status 先于正文渲染，并突出 blocked、failed、retrying、done。' },
    initialState: { status: 'idle', detail: 'ready', firstText: false, retryable: false },
    events: [
      event('run.started', 'submitted', 'Submitted', '已提交', { status: 'submitted', detail: 'listener already bound' }),
      event('run.status', 'routing', 'Routing', '路由中', { status: 'routing', detail: 'selecting model' }),
      event('run.status', 'preparing', 'Preparing context', '准备上下文', { status: 'preparing', detail: 'assembling request' }),
      event('text.delta', 'producing', 'First text arrived', '首个正文到达', { firstText: true, status: 'streaming' }),
      event('run.finished', 'completed', 'Done', '完成', { status: 'done', detail: 'success' })
    ],
    controls: [
      control('fail', 'Fail run', '运行失败', { status: 'failed', detail: 'tool timeout', retryable: true }),
      control('retry', 'Retry', '重试', { status: 'retrying', detail: 'retry scheduled', retryable: false })
    ],
    acceptance: [
      { en: 'Preparing status appears before first text.', zh: 'Preparing status 先于首个正文出现。' },
      { en: 'Failure is not hidden in assistant prose.', zh: 'Failure 不藏在 assistant prose 中。' }
    ]
  },
  {
    id: 'ordered-parts',
    category: 'conversation',
    view: 'message',
    surface: 'conversation + inline_process',
    title: { en: 'Ordered Message Parts', zh: 'Ordered Message Parts' },
    summary: { en: 'Reasoning, tool, action, artifact, evidence, and text parts stay ordered and separate.', zh: 'Reasoning、tool、action、artifact、evidence 与 text parts 保持有序且分离。' },
    initialState: { text: '', parts: ['user_text'], process: 'empty', artifact: 'none', evidence: 'none' },
    events: [
      event('reasoning.delta', 'reasoning', 'Reasoning part streamed', 'Reasoning part 流式到达', { process: 'reasoning: inspect standard', parts: ['user_text', 'reasoning_detail'] }),
      event('tool.started', 'acting', 'Tool part inserted', 'Tool part 插入', { process: 'tool running', parts: ['user_text', 'reasoning_detail', 'tool_call'] }),
      event('text.delta', 'producing', 'Answer text streamed', '回答正文流式到达', { text: 'Use a runnable gallery.', parts: ['user_text', 'reasoning_detail', 'tool_call', 'assistant_text'] }),
      event('artifact.preview.ready', 'producing', 'Artifact ref linked', 'Artifact ref 已链接', { artifact: 'gallery preview', parts: ['user_text', 'reasoning_detail', 'tool_call', 'assistant_text', 'artifact_ref'] }),
      event('evidence.changed', 'producing', 'Evidence ref linked', 'Evidence ref 已链接', { evidence: 'source-index', parts: ['user_text', 'reasoning_detail', 'tool_call', 'assistant_text', 'artifact_ref', 'evidence_ref'] })
    ],
    controls: [
      control('finalize', 'Finalize text', '完成正文', { text: 'Use a runnable gallery with ordered parts reconciled.' })
    ],
    acceptance: [
      { en: 'Parts render in event order.', zh: 'Parts 按 event order 渲染。' },
      { en: 'Final answer stays clean.', zh: '最终回答保持干净。' }
    ]
  },
  {
    id: 'inline-process',
    category: 'process',
    view: 'process',
    surface: 'inline_process',
    title: { en: 'Inline Process', zh: 'Inline Process' },
    summary: { en: 'Active reasoning, planning, tools, and actions stay expanded while work is running.', zh: '运行中 reasoning、planning、tools 与 actions 保持展开。' },
    initialState: { expanded: true, plan: 'none', reasoning: 'none', tool: 'none', archived: false },
    events: [
      event('plan.delta', 'planning', 'Plan appears inline', 'Plan inline 出现', { plan: 'inspect -> build -> verify' }),
      event('reasoning.delta', 'reasoning', 'Reasoning remains visible', 'Reasoning 保持可见', { reasoning: 'checking event order' }),
      event('tool.progress', 'acting', 'Tool progress updates inline', 'Tool progress inline 更新', { tool: 'build 60%' }),
      event('run.finished', 'completed', 'Process archived', 'Process 已归档', { expanded: false, archived: true, tool: 'complete' })
    ],
    controls: [
      control('expand', 'Expand archive', '展开归档', { expanded: true }),
      control('collapse', 'Collapse archive', '收起归档', { expanded: false })
    ],
    acceptance: [
      { en: 'Running process is not collapsed.', zh: 'Running process 不默认折叠。' },
      { en: 'Completed process archives quietly.', zh: 'Completed process 安静归档。' }
    ]
  },
  {
    id: 'timeline-archive',
    category: 'evidence',
    view: 'timeline',
    surface: 'timeline_evidence',
    title: { en: 'Timeline Archive', zh: 'Timeline Archive' },
    summary: { en: 'Completed process becomes compact timeline history with replay and evidence links.', zh: 'Completed process 转为 compact timeline history，并链接 replay/evidence。' },
    initialState: { archive: 'collapsed', replay: 'none', evidence: 'none', detail: 'summary only' },
    events: [
      event('run.finished', 'completed', 'Run summary archived', 'Run summary 已归档', { archive: 'summary', detail: '4 steps' }),
      event('evidence.changed', 'archived', 'Evidence attached', 'Evidence 已附加', { evidence: 'trace-18' }),
      event('state.snapshot', 'archived', 'Replay bookmark stored', 'Replay bookmark 已存储', { replay: 'bookmark-42' })
    ],
    controls: [
      control('open', 'Open detail', '打开详情', { archive: 'expanded', detail: 'full timeline' }),
      control('close', 'Close detail', '关闭详情', { archive: 'collapsed', detail: 'summary only' })
    ],
    acceptance: [
      { en: 'Archive is discoverable after completion.', zh: '完成后 archive 可发现。' },
      { en: 'Timeline does not crowd the final answer.', zh: 'Timeline 不挤占最终回答。' }
    ]
  },
  {
    id: 'tool-ui',
    category: 'process',
    view: 'tool',
    surface: 'tool_ui',
    title: { en: 'Tool UI', zh: 'Tool UI' },
    summary: { en: 'Tool args, progress, output, failure, and retry are visible as a lifecycle.', zh: 'Tool args、progress、output、failure 与 retry 作为 lifecycle 可见。' },
    initialState: { tool: 'inspect_docs', args: 'none', progress: 0, output: 'none', status: 'idle' },
    events: [
      event('tool.started', 'acting', 'Tool started', '工具启动', { status: 'running' }),
      event('tool.args', 'acting', 'Safe args available', '安全参数可见', { args: 'docs/en/examples' }),
      event('tool.progress', 'acting', 'Progress updated', '进度更新', { progress: 65 }),
      event('tool.result', 'completed', 'Output ref available', 'Output ref 可用', { status: 'done', output: 'result-ref-7', progress: 100 })
    ],
    controls: [
      control('fail', 'Fail tool', '工具失败', { status: 'failed', output: 'timeout', progress: 65 }),
      control('retry', 'Retry tool', '重试工具', { status: 'running', output: 'retrying', progress: 25 })
    ],
    acceptance: [
      { en: 'Large output is represented by a ref.', zh: 'Large output 由 ref 表示。' },
      { en: 'Tool error is recoverable.', zh: 'Tool error 可恢复。' }
    ]
  },
  {
    id: 'hitl',
    category: 'control',
    view: 'hitl',
    surface: 'hitl',
    title: { en: 'Human-in-the-loop', zh: 'Human-in-the-loop' },
    summary: { en: 'Approval, rejection, and structured answers resolve a blocked runtime action.', zh: 'Approval、rejection 与 structured answers 解决 blocked runtime action。' },
    initialState: { request: 'none', decision: 'pending', run: 'running', risk: 'medium' },
    events: [
      event('action.required', 'waiting', 'Approval required', '需要审批', { request: 'write docs/public', decision: 'pending', run: 'blocked' }, { waitsFor: 'decision' }),
      event('action.resolved', 'accepted', 'Action resolved', 'Action 已解决', { decision: 'approved', run: 'resumed' }),
      event('run.status', 'producing', 'Run resumed', 'Run 已恢复', { run: 'producing' })
    ],
    controls: [
      control('approve', 'Approve', '批准', { decision: 'approved', run: 'resumed' }, { resolves: 'decision' }),
      control('reject', 'Reject', '拒绝', { decision: 'rejected', run: 'cancelled' }, { resolves: 'decision' })
    ],
    acceptance: [
      { en: 'Run blocks until explicit action resolution.', zh: 'Run 在明确 action resolution 前阻塞。' },
      { en: 'Approval is not inferred from prose.', zh: 'Approval 不从 prose 推断。' }
    ]
  },
  {
    id: 'task-capsule',
    category: 'control',
    view: 'task',
    surface: 'task_capsule',
    title: { en: 'Task Capsule', zh: 'Task Capsule' },
    summary: { en: 'Queue, background jobs, subagents, blocked work, and failed tasks stay outside the transcript.', zh: 'Queue、background jobs、subagents、blocked work 与 failed tasks 保持在 transcript 外。' },
    initialState: { task: 'queued', agent: 'none', attention: 'low', queue: 2 },
    events: [
      event('queue.changed', 'submitted', 'Task queued', 'Task 已排队', { task: 'queued', queue: 2 }),
      event('task.changed', 'routing', 'Task started', 'Task 已启动', { task: 'running', queue: 0 }),
      event('agent.changed', 'acting', 'Subagent running', 'Subagent 运行中', { agent: 'researcher', attention: 'low' }),
      event('action.required', 'waiting', 'Needs input promoted', 'Needs input 被提升', { task: 'needs-input', attention: 'high' })
    ],
    controls: [
      control('complete', 'Complete task', '完成任务', { task: 'completed', attention: 'low' }),
      control('fail', 'Fail task', '任务失败', { task: 'failed', attention: 'high' })
    ],
    acceptance: [
      { en: 'Needs-input outranks normal running noise.', zh: 'Needs-input 高于普通 running noise。' },
      { en: 'Subagent status is not assistant prose.', zh: 'Subagent status 不是 assistant prose。' }
    ]
  },
  {
    id: 'artifact-workspace',
    category: 'artifact',
    view: 'artifact',
    surface: 'artifact_workspace',
    title: { en: 'Artifact Workspace', zh: 'Artifact Workspace' },
    summary: { en: 'Artifacts preview, edit, version, diff, export, fail, and delete outside the answer body.', zh: 'Artifacts 在回答正文外 preview、edit、version、diff、export、fail、delete。' },
    initialState: { artifact: 'none', version: 0, preview: 'empty', diff: 'none', export: 'idle' },
    events: [
      event('artifact.created', 'producing', 'Artifact created', 'Artifact 已创建', { artifact: 'Agent UI gallery', version: 1, preview: 'card' }),
      event('artifact.preview.ready', 'producing', 'Preview ready', 'Preview 就绪', { preview: 'live canvas' }),
      event('artifact.version.created', 'completed', 'Version created', 'Version 已创建', { version: 2 }),
      event('artifact.diff.ready', 'completed', 'Diff ready', 'Diff 就绪', { diff: '+ runnable controls' })
    ],
    controls: [
      control('edit', 'Edit artifact', '编辑产物', { version: 3, diff: '+ edited locally' }),
      control('export', 'Export', '导出', { export: 'completed: zip-ref' })
    ],
    acceptance: [
      { en: 'Full artifact body lives outside transcript.', zh: '完整 artifact body 位于 transcript 外。' },
      { en: 'Edit/export write through artifact owner.', zh: 'Edit/export 写回 artifact owner。' }
    ]
  },
  {
    id: 'evidence-review',
    category: 'evidence',
    view: 'evidence',
    surface: 'timeline_evidence',
    title: { en: 'Evidence / Replay / Review', zh: 'Evidence / Replay / Review' },
    summary: { en: 'Citations, traces, verification, review decisions, replay ids, and evidence exports remain explicit facts.', zh: 'Citations、traces、verification、review decisions、replay ids 与 evidence exports 保持 explicit facts。' },
    initialState: { citation: 'none', trace: 'none', verdict: 'unverified', export: 'idle' },
    events: [
      event('evidence.changed', 'producing', 'Citation linked', 'Citation 已链接', { citation: 'SRC-AI-SDK-PARTS' }),
      event('evidence.changed', 'producing', 'Trace available', 'Trace 可用', { trace: 'run-042.trace' }),
      event('evidence.changed', 'completed', 'Review recorded', 'Review 已记录', { verdict: 'reviewed' })
    ],
    controls: [
      control('export', 'Export evidence', '导出证据', { export: 'evidence-pack.zip' }),
      control('replay', 'Open replay', '打开 replay', { trace: 'replay-open' })
    ],
    acceptance: [
      { en: 'Claims link to evidence facts.', zh: 'Claims 链接到 evidence facts。' },
      { en: 'Review verdict is not invented by UI.', zh: 'Review verdict 不由 UI 编造。' }
    ]
  },
  {
    id: 'context-compaction',
    category: 'context',
    view: 'context',
    surface: 'composer + inline_process',
    title: { en: 'Context / Memory / Compaction', zh: 'Context / Memory / Compaction' },
    summary: { en: 'Context refs, budgets, missing context, memory writes, and compaction boundaries appear as facts.', zh: 'Context refs、budgets、missing context、memory writes 与 compaction boundaries 作为 facts 出现。' },
    initialState: { context: 'none', budget: 18, missing: 'none', compaction: 'none', memory: 'none' },
    events: [
      event('context.changed', 'preparing', 'Sources selected', 'Sources 已选择', { context: 'roadmap + source-index', budget: 42 }),
      event('context.changed', 'preparing', 'Missing context surfaced', 'Missing context 已显示', { missing: 'Claude Code screenshot unavailable' }),
      event('context.compaction.started', 'hydrating', 'Compaction boundary', 'Compaction boundary', { compaction: 'started' }),
      event('context.compaction.completed', 'hydrating', 'Resume metadata stored', 'Resume metadata 已存储', { compaction: 'resume-ready' })
    ],
    controls: [
      control('memory', 'Write memory fact', '写入 memory fact', { memory: 'preference: runnable examples' }),
      control('clear-missing', 'Resolve missing', '解决 missing', { missing: 'resolved' })
    ],
    acceptance: [
      { en: 'Missing context is honest.', zh: 'Missing context 真实可见。' },
      { en: 'Compaction does not replay old reasoning as answer text.', zh: 'Compaction 不把旧 reasoning 当新回答重放。' }
    ]
  },
  {
    id: 'permission-policy',
    category: 'system',
    view: 'permission',
    surface: 'hitl + runtime_status',
    title: { en: 'Permission / Security / Policy', zh: 'Permission / Security / Policy' },
    summary: { en: 'Risk, sandbox, access, approval, secret redaction, waiver, and retention are explicit policy facts.', zh: 'Risk、sandbox、access、approval、secret redaction、waiver 与 retention 是 explicit policy facts。' },
    initialState: { risk: 'low', sandbox: 'read-only', approval: 'none', secret: 'redacted', retention: 'default' },
    events: [
      event('permission.changed', 'draft', 'Sandbox shown', 'Sandbox 已显示', { sandbox: 'workspace-write' }),
      event('permission.changed', 'waiting', 'Risk escalated', 'Risk 已升级', { risk: 'high', approval: 'required' }),
      event('action.resolved', 'accepted', 'Grant confirmed', 'Grant 已确认', { approval: 'granted 10m' })
    ],
    controls: [
      control('deny', 'Deny', '拒绝', { approval: 'denied', sandbox: 'read-only' }),
      control('waive', 'Add waiver', '添加 waiver', { retention: 'waiver-ref-9' })
    ],
    acceptance: [
      { en: 'Permission grant needs owner confirmation.', zh: 'Permission grant 需要 owner confirmation。' },
      { en: 'Secrets stay redacted.', zh: 'Secrets 保持 redacted。' }
    ]
  },
  {
    id: 'diagnostics-repair',
    category: 'system',
    view: 'diagnostics',
    surface: 'diagnostics + session_tabs',
    title: { en: 'Diagnostics / Metrics / Repair', zh: 'Diagnostics / Metrics / Repair' },
    summary: { en: 'Safe diagnostics, metrics, snapshots, deltas, and stale repair stay out of the normal transcript.', zh: 'Safe diagnostics、metrics、snapshots、deltas 与 stale repair 保持在 normal transcript 外。' },
    initialState: { metric: 'none', diagnostic: 'none', snapshot: 'none', fallback: 'unknown', repaired: false },
    events: [
      event('metric.changed', 'producing', 'First text latency measured', '首字延迟已记录', { metric: 'firstTextMs=830' }),
      event('diagnostic.changed', 'failed', 'Safe diagnostic captured', '安全 diagnostic 已捕获', { diagnostic: 'tool timeout ref' }),
      event('messages.snapshot', 'hydrating', 'Message repair applied', 'Message repair 已应用', { snapshot: 'messages-window-2', repaired: true }),
      event('state.delta', 'hydrating', 'Unknown fallback shown', 'Unknown fallback 已显示', { fallback: 'stale' })
    ],
    controls: [
      control('repair', 'Apply repair', '应用 repair', { repaired: true, fallback: 'available' }),
      control('mark-stale', 'Mark stale', '标记 stale', { fallback: 'stale' })
    ],
    acceptance: [
      { en: 'Diagnostics do not pollute final answer.', zh: 'Diagnostics 不污染最终回答。' },
      { en: 'Missing facts render as unknown/stale.', zh: 'Missing facts 渲染为 unknown/stale。' }
    ]
  }
]

const runtimes = reactive<Record<string, ExampleRuntime>>({})

for (const example of examples) {
  runtimes[example.id] = createRuntime(example)
}

const visibleExamples = computed(() => {
  if (selectedFilter.value === 'all') return examples
  return examples.filter((example) => example.category === selectedFilter.value)
})

const labels = computed(() => ui[props.locale])

function event(
  type: string,
  phase: string,
  en: string,
  zh: string,
  patch: Record<string, StateValue>,
  options: { waitsFor?: string; payload?: Record<string, StateValue> } = {}
): ExampleEvent {
  return {
    type,
    phase,
    title: { en, zh },
    patch,
    waitsFor: options.waitsFor,
    payload: options.payload ?? { type, phase, ...patch }
  }
}

function control(
  id: string,
  en: string,
  zh: string,
  patch: Record<string, StateValue>,
  options: { resolves?: string; payload?: Record<string, StateValue> } = {}
): ExampleControl {
  return {
    id,
    label: { en, zh },
    patch,
    resolves: options.resolves,
    payload: options.payload ?? { action: id, ...patch }
  }
}

function cloneRecord(value: Record<string, StateValue>): Record<string, StateValue> {
  return JSON.parse(JSON.stringify(value)) as Record<string, StateValue>
}

function createRuntime(example: ExampleDefinition): ExampleRuntime {
  return {
    cursor: 0,
    playing: false,
    blockedBy: null,
    state: cloneRecord(example.initialState),
    payload: {},
    log: []
  }
}

function localized(text: Text): string {
  return text[props.locale]
}

function stateEntries(example: ExampleDefinition): [string, StateValue][] {
  return Object.entries(runtimes[example.id].state)
}

function progress(example: ExampleDefinition): number {
  return Math.round((runtimes[example.id].cursor / example.events.length) * 100)
}

function stop(example: ExampleDefinition) {
  const runtime = runtimes[example.id]
  runtime.playing = false
  if (runtime.timer) {
    clearInterval(runtime.timer)
    runtime.timer = undefined
  }
}

function reset(example: ExampleDefinition) {
  stop(example)
  Object.assign(runtimes[example.id], createRuntime(example))
}

function applyEvent(example: ExampleDefinition, next: ExampleEvent) {
  const runtime = runtimes[example.id]
  runtime.state = { ...runtime.state, ...next.patch }
  runtime.payload = next.payload ?? { type: next.type, ...next.patch }
  runtime.log.unshift(`${next.type} - ${localized(next.title)}`)
  runtime.cursor += 1

  if (next.waitsFor) {
    runtime.blockedBy = next.waitsFor
    stop(example)
  }
}

function step(example: ExampleDefinition) {
  const runtime = runtimes[example.id]
  if (runtime.blockedBy || runtime.cursor >= example.events.length) {
    stop(example)
    return
  }
  applyEvent(example, example.events[runtime.cursor])
  if (runtime.cursor >= example.events.length) stop(example)
}

function play(example: ExampleDefinition) {
  const runtime = runtimes[example.id]
  if (runtime.playing) {
    stop(example)
    return
  }
  runtime.playing = true
  runtime.timer = setInterval(() => step(example), 760)
}

function runControl(example: ExampleDefinition, item: ExampleControl) {
  const runtime = runtimes[example.id]
  runtime.state = { ...runtime.state, ...item.patch }
  runtime.payload = item.payload ?? { action: item.id, ...item.patch }
  runtime.log.unshift(`action:${item.id} - ${localized(item.label)}`)

  if (item.resolves && item.resolves === runtime.blockedBy) {
    runtime.blockedBy = null
    step(example)
  }
}

function payloadText(example: ExampleDefinition): string {
  const payload = runtimes[example.id].payload
  return Object.keys(payload).length ? JSON.stringify(payload, null, 2) : labels.value.noPayload
}

function passed(example: ExampleDefinition, index: number): boolean {
  const runtime = runtimes[example.id]
  return runtime.cursor >= example.events.length || index < Math.max(1, Math.floor(runtime.cursor / Math.max(1, example.events.length / example.acceptance.length)))
}

function surfaceClass(example: ExampleDefinition): string {
  return `agent-gallery__surface agent-gallery__surface--${example.view}`
}

onBeforeUnmount(() => {
  for (const example of examples) stop(example)
})
</script>

<template>
  <section class="agent-gallery" aria-label="Runnable Agent UI examples gallery">
    <header class="agent-gallery__hero">
      <p>{{ labels.eyebrow }}</p>
      <h2>{{ labels.title }}</h2>
      <span>{{ labels.subtitle }}</span>
    </header>

    <nav class="agent-gallery__filters" aria-label="Example filters">
      <button
        v-for="filter in filters"
        :key="filter"
        type="button"
        :class="['agent-gallery__filter', { 'is-active': selectedFilter === filter }]"
        @click="selectedFilter = filter"
      >
        {{ labels[filter] }}
      </button>
    </nav>

    <div class="agent-gallery__grid">
      <article v-for="example in visibleExamples" :key="example.id" class="agent-gallery__card">
        <div class="agent-gallery__card-head">
          <div>
            <p>{{ example.surface }}</p>
            <h3>{{ localized(example.title) }}</h3>
            <span>{{ localized(example.summary) }}</span>
          </div>
          <strong>{{ progress(example) }}%</strong>
        </div>

        <div :class="surfaceClass(example)">
          <template v-if="example.view === 'session'">
            <div class="agent-gallery__tabs">
              <button :class="{ active: runtimes[example.id].state.active === 'roadmap' }">Roadmap</button>
              <button :class="{ active: runtimes[example.id].state.active === 'support' }">Support</button>
            </div>
            <div class="agent-gallery__mini-window">
              <b>{{ runtimes[example.id].state.active }}</b>
              <span>hydrated: {{ runtimes[example.id].state.hydrated }}</span>
              <span>unread: {{ runtimes[example.id].state.unread }}</span>
              <span>stale: {{ runtimes[example.id].state.stale }}</span>
            </div>
          </template>

          <template v-else-if="example.view === 'composer'">
            <div class="agent-gallery__composer-box">{{ runtimes[example.id].state.draft }}</div>
            <div class="agent-gallery__chips">
              <span>{{ runtimes[example.id].state.mode }}</span>
              <span>{{ runtimes[example.id].state.context }}</span>
              <span>{{ runtimes[example.id].state.permission }}</span>
              <span>{{ runtimes[example.id].state.intent }}</span>
            </div>
          </template>

          <template v-else-if="example.view === 'status'">
            <div class="agent-gallery__status-orbit">
              <strong>{{ runtimes[example.id].state.status }}</strong>
              <span>{{ runtimes[example.id].state.detail }}</span>
              <small>firstText: {{ runtimes[example.id].state.firstText }}</small>
            </div>
          </template>

          <template v-else-if="example.view === 'message'">
            <div class="agent-gallery__bubble user">User: build runnable examples.</div>
            <div class="agent-gallery__parts">
              <span v-for="part in runtimes[example.id].state.parts" :key="String(part)">{{ part }}</span>
            </div>
            <div class="agent-gallery__bubble assistant">{{ runtimes[example.id].state.text || '...' }}</div>
          </template>

          <template v-else-if="example.view === 'process'">
            <div class="agent-gallery__process-line" :data-expanded="runtimes[example.id].state.expanded">
              <span>plan: {{ runtimes[example.id].state.plan }}</span>
              <span>reasoning: {{ runtimes[example.id].state.reasoning }}</span>
              <span>tool: {{ runtimes[example.id].state.tool }}</span>
              <span>archived: {{ runtimes[example.id].state.archived }}</span>
            </div>
          </template>

          <template v-else-if="example.view === 'timeline'">
            <div class="agent-gallery__timeline-box">
              <strong>{{ runtimes[example.id].state.archive }}</strong>
              <span>{{ runtimes[example.id].state.detail }}</span>
              <span>evidence: {{ runtimes[example.id].state.evidence }}</span>
              <span>replay: {{ runtimes[example.id].state.replay }}</span>
            </div>
          </template>

          <template v-else-if="example.view === 'tool'">
            <div class="agent-gallery__tool-box">
              <strong>{{ runtimes[example.id].state.tool }}</strong>
              <span>{{ runtimes[example.id].state.status }}</span>
              <progress max="100" :value="Number(runtimes[example.id].state.progress)" />
              <small>args: {{ runtimes[example.id].state.args }}</small>
              <small>output: {{ runtimes[example.id].state.output }}</small>
            </div>
          </template>

          <template v-else-if="example.view === 'hitl'">
            <div class="agent-gallery__approval">
              <strong>{{ runtimes[example.id].state.request }}</strong>
              <span>risk: {{ runtimes[example.id].state.risk }}</span>
              <span>decision: {{ runtimes[example.id].state.decision }}</span>
              <span>run: {{ runtimes[example.id].state.run }}</span>
            </div>
          </template>

          <template v-else-if="example.view === 'task'">
            <div class="agent-gallery__task-box">
              <strong>{{ runtimes[example.id].state.task }}</strong>
              <span>agent: {{ runtimes[example.id].state.agent }}</span>
              <span>attention: {{ runtimes[example.id].state.attention }}</span>
              <span>queue: {{ runtimes[example.id].state.queue }}</span>
            </div>
          </template>

          <template v-else-if="example.view === 'artifact'">
            <div class="agent-gallery__artifact-canvas">
              <strong>{{ runtimes[example.id].state.artifact }}</strong>
              <span>preview: {{ runtimes[example.id].state.preview }}</span>
              <span>version: {{ runtimes[example.id].state.version }}</span>
              <span>diff: {{ runtimes[example.id].state.diff }}</span>
              <span>export: {{ runtimes[example.id].state.export }}</span>
            </div>
          </template>

          <template v-else-if="example.view === 'evidence'">
            <div class="agent-gallery__evidence-pack">
              <span>citation: {{ runtimes[example.id].state.citation }}</span>
              <span>trace: {{ runtimes[example.id].state.trace }}</span>
              <span>verdict: {{ runtimes[example.id].state.verdict }}</span>
              <span>export: {{ runtimes[example.id].state.export }}</span>
            </div>
          </template>

          <template v-else-if="example.view === 'context'">
            <div class="agent-gallery__context-box">
              <strong>{{ runtimes[example.id].state.context }}</strong>
              <progress max="64" :value="Number(runtimes[example.id].state.budget)" />
              <span>missing: {{ runtimes[example.id].state.missing }}</span>
              <span>compaction: {{ runtimes[example.id].state.compaction }}</span>
              <span>memory: {{ runtimes[example.id].state.memory }}</span>
            </div>
          </template>

          <template v-else-if="example.view === 'permission'">
            <div class="agent-gallery__policy-box">
              <strong>risk: {{ runtimes[example.id].state.risk }}</strong>
              <span>sandbox: {{ runtimes[example.id].state.sandbox }}</span>
              <span>approval: {{ runtimes[example.id].state.approval }}</span>
              <span>secret: {{ runtimes[example.id].state.secret }}</span>
              <span>retention: {{ runtimes[example.id].state.retention }}</span>
            </div>
          </template>

          <template v-else>
            <div class="agent-gallery__diagnostics-box">
              <span>metric: {{ runtimes[example.id].state.metric }}</span>
              <span>diagnostic: {{ runtimes[example.id].state.diagnostic }}</span>
              <span>snapshot: {{ runtimes[example.id].state.snapshot }}</span>
              <span>fallback: {{ runtimes[example.id].state.fallback }}</span>
              <span>repaired: {{ runtimes[example.id].state.repaired }}</span>
            </div>
          </template>
        </div>

        <p v-if="runtimes[example.id].blockedBy" class="agent-gallery__blocked">{{ labels.blocked }}</p>

        <div class="agent-gallery__controls">
          <button type="button" class="primary" @click="play(example)">{{ runtimes[example.id].playing ? labels.pause : labels.play }}</button>
          <button type="button" :disabled="Boolean(runtimes[example.id].blockedBy)" @click="step(example)">{{ labels.step }}</button>
          <button type="button" @click="reset(example)">{{ labels.reset }}</button>
          <button v-for="item in example.controls" :key="item.id" type="button" @click="runControl(example, item)">
            {{ localized(item.label) }}
          </button>
        </div>

        <div class="agent-gallery__details">
          <section>
            <h4>{{ labels.eventStream }}</h4>
            <ol class="agent-gallery__events">
              <li v-for="(item, index) in example.events" :key="`${example.id}-${item.type}-${index}`" :class="{ active: index < runtimes[example.id].cursor, next: index === runtimes[example.id].cursor }">
                <span>{{ item.type }}</span>
                <small>{{ item.phase }}</small>
              </li>
            </ol>
          </section>

          <section>
            <h4>{{ labels.state }}</h4>
            <div class="agent-gallery__state-list">
              <span v-for="([key, value]) in stateEntries(example)" :key="key"><b>{{ key }}</b>{{ value }}</span>
            </div>
          </section>

          <section>
            <h4>{{ labels.payload }}</h4>
            <pre>{{ payloadText(example) }}</pre>
          </section>

          <section>
            <h4>{{ labels.acceptance }}</h4>
            <ul class="agent-gallery__acceptance">
              <li v-for="(item, index) in example.acceptance" :key="localized(item)" :class="{ passed: passed(example, index) }">
                {{ localized(item) }}
              </li>
            </ul>
          </section>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.agent-gallery {
  --ag-ink: #162b2d;
  --ag-muted: #687c7d;
  --ag-line: rgba(22, 43, 45, 0.13);
  --ag-teal: #0f6f75;
  --ag-cyan: #19a0a8;
  --ag-amber: #d38b2d;
  --ag-paper: rgba(255, 252, 244, 0.9);
  margin: 2rem 0;
  color: var(--ag-ink);
}

.agent-gallery__hero {
  padding: clamp(1.2rem, 3vw, 2rem);
  border: 1px solid var(--ag-line);
  border-radius: 30px;
  background:
    radial-gradient(circle at 12% 12%, rgba(25, 160, 168, 0.18), transparent 30rem),
    radial-gradient(circle at 88% 20%, rgba(211, 139, 45, 0.18), transparent 24rem),
    linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(246, 240, 226, 0.9));
  box-shadow: 0 22px 70px rgba(22, 43, 45, 0.11);
}

.agent-gallery__hero p {
  margin: 0 0 0.5rem;
  color: var(--ag-teal);
  font-size: 0.74rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.agent-gallery__hero h2 {
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 3.2rem);
  line-height: 0.98;
}

.agent-gallery__hero span {
  display: block;
  max-width: 65rem;
  margin-top: 0.8rem;
  color: var(--ag-muted);
}

.agent-gallery__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin: 1rem 0;
}

.agent-gallery__filter,
.agent-gallery__controls button {
  border: 1px solid var(--ag-line);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.82);
  color: var(--ag-ink);
  cursor: pointer;
  font-weight: 760;
}

.agent-gallery__filter {
  padding: 0.5rem 0.78rem;
}

.agent-gallery__filter.is-active,
.agent-gallery__controls .primary {
  border-color: transparent;
  background: linear-gradient(135deg, var(--ag-teal), var(--ag-cyan));
  color: white;
}

.agent-gallery__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.agent-gallery__card {
  min-width: 0;
  padding: 1rem;
  border: 1px solid var(--ag-line);
  border-radius: 26px;
  background: var(--ag-paper);
  box-shadow: 0 18px 48px rgba(22, 43, 45, 0.08);
}

.agent-gallery__card-head {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
}

.agent-gallery__card-head p,
.agent-gallery__card-head h3,
.agent-gallery__card-head span {
  margin: 0;
}

.agent-gallery__card-head p {
  color: var(--ag-teal);
  font-size: 0.73rem;
  font-weight: 850;
}

.agent-gallery__card-head h3 {
  margin-top: 0.25rem;
  font-size: 1.18rem;
}

.agent-gallery__card-head span {
  display: block;
  margin-top: 0.35rem;
  color: var(--ag-muted);
  font-size: 0.86rem;
}

.agent-gallery__card-head strong {
  padding: 0.45rem 0.58rem;
  border-radius: 999px;
  background: rgba(15, 111, 117, 0.1);
  color: var(--ag-teal);
}

.agent-gallery__surface {
  min-height: 12rem;
  margin-top: 1rem;
  padding: 0.9rem;
  border: 1px solid var(--ag-line);
  border-radius: 22px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.86), rgba(15, 111, 117, 0.07)),
    repeating-linear-gradient(135deg, rgba(15, 111, 117, 0.05) 0 1px, transparent 1px 10px);
}

.agent-gallery__surface span,
.agent-gallery__surface small,
.agent-gallery__surface b,
.agent-gallery__surface strong {
  display: block;
}

.agent-gallery__tabs,
.agent-gallery__chips,
.agent-gallery__parts,
.agent-gallery__controls,
.agent-gallery__details,
.agent-gallery__state-list,
.agent-gallery__acceptance {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.agent-gallery__tabs button {
  border: 1px solid var(--ag-line);
  border-radius: 999px;
  padding: 0.35rem 0.6rem;
  background: white;
}

.agent-gallery__tabs button.active {
  background: var(--ag-teal);
  color: white;
}

.agent-gallery__mini-window,
.agent-gallery__composer-box,
.agent-gallery__status-orbit,
.agent-gallery__timeline-box,
.agent-gallery__tool-box,
.agent-gallery__approval,
.agent-gallery__task-box,
.agent-gallery__artifact-canvas,
.agent-gallery__evidence-pack,
.agent-gallery__context-box,
.agent-gallery__policy-box,
.agent-gallery__diagnostics-box,
.agent-gallery__process-line {
  display: grid;
  gap: 0.4rem;
  margin-top: 0.7rem;
  padding: 0.8rem;
  border: 1px solid var(--ag-line);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.76);
}

.agent-gallery__composer-box {
  min-height: 4.5rem;
  align-content: start;
}

.agent-gallery__chips span,
.agent-gallery__parts span,
.agent-gallery__state-list span {
  padding: 0.28rem 0.5rem;
  border-radius: 999px;
  background: rgba(22, 43, 45, 0.07);
  color: var(--ag-muted);
  font-size: 0.75rem;
}

.agent-gallery__bubble {
  width: fit-content;
  max-width: 90%;
  margin-bottom: 0.6rem;
  padding: 0.7rem 0.85rem;
  border-radius: 18px;
}

.agent-gallery__bubble.user {
  margin-left: auto;
  background: var(--ag-teal);
  color: white;
}

.agent-gallery__bubble.assistant {
  background: white;
  border: 1px solid var(--ag-line);
}

.agent-gallery__process-line[data-expanded='false'] {
  max-height: 3.2rem;
  overflow: hidden;
  opacity: 0.72;
}

.agent-gallery progress {
  width: 100%;
  accent-color: var(--ag-teal);
}

.agent-gallery__blocked {
  margin: 0.75rem 0 0;
  padding: 0.65rem 0.75rem;
  border: 1px solid rgba(211, 139, 45, 0.26);
  border-radius: 16px;
  background: rgba(211, 139, 45, 0.12);
  color: #795017;
  font-weight: 760;
}

.agent-gallery__controls {
  margin-top: 0.85rem;
}

.agent-gallery__controls button {
  padding: 0.48rem 0.72rem;
}

.agent-gallery__controls button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.agent-gallery__details {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 1rem;
}

.agent-gallery__details section {
  min-width: 0;
  padding: 0.75rem;
  border: 1px solid var(--ag-line);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.58);
}

.agent-gallery__details h4 {
  margin: 0 0 0.55rem;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.agent-gallery__events,
.agent-gallery__acceptance {
  margin: 0;
  padding: 0;
  list-style: none;
}

.agent-gallery__events {
  display: grid;
  gap: 0.35rem;
}

.agent-gallery__events li {
  display: flex;
  justify-content: space-between;
  gap: 0.6rem;
  padding: 0.35rem 0.45rem;
  border: 1px solid transparent;
  border-radius: 12px;
  color: var(--ag-muted);
  font-size: 0.76rem;
}

.agent-gallery__events li.active {
  border-color: rgba(15, 111, 117, 0.2);
  background: rgba(15, 111, 117, 0.08);
  color: var(--ag-ink);
}

.agent-gallery__events li.next {
  border-color: rgba(211, 139, 45, 0.35);
  background: rgba(211, 139, 45, 0.09);
}

.agent-gallery pre {
  min-height: 7rem;
  margin: 0;
  padding: 0.7rem;
  overflow: auto;
  border-radius: 14px;
  background: #10282c;
  color: #d7f6ef;
  font-size: 0.72rem;
}

.agent-gallery__acceptance li {
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--ag-line);
  border-radius: 999px;
  color: var(--ag-muted);
  font-size: 0.74rem;
}

.agent-gallery__acceptance li.passed {
  border-color: rgba(15, 111, 117, 0.24);
  background: rgba(15, 111, 117, 0.1);
  color: var(--ag-teal);
}

@media (max-width: 980px) {
  .agent-gallery__grid,
  .agent-gallery__details {
    grid-template-columns: 1fr;
  }
}
</style>
