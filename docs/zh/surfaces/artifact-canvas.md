---
title: Artifact 工作区
description: Agent artifacts 的交付、预览、编辑、版本、diff、导出和交接规则。
---

# Artifact 工作区

Agent UI 应把 durable deliverables 视为一等 artifacts，而不是超长聊天消息或被动附件。Artifact 工作区是用户检查、编辑、比较、导出、复用和交接 Agent 产物的交互表面。

核心规则：

```text
Conversation carries intent and explanation.
Artifact Workspace carries delivery and continued work.
```

## 为什么它是核心

Agent 产品会反复产出可独立使用的大块内容：文档、代码、网页、图表、图片、表格、报告、数据集和交互视图。外部实现也指向同一方向：

- Claude Artifacts 把 substantial standalone content 放在主对话之外的 dedicated window。
- AI SDK `UIMessage` 将 text、reasoning、tool、file、source 和 custom data parts 分开用于 UI 渲染。
- assistant-ui 将 attachments、runtime adapters、message parts 和 custom tool UI rendering 分层。
- OpenAI Apps SDK 将 structured tool data、narration、component-only metadata 和 UI resources 分离。

Agent UI 标准化的是这些模式背后的交互语义，而不是 artifact store。

## Artifact 交互契约

Artifact 工作区 SHOULD 消费明确 artifact facts：

| Fact | 用途 |
| --- | --- |
| `artifact.id` | 在 conversation、process、task、artifact workspace 和 evidence 之间稳定链接。 |
| `artifact.kind` | `document`、`code`、`image`、`table`、`canvas`、`diff`、`report`、`dataset`、`browser_snapshot`、`bundle`、`custom` 或 `unknown`。 |
| `artifact.title` | 用户可见标签。 |
| `artifact.status` | `creating`、`ready`、`updating`、`failed`、`stale`、`superseded`、`deleted` 或 `unknown`。 |
| `artifact.version.id` | Version、revision 或 checkpoint identity。 |
| `artifact.preview` | 轻量 preview、thumbnail、summary、manifest 或 partial rows。 |
| `artifact.read_ref` | 完整内容的 path、URL、object id 或 service reference。 |
| `artifact.write_capabilities` | 用户能否 edit、fork、export、regenerate 或 attach to next turn。 |
| `artifact.diff_ref` | 可用时的 diff 或 patch reference。 |
| `artifact.source_refs` | Tool、source、task、turn、message 或 run references。 |
| `artifact.evidence_refs` | Evidence、verification、review、replay 或 handoff references。 |

缺少明确事实时，不要从普通回答文本推断 artifact kind、保存状态、版本或导出成功。

## 事件投影

Artifact events SHOULD 投影到 artifact card、workspace panel、timeline entry 和 evidence link。

| Event class | 最小要求 | UI projection |
| --- | --- | --- |
| `artifact.created` | artifact id、kind 或 `unknown`、status | 创建 card 和 workspace entry。 |
| `artifact.updated` | artifact id、version 或 status | 更新 preview、freshness 和 workspace state。 |
| `artifact.preview.ready` | artifact id、preview ref 或 preview data | 不加载完整内容也能显示轻量 preview。 |
| `artifact.version.created` | artifact id、version id、source refs | 增加 version marker 和 compare target。 |
| `artifact.diff.ready` | artifact id、diff ref | 启用 diff/review action。 |
| `artifact.export.started` | artifact id、export id | 显示后台导出状态。 |
| `artifact.export.completed` | artifact id、export ref | 显示 download/share/handoff action。 |
| `artifact.failed` | artifact id、error summary | 保留 last confirmed version，并显示恢复路径。 |
| `artifact.deleted` | artifact id | 标记 unavailable，但不删除历史引用。 |

Runtime adapter 可以把这些折叠为 `artifact.changed`，但兼容客户端 SHOULD 在可用时保留更具体的 event class。

## 工作区区域

Artifact 工作区 SHOULD 有稳定区域，即使具体视觉布局不同：

| 区域 | 用户问题 | 必需行为 |
| --- | --- | --- |
| Card | 产出了什么？ | 紧凑 title、kind、status、preview、open action。 |
| Preview | 能否快速查看？ | 不阻塞 streaming 的轻量渲染。 |
| Editor / Canvas | 能否继续编辑？ | 通过 artifact API 或 host store 受控写入。 |
| Version rail | 变化历史是什么？ | 当前版本、source turn、历史版本、stale state。 |
| Diff / Review | 改了什么，能否接受？ | 比较明确版本或 patch。 |
| Export / Handoff | 能否在本次 run 之外使用？ | 导出状态、目标、evidence/handoff links。 |
| Source links | 它从哪里来？ | 链接 turn、tool、source、task 和 evidence。 |

## 放置规则

| 内容 | 推荐位置 |
| --- | --- |
| 短结果 | Conversation 或 inline preview。 |
| 长报告 | Artifact 工作区 + conversation summary。 |
| 代码或文档 patch | Artifact 工作区 + diff/review。 |
| 图片/视频/音频 | Artifact preview + open/export actions。 |
| Browser snapshot | 带 source、timestamp 和可用 replay/evidence link 的 artifact。 |
| Generated dataset | Manifest、schema、sample rows 和 full-content read ref。 |
| Interactive widget | 如果是瞬时结果，放 Tool UI；如果是可复用交付物，放 Artifact 工作区。 |
| Evidence pack | Evidence surface，相关时从 artifact 链接。 |

## 编辑和版本

Artifact edits SHOULD 通过 artifact service、runtime action 或受控 host store 写入。UI SHOULD 保留：

- last confirmed version
- pending local edits
- save status
- diff 或 patch
- source 或 generation turn
- export 或 handoff state
- evidence/review links

如果编辑失败，保留 last confirmed version，并单独显示 unsaved changes。如果后续 runtime update 覆盖了当前打开版本，显示 conflict 或 stale state，不要静默替换用户草稿。

## Artifact cards

Conversation 和 process surfaces 可以显示紧凑 artifact cards。Card SHOULD 包含：

- title
- kind
- status
- small preview 或 icon
- open action
- version 或 freshness
- 可用时显示 source/evidence indicator
- 相关时显示 export/handoff state

Card 是入口，不是 artifact body。

## 边界

Agent UI 拥有 artifact interaction semantics。Artifact service 拥有完整内容、存储、版本持久化、导出 bytes 和写入权威。Evidence systems 拥有 verification、replay 和 review facts。

反模式：

- 把长 artifact 直接塞进 assistant text
- 把二进制文件渲染成空的 generic file card
- 同一个 artifact 因 path、basename、absolute path 被重复挂载
- 在 owning service 确认前标记 artifact saved
- 用户切换 session 或 artifact 时丢失 local edits
- 让 canvas state 成为 artifact 唯一事实源

## 验收场景

1. 长报告在 Artifact 工作区打开；conversation 只显示摘要和 card。
2. Artifact preview 不阻塞 streamed answer text。
3. Artifact kind 来自明确 metadata；缺失时显示 `unknown`。
4. 编辑保留 version、pending edits 和 unsaved state。
5. Diff 比较两个明确版本，而不是比较两段 message string。
6. Export progress 和 completion 可见且可恢复。
7. Artifact 可链接回产生它的 turn、tool、source、task 或 evidence。
8. 打开旧 session 时先显示 artifact summaries，再加载完整内容。
