---
title: Task capsule 表面
description: running、queued、blocked、failed 和 completed Agent 工作的紧凑 UI。
---

# Task capsule 表面

Task capsule 把 Agent 工作压缩成稳定注意力层。它特别适合长任务、队列、后台 Agent，以及不应全量渲染的非活跃 session。

## 标准任务状态

| State | 含义 | 注意力 | 必需能力 |
| --- | --- | --- | --- |
| `running` | 工作活跃。 | 低 | 打开详情，支持时可 interrupt。 |
| `queued` | 工作等待中。 | 中 | 显示位置、预览，支持时可编辑/删除。 |
| `steering` | 输入正在注入当前工作。 | 中 | 显示 pending steer preview。 |
| `needs_input` | 需要用户提供信息。 | 高 | 明确 CTA 和 oldest age。 |
| `plan_ready` | 计划等待审批或编辑。 | 高 | Approve、reject、edit、inspect。 |
| `permission_required` | 风险动作需要权限。 | 高 | Approve/reject + scope 和 risk summary。 |
| `failed` | 工作失败但可能恢复。 | 高 | Retry、inspect diagnostic、export evidence。 |
| `cancelled` | 工作被有意停止。 | 低 | 安静摘要。 |
| `completed` | 工作完成。 | 低 | 摘要和 artifact/evidence links。 |
| `stale` | 超过阈值无活动。 | 中 | Inspect、interrupt 或 resume。 |

## 注意力规则

1. 普通 running work 应可见但克制。
2. `needs_input`、`plan_ready`、`permission_required`、`failed` 可使用更强视觉优先级。
3. completed tasks 默认折叠，除非产生重要 artifacts 或 evidence。
4. 点击 capsule 应在当前上下文打开详情，不应跳离用户当前工作。
5. 空间有限时，多个 capsules 应按 session、workspace 或 task group 聚合。

## Capsule 内容

Capsule SHOULD 包含：

- short label
- state
- count 或 queue position
- latest meaningful activity
- attention states 的 primary CTA
- 指向 process、artifact 或 evidence details 的链接

不要把完整 tool output、logs 或长 plan text 放进 capsule。

## 与 Session 的关系

Task capsules 可让非活跃 sessions 更轻：

- active session 可渲染完整 conversation 和 process surfaces
- recent session 可保留 snapshot 和 active capsule
- suspended session 可只保留 title、summary、task states
- discarded session 可只保留 restore metadata 和 artifact/evidence index

这样既能显示任务状态，又不强迫每个 session hydrate 完整历史。

## 验收场景

1. 两个 running tasks 以紧凑 capsules 出现，不刷屏 conversation。
2. `needs_input` task 比普通 running task 更醒目。
3. queued turn 开始前显示 preview 和 remove action。
4. 点击 capsule 在上下文中打开 task details。
5. 关闭或 suspend 非活跃 session 会释放重型 process rendering，同时保留 capsule state。
