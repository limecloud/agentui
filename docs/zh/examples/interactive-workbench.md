---
title: 交互式工作台 demo
description: 独立 Agent UI workbench demo 说明。
---

# 交互式工作台 demo

交互式工作台不再嵌入在这个文档页面中。打开独立 demo 后，可以运行 event stream、切换场景、审批 HITL actions、编辑/导出 artifacts，并检查 projected state。

<p>
  <a class="VPButton medium brand" href="../../examples/agent-workbench/?lang=zh">打开独立 Agent UI Workbench demo</a>
</p>

## Demo 展示内容

- Runtime work 活跃时，running process 保持展开。
- Completed process 默认折叠到 archive detail。
- Reasoning、tools、HITL、artifact、evidence 与 final text 保持独立 typed parts。
- Tool state 来自 `tool.*` events，而不是 assistant prose。
- HITL 使用明确的 `action.required` -> `action.resolved` control path。
- Artifact 与 evidence facts 路由到最终回答正文之外。
- Ordered event stream 保持可见，用于 debugging 与 conformance checks。

## 相关页面

- [可运行示例](./index.md)
- [全流程与分类](../reference/flow-and-taxonomy.md)
- [Runtime event projection](../contracts/runtime-event-projection.md)
