---
title: v0.1.0 概览
description: Agent UI v0.1.0 的主要变化。
---

# v0.1.0 概览

v0.1.0 是 Agent UI 的第一个公开草案。Agent UI 是 Agent Skills 生态中的互补交互表面标准。

## 主要变化

- 引入 `AGENTUI.md` 作为 UI 模式包的必需入口。
- 定义五个标准表面：Conversation、Process、Task、Artifact、Evidence。
- 建立 projection-only runtime 边界：UI 包描述展示和控制语义，不拥有 runtime facts。
- 增加标准 `type` 和 `profile` 值，覆盖 workbench、chat-first、artifact-first、task-first 和 embedded 产品。
- 增加渐进披露、fallback states、user controls 和 acceptance scenarios 的作者指南。
- 增加 discovery、activation、runtime mapping、controlled writes 和 progressive rendering 的客户端实现指南。
- 增加基础 Agent 工作台示例和 frontmatter schema。

## 兼容性

- `AGENTUI.md` 是唯一必需入口。
- Packs 是指南，不应被执行。
- 客户端应保持 UI projection state 与 runtime、artifact、evidence facts 分离。
