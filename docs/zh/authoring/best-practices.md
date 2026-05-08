---
title: 最佳实践
description: 如何设计可维护的 Agent UI runtime projection。
---

# 最佳实践

本页是 Agent UI 实现和可复用 surface guidance 的要求。

## Facts 归属原始来源

Agent UI MUST NOT 定义新的 model events、artifact stores、evidence verdicts、permission grants 或 task truth。它只投影 runtime、artifact service、evidence service 或 application state owner 提供的 facts。

好的表述：

> 当 runtime 暴露 pending action request 时，显示 `needs-input`。

错误表述：

> 如果助手说它需要审批，就把任务标为 blocked。

## 从 event classes 开始

画组件前，先定义 UI 如何接收：

- run lifecycle 和 status
- text deltas 和 final text
- reasoning 或 thinking parts
- tool start/args/progress/result
- action required/resolved
- queue changed
- artifact changed
- evidence changed
- session snapshot 和 history cursor

没有 event owner 的 surface 通常会退化成字符串解析。

## 分离最终回答和过程

常见 Agent UI 失败模式是把 status、reasoning、tool output 和 final answer text 都放入同一个流。应保持分离：

| Content | 推荐表面 |
| --- | --- |
| Final answer | Message text part |
| Reasoning 或 thinking | 折叠 process part |
| Runtime status | Runtime strip 或 process row |
| Tool call 和 result | Tool UI row + details |
| Approval 或 input request | Human-in-the-loop card |
| Artifact | Artifact card + workbench |
| Evidence | Timeline/evidence panel |

## 所有对象使用稳定 id

每个 projected object SHOULD 有 owner system 提供的稳定 id：

- session id
- run 或 turn id
- message id
- message part id
- tool call id
- action request id
- queued turn id
- artifact id
- evidence id
- review/replay id

临时 optimistic ids 可以存在，但 runtime ids 到达后必须 reconcile。

## 默认压缩过程信息

Process UI 应该有用，但不能变成日志倾倒。

好的默认行为：

- 展示当前阶段和耗时
- 展示工具名、安全输入摘要和状态
- raw long JSON 默认折叠
- 大输出展示 offload reference
- 完成后的 reasoning 显示摘要
- 错误可恢复，并提供可复制诊断

## 诚实处理缺失事实

用明确 fallback states，而不是猜：

- `loading`
- `unknown`
- `unavailable`
- `stale`
- `blocked`
- `needs-input`
- `failed`
- `disputed`

Artifact metadata 缺失就显示 artifact kind unknown。Verification 未运行就不要显示 passed。

## 用户控制通过 API 写入

审批、中断、队列变更、steer、artifact edit、evidence export、review decision 和 replay creation 都是受控写入。UI 可以发起动作，但不拥有结果事实。

每个控制都应定义：

| Field | Question |
| --- | --- |
| Required fact | 哪个 id 或 snapshot 证明动作有效？ |
| API boundary | 哪个 service 拥有写入？ |
| Pending state | 等待时显示什么？ |
| Failure state | 用户如何恢复？ |
| Audit state | 动作记录在哪里？ |

## 为旧 session 设计

长时间 Agent 会产生历史。不要让 old-session open 依赖 full detail。

推荐行为：

- 先渲染 shell 和 tab
- 如有 cached snapshot，立即应用
- 先 hydrate recent message window，再加载 timeline details
- tool output、artifact content 和 evidence payload lazy-load
- older history 通过 cursor 分页
- inactive tabs 保留 snapshot，而不是完整 mounted workspace

## 衡量可见延迟

技术上已经 streaming 的 UI 仍可能看起来卡死。需要跟踪：

- first runtime status
- first text delta
- first text paint
- delta backlog depth
- oldest unrendered delta age
- old-session shell paint
- recent-message paint
- timeline idle completion

## 避免视觉锁死

Agent UI 标准化语义，不标准化风格。除非明确限定某个产品，否则不要要求特定颜色系统、字体、框架、动画或组件库。

好的指南：

> Pending approval control 必须可键盘访问，并显示 scope、consequence、approve、reject。

错误指南：

> 使用黄色卡片、这个精确阴影和某个 React 组件。
