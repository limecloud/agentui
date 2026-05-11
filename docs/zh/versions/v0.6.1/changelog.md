---
title: v0.6.1 变更记录
description: Agent UI v0.6.1 变更记录。
---

# v0.6.1 变更记录

## Added

- 新增英文与简体中文 Agent Runtime profile projection 测试用例，覆盖 runtime ids、read model projection、tool approval、task retry、routing、evidence、replay、review、hydration 与 governance failures。

## Changed

- 将 runtime event projection contract 对齐 Agent Runtime-style `RuntimeEvent`、`ThreadReadModel`、`TaskSnapshot` 与 `EvidencePack` 来源。
- 扩展公共 Agent UI event schema，加入可选 runtime profile correlation 字段，如 `runtimeId`、`attemptId`、`stepId`、`subagentId`、`traceId`、`evidencePackRef`、`replayRef` 与 `reviewRef`。
