---
title: Quickstart
description: Create your first Agent UI pack.
---

# Quickstart

This guide creates a small Agent UI pack for a general-purpose agent workbench.

## 1. Create the directory

```text
basic-agent-workbench/
├── AGENTUI.md
├── surfaces/
├── contracts/
└── examples/
```

## 2. Add `AGENTUI.md`

```markdown
---
name: basic-agent-workbench
description: A five-surface agent workspace for messages, runtime process, task control, artifacts, and evidence. Use when building a general-purpose agent client.
type: agent-workbench
profile: workbench
status: draft
version: 0.1.0
runtime:
  projectionOnly: true
  requires:
    - text-parts
    - runtime-status
    - task-state
    - artifact-references
---

# Basic Agent Workbench

Use this pack when the client must show a long-running agent task without mixing logs into the final answer.

## Load when

- The product has a chat or command surface for agent work.
- The agent can stream status, tool progress, task state, or artifact references.
- Users need to approve, interrupt, resume, inspect, or hand off work.

## Surfaces

- Conversation: final messages and composer.
- Process: runtime status, tool progress, and errors.
- Task: queue, needs-input, plan approval, and background work.
- Artifact: generated deliverables and previews.
- Evidence: citations, verification, replay, and audit.
```

Keep this file short. It should help a client decide whether to activate the pack and where to load more detail.

## 3. Define one surface

Create `surfaces/process.md`:

```markdown
# Process surface

## Purpose

Show what the agent is doing before and between final answer updates.

## Inputs

- `runtime.status`
- `reasoning.summary`
- `tool.start`
- `tool.progress`
- `tool.end`
- `runtime.error`

## Projection

- `statusLabel`
- `activeToolSummary`
- `collapsedHistoryCount`

## Fallbacks

- If no status has arrived, show `Preparing...`.
- If a tool output is large, show a summary and open details on demand.
- If status is stale, show `No recent activity` and keep interrupt available.
```

## 4. Define actions separately

Create `contracts/actions.md`:

```markdown
# Action contract

User controls write through runtime APIs, never by editing projection state directly.

| Action | Required fact | Runtime write |
| --- | --- | --- |
| Approve plan | `action.id` | `respond_action(approve)` |
| Reject plan | `action.id` | `respond_action(reject)` |
| Interrupt | `task.id` or `turn.id` | `interrupt_task` |
| Open artifact | `artifact.id` | Read artifact through artifact service |
```

## 5. Add an acceptance example

Create `examples/basic-flow.md`:

```markdown
# Basic flow

1. User submits a prompt.
2. Conversation shows the user message immediately.
3. Process shows a preparing or routing state before first answer text.
4. Tool output appears as a collapsed process item, not as final answer text.
5. Generated files appear in the Artifact surface.
6. Evidence links remain available after completion.
```

## 6. Review the pack

Before sharing a pack, check:

- The description says what the pattern does and when to use it.
- Runtime facts and UI projection fields are separate.
- Every user action names its runtime write path or says it is display-only.
- Large tool output, missing facts, errors, and stale status have fallbacks.
- Examples are guidance, not a required visual skin.
