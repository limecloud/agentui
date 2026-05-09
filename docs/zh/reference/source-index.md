---
title: 引用索引
description: Agent UI requirements 的可追溯来源登记。
---

# 引用索引

本页是 Agent UI 的 traceability register。修改规范、验收场景或 schema 时，使用下列 source id 追溯依据。标准可以吸收这些来源的稳定模式，但不复制它们的 API。

最后复核日期：2026-05-09。

## 引用格式

设计记录或变更记录中使用：

```text
[SRC-ID] -> 变更的 requirement 或 behavior
```

示例：

```text
[SRC-AI-SDK-PARTS] 支持 ordered typed message parts；Agent UI 要求 active-run part order preservation。
```

## 外部来源

| Source id | Source | Evidence used | Agent UI requirements informed |
| --- | --- | --- | --- |
| `SRC-AGENTSKILLS-SPEC` | [Agent Skills specification](https://agentskills.io/specification.md) | 简洁协议写法：directory/field tables、constraints、examples、progressive disclosure、validation。 | Agent UI 规范页应使用显式字段、约束、最小示例与 validation checklists。 |
| `SRC-AGUI-EVENTS` | [AG-UI Events](https://docs.ag-ui.com/concepts/events.md) | Streaming event categories、base event properties、run lifecycle、text message streaming、tool/state/activity event categories。 | Agent UI 应分类 lifecycle、text、tool、state、activity 与 special events，而不是只把 transcript 当唯一 stream。 |
| `SRC-AI-SDK-PARTS` | [Vercel AI SDK `UIMessage`](https://github.com/vercel/ai/blob/main/content/docs/07-reference/01-ai-sdk-core/31-ui-message.mdx) | `UIMessage` 使用 `parts` 承载 UI 渲染和 metadata。 | Message parts 是 typed 与 ordered；最终回答文本不能吸收 process facts。 |
| `SRC-AI-SDK-V5-TOOLS` | [Vercel AI SDK 5.0 migration guide](https://github.com/vercel/ai/blob/main/content/docs/08-migration-guides/26-migration-guide-5-0.mdx) | Tool states 包含 input streaming、input available、output available、output error 等更细生命周期。 | Tool lifecycle 需要 input/progress/output/error states，并在 running 时 live rendering。 |
| `SRC-ASSISTANT-UI-PARTS` | [assistant-ui MessagePrimitive.Parts](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/%28reference%29/api-reference/primitives/message-part.mdx) | Message parts 可按 text、reasoning、audio、tool-call、data 类型渲染。 | Client 需要 typed part renderers 与 fallback。 |
| `SRC-ASSISTANT-UI-COT` | [assistant-ui Chain of Thought guide](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/%28docs%29/guides/chain-of-thought.mdx) | Reasoning 与 tool-call parts 可以被分组，但底层 part model 仍存在。 | Reasoning/tool grouping 是 projection mode；不能重排或重复 active facts。 |
| `SRC-LANGGRAPH-STREAMING` | [LangGraph JS streaming](https://docs.langchain.com/oss/javascript/langgraph/streaming) | Stream modes 包含 updates、messages、custom、tools、debug；tool events 包含 start、progress、end、error。 | Agent UI 应支持多 stream modes、typed tool events、progress 与 diagnostics。 |
| `SRC-LANGGRAPH-INTERRUPTS` | [LangGraph interrupts](https://docs.langchain.com/oss/javascript/langgraph/interrupts) | Workflow 可暂停等待 human review，并用 structured command resume。 | Human-in-the-loop actions 需要 stable ids、visible pending state 与 controlled resume。 |
| `SRC-OPENAI-CHATKIT-THREAD-EVENTS` | [OpenAI ChatKit thread stream events](https://openai.github.io/chatkit-python/concepts/thread-stream-events/) | Thread metadata events、thread item added/updated/done/removed/replaced events、progress updates、client effects、stream options。 | Session/thread metadata、item lifecycle、transient progress 和 cancel options 应是一等 projection facts。 |
| `SRC-OPENAI-APPS-SDK` | [OpenAI Apps SDK reference](https://developers.openai.com/apps-sdk/reference/) | Tool descriptors、structured tool results、component resources、widget bridge concepts。 | Rich tool UI 应挂在 structured tool/component boundaries 上，而不是从 assistant text 推断。 |
| `SRC-COPILOTKIT` | [CopilotKit docs](https://docs.copilotkit.ai/) | Frontend actions、generative UI、shared state 与 human-in-the-loop patterns。 | UI tools 与 shared state updates 需要 controlled runtime boundaries。 |
| `SRC-CLAUDE-ARTIFACTS` | [Claude Artifacts help](https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them) | 重要生成内容会在主对话外的 dedicated artifact area 打开。 | Durable deliverables 属于 Artifact Workspace，conversation 中只保留 reference。 |

## 本地实现调研

以下本地来源用于 drafting flow taxonomy 的实现参考。它们不是公开 normative dependency，但解释了桌面工作台为什么需要这些 UI 行为。

| Source id | Local source | Evidence used | Agent UI requirements informed |
| --- | --- | --- | --- |
| `SRC-LIME-ROADMAP-AGENTUI` | Lime `docs/roadmap/agentui/` | Conversation/process/task/artifact/evidence 架构、event flow、hydration 与 performance constraints。 | Agent UI 应覆盖完整工作台流程，而不只是 thinking blocks。 |
| `SRC-CODEX-PROTOCOL` | 本地 OpenAI Codex checkout：`codex-rs/docs/protocol_v1.md` 与 app-server protocol schema | Turn lifecycle、text deltas、plan deltas、approval/input requests、command output deltas、typed thread item categories。 | 标准 taxonomy 应包含 plan、reasoning、command execution、file changes、MCP/dynamic tools、web search、image view/generation、review mode、context compaction 与 collaborative agent calls。 |
| `SRC-CLAUDECODE-LOCAL` | 本地 Claude Code checkout：message adapter 与 message rendering components | Streaming assistant content blocks、thinking visibility policy、tool progress、tool result grouping、compact boundary handling。 | Active thinking/tool progress 应保持可见，completed history 应降噪，tool results 不应污染 final text。 |

## Requirement traceability

| Requirement area | Primary sources |
| --- | --- |
| Ordered message parts | `SRC-AI-SDK-PARTS`、`SRC-ASSISTANT-UI-PARTS`、`SRC-ASSISTANT-UI-COT`、`SRC-CODEX-PROTOCOL` |
| Running process visible, completed process archived | `SRC-CLAUDECODE-LOCAL`、`SRC-CODEX-PROTOCOL`、`SRC-AI-SDK-V5-TOOLS` |
| Tool lifecycle and progress | `SRC-AI-SDK-V5-TOOLS`、`SRC-LANGGRAPH-STREAMING`、`SRC-OPENAI-CHATKIT-THREAD-EVENTS` |
| Human-in-the-loop actions | `SRC-LANGGRAPH-INTERRUPTS`、`SRC-CODEX-PROTOCOL`、`SRC-COPILOTKIT` |
| Session/thread hydration | `SRC-OPENAI-CHATKIT-THREAD-EVENTS`、`SRC-LIME-ROADMAP-AGENTUI`、`SRC-CODEX-PROTOCOL` |
| Artifact workspace | `SRC-CLAUDE-ARTIFACTS`、`SRC-OPENAI-APPS-SDK`、`SRC-LIME-ROADMAP-AGENTUI` |
| Evidence/timeline/replay | `SRC-LIME-ROADMAP-AGENTUI`、`SRC-CODEX-PROTOCOL` |
| Spec writing style | `SRC-AGENTSKILLS-SPEC` |
