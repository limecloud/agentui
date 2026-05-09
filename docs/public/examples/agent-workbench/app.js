const locales = {
  en: {
    eyebrow: 'Standalone runnable demo',
    title: 'Agent UI Workbench',
    subtitle: 'A full product-shaped demo: one event reducer projects runtime facts into conversation, process, tools, approvals, artifacts, evidence, context, policy, diagnostics, and history.',
    docs: 'Back to docs',
    language: '中文',
    play: 'Play',
    pause: 'Pause',
    step: 'Step',
    reset: 'Reset',
    scenarios: 'Scenario library',
    coverage: 'Standard coverage',
    composer: 'Composer',
    conversation: 'Conversation',
    process: 'Live process',
    artifact: 'Artifact workspace',
    evidence: 'Evidence / replay',
    inspector: 'Event inspector',
    timeline: 'Timeline archive',
    context: 'Context',
    policy: 'Policy',
    diagnostics: 'Diagnostics',
    controls: 'Controls',
    eventStream: 'Ordered event stream',
    payload: 'Latest payload',
    blocked: 'Runtime is waiting for a controlled user action.',
    noPayload: 'No payload yet.',
    noArtifact: 'No artifact selected yet.',
    noEvidence: 'No evidence facts yet.',
    done: 'done',
    running: 'running',
    waiting: 'waiting',
    idle: 'idle',
    launchDocs: 'Open the Agent UI reference',
    draft: 'Update the Agent UI standard and prove the UI behavior with a runnable demo.',
    send: 'Send',
    queue: 'Queue',
    steer: 'Steer active run',
    scenarioHint: 'Choose a scenario, then play or step through events.'
  },
  zh: {
    eyebrow: '独立可运行 Demo',
    title: 'Agent UI 工作台',
    subtitle: '完整产品形态 demo：同一个 event reducer 把 runtime facts 投影到 conversation、process、tools、approvals、artifacts、evidence、context、policy、diagnostics 与 history。',
    docs: '返回文档',
    language: 'English',
    play: '播放',
    pause: '暂停',
    step: '前进',
    reset: '重置',
    scenarios: '场景库',
    coverage: '标准覆盖',
    composer: '输入区',
    conversation: '对话',
    process: '运行过程',
    artifact: '产物工作区',
    evidence: '证据 / 回放',
    inspector: '事件检查器',
    timeline: '时间线归档',
    context: '上下文',
    policy: '策略',
    diagnostics: '诊断',
    controls: '控制',
    eventStream: '有序事件流',
    payload: '最新 payload',
    blocked: 'Runtime 正在等待受控用户动作。',
    noPayload: '暂无 payload。',
    noArtifact: '暂无选中产物。',
    noEvidence: '暂无证据事实。',
    done: '完成',
    running: '运行中',
    waiting: '等待',
    idle: '空闲',
    launchDocs: '打开 Agent UI reference',
    draft: '更新 Agent UI 标准，并用可运行 demo 证明 UI 行为。',
    send: '发送',
    queue: '排队',
    steer: '转向 active run',
    scenarioHint: '选择一个场景，然后播放或逐事件前进。'
  }
}

const coverage = [
  ['session', 'Session / Thread Shell'],
  ['composer', 'Composer'],
  ['status', 'Runtime Status'],
  ['parts', 'Ordered Message Parts'],
  ['process', 'Inline Process'],
  ['tool', 'Tool UI'],
  ['hitl', 'Human-in-the-loop'],
  ['task', 'Task Capsule'],
  ['artifact', 'Artifact Workspace'],
  ['evidence', 'Evidence / Replay / Review'],
  ['context', 'Context / Memory / Compaction'],
  ['policy', 'Permission / Security / Policy'],
  ['diagnostics', 'Diagnostics / Metrics / Repair']
]

const baseProjection = {
  session: 'thread-agentui',
  hydrated: 'shell',
  queue: 'empty',
  status: 'idle',
  task: 'ready',
  draft: 'ready',
  context: 'none',
  memory: 'unchanged',
  permission: 'ask-before-write',
  risk: 'low',
  reasoning: '',
  plan: '',
  tool: '',
  toolProgress: 0,
  action: '',
  text: '',
  artifact: '',
  artifactVersion: '',
  evidence: '',
  replay: '',
  diagnostics: 'nominal',
  metrics: 'not measured',
  archive: 'empty'
}

function event(type, phase, title, detail, patch, payload = {}, waitsFor = '') {
  return { type, phase, title, detail, patch, payload, waitsFor }
}

function control(id, label, patch, payload = {}, resolves = '', advance = false) {
  return { id, label, patch, payload, resolves, advance }
}

const scenarios = [
  {
    id: 'full-run',
    category: 'end-to-end',
    title: 'Complete Agent Run',
    zhTitle: '完整 Agent Run',
    summary: 'End-to-end run from submission to archived timeline.',
    zhSummary: '从提交到 timeline 归档的端到端运行。',
    initial: { ...baseProjection },
    events: [
      event('session.opened', 'draft', 'Session shell opened', 'Session shell appears before full history.', { session: 'thread-agentui', hydrated: 'shell', task: 'ready' }, { sessionId: 'session-roadmap' }),
      event('run.started', 'submitted', 'Run accepted', 'Listener is bound before submit.', { status: 'submitted', task: 'running', queue: 'active' }, { runId: 'run-050' }),
      event('run.status', 'preparing', 'Preparing context', 'First status arrives before first text.', { status: 'preparing', context: 'roadmap + source-index' }, { stage: 'preparing' }),
      event('plan.delta', 'planning', 'Plan streamed', 'Plan is a process part, not final prose.', { plan: 'inspect -> implement -> verify' }, { partId: 'plan-1' }),
      event('reasoning.delta', 'reasoning', 'Reasoning streamed', 'Reasoning stays in the live process lane.', { reasoning: 'checking ordering and surface ownership' }, { partId: 'reasoning-1' }),
      event('tool.started', 'acting', 'Tool started', 'Tool call appears with safe input summary.', { tool: 'inspect_docs', toolProgress: 12 }, { toolCallId: 'tool-docs', inputSummary: 'docs/en/examples' }),
      event('tool.progress', 'acting', 'Tool progress', 'Running tools stay expanded.', { toolProgress: 68 }, { progress: 68 }),
      event('action.required', 'waiting', 'Approval required', 'Runtime blocks on explicit HITL response.', { status: 'waiting', task: 'needs-input', action: 'approve publishable demo' }, { actionId: 'approve-demo' }, 'approve-demo'),
      event('action.resolved', 'accepted', 'Approval resolved', 'Decision writes back to the runtime owner.', { status: 'streaming', action: 'approved' }, { actionId: 'approve-demo', decision: 'approved' }),
      event('tool.result', 'completed', 'Tool result', 'Output ref is visible but not injected into final answer.', { tool: 'inspect_docs result-ref-7', toolProgress: 100 }, { outputRef: 'result-ref-7' }),
      event('text.delta', 'producing', 'Answer text streamed', 'Final answer text is a separate ordered part.', { text: 'The demo should run as a standalone workbench.' }, { messageId: 'assistant-1' }),
      event('artifact.preview.ready', 'producing', 'Artifact preview ready', 'Deliverable opens outside the message body.', { artifact: 'standalone-workbench', artifactVersion: 'v1 preview' }, { artifactId: 'demo-workbench' }),
      event('evidence.changed', 'producing', 'Evidence linked', 'Trace and source refs attach to the same run.', { evidence: 'trace-050 + source-index', replay: 'bookmark-050' }, { evidenceId: 'trace-050' }),
      event('run.finished', 'completed', 'Run archived', 'Completed process collapses into timeline summary.', { status: 'done', task: 'done', archive: 'summary: 14 events, 1 approval, 1 artifact' }, { outcome: 'success' })
    ],
    controls: [
      control('approve', 'Approve action', { status: 'streaming', task: 'running', action: 'approved' }, { decision: 'approved' }, 'approve-demo', true),
      control('reject', 'Reject action', { status: 'failed', task: 'blocked', action: 'rejected' }, { decision: 'rejected' }, 'approve-demo'),
      control('export', 'Export evidence', { evidence: 'exported evidence pack', replay: 'download-ready' }, { exportId: 'evidence-pack-050' })
    ]
  },
  {
    id: 'ordered-parts',
    category: 'conversation',
    title: 'Interleaved Message Parts',
    zhTitle: '穿插式 Message Parts',
    summary: 'Reasoning, tools, approvals, artifacts, evidence, and text stay ordered.',
    zhSummary: 'Reasoning、tools、approvals、artifacts、evidence 与 text 保持有序。',
    initial: { ...baseProjection, task: 'running', status: 'streaming' },
    events: [
      event('reasoning.delta', 'reasoning', 'Reasoning part', 'Thinking is streamed in place, not hoisted to the top.', { reasoning: 'validate that reasoning appears between status and tool' }, { partId: 'reasoning-a' }),
      event('tool.started', 'acting', 'Tool part', 'Tool starts after reasoning and before text.', { tool: 'read_source', toolProgress: 5 }, { toolCallId: 'tool-read' }),
      event('tool.progress', 'acting', 'Tool output grows', 'Tool output remains visible while running.', { toolProgress: 80 }, { progress: 80 }),
      event('text.delta', 'producing', 'Text part', 'Assistant text can stream after process parts.', { text: 'Use ordered typed parts.' }, { partId: 'text-a' }),
      event('artifact.preview.ready', 'producing', 'Artifact part', 'Artifact is linked, not pasted as final text.', { artifact: 'ordered-parts fixture', artifactVersion: 'preview' }, { artifactId: 'artifact-parts' }),
      event('evidence.changed', 'producing', 'Evidence part', 'Evidence attaches as a traceable fact.', { evidence: 'ordering assertion passed' }, { assertion: 'ordered-parts' })
    ],
    controls: [control('finalize', 'Finalize text', { text: 'Use ordered typed parts with clean final prose.', status: 'done', task: 'done' }, { reconciled: true })]
  },
  {
    id: 'tool-lifecycle',
    category: 'process',
    title: 'Tool Lifecycle',
    zhTitle: '工具生命周期',
    summary: 'Args, progress, output refs, failure, retry, and completion are separate facts.',
    zhSummary: 'Args、progress、output refs、failure、retry 与 completion 是独立事实。',
    initial: { ...baseProjection, status: 'running', task: 'running' },
    events: [
      event('tool.started', 'acting', 'Tool started', 'Safe args are visible.', { tool: 'build_examples', toolProgress: 1 }, { args: 'examples/agent-workbench' }),
      event('tool.progress', 'acting', 'Build progress', 'Progress updates without collapsing the row.', { toolProgress: 45 }, { progress: 45 }),
      event('tool.failed', 'failed', 'Tool failed', 'Failure is recoverable and visible.', { status: 'failed', task: 'failed', tool: 'build_examples failed: stale asset', diagnostics: 'retryable' }, { retryable: true }),
      event('tool.started', 'retrying', 'Retry started', 'Retry is a lifecycle transition.', { status: 'retrying', task: 'running', tool: 'build_examples retry', toolProgress: 20 }, { attempt: 2 }),
      event('tool.result', 'completed', 'Tool result', 'Large output is represented by a ref.', { status: 'done', task: 'done', tool: 'build_examples result-ref', toolProgress: 100 }, { outputRef: 'build-log-2' })
    ],
    controls: [control('retry', 'Retry now', { status: 'retrying', task: 'running', tool: 'manual retry requested', toolProgress: 15 }, { attempt: 'manual' })]
  },
  {
    id: 'artifact-workspace',
    category: 'artifact',
    title: 'Artifact Workspace',
    zhTitle: '产物工作区',
    summary: 'Preview, edit, version, diff, export, and handoff belong outside final text.',
    zhSummary: 'Preview、edit、version、diff、export 与 handoff 不属于最终文本。',
    initial: { ...baseProjection, status: 'streaming', task: 'running' },
    events: [
      event('artifact.created', 'producing', 'Artifact created', 'Artifact identity comes from the artifact owner.', { artifact: 'agent-ui-demo.html', artifactVersion: 'v1' }, { artifactId: 'artifact-demo' }),
      event('artifact.preview.ready', 'producing', 'Preview ready', 'Preview opens in the workspace lane.', { artifact: 'agent-ui-demo.html preview', artifactVersion: 'v1 preview' }, { previewRef: 'preview-1' }),
      event('artifact.diff.ready', 'review', 'Diff ready', 'Diff is reviewable before export.', { artifactVersion: 'v2 diff ready' }, { diffRef: 'diff-2' }),
      event('artifact.export.completed', 'completed', 'Export completed', 'Export state is a durable fact.', { artifactVersion: 'v2 exported', evidence: 'export receipt linked' }, { exportRef: 'download-agent-ui-demo' })
    ],
    controls: [
      control('edit', 'Edit artifact', { artifact: 'agent-ui-demo.html edited', artifactVersion: 'v2 draft' }, { patch: 'title + layout' }),
      control('export', 'Export', { artifactVersion: 'export requested' }, { requested: true })
    ]
  },
  {
    id: 'evidence-replay',
    category: 'evidence',
    title: 'Evidence, Replay, Review',
    zhTitle: '证据、回放、评审',
    summary: 'Traceable citations, replay bookmarks, and review verdicts do not pollute chat text.',
    zhSummary: '可追溯引用、回放书签与评审结论不污染聊天正文。',
    initial: { ...baseProjection, status: 'done', task: 'done', text: 'Implementation completed.' },
    events: [
      event('evidence.changed', 'archived', 'Trace attached', 'Evidence references the same session and run ids.', { evidence: 'trace-run-050' }, { traceId: 'trace-run-050' }),
      event('state.snapshot', 'archived', 'Replay bookmark stored', 'Replay starts from a durable snapshot.', { replay: 'bookmark-after-tool-result' }, { replayId: 'replay-050' }),
      event('review.completed', 'review', 'Review completed', 'Review verdict is separate from assistant prose.', { evidence: 'trace-run-050 + review-pass', diagnostics: 'review passed' }, { verdict: 'pass' })
    ],
    controls: [control('open-replay', 'Open replay', { replay: 'replay opened at tool.result' }, { replayOpen: true })]
  },
  {
    id: 'context-policy',
    category: 'control',
    title: 'Context and Policy',
    zhTitle: '上下文与策略',
    summary: 'Context selection, compaction, permission, and risk are explicit surfaces.',
    zhSummary: '上下文选择、压缩、权限与风险都有明确 surface。',
    initial: { ...baseProjection, status: 'preparing', task: 'running' },
    events: [
      event('context.changed', 'preparing', 'Context selected', 'Selected refs are visible before submit.', { context: 'roadmap + source-index + schema', metrics: '42k/64k tokens' }, { refs: 3 }),
      event('memory.compacted', 'preparing', 'Memory compacted', 'Compaction is shown as context state.', { memory: 'summary promoted, stale facts dropped', metrics: '31k/64k tokens' }, { savedTokens: 11000 }),
      event('permission.changed', 'draft', 'Policy preview', 'Policy preview is not a permission grant.', { permission: 'ask-before-write', risk: 'medium: publishes docs' }, { policyId: 'publish-docs' }),
      event('action.required', 'waiting', 'Policy action required', 'High consequence actions need explicit response.', { status: 'waiting', task: 'needs-input', action: 'confirm publish' }, { actionId: 'publish-confirm' }, 'publish-confirm')
    ],
    controls: [
      control('approve-policy', 'Approve policy action', { status: 'streaming', task: 'running', action: 'publish approved', permission: 'one-shot grant' }, { decision: 'approved' }, 'publish-confirm', true),
      control('deny-policy', 'Reject policy action', { status: 'blocked', task: 'blocked', action: 'publish rejected', permission: 'denied' }, { decision: 'rejected' }, 'publish-confirm')
    ]
  },
  {
    id: 'diagnostics-repair',
    category: 'system',
    title: 'Diagnostics and Repair',
    zhTitle: '诊断与修复',
    summary: 'Latency, backlog, stale hydration, and repair state are observable.',
    zhSummary: 'Latency、backlog、stale hydration 与 repair state 可观察。',
    initial: { ...baseProjection, status: 'streaming', task: 'running' },
    events: [
      event('metrics.changed', 'observing', 'First status measured', 'Submit-to-status latency is explicit.', { metrics: 'submit->status 184ms' }, { firstStatusMs: 184 }),
      event('diagnostics.changed', 'observing', 'Backlog detected', 'Streaming backlog is not hidden.', { diagnostics: 'delta backlog: 18, oldest: 820ms' }, { backlog: 18 }),
      event('messages.snapshot', 'repairing', 'History repaired', 'Repair uses durable message snapshots.', { hydrated: 'recent + repaired window', diagnostics: 'snapshot repaired missing text.final' }, { repaired: true }),
      event('run.finished', 'completed', 'Diagnostics archived', 'Completed diagnostics move to timeline.', { status: 'done', task: 'done', archive: 'diagnostics summary saved' }, { archive: true })
    ],
    controls: [control('repair', 'Repair from snapshot', { hydrated: 'manual repair applied', diagnostics: 'manual repair complete' }, { repair: 'manual' })]
  }
]

const app = {
  locale: new URLSearchParams(location.search).get('lang') === 'zh' ? 'zh' : 'en',
  scenarioId: 'full-run',
  cursor: 0,
  playing: false,
  blockedBy: '',
  projection: {},
  payload: {},
  applied: [],
  timer: 0
}

function labels() {
  return locales[app.locale]
}

function scenario() {
  return scenarios.find((item) => item.id === app.scenarioId) || scenarios[0]
}

function scenarioTitle(item) {
  return app.locale === 'zh' ? item.zhTitle : item.title
}

function scenarioSummary(item) {
  return app.locale === 'zh' ? item.zhSummary : item.summary
}

function reset(nextScenarioId = app.scenarioId) {
  window.clearInterval(app.timer)
  app.scenarioId = nextScenarioId
  app.cursor = 0
  app.playing = false
  app.blockedBy = ''
  app.projection = { ...scenario().initial }
  app.payload = {}
  app.applied = []
  render()
}

function applyEvent(item) {
  app.projection = { ...app.projection, ...item.patch }
  app.payload = item.payload || {}
  app.applied = [...app.applied, item]
  app.cursor += 1
  if (item.waitsFor) {
    app.blockedBy = item.waitsFor
    app.playing = false
    window.clearInterval(app.timer)
  }
}

function step() {
  if (app.blockedBy) return
  const item = scenario().events[app.cursor]
  if (!item) {
    app.playing = false
    window.clearInterval(app.timer)
    render()
    return
  }
  applyEvent(item)
  render()
}

function play() {
  if (app.playing) {
    app.playing = false
    window.clearInterval(app.timer)
    render()
    return
  }
  app.playing = true
  app.timer = window.setInterval(() => {
    step()
    if (app.cursor >= scenario().events.length || app.blockedBy) {
      app.playing = false
      window.clearInterval(app.timer)
      render()
    }
  }, 850)
  render()
}

function runControl(id) {
  const item = scenario().controls.find((candidate) => candidate.id === id)
  if (!item) return
  app.projection = { ...app.projection, ...item.patch }
  app.payload = item.payload || {}
  if (item.resolves && item.resolves === app.blockedBy) {
    app.blockedBy = ''
    const nextEvent = scenario().events[app.cursor]
    if (item.advance && nextEvent && nextEvent.type === 'action.resolved') {
      applyEvent(nextEvent)
    }
  }
  render()
}

function statusLabel() {
  const t = labels()
  if (app.blockedBy) return t.waiting
  if (app.projection.status === 'done') return t.done
  if (app.projection.status === 'idle') return t.idle
  return app.playing || app.projection.task === 'running' ? t.running : app.projection.status
}

function value(value) {
  if (value === undefined || value === null || value === '') return 'none'
  return String(value)
}

function escapeHtml(raw) {
  return String(raw)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function eventRows() {
  return scenario().events.map((item, index) => {
    const state = index < app.cursor ? 'is-done' : index === app.cursor ? 'is-next' : ''
    return `<li class="${state}"><span>${escapeHtml(item.type)}</span><small>${escapeHtml(item.phase)}</small></li>`
  }).join('')
}

function processParts() {
  const parts = []
  if (app.projection.plan) parts.push(['plan.delta', app.projection.plan])
  if (app.projection.reasoning) parts.push(['reasoning.delta', app.projection.reasoning])
  if (app.projection.tool) parts.push(['tool.*', `${app.projection.tool} (${app.projection.toolProgress}%)`])
  if (app.projection.action) parts.push(['action.*', app.projection.action])
  if (!parts.length) return `<p class="empty">${labels().scenarioHint}</p>`
  return parts.map(([kind, text]) => `<div class="part"><b>${escapeHtml(kind)}</b><span>${escapeHtml(text)}</span></div>`).join('')
}

function conversationParts() {
  const rows = [
    `<div class="bubble user"><strong>User</strong><p>${escapeHtml(labels().draft)}</p></div>`
  ]
  if (app.projection.reasoning) rows.push(`<div class="bubble process"><strong>reasoning.delta</strong><p>${escapeHtml(app.projection.reasoning)}</p></div>`)
  if (app.projection.tool) rows.push(`<div class="bubble process"><strong>tool UI</strong><p>${escapeHtml(app.projection.tool)} · ${app.projection.toolProgress}%</p></div>`)
  if (app.projection.action) rows.push(`<div class="bubble action"><strong>action.required</strong><p>${escapeHtml(app.projection.action)}</p></div>`)
  rows.push(`<div class="bubble assistant"><strong>Assistant text</strong><p>${escapeHtml(app.projection.text || '...')}</p></div>`)
  if (app.projection.artifact) rows.push(`<div class="bubble ref"><strong>artifact ref</strong><p>${escapeHtml(app.projection.artifact)}</p></div>`)
  if (app.projection.evidence) rows.push(`<div class="bubble ref"><strong>evidence ref</strong><p>${escapeHtml(app.projection.evidence)}</p></div>`)
  return rows.join('')
}

function projectionList() {
  const keys = ['session', 'hydrated', 'queue', 'status', 'task', 'context', 'memory', 'permission', 'risk', 'metrics', 'diagnostics', 'archive']
  return keys.map((key) => `<span><b>${key}</b>${escapeHtml(value(app.projection[key]))}</span>`).join('')
}

function render() {
  const t = labels()
  const current = scenario()
  const controls = current.controls.map((item) => `<button type="button" data-control="${item.id}">${escapeHtml(item.label)}</button>`).join('')
  const payload = Object.keys(app.payload).length ? JSON.stringify(app.payload, null, 2) : t.noPayload
  const docsHref = app.locale === 'zh' ? '../../zh/reference/flow-and-taxonomy' : '../../en/reference/flow-and-taxonomy'
  const examplesHref = app.locale === 'zh' ? '../../zh/examples/' : '../../en/examples/'
  document.documentElement.lang = app.locale === 'zh' ? 'zh-CN' : 'en'
  document.querySelector('#app').innerHTML = `
    <main class="shell">
      <header class="hero">
        <div>
          <p class="eyebrow">${t.eyebrow}</p>
          <h1>${t.title}</h1>
          <p>${t.subtitle}</p>
        </div>
        <div class="hero-actions">
          <a href="${docsHref}">${t.launchDocs}</a>
          <button type="button" data-action="language">${t.language}</button>
          <a href="${examplesHref}">${t.docs}</a>
        </div>
      </header>

      <section class="command-bar">
        <div class="status-pill" data-state="${escapeHtml(app.blockedBy ? 'waiting' : app.projection.status)}">
          <small>${escapeHtml(current.category)}</small>
          <strong>${escapeHtml(statusLabel())}</strong>
        </div>
        <button type="button" class="primary" data-action="play">${app.playing ? t.pause : t.play}</button>
        <button type="button" data-action="step" ${app.blockedBy ? 'disabled' : ''}>${t.step}</button>
        <button type="button" data-action="reset">${t.reset}</button>
        ${controls}
      </section>

      ${app.blockedBy ? `<p class="blocked">${t.blocked} <code>${escapeHtml(app.blockedBy)}</code></p>` : ''}

      <section class="workspace">
        <aside class="sidebar panel">
          <div class="panel-head"><span>${t.scenarios}</span></div>
          <p class="hint">${t.scenarioHint}</p>
          <nav class="scenario-list">
            ${scenarios.map((item) => `
              <button type="button" class="${item.id === app.scenarioId ? 'active' : ''}" data-scenario="${item.id}">
                <strong>${escapeHtml(scenarioTitle(item))}</strong>
                <small>${escapeHtml(scenarioSummary(item))}</small>
              </button>
            `).join('')}
          </nav>
          <div class="coverage">
            <div class="panel-head"><span>${t.coverage}</span></div>
            ${coverage.map(([key, label]) => `<span><b>${key}</b>${label}</span>`).join('')}
          </div>
        </aside>

        <section class="main-column">
          <article class="panel composer">
            <div class="panel-head"><span>${t.composer}</span><code>${escapeHtml(app.projection.permission)}</code></div>
            <div class="composer-box">${escapeHtml(t.draft)}</div>
            <div class="chips"><span>${escapeHtml(app.projection.context)}</span><span>${escapeHtml(app.projection.queue)}</span><span>${escapeHtml(app.projection.risk)}</span></div>
            <div class="composer-actions"><button>${t.send}</button><button>${t.queue}</button><button>${t.steer}</button></div>
          </article>

          <article class="panel conversation">
            <div class="panel-head"><span>${t.conversation}</span><code>${escapeHtml(current.id)}</code></div>
            ${conversationParts()}
          </article>
        </section>

        <section class="right-column">
          <article class="panel live-process">
            <div class="panel-head"><span>${t.process}</span><code>${escapeHtml(app.projection.status)}</code></div>
            ${processParts()}
            <progress max="100" value="${Number(app.projection.toolProgress) || 0}"></progress>
          </article>

          <article class="panel artifact">
            <div class="panel-head"><span>${t.artifact}</span><code>${escapeHtml(app.projection.artifactVersion || 'none')}</code></div>
            ${app.projection.artifact ? `<div class="artifact-card"><b>${escapeHtml(app.projection.artifact)}</b><p>${escapeHtml(app.projection.artifactVersion)}</p></div>` : `<p class="empty">${t.noArtifact}</p>`}
          </article>

          <article class="panel evidence">
            <div class="panel-head"><span>${t.evidence}</span><code>${escapeHtml(app.projection.replay || 'none')}</code></div>
            ${app.projection.evidence ? `<div class="evidence-card"><b>${escapeHtml(app.projection.evidence)}</b><p>${escapeHtml(app.projection.replay)}</p></div>` : `<p class="empty">${t.noEvidence}</p>`}
          </article>
        </section>
      </section>

      <section class="bottom-grid">
        <article class="panel">
          <div class="panel-head"><span>${t.eventStream}</span><code>${app.cursor}/${current.events.length}</code></div>
          <ol class="event-list">${eventRows()}</ol>
        </article>
        <article class="panel">
          <div class="panel-head"><span>${t.inspector}</span><code>projection</code></div>
          <div class="projection-list">${projectionList()}</div>
        </article>
        <article class="panel">
          <div class="panel-head"><span>${t.payload}</span><code>json</code></div>
          <pre>${escapeHtml(payload)}</pre>
        </article>
      </section>
    </main>
  `
}

document.addEventListener('click', (event) => {
  const target = event.target.closest('button')
  if (!target) return
  if (target.dataset.action === 'play') play()
  if (target.dataset.action === 'step') step()
  if (target.dataset.action === 'reset') reset()
  if (target.dataset.action === 'language') {
    app.locale = app.locale === 'zh' ? 'en' : 'zh'
    render()
  }
  if (target.dataset.scenario) reset(target.dataset.scenario)
  if (target.dataset.control) runControl(target.dataset.control)
})

reset('full-run')
