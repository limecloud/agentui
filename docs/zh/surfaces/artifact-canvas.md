---
title: Artifact 与 Canvas 表面
description: Agent artifacts 的交付、预览、编辑、版本和来源链接规则。
---

# Artifact 与 Canvas 表面

Agent UI 应把 durable deliverables 当成 artifacts，而不是超长聊天消息。

核心规则：

```text
Conversation for intent and explanation.
Artifact for delivery and continued work.
```

## Artifact facts

Artifact surface SHOULD 消费明确 artifact facts：

| Fact | 用途 |
| --- | --- |
| `artifact.id` | 在 conversation、process、task、evidence 之间稳定链接。 |
| `artifact.kind` | Document、code、image、table、diff、report、browser snapshot、custom。 |
| `artifact.title` | 用户可见标签。 |
| `artifact.version` | Version、revision 或 checkpoint。 |
| `artifact.preview` | 轻量 preview 或 manifest。 |
| `artifact.read_ref` | 完整内容的 path、URL、object id 或 service reference。 |
| `artifact.source_refs` | Tool、source、task 或 turn references。 |
| `artifact.status` | Creating、ready、failed、stale、superseded。 |

缺少显式 fact 时，不要从最终回答文本推断 artifact kind。

## 放置规则

| 内容 | 推荐位置 |
| --- | --- |
| 短结果 | Conversation 或 inline preview。 |
| 长报告 | Artifact surface + conversation summary。 |
| 代码或文档 patch | Artifact 或 diff surface。 |
| 图片/视频/音频 | Artifact preview + open action。 |
| Browser snapshot | 带 source 和 timestamp 的 artifact。 |
| Generated dataset | Artifact manifest 和 preview table。 |
| Evidence pack | Evidence surface，相关时从 artifact 链接。 |

## 编辑和版本

Artifact edits SHOULD 通过 artifact service 或受控客户端 store 写入。UI SHOULD 保留：

- current version
- pending edits
- save status
- diff 或 patch
- source 或 generation turn
- export 或 handoff state

如果 artifact edit 失败，保留 last confirmed version，并单独显示 unsaved changes。

## Artifact cards

Conversation 和 process surfaces 可以显示紧凑 artifact cards。Card SHOULD 包含：

- title
- kind
- status
- small preview 或 icon
- open action
- version 或 freshness
- 可用时显示 source/evidence indicator

Card 是入口，不是 artifact body。

## 验收场景

1. 长报告在 artifact surface 打开，conversation 只显示摘要。
2. Artifact preview 不阻塞 streamed answer text。
3. Artifact kind 来自明确 metadata；缺失时显示 unknown。
4. 编辑保留 version 和 unsaved state。
5. Artifact 可链接回产生它的 turn、tool、source 或 evidence。
