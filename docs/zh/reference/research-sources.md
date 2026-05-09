---
title: 调研来源
description: Agent UI 背后的外部与实现参考。
---

# 调研来源

Agent UI 参考了现有 Agent UI 协议、SDK 和产品实现模式。标准不复制它们的 API，而是抽取其中反复出现的稳定 UI 要求。

## 可追溯性

规范与实现引用统一维护在专门的[引用索引](./source-index)。修改 requirements、schemas、acceptance scenarios 或 release notes 时，优先回到该页面。

## 主要外部参考

| Source | 相关模式 | Agent UI 如何吸收 |
| --- | --- | --- |
| [Vercel AI SDK UI](https://ai-sdk.dev/docs) | `UIMessage` parts、streaming text、reasoning/data/tool parts、tool state lifecycle、`useChat`。 | 证明 message parts 和 tool lifecycle states 应是一等 UI 概念。 |
| [assistant-ui](https://www.assistant-ui.com/docs) | Thread、ThreadList、composer、message part primitives、attachments、tool-call rendering、event-stream runtime adapter。 | 证明 UI components 需要 runtime adapters 和 scoped state access，而不是全局字符串解析。 |
| [CopilotKit](https://docs.copilotkit.ai/) | Frontend tools、generative UI、shared state、human-in-the-loop、event-stream integrations。 | 证明用户可见工具和 approval UI 必须是受控 runtime interactions。 |
| [OpenAI Apps SDK reference](https://developers.openai.com/apps-sdk/reference.md) | Tool descriptors、`structuredContent`、component resources、`_meta.ui.resourceUri`、widget bridge、tool input/output notifications。 | 证明 rich UI 应挂在结构化 tool results 和 component boundaries 上，而不是从正文猜。 |
| [OpenAI ChatKit guides](https://developers.openai.com/api/docs/guides/custom-chatkit.md) | Client tools、file store integration、long-running tool progress、widgets、thread metadata。 | 证明 Agent UI 需要 tool progress、file/artifact contracts 和 chat text 之外的 thread state。 |
| [Claude Artifacts help](https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them) | substantial standalone content 会在主对话之外的 dedicated artifact area 打开。 | 证明 durable deliverables 需要 Artifact 工作区，而不是只停留在 assistant text。 |
| [Vercel AI SDK `UIMessage`](https://ai-sdk.dev/docs/reference/ai-sdk-core/ui-message) | `UIMessage.parts` 包含 text、reasoning、tool、file、source 和 typed data parts。 | 证明 artifacts 应表示为 typed references 或 files，而不是从正文推断。 |
| [Agent2Agent Protocol specification](https://a2aproject.github.io/A2A/latest/specification/) | Agent Cards、tasks、messages、parts、artifacts 与 remote task states。 | 证明 remote agents 应投影为 remote teammates，并保留明确 task/input/auth/artifact facts。 |
| [Paperclip heartbeat protocol](https://docs.paperclip.ing/guides/agent-developer/heartbeat-protocol) | Background wakes、heartbeat loop 与 background task records。 | 启发 background teammate surfaces，但 Agent UI 不把 hierarchy-first 模型设为规范隐喻。 |
| [Agent Skills specification](https://agentskills.io/specification.md) | 用 fields、constraints、examples 与 validation 写出的紧凑协议风格。 | 证明 Agent UI 文档应像可追溯标准，而不是纯设计说明。 |

## 产品实现参考

Agent UI 也吸收了桌面 Agent 工作台规划中的经验：

- Conversation、process、task、artifact、evidence 应分层。
- Runtime 接受工作后，首文本前应显示 runtime status。
- Queue 和 steer 需要不同视觉语义。
- Artifacts 应离开 message body，进入 Artifact 工作区 surface。
- Artifact cards、previews、versions、diffs、exports 和 handoff links 是 UI 语义；完整内容存储仍在 Agent UI 之外。
- Evidence export、review、replay 应消费同一组 runtime facts，而不是 UI 猜测。
- 旧 session hydration 应 shell-first、recent-message-first、timeline-on-demand。
- Claude Code 与 Codex 这类 agent workbench 的实现经验表明，active live process 应与 completed transcript/archive 分离；running thinking/tool progress 保持可见，历史 reasoning 默认摘要化或按用户设置展开。
- Claude Code 与 Codex 的 multi-agent 实现表明，coordinator/team work 需要明确 teammate identity、worker notifications、spawn/send/wait/close controls、parent/child thread ids、delegated approvals 与 transcript refs。
- Lime 当前实现已经在走 Team Workspace 方向：`agent turn`、`subagent turn`、`automation job` 是执行 taxonomy；child subagent sessions、team phase、queue/parallelism facts 与 team memory 应引导 Agent UI，而不是另造 hierarchy-first 模型。
- AI SDK `UIMessage.parts` 的顺序渲染模式表明，reasoning、tool 和 answer text 应能按 part 顺序穿插，而不是被聚合到单一“思考区”。

## 调研后的非目标

本标准刻意不强制：

- 某一种协议传输
- 某一个 React 组件库
- 某一种视觉风格
- 某一种工具 schema
- 某一种 artifact file store
- 某一家 vendor SDK

兼容客户端可以使用上述任意系统，只要保留 projection boundary。
