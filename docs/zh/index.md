---
layout: home

hero:
  name: Agent UI
  text: 面向 Agent 产品的 runtime-first UI 契约。
  tagline: "把 Agent 事件投影成可控制的对话、过程、任务、产物和证据表面。"
  actions:
    - theme: brand
      text: 阅读规范
      link: /zh/specification
    - theme: alt
      text: 实现快速开始
      link: /zh/authoring/quickstart

features:
  - title: 运行时投影
    details: "Agent UI 从 typed events 和 durable snapshots 出发，而不是从 Markdown manifest 或视觉皮肤出发。"
  - title: 消息分型
    details: "Text、reasoning、tool calls、action requests、artifacts 和 evidence 分离，最终回答保持干净。"
  - title: 用户控制
    details: "审批、中断、排队、转向、产物编辑和证据导出都是一等受控写入。"
  - title: 渐进恢复
    details: "旧会话应先显示 shell 和最近消息，再按需加载 timeline、tool、artifact 和 evidence 详情。"
  - title: 表面分离
    details: "Composer、Runtime Status、Tool UI、Task Capsule、Artifact/Canvas、Timeline/Evidence、Session/Tabs 分别回答不同用户问题。"
  - title: 产品内生
    details: "契约可以直接落在既有产品里；不要求独立 UI bundle 或 manifest。"
---

## 运行时形态

Agent UI 定义 Agent runtime 与产品界面之间的投影层。

```text
agent events + session snapshots + artifact facts + evidence facts
  -> projection reducer
  -> UI projection state
  -> user-visible surfaces
  -> controlled write actions
```

当 Agent 产品不只是展示纯 transcript 时，这个标准才有价值：

| 用户问题 | 表面 |
| --- | --- |
| 我问了什么，最终回答是什么？ | Conversation / Message Parts |
| Agent 是否还活着、等待中、调用工具或被阻塞？ | Runtime Status / Tool UI |
| 什么在排队、运行、等待输入或失败？ | Task Capsule / Session Tabs |
| 交付物在哪里，能否继续编辑？ | Artifact / Canvas |
| 结果能否验证、评审、重放或交接？ | Timeline / Evidence |

## 核心规则

兼容客户端 SHOULD：

- 消费结构化事件，而不是从正文猜状态。
- 分离 runtime facts、artifact facts、evidence facts 和 UI projection state。
- 对最终文本做 reconcile，避免流式内容完成后重复追加。
- 除非明确导出，否则 reasoning 和 process detail 不进入最终回答正文。
- 把 tool input/output 渲染为可压缩、可检查的过程 UI，并对大输出做 offload。
- 信息缺失时诚实显示 `unknown`、`unavailable`、`stale`、`blocked` 或 `needs-input`。
- 所有会改变状态的用户动作都必须通过 runtime、artifact 或 evidence API 写入。

## 与 Skills 和 Knowledge 的边界

Skills 保存可执行流程。Knowledge 保存有来源的上下文。Agent UI 保存表面语义、事件映射、交互状态和验收检查。

三者可以服务同一个任务，但信任契约必须分开：执行属于 Skills，事实属于 Knowledge 或 runtime store，呈现属于 Agent UI。
