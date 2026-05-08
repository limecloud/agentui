---
title: Artifact and canvas surface
description: Delivery, preview, editing, versioning, and source-linking rules for agent artifacts.
---

# Artifact and canvas surface

Agent UI should treat durable deliverables as artifacts, not as oversized chat messages.

Core rule:

```text
Conversation for intent and explanation.
Artifact for delivery and continued work.
```

## Artifact facts

An artifact surface SHOULD consume explicit artifact facts:

| Fact | Purpose |
| --- | --- |
| `artifact.id` | Stable linking across conversation, process, task, and evidence. |
| `artifact.kind` | Document, code, image, table, diff, report, browser snapshot, custom. |
| `artifact.title` | User-visible label. |
| `artifact.version` | Version, revision, or checkpoint. |
| `artifact.preview` | Lightweight preview or manifest. |
| `artifact.read_ref` | Path, URL, object id, or service reference for full content. |
| `artifact.source_refs` | Tool, source, task, or turn references. |
| `artifact.status` | Creating, ready, failed, stale, superseded. |

Do not infer artifact kind from final answer text when an explicit fact is missing.

## Placement rules

| Content | Preferred placement |
| --- | --- |
| Short result | Conversation or inline preview. |
| Long report | Artifact surface with conversation summary. |
| Code or document patch | Artifact or diff surface. |
| Image/video/audio | Artifact preview with open action. |
| Browser snapshot | Artifact with source and timestamp. |
| Generated dataset | Artifact manifest and preview table. |
| Evidence pack | Evidence surface, linked from artifact when relevant. |

## Editing and versioning

Artifact edits SHOULD write through an artifact service or controlled client store. The UI SHOULD preserve:

- current version
- pending edits
- save status
- diff or patch when applicable
- source or generation turn
- export or handoff state

If an artifact edit fails, keep the last confirmed version and show unsaved changes separately.

## Artifact cards

Conversation and process surfaces may show compact artifact cards. A card SHOULD include:

- title
- kind
- status
- small preview or icon
- open action
- version or freshness when relevant
- source/evidence indicator if available

The card is an entry point, not the artifact body.

## Acceptance scenarios

1. A long generated report opens in an artifact surface and only a summary appears in conversation.
2. Artifact preview loads without blocking streamed answer text.
3. Artifact kind comes from explicit metadata; missing kind shows unknown.
4. Editing preserves version and unsaved state.
5. An artifact links back to the turn, tool, source, or evidence that produced it.
