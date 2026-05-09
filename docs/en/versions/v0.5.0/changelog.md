---
title: v0.5.0 changelog
description: Changelog for Agent UI v0.5.0.
---

# v0.5.0 Changelog

## Added

- Added a full Agent UI flow and taxonomy reference covering session/thread lifecycle, composer, run phases, ordered message parts, tool/action loops, artifacts, evidence, task/subagent state, context, permissions, hydration, diagnostics, and validation.
- Added a dedicated source index for traceable citations, including Agent Skills specification style, AG-UI events, AI SDK UIMessage parts, assistant-ui parts, LangGraph streaming/HITL, OpenAI ChatKit thread events, Apps SDK tool UI boundaries, Codex, Claude Code, and Lime roadmap research.
- Extended the public event schema with taxonomy fields (`owner`, `scope`, `phase`, `surface`, `persistence`, `control`) and additional session, plan, tool, task, agent, context, permission, diagnostics, and metrics event classes.
- Added acceptance coverage for task/multi-agent state, context/compaction, diagnostics, and metrics.

## Changed

- Clarified live message part rendering: active turns preserve typed event/part order, so reasoning, tools, and answer text can interleave.
- Defined running process visibility and completed process archiving: running tool/reasoning steps stay visible, then collapse into timeline summaries after completion.
