---
title: Artifact Workspace
description: Delivery, preview, editing, versioning, diff, export, and handoff rules for agent artifacts.
---

# Artifact Workspace

Agent UI treats durable deliverables as first-class artifacts, not oversized chat messages or passive attachments. The artifact workspace is the interaction surface where users inspect, edit, compare, export, reuse, and hand off agent-created work.

Core rule:

```text
Conversation carries intent and explanation.
Artifact Workspace carries delivery and continued work.
```

## Why this is core

Agent products repeatedly produce substantial standalone content: documents, code, websites, diagrams, images, tables, reports, datasets, and interactive views. External implementations point in the same direction:

- Claude Artifacts put substantial standalone content in a dedicated window separate from the main conversation.
- AI SDK `UIMessage` separates text, reasoning, tool, file, source, and custom data parts for UI rendering.
- assistant-ui separates attachments, runtime adapters, message parts, and custom tool UI rendering.
- OpenAI Apps SDK separates structured tool data, narration, component-only metadata, and UI resources.

Agent UI standardizes the interaction semantics across those patterns. It does not standardize the artifact store.

## Artifact interaction contract

An Artifact Workspace SHOULD consume explicit artifact facts:

| Fact | Purpose |
| --- | --- |
| `artifact.id` | Stable linking across conversation, process, task, artifact workspace, and evidence. |
| `artifact.kind` | `document`, `code`, `image`, `table`, `canvas`, `diff`, `report`, `dataset`, `browser_snapshot`, `bundle`, `custom`, or `unknown`. |
| `artifact.title` | User-visible label. |
| `artifact.status` | `creating`, `ready`, `updating`, `failed`, `stale`, `superseded`, `deleted`, or `unknown`. |
| `artifact.version.id` | Version, revision, or checkpoint identity. |
| `artifact.preview` | Lightweight preview, thumbnail, summary, manifest, or partial rows. |
| `artifact.read_ref` | Path, URL, object id, or service reference for full content. |
| `artifact.write_capabilities` | Whether the user can edit, fork, export, regenerate, or attach to the next turn. |
| `artifact.diff_ref` | Diff or patch reference when available. |
| `artifact.source_refs` | Tool, source, task, turn, message, or run references. |
| `artifact.evidence_refs` | Evidence, verification, review, replay, or handoff references. |

Do not infer artifact kind, saved status, version, or export success from ordinary answer text when explicit facts are missing.

## Event projection

Artifact events SHOULD be projected into artifact cards, workspace panels, timeline entries, and evidence links.

| Event class | Required minimum | UI projection |
| --- | --- | --- |
| `artifact.created` | artifact id, kind or `unknown`, status | Create card and workspace entry. |
| `artifact.updated` | artifact id, version or status | Update preview, freshness, and workspace state. |
| `artifact.preview.ready` | artifact id, preview ref or preview data | Show lightweight preview without loading full content. |
| `artifact.version.created` | artifact id, version id, source refs | Add version marker and compare target. |
| `artifact.diff.ready` | artifact id, diff ref | Enable diff/review action. |
| `artifact.export.started` | artifact id, export id | Show background export state. |
| `artifact.export.completed` | artifact id, export ref | Show download/share/handoff action. |
| `artifact.failed` | artifact id, error summary | Keep last confirmed version and show recovery path. |
| `artifact.deleted` | artifact id | Mark unavailable without deleting history references. |

A runtime adapter may collapse these into `artifact.changed`, but compatible clients SHOULD preserve the more specific event class when available.

## Workspace regions

An Artifact Workspace SHOULD have stable regions even if the visual layout differs:

| Region | User question | Required behavior |
| --- | --- | --- |
| Card | What was produced? | Compact title, kind, status, preview, open action. |
| Preview | Can I inspect it quickly? | Lightweight render that does not block streaming. |
| Editor / Canvas | Can I continue working? | Controlled writes through artifact APIs or host store. |
| Version rail | What changed over time? | Current version, source turn, previous versions, stale state. |
| Diff / Review | What changed and is it acceptable? | Compare explicit versions or patches. |
| Export / Handoff | Can I use it outside this run? | Export state, target, and evidence/handoff links. |
| Source links | Where did it come from? | Links to turn, tool, source, task, and evidence. |

## Placement rules

| Content | Preferred placement |
| --- | --- |
| Short result | Conversation or inline preview. |
| Long report | Artifact Workspace with conversation summary. |
| Code or document patch | Artifact Workspace with diff/review. |
| Image/video/audio | Artifact preview with open and export actions. |
| Browser snapshot | Artifact with source, timestamp, and replay/evidence link when available. |
| Generated dataset | Manifest, schema, sample rows, and full-content read ref. |
| Interactive widget | Tool UI or Artifact Workspace depending on whether it is a transient result or reusable deliverable. |
| Evidence pack | Evidence surface, linked from artifact when relevant. |

## Editing and versioning

Artifact edits SHOULD write through an artifact service, runtime action, or controlled host store. The UI SHOULD preserve:

- last confirmed version
- pending local edits
- save status
- diff or patch when applicable
- source or generation turn
- export or handoff state
- evidence/review links

If an edit fails, keep the last confirmed version and show unsaved changes separately. If a later runtime update supersedes the open version, show the conflict or stale state instead of silently replacing the user's draft.

## Artifact cards

Conversation and process surfaces may show compact artifact cards. A card SHOULD include:

- title
- kind
- status
- small preview or icon
- open action
- version or freshness when relevant
- source/evidence indicator if available
- export/handoff state when relevant

The card is an entry point, not the artifact body.

## Boundaries

Agent UI owns artifact interaction semantics. The artifact service owns full content, storage, version persistence, export bytes, and write authority. Evidence systems own verification, replay, and review facts.

Anti-patterns:

- dumping a long artifact into assistant text
- rendering binary files as empty generic file cards
- duplicating the same artifact under path, basename, and absolute-path identities
- marking an artifact saved before the owning service confirms it
- losing local edits when the user opens another session or artifact
- making the canvas state the only source of artifact truth

## Acceptance scenarios

1. A long generated report opens in Artifact Workspace; conversation only shows a summary and card.
2. Artifact preview loads without blocking streamed answer text.
3. Artifact kind comes from explicit metadata; missing kind shows `unknown`.
4. Editing preserves version, pending edits, and unsaved state.
5. A diff compares two explicit versions rather than two message strings.
6. Export progress and completion are visible and recoverable.
7. An artifact links back to the turn, tool, source, task, or evidence that produced it.
8. Opening an old session shows artifact summaries before loading full content.
