const locales = {
  en: {
    eyebrow: 'Standalone runnable demo',
    title: 'Agent UI Team Workbench',
    subtitle: 'One reducer projects runtime facts into ordered parts, tools, approvals, artifacts, evidence, context, diagnostics, and team workbench surfaces.',
    home: 'Home',
    examples: 'Examples',
    language: '中文',
    play: 'Play',
    pause: 'Pause',
    step: 'Step',
    reset: 'Reset',
    scenarios: 'Scenario matrix',
    coverage: 'Surface coverage',
    composer: 'Composer',
    conversation: 'Ordered stream',
    process: 'Live process',
    artifact: 'Artifact workspace',
    evidence: 'Evidence / replay',
    inspector: 'Projection inspector',
    context: 'Context',
    policy: 'Policy',
    diagnostics: 'Diagnostics',
    eventStream: 'Event stream',
    payload: 'Latest payload',
    team: 'Team workbench',
    roster: 'Roster',
    board: 'Work board',
    graph: 'Delegation graph',
    handoff: 'Handoff lane',
    notifications: 'Worker notifications',
    review: 'Review lane',
    transcript: 'Teammate transcript',
    background: 'Background teammate',
    remote: 'Remote teammate',
    noPayload: 'No payload yet.',
    noArtifact: 'No artifact selected yet.',
    noEvidence: 'No evidence facts yet.',
    noTeam: 'Choose a team scenario to project roster, work board, delegation, handoff, review, background, and remote teammate facts.',
    done: 'done',
    running: 'running',
    waiting: 'waiting',
    idle: 'idle',
    launchDocs: 'Open the Agent UI reference',
    draft: 'Standardize Agent UI and prove behavior with a runnable team workbench demo.',
    send: 'Send',
    queue: 'Queue',
    steer: 'Steer active run',
    scenarioHint: 'Choose a scenario, then play or step through events.',
    blocked: 'Runtime is waiting for a controlled user action.',
    noProcess: 'No process part yet. Status and context can arrive before reasoning, tools, or text.'
  },
  zh: {
    eyebrow: '独立可运行 Demo',
    title: 'Agent UI Team 工作台',
    subtitle: '同一个 reducer 把 runtime facts 投影到有序 parts、tools、approvals、artifacts、evidence、context、diagnostics 与 team workbench surfaces。',
    home: '返回主页',
    examples: '示例',
    language: 'English',
    play: '播放',
    pause: '暂停',
    step: '前进',
    reset: '重置',
    scenarios: '场景矩阵',
    coverage: '表面覆盖',
    composer: '输入区',
    conversation: '有序流',
    process: '运行过程',
    artifact: '产物工作区',
    evidence: '证据 / 回放',
    inspector: 'Projection 检查器',
    context: '上下文',
    policy: '策略',
    diagnostics: '诊断',
    eventStream: '事件流',
    payload: '最新 payload',
    team: 'Team 工作台',
    roster: '成员表',
    board: '任务板',
    graph: '委托图',
    handoff: '交接 lane',
    notifications: 'Worker 通知',
    review: '评审 lane',
    transcript: 'Teammate 片段',
    background: '后台 teammate',
    remote: '远程 teammate',
    noPayload: '暂无 payload。',
    noArtifact: '暂无选中产物。',
    noEvidence: '暂无证据事实。',
    noTeam: '选择 Team 场景后，会投影 roster、work board、delegation、handoff、review、background 与 remote teammate facts。',
    done: '完成',
    running: '运行中',
    waiting: '等待',
    idle: '空闲',
    launchDocs: '打开 Agent UI reference',
    draft: '标准化 Agent UI，并用可运行 Team 工作台 demo 证明行为。',
    send: '发送',
    queue: '排队',
    steer: '转向 active run',
    scenarioHint: '选择一个场景，然后播放或逐事件前进。',
    blocked: 'Runtime 正在等待受控用户动作。',
    noProcess: '暂无 process part；状态和上下文可以先于 reasoning、tools 或 text 到达。'
  }
}

const coverage = [
  { key: 'session', en: 'Session / Thread Shell', zh: 'Session / Thread 壳' },
  { key: 'composer', en: 'Composer', zh: '输入区' },
  { key: 'status', en: 'Runtime Status', zh: '运行状态' },
  { key: 'parts', en: 'Ordered Message Parts', zh: '有序消息部件' },
  { key: 'process', en: 'Inline Process', zh: '内联运行过程' },
  { key: 'tool', en: 'Tool UI', zh: '工具 UI' },
  { key: 'hitl', en: 'Human-in-the-loop', zh: '人类介入' },
  { key: 'task', en: 'Task Capsule', zh: '任务胶囊' },
  { key: 'artifact', en: 'Artifact Workspace', zh: '产物工作区' },
  { key: 'evidence', en: 'Evidence / Replay / Review', zh: '证据 / 回放 / 评审' },
  { key: 'context', en: 'Context / Memory / Compaction', zh: '上下文 / 记忆 / 压缩' },
  { key: 'policy', en: 'Permission / Security / Policy', zh: '权限 / 安全 / 策略' },
  { key: 'diagnostics', en: 'Diagnostics / Metrics / Repair', zh: '诊断 / 指标 / 修复' },
  { key: 'team', en: 'Team Roster', zh: 'Team 成员表' },
  { key: 'board', en: 'Work Board', zh: '任务板' },
  { key: 'delegation', en: 'Delegation Graph', zh: '委托图' },
  { key: 'handoff', en: 'Handoff Lane', zh: '交接 Lane' },
  { key: 'workers', en: 'Worker Notifications', zh: 'Worker 通知' },
  { key: 'review', en: 'Review Lane', zh: '评审 Lane' },
  { key: 'transcript', en: 'Teammate Transcript', zh: 'Teammate 片段' },
  { key: 'background', en: 'Background Teammate', zh: '后台 Teammate' },
  { key: 'remote', en: 'Remote Teammate', zh: '远程 Teammate' },
  { key: 'teamPolicy', en: 'Team Policy', zh: 'Team 策略' }
]

const baseProjection = {
  session: 'thread-agentui',
  hydrated: 'shell',
  queue: 'empty',
  status: 'idle',
  runtimeEntity: 'agent_turn',
  runtimeStatus: 'idle',
  latestTurnStatus: 'idle',
  task: 'ready',
  topology: 'solo_run',
  teamPhase: 'none',
  queuedTurnCount: 0,
  teamParallelBudget: 0,
  teamActiveCount: 0,
  teamQueuedCount: 0,
  providerConcurrencyGroup: 'none',
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
  archive: 'empty',
  teamPolicy: '',
  roster: [],
  board: [],
  delegation: [],
  handoff: [],
  notifications: [],
  review: [],
  transcript: [],
  background: null,
  remote: null
}

function event(type, phase, title, detail, patch, payload = {}, waitsFor = '') {
  return { type, phase, title, detail, patch, payload, waitsFor }
}

function control(id, label, patch, payload = {}, resolves = '', advance = false) {
  return { id, label, patch, payload, resolves, advance }
}

function teammate(id, name, role, status, detail, model = 'default', policy = 'ask') {
  return { id, name, role, status, detail, model, policy }
}

function workItem(id, title, owner, status, progress, detail = '') {
  return { id, title, owner, status, progress, detail }
}

function edge(from, to, label, status = 'active') {
  return { from, to, label, status }
}

const coreScenarios = [
  {
    id: 'full-run',
    category: 'core',
    title: 'Complete Agent Run',
    zhTitle: '完整 Agent Run',
    summary: 'End-to-end run from submission to archived timeline.',
    zhSummary: '从提交到 timeline 归档的端到端运行。',
    initial: { ...baseProjection },
    events: [
      event('session.opened', 'draft', 'Session shell opened', 'Shell appears before full history.', { hydrated: 'shell', task: 'ready' }, { sessionId: 'session-roadmap' }),
      event('run.started', 'submitted', 'Run accepted', 'Listener is bound before submit.', { status: 'submitted', task: 'running', queue: 'active' }, { runId: 'run-060' }),
      event('run.status', 'preparing', 'Preparing context', 'First status arrives before first text.', { status: 'preparing', context: 'roadmap + source-index + schema' }, { stage: 'preparing' }),
      event('plan.delta', 'planning', 'Plan streamed', 'Plan is process, not final prose.', { status: 'streaming', plan: 'inspect references -> update standard -> verify demo' }, { partId: 'plan-1' }),
      event('reasoning.delta', 'reasoning', 'Reasoning streamed', 'Reasoning stays in ordered process lane.', { reasoning: 'checking surface ownership and part order' }, { partId: 'reasoning-1' }),
      event('tool.started', 'acting', 'Tool started', 'Running tools stay expanded.', { tool: 'inspect_agentui_sources', toolProgress: 10 }, { toolCallId: 'tool-docs' }),
      event('tool.progress', 'acting', 'Tool progress', 'Progress updates the same row.', { toolProgress: 72 }, { progress: 72 }),
      event('action.required', 'waiting', 'Approval required', 'Runtime blocks on explicit HITL response.', { status: 'waiting', task: 'needs-input', action: 'approve release notes' }, { actionId: 'approve-demo' }, 'approve-demo'),
      event('action.resolved', 'accepted', 'Approval resolved', 'Decision writes back to runtime owner.', { status: 'streaming', action: 'approved' }, { actionId: 'approve-demo', decision: 'approved' }),
      event('tool.result', 'completed', 'Tool result', 'Output ref is visible but not injected into final answer.', { tool: 'inspect_agentui_sources result-ref-7', toolProgress: 100 }, { outputRef: 'result-ref-7' }),
      event('text.delta', 'producing', 'Answer text streamed', 'Final answer text is separate.', { text: 'Agent UI v0.6 standardizes team workbench projection.' }, { messageId: 'assistant-1' }),
      event('artifact.preview.ready', 'producing', 'Artifact preview ready', 'Deliverable opens outside message body.', { artifact: 'standalone-team-workbench', artifactVersion: 'v0.6 preview' }, { artifactId: 'demo-workbench' }),
      event('evidence.changed', 'producing', 'Evidence linked', 'Trace and sources attach to same run.', { evidence: 'trace-060 + source-index', replay: 'bookmark-060' }, { evidenceId: 'trace-060' }),
      event('run.finished', 'completed', 'Run archived', 'Completed process collapses into timeline summary.', { status: 'done', task: 'done', archive: 'summary: 14 events, 1 approval, 1 artifact' }, { outcome: 'success' })
    ],
    controls: [
      control('approve', 'Approve action', { status: 'streaming', task: 'running', action: 'approved' }, { decision: 'approved' }, 'approve-demo', true),
      control('reject', 'Reject action', { status: 'failed', task: 'blocked', action: 'rejected' }, { decision: 'rejected' }, 'approve-demo'),
      control('export', 'Export evidence', { evidence: 'exported evidence pack', replay: 'download-ready' }, { exportId: 'evidence-pack-060' })
    ]
  },
  {
    id: 'ordered-parts', category: 'core', title: 'Interleaved Message Parts', zhTitle: '穿插式 Message Parts',
    summary: 'Reasoning, tools, approvals, artifacts, evidence, and text stay ordered.', zhSummary: 'Reasoning、tools、approvals、artifacts、evidence 与 text 保持有序。',
    initial: { ...baseProjection, task: 'running', status: 'streaming' },
    events: [
      event('reasoning.delta', 'reasoning', 'Reasoning part', 'Thinking is streamed in place, not hoisted.', { reasoning: 'validate order between status, tool, and text' }, { partId: 'reasoning-a' }),
      event('tool.started', 'acting', 'Tool part', 'Tool starts between reasoning and text.', { tool: 'read_source', toolProgress: 5 }, { toolCallId: 'tool-read' }),
      event('tool.progress', 'acting', 'Tool output grows', 'Tool output remains visible while running.', { toolProgress: 80 }, { progress: 80 }),
      event('text.delta', 'producing', 'Text part', 'Assistant text can stream after process parts.', { text: 'Use ordered typed parts.' }, { partId: 'text-a' }),
      event('artifact.preview.ready', 'producing', 'Artifact part', 'Artifact is linked, not pasted as final text.', { artifact: 'ordered-parts fixture', artifactVersion: 'preview' }, { artifactId: 'artifact-parts' }),
      event('evidence.changed', 'producing', 'Evidence part', 'Evidence attaches as a traceable fact.', { evidence: 'ordering assertion passed' }, { assertion: 'ordered-parts' })
    ],
    controls: [control('finalize', 'Finalize text', { text: 'Use ordered typed parts with clean final prose.', status: 'done', task: 'done' }, { reconciled: true })]
  },
  {
    id: 'tool-lifecycle', category: 'core', title: 'Tool Lifecycle', zhTitle: '工具生命周期',
    summary: 'Args, progress, output refs, failure, retry, and completion are separate facts.', zhSummary: 'Args、progress、output refs、failure、retry 与 completion 是独立事实。',
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
    id: 'artifact-workspace', category: 'core', title: 'Artifact Workspace', zhTitle: '产物工作区',
    summary: 'Preview, edit, version, diff, export, and handoff belong outside final text.', zhSummary: 'Preview、edit、version、diff、export 与 handoff 不属于最终文本。',
    initial: { ...baseProjection, status: 'streaming', task: 'running' },
    events: [
      event('artifact.created', 'producing', 'Artifact created', 'Artifact identity comes from artifact owner.', { artifact: 'agent-ui-demo.html', artifactVersion: 'v1' }, { artifactId: 'artifact-demo' }),
      event('artifact.preview.ready', 'producing', 'Preview ready', 'Preview opens in workspace lane.', { artifact: 'agent-ui-demo.html preview', artifactVersion: 'v1 preview' }, { previewRef: 'preview-1' }),
      event('artifact.diff.ready', 'reviewing', 'Diff ready', 'Diff is reviewable before export.', { artifactVersion: 'v2 diff ready' }, { diffRef: 'diff-2' }),
      event('artifact.export.completed', 'completed', 'Export completed', 'Export state is durable.', { artifactVersion: 'v2 exported', evidence: 'export receipt linked' }, { exportRef: 'download-agent-ui-demo' })
    ],
    controls: [control('edit', 'Edit artifact', { artifact: 'agent-ui-demo.html edited', artifactVersion: 'v2 draft' }, { patch: 'title + layout' }), control('export', 'Export', { artifactVersion: 'export requested' }, { requested: true })]
  },
  {
    id: 'evidence-replay', category: 'core', title: 'Evidence, Replay, Review', zhTitle: '证据、回放、评审',
    summary: 'Citations, replay bookmarks, and review verdicts do not pollute chat text.', zhSummary: '引用、回放书签与评审结论不污染聊天正文。',
    initial: { ...baseProjection, status: 'done', task: 'done', text: 'Implementation completed.' },
    events: [
      event('evidence.changed', 'archived', 'Trace attached', 'Evidence references same session and run ids.', { evidence: 'trace-run-060' }, { traceId: 'trace-run-060' }),
      event('state.snapshot', 'archived', 'Replay bookmark stored', 'Replay starts from durable snapshot.', { replay: 'bookmark-after-tool-result' }, { replayId: 'replay-060' }),
      event('review.completed', 'reviewing', 'Review completed', 'Review verdict is separate from assistant prose.', { evidence: 'trace-run-060 + review-pass', diagnostics: 'review passed' }, { verdict: 'pass' })
    ],
    controls: [control('open-replay', 'Open replay', { replay: 'replay opened at tool.result' }, { replayOpen: true })]
  },
  {
    id: 'context-policy', category: 'core', title: 'Context and Policy', zhTitle: '上下文与策略',
    summary: 'Context selection, compaction, permission, and risk are explicit surfaces.', zhSummary: '上下文选择、压缩、权限与风险都有明确 surface。',
    initial: { ...baseProjection, status: 'preparing', task: 'running' },
    events: [
      event('context.changed', 'preparing', 'Context selected', 'Selected refs are visible before submit.', { context: 'roadmap + source-index + schema', metrics: '42k/64k tokens' }, { refs: 3 }),
      event('context.compaction.completed', 'preparing', 'Memory compacted', 'Compaction is shown as context state.', { memory: 'summary promoted, stale facts dropped', metrics: '31k/64k tokens' }, { savedTokens: 11000 }),
      event('permission.changed', 'draft', 'Policy preview', 'Policy preview is not a permission grant.', { permission: 'ask-before-write', risk: 'medium: publishes docs' }, { policyId: 'publish-docs' }),
      event('action.required', 'waiting', 'Policy action required', 'High consequence actions need explicit response.', { status: 'waiting', task: 'needs-input', action: 'confirm publish' }, { actionId: 'publish-confirm' }, 'publish-confirm')
    ],
    controls: [control('approve-policy', 'Approve policy action', { status: 'streaming', task: 'running', action: 'publish approved', permission: 'one-shot grant' }, { decision: 'approved' }, 'publish-confirm', true), control('deny-policy', 'Reject policy action', { status: 'blocked', task: 'blocked', action: 'publish rejected', permission: 'denied' }, { decision: 'rejected' }, 'publish-confirm')]
  },
  {
    id: 'diagnostics-repair', category: 'core', title: 'Diagnostics and Repair', zhTitle: '诊断与修复',
    summary: 'Latency, backlog, stale hydration, and repair state are observable.', zhSummary: 'Latency、backlog、stale hydration 与 repair state 可观察。',
    initial: { ...baseProjection, status: 'streaming', task: 'running' },
    events: [
      event('metric.changed', 'acting', 'First status measured', 'Submit-to-status latency is explicit.', { metrics: 'submit->status 184ms' }, { firstStatusMs: 184 }),
      event('diagnostic.changed', 'acting', 'Backlog detected', 'Streaming backlog is not hidden.', { diagnostics: 'delta backlog: 18, oldest: 820ms' }, { backlog: 18 }),
      event('messages.snapshot', 'hydrating', 'History repaired', 'Repair uses durable message snapshots.', { hydrated: 'recent + repaired window', diagnostics: 'snapshot repaired missing text.final' }, { repaired: true }),
      event('run.finished', 'completed', 'Diagnostics archived', 'Completed diagnostics move to timeline.', { status: 'done', task: 'done', archive: 'diagnostics summary saved' }, { archive: true })
    ],
    controls: [control('repair', 'Repair from snapshot', { hydrated: 'manual repair applied', diagnostics: 'manual repair complete' }, { repair: 'manual' })]
  }
]

const teamBase = {
  ...baseProjection,
  status: 'running',
  runtimeEntity: 'subagent_turn',
  runtimeStatus: 'running',
  latestTurnStatus: 'running',
  task: 'running',
  teamPhase: 'active',
  teamParallelBudget: 2,
  teamActiveCount: 1,
  teamQueuedCount: 0,
  providerConcurrencyGroup: 'default-team',
  context: 'repo + selected team',
  permission: 'per-teammate policy',
  teamPolicy: 'lead ask-before-write; workers read-only until approval'
}

const teamScenarios = [
  {
    id: 'coordinator-team', category: 'team', title: 'Coordinator Team', zhTitle: 'Coordinator Team',
    summary: 'Coordinator talks to user; worker results are internal notifications.', zhSummary: 'Coordinator 面向用户，worker results 是内部通知。',
    initial: { ...teamBase, topology: 'coordinator_team', roster: [teammate('lead', 'Coordinator', 'lead', 'active', 'synthesizes results')] },
    events: [
      event('team.changed', 'routing', 'Team selected', 'Team context is a first-class fact.', { roster: [teammate('lead', 'Coordinator', 'lead', 'active', 'talks to user'), teammate('researcher', 'Researcher', 'worker', 'planned', 'inspect references'), teammate('implementer', 'Implementer', 'worker', 'planned', 'patch docs')] }, { teamName: 'delivery-team' }),
      event('agent.spawned', 'acting', 'Researcher spawned', 'Child teammate gets its own identity.', { roster: [teammate('lead', 'Coordinator', 'lead', 'active', 'talks to user'), teammate('researcher', 'Researcher', 'worker', 'running', 'reading Claude/Codex/Lime'), teammate('implementer', 'Implementer', 'worker', 'planned', 'patch docs')], board: [workItem('T1', 'Compare Claude Code team model', 'researcher', 'running', 35), workItem('T2', 'Update Agent UI taxonomy', 'implementer', 'open', 0)], delegation: [edge('lead', 'researcher', 'spawn_agent', 'running')] }, { agentId: 'researcher@delivery-team', parentSessionId: 'lead-session' }),
      event('worker.notification', 'archived', 'Worker result arrived', 'Notification is not a real user message.', { notifications: [{ from: 'Researcher', status: 'completed', summary: 'Found teammate identity, plan approval, and worker notification requirements.', usage: '11k tokens' }], transcript: [{ from: 'Researcher', text: 'Teammate identity includes agentId, agentName, teamName, parentSessionId.' }] }, { taskId: 'researcher', status: 'completed' }),
      event('text.delta', 'producing', 'Coordinator synthesis', 'Coordinator summarizes after worker result.', { text: 'The standard should expose team roster, worker notifications, and teammate transcript refs.', status: 'done', task: 'done' }, { source: 'coordinator' })
    ],
    controls: [control('continue-worker', 'Continue researcher', { notifications: [{ from: 'Researcher', status: 'continued', summary: 'Follow-up sent through continue_agent.' }] }, { control: 'continue_agent' })]
  },
  {
    id: 'parallel-workers', category: 'team', title: 'Parallel Workers', zhTitle: '并行 Workers',
    summary: 'Fanout/fanin, wait state, partial failure, and retry stay visible.', zhSummary: 'Fanout/fanin、wait、partial failure 与 retry 保持可见。',
    initial: { ...teamBase, topology: 'parallel_workers', roster: [teammate('lead', 'Coordinator', 'lead', 'active', 'waiting for workers')] },
    events: [
      event('agent.spawned', 'acting', 'Two workers spawned', 'Independent tasks run in parallel.', { roster: [teammate('lead', 'Coordinator', 'lead', 'active', 'waiting'), teammate('codex', 'Codex Reader', 'worker', 'running', 'inspect collab tools'), teammate('lime', 'Lime Reader', 'worker', 'running', 'inspect team runtime')], board: [workItem('T1', 'Codex collab tools', 'codex', 'running', 42), workItem('T2', 'Lime team runtime', 'lime', 'running', 38)], delegation: [edge('lead', 'codex', 'spawn_agent'), edge('lead', 'lime', 'spawn_agent')], teamPhase: 'fanout', teamActiveCount: 2, teamQueuedCount: 0, teamParallelBudget: 2 }, { workerCount: 2 }),
      event('task.changed', 'waiting', 'Waiting for workers', 'Wait is visible while workers run.', { tool: 'wait_agent(codex,lime)', toolProgress: 40, delegation: [edge('lead', 'codex', 'wait'), edge('lead', 'lime', 'wait')], teamPhase: 'waiting', teamActiveCount: 2, teamQueuedCount: 0 }, { control: 'wait_agent' }),
      event('worker.notification', 'archived', 'Partial result', 'One worker completed; another failed.', { roster: [teammate('lead', 'Coordinator', 'lead', 'active', 'triaging'), teammate('codex', 'Codex Reader', 'worker', 'completed', 'spawn/send/wait/close found'), teammate('lime', 'Lime Reader', 'worker', 'failed', 'needs narrower query')], board: [workItem('T1', 'Codex collab tools', 'codex', 'done', 100), workItem('T2', 'Lime team runtime', 'lime', 'blocked', 55, 'query too broad')], notifications: [{ from: 'Codex Reader', status: 'completed', summary: 'Collab tools: spawn/send/resume/wait/close.' }, { from: 'Lime Reader', status: 'failed', summary: 'Search too broad; retry with exact files.' }], teamPhase: 'partial_failure', teamActiveCount: 0, teamQueuedCount: 1 }, { completed: 1, failed: 1 }),
      event('agent.completed', 'completed', 'Retry merged', 'Retry result is merged with prior worker output.', { roster: [teammate('lead', 'Coordinator', 'lead', 'active', 'merging'), teammate('codex', 'Codex Reader', 'worker', 'completed', 'done'), teammate('lime', 'Lime Reader', 'worker', 'completed', 'done')], board: [workItem('T1', 'Codex collab tools', 'codex', 'done', 100), workItem('T2', 'Lime team runtime', 'lime', 'done', 100)], notifications: [{ from: 'Lime Reader', status: 'completed', summary: 'Child subagent sessions expose runtime status, team phase, queue counts.' }], text: 'Parallel work merged with one retry.', teamPhase: 'fanin', teamActiveCount: 0, teamQueuedCount: 0 }, { retry: true })
    ],
    controls: [control('retry-lime', 'Retry Lime worker', { board: [workItem('T2', 'Lime team runtime', 'lime', 'running', 70, 'retrying exact files')], status: 'running' }, { control: 'retry' })]
  },
  {
    id: 'specialist-handoff', category: 'team', title: 'Specialist Handoff', zhTitle: '专家交接',
    summary: 'Active owner transfer shows reason, resume target, and memory boundary.', zhSummary: 'Active owner transfer 展示原因、resume target 与记忆边界。',
    initial: { ...teamBase, topology: 'specialist_handoff', roster: [teammate('planner', 'Planner', 'specialist', 'active', 'drafts plan'), teammate('builder', 'Builder', 'specialist', 'waiting', 'implements plan')] },
    events: [
      event('plan.delta', 'planning', 'Planner creates plan', 'Plan belongs to process, not final prose.', { plan: 'standard -> schema -> demo -> publish', board: [workItem('T1', 'Prepare implementation spec', 'planner', 'running', 80)] }, { owner: 'planner' }),
      event('agent.handoff', 'interrupted', 'Handoff requested', 'Handoff carries explicit reason.', { handoff: [{ from: 'Planner', to: 'Builder', reason: 'plan accepted; implementation owner changes', resume: 'task T2', boundary: 'planner summary + source refs' }], delegation: [edge('planner', 'builder', 'handoff', 'handoff_requested')] }, { from: 'planner', to: 'builder' }),
      event('agent.changed', 'acting', 'Builder accepted', 'New owner has its own status and policy.', { roster: [teammate('planner', 'Planner', 'specialist', 'completed', 'plan archived'), teammate('builder', 'Builder', 'specialist', 'running', 'editing demo', 'default', 'write approval required')], board: [workItem('T2', 'Implement runnable demo', 'builder', 'running', 45)] }, { activeAgent: 'builder' }),
      event('artifact.updated', 'producing', 'Builder produced artifact', 'Artifact state remains separate.', { artifact: 'agent-workbench/app.js', artifactVersion: 'team matrix draft', text: 'Builder continued from planner handoff.' }, { artifactId: 'app-js' })
    ],
    controls: [control('accept-handoff', 'Accept handoff', { handoff: [{ from: 'Planner', to: 'Builder', reason: 'accepted by user', resume: 'task T2', boundary: 'summary ref' }] }, { decision: 'accepted' })]
  },
  {
    id: 'review-team', category: 'team', title: 'Review Team', zhTitle: '评审 Team',
    summary: 'Reviewer verdicts and requested fixes live in review/evidence facts.', zhSummary: 'Reviewer verdicts 与 requested fixes 属于 review/evidence facts。',
    initial: { ...teamBase, topology: 'review_team', roster: [teammate('builder', 'Builder', 'worker', 'completed', 'patch ready'), teammate('reviewer', 'Reviewer', 'reviewer', 'planned', 'fresh eyes')] },
    events: [
      event('review.requested', 'reviewing', 'Review requested', 'Review is a lane, not a final sentence.', { review: [{ reviewer: 'Reviewer', target: 'demo + spec', status: 'requested', verdict: 'pending' }], board: [workItem('R1', 'Review team standard', 'reviewer', 'reviewing', 10)] }, { target: 'v0.6.0' }),
      event('agent.changed', 'reviewing', 'Reviewer running', 'Reviewer gets roster status.', { roster: [teammate('builder', 'Builder', 'worker', 'completed', 'patch ready'), teammate('reviewer', 'Reviewer', 'reviewer', 'running', 'checking schema/demo/docs')] }, { agentId: 'reviewer' }),
      event('review.completed', 'reviewing', 'Changes requested', 'Requested fixes become work items.', { review: [{ reviewer: 'Reviewer', target: 'demo + spec', status: 'completed', verdict: 'changes_requested', fixes: 'add remote teammate and worker notifications' }], board: [workItem('F1', 'Add remote teammate scenario', 'builder', 'open', 0), workItem('F2', 'Add worker notification rules', 'builder', 'open', 0)], evidence: 'review-verdict-060' }, { verdict: 'changes_requested' }),
      event('review.completed', 'completed', 'Review passed', 'Verdict links to evidence.', { review: [{ reviewer: 'Reviewer', target: 'demo + spec', status: 'completed', verdict: 'passed', fixes: 'none' }], evidence: 'review-verdict-060 + fix-evidence', status: 'done' }, { verdict: 'passed' })
    ],
    controls: [control('request-review', 'Request review', { review: [{ reviewer: 'Reviewer', target: 'current projection', status: 'requested', verdict: 'pending' }] }, { control: 'request_review' })]
  },
  {
    id: 'human-agent-board', category: 'team', title: 'Human / Agent Board', zhTitle: '人机任务板',
    summary: 'Humans and agents share task ownership, blockers, comments, and evidence refs.', zhSummary: '人类与 Agent 共享 task ownership、blockers、comments 与 evidence refs。',
    initial: { ...teamBase, topology: 'human_agent_board', runtimeEntity: 'work_item', roster: [teammate('pm', 'Human PM', 'human', 'active', 'sets priority'), teammate('agent', 'Implementation Agent', 'worker', 'waiting', 'claims tasks')] },
    events: [
      event('team.changed', 'routing', 'Board seeded', 'Work items are task facts.', { board: [workItem('B1', 'Define team taxonomy', 'pm', 'open', 0), workItem('B2', 'Implement demo scenario matrix', 'agent', 'open', 0), workItem('B3', 'Publish v0.6.0', 'pm', 'blocked', 0, 'needs build green')] }, { boardId: 'agentui-v060' }),
      event('task.changed', 'acting', 'Agent claims item', 'Assignment writes through board/team API.', { board: [workItem('B1', 'Define team taxonomy', 'pm', 'done', 100), workItem('B2', 'Implement demo scenario matrix', 'agent', 'running', 50), workItem('B3', 'Publish v0.6.0', 'pm', 'blocked', 0, 'needs build green')] }, { assignee: 'agent' }),
      event('state.delta', 'waiting', 'Human comment blocks publish', 'Human and agent comments stay board facts.', { board: [workItem('B2', 'Implement demo scenario matrix', 'agent', 'reviewing', 85), workItem('B3', 'Publish v0.6.0', 'pm', 'blocked', 20, 'wait for review verdict')], action: 'PM approval required for publish' }, { comment: 'wait for review' }, 'board-approval'),
      event('action.resolved', 'accepted', 'Board approval resolved', 'Publish can continue after confirmation.', { action: 'PM approved publish', board: [workItem('B3', 'Publish v0.6.0', 'pm', 'running', 60)], status: 'running' }, { decision: 'approved' })
    ],
    controls: [control('approve-board', 'Approve board change', { action: 'PM approved publish', status: 'running' }, { decision: 'approved' }, 'board-approval', true)]
  },
  {
    id: 'background-teammate', category: 'team', title: 'Background Teammate', zhTitle: '后台 Teammate',
    summary: 'Scheduled or triggered background work is shown as teammate-owned work.', zhSummary: 'Scheduled/triggered background work 以 teammate-owned work 展示。',
    initial: { ...teamBase, topology: 'background_teammate', runtimeEntity: 'automation_job', runtimeStatus: 'idle', latestTurnStatus: 'idle', status: 'idle', task: 'scheduled', roster: [teammate('watcher', 'Nightly Watcher', 'background teammate', 'sleeping', 'checks stale docs')] },
    events: [
      event('task.changed', 'submitted', 'Wake scheduled', 'Wake reason and schedule are explicit.', { background: { name: 'Nightly Watcher', status: 'scheduled', wake: '02:00 daily', reason: 'check standard drift', lastRun: 'none' } }, { schedule: 'daily' }),
      event('agent.changed', 'acting', 'Background teammate woke', 'Background run remains teammate-owned work.', { status: 'running', roster: [teammate('watcher', 'Nightly Watcher', 'background teammate', 'running', 'checking drift')], background: { name: 'Nightly Watcher', status: 'running', wake: 'manual trigger', reason: 'publish guard', lastRun: 'started now' } }, { wakeReason: 'publish guard' }),
      event('worker.notification', 'archived', 'Background result archived', 'Result becomes timeline/evidence fact.', { notifications: [{ from: 'Nightly Watcher', status: 'completed', summary: 'No source-index drift; schema includes team surfaces.' }], evidence: 'background-run-060', background: { name: 'Nightly Watcher', status: 'sleeping', wake: '02:00 daily', reason: 'check standard drift', lastRun: 'completed: no drift' } }, { result: 'no drift' }),
      event('team.changed', 'completed', 'Paused by policy', 'Pause/terminate is team policy control.', { teamPolicy: 'Nightly Watcher paused after release; resume manually', roster: [teammate('watcher', 'Nightly Watcher', 'background teammate', 'paused', 'paused by release policy')] }, { control: 'pause' })
    ],
    controls: [control('resume-bg', 'Resume watcher', { background: { name: 'Nightly Watcher', status: 'scheduled', wake: 'manual resume', reason: 'operator requested', lastRun: 'paused' }, teamPolicy: 'watcher resumed for one run' }, { control: 'resume' })]
  },
  {
    id: 'remote-teammate', category: 'team', title: 'Remote Teammate', zhTitle: '远程 Teammate',
    summary: 'Remote agent task state maps into the same team workbench surfaces.', zhSummary: 'Remote agent task state 映射到同一组 team workbench surfaces。',
    initial: { ...teamBase, topology: 'remote_teammate', runtimeEntity: 'external_task', roster: [teammate('remote-design', 'Remote Design Agent', 'remote teammate', 'submitted', 'A2A-compatible task')] },
    events: [
      event('agent.changed', 'routing', 'Remote card loaded', 'Remote capability is a teammate fact.', { remote: { name: 'Remote Design Agent', card: 'agent-card://design-v1', taskId: 'remote-task-42', status: 'submitted', detail: 'supports artifact review' }, delegation: [edge('lead', 'remote-design', 'remote task submitted')] }, { agentCard: 'design-v1' }),
      event('task.changed', 'acting', 'Remote working', 'Remote status is not inferred from local prose.', { remote: { name: 'Remote Design Agent', card: 'agent-card://design-v1', taskId: 'remote-task-42', status: 'working', detail: 'building visual review artifact' }, roster: [teammate('remote-design', 'Remote Design Agent', 'remote teammate', 'working', 'remote task running')] }, { remoteTaskId: 'remote-task-42' }),
      event('action.required', 'waiting', 'Remote needs input', 'Input-required is promoted to HITL.', { action: 'remote teammate requests target viewport', remote: { name: 'Remote Design Agent', card: 'agent-card://design-v1', taskId: 'remote-task-42', status: 'input_required', detail: 'needs viewport size' }, status: 'waiting' }, { actionId: 'remote-input' }, 'remote-input'),
      event('artifact.changed', 'completed', 'Remote artifact ready', 'Artifact update is linked, not pasted.', { action: 'remote input answered', remote: { name: 'Remote Design Agent', card: 'agent-card://design-v1', taskId: 'remote-task-42', status: 'completed', detail: 'artifact ready' }, artifact: 'remote-design-review.html', artifactVersion: 'remote v1', evidence: 'remote-task-42 trace', status: 'done', task: 'done' }, { artifactId: 'remote-artifact' })
    ],
    controls: [control('answer-remote', 'Answer remote input', { action: 'viewport 1440x900 sent', status: 'running', remote: { name: 'Remote Design Agent', card: 'agent-card://design-v1', taskId: 'remote-task-42', status: 'working', detail: 'input accepted' } }, { answer: '1440x900' }, 'remote-input', true)]
  }
]

const scenarios = [...coreScenarios, ...teamScenarios]

const app = {
  locale: new URLSearchParams(location.search).get('lang') === 'zh' ? 'zh' : 'en',
  scenarioId: 'coordinator-team',
  cursor: 0,
  playing: false,
  blockedBy: '',
  projection: {},
  payload: {},
  applied: [],
  timer: 0
}

function labels() { return locales[app.locale] }
function scenario() { return scenarios.find((item) => item.id === app.scenarioId) || scenarios[0] }
function scenarioTitle(item) { return app.locale === 'zh' ? item.zhTitle : item.title }
function scenarioSummary(item) { return app.locale === 'zh' ? item.zhSummary : item.summary }
function runtimeStatusFromStatus(status) {
  if (status === 'done') return 'completed'
  if (status === 'streaming') return 'running'
  if (status === 'blocked') return 'waiting'
  return status || 'unknown'
}

function projectionPatch(patch) {
  const next = { ...patch }
  if (patch.status && !patch.runtimeStatus) next.runtimeStatus = runtimeStatusFromStatus(patch.status)
  if (patch.status && !patch.latestTurnStatus) next.latestTurnStatus = runtimeStatusFromStatus(patch.status)
  return next
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
  app.projection = { ...app.projection, ...projectionPatch(item.patch) }
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
  }, 820)
  render()
}

function runControl(id) {
  const item = scenario().controls.find((candidate) => candidate.id === id)
  if (!item) return
  app.projection = { ...app.projection, ...projectionPatch(item.patch) }
  app.payload = item.payload || {}
  if (item.resolves && item.resolves === app.blockedBy) {
    app.blockedBy = ''
    const nextEvent = scenario().events[app.cursor]
    if (item.advance && nextEvent && nextEvent.type === 'action.resolved') applyEvent(nextEvent)
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

function value(raw) { return raw === undefined || raw === null || raw === '' ? 'none' : String(raw) }
function escapeHtml(raw) {
  return String(raw).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;')
}
function progressPercent() { return Math.round((app.cursor / Math.max(scenario().events.length, 1)) * 100) }
function hasItems(key) { return Array.isArray(app.projection[key]) && app.projection[key].length > 0 }

function eventRows() {
  return scenario().events.map((item, index) => {
    const state = index < app.cursor ? 'is-done' : index === app.cursor ? 'is-next' : ''
    return `<li class="${state}"><i>${index + 1}</i><span><b>${escapeHtml(item.type)}</b><em>${escapeHtml(item.title)}</em></span><small>${escapeHtml(item.phase)}</small></li>`
  }).join('')
}

function activeSurfaceKeys() {
  const active = new Set(['session', 'composer', 'status', 'task'])
  if (app.applied.length) active.add('parts')
  if (app.projection.plan || app.projection.reasoning || app.projection.tool || app.projection.action) active.add('process')
  if (app.projection.tool) active.add('tool')
  if (app.projection.action || app.blockedBy) active.add('hitl')
  if (app.projection.artifact) active.add('artifact')
  if (app.projection.evidence || app.projection.replay) active.add('evidence')
  if (app.projection.context !== 'none' || app.projection.memory !== 'unchanged') active.add('context')
  if (app.projection.permission || app.projection.risk !== 'low') active.add('policy')
  if (app.projection.diagnostics !== 'nominal' || app.projection.metrics !== 'not measured') active.add('diagnostics')
  if (hasItems('roster')) active.add('team')
  if (hasItems('board')) active.add('board')
  if (hasItems('delegation')) active.add('delegation')
  if (hasItems('handoff')) active.add('handoff')
  if (hasItems('notifications')) active.add('workers')
  if (hasItems('review')) active.add('review')
  if (hasItems('transcript')) active.add('transcript')
  if (app.projection.background) active.add('background')
  if (app.projection.remote) active.add('remote')
  if (app.projection.teamPolicy) active.add('teamPolicy')
  return active
}

function coverageMap() {
  const active = activeSurfaceKeys()
  return coverage.map((item) => `<span class="surface-chip ${active.has(item.key) ? 'is-active' : ''}"><b>${item.key}</b>${escapeHtml(app.locale === 'zh' ? item.zh : item.en)}</span>`).join('')
}

function scenarioStrip() {
  return scenarios.map((item) => `<button type="button" class="scenario-card ${item.id === app.scenarioId ? 'active' : ''}" data-scenario="${item.id}"><small>${escapeHtml(item.category)}</small><strong>${escapeHtml(scenarioTitle(item))}</strong><span>${escapeHtml(scenarioSummary(item))}</span></button>`).join('')
}

function processParts() {
  const rows = []
  if (app.projection.plan) rows.push(`<div class="part part-plan"><b>plan.delta</b><span>${escapeHtml(app.projection.plan)}</span></div>`)
  if (app.projection.reasoning) rows.push(`<div class="part part-reasoning"><b>reasoning.delta</b><span>${escapeHtml(app.projection.reasoning)}</span></div>`)
  if (app.projection.tool) {
    const running = Number(app.projection.toolProgress) < 100 && app.projection.status !== 'done'
    rows.push(`<div class="part part-tool ${running ? 'is-running' : 'is-complete'}"><b>tool.lifecycle</b><span>${escapeHtml(app.projection.tool)}</span><progress max="100" value="${Number(app.projection.toolProgress) || 0}"></progress></div>`)
  }
  if (app.projection.action || app.blockedBy) rows.push(`<div class="part part-action"><b>action.required</b><span>${escapeHtml(app.projection.action || app.blockedBy)}</span></div>`)
  if (!rows.length) return `<p class="empty">${escapeHtml(app.applied.length ? labels().noProcess : labels().scenarioHint)}</p>`
  return `<div class="process-stack">${rows.join('')}</div>`
}

function conversationParts() {
  const rows = [`<div class="bubble user"><small>User</small><strong>${escapeHtml(labels().draft)}</strong></div>`]
  if (app.projection.plan) rows.push(`<div class="bubble process"><small>plan.delta</small><strong>${escapeHtml(app.projection.plan)}</strong></div>`)
  if (app.projection.reasoning) rows.push(`<div class="bubble process reasoning"><small>reasoning.delta</small><strong>${escapeHtml(app.projection.reasoning)}</strong></div>`)
  if (app.projection.tool) rows.push(`<div class="bubble process tool"><small>tool UI</small><strong>${escapeHtml(app.projection.tool)} · ${app.projection.toolProgress}%</strong></div>`)
  if (hasItems('notifications')) rows.push(`<div class="bubble worker"><small>worker.notification</small><strong>${escapeHtml(app.projection.notifications.at(-1).summary)}</strong></div>`)
  if (hasItems('handoff')) rows.push(`<div class="bubble worker"><small>agent.handoff</small><strong>${escapeHtml(`${app.projection.handoff.at(-1).from} -> ${app.projection.handoff.at(-1).to}: ${app.projection.handoff.at(-1).reason}`)}</strong></div>`)
  if (app.projection.action) rows.push(`<div class="bubble action"><small>action.required</small><strong>${escapeHtml(app.projection.action)}</strong></div>`)
  rows.push(`<div class="bubble assistant"><small>Assistant text</small><strong>${escapeHtml(app.projection.text || '...')}</strong></div>`)
  if (app.projection.artifact) rows.push(`<div class="bubble ref"><small>artifact ref</small><strong>${escapeHtml(app.projection.artifact)}</strong></div>`)
  if (app.projection.evidence) rows.push(`<div class="bubble ref"><small>evidence ref</small><strong>${escapeHtml(app.projection.evidence)}</strong></div>`)
  return rows.join('')
}

function projectionList() {
  const keys = ['session', 'hydrated', 'queue', 'status', 'runtimeEntity', 'runtimeStatus', 'latestTurnStatus', 'task', 'topology', 'teamPhase', 'teamParallelBudget', 'teamActiveCount', 'teamQueuedCount', 'providerConcurrencyGroup', 'context', 'memory', 'permission', 'risk', 'teamPolicy', 'metrics', 'diagnostics', 'archive']
  return keys.map((key) => `<span><b>${key}</b>${escapeHtml(value(app.projection[key]))}</span>`).join('')
}

function metricCards() {
  return `<span><b>${app.cursor}/${scenario().events.length}</b><small>events applied</small></span><span><b>${progressPercent()}%</b><small>projection progress</small></span><span><b>${activeSurfaceKeys().size}</b><small>surfaces active</small></span>`
}

function rosterCards() {
  if (!hasItems('roster')) return `<p class="empty compact">${labels().noTeam}</p>`
  return app.projection.roster.map((item) => `<article class="mini-card"><div><b>${escapeHtml(item.name)}</b><small>${escapeHtml(item.role)} · ${escapeHtml(item.model)}</small></div><i data-status="${escapeHtml(item.status)}">${escapeHtml(item.status)}</i><p>${escapeHtml(item.detail)}</p><code>${escapeHtml(item.policy)}</code></article>`).join('')
}

function boardCards() {
  if (!hasItems('board')) return '<p class="empty compact">No work items.</p>'
  return app.projection.board.map((item) => `<article class="work-card"><div><b>${escapeHtml(item.title)}</b><small>${escapeHtml(item.id)} · ${escapeHtml(item.owner)}</small></div><i>${escapeHtml(item.status)}</i><progress max="100" value="${Number(item.progress) || 0}"></progress>${item.detail ? `<p>${escapeHtml(item.detail)}</p>` : ''}</article>`).join('')
}

function delegationRows() {
  if (!hasItems('delegation')) return '<p class="empty compact">No delegation edges.</p>'
  return app.projection.delegation.map((item) => `<li><b>${escapeHtml(item.from)}</b><span>${escapeHtml(item.label)}</span><b>${escapeHtml(item.to)}</b><small>${escapeHtml(item.status)}</small></li>`).join('')
}

function simpleList(key, empty) {
  const items = app.projection[key]
  if (!Array.isArray(items) || !items.length) return `<p class="empty compact">${empty}</p>`
  return items.map((item) => `<li>${Object.entries(item).map(([k, v]) => `<span><b>${escapeHtml(k)}</b>${escapeHtml(value(v))}</span>`).join('')}</li>`).join('')
}

function statusObjectCard(item, empty) {
  if (!item) return `<p class="empty compact">${empty}</p>`
  return `<article class="status-object">${Object.entries(item).map(([k, v]) => `<span><b>${escapeHtml(k)}</b>${escapeHtml(value(v))}</span>`).join('')}</article>`
}

function teamWorkbench() {
  const t = labels()
  return `<section class="team-grid">
    <article class="panel team-panel team-roster"><div class="panel-head"><span>${t.roster}</span><code>${escapeHtml(app.projection.topology)}</code></div><div class="mini-stack">${rosterCards()}</div></article>
    <article class="panel team-panel work-board"><div class="panel-head"><span>${t.board}</span><code>${hasItems('board') ? app.projection.board.length : 0}</code></div><div class="work-stack">${boardCards()}</div></article>
    <article class="panel team-panel"><div class="panel-head"><span>${t.graph}</span><code>edges</code></div><ol class="delegation-list">${delegationRows()}</ol></article>
    <article class="panel team-panel"><div class="panel-head"><span>${t.handoff}</span><code>owner</code></div><ul class="fact-list">${simpleList('handoff', 'No handoff yet.')}</ul></article>
    <article class="panel team-panel"><div class="panel-head"><span>${t.notifications}</span><code>internal</code></div><ul class="fact-list">${simpleList('notifications', 'No worker notifications.')}</ul></article>
    <article class="panel team-panel"><div class="panel-head"><span>${t.review}</span><code>verdict</code></div><ul class="fact-list">${simpleList('review', 'No review facts.')}</ul></article>
    <article class="panel team-panel"><div class="panel-head"><span>${t.transcript}</span><code>bounded</code></div><ul class="fact-list">${simpleList('transcript', 'No teammate transcript snippet.')}</ul></article>
    <article class="panel team-panel"><div class="panel-head"><span>${t.background}</span><code>wake</code></div>${statusObjectCard(app.projection.background, 'No background teammate.')}</article>
    <article class="panel team-panel"><div class="panel-head"><span>${t.remote}</span><code>task</code></div>${statusObjectCard(app.projection.remote, 'No remote teammate.')}</article>
  </section>`
}

function render() {
  const t = labels()
  const current = scenario()
  const controls = current.controls.map((item) => `<button type="button" data-control="${item.id}">${escapeHtml(item.label)}</button>`).join('')
  const payload = Object.keys(app.payload).length ? JSON.stringify(app.payload, null, 2) : t.noPayload
  const docsHref = app.locale === 'zh' ? '../../zh/reference/flow-and-taxonomy' : '../../en/reference/flow-and-taxonomy'
  const examplesHref = app.locale === 'zh' ? '../../zh/examples/' : '../../en/examples/'
  const homeHref = app.locale === 'zh' ? '../../zh/' : '../../en/'
  document.documentElement.lang = app.locale === 'zh' ? 'zh-CN' : 'en'
  document.querySelector('#app').innerHTML = `
    <main class="shell">
      <header class="topbar">
        <a class="brand" href="${homeHref}"><span class="brand-mark">AUI</span><span><strong>Agent UI</strong><small>v0.6.0 workbench</small></span></a>
        <nav class="top-actions" aria-label="Workbench navigation"><a class="home-link" href="${homeHref}">${t.home}</a><a href="${examplesHref}">${t.examples}</a><a href="${docsHref}">${t.launchDocs}</a><button type="button" data-action="language">${t.language}</button></nav>
      </header>

      <section class="run-header">
        <div class="run-copy"><p class="eyebrow">${t.eyebrow}</p><h1>${t.title}</h1><p>${t.subtitle}</p></div>
        <div class="run-summary"><div class="status-pill" data-state="${escapeHtml(app.blockedBy ? 'waiting' : app.projection.status)}"><small>${escapeHtml(current.category)} · ${escapeHtml(app.projection.topology)}</small><strong data-ui="status-text">${escapeHtml(statusLabel())}</strong></div><div class="metrics">${metricCards()}</div></div>
      </section>

      <section class="scenario-strip" aria-label="${t.scenarios}">${scenarioStrip()}</section>

      <section class="control-deck"><div><strong>${escapeHtml(scenarioTitle(current))}</strong><span>${escapeHtml(scenarioSummary(current))}</span></div><div class="control-actions"><button type="button" class="primary" data-action="play">${app.playing ? t.pause : t.play}</button><button type="button" data-action="step" ${app.blockedBy ? 'disabled' : ''}>${t.step}</button><button type="button" data-action="reset">${t.reset}</button>${controls}</div></section>

      ${app.blockedBy ? `<p class="blocked">${t.blocked} <code>${escapeHtml(app.blockedBy)}</code></p>` : ''}

      <section class="studio-grid">
        <aside class="rail panel"><div class="panel-head"><span>${t.eventStream}</span><code>${app.cursor}/${current.events.length}</code></div><ol class="event-list">${eventRows()}</ol><div class="panel-head coverage-head"><span>${t.coverage}</span><code>${activeSurfaceKeys().size}/${coverage.length}</code></div><div class="coverage-map">${coverageMap()}</div></aside>
        <section class="stage"><article class="panel conversation"><div class="panel-head"><span>${t.conversation}</span><code>${escapeHtml(current.id)}</code></div><div class="conversation-feed">${conversationParts()}</div></article><article class="panel composer"><div class="panel-head"><span>${t.composer}</span><code>${escapeHtml(app.projection.permission)}</code></div><div class="composer-box">${escapeHtml(t.draft)}</div><div class="chips"><span>${escapeHtml(app.projection.context)}</span><span>${escapeHtml(app.projection.queue)}</span><span>${escapeHtml(app.projection.risk)}</span></div><div class="composer-actions"><button>${t.send}</button><button>${t.queue}</button><button>${t.steer}</button></div></article></section>
        <aside class="inspector"><article class="panel live-process"><div class="panel-head"><span>${t.process}</span><code>${escapeHtml(app.projection.status)}</code></div>${processParts()}</article><article class="panel artifact"><div class="panel-head"><span>${t.artifact}</span><code>${escapeHtml(app.projection.artifactVersion || 'none')}</code></div>${app.projection.artifact ? `<div class="artifact-card"><b>${escapeHtml(app.projection.artifact)}</b><p>${escapeHtml(app.projection.artifactVersion)}</p></div>` : `<p class="empty">${t.noArtifact}</p>`}</article><article class="panel evidence"><div class="panel-head"><span>${t.evidence}</span><code>${escapeHtml(app.projection.replay || 'none')}</code></div>${app.projection.evidence ? `<div class="evidence-card"><b>${escapeHtml(app.projection.evidence)}</b><p>${escapeHtml(app.projection.replay)}</p></div>` : `<p class="empty">${t.noEvidence}</p>`}</article><article class="panel"><div class="panel-head"><span>${t.inspector}</span><code>projection</code></div><div class="projection-list">${projectionList()}</div></article><article class="panel payload-panel"><div class="panel-head"><span>${t.payload}</span><code>json</code></div><pre>${escapeHtml(payload)}</pre></article></aside>
      </section>

      <section class="team-section"><div class="section-title"><p class="eyebrow">${t.team}</p><h2>${escapeHtml(app.projection.topology)}</h2></div>${teamWorkbench()}</section>
    </main>`
}

document.addEventListener('click', (event) => {
  const target = event.target.closest('button')
  if (!target) return
  if (target.dataset.action === 'play') play()
  if (target.dataset.action === 'step') step()
  if (target.dataset.action === 'reset') reset()
  if (target.dataset.action === 'language') {
    app.locale = app.locale === 'zh' ? 'en' : 'zh'
    window.history.replaceState(null, '', app.locale === 'zh' ? '?lang=zh' : '?lang=en')
    render()
  }
  if (target.dataset.scenario) reset(target.dataset.scenario)
  if (target.dataset.control) runControl(target.dataset.control)
})

reset('coordinator-team')
