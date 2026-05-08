---
title: 快速开始
description: 创建第一个 Agent UI 包。
---

# 快速开始

本指南创建一个用于通用 Agent 工作台的小型 Agent UI pack。

## 1. 创建目录

```text
basic-agent-workbench/
├── AGENTUI.md
├── surfaces/
├── contracts/
└── examples/
```

## 2. 添加 `AGENTUI.md`

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

保持入口简短。它应该帮助客户端判断是否激活本包，以及去哪里加载更多细节。

## 3. 定义一个表面

创建 `surfaces/process.md`：

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

## 4. 单独定义动作

创建 `contracts/actions.md`：

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

## 5. 添加验收示例

创建 `examples/basic-flow.md`：

```markdown
# Basic flow

1. User submits a prompt.
2. Conversation shows the user message immediately.
3. Process shows a preparing or routing state before first answer text.
4. Tool output appears as a collapsed process item, not as final answer text.
5. Generated files appear in the Artifact surface.
6. Evidence links remain available after completion.
```

## 6. 评审本包

分享前检查：

- description 说明这个模式做什么、何时使用。
- runtime facts 和 UI projection fields 已分离。
- 每个用户动作都命名 runtime write path，或明确为 display-only。
- 大工具输出、missing facts、errors、stale status 都有 fallback。
- examples 是指南，不是强制视觉皮肤。
