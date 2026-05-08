---
title: 实现快速开始
description: 构建最小 runtime-first Agent UI projection。
---

# 实现快速开始

本指南构建一个最小 Agent UI 实现。不需要独立 manifest。先从 event stream 和 UI projection store 开始。

## 1. 定义 event adapter

把你的 runtime events 归一化为 UI 使用的标准 event classes。

```ts
type AgentUiEvent =
  | { type: 'run.started'; sessionId: string; runId: string }
  | { type: 'run.status'; runId: string; stage: RuntimeStage; detail?: string }
  | { type: 'text.delta'; runId: string; messageId: string; delta: string }
  | { type: 'text.final'; runId: string; messageId: string; text: string }
  | { type: 'reasoning.delta'; runId: string; partId: string; delta: string }
  | { type: 'tool.started'; runId: string; toolCallId: string; name: string; inputSummary?: unknown }
  | { type: 'tool.result'; runId: string; toolCallId: string; status: 'ok' | 'error'; outputRef?: string }
  | { type: 'action.required'; runId: string; actionId: string; schema?: unknown; severity?: string }
  | { type: 'queue.changed'; sessionId: string; queued: QueuedTurnSummary[] }
  | { type: 'artifact.changed'; runId: string; artifactId: string; kind?: string; preview?: string }
  | { type: 'evidence.changed'; runId: string; evidenceId: string; status?: string }
  | { type: 'run.finished'; runId: string; outcome: 'success' | 'interrupt' | 'cancelled' }
  | { type: 'run.failed'; runId: string; error: string; retryable?: boolean }
```

从你的源协议做映射，但不要改变事实所有权。例如 lifecycle events、AI SDK UI message parts、Apps SDK tool outputs 和桌面 runtime events 都可以进入这个 adapter。

## 2. 创建 projection store

保持 facts 和 projection 分离。

```ts
type AgentUiProjection = {
  activeSessionId: string | null
  activeRunId: string | null
  messages: Record<string, ProjectedMessage>
  runs: Record<string, ProjectedRun>
  tools: Record<string, ProjectedToolCall>
  actions: Record<string, ProjectedActionRequest>
  queues: Record<string, QueuedTurnSummary[]>
  artifacts: Record<string, ProjectedArtifactRef>
  evidence: Record<string, ProjectedEvidenceRef>
  ui: {
    selectedTabId: string | null
    focusedArtifactId: string | null
    collapsedToolCallIds: string[]
    visibleMessageWindow: { cursor?: string; limit: number }
  }
}
```

`ui` state 只是 projection。它可以用 id 指向 facts，但不能成为 runtime status、artifact content、approval state 或 evidence verdict 的 owner。

## 3. 把 events reduce 成 message parts

```ts
function applyEvent(state: AgentUiProjection, event: AgentUiEvent) {
  switch (event.type) {
    case 'run.status':
      state.runs[event.runId].stage = event.stage
      state.runs[event.runId].statusDetail = event.detail
      return
    case 'text.delta':
      appendTextPartDelta(state.messages[event.messageId], event.delta)
      return
    case 'text.final':
      reconcileFinalText(state.messages[event.messageId], event.text)
      return
    case 'reasoning.delta':
      appendReasoningDelta(state.runs[event.runId], event.partId, event.delta)
      return
    case 'tool.started':
      state.tools[event.toolCallId] = { ...event, status: 'running' }
      return
    case 'tool.result':
      state.tools[event.toolCallId] = { ...state.tools[event.toolCallId], ...event }
      return
  }
}
```

关键不是 reducer 长什么样，而是分离：text 更新 text parts，reasoning 更新 process parts，tools 更新 tool UI，artifacts 更新 artifact references，final text 做 reconcile 而不是重复 append。

## 4. 渲染最小工作台

第一版有五个区域就够：

```text
AgentWorkbench
  SessionTabs
  ConversationPane
    MessageList
    MessageParts
  RuntimeStatusStrip
  Composer
  WorkbenchPane
    ArtifactCanvas
    EvidencePanel
```

先保持简单：

- Message list 渲染用户文本和助手最终文本。
- Runtime strip 展示 accepted、routing、preparing、streaming、retrying、cancelled、failed、completed。
- Tool calls 作为压缩 process rows 展示，可展开详情。
- Action requests 渲染为 approval/input cards，并有明确 submit / cancel 路径。
- Artifacts 打开到 workbench，不作为巨大聊天消息。

## 5. 连接受控动作

```ts
const actions = {
  sendPrompt: (draft: DraftInput) => runtime.submitTurn(draft),
  queueInput: (draft: DraftInput) => runtime.queueTurn(draft),
  steerRun: (runId: string, payload: SteeringInput) => runtime.steerRun(runId, payload),
  interrupt: (runId: string) => runtime.interruptRun(runId),
  respondAction: (actionId: string, response: unknown) => runtime.respondAction(actionId, response),
  saveArtifact: (artifactId: string, patch: unknown) => artifactService.save(artifactId, patch),
  exportEvidence: (runId: string) => evidenceService.export(runId)
}
```

在拥有 API 返回确认事实前，不要在 UI 里标记 approval、success、artifact save 或 evidence pass。

## 6. 增加旧会话恢复

旧 session 不要被 full detail 阻塞：

1. 立即显示 shell、tab、title 和 cached snapshot。
2. 用 bounded limit 拉取最近 messages。
3. 拉取 queue、pending action 和 runtime status summary。
4. Timeline/tool/artifact/evidence detail 在首屏 paint 后或用户展开时再加载。
5. 用 cursor 加载更早历史。

## 7. 验证行为

最小实现可接受的标准：

- Runtime 接受 run 后，首文本前出现 status。
- Tool call 显示在最终回答正文之外。
- Final event 不重复已流式输出的文本。
- Pending approval 阻塞进度，并通过受控 action response 恢复。
- 生成的 artifact 打开在 artifact surface。
- Evidence export 作为后台任务运行，并链接回同一 run/session。
- 打开旧 session 不等待完整 timeline 或所有 artifact content。
