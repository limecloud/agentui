---
title: Runtime status surface
description: Standard runtime states, attention rules, and first-response feedback.
---

# Runtime status surface

Runtime Status makes agent execution legible before, during, and after streamed answer text. Its goal is credible feedback, not decorative activity.

## Standard states

| State | Meaning | Attention level | Default UI |
| --- | --- | --- | --- |
| `submitted` | Client accepted user input. | Low | Pending message or placeholder. |
| `binding` | Event listener or stream binding is being prepared. | Debug | Hidden unless diagnosing. |
| `queued` | Work is waiting behind another task. | Medium | Task capsule with queue position. |
| `routing` | Runtime is selecting model, tool, or route. | Low | Compact phase label. |
| `preparing` | Runtime is building context or request. | Low | Stable status row. |
| `waiting_provider` | Provider request started; no model event yet. | Medium after threshold | Status row with elapsed time. |
| `streaming` | Answer text or process events are arriving. | Low | Subtle streaming indicator. |
| `tool_running` | A tool, command, browser, or external action is active. | Medium | Tool step summary and optional interrupt. |
| `action_required` | User input or approval is required. | High | CTA card and task capsule. |
| `retrying` | Runtime is retrying a recoverable failure. | Medium | Retry count and reason. |
| `failed` | Turn or task failed. | High | Recoverable error card. |
| `cancelled` | User or runtime cancelled work. | Low | Quiet terminal state. |
| `completed` | Work completed. | Low | Collapse status to summary or hide. |

## First-response rule

A client SHOULD show a credible state before first answer text. If the runtime cannot provide a stage yet, show `submitted` or `preparing`; do not leave the user facing a frozen surface.

A status is credible when it is tied to a real client or runtime milestone:

- input accepted
- stream listener bound
- turn accepted
- queued
- runtime started
- provider request started
- first provider event received
- first text delta received

## Stable status row

The status row SHOULD avoid layout jumps. Recommended content:

- short state label
- elapsed time after a threshold
- active tool or queue summary
- interrupt or cancel hint when available
- at most two lines of detail before overflow into a process surface

## Attention rules

Only these states SHOULD aggressively draw attention:

- `action_required`
- `failed`
- `permission_required`
- `plan_ready`
- `stale_without_activity` after a meaningful threshold

Normal `routing`, `preparing`, `streaming`, and `tool_running` states should remain visible but calm.

## Diagnostics

A status surface SHOULD preserve diagnostics for slow paths:

| Metric | Meaning |
| --- | --- |
| `submit_to_status_ms` | User submit to first credible status. |
| `submit_to_first_event_ms` | User submit to first runtime event. |
| `submit_to_first_text_ms` | User submit to first answer text. |
| `first_text_to_paint_ms` | Rendering delay after first text. |
| `last_event_age_ms` | Time since last runtime event. |

Diagnostics can be hidden in normal UI, but they should be available to developers and evidence surfaces.
