---
title: Session and tab surface
description: Browser-like session states, progressive restore, and resource management for Agent UI.
---

# Session and tab surface

Agent sessions are executable work units, not just chat transcripts. A client with multiple sessions should manage them like recoverable, resource-aware tabs.

## Standard session states

| State | Meaning | Resource behavior |
| --- | --- | --- |
| `active` | User is currently interacting with this session. | Full conversation, process, and composer may render. |
| `recent` | Recently used and likely to be opened again. | Keep snapshot and lightweight task state. |
| `pinned` | User marked as important. | Preserve summary and task state; avoid automatic discard. |
| `suspended` | Not active; heavy UI is paused. | Keep title, preview, capsules, artifact index. |
| `discarded` | Heavy state released. | Keep restore metadata and last known summary. |
| `restoring` | Session is being rehydrated. | Show shell and snapshot first. |
| `archived` | Hidden from default active lists. | Discoverable through search or archive view. |

## Progressive restore

Opening an existing session SHOULD follow this order:

```text
click session
  -> create/activate shell
  -> apply cached snapshot or skeleton
  -> load bounded recent messages
  -> paint stable recent conversation
  -> hydrate queue/action/artifact summaries
  -> load timeline details on idle or expand
  -> page older history on request
```

A session surface SHOULD NOT block first paint on full history, full timeline, artifact previews, evidence export, or background session lists.

## Snapshot content

A lightweight snapshot MAY include:

- session id
- title
- last message preview
- last activity timestamp
- active task state
- queued count
- pending action count
- latest artifact summary
- latest evidence or review state
- unread or changed indicator

Snapshots are projection state. They must be refreshed or marked stale when authoritative facts change.

## Resource rules

Clients SHOULD track and control:

- active tab count
- hydrated detail tab count
- mounted message list count
- mounted timeline item count
- streaming buffer size
- loaded artifact preview bytes
- background restore count

Inactive sessions should not continuously rebuild large timelines or parse large message histories.

## Acceptance scenarios

1. Opening an old session shows shell or cached preview before full detail loads.
2. Switching between two old sessions does not let stale hydration overwrite the active session.
3. Non-active sessions keep capsules but release heavy timeline rendering.
4. Pinned sessions preserve important state under memory pressure.
5. Loading older history is explicit and paged.
