---
title: Best practices
description: How to design maintainable Agent UI runtime projections.
---

# Best practices

Use this page as requirements for Agent UI implementations and reusable surface guidance.

## Keep facts owned by their source

Agent UI MUST NOT define new model events, artifact stores, evidence verdicts, permission grants, or task truth. It projects facts supplied by the runtime, artifact service, evidence service, or application state owner.

Good wording:

> Show `needs-input` when the runtime exposes a pending action request.

Bad wording:

> If the assistant says it needs approval, mark the task as blocked.

## Start from event classes

Before drawing components, define how the UI receives:

- run lifecycle and status
- text deltas and final text
- reasoning or thinking parts
- tool start/args/progress/result
- action required/resolved
- queue changed
- artifact changed
- evidence changed
- session snapshot and history cursor

A surface without event ownership usually becomes string parsing.

## Separate final answer from process

A common Agent UI failure is putting status, reasoning, tool output, and final answer text into one stream. Keep these separate:

| Content | Preferred surface |
| --- | --- |
| Final answer | Message text part |
| Reasoning or thinking | Collapsed process part |
| Runtime status | Runtime strip or process row |
| Tool call and result | Tool UI row + details |
| Approval or input request | Human-in-the-loop card |
| Artifact | Artifact card + workbench |
| Evidence | Timeline/evidence panel |

## Use stable ids everywhere

Every projected object SHOULD have a stable id from the owning system:

- session id
- run or turn id
- message id
- message part id
- tool call id
- action request id
- queued turn id
- artifact id
- evidence id
- review/replay id

Temporary optimistic ids are fine, but they must reconcile when runtime ids arrive.

## Compress process by default

Process UI should be useful without becoming a log dump.

Good defaults:

- show the current stage and elapsed time
- show tool name, safe input summary, and status
- hide raw long JSON unless expanded
- show large output as an offload reference
- summarize completed reasoning
- keep errors recoverable with copyable diagnostics

## Treat missing facts honestly

Use explicit fallback states instead of guessing:

- `loading`
- `unknown`
- `unavailable`
- `stale`
- `blocked`
- `needs-input`
- `failed`
- `disputed`

If artifact metadata is missing, say the artifact kind is unknown. If verification has not run, do not show passed.

## Route user control through APIs

Approvals, interrupts, queue changes, steering, artifact edits, evidence export, review decisions, and replay creation are controlled writes. The UI may initiate them, but it does not own the resulting fact.

Every control should define:

| Field | Question |
| --- | --- |
| Required fact | Which id or snapshot proves the action is valid? |
| API boundary | Which service owns the write? |
| Pending state | What is visible while waiting? |
| Failure state | How does the user recover? |
| Audit state | Where is the action recorded? |

## Design for old sessions

Long-running agents create history. Do not make old-session open depend on full detail.

Recommended behavior:

- render shell and tab first
- apply cached snapshot if available
- hydrate recent message window before timeline details
- lazy-load tool output, artifact content, and evidence payloads
- paginate older history by cursor
- keep inactive tabs as snapshots, not full mounted workspaces

## Measure visible latency

A UI that is technically streaming can still feel frozen. Track:

- first runtime status
- first text delta
- first text paint
- delta backlog depth
- oldest unrendered delta age
- old-session shell paint
- recent-message paint
- timeline idle completion

## Avoid visual lock-in

Agent UI standardizes semantics, not style. Avoid requiring a color system, typography, framework, animation, or component library unless the guidance is explicitly scoped to one product.

Good guidance:

> The pending approval control must remain keyboard reachable and show scope, consequence, approve, and reject.

Bad guidance:

> Use a yellow card with this exact shadow and a specific React component.
