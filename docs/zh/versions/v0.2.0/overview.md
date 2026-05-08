---
title: v0.2.0 概览
description: Agent UI v0.2.0 的主要变化。
---

# v0.2.0 概览

v0.2.0 把 Agent UI 的方向校正到 typed events、session snapshots、artifacts、evidence 和受控用户动作。

## 主要变化

- 把 Agent UI 重新定义为 runtime projection 与 surface contract 标准。
- 新增 Composer、Message Parts、Runtime Status、Tool UI、Task Capsule、Human-in-the-loop、Artifact/Canvas、Timeline/Evidence、Session/Tabs 表面标准。
- 新增 runtime event projection 规则，把 typed runtime events 映射到 UI surfaces，而不是解析正文。
- 新增 backend coordination 指南，覆盖 summary、window detail、timeline pages、artifact preview、evidence jobs 和 diagnostics。
- 新增 first status、first text paint、stream backlog、history restore 和 resource pressure 性能指标。
- 新增 session hydration、queue/steer 和真实工作台行为验收场景。
- 新增调研来源，覆盖 AI SDK UI、assistant-ui、CopilotKit、OpenAI Apps SDK 和 ChatKit。

## 兼容性

- v0.1.0 表述已被 runtime-first 标准取代。
- 新实现应从 event projection、surface contracts、controlled writes 和 progressive hydration 开始。
