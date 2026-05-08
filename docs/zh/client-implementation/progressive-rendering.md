---
title: 渐进渲染
description: 响应式 Agent UI 表面的渲染指南。
---

# 渐进渲染

Agent 工作常常很慢、流式、且部分事实尚未可用。兼容 Agent UI 应尽早展示有用状态，而不是等待完整历史、大工具输出或 artifact preview。

## 渲染顺序

交互式工作推荐顺序：

```text
user action
  -> visible shell
  -> optimistic user message or pending preview
  -> early runtime status
  -> first answer text or process update
  -> tool and task details on demand
  -> artifact preview when available
  -> evidence and replay after completion or export
```

Shell 不应该等待完整历史或所有次要面板。

## 保持 stream typed

不要把所有事件合并成一个 Markdown 字符串。

| Stream part | Surface | Rule |
| --- | --- | --- |
| user text | Conversation | 提交后立即显示。 |
| assistant text | Conversation | 作为回答文本渲染。 |
| reasoning 或 thinking | Process | 摘要或折叠；不混入最终回答。 |
| runtime status | Process 或 Task | 在文本前或文本之间展示。 |
| tool call | Process | 紧凑步骤，按需展开细节。 |
| queued input | Task | 展示为 queue 或 capsule 状态。 |
| artifact reference | Artifact | 展示摘要卡，并在 artifact surface 打开。 |
| evidence reference | Evidence | 展示 source、verification 或 replay 入口。 |

## 渐进恢复历史

打开已有工作时：

1. 先显示 shell 和标题。
2. 如果有缓存或最近消息，先显示它们。
3. 加载有界 recent history window。
4. 延迟 timeline、大工具输出、artifact previews 和 evidence details。
5. 用户切走后，忽略过期 hydrate 结果。

这可以避免主 UI 被昂贵的次要数据阻塞。

## 折叠高频过程数据

过程数据应该可搜索、可检查，但不必总是展开。

默认行为：

- active step 展开或摘要化
- completed tool steps 折叠
- large outputs 摘要化并提供 open-details action
- errors 和 needs-input states 提升显示
- background work 压缩为 capsules

## 避免最终文本重复

许多 runtime 同时发送 streaming deltas 和 final completion payload。UI 必须 reconcile final content，而不是盲目追加。

推荐行为：

- typed text deltas 构建回答文本。
- final content 用于 reconcile，不重复追加。
- reasoning、tool output、status 各自保持独立 part。
- 如果 final payload 与 streamed text 冲突，优先使用 runtime 明确 final answer，并标记 reconciliation。

## 延迟信号

客户端 SHOULD 记录足够 timing 以排查体感慢：

| Metric | 含义 |
| --- | --- |
| `submitToShellMs` | 用户提交到 conversation shell 可见的时间。 |
| `submitToStatusMs` | 首个可信 runtime status 的时间。 |
| `submitToFirstTextMs` | 首个助手回答文本的时间。 |
| `firstTextToPaintMs` | first text delta 后的渲染延迟。 |
| `historyClickToShellMs` | 打开旧工作到 shell 可见的时间。 |
| `historyClickToRecentMessagesMs` | 可用 recent content 出现的时间。 |
| `artifactReferenceToPreviewMs` | artifact reference 到 preview 可用的时间。 |

指标不是用户可见 UI 契约，但能让验收场景可测试。

## 验收场景

基础渐进渲染实现应通过这些场景：

1. 提交短 prompt 后，在 first text 前显示用户消息和 runtime status。
2. 工具密集任务不会把 raw tool output 插入最终回答。
3. 生成 artifact 以 card 或 preview 形式出现在最终回答正文之外。
4. 打开旧工作时，shell 或 recent content 先于完整 process history 出现。
5. 两个 session 之间切换时，过期 hydrate 结果不会覆盖 active view。
6. 缺少 artifact kind 时显示 unknown，而不是从 message text 猜测。
