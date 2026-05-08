---
title: Performance metrics contract
description: Timing, stream, history, and resource metrics for Agent UI acceptance.
---

# Performance metrics contract

Agent UI performance is part of the user experience contract. Clients and runtimes should record enough metrics to explain perceived slowness without exposing sensitive payloads.

## Submission and first response

| Metric | Meaning |
| --- | --- |
| `composer.submit_ms` | User action timestamp. |
| `listener.bound_ms` | Stream listener or event binding is ready. |
| `submit.accepted_ms` | Runtime accepted the turn. |
| `queue.wait_ms` | Time spent waiting in queue. |
| `runtime.start_ms` | Runtime began execution. |
| `provider.request_start_ms` | Provider or model request began. |
| `first_event_ms` | First runtime event reached client. |
| `first_runtime_status_ms` | First user-visible status. |
| `first_text_delta_ms` | First answer text delta. |
| `first_text_paint_ms` | First text visible to user. |

These metrics separate client delay, runtime queueing, provider delay, bridge delay, and render delay.

## Stream rendering

| Metric | Meaning |
| --- | --- |
| `text_delta.queue_depth` | Number of unrendered text chunks. |
| `text_delta.oldest_unrendered_age_ms` | Age of oldest unrendered chunk. |
| `stream.render_mode` | Smooth, catch-up, paused, or fallback. |
| `stream.mode_transition_count` | Number of mode switches. |
| `stream.rapid_reentry_count` | Frequent catch-up re-entry indicator. |
| `stream.flush_interval_ms` | Render flush cadence. |
| `stream.buffer_chars` | Buffered text size. |

A client can use these to decide when to switch from smooth streaming to catch-up rendering.

## History and restore

| Metric | Meaning |
| --- | --- |
| `session.click_to_shell_ms` | User opens session to shell paint. |
| `session.snapshot_apply_ms` | Cached snapshot apply time. |
| `session.detail_request_ms` | Window detail request duration. |
| `session.messages_hydrate_ms` | Recent messages hydration duration. |
| `message_list.first_stable_paint_ms` | First readable conversation paint. |
| `timeline.idle_hydrate_ms` | Deferred timeline completion. |
| `history.page_load_ms` | Older history page duration. |

## Resource pressure

| Metric | Meaning |
| --- | --- |
| `tabs.active_count` | Full active sessions. |
| `tabs.hydrated_detail_count` | Sessions holding detailed state. |
| `message_lists.mounted_count` | Mounted message lists. |
| `timeline.items_mounted_count` | Rendered timeline items. |
| `artifact.preview_loaded_bytes` | Loaded artifact preview bytes. |
| `background.restore_count` | Concurrent restore operations. |
| `deferred.timeline_pending_count` | Deferred timeline jobs. |

## Acceptance thresholds

This standard does not mandate universal numbers. An implementation SHOULD define product-specific targets for:

- first visible status
- first text paint
- old session shell paint
- old session recent message paint
- maximum mounted inactive timelines
- large tool output preview threshold
- artifact preview budget

Targets should be tested with representative histories and tool outputs, not only empty demo sessions.
