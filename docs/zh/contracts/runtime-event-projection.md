---
title: Runtime event projection contract
description: 把 runtime events 与 facts 映射到 Agent UI projection state。
---

# Runtime event projection contract

Agent UI 客户端消费结构化 runtime facts，并把它们投影到表面。客户端不能解析普通 prose 来推断状态。

完整 event envelope 与 taxonomy 见[全流程与分类](../reference/flow-and-taxonomy)。来源追溯见[引用索引](../reference/source-index)。

## Adapter boundary

在来源协议和 UI components 之间建立唯一 adapter layer。

Adapter MUST：

- 把 source events 归一化为 Agent UI event classes。
- 来源提供顺序时，用 `sequence` 保留 per-run 或 per-thread order。
- 可用时附带稳定 ids：`sessionId`、`threadId`、`runId`、`turnId`、`messageId`、`partId`、`toolCallId`、`actionId`、`artifactId`、`evidenceId`。
- 来源信息足够时，用 `owner`、`scope`、`phase`、`surface`、`persistence` 分类。
- 不让 raw 或 secret-bearing payload 进入正常 projection state；只保存安全摘要或 refs。

Adapter SHOULD NOT 把 provider-specific parsing 散落进 message、tool、artifact 或 timeline components。

## Event class mapping

| Source idea | Agent UI class |
| --- | --- |
| Session 或 thread metadata 创建/变化 | `session.opened`、`session.updated`、`session.hydrated` |
| Run 或 turn lifecycle start | `run.started` |
| Runtime status 或 stage update | `run.status` |
| Plan stream 或 plan complete | `plan.delta`、`plan.final` |
| Assistant answer text stream/final | `text.delta`、`text.final` |
| Reasoning/thinking stream 或 summary | `reasoning.delta`、`reasoning.summary` |
| Tool call start/input/progress/output/error | `tool.started`、`tool.args`、`tool.progress`、`tool.output.delta`、`tool.result`、`tool.failed` |
| Approval、interrupt、elicitation、structured input | `action.required`、`action.resolved` |
| Queue item 或 steer state | `queue.changed` |
| Background job、subagent、team member | `task.changed`、`agent.changed` |
| Context selection、retrieval、budget、missing context | `context.changed` |
| Memory/context compaction | `context.compaction.started`、`context.compaction.completed` |
| Permission、sandbox、policy、risk state | `permission.changed` |
| Artifact lifecycle | `artifact.created`、`artifact.updated`、`artifact.preview.ready`、`artifact.version.created`、`artifact.diff.ready`、`artifact.export.started`、`artifact.export.completed`、`artifact.failed`、`artifact.deleted`、`artifact.changed` |
| Citation、trace、review、replay、verification | `evidence.changed` |
| Durable app 或 runtime state | `state.snapshot`、`state.delta` |
| Message history repair 或 hydration window | `messages.snapshot` |
| Runtime failure | `run.failed` |
| Runtime completion、cancellation 或 interrupt | `run.finished` |
| Safe diagnostics 与 performance metrics | `diagnostic.changed`、`metric.changed` |

## Projection rules

1. Text events 只更新 conversation answer parts。
2. Reasoning events 只更新 process parts，除非显式导出为 answer text。
3. Plan events 更新 process 或 human-in-the-loop plan review surfaces。
4. Tool events 更新 inline process 与 timeline projections；full output 按需加载。
5. Action events 更新 task attention state 与 human-in-the-loop surfaces。
6. Queue、task、agent events 更新 task capsules 与 session/task surfaces。
7. Context 与 permission events 更新 context chips、status、policy controls 或 diagnostics；它们不成为 final answer text。
8. Artifact events 更新 artifact cards、workspace panels、versions、diffs 与 export state。
9. Evidence events 更新 citations、review、replay、verification 与 evidence surfaces。
10. Final events 负责 content reconciliation，不能盲目追加重复文本。

## Identity requirements

Runtime facts SHOULD 携带稳定 identifiers：

- session id
- thread or conversation id
- run id
- turn id
- message id
- content part id
- task id
- agent id
- queued turn id
- action request id
- tool call id
- artifact id
- evidence id

UI 可以生成临时 optimistic ids，但必须在 runtime ids 可用时 reconcile。

## Unknown and missing facts

如果 event 缺少 required fields，UI SHOULD：

- 安全时把 raw event 保留在 diagnostics
- 渲染 `unknown`、`unavailable`、`stale` 或 `blocked`
- 避免从 text 猜测
- 避免把不完整 facts 提升为 final evidence
- 尽量保留安全的用户控制

## Acceptance scenarios

1. First text 前的 runtime status 渲染在 conversation text 外。
2. 带 `artifactId` 的 tool event 生成 artifact card，并链接到 tool step。
3. Final event 与 streamed answer content reconcile，不重复。
4. 带 severity 的 action request 出现在 task capsules 与 approval UI。
5. 缺失 artifact metadata 时显示 `unknown`，不从 prose 猜。
6. Artifact export event 更新 export state，但不把 binary payload 复制进 message text。
7. Queued turn 更新 task capsules，不创建假 assistant prose。
8. Subagent event 更新 task/agent state，不被压平成 final answer。
9. Context compaction 创建 boundary 或 summary，不把旧 reasoning 作为 answer text 重放。
10. Safe diagnostics 可检查，但不进入正常 conversation text。
