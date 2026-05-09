---
title: v0.5.0 变更记录
description: Agent UI v0.5.0 变更记录。
---

# v0.5.0 变更记录

## Added

- 新增完整 Agent UI 全流程与分类参考，覆盖 session/thread lifecycle、composer、run phases、有序 message parts、tool/action loops、artifacts、evidence、task/subagent state、context、permissions、hydration、diagnostics 与 validation。
- 新增专门引用索引，追踪 Agent Skills specification 风格、AG-UI events、AI SDK UIMessage parts、assistant-ui parts、LangGraph streaming/HITL、OpenAI ChatKit thread events、Apps SDK tool UI boundaries、Codex、Claude Code 与 Lime roadmap research。
- 扩展 public event schema，新增 taxonomy fields（`owner`、`scope`、`phase`、`surface`、`persistence`、`control`）以及 session、plan、tool、task、agent、context、permission、diagnostics、metrics event classes。
- 新增 task/multi-agent state、context/compaction、diagnostics 与 metrics 验收覆盖。

## Changed

- 明确 live message part rendering：active turns 保留 typed event/part order，因此 reasoning、tools 与 answer text 可以穿插。
- 定义 running process visibility 与 completed process archiving：running tool/reasoning steps 保持可见，完成后折叠进 timeline summaries。
