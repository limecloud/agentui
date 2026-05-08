---
title: v0.4.0 Changelog
description: Changelog for Agent UI v0.4.0.
---

# v0.4.0 Changelog

## Added

- Expanded Artifact into a first-class Agent UI Artifact Workspace surface.
- Added artifact interaction contract covering artifact facts, workspace regions, cards, preview, edit/canvas, versions, diff, export, handoff, source links, and evidence links.
- Added specific artifact event classes to the public event schema: `artifact.created`, `artifact.updated`, `artifact.preview.ready`, `artifact.version.created`, `artifact.diff.ready`, `artifact.export.started`, `artifact.export.completed`, `artifact.failed`, and `artifact.deleted`.
- Added external research notes from Claude Artifacts, Vercel AI SDK `UIMessage`, assistant-ui attachments/tool UI, and OpenAI Apps SDK structured tool/widget boundaries.
- Added v0.4.0 version snapshots.

## Compatibility

- Existing clients can keep consuming `artifact.changed` while adopting the more specific artifact lifecycle events.
- Agent UI remains an interaction standard, not an artifact storage or persistence protocol.
