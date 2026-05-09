---
title: 交互式工作台演示
description: 将 Agent UI runtime events 投影到标准表面的前端演示。
---

# 交互式工作台演示

这个示例是一个 live frontend projection demo。它使用一组有序 Agent UI events，并把同一批 facts 渲染到 conversation、active process、tool UI、HITL、artifact、evidence、task 与 raw event surfaces。

<ClientOnly>
  <AgentWorkbenchDemo locale="zh" />
</ClientOnly>

## 这个示例证明什么

- Runtime 工作仍在运行时，process 保持展开。
- Runtime 完成后，process 默认折叠为 archive detail。
- Reasoning、tools、HITL、artifact、evidence 与最终正文保持独立 typed parts。
- Tool state 来自 `tool.*` events，而不是 assistant prose。
- HITL 使用明确的 `action.required` -> `action.resolved` 受控路径。
- Artifact 与 evidence facts 渲染在最终回答正文之外。
- Raw ordered event stream 保持可见，方便调试与兼容性检查。

## Event sequence

演示刻意保持足够小，便于人工检查：

```text
session.opened
run.started
run.status
context.changed
plan.delta
reasoning.delta
tool.started
tool.progress
tool.result
action.required
action.resolved
text.delta
artifact.preview.ready
evidence.changed
run.finished
```

## 实现说明

生产客户端应把本地 fixture 替换成真实 runtime adapter。Reducer 行为应保持一致：先把源事件 normalize 到 Agent UI envelope，保留 active run 的 sequence order，再按 `owner`、`scope`、`phase`、`surface` 和稳定 ids 投影到各表面。

相关页面：

- [全流程与分类](../reference/flow-and-taxonomy.md)
- [Runtime event projection](../contracts/runtime-event-projection.md)
- [Message parts](../surfaces/message-parts.md)
- [Timeline 与 Evidence](../surfaces/timeline-evidence.md)
