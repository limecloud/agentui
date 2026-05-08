---
title: v0.4.0 变更记录
description: Agent UI v0.4.0 的变更记录。
---

# v0.4.0 变更记录

## Added

- 将 Artifact 扩展为 Agent UI 的一等 Artifact 工作区表面。
- 新增 artifact 交互契约，覆盖 artifact facts、workspace regions、cards、preview、edit/canvas、versions、diff、export、handoff、source links 和 evidence links。
- 在公开事件 schema 中新增具体 artifact 事件：`artifact.created`、`artifact.updated`、`artifact.preview.ready`、`artifact.version.created`、`artifact.diff.ready`、`artifact.export.started`、`artifact.export.completed`、`artifact.failed` 和 `artifact.deleted`。
- 新增来自 Claude Artifacts、Vercel AI SDK `UIMessage`、assistant-ui attachments/tool UI 和 OpenAI Apps SDK structured tool/widget boundaries 的外部调研记录。
- 新增 v0.4.0 version snapshots。

## Compatibility

- 现有客户端可以继续消费 `artifact.changed`，再逐步采用更具体的 artifact 生命周期事件。
- Agent UI 仍是交互标准，不是 artifact 存储或持久化协议。
