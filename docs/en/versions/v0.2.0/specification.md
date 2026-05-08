---
title: v0.2.0 Specification
description: Agent UI v0.2.0 snapshot.
---

# Agent UI v0.2.0 Specification

The v0.2.0 specification snapshot is aligned with the current [latest specification](/en/specification).

## v0.2.0 changes

- Replaces the early draft model with a runtime-first projection architecture.
- Defines standard event classes for lifecycle, status, text, reasoning, tool, action, queue, artifact, evidence, state, messages, and completion.
- Defines standard surfaces for composer, message parts, runtime status, tools, tasks, HITL, artifacts, evidence, and sessions.
- Defines backend coordination layers: summary, snapshot, window detail, timeline page, artifact preview, artifact content, evidence job, and diagnostics.
- Defines performance metrics for submit-to-status, first text paint, stream queue pressure, history restore, and resource usage.
- Adds client implementation guidance for session hydration and queue/steer behavior.
- Adds acceptance scenarios as behavior-level validation.
- Removes the old document-entrypoint requirement from the current standard.

See the [latest specification](/en/specification) for the full runtime and surface rules.
