---
title: v0.4.0 概览
description: Agent UI v0.4.0 的主要变化。
---

# v0.4.0 概览

v0.4.0 将 Artifact 工作区提升为 Agent UI 的一等表面。Conversation 承载意图与解释；Artifact 工作区承载交付与继续工作：预览、编辑、版本、diff、导出、交接，以及带 evidence 的审查。

Agent UI 拥有 artifact 交互语义。Artifact service 拥有完整内容、存储、版本持久化、导出 bytes 和写入权威。Evidence system 拥有 verification、replay 和 review facts。

## 主要变化

- 将原来的 artifact canvas 说明扩展为 Artifact 工作区。
- 定义 artifact 工作区区域：artifact facts、artifact cards、preview、edit/canvas、version rail、diff/review、export/handoff、source links 和 evidence links。
- 新增 artifact 生命周期事件，覆盖创建、更新、预览就绪、版本创建、diff 就绪、导出生命周期、失败和删除。
- 保留 `artifact.changed` 作为简单客户端可继续使用的 collapsed adapter event。
- 更新 runtime projection、runtime standard、message parts、quickstart、examples、glossary、acceptance scenarios 和 research sources。

## 兼容性

- 现有 v0.2/v0.3 客户端如果继续投影 `artifact.changed`，仍然兼容。
- 新实现应优先使用稳定 artifact references 和 typed artifact events，而不是只解析对话文本。
- Agent UI 仍不拥有 artifact 存储、artifact bytes 或权威写入持久化。
