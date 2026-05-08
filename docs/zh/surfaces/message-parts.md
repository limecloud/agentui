---
title: Message parts 表面
description: final text、reasoning、tools、actions、artifacts 和 evidence 的分型渲染规则。
---

# Message parts 表面

消息渲染 MUST 保留 typed parts。Agent UI 客户端不应把所有 runtime events 压平成一个 Markdown 字符串。

## 标准 part

| Part | Surface | 默认行为 |
| --- | --- | --- |
| `user_text` | Conversation | 立即显示，并保留作者身份。 |
| `assistant_text` | Conversation | 渲染为最终回答文本。 |
| `reasoning_summary` | Process | 默认折叠或摘要。 |
| `reasoning_detail` | Process | 只有 policy 和用户设置允许时展示。 |
| `runtime_status` | Process 或 Task | 作为紧凑状态，不作为消息正文。 |
| `tool_call` | Process | 展示紧凑步骤和输入摘要。 |
| `tool_result` | Process | 展示预览、摘要或详情抽屉。 |
| `action_required` | Task | 展示明确 CTA 和 pending state。 |
| `artifact_ref` | Artifact | 展示摘要卡，并在 Artifact 工作区打开。 |
| `evidence_ref` | Evidence | 展示 source、verification 或 replay entry。 |
| `error` | Process 或 Task | 展示可恢复诊断和下一步。 |

## 最终回答边界

最终回答 SHOULD 包含用户需要阅读或执行的内容。它 SHOULD NOT 包含原始工具日志、队列事件、未过滤推理、runtime tracing 或 evidence payloads。

允许进入最终回答：

- 简洁解释
- 面向用户的结论
- 指向 artifacts 的链接或引用
- 由 evidence facts 支撑的 citations
- 属于回答本身的下一步

默认不允许：

- 原始 JSON tool output
- 重复 streamed final text
- 隐藏 reasoning markers
- provider debug logs
- approval payloads
- full evidence packs

## Reconciliation

有些 runtime 同时发送 deltas 和 final content。UI MUST reconcile final content，而不是盲目追加。

推荐规则：

1. 只把 typed `assistant_text` deltas 追加到回答文本。
2. `reasoning`、`tool`、`status`、`action`、`artifact` 存入各自 part。
3. final payload 到达时，与 streamed answer 比较并替换或标记 reconciliation。
4. 不用 final payload 重复追加已渲染回答。
5. reconciliation 必须确定且可测试。

## Branch 和 retry

如果客户端支持 retry、regenerate 或 branch：

- Branches SHOULD 保留用户消息、selected context、mode 和 artifacts。
- 每个 assistant branch SHOULD 有自己的 process 和 evidence refs。
- 重试失败工具 SHOULD 创建新的 process item 或 attempt record。
- UI SHOULD 显示哪个 branch 生成了哪个 artifact。

## 验收场景

1. Reasoning text 不进入最终回答，除非明确导出为回答。
2. Tool output 可检查，但默认在最终回答外折叠。
3. `action_required` 渲染为 CTA，不是普通 Markdown。
4. `artifact_ref` 打开专用 Artifact 工作区。
5. Final payload reconciliation 不重复 streamed text。
