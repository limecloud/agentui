---
title: v0.6.0 变更记录
description: Agent UI v0.6.0 changelog。
---

# v0.6.0 Changelog

## Added

- 新增 Team Workbench surfaces：roster、work board、delegation、handoff、worker notifications、review、teammate transcript、background teammate、remote teammate 与 team policy。
- 新增 team topology taxonomy，覆盖 coordinator teams、parallel workers、specialist handoffs、review teams、human/agent boards、background teammates 与 remote teammates。
- 新增 schema 对 team/agent/review events、team surfaces、team controls、parent/child ids 与 topology fields 的支持。
- 新增 runtime execution alignment fields：`runtimeEntity`、runtime status、team phase、queue counts 与 provider/team parallelism。
- 在独立 workbench demo 中新增可运行 team scenario matrix。

## Changed

- 将 multi-agent UI 重新收敛到 team/teammate/workbench 行为，而不是 hierarchy-first 模型。
- 明确 worker notification、coordinator synthesis、delegated approval、teammate transcript、background teammate 与 remote teammate 的投影规则。
- 更新 Claude Code、Codex、Lime Team Runtime、A2A、Paperclip、VitePress 与 Agent Skills 的引用索引。
