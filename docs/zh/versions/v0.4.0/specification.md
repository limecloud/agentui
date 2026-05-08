---
title: v0.4.0 规范
description: Agent UI v0.4.0 快照。
---

# Agent UI v0.4.0 规范

v0.4.0 的规范快照与当前 [latest 规范](/zh/specification) 对齐。

## v0.4.0 变化

- 将 Artifact 工作区提升为 Agent UI 的一等表面。
- 定义 conversation、Artifact 工作区、artifact service 与 evidence system 之间的交互边界。
- 新增 artifact 工作区契约：cards、preview、edit/canvas、version rail、diff/review、export/handoff、source links 和 evidence links。
- 新增具体 artifact 事件类型：`artifact.created`、`artifact.updated`、`artifact.preview.ready`、`artifact.version.created`、`artifact.diff.ready`、`artifact.export.started`、`artifact.export.completed`、`artifact.failed` 和 `artifact.deleted`。
- 保留 `artifact.changed` 作为兼容性的 collapsed adapter event。

完整运行时和表面规则见 [latest 规范](/zh/specification)。
