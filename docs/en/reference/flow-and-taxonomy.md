---
title: Flow and taxonomy
description: Complete Agent UI lifecycle, classification, and team workbench reference.
---

# Flow and taxonomy

This page is the complete lifecycle and taxonomy reference for Agent UI. It uses a specification style: fields, constraints, lifecycle stages, surfaces, team-workbench rules, and validation cases are listed directly. Background research is tracked in [Source index](./source-index).

## Core contract

Agent UI is a projection protocol for agent workbenches. A compatible client consumes ordered runtime facts and projects them into user-visible surfaces without becoming the owner of those facts.

Compatible clients MUST:

- Preserve runtime event order for the active run.
- Keep final answer text separate from reasoning, tools, actions, artifacts, evidence, status, diagnostics, and team events.
- Keep running process visible while work is active; archive completed process into collapsed summaries by default.
- Preserve team ownership when the runtime exposes coordinators, teammates, child sessions, or remote agents.
- Route user writes through the owning runtime, policy, artifact, evidence, session, or team-control API.
- Render unknown or missing facts as `unknown`, `unavailable`, `stale`, or `blocked` instead of guessing from prose.
- Support progressive hydration for old sessions, child sessions, remote tasks, and long runs.

Compatible clients MUST NOT:

- Infer tool success, permission grants, artifact kind, evidence verdicts, approval state, or teammate completion from assistant prose.
- Duplicate the same runtime fact as both expanded inline process and expanded timeline detail on the same screen.
- Append final completion text after already streamed text without reconciliation.
- Treat UI collapse state, selected tab, active pane, or local draft as runtime truth.
- Treat internal worker notifications as real user messages, even if a source transport delivers them through a user-role channel.
- Collapse all workers into one anonymous assistant when the runtime exposes agent, task, thread, or team identity.

## Lifecycle overview

The canonical flow is:

```text
session/thread open
  -> composer draft
  -> listener bind
  -> submit or queue or steer
  -> run accepted
  -> active turn stream
  -> tool/action/team loop
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
| `sequence` | Recommended | Monotonic within a run, thread, task, or child-agent stream. | Preserves active-run order and repair. |
| `timestamp` | Recommended | Producer timestamp when available. | Timeline, latency, replay. |
| `sessionId` | Recommended | Stable id. | Session and tab projection. |
| `threadId` | Recommended | Stable id when different from session. | Conversation recovery and branching. |
| `runId` | Recommended | Stable id for active work. | Runtime status and cancellation. |
| `turnId` | Recommended | Stable id for user turn or model turn. | Message/process grouping. |
| `messageId` | Conditional | Required for message parts. | Text reconciliation. |
| `partId` | Conditional | Required for ordered message parts when available. | Interleaved rendering. |
| `taskId` | Conditional | Required for background tasks, work items, or subagent tasks. | Task capsules, work board, task center. |
| `agentId` | Conditional | Required when the fact belongs to a child agent, teammate, or remote agent. | Team roster, delegation graph, transcript zoom. |
| `parentSessionId` | Conditional | Required for child sessions when available. | Parent/child lineage and hydration. |
| `parentThreadId` | Conditional | Required for child threads when available. | Delegation graph and replay. |
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
| `topology` | Optional | One of the team topology values below. | Explains how work is organized. |
| `payload` | Optional | Structured data. | Producer-owned fact body. |
| `refs` | Optional | Array or map of ids/refs. | Link to artifact, evidence, transcript, files, or raw diagnostics. |
| `rawEventRef` | Optional | Safe reference, not raw secret-bearing payload. | Debug and replay without polluting UI. |

Minimal example:

```json
{
  "type": "agent.spawned",
  "sequence": 42,
  "sessionId": "session-lead",
  "threadId": "thread-lead",
  "taskId": "task-research",
  "agentId": "researcher@delivery-team",
  "parentSessionId": "session-lead",
  "parentThreadId": "thread-lead",
  "owner": "agent",
  "scope": "agent",
  "phase": "acting",
  "surface": "team_roster",
  "persistence": "snapshot",
  "topology": "coordinator_team",
  "payload": {
    "agentName": "researcher",
    "teamName": "delivery-team",
    "role": "researcher",
    "status": "running"
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
| `task` | Task scheduler, work-board service, or subagent runtime. | Queue item, background teammate, work item, subagent task. |
| `agent` | Agent runtime, team runtime, or remote-agent adapter. | Teammate identity, availability, handoff, transcript refs. |
| `session` | Session/history service. | Thread metadata, hydration cursor, stale state. |
| `diagnostics` | Runtime or client diagnostics channel. | Non-user-facing debug and performance records. |
| `ui_projection` | Client UI controller only. | Collapse state, focused tab, local draft, selected artifact. |

### Scope

`scope` describes the smallest stable entity affected by the fact.

| Scope | Use when |
| --- | --- |
| `application` | Global health, provider availability, or account state. |
| `workspace` | Workspace-local context, policy, or artifact store state. |
| `team` | A named team, roster, team preset, or team memory boundary. |
| `session` | A chat session, task session, or app tab. |
| `thread` | A conversation thread that can be resumed or branched. |
| `run` | One runtime execution boundary. |
| `turn` | One user turn or model turn inside a thread. |
| `message` | One user, assistant, system, tool, or notification message. |
| `part` | One ordered message part. |
| `task` | A queue item, work item, background job, or subagent task. |
| `agent` | A child agent, collaborator, teammate, or remote agent. |
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
| `routing` | Runtime is selecting model, mode, tool surface, worker, or teammate. | `run.status`, `task.changed`, `team.changed`. |
| `preparing` | Runtime is assembling context or request. | `run.status`, `context.changed`. |
| `planning` | Agent is producing or updating a plan. | `plan.delta`, `plan.final`. |
| `reasoning` | Reasoning/thinking is being produced. | `reasoning.delta`, `reasoning.summary`. |
| `acting` | Tool, command, browser, workflow, teammate, or subagent is running. | `tool.*`, `task.changed`, `agent.changed`. |
| `waiting` | Runtime is blocked on user, permission, dependency, teammate, or queue. | `action.required`, `queue.changed`, `run.status`, `agent.changed`. |
| `reviewing` | Reviewer or verifier is checking an outcome. | `review.requested`, `review.completed`, `evidence.changed`. |
| `producing` | Final text, artifact, or evidence is being produced. | `text.delta`, `artifact.*`, `evidence.changed`. |
| `reconciling` | Streamed and final facts are being reconciled. | `text.final`, `messages.snapshot`. |
| `completed` | Owning system reported success. | `run.finished`, `tool.result`, `agent.completed`. |
| `failed` | Owning system reported failure. | `run.failed`, `tool.failed`, `artifact.failed`, `agent.completed`. |
| `cancelled` | User or runtime cancelled work. | `run.finished`, `task.changed`. |
| `interrupted` | Work stopped and may resume from a bookmark. | `run.finished`, `state.snapshot`, `agent.handoff`. |
| `archived` | Completed detail is now represented by timeline summaries. | `messages.snapshot`, `evidence.changed`, `worker.notification`. |
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
| `team_roster` | Human and agent teammates, role, source, capability, status, model, policy. |
| `work_board` | Human/agent work items, assignee, priority, blocker, progress, dependency. |
| `delegation_graph` | Parent/child tasks, coordinator-worker fanout, wait edges, handoff edges. |
| `handoff_lane` | Active owner transfer, handoff reason, resume target, memory boundary. |
| `worker_notifications` | Completed/failed/killed worker summaries, result refs, usage, duration. |
| `review_lane` | Reviewer/verifier verdicts, evidence links, requested fixes. |
| `teammate_transcript` | Zoomed teammate conversation, recent messages, tool activity, pending input. |
| `background_teammate` | Scheduled or triggered background agent as a teammate: wake reason, run record, sleep state. |
| `remote_teammate` | Remote agent card/capability, task status, input/auth needs, messages, artifacts. |
| `team_policy` | Per-teammate permission, approval, sandbox, plan mode, budget, and termination controls. |

### Persistence

| Persistence | Meaning |
| --- | --- |
| `ephemeral_live` | Useful only while the run is active. |
| `transcript` | Rehydrates as part of conversation history. |
| `snapshot` | Stored as bounded recent state or session summary. |
| `archive` | Stored as timeline/process/team history. |
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
| `delegate` | Runtime or team-control API that creates a teammate/subagent/remote task. |
| `assign` | Work-board or team-control API. |
| `continue_agent` | Runtime/team API that sends input to an existing teammate. |
| `wait` | Runtime/team API that waits for one or more teammates. |
| `stop` | Runtime/team API that stops a running teammate or task. |
| `close` | Runtime/team API that closes or archives a teammate. |
| `request_review` | Review/evidence service or runtime review API. |
| `approve` / `reject` | Runtime or policy action response API. |
| `answer` | Runtime action response API for structured input. |
| `edit` | Artifact service or runtime action API. |
| `retry` | Runtime retry, tool retry, artifact retry, or teammate retry API. |
| `rollback` | Artifact or session history API. |
| `export` | Artifact or evidence export API. |
| `open_detail` | Read-only session, artifact, evidence, transcript, or diagnostics API. |

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
| `task.changed` | Background task, subagent, work item, or team task changed. |
| `agent.changed` | Child agent, teammate, collaborator, or remote-agent status changed. |
| `agent.spawned` / `agent.completed` | Teammate/worker/remote collaborator started or returned. |
| `agent.handoff` | Active agent or task owner changed with an explicit reason and resume target. |
| `team.changed` | Team roster, selected team, work board, team memory, or team policy changed. |
| `worker.notification` | Worker result, failure, kill, usage, or summary notification arrived. |
| `review.requested` / `review.completed` | Reviewer/verifier request or verdict changed. |
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
| `agent_task` | `task` | `task_capsule` or `work_board` | Subagent/team/background job summary. |
| `agent_roster` | `agent` | `team_roster` | Teammates, roles, status, and capability boundaries. |
| `agent_handoff` | `agent` | `handoff_lane` or `delegation_graph` | Active-agent transfer without rewriting transcript authorship. |
| `worker_notification` | `agent` or `task` | `worker_notifications` or `timeline_evidence` | Internal worker result; not a user message and not final prose. |
| `remote_agent_status` | `agent` or `task` | `remote_teammate` | Remote task, input/auth need, artifact update, or terminal state. |
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
| `teammate_plan_decision` | `agent` or `runtime` | Identify requesting teammate and route response to that teammate, not the parent conversation. |
| `structured_input` | `action` | Form or options with stable schema and request id. |
| `clarification` | `runtime` | Answer prompt without pretending the run finished. |
| `permission_grant` | `policy` | Time/scope-limited permission state after runtime confirmation. |
| `delegated_permission` | `policy` or `runtime` | Approval card must show the delegated teammate/subagent that requested it. |
| `credential_request` | `policy` or secret store | Never expose secret values in message text or diagnostics. |
| `artifact_review` | `artifact` or `evidence` | Review diff, version, export, or handoff result. |

The UI MUST mark an action resolved only after the owning runtime or policy system confirms the resolution.

## Task and multi-agent taxonomy

Agent UI SHOULD classify long-running and multi-agent work separately from the conversation transcript.

| Item | Scope | Default surface | Status values |
| --- | --- | --- | --- |
| Queued turn | `task` | `task_capsule` | `queued`, `promoted`, `removed`, `started`. |
| Work item | `task` | `work_board` | `open`, `claimed`, `running`, `blocked`, `reviewing`, `done`. |
| Background job | `task` | `task_capsule` or `background_teammate` | `scheduled`, `sleeping`, `waking`, `running`, `blocked`, `paused`, `failed`, `completed`. |
| Teammate/subagent | `agent` | `team_roster`, `task_capsule`, or `session_tabs` | `spawning`, `running`, `waiting`, `needs_input`, `plan_ready`, `idle`, `failed`, `completed`, `killed`, `closed`. |
| Coordinator team | `team` or `agent` | `team_roster`, `delegation_graph`, `worker_notifications` | `forming`, `active`, `waiting`, `merging`, `done`. |
| Specialist handoff | `agent` | `handoff_lane` or `delegation_graph` | `handoff_requested`, `accepted`, `active`, `returned`, `resumed`. |
| Review teammate | `agent` or `evidence` | `review_lane` | `requested`, `reviewing`, `passed`, `changes_requested`, `failed`. |
| Human/agent board | `task` or `team` | `work_board` | `assigned`, `claimed`, `blocked`, `commented`, `done`. |
| Remote teammate task | `task` or `agent` | `remote_teammate` | `submitted`, `working`, `input_required`, `auth_required`, `completed`, `failed`, `canceled`, `rejected`. |

Conversation text may mention a task outcome, but task status itself belongs to task/runtime facts. Multi-agent status MUST NOT be flattened into a single assistant author if the source runtime exposes agent/task ownership.

## Runtime execution alignment

Agent UI does not require every runtime to use the same internal taxonomy. It does require the UI projection to avoid inventing extra execution categories when the runtime already exposes a smaller set of durable entities. A compatible adapter SHOULD map runtime entities as follows:

| Runtime entity | Agent UI mapping | Required fields | UI rule |
| --- | --- | --- | --- |
| Foreground agent turn | `run.*`, `queue.changed`, `task.changed` with `runtimeEntity=agent_turn`. | `sessionId`, `threadId`, `turnId` or `runId`, `runtimeStatus`, optional `queuedTurnCount`. | Show in runtime status, composer queue, and task capsule; do not create a separate teammate. |
| Child subagent or teammate turn | `agent.spawned`, `agent.changed`, `task.changed`, `team.changed` with `runtimeEntity=subagent_turn`. | `agentId`, `agentName`, `parentSessionId`, optional `parentThreadId`, `teamName`, `runtimeStatus`, `latestTurnStatus`. | Show as a teammate/child session with lineage; preserve coordinator-worker separation. |
| Durable automation job | `task.changed` and, when agent-owned, `agent.changed` with `runtimeEntity=automation_job`. | `taskId`, schedule or wake reason, `runtimeStatus`, last run ref, optional `agentId`. | Show as background teammate or task capsule; do not create a fourth local runtime taxonomy. |
| Remote protocol task | `agent.changed`, `task.changed`, `artifact.changed`, `action.required` with `runtimeEntity=external_task`. | `agentId`, `remoteTaskId`, remote capability/card ref, `runtimeStatus`, input/auth needs. | Preserve remote truth while projecting into `remote_teammate`. |
| Board work item | `task.changed` or `team.changed` with `runtimeEntity=work_item`. | `workItemId`, owner/assignee, status, blocker, artifact/evidence refs. | Show in `work_board`; assignment writes through board/team APIs, not runtime status hacks. |

Adapters SHOULD preserve queue and parallelism facts such as `teamPhase`, `teamParallelBudget`, `teamActiveCount`, `teamQueuedCount`, `providerConcurrencyGroup`, `providerParallelBudget`, `queueReason`, and `retryableOverload` when the runtime provides them.

## Team topology taxonomy

Agent UI SHOULD describe the topology that produced the work, because different topologies require different control surfaces. The primary metaphor is a team/workbench: teammates coordinate work, hand off ownership, request review, and preserve evidence. Hierarchy-first metaphors are implementation-specific and are not a required Agent UI topology.

| Topology | Required UI projection | Typical facts |
| --- | --- | --- |
| `solo_run` | One active run with process, tools, artifacts, and evidence. | `run.*`, `tool.*`, `artifact.*`. |
| `coordinator_team` | Coordinator plus roster, worker tasks, worker result notifications, and synthesis boundary. | `team.changed`, `agent.spawned`, `worker.notification`. |
| `parallel_workers` | Fanout/fanin graph, per-worker state, wait controls, partial failures, merge/retry controls. | `agent.spawned`, `task.changed`, `worker.notification`, `agent.completed`. |
| `specialist_handoff` | Active owner indicator, handoff reason, resume target, memory/context boundary. | `agent.handoff`, `agent.changed`, `messages.snapshot`. |
| `review_team` | Reviewer/verifier lane, verdicts, evidence links, requested fixes. | `review.requested`, `review.completed`, `evidence.changed`. |
| `human_agent_board` | Board of human and agent assignees with comments, blockers, claims, progress. | `team.changed`, `task.changed`, `state.delta`. |
| `background_teammate` | Wake reason, schedule, background run record, pause/resume, sleep state. | `task.changed`, `agent.changed`, `evidence.changed`. |
| `remote_teammate` | Remote Agent Card/capability, task lifecycle, input/auth required, messages, artifacts. | `agent.changed`, `task.changed`, `artifact.changed`, `action.required`. |

Topology is metadata about how work is organized. It does not replace `owner`, `scope`, `phase`, `surface`, or `persistence`.

## Team workbench contract

A compatible team workbench SHOULD project these facts when the runtime exposes them:

| Fact | Required fields | UI rule |
| --- | --- | --- |
| Teammate identity | `agentId`, `agentName`, `teamName`, role/source, optional color/avatar, model, policy. | Show in `team_roster`; do not merge into anonymous assistant. |
| Parent/child lineage | `parentSessionId`, `parentThreadId`, child `sessionId`/`threadId`, `taskId`, spawn reason. | Preserve in `delegation_graph`, history, evidence, and replay. |
| Worker notification | `taskId`, `agentId`, status, summary, result ref, optional usage/duration/tool count. | Show in `worker_notifications`; it may be archived, but must not masquerade as user speech. |
| Teammate status | `runtimeStatus`, `latestTurnStatus`, queue counts, plus `needs_input`, `plan_ready`, `idle`, `shutdown_requested`, `closed` when available. | Promote `needs_input` and `plan_ready` above normal running state; show queue/parallel limits without treating them as failure. |
| Teammate transcript | Transcript ref or bounded recent messages, tool activity, pending input queue. | Open on demand in `teammate_transcript`; keep bounded for performance. |
| Work board item | Title, assignee, status, blocker, priority, dependencies, artifact/evidence refs. | Show in `work_board`; user assignment writes through board/team API. |
| Handoff | From, to, reason, resume target, memory/context boundary, accepted time. | Show in `handoff_lane`; do not rewrite past message authorship. |
| Review verdict | Reviewer, target, verdict, evidence refs, requested fixes. | Show in `review_lane`; final answer may summarize, but verdict belongs to evidence/review facts. |
| Delegated approval | Action id, requesting teammate, policy scope, safe input, parent routing. | Approval card must identify the requesting teammate/subagent. |
| Remote teammate | Agent Card/capability ref, remote task id, status, messages, artifact updates, auth/input needs. | Map into `remote_teammate`; do not treat one idle tick as terminal completion. |
| Background teammate | Schedule/wake trigger, current run, last run record, pause/terminate controls. | Show as teammate-owned background work, not as a separate hierarchy. |

Coordinator synthesis and worker results are different facts. The coordinator may summarize worker output for the user, but the worker result, usage, and transcript refs remain available as task/agent/evidence facts.

## Context, memory, and compaction taxonomy

| Fact | Owner | UI rule |
| --- | --- | --- |
| Context reference | `context` | Show as context chip, source ref, or tool/detail link. |
| Context budget | `context` | Show low-noise budget meter or warning. |
| Missing context | `context` | Show `blocked` or `unknown`; do not fabricate availability. |
| Retrieval result | `context` or `tool` | Keep source ids/citations separate from final text. |
| Memory write | `context` | Show only if user-visible policy requires it. |
| Team memory | `context` or `team` | Show repo/team scoped memory refs; redact secrets; keep explicit conflict precedence. |
| Compaction boundary | `context` | Show compact boundary or summary; preserve resume metadata. |

## Permission and security taxonomy

| Fact | Owner | UI rule |
| --- | --- | --- |
| Risk level | `policy` | Show when it affects user control or required approval. |
| Sandbox/access mode | `policy` | Show active constraints and escalation requests. |
| Per-teammate permission mode | `policy` or `agent` | Show when teammate permissions differ from coordinator permissions. |
| Approval state | `policy` or `runtime` | Never infer from prose; require action confirmation. |
| Delegated approval source | `policy` or `runtime` | Preserve the teammate/subagent that triggered the approval. |
| Secret-bearing payload | `policy` or secret store | Do not persist in projection state. Use refs/redaction. |
| Retention/waiver | `policy` | Show only durable policy facts or evidence refs. |

## Hydration and repair

A compatible client SHOULD hydrate in this order:

1. Render shell, tab, title, and lightweight snapshot.
2. Apply recent message window.
3. Apply current run status, queue, pending action, task summary, and team summary.
4. Apply compact process/timeline/artifact/evidence/team references.
5. Load teammate transcripts, full tool output, artifact body, evidence payload, remote task details, and older history on demand.

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
11. Multi-agent and background tasks use task/agent/team facts, not assistant prose.
12. Team topology is visible when the runtime exposes coordinator, worker, handoff, board, background, review, or remote-agent facts.
13. Worker notifications are distinguishable from real user messages and coordinator final text.
14. Parent/child session/thread/task ids survive hydration, replay, evidence export, and transcript zoom.
15. Delegated approvals identify the teammate/subagent that requested the action.
16. Context and compaction are surfaced as facts or boundaries, not hidden text mutations.
17. Missing facts render honest fallback states.
18. Old sessions hydrate progressively and safely ignore stale results.
19. Diagnostics and metrics stay outside normal conversation text.
