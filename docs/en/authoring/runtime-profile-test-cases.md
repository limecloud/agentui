---
title: Runtime profile test cases
description: Test matrix for projecting Agent Runtime-style facts into Agent UI without creating UI-owned runtime truth.
---

# Runtime profile test cases

Use these cases when a product source is compatible with Agent Runtime, Lime AgentRuntime Profile, or an equivalent runtime spine. The goal is not to test the runtime implementation itself; the goal is to prove that Agent UI projects runtime facts without creating a second source of truth.

## Canonical projection chain

```text
RuntimeEvent / ThreadReadModel / TaskSnapshot / EvidencePack
  -> Agent UI adapter
  -> projection store
  -> status, task, tool, HITL, timeline, evidence, review, replay, and team surfaces
  -> controlled writes back to runtime, artifact, policy, or evidence owners
```

Agent UI tests fail when UI state invents status, approval, tool success, evidence verdict, known gaps, or task completion that cannot be traced back to runtime, artifact, policy, or evidence facts.

## Source fixtures

When Agent Runtime fixtures are available, map them into Agent UI projection assertions:

| Runtime fixture | UI surfaces to verify | Required projection outcome |
| --- | --- | --- |
| `submit-turn-event.json` | Runtime status, message shell, task capsule | Accepted work appears before first text and preserves `sessionId/threadId/turnId`. |
| `tool-approval-action-required-event.json` | Human-in-the-loop, task attention, tool UI | Approval card uses `actionId/toolCallId`; UI does not run the tool optimistically. |
| `task-retry-attempt-failed-event.json` | Task capsule, timeline evidence | Failed attempt remains visible and retry state does not overwrite history. |
| `routing-single-candidate-event.json` | Runtime status, model chip, diagnostics | Single-candidate routing is explained as runtime fact, not final answer prose. |
| `evidence-export-event.json` | Timeline/evidence, review, replay | Evidence, replay, and review refs point to the same fact source. |
| `thread-read-snapshot.json` | Session hydration, status, task capsule | The UI can hydrate directly from snapshot without recomputing runtime truth. |

## Identity preservation

| ID | Case | Input | Expected result |
| --- | --- | --- | --- |
| AUI-AR-ID-001 | Preserve runtime spine ids | Source event carries `runtimeId/sessionId/threadId/turnId` | Projection keeps these ids on status, task, and timeline records. |
| AUI-AR-ID-002 | Preserve task/run/attempt ids | Source event carries `taskId/runId/attemptId` | Task capsule and timeline can link the active attempt and prior attempts. |
| AUI-AR-ID-003 | Preserve tool/action ids | Source event carries `toolCallId/actionId` | Tool row, approval card, and evidence timeline join through the same ids. |
| AUI-AR-ID-004 | Preserve evidence trace ids | Source event carries `evidenceId/traceId/evidencePackRef` | Evidence surface links to durable details without copying the full payload. |
| AUI-AR-ID-005 | Preserve parent/child lineage | Source event carries `parentSessionId/parentThreadId/subagentId` | Delegation graph and teammate transcript retain lineage after hydration. |

## Status and read model projection

| ID | Case | Source facts | Expected result |
| --- | --- | --- | --- |
| AUI-AR-READ-001 | Accepted before first text | `turn.submitted` or accepted read model | Runtime status shows accepted/preparing before `text.delta`. |
| AUI-AR-READ-002 | Running turn | `turn.started` / active turn in read model | Status and task capsule show running; no final answer is fabricated. |
| AUI-AR-READ-003 | Waiting on permission | `action.required` in read model | HITL surface appears and task attention state becomes waiting/needs-input. |
| AUI-AR-READ-004 | Completed turn | `turn.completed` plus snapshot update | Status reconciles to completed and process details archive to timeline. |
| AUI-AR-READ-005 | Failed turn | `turn.failed` with failure category | Failure is visible in status, task capsule, and timeline; final answer does not claim success. |
| AUI-AR-READ-006 | Missing source field | Snapshot lacks optional routing or evidence summary | UI renders unknown/unavailable and keeps diagnostics safe. |

## Tool approval and controlled write cases

| ID | Case | User action | Expected result |
| --- | --- | --- | --- |
| AUI-AR-ACTION-001 | Approval request appears | Runtime emits `action.required` | UI shows approve/reject/respond controls with stable `actionId`. |
| AUI-AR-ACTION-002 | Approval write is controlled | User clicks approve | UI calls runtime action response API and waits for `action.resolved`. |
| AUI-AR-ACTION-003 | Denial does not execute tool | User clicks reject | UI waits for runtime denial/tool failure fact; no optimistic `tool.result` appears. |
| AUI-AR-ACTION-004 | Duplicate response is safe | User repeats response | UI remains idempotent and does not create a second resolved fact. |
| AUI-AR-ACTION-005 | Tool output is offloaded | Tool result includes large output ref | UI shows summary/ref and loads detail on demand. |

## Task, routing, and limit cases

| ID | Case | Source facts | Expected result |
| --- | --- | --- | --- |
| AUI-AR-TASK-001 | Retry keeps history | `task.attempt.failed -> task.retrying -> task.attempt.started` | Task capsule shows retrying/current attempt while timeline keeps failed attempt. |
| AUI-AR-TASK-002 | Blocked task is visible | `quota.blocked` or `routing.not_possible` | Task capsule shows blocked/failed with reason, not infinite running. |
| AUI-AR-TASK-003 | Single model candidate | `routing.single_candidate` | Runtime status/model chip explains selected model and decision source. |
| AUI-AR-TASK-004 | Cost/limit state | `cost.estimated`, `rate_limit.hit`, or limit summary | UI shows cost/limit state as diagnostics or status, not final prose. |
| AUI-AR-TASK-005 | Subagent lineage | `subagent.spawned` or parent/child task snapshot | Team/delegation surfaces show child owner and parent task. |

## Evidence, replay, and review cases

| ID | Case | Source facts | Expected result |
| --- | --- | --- | --- |
| AUI-AR-EVID-001 | Evidence export progress | `evidence.changed` with pending/exporting status | Timeline/evidence surface shows progress without blocking text streaming. |
| AUI-AR-EVID-002 | Evidence pack ready | `evidence.changed` with `evidencePackRef` | Evidence surface links durable pack details. |
| AUI-AR-EVID-003 | Replay and review share source | `replayRef` and `reviewRef` reference same pack/source ids | Replay/review lanes do not recompute their own status truth. |
| AUI-AR-EVID-004 | Known gaps are not guessed | Runtime has no matching telemetry | UI shows unavailable/empty summary, not a fabricated `unlinked` gap. |
| AUI-AR-EVID-005 | Failed tool is auditable | Tool failure has `toolCallId` and evidence ref | Timeline links failure to tool row and evidence detail. |

## Session hydration cases

| ID | Case | Input | Expected result |
| --- | --- | --- | --- |
| AUI-AR-HYDRATE-001 | Hydrate from thread snapshot | `ThreadReadModel` snapshot | Shell, status, pending actions, queued turns, and recent messages render without replaying all events. |
| AUI-AR-HYDRATE-002 | Repair from event stream | Snapshot stale, event stream available | Projection rebuilds read model state and marks stale sections until repaired. |
| AUI-AR-HYDRATE-003 | Evidence lazy load | Evidence refs exist but payload is not loaded | Timeline shows refs; payload loads only when requested. |
| AUI-AR-HYDRATE-004 | Parent/child ids survive | Old session has subagent lineage | Delegation graph and teammate transcript can still resolve parent/child ids. |

## Governance failure cases

These are explicit failures for compatible Agent UI implementations:

1. UI parses assistant prose to infer tool success, approval state, model routing, or task completion.
2. UI projection store becomes the owner of `runtimeStatus`, evidence verdict, permission grant, or artifact contents.
3. Evidence, replay, and review lanes display contradictory status because each rebuilt facts separately.
4. A missing runtime field is silently replaced with a fabricated value instead of `unknown`, `unavailable`, `stale`, or safe diagnostics.
5. Action controls mark success before runtime confirmation.
6. Background, subagent, or remote work is flattened into one assistant transcript when runtime exposes ownership and lineage.

## Minimum validation set

For an Agent Runtime-compatible source, run at least:

1. Identity preservation: AUI-AR-ID-001 through AUI-AR-ID-004.
2. Status/read model projection: AUI-AR-READ-001 through AUI-AR-READ-006.
3. HITL controlled writes: AUI-AR-ACTION-001 through AUI-AR-ACTION-004.
4. Evidence consistency: AUI-AR-EVID-001 through AUI-AR-EVID-004.
5. Hydration: AUI-AR-HYDRATE-001 and AUI-AR-HYDRATE-003.

These cases are the Agent UI counterpart to AgentRuntime profile tests: Runtime proves the facts exist; UI proves those facts are projected honestly.
