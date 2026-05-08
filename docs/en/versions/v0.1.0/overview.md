---
title: v0.1.0 Overview
description: Historical first draft, superseded by v0.2.0.
---

# v0.1.0 Overview

v0.1.0 was the first public draft of Agent UI. It introduced the idea that agent interfaces need separate conversation, process, task, artifact, and evidence surfaces.

## Superseded direction

The first draft under-specified runtime events, session hydration, and controlled actions. That direction is superseded by v0.2.0.

Use v0.1.0 only as historical context. New implementations should follow the runtime-first latest specification:

```text
typed runtime events + durable snapshots
  -> projection reducer
  -> UI surfaces
  -> controlled user actions
```

## What remains useful

- Conversation, Process, Task, Artifact, and Evidence are still useful surface categories.
- UI projection must not own runtime facts.
- Process details, tool output, artifacts, and evidence should not pollute final answer text.

## What changed after v0.1.0

- The current standard starts from runtime facts rather than document shape.
- The current standard starts from event classes, snapshots, controlled writes, progressive hydration, and acceptance scenarios.
