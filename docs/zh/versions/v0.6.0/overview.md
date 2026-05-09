---
title: v0.6.0 概览
description: Agent UI v0.6.0 发布概览。
---

# Agent UI v0.6.0

Agent UI v0.6.0 在 runtime projection 标准上新增 Team Workbench 层。本版本保留 v0.5 的 ordered parts、tool lifecycle、artifacts、evidence、context 与 hydration 规则，并标准化 team-style multi-agent work 在产品 UI 中应该如何呈现。

## Highlights

- 新增 Team Workbench surfaces：Team Roster、Work Board、Delegation Graph、Handoff Lane、Worker Notifications、Review Lane、Teammate Transcript、Background Teammate、Remote Teammate 与 Team Policy。
- 新增 team topology taxonomy，覆盖 coordinator teams、parallel workers、specialist handoffs、review teams、human/agent boards、background teammates 与 remote teammates。
- 明确 worker notifications 是内部 task/agent facts，不是真实用户消息，也不是 coordinator final prose。
- 扩展 event schema，加入 team/agent/review event classes、team surfaces、team controls、parent/child ids、topology fields、`runtimeEntity`、runtime status 与 queue/parallelism fields。
- 将独立可运行 workbench demo 扩展为 core + team scenario matrix。
- 更新 Claude Code、Codex、Lime Team Runtime、A2A、Paperclip、VitePress 与 Agent Skills 的可追溯引用。
