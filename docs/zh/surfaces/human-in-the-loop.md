---
title: Human-in-the-loop 表面
description: Agent UI 的审批、权限、计划和 elicitation 模式。
---

# Human-in-the-loop 表面

随着 Agent 执行能力增强，用户介入必须建模为结构化状态，而不是普通助手正文。

## 标准请求类型

| Type | 适用场景 | 必需 UI |
| --- | --- | --- |
| `approval` | 用户必须批准或拒绝动作。 | Approve/reject 控件和 scope summary。 |
| `permission` | Runtime 需要提升能力。 | Risk、target、duration、consequence。 |
| `plan_review` | Agent 执行前生成计划。 | Approve、reject、edit、request changes。 |
| `elicitation` | Agent 需要缺失用户输入。 | Form、options 或 free text，并有清晰 prompt。 |
| `credential_needed` | 用户需要配置凭证。 | 安全跳转设置，并保留当前任务。 |
| `cost_confirmation` | 任务可能消耗显著费用、token 或时间。 | Estimate、limit 和 cancel path。 |
| `handoff_acceptance` | 用户或另一 Agent 需要接受交接。 | Summary、artifacts、evidence、accept/decline。 |

## 请求契约

Human-in-the-loop request SHOULD 包含：

- stable request id
- task 或 turn id
- request type
- title 和简洁说明
- risk 或 severity
- available responses
- expiration 或 stale policy
- response 后的 audit summary
- replay 或 evidence reference

客户端 MUST NOT 把 Markdown 句子当成高风险动作的充分权限。

## Plan UI

计划审批应是有状态对象：

- proposed steps
- scope 和 expected outputs
- risk/cost summary
- approve/reject/edit controls
- saved plan 或 artifact reference
- rejection reason 或 change request
- decision 后的 audit summary

如果 plan 被拒绝，应保留 plan 和原因，让 Agent 能带上下文修订。

## 完成行为

请求 resolved 后：

- 从 pending attention surfaces 移除
- 保留紧凑 audit summary
- 链接到 process 和 evidence surfaces
- 避免 stale sticky cards 留在主 conversation

## 验收场景

1. 高风险动作渲染为 approval UI，并包含 scope 和 consequence。
2. Approve/reject 通过 controlled runtime action 写入。
3. resolved request 折叠为摘要，不再显示为 pending。
4. rejected plan 保留 reason，并可修订。
5. credentials-needed 状态保留用户草稿和 task context。
