---
title: v0.5.0 概览
description: Agent UI v0.5.0 发布概览。
---

# Agent UI v0.5.0

Agent UI v0.5.0 将 Agent UI 全流程与分类体系提升为 latest 标准。本版本把标准从局部 progressive rendering 规则扩展为 Agent 工作台的完整 lifecycle 与 taxonomy 模型。

## 重点

- 新增完整全流程与分类参考，覆盖 session/thread lifecycle、composer、run phases、有序 message parts、tool/action loops、artifacts、evidence、task/subagent state、context、permissions、hydration、diagnostics 与 validation。
- 新增专门引用索引，追踪 Agent Skills specification 风格、AG-UI events、Vercel AI SDK、assistant-ui、LangGraph、OpenAI ChatKit/Apps SDK、Codex、Claude Code 与 Lime roadmap research。
- 扩展 public event schema，新增 taxonomy fields 以及 session、plan、tool、task、agent、context、permission、diagnostics、metrics event classes。
- 明确 active-run rendering：reasoning、tools、actions、artifacts、evidence 与 answer text 可按 typed event/part order 穿插。
- 定义 running process 在 active 时保持可见，完成后再折叠进 timeline/archive summaries。
