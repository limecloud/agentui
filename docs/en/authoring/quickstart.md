---
title: Implementation quickstart
description: Build the smallest runtime-first Agent UI projection.
---

# Implementation quickstart

This guide builds a minimal Agent UI implementation. There is no required standalone manifest. Start with the event stream and the UI projection store.

## 1. Define the event adapter

Normalize your runtime events into the standard event classes used by the UI.

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

Map from your source protocol without changing its ownership. For example, lifecycle events, AI SDK UI message parts, Apps SDK tool outputs, and desktop runtime events can all feed this adapter.

## 2. Create a projection store

Keep facts and projection separate.

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

`ui` state is projection-only. It may point at facts by id, but it must not become the owner of runtime status, artifact content, approval state, or evidence verdicts.

## 3. Reduce events into message parts

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

The important rule is not the exact reducer shape. The important rule is separation: text updates text parts, reasoning updates process parts, tools update tool UI, artifacts update artifact references, and final text reconciles instead of appending duplicate output.

## 4. Render the minimum workbench

A useful first version has five visible regions:

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

Start simple:

- Message list renders user text and final assistant text.
- Runtime strip shows accepted, routing, preparing, streaming, retrying, cancelled, failed, and completed.
- Tool calls appear as compressed process rows with detail expansion.
- Action requests render as approval/input cards with explicit submit and cancel paths.
- Artifacts open in the workbench, not as giant chat messages.

## 5. Wire controlled actions

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

Do not mark approval, success, artifact save, or evidence pass in the UI until the owning API returns a fact confirming it.

## 6. Add old-session hydration

For old sessions, avoid full-detail blocking:

1. Show shell, tab, title, and cached snapshot immediately.
2. Fetch recent messages with a bounded limit.
3. Fetch queue, pending action, and runtime status summary.
4. Load timeline/tool/artifact/evidence detail only after paint or user expansion.
5. Use a cursor for older history.

## 7. Verify behavior

A minimal implementation is acceptable when:

- Status appears before first text when the runtime has accepted the run.
- A tool call is visible outside final answer text.
- A final event does not duplicate streamed text.
- A pending approval blocks progress and resumes through a controlled action response.
- A generated artifact opens in the artifact surface.
- Evidence export runs as background work and links back to the same run/session.
- Opening an old session does not wait for full timeline or all artifact contents.
