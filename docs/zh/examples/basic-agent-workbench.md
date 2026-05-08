---
title: 基础 Agent 工作台
description: 面向五表面 Agent workspace 的 Agent UI 包示例。
---

# 基础 Agent 工作台

这个示例展示一个小型 Agent UI pack，用于需要 chat、progress、task control、artifact editing 和 evidence review 的客户端。

## 目录

```text
basic-agent-workbench/
├── AGENTUI.md
├── surfaces/
│   ├── conversation.md
│   ├── process.md
│   ├── task.md
│   ├── artifact.md
│   └── evidence.md
├── contracts/
│   └── actions.md
└── examples/
    └── prompt-to-artifact.md
```

## `AGENTUI.md`

```markdown
---
name: basic-agent-workbench
description: A five-surface agent workspace for messages, runtime process, task control, artifacts, and evidence. Use when building a general-purpose agent client.
type: agent-workbench
profile: workbench
status: draft
version: 0.1.0
language: en
runtime:
  projectionOnly: true
  requires:
    - text-parts
    - runtime-status
    - tool-events
    - task-state
    - artifact-references
    - evidence-references
---

# Basic Agent Workbench

Use this pack when agent work may take multiple steps, call tools, create artifacts, or require user approval.

## Surfaces

- Conversation: user messages and final assistant text.
- Process: runtime status, reasoning summary, tool progress, and errors.
- Task: queue, background work, needs input, approvals, and interrupts.
- Artifact: generated deliverables, previews, diffs, and editors.
- Evidence: citations, verification, replay, and review.

## Load details

- Load `surfaces/process.md` when tool or runtime status events are visible.
- Load `surfaces/artifact.md` when an artifact reference is present.
- Load `contracts/actions.md` before wiring approval, interrupt, or artifact edit controls.
```

## 表面摘要

| Surface | Required facts | Fallback |
| --- | --- | --- |
| Conversation | user text、assistant text parts | pending message 或 empty state |
| Process | runtime status、tool events、errors | preparing、unknown 或 stale |
| Task | task id、queue state、action requests | no active tasks |
| Artifact | artifact id、kind、title、read path | unknown artifact |
| Evidence | source、verification、replay、audit refs | evidence unavailable |

## 验收流程

1. 用户提交：“Create a migration checklist and save it as a document.”
2. Conversation 立即显示用户消息。
3. Process 在 first answer text 前显示 preparing 或 routing 状态。
4. 如果工具运行，工具输出留在 Process，完成后折叠。
5. 如果需要审批，Task 显示 `needs-input`。
6. Artifact 显示生成文档，并提供 open/edit action。
7. 如果 runtime 产生证据，Evidence 显示 source 或 verification entries。
8. 最终回答总结交付物并链接 artifact；不包含 raw process logs。

## 为什么可移植

这个示例定义语义，而不是视觉皮肤。终端、IDE、桌面应用或 Web 应用可以用不同方式渲染同一组表面，同时保持相同的 runtime boundaries 和 user controls。
