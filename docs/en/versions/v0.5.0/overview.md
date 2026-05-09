---
title: v0.5.0 overview
description: Agent UI v0.5.0 release overview.
---

# Agent UI v0.5.0

Agent UI v0.5.0 promotes the Agent UI flow and taxonomy into the latest standard. This release expands the standard from local progressive rendering rules into a full lifecycle and classification model for agent workbenches.

## Highlights

- Adds a complete flow and taxonomy reference for session/thread lifecycle, composer, run phases, ordered message parts, tool/action loops, artifacts, evidence, task/subagent state, context, permissions, hydration, diagnostics, and validation.
- Adds a dedicated source index for traceable citations, including Agent Skills specification style, AG-UI events, Vercel AI SDK, assistant-ui, LangGraph, OpenAI ChatKit/Apps SDK, Codex, Claude Code, and Lime roadmap research.
- Extends the public event schema with taxonomy fields and additional session, plan, tool, task, agent, context, permission, diagnostics, and metrics event classes.
- Clarifies active-run rendering: reasoning, tools, actions, artifacts, evidence, and answer text can interleave in typed event/part order.
- Defines that running process remains visible while active and collapses into timeline/archive summaries after completion.
