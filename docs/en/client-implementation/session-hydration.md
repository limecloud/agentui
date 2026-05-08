---
title: Session hydration
description: Progressive restore and resource management for existing agent sessions.
---

# Session hydration

Opening an existing session should be progressive. The user should see a stable shell and useful recent content before expensive process history, artifacts, or evidence load.

## Recommended flow

```text
select session
  -> activate tab shell
  -> apply cached snapshot or skeleton
  -> request window detail with bounded history
  -> hydrate recent messages
  -> paint stable conversation
  -> hydrate queue/action/artifact summaries
  -> defer timeline and tool detail
  -> load older history only on request
```

## Hydration priorities

| Priority | Load | Reason |
| --- | --- | --- |
| P0 | shell, title, composer availability | User needs orientation and control. |
| P0 | recent messages or skeleton | Avoid blank workspace. |
| P0 | active task and pending action summary | Attention states must be visible. |
| P1 | artifact summary | Deliverables should be reachable. |
| P1 | compact process summary | Show what happened without heavy timeline. |
| P2 | detailed timeline pages | User expands process details. |
| P2 | full tool output | User opens tool detail. |
| P2 | evidence export or replay | User requests audit or review. |

## Stale response protection

Hydration responses can arrive out of order. Clients SHOULD tag each request with an activation token or version and ignore results that do not match the active session.

Rules:

- A background response for session A must not overwrite active session B.
- A slower older request must not overwrite a newer snapshot.
- Switching away should cancel or deprioritize heavy detail loading when possible.

## Inactive sessions

Inactive sessions SHOULD downgrade to snapshot state:

- title
- last message preview
- task capsules
- queued and pending counts
- artifact summary
- unread or changed state

They SHOULD release heavy message windows, parsed Markdown, mounted timeline items, and full artifact previews unless pinned or explicitly kept warm.

## Acceptance scenarios

1. Opening an old session shows shell before detail completes.
2. Recent messages render before full timeline detail.
3. Switching A -> B -> A does not let B overwrite A or A overwrite B incorrectly.
4. Inactive sessions keep task state but release heavy process renderers.
5. Older history loads by explicit page or cursor action.
