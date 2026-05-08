---
title: v0.2.0 Overview
description: What changed in Agent UI v0.2.0.
---

# v0.2.0 Overview

v0.2.0 corrects the direction of Agent UI around runtime events, session snapshots, artifacts, evidence, and controlled user actions.

## Highlights

- Reframes Agent UI as a runtime projection and surface contract standard.
- Adds surface standards for Composer, Message Parts, Runtime Status, Tool UI, Task Capsule, Human-in-the-loop, Artifact/Canvas, Timeline/Evidence, and Session/Tabs.
- Adds runtime event projection rules that map typed runtime events into UI surfaces without parsing prose.
- Adds backend coordination guidance for summary, window detail, timeline pages, artifact preview, evidence jobs, and diagnostics.
- Adds performance metrics for first status, first text paint, stream backlog, history restore, and resource pressure.
- Adds session hydration, queue/steer, and acceptance scenarios for real workbench behavior.
- Adds research-source notes covering AI SDK UI, assistant-ui, CopilotKit, OpenAI Apps SDK, and ChatKit.

## Compatibility

- v0.1.0 wording is superseded by this runtime-first standard.
- New implementations should start from event projection, surface contracts, controlled writes, and progressive hydration.
