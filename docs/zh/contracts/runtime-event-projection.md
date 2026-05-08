---
title: Runtime event projection 契约
description: 把 runtime events 和 facts 映射到 Agent UI projection state。
---

# Runtime event projection 契约

Agent UI 客户端应消费结构化 runtime facts，并把它们投影到 surfaces。不要解析普通正文来推断状态。

## Event classes

| Event class | 典型 facts | 主 surface |
| --- | --- | --- |
| `turn.started` | turn id、session id、timestamp | Process、Task |
| `runtime.status` | stage、detail、elapsed、provider state | Runtime Status |
| `text.delta` | message id、text delta、part id | Conversation |
| `text.final` | final text、content id | Conversation reconciliation |
| `reasoning.delta` | summary 或 reasoning content | Process |
| `tool.started` | tool id、kind、input summary | Tool UI、Timeline |
| `tool.progress` | progress、partial output ref | Tool UI |
| `tool.completed` | status、output ref、duration | Tool UI、Evidence |
| `action.required` | request id、type、severity、schema | Human-in-the-loop、Task |
| `action.resolved` | request id、response summary | Human-in-the-loop、Evidence |
| `queue.changed` | queued ids、previews、order | Task Capsule、Composer |
| `artifact.created` / `artifact.updated` | artifact id、kind、status、version | Artifact 工作区 |
| `artifact.preview.ready` | artifact id、preview ref 或 preview payload | Artifact 工作区 |
| `artifact.version.created` / `artifact.diff.ready` | artifact id、version id 或 diff ref | Artifact 工作区、Timeline |
| `artifact.export.started` / `artifact.export.completed` | artifact id、export id/ref、status | Artifact 工作区、Evidence |
| `artifact.failed` / `artifact.deleted` | artifact id、error 或 unavailable state | Artifact 工作区 |
| `artifact.changed` | 折叠后的 artifact adapter event | Artifact 工作区 |
| `evidence.changed` | evidence id、status、refs | Evidence |
| `turn.completed` | outcome、final refs | Conversation、Task |
| `turn.failed` | error、retryability、diagnostic ref | Runtime Status、Task |

## Projection rules

1. Text events 只更新 conversation parts。
2. Reasoning events 只更新 process parts，除非明确导出为 answer text。
3. Tool events 更新 process 和 timeline projections；完整输出按需加载。
4. Action events 更新 task attention state 和 human-in-the-loop surfaces。
5. Artifact events 更新 artifact summaries、artifact cards、workspace panels、version rails、diff actions 和 export state。
6. Evidence events 更新 evidence surfaces 和 citation availability。
7. Queue events 更新 task capsules 和 composer state。
8. Final events reconcile content，不盲目追加重复文本。

## Identity requirements

Runtime facts SHOULD 携带稳定 identifiers：

- session id
- thread 或 conversation id
- turn id
- message id
- content part id
- task id
- queued turn id
- action request id
- tool call id
- artifact id
- evidence id

UI 可以生成临时 optimistic ids，但 runtime ids 可用后必须 reconcile。

## Unknown 和 missing facts

如果 event 缺少必需字段，UI SHOULD：

- 安全时把 raw event 保留在 diagnostics
- 渲染 unknown 或 unavailable state
- 避免从文本猜测
- 避免把不完整 facts 提升为 final evidence
- 尽可能保留用户控制

## 验收场景

1. 首文本前的 runtime status 渲染在 conversation text 外。
2. 带 `artifact.id` 的 tool event 创建链接到 tool step 的 artifact card。
3. Final event reconcile streamed answer，不产生重复。
4. 带 severity 的 action request 出现在 task capsule 和 approval UI。
5. 缺少 artifact metadata 时显示 unknown，而不是从正文猜测。
6. Artifact export event 更新 export state，不把 binary payload 复制进 message text。
