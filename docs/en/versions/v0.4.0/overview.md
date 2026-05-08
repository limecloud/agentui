---
title: v0.4.0 Overview
description: What changed in Agent UI v0.4.0.
---

# v0.4.0 Overview

v0.4.0 makes Artifact Workspace a first-class Agent UI surface. Conversation carries intent and explanation. Artifact Workspace carries delivery and continued work: preview, edit, versions, diff, export, handoff, and evidence-backed review.

Agent UI owns artifact interaction semantics. Artifact services own full content, storage, version persistence, export bytes, and write authority. Evidence systems own verification, replay, and review facts.

## Highlights

- Expands the former artifact canvas guidance into Artifact Workspace.
- Defines artifact workspace regions: artifact facts, artifact cards, preview, edit/canvas, version rail, diff/review, export/handoff, source links, and evidence links.
- Adds specific artifact lifecycle events for creation, update, preview readiness, version creation, diff readiness, export lifecycle, failure, and deletion.
- Keeps `artifact.changed` as a collapsed adapter event for simpler clients.
- Updates runtime projection, runtime standard, message parts, quickstart, examples, glossary, acceptance scenarios, and research sources.

## Compatibility

- Existing v0.2/v0.3 clients remain compatible if they continue projecting `artifact.changed`.
- New implementations should prefer stable artifact references and typed artifact events over prose-only transcript parsing.
- Agent UI still does not own artifact storage, artifact bytes, or authoritative write persistence.
