---
title: Composer 表面
description: Agent UI 输入区的输入、上下文、模式、队列和 steer 语义。
---

# Composer 表面

Composer 是用户在 Agent 执行前和执行中的控制点，不只是文本框。它应暴露任务目标、上下文、执行模式、权限边界和运行中补充输入的语义。

## 目的

Composer SHOULD 回答：

1. Agent 将处理什么目标？
2. 哪些上下文会进入本轮？
3. 使用什么执行模式或权限边界？
4. 如果已有任务在运行，新输入是排队下一轮，还是转向当前任务？
5. 用户在切换会话后能否恢复草稿、附件和 pending input？

## 标准输入

| 输入 | 含义 | UI 指南 |
| --- | --- | --- |
| `prompt.text` | 用户编写的指令。 | 保留多行编辑、批量粘贴和 IME 行为。 |
| `context.refs` | 文件、页面、产物、会话、任务或选中文本。 | 渲染为可移除 chip，并使用稳定标签。 |
| `attachments` | 图片、文档、音频、截图或结构化文件。 | 显示类型、大小、上传状态和失败。 |
| `execution.mode` | plan、act、safe、research、write、review 或自定义模式。 | 使用紧凑 mode chip；高风险工作不要隐藏默认值。 |
| `permission.policy` | 只读、写入前询问、允许网络、允许命令等。 | 提交前显示高风险能力。 |
| `model.route` | 模型、provider、effort 或成本策略。 | 可选且紧凑，不阻塞普通任务。 |
| `context.budget` | token、记忆或 workspace 预算。 | 低噪声显示；截断前告警。 |
| `draft.state` | 未保存、已排队、steering、已提交或失败草稿。 | 会话切换和提交失败后仍保留。 |

## Queue 与 steer

任务运行中继续输入时，语义 MUST 明确。

| 模式 | 含义 | 必需 UI 行为 |
| --- | --- | --- |
| `queue` | 当前 turn 完成后发送。 | 显示队列位置、预览、编辑/删除动作。 |
| `steer` | 注入当前正在运行的 turn。 | 明确影响当前任务；在接受或拒绝前保持 pending steer 可见。 |
| `new-task` | 启动独立工作。 | 创建或选择独立 task/session surface。 |
| `blocked` | 当前不能接受输入。 | 说明原因并保留草稿。 |

客户端 SHOULD NOT 在用户按 Enter 后静默猜测 queue 或 steer。应选择默认值、标注默认值，并提供切换路径。

## Slash commands 和 mentions

Slash commands、mentions 和 context chips 是结构化上下文选择器，不是普通文本装饰。

- Slash commands SHOULD 映射到 capability、template、mode 或 workflow id。
- Mentions SHOULD 解析为 file id、artifact id、task id、URL 或选区。
- 未解析 mention MUST 显示为未解析，不应作为权威上下文发送。
- 自动补全面板 SHOULD 支持键盘导航，并且不破坏 IME composition。

## 草稿恢复

健壮 Composer SHOULD 保留：

- 当前文本草稿
- queued draft
- pending steer preview
- attachments 和上传状态
- selected context refs
- mode 和 permission chips
- failed-submit diagnostic

至少，切换 session 或打开 artifact 不应在没有明确用户动作时丢弃草稿。

## 验收场景

1. 提交 prompt 后，用户消息或 draft preview 立即可见。
2. 添加文件 mention 后生成可移除 context chip，并显示稳定标签。
3. turn 运行中发送 follow-up 时明确进入 queue 或 steer 模式。
4. queued item 开始前可编辑或删除。
5. submit 失败后保留 prompt、attachments 和 selected mode。
6. 高风险权限变化在提交前可见。
