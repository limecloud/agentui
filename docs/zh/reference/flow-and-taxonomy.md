---
title: 全流程与分类
description: Agent UI lifecycle 与 taxonomy 的完整参考。
---

# 全流程与分类

本页是 Agent UI 的完整 lifecycle 与 taxonomy 参考。写法采用规范文档风格：直接列字段、约束、生命周期阶段和验收项。调研依据集中记录在[引用索引](./source-index)。

## 核心契约

Agent UI 是 Agent 工作台的投影协议。兼容客户端消费有序 runtime facts，并把它们投影到用户可见表面，但 UI 自身不能成为这些 facts 的所有者。

兼容客户端 MUST：

- 为 active run 保留 runtime event order。
- 把最终回答文本与 reasoning、tools、actions、artifacts、evidence、status、diagnostics 分离。
- 工作运行中保持 process 可见；完成后默认归档为折叠摘要。
- 用户写操作必须通过 runtime、policy、artifact、evidence 或 session 的拥有方 API。
- 对 unknown 或 missing facts 渲染 `unknown`、`unavailable`、`stale` 或 `blocked`，不要从正文猜。
- 支持旧 session 和长任务的渐进 hydration。

兼容客户端 MUST NOT：

- 从 assistant prose 推断 tool success、permission grants、artifact kind、evidence verdicts 或 approval state。
- 在同屏把同一个 runtime fact 同时作为 expanded inline process 和 expanded timeline detail 展示。
- 在已流式输出文本后，未经 reconciliation 直接追加 final completion text。
- 把 UI collapse state、selected tab 或 local draft 当作 runtime truth。

## Lifecycle overview

标准流程是：

```text
session/thread open
  -> composer draft
  -> listener bind
  -> submit or queue or steer
  -> run accepted
  -> active turn stream
  -> tool/action loop
  -> answer/artifact/evidence production
  -> final reconciliation
  -> timeline archive
  -> hydration/repair/replay
```

该流程适用于 Web、IDE、桌面端、终端和嵌入式 assistant。视觉布局可以不同，但投影规则不能变。

## Event envelope

Agent UI event adapter SHOULD 把来源事件归一化为以下 envelope。Public JSON schema 有意保持可扩展，但这些字段是便携分类层。

| Field | Required | Constraints | Purpose |
| --- | --- | --- | --- |
| `type` | Yes | 字符串 event class。 | 驱动 reducer 行为。 |
| `sequence` | Recommended | run 或 thread stream 内单调递增。 | 保留 active-run order 与 repair。 |
| `timestamp` | Recommended | producer timestamp。 | Timeline、latency、replay。 |
| `sessionId` | Recommended | 稳定 id。 | Session 与 tab projection。 |
| `threadId` | Recommended | 与 session 不同时提供。 | Conversation recovery 与 branching。 |
| `runId` | Recommended | active work 的稳定 id。 | Runtime status 与 cancellation。 |
| `turnId` | Recommended | user turn 或 model turn 的稳定 id。 | Message/process grouping。 |
| `messageId` | Conditional | message parts 需要。 | Text reconciliation。 |
| `partId` | Conditional | 有序 message parts 可用时需要。 | 穿插式渲染。 |
| `taskId` | Conditional | background task 或 subagent 需要。 | Task capsule 与 task center。 |
| `toolCallId` | Conditional | tool lifecycle events 需要。 | Tool state 与 progress。 |
| `actionId` | Conditional | human-in-the-loop events 需要。 | Approval/input resolution。 |
| `artifactId` | Conditional | artifact events 需要。 | Artifact workspace routing。 |
| `evidenceId` | Conditional | evidence events 需要。 | Evidence/replay/review routing。 |
| `owner` | Recommended | 下文 fact owner 值之一。 | 防止 UI ownership drift。 |
| `scope` | Recommended | 下文 scope 值之一。 | 定义影响范围与持久化边界。 |
| `phase` | Recommended | 下文 phase 值之一。 | 驱动 status 与 grouping。 |
| `surface` | Optional | 主投影表面。 | 渲染 hint，不是 fact owner。 |
| `persistence` | Optional | 下文 persistence 值之一。 | Hydration 与 retention hint。 |
| `control` | Optional | 与该 fact 关联的用户动作。 | Controlled write mapping。 |
| `payload` | Optional | 结构化数据。 | Producer-owned fact body。 |
| `refs` | Optional | ids/refs 数组或映射。 | 链接 artifact、evidence、file 或 raw diagnostics。 |
| `rawEventRef` | Optional | 安全引用，不是带 secret 的原始 payload。 | Debug 与 replay，避免污染 UI。 |

最小示例：

```json
{
  "type": "tool.progress",
  "sequence": 42,
  "sessionId": "session-1",
  "threadId": "thread-1",
  "runId": "run-1",
  "turnId": "turn-1",
  "messageId": "assistant-1",
  "partId": "part-tool-1",
  "toolCallId": "tool-1",
  "owner": "tool",
  "scope": "tool_call",
  "phase": "acting",
  "surface": "tool_ui",
  "persistence": "ephemeral_live",
  "payload": {
    "label": "Searching",
    "progress": 0.4
  }
}
```

## 分类维度

### Fact owner

`owner` 描述谁写入 fact。UI projection 可以渲染 fact，但不能成为它的 writer。

| Owner | Writer | Examples |
| --- | --- | --- |
| `runtime` | Agent runtime 或 protocol adapter。 | Run lifecycle、queue、interrupts、final outcome。 |
| `model` | Model response adapter。 | Text deltas、reasoning summaries、tool call requests。 |
| `tool` | Tool runtime 或 tool adapter。 | Tool input、progress、output、errors。 |
| `action` | Runtime 或 policy action manager。 | Approval requests、structured user input、plan decisions。 |
| `artifact` | Artifact service。 | Artifact id、preview、version、diff、export state。 |
| `evidence` | Evidence、review 或 replay service。 | Citations、traces、verdicts、replay ids、review decisions。 |
| `context` | Context、memory 或 retrieval service。 | Context refs、budgets、missing context、compaction。 |
| `policy` | Policy、permission、sandbox 或 security service。 | Risk、permission mode、sandbox、waiver、retention。 |
| `task` | Task scheduler 或 subagent runtime。 | Background job、subagent、team task、queue item。 |
| `session` | Session/history service。 | Thread metadata、hydration cursor、stale state。 |
| `diagnostics` | Runtime 或 client diagnostics channel。 | 非用户正文的 debug 与 performance records。 |
| `ui_projection` | Client UI controller only。 | Collapse state、focused tab、local draft、selected artifact。 |

### Scope

`scope` 描述 fact 影响的最小稳定实体。

| Scope | Use when |
| --- | --- |
| `application` | 全局健康、provider availability 或 account state。 |
| `workspace` | Workspace-local context、policy 或 artifact store state。 |
| `session` | Chat session、task session 或 app tab。 |
| `thread` | 可恢复或可 branch 的 conversation thread。 |
| `run` | 一次 runtime execution boundary。 |
| `turn` | thread 内的一次 user turn 或 model turn。 |
| `message` | 一条 user、assistant、system 或 tool message。 |
| `part` | 一个有序 message part。 |
| `task` | Queue item、background job 或 subagent task。 |
| `agent` | Child agent、collaborator 或 team member。 |
| `tool_call` | 一次 tool invocation。 |
| `action_request` | 一次 human-in-the-loop request。 |
| `artifact` | 一个 durable deliverable。 |
| `evidence` | 一个 evidence、trace、replay、review 或 citation entity。 |

### Phase

`phase` 描述 fact 在 run lifecycle 中的位置。

| Phase | Meaning | Typical events |
| --- | --- | --- |
| `draft` | 用户正在本地输入。 | 只有持久化 draft 才使用 `state.delta`。 |
| `submitted` | UI 已提交或排队输入。 | `run.started`、`queue.changed`。 |
| `accepted` | Runtime 已接受任务。 | `run.status`。 |
| `routing` | Runtime 正在选择 model、mode、tool surface 或 worker。 | `run.status`、`task.changed`。 |
| `preparing` | Runtime 正在组装 context 或 request。 | `run.status`、`context.changed`。 |
| `planning` | Agent 正在生成或更新计划。 | `plan.delta`、`plan.final`。 |
| `reasoning` | 正在产生 reasoning/thinking。 | `reasoning.delta`、`reasoning.summary`。 |
| `acting` | Tool、command、browser、workflow 或 subagent 正在运行。 | `tool.*`、`task.changed`、`agent.changed`。 |
| `waiting` | Runtime 被用户、权限、依赖或队列阻塞。 | `action.required`、`queue.changed`、`run.status`。 |
| `producing` | 正在产生最终文本、artifact 或 evidence。 | `text.delta`、`artifact.*`、`evidence.changed`。 |
| `reconciling` | 正在合并 streamed facts 与 final facts。 | `text.final`、`messages.snapshot`。 |
| `completed` | 拥有系统报告成功。 | `run.finished`、`tool.result`。 |
| `failed` | 拥有系统报告失败。 | `run.failed`、`tool.failed`、`artifact.failed`。 |
| `cancelled` | 用户或 runtime 取消任务。 | `run.finished`、`task.changed`。 |
| `interrupted` | 工作停止，但可从 bookmark 恢复。 | `run.finished`、`state.snapshot`。 |
| `archived` | 完成后的详情进入 timeline summary。 | `messages.snapshot`、`evidence.changed`。 |
| `hydrating` | Client 正在从 snapshot/history 恢复状态。 | `session.hydrated`、`messages.snapshot`。 |

### Surface

`surface` 是渲染目的地，不是 owner。

| Surface | Responsibility |
| --- | --- |
| `composer` | Draft、attachments、context chips、mode、queue/steer intent。 |
| `conversation` | 用户消息与助手最终回答文本。 |
| `inline_process` | Active-run reasoning、tool progress、actions 与 status，按 event order 展示。 |
| `runtime_status` | Accepted/routing/preparing/streaming/blocked/retrying/failed/done 状态。 |
| `tool_ui` | Tool input summary、live progress、output preview、detail link。 |
| `hitl` | Approve、reject、edit、answer 或 structured input controls。 |
| `task_capsule` | Running、queued、failed、needs-input、subagent、team 与 background jobs。 |
| `artifact_workspace` | Artifact preview、edit/canvas、version、diff、export、handoff。 |
| `timeline_evidence` | Process archive、citations、verification、replay、review、audit。 |
| `session_tabs` | Active、pinned、stale、unread、hydrated、running sessions。 |
| `diagnostics` | Debug payloads、performance metrics、raw event refs。 |

### Persistence

| Persistence | Meaning |
| --- | --- |
| `ephemeral_live` | 只在 run active 时有价值。 |
| `transcript` | 作为 conversation history 恢复。 |
| `snapshot` | 存为有界 recent state 或 session summary。 |
| `archive` | 存为 timeline/process history。 |
| `artifact_store` | 由 artifact service 存储。 |
| `evidence_pack` | 由 evidence/replay/review service 存储。 |
| `diagnostics_log` | 只用于 debug 或性能分析。 |
| `ui_local` | Client-only local state。 |

### User control

| Control | Required write boundary |
| --- | --- |
| `send` | Runtime submit API。 |
| `queue` | Runtime queue API。 |
| `steer` | Runtime steer/resume API。 |
| `interrupt` | Runtime interrupt API。 |
| `approve` / `reject` | Runtime 或 policy action response API。 |
| `answer` | Runtime action response API for structured input。 |
| `edit` | Artifact service 或 runtime action API。 |
| `retry` | Runtime retry、tool retry 或 artifact retry API。 |
| `rollback` | Artifact 或 session history API。 |
| `export` | Artifact 或 evidence export API。 |
| `open_detail` | 只读 session、artifact、evidence 或 diagnostics API。 |

## 标准事件类

Event class list 可扩展。以下类是便携 baseline。

| Class | Purpose |
| --- | --- |
| `session.opened` | Client 或 runtime 建立 session/thread surface。 |
| `session.hydrated` | Snapshot 或 history window 已应用。 |
| `session.updated` | Title、status、unread、pinned、stale 或 cursor 变化。 |
| `session.closed` | Session/tab 被关闭或冻结。 |
| `run.started` | Runtime execution boundary 已开始或已接受。 |
| `run.status` | Runtime status phase 变化。 |
| `run.finished` | Runtime 以 success、cancellation 或 interrupt 结束。 |
| `run.failed` | Runtime 失败，并可暴露 retryability/diagnostics。 |
| `plan.delta` / `plan.final` | Plan text 或 structured plan 变化。 |
| `text.delta` / `text.final` | Assistant answer text 流式输出并 reconcile。 |
| `reasoning.delta` / `reasoning.summary` | Reasoning/thinking 在最终文本之外流式输出或总结。 |
| `tool.started` | 建立 tool call boundary。 |
| `tool.args` | Tool input 可用或 streaming input 变化。 |
| `tool.progress` | Tool progress 或 partial output reference 变化。 |
| `tool.output.delta` | Tool output 在 typed channel 中流式输出。 |
| `tool.result` | Tool 成功完成并返回 output 或 output reference。 |
| `tool.failed` | Tool 以错误完成。 |
| `action.required` / `action.resolved` | Runtime 因用户或 policy 决策暂停，然后恢复。 |
| `queue.changed` | Queued turns、steer state 或 queue order 变化。 |
| `task.changed` | Background task、subagent 或 team task 变化。 |
| `agent.changed` | Child agent/collaborator 状态变化。 |
| `context.changed` | Context selection、budget、retrieval 或 missing context 变化。 |
| `context.compaction.started` / `context.compaction.completed` | Memory/context compaction boundary。 |
| `permission.changed` | Policy、sandbox、approval、waiver 或 risk projection 变化。 |
| `artifact.created` / `artifact.updated` | Artifact 被创建或更新。 |
| `artifact.preview.ready` | Artifact preview 可用。 |
| `artifact.version.created` / `artifact.diff.ready` | Artifact version 或 diff 可用。 |
| `artifact.export.started` / `artifact.export.completed` | Artifact export lifecycle。 |
| `artifact.failed` / `artifact.deleted` | Artifact failure 或 deletion。 |
| `artifact.changed` | specific artifact events 不可用时的折叠 adapter event。 |
| `evidence.changed` | Citation、trace、verification、replay、review、audit 或 source map 变化。 |
| `state.snapshot` / `state.delta` | 外部应用状态或 durable runtime state 同步。 |
| `messages.snapshot` | Message history window 或 repair snapshot 同步。 |
| `diagnostic.changed` | Safe diagnostics 变化。 |
| `metric.changed` | Performance 或 responsiveness metric 变化。 |

## Message part taxonomy

Message parts 是有序序列。Client SHOULD 按 active parts arrival order 渲染，完成后可归档为折叠 timeline。

| Part | Owner | Default surface | Rule |
| --- | --- | --- | --- |
| `user_text` | `session` 或 `runtime` | `conversation` | submit 后乐观展示，后续 reconcile ids。 |
| `assistant_text` | `model` 或 `runtime` | `conversation` | 只用于最终回答。 |
| `reasoning_summary` | `model` 或 `runtime` | `inline_process` | 运行中可见；完成后折叠。 |
| `reasoning_detail` | `model` 或 `runtime` | `inline_process` | 仅在 provider policy 与用户设置允许时展示。 |
| `plan` | `model` 或 `runtime` | `inline_process` 或 `hitl` | 需要审批时使用 plan decision UI。 |
| `runtime_status` | `runtime` | `runtime_status` | 紧凑状态，不作为 prose。 |
| `tool_call` | `model` 或 `tool` | `tool_ui` | 展示安全输入摘要和运行态。 |
| `tool_result` | `tool` | `tool_ui` | 展示 preview/ref；完整 output 按需加载。 |
| `action_required` | `action` 或 `policy` | `hitl` | 带 stable request id 的明确 CTA。 |
| `artifact_ref` | `artifact` | `artifact_workspace` | Conversation/process 中是紧凑卡片，正文进入 workspace。 |
| `evidence_ref` | `evidence` | `timeline_evidence` | 只有 evidence facts 支撑时才展示 citation/trace/review link。 |
| `context_event` | `context` | `inline_process` 或 `diagnostics` | Budget、retrieval、missing context 或 compaction summary。 |
| `agent_task` | `task` | `task_capsule` | Subagent/team/background job 摘要。 |
| `file_change` | `artifact` 或 `tool` | `artifact_workspace` 或 `timeline_evidence` | Diff/review surface，不放最终 prose。 |
| `error` | Owning system | `runtime_status`、`tool_ui` 或 `task_capsule` | 可恢复 diagnostic 与下一步动作。 |
| `diagnostic` | `diagnostics` | `diagnostics` | 默认从正常 transcript 隐藏。 |

## Tool lifecycle

如果来源协议提供，tool call SHOULD 经过这些状态。

| State | Event mapping | UI rule |
| --- | --- | --- |
| `input-streaming` | `tool.args` | 只展示有用且非敏感的部分安全输入。 |
| `input-available` | `tool.args` | 展示稳定安全输入摘要。 |
| `running` | `tool.started` 或 `tool.progress` | active 时保持可见并展开。 |
| `progress` | `tool.progress` 或 `tool.output.delta` | 更新 row、progress bar、preview 或 partial output ref。 |
| `output-available` | `tool.result` | 折叠为 completed row，带 output preview/ref。 |
| `output-error` | `tool.failed` | 展示可恢复 error row。 |
| `cancelled` | `tool.failed` 或带 cancellation 的 `run.finished`。 | 除非需要用户动作，否则安静展示取消。 |

大输出 MUST offload 到 detail ref 或 artifact/evidence ref。Raw secrets MUST 在进入 projection state 前脱敏。

## Human-in-the-loop taxonomy

| Action type | Owner | Required UI |
| --- | --- | --- |
| `tool_approval` | `policy` 或 `runtime` | Approve/reject，带 tool name、scope、risk 和 safe input。 |
| `plan_decision` | `runtime` | 接受、拒绝或要求修改 proposed plan。 |
| `structured_input` | `action` | 带 stable schema 与 request id 的 form/options。 |
| `clarification` | `runtime` | 回答问题，但不能假装 run 已完成。 |
| `permission_grant` | `policy` | Runtime 确认后的限时/限域 permission state。 |
| `credential_request` | `policy` 或 secret store | 绝不在 message text 或 diagnostics 暴露 secret values。 |
| `artifact_review` | `artifact` 或 `evidence` | Review diff、version、export 或 handoff result。 |

UI MUST 只在 owning runtime 或 policy system 确认后，才把 action 标为 resolved。

## Task 与 multi-agent taxonomy

Agent UI SHOULD 把长任务从 conversation transcript 分离出来分类。

| Item | Scope | Default surface | Status values |
| --- | --- | --- | --- |
| Queued turn | `task` | `task_capsule` | `queued`、`promoted`、`removed`、`started`。 |
| Background job | `task` | `task_capsule` | `running`、`blocked`、`failed`、`completed`。 |
| Subagent | `agent` | `task_capsule` 或 `session_tabs` | `spawning`、`running`、`waiting`、`failed`、`completed`。 |
| Team/collaboration | `agent` | `task_capsule` 或 team panel | `invited`、`active`、`handed_off`、`done`。 |
| Review mode | `task` 或 `evidence` | `timeline_evidence` | `entered`、`exited`、`decision_recorded`。 |

Conversation text 可以说明 task outcome，但 task status 本身属于 task/runtime facts。

## Context、memory 与 compaction taxonomy

| Fact | Owner | UI rule |
| --- | --- | --- |
| Context reference | `context` | 展示为 context chip、source ref 或 tool/detail link。 |
| Context budget | `context` | 展示低噪声 budget meter 或 warning。 |
| Missing context | `context` | 展示 `blocked` 或 `unknown`，不要伪造可用性。 |
| Retrieval result | `context` 或 `tool` | Source ids/citations 与 final text 分离。 |
| Memory write | `context` | 只有用户可见 policy 要求时才展示。 |
| Compaction boundary | `context` | 展示紧凑边界或摘要；保留 resume metadata。 |

## Permission 与 security taxonomy

| Fact | Owner | UI rule |
| --- | --- | --- |
| Risk level | `policy` | 仅在影响用户控制或 required approval 时展示。 |
| Sandbox/access mode | `policy` | 展示当前约束和 escalation requests。 |
| Approval state | `policy` 或 `runtime` | 不从 prose 推断；必须有 action confirmation。 |
| Secret-bearing payload | `policy` 或 secret store | 不持久化进 projection state；使用 refs/redaction。 |
| Retention/waiver | `policy` | 只展示 durable policy facts 或 evidence refs。 |

## Hydration 与 repair

兼容客户端 SHOULD 按顺序恢复：

1. 渲染 shell、tab、title 和轻量 snapshot。
2. 应用 recent message window。
3. 应用 current run status、queue、pending action 和 task summary。
4. 应用 compact process/timeline/artifact/evidence references。
5. Full tool output、artifact body、evidence payload 和 older history 按需加载。

Hydration events MUST stale-safe。用户切换 session 后，迟到 hydration result 不得覆盖 active view。

## Validation checklist

兼容实现 SHOULD 通过这些检查：

1. Listener binding 早于 submit。
2. Runtime accepted/routing/preparing status 可在 first text 前渲染。
3. Active message parts 按 event/part order 渲染。
4. Running reasoning 与 tools 保持可见；completed process 折叠为 summaries。
5. Final answer text 保持干净，并且 reconciliation 不重复。
6. Tool input/progress/output/error state 不进入 final answer text。
7. Human-in-the-loop actions 使用 stable ids 与 controlled write APIs。
8. Queue 与 steer 在视觉和语义上可区分。
9. Artifact body 默认在 Artifact Workspace，而不是 transcript。
10. Evidence、replay、review 与 citations 链接到 evidence facts。
11. Multi-agent 与 background tasks 使用 task/agent facts，不靠 assistant prose。
12. Context 与 compaction 作为 facts 或 boundaries 展示，不是隐藏文本突变。
13. Missing facts 渲染诚实 fallback states。
14. Old sessions 渐进 hydrate，并安全忽略 stale results。
15. Diagnostics 与 metrics 保持在正常 conversation text 之外。
