---
title: 什么是 Agent UI？
description: Agent UI 是面向 Agent 交互表面的 runtime-first 标准。
---

# 什么是 Agent UI？

Agent UI 定义结构化 Agent 工作如何在 AI 客户端里变得可见、可控制。它与 runtime、模型流、工具、工作流、上下文存储、权限系统、产物服务、证据存储、session 和宿主产品界面协作。

适用于需要稳定 UI 语义的 Agent 产品：

- 对话和最终回答
- 流式状态和工具进度
- 排队、转向或后台任务
- 人类审批、结构化输入和中断
- 生成产物和可编辑画布
- 引用、证据、评审和重放
- Agent、用户、session、客户端之间的交接

不要用它保存模型 prompt、工具协议、业务事实、可执行工作流、产物内容、证据记录或权限策略。这些内容属于相邻的 runtime、workflow、context、artifact、evidence 或 policy 系统。

## 表面分层

| 层 | 用户问题 | 常见 UI | 运行事实来源 |
| --- | --- | --- | --- |
| `conversation` | 我和 Agent 说了什么，最终回答是什么？ | 消息、输入区、最终答复、分支控制。 | 用户输入和助手 text parts。 |
| `process` | Agent 现在在做什么？ | 状态条、推理摘要、工具步骤、时间线。 | runtime status、reasoning、tool events、errors。 |
| `task` | 哪些工作在运行、排队、阻塞或等我处理？ | task capsule、queue panel、approval card、subagent strip。 | queue、turn、task、action-required records。 |
| `artifact` | 交付物在哪里，如何继续编辑？ | canvas、preview、diff、file card、workbench。 | artifact graph、file store、generated object metadata。 |
| `evidence` | 结果能否信任、重放或审计？ | sources、evidence pack、verification、review decision。 | trace、source map、validation、replay、audit records。 |

这些层可以在同一页面渲染，也可以分布在多个面板。标准约束的是职责分离，不是固定布局。

## 投影模型

```text
runtime facts + task facts + artifact facts + evidence facts
  -> UI projection model
  -> surfaces and controlled user actions
```

UI projection 可以缓存标题、标签、折叠摘要、滚动窗口、打开面板和本地草稿。它不能成为 runtime identity、tool result、artifact contents、evidence verdict 或 permission grant 的 owner。

## 为什么需要标准？

Agent 产品会反复遇到同类 UI 问题：流式内容早于最终回答到达，工具产生大输出，用户需要审批动作，生成文件需要继续编辑，审计需要证据。如果没有共享术语，客户端很容易把这些都塞进单列消息流。

Agent UI 给产品团队和客户端实现者一套小词表，用来表达这些决策；产品可以互操作，而不需要复制同一种视觉皮肤或发明平行 runtime。
