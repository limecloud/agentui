---
title: Runtime status 表面
description: Agent UI 的标准运行态、注意力规则和首响应反馈。
---

# Runtime status 表面

Runtime Status 让 Agent 执行在首字前、流式中和完成后都可理解。目标是可信反馈，不是装饰性活动感。

## 标准状态

| State | 含义 | 注意力级别 | 默认 UI |
| --- | --- | --- | --- |
| `submitted` | 客户端已接受用户输入。 | 低 | Pending message 或 placeholder。 |
| `binding` | 事件监听或 stream binding 准备中。 | Debug | 除诊断外隐藏。 |
| `queued` | 工作排在其他任务之后。 | 中 | 带队列位置的 task capsule。 |
| `routing` | Runtime 正在选择模型、工具或路由。 | 低 | 紧凑阶段标签。 |
| `preparing` | Runtime 正在构建上下文或请求。 | 低 | 稳定状态行。 |
| `waiting_provider` | Provider request 已开始但模型事件未到。 | 超阈值后中 | 状态行 + 耗时。 |
| `streaming` | 回答文本或过程事件到达中。 | 低 | 轻量 streaming indicator。 |
| `tool_running` | 工具、命令、浏览器或外部动作运行中。 | 中 | 工具步骤摘要和可选 interrupt。 |
| `action_required` | 需要用户输入或审批。 | 高 | CTA card 和 task capsule。 |
| `retrying` | Runtime 正在重试可恢复失败。 | 中 | 重试次数和原因。 |
| `failed` | Turn 或 task 失败。 | 高 | 可恢复错误卡。 |
| `cancelled` | 用户或 runtime 取消工作。 | 低 | 安静终止态。 |
| `completed` | 工作完成。 | 低 | 折叠为摘要或隐藏。 |

## 首响应规则

客户端 SHOULD 在首个回答文本前展示可信状态。如果 runtime 暂时无法提供阶段，应显示 `submitted` 或 `preparing`，不要让用户面对冻结表面。

可信状态应绑定真实 client 或 runtime 里程碑：

- input accepted
- stream listener bound
- turn accepted
- queued
- runtime started
- provider request started
- first provider event received
- first text delta received

## 稳定状态行

状态行 SHOULD 避免布局跳动。推荐内容：

- 短状态标签
- 超过阈值后的 elapsed time
- active tool 或 queue summary
- 可用时显示 interrupt/cancel hint
- 最多两行详情，更多进入 process surface

## 注意力规则

只有这些状态 SHOULD 强烈抢占注意力：

- `action_required`
- `failed`
- `permission_required`
- `plan_ready`
- 超过阈值的 `stale_without_activity`

普通 `routing`、`preparing`、`streaming`、`tool_running` 应可见但克制。

## 诊断

状态表面 SHOULD 保留慢路径诊断：

| Metric | 含义 |
| --- | --- |
| `submit_to_status_ms` | 用户提交到首个可信状态。 |
| `submit_to_first_event_ms` | 用户提交到首个 runtime event。 |
| `submit_to_first_text_ms` | 用户提交到首个回答文本。 |
| `first_text_to_paint_ms` | 首文本后的渲染延迟。 |
| `last_event_age_ms` | 距离上个 runtime event 的时间。 |

诊断可在普通 UI 中隐藏，但应能进入开发和 evidence surface。
