---
title: v0.6.0 overview
description: Agent UI v0.6.0 release overview.
---

# Agent UI v0.6.0

Agent UI v0.6.0 adds the Team Workbench layer to the runtime projection standard. The release keeps ordered parts, tool lifecycle, artifacts, evidence, context, and hydration rules from v0.5, then standardizes how team-style multi-agent work should appear in product UI.

## Highlights

- Adds Team Workbench surfaces: Team Roster, Work Board, Delegation Graph, Handoff Lane, Worker Notifications, Review Lane, Teammate Transcript, Background Teammate, Remote Teammate, and Team Policy.
- Adds team topology taxonomy for coordinator teams, parallel workers, specialist handoffs, review teams, human/agent boards, background teammates, and remote teammates.
- Clarifies that worker notifications are internal task/agent facts, not real user messages and not coordinator final prose.
- Extends the event schema with team/agent/review event classes, team surfaces, team controls, parent/child ids, topology fields, `runtimeEntity`, runtime status, and queue/parallelism fields.
- Expands the standalone runnable workbench demo into a core + team scenario matrix.
- Updates traceability with Claude Code, Codex, Lime Team Runtime, A2A, Paperclip, VitePress, and Agent Skills references.
