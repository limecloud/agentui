---
title: Runtime event projection contract
description: Mapping runtime events and facts into Agent UI projection state.
---

# Runtime event projection contract

Agent UI clients consume structured runtime facts and project them into surfaces. They must not parse ordinary prose to infer state.

For the complete event envelope and taxonomy, see [Flow and taxonomy](../reference/flow-and-taxonomy). For source traceability, see [Source index](../reference/source-index).

## Adapter boundary

Create one adapter layer between the source protocol and UI components.

The adapter MUST:

- Normalize source events into Agent UI event classes.
- Preserve per-run or per-thread order with `sequence` when the source provides order.
- Attach stable ids: `sessionId`, `threadId`, `runId`, `turnId`, `messageId`, `partId`, `toolCallId`, `actionId`, `artifactId`, and `evidenceId` when available.
- Classify events with `owner`, `scope`, `phase`, `surface`, and `persistence` when the source contains enough information.
- Keep raw or secret-bearing payloads out of normal projection state; store only safe summaries or refs.

The adapter SHOULD NOT spread provider-specific parsing into message, tool, artifact, or timeline components.

## Event class mapping

| Source idea | Agent UI class |
| --- | --- |
| Session or thread metadata created/changed | `session.opened`, `session.updated`, `session.hydrated` |
| Run or turn lifecycle start | `run.started` |
| Runtime status or stage update | `run.status` |
| Plan stream or plan complete | `plan.delta`, `plan.final` |
| Assistant answer text stream/final | `text.delta`, `text.final` |
| Reasoning/thinking stream or summary | `reasoning.delta`, `reasoning.summary` |
| Tool call start/input/progress/output/error | `tool.started`, `tool.args`, `tool.progress`, `tool.output.delta`, `tool.result`, `tool.failed` |
| Approval, interrupt, elicitation, structured input | `action.required`, `action.resolved` |
| Queue item or steer state | `queue.changed` |
| Background job, subagent, team member | `task.changed`, `agent.changed` |
| Context selection, retrieval, budget, missing context | `context.changed` |
| Memory/context compaction | `context.compaction.started`, `context.compaction.completed` |
| Permission, sandbox, policy, risk state | `permission.changed` |
| Artifact lifecycle | `artifact.created`, `artifact.updated`, `artifact.preview.ready`, `artifact.version.created`, `artifact.diff.ready`, `artifact.export.started`, `artifact.export.completed`, `artifact.failed`, `artifact.deleted`, `artifact.changed` |
| Citation, trace, review, replay, verification | `evidence.changed` |
| Durable app or runtime state | `state.snapshot`, `state.delta` |
| Message history repair or hydration window | `messages.snapshot` |
| Runtime failure | `run.failed` |
| Runtime completion, cancellation, or interrupt | `run.finished` |
| Safe diagnostics and performance metrics | `diagnostic.changed`, `metric.changed` |

## Projection rules

1. Text events update conversation answer parts only.
2. Reasoning events update process parts only unless explicitly exported as answer text.
3. Plan events update process or human-in-the-loop plan review surfaces.
4. Tool events update inline process and timeline projections; full output loads on demand.
5. Action events update task attention state and human-in-the-loop surfaces.
6. Queue, task, and agent events update task capsules and session/task surfaces.
7. Context and permission events update context chips, status, policy controls, or diagnostics; they do not become final answer text.
8. Artifact events update artifact cards, workspace panels, versions, diffs, and export state.
9. Evidence events update citations, review, replay, verification, and evidence surfaces.
10. Final events reconcile content; they do not blindly append duplicate text.

## Identity requirements

Runtime facts SHOULD carry stable identifiers:

- session id
- thread or conversation id
- run id
- turn id
- message id
- content part id
- task id
- agent id
- queued turn id
- action request id
- tool call id
- artifact id
- evidence id

The UI may generate temporary optimistic ids, but it must reconcile them with runtime ids when available.

## Unknown and missing facts

If an event lacks required fields, the UI SHOULD:

- keep the raw event in diagnostics if safe
- render `unknown`, `unavailable`, `stale`, or `blocked`
- avoid guessing from text
- avoid promoting incomplete facts to final evidence
- preserve user control when possible

## Acceptance scenarios

1. Runtime status before first text renders outside conversation text.
2. A tool event with `artifactId` creates an artifact card linked to the tool step.
3. A final event reconciles streamed answer content without duplication.
4. An action request with severity appears in task capsules and approval UI.
5. Missing artifact metadata renders as `unknown` rather than guessed from prose.
6. An artifact export event updates export state without copying binary payload into message text.
7. A queued turn updates task capsules without creating fake assistant prose.
8. A subagent event updates task/agent state without being flattened into the final answer.
9. Context compaction creates a boundary or summary without replaying old reasoning as answer text.
10. Safe diagnostics remain inspectable without entering normal conversation text.
