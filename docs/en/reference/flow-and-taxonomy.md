---
title: Flow and taxonomy
description: Complete Agent UI lifecycle and classification reference.
---

# Flow and taxonomy

This page is the complete lifecycle and taxonomy reference for Agent UI. It uses a specification style: fields, constraints, lifecycle stages, and validation cases are listed directly. Background research is tracked in [Source index](./source-index).

## Core contract

Agent UI is a projection protocol for agent workbenches. A compatible client consumes ordered runtime facts and projects them into user-visible surfaces without becoming the owner of those facts.

Compatible clients MUST:

- Preserve runtime event order for the active run.
- Keep final answer text separate from reasoning, tools, actions, artifacts, evidence, status, and diagnostics.
- Keep running process visible while work is active; archive completed process into collapsed summaries by default.
- Route user writes through the owning runtime, policy, artifact, evidence, or session API.
- Render unknown or missing facts as `unknown`, `unavailable`, `stale`, or `blocked` instead of guessing from prose.
- Support progressive hydration for old sessions and long runs.

Compatible clients MUST NOT:

- Infer tool success, permission grants, artifact kind, evidence verdicts, or approval state from assistant prose.
- Duplicate the same runtime fact as both expanded inline process and expanded timeline detail on the same screen.
- Append final completion text after already streamed text without reconciliation.
- Treat UI collapse state, selected tab, or local draft as runtime truth.

## Lifecycle overview

The canonical flow is:

```text
session/thread open
  -> composer draft
  -> listener bind
  -> submit or queue or steer
  -> run accepted
  -> active turn stream
  -> tool/action loop
  -> answer/artifact/evidence production
  -> final reconciliation
  -> timeline archive
  -> hydration/repair/replay
```

The flow applies to web apps, IDEs, desktop apps, terminals, and embedded assistants. The visual layout may differ; the projection rules do not.

## Event envelope

Agent UI event adapters SHOULD normalize source events into an envelope with these fields. The public JSON schema is intentionally permissive so products can add fields, but these names are the portable classification layer.

| Field | Required | Constraints | Purpose |
| --- | --- | --- | --- |
| `type` | Yes | String event class. | Drives reducer behavior. |
| `sequence` | Recommended | Monotonic within a run or thread stream. | Preserves active-run order and repair. |
| `timestamp` | Recommended | Producer timestamp when available. | Timeline, latency, replay. |
| `sessionId` | Recommended | Stable id. | Session and tab projection. |
| `threadId` | Recommended | Stable id when different from session. | Conversation recovery and branching. |
| `runId` | Recommended | Stable id for active work. | Runtime status and cancellation. |
| `turnId` | Recommended | Stable id for user turn or model turn. | Message/process grouping. |
| `messageId` | Conditional | Required for message parts. | Text reconciliation. |
| `partId` | Conditional | Required for ordered message parts when available. | Interleaved rendering. |
| `taskId` | Conditional | Required for background tasks or subagents. | Task capsules and task center. |
| `toolCallId` | Conditional | Required for tool lifecycle events. | Tool state and progress. |
| `actionId` | Conditional | Required for human-in-the-loop events. | Approval/input resolution. |
| `artifactId` | Conditional | Required for artifact events. | Artifact workspace routing. |
| `evidenceId` | Conditional | Required for evidence events. | Evidence/replay/review routing. |
| `owner` | Recommended | One of the fact owner values below. | Prevents UI ownership drift. |
| `scope` | Recommended | One of the scope values below. | Defines blast radius and persistence. |
| `phase` | Recommended | One of the phase values below. | Drives status and grouping. |
| `surface` | Optional | Primary intended surface. | Rendering hint, not fact owner. |
| `persistence` | Optional | One of the persistence values below. | Hydration and retention hint. |
| `control` | Optional | User action connected to the fact. | Controlled write mapping. |
| `payload` | Optional | Structured data. | Producer-owned fact body. |
| `refs` | Optional | Array or map of ids/refs. | Link to artifact, evidence, files, or raw diagnostics. |
| `rawEventRef` | Optional | Safe reference, not raw secret-bearing payload. | Debug and replay without polluting UI. |

Minimal example:

```json
{
  "type": "tool.progress",
  "sequence": 42,
  "sessionId": "session-1",
  "threadId": "thread-1",
  "runId": "run-1",
  "turnId": "turn-1",
  "messageId": "assistant-1",
  "partId": "part-tool-1",
  "toolCallId": "tool-1",
  "owner": "tool",
  "scope": "tool_call",
  "phase": "acting",
  "surface": "tool_ui",
  "persistence": "ephemeral_live",
  "payload": {
    "label": "Searching",
    "progress": 0.4
  }
}
```

## Taxonomy dimensions

### Fact owner

`owner` describes who writes the fact. UI projection may render the fact but must not become its writer.

| Owner | Writer | Examples |
| --- | --- | --- |
| `runtime` | Agent runtime or protocol adapter. | Run lifecycle, queue, interrupts, final outcome. |
| `model` | Model response adapter. | Text deltas, reasoning summaries, tool call requests. |
| `tool` | Tool runtime or tool adapter. | Tool input, progress, output, errors. |
| `action` | Runtime or policy action manager. | Approval requests, structured user input, plan decisions. |
| `artifact` | Artifact service. | Artifact id, preview, version, diff, export state. |
| `evidence` | Evidence, review, or replay service. | Citations, traces, verdicts, replay ids, review decisions. |
| `context` | Context, memory, or retrieval service. | Context refs, budgets, missing context, compaction. |
| `policy` | Policy, permission, sandbox, or security service. | Risk, permission mode, sandbox, waiver, retention. |
| `task` | Task scheduler or subagent runtime. | Background job, subagent, team task, queue item. |
| `session` | Session/history service. | Thread metadata, hydration cursor, stale state. |
| `diagnostics` | Runtime or client diagnostics channel. | Non-user-facing debug and performance records. |
| `ui_projection` | Client UI controller only. | Collapse state, focused tab, local draft, selected artifact. |

### Scope

`scope` describes the smallest stable entity affected by the fact.

| Scope | Use when |
| --- | --- |
| `application` | Global health, provider availability, or account state. |
| `workspace` | Workspace-local context, policy, or artifact store state. |
| `session` | A chat session, task session, or app tab. |
| `thread` | A conversation thread that can be resumed or branched. |
| `run` | One runtime execution boundary. |
| `turn` | One user turn or model turn inside a thread. |
| `message` | One user, assistant, system, or tool message. |
| `part` | One ordered message part. |
| `task` | A queue item, background job, or subagent task. |
| `agent` | A child agent, collaborator, or team member. |
| `tool_call` | One tool invocation. |
| `action_request` | One human-in-the-loop request. |
| `artifact` | One durable deliverable. |
| `evidence` | One evidence, trace, replay, review, or citation entity. |

### Phase

`phase` describes where the fact belongs in the run lifecycle.

| Phase | Meaning | Typical events |
| --- | --- | --- |
| `draft` | User is composing local input. | `state.delta` for persisted draft only. |
| `submitted` | UI has submitted or queued input. | `run.started`, `queue.changed`. |
| `accepted` | Runtime accepted work. | `run.status`. |
| `routing` | Runtime is selecting model, mode, tool surface, or worker. | `run.status`, `task.changed`. |
| `preparing` | Runtime is assembling context or request. | `run.status`, `context.changed`. |
| `planning` | Agent is producing or updating a plan. | `plan.delta`, `plan.final`. |
| `reasoning` | Reasoning/thinking is being produced. | `reasoning.delta`, `reasoning.summary`. |
| `acting` | Tool, command, browser, workflow, or subagent is running. | `tool.*`, `task.changed`, `agent.changed`. |
| `waiting` | Runtime is blocked on user, permission, dependency, or queue. | `action.required`, `queue.changed`, `run.status`. |
| `producing` | Final text, artifact, or evidence is being produced. | `text.delta`, `artifact.*`, `evidence.changed`. |
| `reconciling` | Streamed and final facts are being reconciled. | `text.final`, `messages.snapshot`. |
| `completed` | Owning system reported success. | `run.finished`, `tool.result`. |
| `failed` | Owning system reported failure. | `run.failed`, `tool.failed`, `artifact.failed`. |
| `cancelled` | User or runtime cancelled work. | `run.finished`, `task.changed`. |
| `interrupted` | Work stopped and may resume from a bookmark. | `run.finished`, `state.snapshot`. |
| `archived` | Completed detail is now represented by timeline summaries. | `messages.snapshot`, `evidence.changed`. |
| `hydrating` | Client is restoring state from snapshots/history. | `session.hydrated`, `messages.snapshot`. |

### Surface

`surface` is a rendering destination, not an owner.

| Surface | Responsibility |
| --- | --- |
| `composer` | Draft, attachments, context chips, mode, queue/steer intent. |
| `conversation` | User messages and final assistant answer text. |
| `inline_process` | Active-run reasoning, tool progress, actions, and status in event order. |
| `runtime_status` | Accepted/routing/preparing/streaming/blocked/retrying/failed/done status. |
| `tool_ui` | Tool input summary, live progress, output preview, detail link. |
| `hitl` | Approval, reject, edit, answer, or structured input controls. |
| `task_capsule` | Running, queued, failed, needs-input, subagent, team, and background jobs. |
| `artifact_workspace` | Artifact preview, edit/canvas, version, diff, export, handoff. |
| `timeline_evidence` | Process archive, citations, verification, replay, review, audit. |
| `session_tabs` | Active, pinned, stale, unread, hydrated, running sessions. |
| `diagnostics` | Debug payloads, performance metrics, raw event refs. |

### Persistence

| Persistence | Meaning |
| --- | --- |
| `ephemeral_live` | Useful only while the run is active. |
| `transcript` | Rehydrates as part of conversation history. |
| `snapshot` | Stored as bounded recent state or session summary. |
| `archive` | Stored as timeline/process history. |
| `artifact_store` | Stored by artifact service. |
| `evidence_pack` | Stored by evidence/replay/review service. |
| `diagnostics_log` | Stored for debug or performance analysis only. |
| `ui_local` | Client-only local state. |

### User control

| Control | Required write boundary |
| --- | --- |
| `send` | Runtime submit API. |
| `queue` | Runtime queue API. |
| `steer` | Runtime steer/resume API. |
| `interrupt` | Runtime interrupt API. |
| `approve` / `reject` | Runtime or policy action response API. |
| `answer` | Runtime action response API for structured input. |
| `edit` | Artifact service or runtime action API. |
| `retry` | Runtime retry, tool retry, or artifact retry API. |
| `rollback` | Artifact or session history API. |
| `export` | Artifact or evidence export API. |
| `open_detail` | Read-only session, artifact, evidence, or diagnostics API. |

## Standard event classes

The event class list is open to extension. These classes are the portable baseline.

| Class | Purpose |
| --- | --- |
| `session.opened` | Client or runtime established a session/thread surface. |
| `session.hydrated` | Snapshot or history window has been applied. |
| `session.updated` | Title, status, unread, pinned, stale, or cursor changed. |
| `session.closed` | Session/tab closed or frozen by UI. |
| `run.started` | Runtime execution boundary started or was accepted. |
| `run.status` | Runtime status phase changed. |
| `run.finished` | Runtime finished with success, cancellation, or interrupt. |
| `run.failed` | Runtime failed and may expose retryability/diagnostics. |
| `plan.delta` / `plan.final` | Plan text or structured plan changed. |
| `text.delta` / `text.final` | Assistant answer text streamed and reconciled. |
| `reasoning.delta` / `reasoning.summary` | Reasoning or thinking streamed or summarized outside final text. |
| `tool.started` | Tool call boundary established. |
| `tool.args` | Tool input became available or changed while streaming. |
| `tool.progress` | Tool progress or partial output reference changed. |
| `tool.output.delta` | Tool output streamed in a typed channel. |
| `tool.result` | Tool completed successfully with output or output reference. |
| `tool.failed` | Tool completed with an error. |
| `action.required` / `action.resolved` | Runtime paused for user or policy decision, then resumed. |
| `queue.changed` | Queued turns, steer state, or queue order changed. |
| `task.changed` | Background task, subagent, or team task changed. |
| `agent.changed` | Child agent/collaborator status changed. |
| `context.changed` | Context selection, budget, retrieval, or missing context changed. |
| `context.compaction.started` / `context.compaction.completed` | Memory/context compaction boundary. |
| `permission.changed` | Policy, sandbox, approval, waiver, or risk projection changed. |
| `artifact.created` / `artifact.updated` | Artifact was created or updated. |
| `artifact.preview.ready` | Artifact preview became available. |
| `artifact.version.created` / `artifact.diff.ready` | Artifact version or diff became available. |
| `artifact.export.started` / `artifact.export.completed` | Artifact export lifecycle. |
| `artifact.failed` / `artifact.deleted` | Artifact failure or deletion. |
| `artifact.changed` | Collapsed adapter event when specific artifact events are unavailable. |
| `evidence.changed` | Citation, trace, verification, replay, review, audit, or source map changed. |
| `state.snapshot` / `state.delta` | External application state or durable runtime state synced. |
| `messages.snapshot` | Message history window or repair snapshot synced. |
| `diagnostic.changed` | Safe diagnostics changed. |
| `metric.changed` | Performance or responsiveness metric changed. |

## Message part taxonomy

Message parts are ordered. A client SHOULD render active parts in arrival order and may archive completed process into a collapsed timeline.

| Part | Owner | Default surface | Rule |
| --- | --- | --- | --- |
| `user_text` | `session` or `runtime` | `conversation` | Show optimistically after submit and reconcile ids later. |
| `assistant_text` | `model` or `runtime` | `conversation` | Final answer only. |
| `reasoning_summary` | `model` or `runtime` | `inline_process` | Visible while running; collapsed after completion. |
| `reasoning_detail` | `model` or `runtime` | `inline_process` | Show only when provider policy and user setting allow it. |
| `plan` | `model` or `runtime` | `inline_process` or `hitl` | Use plan decision UI if approval is required. |
| `runtime_status` | `runtime` | `runtime_status` | Compact status, not prose. |
| `tool_call` | `model` or `tool` | `tool_ui` | Show safe input summary and running state. |
| `tool_result` | `tool` | `tool_ui` | Show preview/ref; load full output on demand. |
| `action_required` | `action` or `policy` | `hitl` | Explicit CTA with stable request id. |
| `artifact_ref` | `artifact` | `artifact_workspace` | Compact card in conversation/process; body in workspace. |
| `evidence_ref` | `evidence` | `timeline_evidence` | Citation/trace/review link only when backed by evidence facts. |
| `context_event` | `context` | `inline_process` or `diagnostics` | Budget, retrieval, missing context, or compaction summary. |
| `agent_task` | `task` | `task_capsule` | Subagent/team/background job summary. |
| `file_change` | `artifact` or `tool` | `artifact_workspace` or `timeline_evidence` | Diff/review surface, not final prose. |
| `error` | Owning system | `runtime_status`, `tool_ui`, or `task_capsule` | Recoverable diagnostic and next action. |
| `diagnostic` | `diagnostics` | `diagnostics` | Hidden by default from normal transcript. |

## Tool lifecycle

A tool call SHOULD progress through these states when the source protocol provides them.

| State | Event mapping | UI rule |
| --- | --- | --- |
| `input-streaming` | `tool.args` | Show partial safe input only if useful and non-sensitive. |
| `input-available` | `tool.args` | Show stable safe input summary. |
| `running` | `tool.started` or `tool.progress` | Keep visible and expanded while active. |
| `progress` | `tool.progress` or `tool.output.delta` | Update row, progress bar, preview, or partial output ref. |
| `output-available` | `tool.result` | Collapse to completed row with output preview/ref. |
| `output-error` | `tool.failed` | Show recoverable error row. |
| `cancelled` | `tool.failed` or `run.finished` with cancellation. | Show quiet cancellation unless action is needed. |

Large output MUST be offloaded to a detail ref or artifact/evidence ref. Raw secrets MUST be redacted before entering projection state.

## Human-in-the-loop taxonomy

| Action type | Owner | Required UI |
| --- | --- | --- |
| `tool_approval` | `policy` or `runtime` | Approve/reject with tool name, scope, risk, and safe input. |
| `plan_decision` | `runtime` | Accept, reject, or request edits to a proposed plan. |
| `structured_input` | `action` | Form or options with stable schema and request id. |
| `clarification` | `runtime` | Answer prompt without pretending the run finished. |
| `permission_grant` | `policy` | Time/scope-limited permission state after runtime confirmation. |
| `credential_request` | `policy` or secret store | Never expose secret values in message text or diagnostics. |
| `artifact_review` | `artifact` or `evidence` | Review diff, version, export, or handoff result. |

The UI MUST mark an action resolved only after the owning runtime or policy system confirms the resolution.

## Task and multi-agent taxonomy

Agent UI SHOULD classify long-running work separately from the conversation transcript.

| Item | Scope | Default surface | Status values |
| --- | --- | --- | --- |
| Queued turn | `task` | `task_capsule` | `queued`, `promoted`, `removed`, `started`. |
| Background job | `task` | `task_capsule` | `running`, `blocked`, `failed`, `completed`. |
| Subagent | `agent` | `task_capsule` or `session_tabs` | `spawning`, `running`, `waiting`, `failed`, `completed`. |
| Team/collaboration | `agent` | `task_capsule` or team panel | `invited`, `active`, `handed_off`, `done`. |
| Review mode | `task` or `evidence` | `timeline_evidence` | `entered`, `exited`, `decision_recorded`. |

Conversation text may mention a task outcome, but task status itself belongs to task/runtime facts.

## Context, memory, and compaction taxonomy

| Fact | Owner | UI rule |
| --- | --- | --- |
| Context reference | `context` | Show as context chip, source ref, or tool/detail link. |
| Context budget | `context` | Show low-noise budget meter or warning. |
| Missing context | `context` | Show `blocked` or `unknown`; do not fabricate availability. |
| Retrieval result | `context` or `tool` | Keep source ids/citations separate from final text. |
| Memory write | `context` | Show only if user-visible policy requires it. |
| Compaction boundary | `context` | Show compact boundary or summary; preserve resume metadata. |

## Permission and security taxonomy

| Fact | Owner | UI rule |
| --- | --- | --- |
| Risk level | `policy` | Show when it affects user control or required approval. |
| Sandbox/access mode | `policy` | Show active constraints and escalation requests. |
| Approval state | `policy` or `runtime` | Never infer from prose; require action confirmation. |
| Secret-bearing payload | `policy` or secret store | Do not persist in projection state. Use refs/redaction. |
| Retention/waiver | `policy` | Show only durable policy facts or evidence refs. |

## Hydration and repair

A compatible client SHOULD hydrate in this order:

1. Render shell, tab, title, and lightweight snapshot.
2. Apply recent message window.
3. Apply current run status, queue, pending action, and task summary.
4. Apply compact process/timeline/artifact/evidence references.
5. Load full tool output, artifact body, evidence payload, and older history on demand.

Hydration events MUST be stale-safe. If the user switches sessions, late hydration results must not overwrite the active view.

## Validation checklist

A compatible implementation SHOULD pass these checks:

1. Listener binding occurs before submit.
2. Runtime accepted/routing/preparing status can render before first text.
3. Active message parts render in event/part order.
4. Running reasoning and tools remain visible; completed process collapses into summaries.
5. Final answer text remains clean and is reconciled without duplication.
6. Tool input/progress/output/error state does not enter final answer text.
7. Human-in-the-loop actions use stable ids and controlled write APIs.
8. Queue and steer are visually and semantically distinct.
9. Artifact body lives in Artifact Workspace, not in the transcript by default.
10. Evidence, replay, review, and citations link to evidence facts.
11. Multi-agent and background tasks use task/agent facts, not assistant prose.
12. Context and compaction are surfaced as facts or boundaries, not hidden text mutations.
13. Missing facts render honest fallback states.
14. Old sessions hydrate progressively and safely ignore stale results.
15. Diagnostics and metrics stay outside normal conversation text.
