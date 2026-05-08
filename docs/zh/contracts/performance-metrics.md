---
title: 性能指标契约
description: Agent UI 验收所需的 timing、stream、history 和 resource metrics。
---

# 性能指标契约

Agent UI 性能是用户体验契约的一部分。客户端和 runtime 应记录足够 metrics 来解释体感慢，同时不暴露敏感 payloads。

## 提交和首响应

| Metric | 含义 |
| --- | --- |
| `composer.submit_ms` | 用户动作时间戳。 |
| `listener.bound_ms` | Stream listener 或 event binding 就绪。 |
| `submit.accepted_ms` | Runtime 接受 turn。 |
| `queue.wait_ms` | 在队列等待的时间。 |
| `runtime.start_ms` | Runtime 开始执行。 |
| `provider.request_start_ms` | Provider 或 model request 开始。 |
| `first_event_ms` | 首个 runtime event 到达客户端。 |
| `first_runtime_status_ms` | 首个用户可见状态。 |
| `first_text_delta_ms` | 首个回答 text delta。 |
| `first_text_paint_ms` | 首个文本对用户可见。 |

这些 metrics 用于区分 client delay、runtime queueing、provider delay、bridge delay 和 render delay。

## Stream rendering

| Metric | 含义 |
| --- | --- |
| `text_delta.queue_depth` | 未渲染 text chunks 数量。 |
| `text_delta.oldest_unrendered_age_ms` | 最老未渲染 chunk 年龄。 |
| `stream.render_mode` | Smooth、catch-up、paused 或 fallback。 |
| `stream.mode_transition_count` | 模式切换次数。 |
| `stream.rapid_reentry_count` | 频繁进入 catch-up 的指标。 |
| `stream.flush_interval_ms` | Render flush cadence。 |
| `stream.buffer_chars` | Buffered text size。 |

客户端可用这些指标决定何时从 smooth streaming 切换到 catch-up rendering。

## History 和 restore

| Metric | 含义 |
| --- | --- |
| `session.click_to_shell_ms` | 打开 session 到 shell paint。 |
| `session.snapshot_apply_ms` | Cached snapshot apply 时间。 |
| `session.detail_request_ms` | Window detail request 时长。 |
| `session.messages_hydrate_ms` | Recent messages hydration 时长。 |
| `message_list.first_stable_paint_ms` | 首个可读 conversation paint。 |
| `timeline.idle_hydrate_ms` | Deferred timeline 完成时间。 |
| `history.page_load_ms` | Older history page 时长。 |

## Resource pressure

| Metric | 含义 |
| --- | --- |
| `tabs.active_count` | 完整活跃 sessions。 |
| `tabs.hydrated_detail_count` | 持有 detailed state 的 sessions。 |
| `message_lists.mounted_count` | Mounted message lists。 |
| `timeline.items_mounted_count` | Rendered timeline items。 |
| `artifact.preview_loaded_bytes` | 已加载 artifact preview bytes。 |
| `background.restore_count` | 并发 restore 操作。 |
| `deferred.timeline_pending_count` | Deferred timeline jobs。 |

## 验收阈值

本标准不规定通用数值。Pack SHOULD 为具体产品定义目标：

- first visible status
- first text paint
- old session shell paint
- old session recent message paint
- maximum mounted inactive timelines
- large tool output preview threshold
- artifact preview budget

目标应使用代表性的 histories 和 tool outputs 测试，而不只测空 demo sessions。
