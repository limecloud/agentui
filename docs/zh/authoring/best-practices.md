---
title: 最佳实践
description: 如何编写可维护的 Agent UI 包。
---

# 最佳实践

本页给出跨客户端可维护 Agent UI pack 的编写要求。

## UI 投影和运行事实分离

Agent UI pack MUST NOT 定义新的模型事件、artifact store、evidence verdict 或 permission grant。

允许内容：

- surface purpose
- runtime inputs
- UI-only projection fields
- user controls
- fallback behavior
- accessibility requirements
- acceptance scenarios

Runtime protocols 属于 agent runtime 或客户端实现。可执行 workflow 属于 Agent Skills。事实和引用属于 Agent Knowledge 或 runtime evidence store。

## 面向渐进加载编写

保持 `AGENTUI.md` 简短。它 SHOULD 告诉客户端有什么内容，以及何时加载细节。

好的写法：

```markdown
Read `surfaces/artifact.md` when a task emits artifact references.
Read `contracts/actions.md` before wiring approval or interrupt controls.
```

不好的写法：

```markdown
Paste every surface state, screenshot annotation, accessibility rule, and event table into AGENTUI.md.
```

## 最终回答和过程轨迹分离

常见 Agent UI 失败模式是把 status、reasoning、tool output 和 final answer text 都放入同一个流。编写 pack 时应帮助客户端保持分离：

| 内容 | 推荐层 |
| --- | --- |
| 用户消息和助手最终文本 | `conversation` |
| 推理摘要、工具进度、runtime errors | `process` |
| 队列、后台工作、needs input、plan approval | `task` |
| 文件、画布、diff、结构化交付物 | `artifact` |
| 来源、验证、replay、review | `evidence` |

## 命名所需 runtime inputs

不要只写“展示 artifact”，要说明 UI 需要什么。

更好的写法：

```markdown
Requires an `artifact.id`, `artifact.kind`, display title, and a runtime read path. If `artifact.kind` is missing, show an unknown artifact card and avoid guessing from message text.
```

## 提供 fallback，不伪造状态

事实缺失时，UI 应明确说明。

可使用状态：

- loading
- unavailable
- unknown
- stale
- blocked
- needs-input
- failed
- disputed

除非 runtime fact 已确认，否则不要乐观显示 `verified` 或 `saved`。

## 保留用户控制

Agent 运行时，关键控制 SHOULD 保持可达：

- interrupt
- approve 或 reject
- edit queued input
- open tool details
- open artifact
- export 或 inspect evidence
- retry 或 resume when supported

如果控制被禁用，UI 应说明原因。

## 压缩长时间运行的工作

长 Agent 工作需要紧凑形态。使用 capsule、strip、drawer 或 summary 展示高频过程数据。保持主表面稳定，按需披露细节。

推荐默认值：

- 用一行显示最新 active status。
- completed tool steps 默认折叠。
- large output 摘要化，并提供 open details 动作。
- 高优先级状态保持可见：`needs-input`、`approval-required`、`failed`、`stale`。

## 编写验收场景

每个 pack SHOULD 包含可观察场景。好的场景说明用户做了什么，以及必须看到什么。

示例：

```markdown
1. Submit a prompt that triggers a tool call.
2. The Conversation surface shows the user message immediately.
3. The Process surface shows runtime status before final text arrives.
4. The tool output is collapsed by default.
5. The final answer does not include raw tool logs.
```

## 避免视觉锁定

Agent UI 不是 CSS 主题。先描述语义，再描述外观。

推荐：

- `high-priority task capsule`
- `collapsed process item`
- `artifact preview with open action`
- `evidence card with source count and verification state`

除非本包明确限定某个客户端，否则不要要求特定颜色、字体、框架、动画或组件库。
