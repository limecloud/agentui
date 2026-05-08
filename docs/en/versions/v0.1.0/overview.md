---
title: v0.1.0 Overview
description: What changed in Agent UI v0.1.0.
---

# v0.1.0 Overview

v0.1.0 is the first public draft of Agent UI, a companion interaction-surface standard in the Agent Skills ecosystem.

## Highlights

- Introduces `AGENTUI.md` as the required entrypoint for UI pattern packs.
- Defines five standard surfaces: Conversation, Process, Task, Artifact, and Evidence.
- Establishes the projection-only runtime boundary: UI packs describe display and control semantics, not runtime fact ownership.
- Adds standard `type` and `profile` values for workbench, chat-first, artifact-first, task-first, and embedded products.
- Adds authoring guidance for progressive disclosure, fallback states, user controls, and acceptance scenarios.
- Adds client implementation guidance for discovery, activation, runtime mapping, controlled writes, and progressive rendering.
- Adds a basic agent workbench example and a frontmatter schema.

## Compatibility

- `AGENTUI.md` is the only required entrypoint.
- Packs are guidance and should not be executed.
- Clients should keep UI projection state separate from runtime, artifact, and evidence facts.
