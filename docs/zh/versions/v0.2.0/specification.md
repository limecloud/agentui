---
title: v0.2.0 规范
description: Agent UI v0.2.0 快照。
---

# Agent UI v0.2.0 规范

v0.2.0 的规范快照与当前 [latest 规范](/zh/specification) 对齐。

## v0.2.0 变化

- 用 runtime-first projection architecture 取代早期草案模型。
- 定义 lifecycle、status、text、reasoning、tool、action、queue、artifact、evidence、state、messages 和 completion 标准事件类。
- 定义 composer、message parts、runtime status、tools、tasks、HITL、artifacts、evidence 和 sessions 标准表面。
- 定义后端协作层：summary、snapshot、window detail、timeline page、artifact preview、artifact content、evidence job、diagnostics。
- 定义 submit-to-status、first text paint、stream queue pressure、history restore 和 resource usage 性能指标。
- 增加 session hydration 和 queue/steer 行为的客户端实现指南。
- 增加 behavior-level acceptance scenarios。
- 从当前标准中移除旧的文档入口要求。

完整运行时和表面规则见 [latest 规范](/zh/specification)。
