---
title: Queue 与 steer
description: Agent turn 运行中 follow-up input 的处理方式。
---

# Queue 与 steer

用户经常想在 Agent 已经工作时补充信息。兼容 UI 必须明确这个输入的后果。

## 模式

| Mode | 语义 | UI 后果 |
| --- | --- | --- |
| `queue` | 当前工作后新增一轮。 | Queue capsule 和可编辑预览。 |
| `steer` | 把输入传给当前运行 turn。 | 当前任务上的 pending steer preview。 |
| `new-task` | 启动独立工作。 | 新 task/session capsule 或 tab。 |
| `reject` | Runtime 不能接受输入。 | 保留草稿并说明原因。 |

## Queue contract

Queued input SHOULD 包含：

- queued id
- target session 或 task id
- preview
- creation time
- position
- mode
- 支持时的 edit/remove capability
- 状态转换：queued、started、removed、failed

Queue events 更新 Task 和 Composer surfaces，不应创建假的 assistant messages。

## Steer contract

Steer input SHOULD 包含：

- target turn id
- user text 或 structured patch
- pending state
- accepted/rejected status
- 可选 cancellation
- 与 active task 的可见关系

客户端 SHOULD 标明 steer 会影响当前工作。它不应看起来像普通 queued follow-up。

## 冲突处理

如果 runtime 不能应用 steer：

- 显示 rejected 或 unavailable state
- 保留用户输入
- 可能时提供 queue 或 new-task fallback
- 在 process surface 保留 diagnostic reason

## 验收场景

1. Running turn 中按发送，不会静默选择隐藏行为。
2. Queued follow-up 显示位置，并能在开始前移除。
3. Steer preview 在 accepted 或 rejected 前保持可见。
4. Queue mutation 更新 task capsule，不需要 full session history rehydrate。
5. Rejected steer 保留草稿并提供其他路径。
