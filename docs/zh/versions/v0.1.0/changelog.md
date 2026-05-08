---
title: v0.1.0 变更记录
description: Agent UI v0.1.0 的变更记录。
---

# v0.1.0 变更记录

## Added

- 初始 Agent UI 标准草案。
- `AGENTUI.md` 包入口和必需 frontmatter 字段。
- 五表面模型：Conversation、Process、Task、Artifact、Evidence。
- 标准 `type` 值：agent workbench、conversation、process、task、artifact、evidence、handoff surfaces。
- 标准 `profile` 值：workbench、chat-first、artifact-first、task-first、embedded。
- Projection-only UI guidance 的运行时契约。
- 作者 quickstart 和 best practices。
- Runtime mapping 和 progressive rendering 的客户端实现指南。
- 基础 Agent 工作台示例。
- `agentui-frontmatter.schema.json` 参考 schema。
- GitHub Pages 部署 workflow。

## Compatibility

- 这是第一个公开草案。
- 后续版本应保留 `AGENTUI.md` 入口和渐进披露模型，除非 major version 明确改变它们。
