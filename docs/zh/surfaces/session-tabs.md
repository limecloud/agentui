---
title: Session 与 Tab 表面
description: Agent UI 的浏览器式 session 状态、渐进恢复和资源管理。
---

# Session 与 Tab 表面

Agent sessions 是可执行工作单元，不只是聊天记录。多 session 客户端应像管理可恢复、资源敏感的 tabs 一样管理它们。

## 标准 session 状态

| State | 含义 | 资源行为 |
| --- | --- | --- |
| `active` | 用户正在交互的 session。 | 可渲染完整 conversation、process 和 composer。 |
| `recent` | 最近使用且可能再次打开。 | 保留 snapshot 和轻量 task state。 |
| `pinned` | 用户标记为重要。 | 保留 summary 和 task state，避免自动 discard。 |
| `suspended` | 非活跃；重型 UI 暂停。 | 保留 title、preview、capsules、artifact index。 |
| `discarded` | 重型状态已释放。 | 保留 restore metadata 和 last known summary。 |
| `restoring` | Session 正在 rehydrate。 | 先显示 shell 和 snapshot。 |
| `archived` | 从默认 active lists 隐藏。 | 可通过 search 或 archive view 找回。 |

## 渐进恢复

打开已有 session SHOULD 遵循：

```text
click session
  -> create/activate shell
  -> apply cached snapshot or skeleton
  -> load bounded recent messages
  -> paint stable recent conversation
  -> hydrate queue/action/artifact summaries
  -> load timeline details on idle or expand
  -> page older history on request
```

Session surface SHOULD NOT 因 full history、full timeline、artifact previews、evidence export 或 background session lists 而阻塞 first paint。

## Snapshot 内容

轻量 snapshot MAY 包含：

- session id
- title
- last message preview
- last activity timestamp
- active task state
- queued count
- pending action count
- latest artifact summary
- latest evidence 或 review state
- unread 或 changed indicator

Snapshots 是 projection state。权威事实变化时必须刷新或标记 stale。

## 资源规则

客户端 SHOULD 跟踪和控制：

- active tab count
- hydrated detail tab count
- mounted message list count
- mounted timeline item count
- streaming buffer size
- loaded artifact preview bytes
- background restore count

非活跃 sessions 不应持续重建大型 timeline 或解析大型 message histories。

## 验收场景

1. 打开旧 session 时，shell 或 cached preview 先于 full detail 出现。
2. A/B 旧 session 切换时，过期 hydrate 不覆盖 active session。
3. 非活跃 sessions 保留 capsules，但释放重型 timeline rendering。
4. Pinned sessions 在内存压力下保留重要状态。
5. 旧历史通过显式 page 或 cursor action 加载。
