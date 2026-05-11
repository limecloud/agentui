---
title: Runtime Profile 测试用例
description: 验证 Agent Runtime 风格事实如何投影到 Agent UI，同时不生成 UI 自有 runtime truth。
---

# Runtime Profile 测试用例

当产品来源兼容 Agent Runtime、Lime AgentRuntime Profile 或等价 runtime 主链时，使用这些用例。目标不是测试 runtime 实现本身，而是证明 Agent UI 只投影 runtime facts，不创建第二套事实源。

## 标准投影链

```text
RuntimeEvent / ThreadReadModel / TaskSnapshot / EvidencePack
  -> Agent UI adapter
  -> projection store
  -> status、task、tool、HITL、timeline、evidence、review、replay、team surfaces
  -> controlled writes back to runtime、artifact、policy 或 evidence owners
```

如果 UI state 发明了无法追溯到 runtime、artifact、policy 或 evidence facts 的 status、approval、tool success、evidence verdict、known gaps 或 task completion，测试必须失败。

## 来源 fixtures

当 Agent Runtime fixtures 可用时，把它们映射为 Agent UI projection 断言：

| Runtime fixture | 需要验证的 UI surfaces | 必须得到的投影结果 |
| --- | --- | --- |
| `submit-turn-event.json` | Runtime status、message shell、task capsule | 首个 text 前展示已接受工作，并保留 `sessionId/threadId/turnId`。 |
| `tool-approval-action-required-event.json` | Human-in-the-loop、task attention、tool UI | 审批卡使用 `actionId/toolCallId`；UI 不能乐观执行工具。 |
| `task-retry-attempt-failed-event.json` | Task capsule、timeline evidence | 失败 attempt 保持可见，retry state 不覆盖历史。 |
| `routing-single-candidate-event.json` | Runtime status、model chip、diagnostics | 单候选路由作为 runtime fact 解释，不写进最终回答正文。 |
| `evidence-export-event.json` | Timeline/evidence、review、replay | Evidence、replay、review refs 指向同一事实来源。 |
| `thread-read-snapshot.json` | Session hydration、status、task capsule | UI 可直接从 snapshot hydrate，不重新计算 runtime truth。 |

## Identity preservation

| ID | 用例 | 输入 | 期望结果 |
| --- | --- | --- | --- |
| AUI-AR-ID-001 | 保留 runtime 主链 id | 来源事件携带 `runtimeId/sessionId/threadId/turnId` | Projection 在 status、task、timeline records 上保留这些 ids。 |
| AUI-AR-ID-002 | 保留 task/run/attempt id | 来源事件携带 `taskId/runId/attemptId` | Task capsule 与 timeline 能链接 active attempt 与历史 attempts。 |
| AUI-AR-ID-003 | 保留 tool/action id | 来源事件携带 `toolCallId/actionId` | Tool row、approval card、evidence timeline 通过同一 ids join。 |
| AUI-AR-ID-004 | 保留 evidence trace id | 来源事件携带 `evidenceId/traceId/evidencePackRef` | Evidence surface 链接 durable details，不复制完整 payload。 |
| AUI-AR-ID-005 | 保留 parent/child lineage | 来源事件携带 `parentSessionId/parentThreadId/subagentId` | Delegation graph 与 teammate transcript 在 hydration 后仍保留 lineage。 |

## Status 与 read model projection

| ID | 用例 | 来源事实 | 期望结果 |
| --- | --- | --- | --- |
| AUI-AR-READ-001 | 首文本前展示 accepted | `turn.submitted` 或 accepted read model | `text.delta` 前 runtime status 显示 accepted/preparing。 |
| AUI-AR-READ-002 | Running turn | `turn.started` / read model 中 active turn | Status 与 task capsule 显示 running；不伪造 final answer。 |
| AUI-AR-READ-003 | 等待权限 | read model 中有 `action.required` | HITL surface 出现，task attention state 进入 waiting/needs-input。 |
| AUI-AR-READ-004 | Turn 完成 | `turn.completed` 与 snapshot update | Status reconcile 为 completed，process details 归档到 timeline。 |
| AUI-AR-READ-005 | Turn 失败 | `turn.failed` 并带 failure category | Status、task capsule、timeline 显示失败；最终回答不能声称成功。 |
| AUI-AR-READ-006 | 缺少来源字段 | Snapshot 缺少可选 routing 或 evidence summary | UI 显示 unknown/unavailable，并把 diagnostics 保持在安全通道。 |

## Tool approval 与 controlled write 用例

| ID | 用例 | 用户动作 | 期望结果 |
| --- | --- | --- | --- |
| AUI-AR-ACTION-001 | 审批请求出现 | Runtime 发出 `action.required` | UI 显示带稳定 `actionId` 的 approve/reject/respond 控件。 |
| AUI-AR-ACTION-002 | 审批写入受控 | 用户点击 approve | UI 调用 runtime action response API，并等待 `action.resolved`。 |
| AUI-AR-ACTION-003 | 拒绝不执行工具 | 用户点击 reject | UI 等待 runtime denial/tool failure fact；不能乐观产生 `tool.result`。 |
| AUI-AR-ACTION-004 | Duplicate response 安全 | 用户重复提交 response | UI 保持幂等，不创建第二条 resolved fact。 |
| AUI-AR-ACTION-005 | Tool output offload | Tool result 含大输出 ref | UI 展示 summary/ref，详情按需加载。 |

## Task、routing 与 limit 用例

| ID | 用例 | 来源事实 | 期望结果 |
| --- | --- | --- | --- |
| AUI-AR-TASK-001 | Retry 保留历史 | `task.attempt.failed -> task.retrying -> task.attempt.started` | Task capsule 显示 retrying/current attempt，同时 timeline 保留 failed attempt。 |
| AUI-AR-TASK-002 | Blocked task 可见 | `quota.blocked` 或 `routing.not_possible` | Task capsule 显示 blocked/failed 与原因，不无限 running。 |
| AUI-AR-TASK-003 | 单候选模型 | `routing.single_candidate` | Runtime status/model chip 解释 selected model 与 decision source。 |
| AUI-AR-TASK-004 | Cost/limit state | `cost.estimated`、`rate_limit.hit` 或 limit summary | UI 把 cost/limit state 作为 diagnostics 或 status 展示，不写入 final prose。 |
| AUI-AR-TASK-005 | Subagent lineage | `subagent.spawned` 或 parent/child task snapshot | Team/delegation surfaces 显示 child owner 与 parent task。 |

## Evidence、replay 与 review 用例

| ID | 用例 | 来源事实 | 期望结果 |
| --- | --- | --- | --- |
| AUI-AR-EVID-001 | Evidence export progress | `evidence.changed` 带 pending/exporting status | Timeline/evidence surface 显示进度，不阻塞 text streaming。 |
| AUI-AR-EVID-002 | Evidence pack ready | `evidence.changed` 带 `evidencePackRef` | Evidence surface 链接 durable pack details。 |
| AUI-AR-EVID-003 | Replay 与 review 同源 | `replayRef` 与 `reviewRef` 引用同一 pack/source ids | Replay/review lanes 不重新计算自己的 status truth。 |
| AUI-AR-EVID-004 | Known gaps 不猜测 | Runtime 无匹配 telemetry | UI 显示 unavailable/empty summary，不伪造 `unlinked` gap。 |
| AUI-AR-EVID-005 | Failed tool 可审计 | Tool failure 有 `toolCallId` 与 evidence ref | Timeline 把 failure 链接到 tool row 与 evidence detail。 |

## Session hydration 用例

| ID | 用例 | 输入 | 期望结果 |
| --- | --- | --- | --- |
| AUI-AR-HYDRATE-001 | 从 thread snapshot hydrate | `ThreadReadModel` snapshot | Shell、status、pending actions、queued turns、recent messages 直接渲染，不 replay 全量事件。 |
| AUI-AR-HYDRATE-002 | 从 event stream repair | Snapshot stale，event stream 可用 | Projection 重建 read model state，并在 repair 前标记 stale sections。 |
| AUI-AR-HYDRATE-003 | Evidence lazy load | 存在 evidence refs，但 payload 未加载 | Timeline 显示 refs；payload 只在用户请求时加载。 |
| AUI-AR-HYDRATE-004 | Parent/child ids 保留 | 旧 session 有 subagent lineage | Delegation graph 与 teammate transcript 仍可解析 parent/child ids。 |

## Governance failure cases

以下情况是兼容 Agent UI 实现的明确失败：

1. UI 解析 assistant prose 来推断 tool success、approval state、model routing 或 task completion。
2. UI projection store 成为 `runtimeStatus`、evidence verdict、permission grant 或 artifact contents 的 owner。
3. Evidence、replay、review lanes 因各自重建事实而显示互相矛盾的状态。
4. 缺失 runtime 字段被静默替换成伪造值，而不是 `unknown`、`unavailable`、`stale` 或安全 diagnostics。
5. Action controls 在 runtime confirmation 前标记成功。
6. 当 runtime 暴露 ownership 和 lineage 时，background、subagent 或 remote work 被压平成单一 assistant transcript。

## Minimum validation set

对 Agent Runtime 兼容来源，至少运行：

1. Identity preservation：AUI-AR-ID-001 到 AUI-AR-ID-004。
2. Status/read model projection：AUI-AR-READ-001 到 AUI-AR-READ-006。
3. HITL controlled writes：AUI-AR-ACTION-001 到 AUI-AR-ACTION-004。
4. Evidence consistency：AUI-AR-EVID-001 到 AUI-AR-EVID-004。
5. Hydration：AUI-AR-HYDRATE-001 与 AUI-AR-HYDRATE-003。

这些用例是 AgentRuntime profile tests 对应的 Agent UI 侧测试：Runtime 证明事实存在；UI 证明这些事实被诚实投影。
