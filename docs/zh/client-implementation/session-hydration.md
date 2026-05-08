---
title: Session hydration
description: 既有 Agent sessions 的渐进恢复和资源管理。
---

# Session hydration

打开既有 session 应该是渐进的。用户应先看到稳定 shell 和有用 recent content，再等待昂贵 process history、artifacts 或 evidence。

## 推荐流程

```text
select session
  -> activate tab shell
  -> apply cached snapshot or skeleton
  -> request window detail with bounded history
  -> hydrate recent messages
  -> paint stable conversation
  -> hydrate queue/action/artifact summaries
  -> defer timeline and tool detail
  -> load older history only on request
```

## Hydration 优先级

| Priority | Load | 原因 |
| --- | --- | --- |
| P0 | shell、title、composer availability | 用户需要方向和控制。 |
| P0 | recent messages 或 skeleton | 避免空白 workspace。 |
| P0 | active task 和 pending action summary | 注意力状态必须可见。 |
| P1 | artifact summary | 交付物应可达。 |
| P1 | compact process summary | 不加载重型 timeline 也能知道发生过什么。 |
| P2 | detailed timeline pages | 用户展开 process details 时加载。 |
| P2 | full tool output | 用户打开 tool detail 时加载。 |
| P2 | evidence export 或 replay | 用户请求 audit 或 review 时加载。 |

## 过期响应保护

Hydration responses 可能乱序到达。客户端 SHOULD 给每个请求标记 activation token 或 version，并忽略不匹配 active session 的结果。

规则：

- Session A 的后台响应不能覆盖 active session B。
- 较慢的旧请求不能覆盖较新的 snapshot。
- 用户切走后，应尽可能取消或降低重型 detail loading 优先级。

## 非活跃 sessions

非活跃 sessions SHOULD 降级到 snapshot state：

- title
- last message preview
- task capsules
- queued 和 pending counts
- artifact summary
- unread 或 changed state

除非 pinned 或明确 keep warm，否则它们 SHOULD 释放 heavy message windows、parsed Markdown、mounted timeline items 和 full artifact previews。

## 验收场景

1. 打开旧 session 时，shell 先于 detail 完成出现。
2. Recent messages 先于 full timeline detail 渲染。
3. A -> B -> A 切换不会错误覆盖 active session。
4. 非活跃 sessions 保留 task state，但释放 heavy process renderers。
5. Older history 通过显式 page 或 cursor action 加载。
