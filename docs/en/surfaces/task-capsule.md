---
title: Task capsule surface
description: Compact UI for running, queued, blocked, failed, and completed agent work.
---

# Task capsule surface

Task capsules compress agent work into a stable attention layer. They are especially useful for long-running tasks, queues, background agents, and sessions that should not fully render while inactive.

## Standard task states

| State | Meaning | Attention | Required affordance |
| --- | --- | --- | --- |
| `running` | Work is active. | Low | Open details, interrupt when supported. |
| `queued` | Work is waiting. | Medium | Show position, preview, edit/remove when supported. |
| `steering` | Input is being delivered to current work. | Medium | Show pending steer preview. |
| `needs_input` | User must provide information. | High | Clear CTA and oldest age. |
| `plan_ready` | A plan awaits approval or edit. | High | Approve, reject, edit, inspect. |
| `permission_required` | A risky action needs permission. | High | Approve/reject with scope and risk summary. |
| `failed` | Work failed but may be recoverable. | High | Retry, inspect diagnostic, export evidence. |
| `cancelled` | Work stopped intentionally. | Low | Quiet summary. |
| `completed` | Work finished. | Low | Summary and artifact/evidence links. |
| `stale` | No activity beyond threshold. | Medium | Inspect, interrupt, or resume. |

## Attention rules

1. Normal running work should be visible but calm.
2. `needs_input`, `plan_ready`, `permission_required`, and `failed` may use stronger visual priority.
3. Completed tasks should collapse automatically unless they produced important artifacts or evidence.
4. Capsules should open details without navigating away from the user's current context.
5. Multiple capsules should aggregate by session, workspace, or task group when screen space is limited.

## Capsule content

A capsule SHOULD include:

- short label
- state
- count or queue position when relevant
- latest meaningful activity
- primary CTA only for attention states
- link to process, artifact, or evidence details

Avoid putting full tool output, logs, or long plan text inside the capsule.

## Session interaction

Task capsules can keep inactive sessions cheap:

- active session may render full conversation and process surfaces
- recent session may keep a snapshot and active capsule
- suspended session may keep only title, summary, and task states
- discarded session may keep restore metadata and artifact/evidence index

This makes task state visible without forcing every session to hydrate full history.

## Acceptance scenarios

1. Two running tasks appear as compact capsules without flooding conversation.
2. A `needs_input` task is visually higher priority than a normal running task.
3. A queued turn shows preview and remove action before it starts.
4. Clicking a capsule opens task details in context.
5. Closing or suspending an inactive session releases heavy process rendering while preserving capsule state.
