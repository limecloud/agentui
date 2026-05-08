---
title: 后端协作契约
description: Agent UI 客户端需要的后端摘要、分页、产物、证据和诊断能力。
---

# 后端协作契约

如果每个表面都依赖完整 session detail，Agent UI 无法保持响应。后端应提供分层投影、稳定 id 和按需详情 API。

## 后端职责

| 能力 | 后端职责 | UI 收益 |
| --- | --- | --- |
| Event stream | 发出 typed status、text、reasoning、tool、action、queue、artifact、evidence events。 | 流式状态不会混进单个文本流。 |
| Session summary | 返回 title、preview、activity、task counts、artifact summary。 | Sidebar 和 tabs 保持轻量。 |
| Window detail | 返回 recent messages 和有界 process data。 | 旧 session 快速打开。 |
| Timeline pages | 按 cursor 返回 process details。 | 长历史可检查且不阻塞。 |
| Tool output refs | 大输出存到 message body 之外。 | 工具详情按需加载。 |
| Artifact service | 持久化 artifact metadata、preview、versions、content refs。 | Artifacts 离开聊天进入 workbench。 |
| Evidence service | 导出 evidence、review、replay、audit records。 | 结果可验证、可复用。 |
| Diagnostics | 发出兼容 timing 和 resource metrics。 | 可定位慢路径。 |

## 推荐 API 层

| 层 | 用途 | 内容 |
| --- | --- | --- |
| `listSummary` | Navigation、sidebars、tabs、task strips。 | id、title、preview、status、counts、last activity。 |
| `sessionSnapshot` | 快速恢复和非活跃 tabs。 | summary + recent message preview + task capsule summary。 |
| `windowDetail` | Active session first paint。 | 最近 N 条 messages、最小 process refs、thread/task state、history cursor。 |
| `timelinePage` | 用户展开 process history。 | 按 cursor/limit 返回详细 process items。 |
| `artifactPreview` | Artifact cards 和 workbench list。 | metadata、小 preview、status、version。 |
| `artifactContent` | 编辑或完整预览。 | full content 或 chunked content。 |
| `evidenceJob` | 导出或刷新 evidence。 | job state、output refs、warnings。 |
| `diagnostics` | 开发或支持视图。 | timing、queue、stream、resource metrics。 |

## 分页和 Hydration

Mutable histories 推荐 cursor-based pagination。Offset pagination 在新事件插入时可能不稳定。

Window detail response SHOULD 明确：

- history 是 truncated 还是 complete
- older history cursor
- 返回的 messages、turns、process items 数量
- timeline detail 是 included 还是 deferred
- artifact 和 evidence previews 是 included 还是 deferred

## 稳定引用

后端 SHOULD 归一化 references，让 UI 能链接各表面：

```text
turn -> messages -> process items -> tools -> artifacts -> evidence
```

至少，artifacts 和 evidence 应能链接回产生它们的 task 或 turn。

## 不要让 session detail 过载

避免让单个 `getSession` 类接口返回所有内容。包含全部 messages、tools、artifact content 和 evidence data 的 full detail 调用会让旧 session 慢，并诱导客户端阻塞渲染。

优先使用小 summary 和明确 detail APIs。
