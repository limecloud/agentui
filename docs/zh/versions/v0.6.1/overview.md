---
title: v0.6.1 概览
description: Agent UI v0.6.1 发布概览。
---

# Agent UI v0.6.1

Agent UI v0.6.1 是 patch release，用于把 UI projection 对齐 Agent Runtime profile，同时不把 runtime ownership 移入 UI 标准。

## 重点

- 新增 runtime profile projection 测试用例，覆盖 runtime ids、read model projection、tool approval、task retry、routing、evidence、replay、review、hydration 与 governance failures。
- 将 runtime event projection contract 对齐 Agent Runtime-style events、thread read models、task snapshots 与 evidence packs。
- 在公共 event schema 中加入可选 runtime profile correlation 字段。
- 刷新 README、导航、LLM entrypoints、release notes、package metadata 与 v0.6.1 版本快照。
