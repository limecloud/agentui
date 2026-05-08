---
title: Runtime event projection contract
description: Mapping runtime events and facts into Agent UI projection state.
---

# Runtime event projection contract

Agent UI clients should consume structured runtime facts and project them into surfaces. They should not parse ordinary prose to infer state.

## Event classes

| Event class | Typical facts | Primary surface |
| --- | --- | --- |
| `turn.started` | turn id, session id, timestamp | Process, Task |
| `runtime.status` | stage, detail, elapsed, provider state | Runtime Status |
| `text.delta` | message id, text delta, part id | Conversation |
| `text.final` | final text, content id | Conversation reconciliation |
| `reasoning.delta` | summary or reasoning content | Process |
| `tool.started` | tool id, kind, input summary | Tool UI, Timeline |
| `tool.progress` | progress, partial output ref | Tool UI |
| `tool.completed` | status, output ref, duration | Tool UI, Evidence |
| `action.required` | request id, type, severity, schema | Human-in-the-loop, Task |
| `action.resolved` | request id, response summary | Human-in-the-loop, Evidence |
| `queue.changed` | queued ids, previews, order | Task Capsule, Composer |
| `artifact.created` / `artifact.updated` | artifact id, kind, status, version | Artifact Workspace |
| `artifact.preview.ready` | artifact id, preview ref or preview payload | Artifact Workspace |
| `artifact.version.created` / `artifact.diff.ready` | artifact id, version id or diff ref | Artifact Workspace, Timeline |
| `artifact.export.started` / `artifact.export.completed` | artifact id, export id/ref, status | Artifact Workspace, Evidence |
| `artifact.failed` / `artifact.deleted` | artifact id, error or unavailable state | Artifact Workspace |
| `artifact.changed` | collapsed artifact adapter event | Artifact Workspace |
| `evidence.changed` | evidence id, status, refs | Evidence |
| `turn.completed` | outcome, final refs | Conversation, Task |
| `turn.failed` | error, retryability, diagnostic ref | Runtime Status, Task |

## Projection rules

1. Text events update conversation parts only.
2. Reasoning events update process parts only unless explicitly exported as answer text.
3. Tool events update process and timeline projections; full output is loaded on demand.
4. Action events update task attention state and human-in-the-loop surfaces.
5. Artifact events update artifact summaries, artifact cards, workspace panels, version rails, diff actions, and export state.
6. Evidence events update evidence surfaces and citation availability.
7. Queue events update task capsules and composer state.
8. Final events reconcile content; they do not blindly append duplicate text.

## Identity requirements

Runtime facts SHOULD carry stable identifiers:

- session id
- thread or conversation id
- turn id
- message id
- content part id
- task id
- queued turn id
- action request id
- tool call id
- artifact id
- evidence id

The UI may generate temporary optimistic ids, but it must reconcile them with runtime ids when available.

## Unknown and missing facts

If an event lacks required fields, the UI SHOULD:

- keep the raw event in diagnostics if safe
- render an unknown or unavailable state
- avoid guessing from text
- avoid promoting incomplete facts to final evidence
- preserve user control when possible

## Acceptance scenarios

1. Runtime status before first text renders outside conversation text.
2. A tool event with `artifact.id` creates an artifact card linked to the tool step.
3. A final event reconciles streamed answer content without duplication.
4. An action request with severity appears in task capsules and approval UI.
5. Missing artifact metadata renders as unknown rather than guessed from prose.
6. An artifact export event updates export state without copying binary payload into message text.
