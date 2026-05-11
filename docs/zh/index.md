---
layout: home
title: Agent UI
description: 面向 Agent 产品的 runtime-first UI 契约。

hero:
  name: Agent UI
  text: 面向 Agent 产品的 runtime-first UI 契约。
  tagline: "把 Agent 事实投影成可控制的对话、过程、任务、产物、证据与会话表面。"
  actions:
    - theme: brand
      text: 阅读规范
      link: /zh/specification
    - theme: alt
      text: 实现快速开始
      link: /zh/authoring/quickstart
    - theme: alt
      text: 标准生态
      link: /zh/reference/agent-ecosystem
    - theme: alt
      text: 可运行示例
      link: /zh/examples/
    - theme: alt
      text: LLM 完整上下文
      link: ../llms-full.txt

features:
  - title: Runtime 投影
    details: "Agent UI 从 typed runtime events、durable snapshots、artifact facts 与 evidence facts 出发。"
  - title: 表面分离
    details: "Composer、消息、状态、工具、任务、产物、时间线、证据与会话分别回答不同用户问题。"
  - title: 受控写入
    details: "审批、中断、队列动作、转向、产物编辑与证据导出必须写回拥有这些事实的系统。"
  - title: 干净最终回答
    details: "文本、reasoning、tool、action、artifact 与 evidence 分离，避免最终回答变成过程日志。"
  - title: 渐进恢复
    details: "旧会话可先显示壳与最近消息，再加载完整 timeline、tool detail、artifact 与 evidence。"
  - title: 产品内生
    details: "标准不要求独立 UI bundle、design system、CSS 框架或 manifest pack 格式。"
---

## Agent UI 定义什么

| 契约 | 回答的问题 |
| --- | --- |
| 投影模型 | Runtime facts 如何变成用户可见 UI state，同时不变成事实权威？ |
| 消息分型 | text、reasoning、tool、action、artifact 与 evidence 如何分离渲染？ |
| 标准表面 | 哪些表面分别回答 conversation、process、task、artifact、evidence 与 session 问题？ |
| 用户动作 | 哪些按钮、审批、中断、编辑、导出和队列控制是受控写入？ |
| Hydration | 哪些内容应立即出现，哪些内容可以渐进加载？ |
| 验收 | 哪些行为级场景能证明 UI 兼容？ |

## 快速入口

- [什么是 Agent UI？](./what-is-agent-ui.md)
- [最新规范](./specification.md)
- [实现快速开始](./authoring/quickstart.md)
- [Runtime Profile 测试用例](./authoring/runtime-profile-test-cases.md)
- [可运行示例](./examples/index.md)
- [交互式工作台演示](./examples/interactive-workbench.md)
- [Runtime event projection](./contracts/runtime-event-projection.md)
- [Artifact Workspace](./surfaces/artifact-canvas.md)
- [Agent 标准生态](./reference/agent-ecosystem.md)

## 面向 AI 客户端

- [llms.txt](../llms.txt)：简洁导航索引。
- [llms-full.txt](../llms-full.txt)：当前英文核心文档合集。
- [llm.txt](../llm.txt) 与 [llm-full.txt](../llm-full.txt)：兼容别名。

## Agent 标准生态

UI 负责投影层。Runtime 负责执行事实，Artifact 系统负责交付物，Evidence 负责信任记录，Knowledge 负责 source-grounded context。
