---
title: 验收场景
description: Agent UI 实现的标准行为清单。
---

# 验收场景

Agent UI 工作按行为验收，而不是按组件或文档文件是否存在验收。以下场景可用于产品 QA、自动化测试或设计评审。

## 1. 发送与首状态

1. 用户发送 prompt。
2. UI 乐观创建 user message。
3. Runtime listener 在 submit 前注册。
4. Runtime 接受工作后，首个 answer text 前出现 runtime status。
5. 支持时 composer 暴露 interrupt/cancel。

通过条件：用户能在文本流开始前知道 Agent 还活着。

## 2. Text/reasoning 分离

1. Runtime 发出 reasoning/thinking content 和 final answer text。
2. Running reasoning 渲染为 process content，并保持 live 可见；完成后默认折叠或摘要。
3. Final answer 渲染为干净 message text。
4. Hydration 后 completed reasoning 不作为 final answer text 重放。

通过条件：最终回答不被 `<think>`、raw reasoning log 或 process status 污染。

## 3. 穿插式 active turn

1. Runtime 依次发出 reasoning、tool、text、reasoning summary 和后续 text。
2. UI 按 event/part 顺序穿插渲染这些 parts。
3. Running tool/process 默认展开或显示 live body。
4. Timeline 不在同屏重复展开 inline process 已显示的同一事实。
5. Turn 完成后，process 归档为默认折叠的 timeline summary。

通过条件：用户看到的是 live 执行顺序，而不是头部堆叠的思考区或双重嵌套过程块。

## 4. Final reconciliation

1. Runtime 流式发出 text deltas。
2. Runtime 随后发出 final answer content。
3. UI 把 final answer 与 streamed content reconcile。

通过条件：最终文本不会重复或二次追加。

## 5. Tool call

1. Runtime 发出带稳定 tool call id 的 tool start。
2. UI 显示压缩 tool row 和安全输入摘要。
3. Tool progress 更新该 row，不进入最终回答正文。
4. Tool result 链接 output details 或 offload reference。
5. 错误渲染为可恢复 tool failure UI。

通过条件：工具执行可见、可检查，并且不混入最终回答正文。

## 6. Human-in-the-loop

1. Runtime 发出带 id、type、scope 和可选 schema 的 action request。
2. UI 把 request 提升为 approval/input surface。
3. 用户 approve、reject、edit 或 answer。
4. Response 通过 runtime action response API 发送。
5. 只有 runtime 确认后，UI 才把 request 标为 resolved。

通过条件：高风险或阻塞工作有明确、可审计的用户控制。

## 7. Queue 与 steer

1. 当前已有 active run。
2. 用户继续输入 prompt。
3. UI 把 queue 和 steer 作为不同模式展示。
4. Queue 创建或更新 queued turn summary。
5. Steer 指向 active run，并显示 pending steer state。

通过条件：用户能区分“下一轮执行”和“改变当前执行”。

## 8. Artifact 工作区

1. Runtime 发出带稳定 artifact id 的 artifact created/updated。
2. Conversation 显示紧凑 artifact card 或 reference。
3. Artifact 工作区使用 artifact service data 打开 preview/editor/diff/version/export 区域。
4. Edits、exports、forks 或 handoffs 通过 artifact APIs 或受控 runtime actions。
5. 保存失败时保留 last confirmed version，并继续显示 unsaved local edits。

通过条件：交付物离开聊天正文，成为 editable、versioned、exportable artifacts。

## 9. Evidence export

1. 用户或系统触发 evidence export。
2. UI 显示后台进度或 task capsule。
3. Evidence service 返回 durable references。
4. Timeline/evidence surface 链接 summary、trace、artifacts、verification、review 或 replay。

通过条件：evidence 可追溯到 runtime facts，并且不阻塞 chat streaming。

## 10. 旧 session 恢复

1. 用户打开旧 session。
2. Shell、tab、title 和 cached snapshot 在可用时立即显示。
3. Recent messages 先于 full timeline details 渲染。
4. Queue/pending action/runtime summary 随后 hydrate。
5. Older messages、tool details、artifacts 和 evidence 按需加载。

通过条件：旧 session 不需要 full history 或所有 artifacts 后才 first paint。

## 11. Missing facts

1. Runtime 缺少 artifact kind、verification status 或 provider stage。
2. UI 显示 `unknown`、`unavailable` 或 `stale`，而不是猜测。
3. 用户控制保持安全且可恢复。

通过条件：UI 不伪造 success、approval、artifact type 或 evidence verdict。

## 12. Task 与 multi-agent state

1. Runtime 发出 queued turn、background task、teammate、subagent 或 remote-agent update，并带 stable task/agent id。
2. UI 更新 task capsules、team roster、work board 或 task center，不创建假 assistant prose。
3. Needs-input、failed、plan-ready 和 delegated-approval 状态优先级高于普通 running。
4. Completed task details 归档到 timeline summaries、worker notifications 或 task history。

通过条件：长任务和 multi-agent 工作在 final answer transcript 外可观察、可控制。

## 13. Coordinator team

1. Coordinator 把工作委托给一个或多个 teammates。
2. UI 展示 coordinator、teammates、roles、statuses 以及 parent/child session 或 thread ids。
3. Worker results 作为 worker notifications 到达，而不是真实用户消息。
4. Coordinator synthesis 与 worker result facts、transcript refs 分离。

通过条件：用户能看清谁做了什么，并能追溯 worker results，而不会把它们误认为用户发言。

## 14. Parallel workers

1. Runtime 为独立任务启动多个 workers。
2. UI 展示 fanout/fanin state、wait state、partial completion、failures 和 retry/continue controls。
3. 可用时，UI 展示 team phase、active count、queued count、provider concurrency group 等 queue/parallelism facts。
4. Running workers 在 active 时保持可见。
5. Completed worker details 归档到 timeline/evidence，不把 team 压平成一个 assistant。

通过条件：并行委托可见、可恢复、可审计。

## 15. Specialist handoff

1. Runtime 把 active owner 从一个 teammate 切换到另一个 teammate。
2. UI 展示 from、to、reason、resume target 与 memory/context boundary。
3. 过去 transcript authorship 不被重写。
4. 新 owner 可以带自己的 policy 与 context constraints 继续。

通过条件：用户能知道现在谁负责工作，以及为什么切换。

## 16. Review team

1. Runtime 或用户请求 reviewer/verifier teammate 评审。
2. UI 展示 reviewer、target、status、evidence refs、verdict 与 requested fixes。
3. Review verdict 保持在 review/evidence facts 中，而不是只写进 final prose。
4. Requested fixes 可重新分派给 teammate 或 work item。

通过条件：review 是一条可追溯 evidence 与后续 owner 的一等 lane。

## 17. Human/agent work board

1. Work items 被分派给 humans 与 agents。
2. UI 展示 assignee、status、blocker、comments、dependencies 与 progress。
3. 用户 assignment 或 status change 通过 board/team API 写回。
4. Completed work 链接到 artifacts 或 evidence。

通过条件：混合人/Agent 工作以 task 管理，不隐藏在 chat transcript 里。

## 18. Background teammate

1. Runtime 调度或唤醒 background teammate。
2. UI 展示 wake reason、schedule、current run、last run record、pause/resume 与 termination controls。
3. Background results 归档为 timeline/evidence facts。
4. UI 不为 background work 引入额外 hierarchy。

通过条件：background agent work 能作为 teammate-owned work 被理解。

## 19. Remote teammate

1. Runtime 创建或连接 remote agent task。
2. UI 展示 remote agent card/capability、task id、status、messages、input/auth needs 与 artifact updates。
3. Input-required 与 auth-required 状态被提升为用户控制。
4. 没有 remote task confirmation 时，transient idle status 不能被当成 terminal completion。

通过条件：remote agent work 复用相同 team surfaces，同时保留 remote protocol truth。

## 20. Context 与 compaction

1. Runtime 发出 context selection、missing context、budget、retrieval 或 compaction facts。
2. UI 展示 context chips、budget state、missing-context fallback 或 compaction boundary。
3. Compaction 不把旧 reasoning 作为 final answer text 重放。
4. Source refs 与 citations 继续链接到 evidence 或 context facts。

通过条件：context 与 memory 变化是显式 facts，不是隐藏文本突变。

## 21. Diagnostics 与 metrics

1. Runtime 或 client 发出 safe diagnostics 或 performance metrics。
2. UI 把它们保留在 diagnostics surfaces 或 trace views。
3. 正常 conversation text 不包含 raw debug logs。
4. Metrics 能解释 submit-to-status、first-text、paint、hydration、detail-load latency。

通过条件：debugging 可追溯，但不污染用户可见 transcript。

## 22. Agent Runtime profile projection

1. Runtime 提供 `RuntimeEvent`、`ThreadReadModel`、`TaskSnapshot` 或 `EvidencePack` facts。
2. UI 保留 `sessionId`、`threadId`、`turnId`、`taskId`、`runId`、`toolCallId`、`actionId`、`evidenceId` 等 runtime correlation ids。
3. Status、task capsules、HITL controls、timeline/evidence、replay 与 review surfaces 都从这些 facts 投影。
4. 缺失 facts 时，UI 显示 `unknown`、`unavailable` 或 `stale`，而不是创建本地 runtime truth。

通过条件：Agent UI 可以投影 Agent Runtime 兼容来源，同时不成为 execution、approval、routing、task 或 evidence facts 的 owner。详见 [Runtime Profile 测试用例](./runtime-profile-test-cases)。
