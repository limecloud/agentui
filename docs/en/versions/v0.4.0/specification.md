---
title: v0.4.0 Specification
description: Agent UI v0.4.0 snapshot.
---

# Agent UI v0.4.0 Specification

The v0.4.0 specification snapshot is aligned with the current [latest specification](/en/specification).

## v0.4.0 changes

- Promotes Artifact Workspace to a first-class Agent UI surface.
- Defines the interaction boundary between conversation, Artifact Workspace, artifact services, and evidence systems.
- Adds artifact workspace contract language for cards, preview, edit/canvas, version rail, diff/review, export/handoff, source links, and evidence links.
- Adds specific artifact event classes: `artifact.created`, `artifact.updated`, `artifact.preview.ready`, `artifact.version.created`, `artifact.diff.ready`, `artifact.export.started`, `artifact.export.completed`, `artifact.failed`, and `artifact.deleted`.
- Keeps `artifact.changed` as a collapsed adapter event for compatibility.

See the [latest specification](/en/specification) for the full runtime and surface rules.
