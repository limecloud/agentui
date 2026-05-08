---
title: Backend coordination contract
description: Backend summaries, pagination, artifacts, evidence, and diagnostics needed by Agent UI clients.
---

# Backend coordination contract

Agent UI cannot stay responsive if every surface depends on full session detail. Backends should provide layered projections, stable ids, and on-demand detail APIs.

## Backend responsibilities

| Capability | Backend responsibility | UI benefit |
| --- | --- | --- |
| Event stream | Emit typed status, text, reasoning, tool, action, queue, artifact, evidence events. | Streaming does not mix states into one text flow. |
| Session summary | Return title, preview, activity, task counts, artifact summary. | Sidebar and tabs stay cheap. |
| Window detail | Return recent messages and bounded process data. | Old sessions open quickly. |
| Timeline pages | Return process details by cursor. | Long histories are inspectable without blocking. |
| Tool output refs | Store large output out of message body. | Tool details load on demand. |
| Artifact service | Persist artifact metadata, preview, versions, and content refs. | Artifacts leave chat and enter workbench. |
| Evidence service | Export evidence, review, replay, and audit records. | Results are verifiable and reusable. |
| Diagnostics | Emit compatible timing and resource metrics. | Slow paths can be located. |

## Recommended API layers

| Layer | Use | Contents |
| --- | --- | --- |
| `listSummary` | Navigation, sidebars, tabs, task strips. | id, title, preview, status, counts, last activity. |
| `sessionSnapshot` | Fast restore and inactive tabs. | summary plus recent message preview and task capsule summary. |
| `windowDetail` | Active session first paint. | recent N messages, minimal process refs, thread/task state, history cursor. |
| `timelinePage` | User expands process history. | detailed process items by cursor and limit. |
| `artifactPreview` | Artifact cards and workbench list. | metadata, small preview, status, version. |
| `artifactContent` | Editing or full preview. | full content or chunked content. |
| `evidenceJob` | Export or refresh evidence. | job state, output refs, warnings. |
| `diagnostics` | Developer or support view. | timing, queue, stream, and resource metrics. |

## Pagination and hydration

Backends SHOULD prefer cursor-based pagination for mutable histories. Offset pagination may become unstable when new events are inserted.

A window detail response SHOULD explicitly state:

- history is truncated or complete
- cursor for older history
- number of messages, turns, and process items returned
- whether timeline detail is included or deferred
- whether artifact and evidence previews are included or deferred

## Stable references

The backend SHOULD normalize references so the UI can link surfaces:

```text
turn -> messages -> process items -> tools -> artifacts -> evidence
```

At minimum, artifacts and evidence should be linkable back to the task or turn that produced them.

## Do not overload session detail

Avoid making a single `getSession` equivalent return everything. Full detail calls that include all messages, all tools, all artifact content, and all evidence data make old sessions slow and encourage clients to block rendering.

Prefer small summaries and explicit detail APIs.
