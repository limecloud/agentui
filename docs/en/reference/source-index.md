---
title: Source index
description: Traceable source register for Agent UI requirements.
---

# Source index

This page is the traceability register for Agent UI. Use the source ids below when changing the specification, acceptance scenarios, or schemas. The standard may adapt ideas from these sources, but it does not copy their APIs.

Last reviewed: 2026-05-09.

## Citation format

Use this format in design notes or change logs:

```text
[SRC-ID] -> requirement or behavior that changed
```

Example:

```text
[SRC-AI-SDK-PARTS] supports ordered typed message parts; Agent UI requires active-run part order preservation.
```

## External sources

| Source id | Source | Evidence used | Agent UI requirements informed |
| --- | --- | --- | --- |
| `SRC-AGENTSKILLS-SPEC` | [Agent Skills specification](https://agentskills.io/specification.md) | Concise protocol style: directory/field tables, constraints, examples, progressive disclosure, validation. | Agent UI spec pages should use explicit fields, constraints, minimal examples, and validation checklists. |
| `SRC-AGUI-EVENTS` | [AG-UI Events](https://docs.ag-ui.com/concepts/events.md) | Streaming event categories, base event properties, run lifecycle, text message streaming, tool/state/activity event categories. | Agent UI should classify lifecycle, text, tool, state, activity, and special events instead of treating the transcript as the only stream. |
| `SRC-AI-SDK-PARTS` | [Vercel AI SDK `UIMessage`](https://github.com/vercel/ai/blob/main/content/docs/07-reference/01-ai-sdk-core/31-ui-message.mdx) | `UIMessage` uses `parts` for UI rendering and metadata. | Message parts are typed and ordered; final answer text must not absorb process facts. |
| `SRC-AI-SDK-V5-TOOLS` | [Vercel AI SDK 5.0 migration guide](https://github.com/vercel/ai/blob/main/content/docs/08-migration-guides/26-migration-guide-5-0.mdx) | Tool states include granular streaming lifecycle states such as input streaming, input available, output available, and output error. | Tool lifecycle requires input/progress/output/error states and live rendering while running. |
| `SRC-ASSISTANT-UI-PARTS` | [assistant-ui MessagePrimitive.Parts](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/%28reference%29/api-reference/primitives/message-part.mdx) | Message parts render by type: text, reasoning, audio, tool-call, data. | Clients need typed part renderers and fallbacks. |
| `SRC-ASSISTANT-UI-COT` | [assistant-ui Chain of Thought guide](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/%28docs%29/guides/chain-of-thought.mdx) | Reasoning and tool-call parts can be grouped without losing the underlying part model. | Reasoning/tool grouping is a projection mode; it must not reorder or duplicate active facts. |
| `SRC-LANGGRAPH-STREAMING` | [LangGraph JS streaming](https://docs.langchain.com/oss/javascript/langgraph/streaming) | Stream modes include updates, messages, custom, tools, and debug; tool events include start, progress, end, and error. | Agent UI should support multiple stream modes, typed tool events, progress, and diagnostics. |
| `SRC-LANGGRAPH-INTERRUPTS` | [LangGraph interrupts](https://docs.langchain.com/oss/javascript/langgraph/interrupts) | Workflows can pause for human review and resume with structured commands. | Human-in-the-loop actions need stable ids, visible pending state, and controlled resume. |
| `SRC-OPENAI-CHATKIT-THREAD-EVENTS` | [OpenAI ChatKit thread stream events](https://openai.github.io/chatkit-python/concepts/thread-stream-events/) | Thread metadata events, thread item added/updated/done/removed/replaced events, progress updates, client effects, stream options. | Session/thread metadata, item lifecycle, transient progress, and cancel options should be first-class projection facts. |
| `SRC-OPENAI-APPS-SDK` | [OpenAI Apps SDK reference](https://developers.openai.com/apps-sdk/reference/) | Tool descriptors, structured tool results, component resources, and widget bridge concepts. | Rich tool UI should attach to structured tool/component boundaries, not be inferred from assistant text. |
| `SRC-COPILOTKIT` | [CopilotKit docs](https://docs.copilotkit.ai/) | Frontend actions, generative UI, shared state, and human-in-the-loop patterns. | UI tools and shared state updates need controlled runtime boundaries. |
| `SRC-CLAUDE-ARTIFACTS` | [Claude Artifacts help](https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them) | Substantial generated content opens in a dedicated artifact area outside the main conversation. | Durable deliverables belong in Artifact Workspace with conversation references only. |
| `SRC-A2A-PROTOCOL` | [Agent2Agent Protocol specification](https://a2aproject.github.io/A2A/latest/specification/) | Agent Card, task lifecycle, messages, parts, artifacts, input-required/auth-required style remote progress. | Remote teammates should map remote agent/task truth into Agent UI surfaces without replacing the local runtime owner model. |
| `SRC-PAPERCLIP-HEARTBEAT` | [Paperclip heartbeat protocol](https://docs.paperclip.ing/guides/agent-developer/heartbeat-protocol) | Background wake/sleep, heartbeat, task/background coordination patterns. | Background agent work should be represented as scheduled/triggered teammate work; Paperclip-style hierarchy language is not normative for Agent UI. |
| `SRC-VITEPRESS-PUBLIC` | [VitePress asset handling and deploy docs](https://vitepress.dev/guide/asset-handling) | `public` directory assets are copied to site root and repository-base deployments require base-aware URLs. | Standalone runnable demos live under `docs/public/examples/` and docs pages link to them instead of embedding demo components. |

## Local implementation research

These local sources were used as implementation references while drafting the flow taxonomy. They are not public normative dependencies, but they explain why certain UI behaviors are required for a desktop workbench.

| Source id | Local source | Evidence used | Agent UI requirements informed |
| --- | --- | --- | --- |
| `SRC-LIME-ROADMAP-AGENTUI` | Lime `docs/roadmap/agentui/` | Conversation/process/task/artifact/evidence architecture, event flow, hydration and performance constraints. | Agent UI should cover the full workbench flow, not only thinking blocks. |
| `SRC-CODEX-PROTOCOL` | Local OpenAI Codex checkout: `codex-rs/docs/protocol_v1.md` and app-server protocol schema | Turn lifecycle, text deltas, plan deltas, approval/input requests, command output deltas, typed thread item categories. | Standard taxonomy should include plan, reasoning, command execution, file changes, MCP/dynamic tools, web search, image view/generation, review mode, context compaction, and collaborative agent calls. |
| `SRC-CLAUDECODE-LOCAL` | Local Claude Code checkout: message adapter and message rendering components | Streaming assistant content blocks, thinking visibility policy, tool progress, tool result grouping, compact boundary handling. | Active thinking/tool progress should stay visible, completed history should reduce noise, and tool results should not pollute final text. |
| `SRC-CLAUDECODE-TEAM` | Local Claude Code checkout: `src/Task.ts`, `src/coordinator/coordinatorMode.ts`, `src/tasks/InProcessTeammateTask/types.ts`, `src/tasks/LocalAgentTask/LocalAgentTask.tsx`, `src/tasks/RemoteAgentTask/RemoteAgentTask.tsx`, SDK hook schemas. | Task types include local/remote agents and in-process teammates; coordinator mode treats worker results as internal notifications; teammate identity carries `agentId`, `agentName`, `teamName`, color, parent session, plan approval, permission, recent messages, pending user messages, idle/shutdown/progress. | Agent UI v0.6 standardizes team roster, worker notifications, teammate transcript zoom, delegated plan/permission prompts, parent/child lineage, and coordinator synthesis vs worker result separation. |
| `SRC-CODEX-COLLAB` | Local Codex checkout: `codex-rs/tui/src/multi_agents.rs`, `codex-rs/protocol/src/protocol.rs`, `codex-rs/app-server-protocol/src/protocol/event_mapping.rs`, `codex-rs/analytics/src/*`. | Collaborative tools include spawn/send/resume/wait/close; TUI renders spawned/sent/waiting/closed history rows; subagents track source, parent thread id, nickname, role, depth; delegated approvals and subagent tool-call counts are tracked. | Agent UI v0.6 adds controls for delegate/continue/wait/stop/close, parent/child thread metadata, delegated approval source, and parallel worker fanout/fanin surfaces. |
| `SRC-LIME-TEAM-RUNTIME` | Lime checkout: `docs/aiprompts/task-agent-taxonomy.md`, `docs/aiprompts/state-history-telemetry.md`, `src-tauri/src/commands/aster_agent_cmd/subagent_runtime.rs`, `src-tauri/crates/agent/src/session_store.rs`, `src/components/agent/chat/teamWorkspaceRuntime.ts`, `src/lib/teamMemorySync.ts`. | Lime classifies execution into `agent turn`, `subagent turn`, and `automation job`; child subagent sessions expose role, profile, team preset, runtime status, queue and team phase; request telemetry joins session/thread/turn/pending/queued/subagent keys; team memory uses repo-scoped `team.selection`, `team.subagents`, and `team.parent_context`. | Agent UI v0.6 aligns with Lime by treating teammates as child sessions/workbench facts, preserving request/session lineage, carrying `runtimeEntity`/queue/parallelism facts, and keeping background work within agent/subagent/automation boundaries instead of adding a fourth runtime taxonomy. |

## Requirement traceability

| Requirement area | Primary sources |
| --- | --- |
| Ordered message parts | `SRC-AI-SDK-PARTS`, `SRC-ASSISTANT-UI-PARTS`, `SRC-ASSISTANT-UI-COT`, `SRC-CODEX-PROTOCOL` |
| Running process visible, completed process archived | `SRC-CLAUDECODE-LOCAL`, `SRC-CODEX-PROTOCOL`, `SRC-AI-SDK-V5-TOOLS` |
| Tool lifecycle and progress | `SRC-AI-SDK-V5-TOOLS`, `SRC-LANGGRAPH-STREAMING`, `SRC-OPENAI-CHATKIT-THREAD-EVENTS` |
| Human-in-the-loop actions | `SRC-LANGGRAPH-INTERRUPTS`, `SRC-CODEX-PROTOCOL`, `SRC-COPILOTKIT` |
| Session/thread hydration | `SRC-OPENAI-CHATKIT-THREAD-EVENTS`, `SRC-LIME-ROADMAP-AGENTUI`, `SRC-CODEX-PROTOCOL` |
| Artifact workspace | `SRC-CLAUDE-ARTIFACTS`, `SRC-OPENAI-APPS-SDK`, `SRC-LIME-ROADMAP-AGENTUI` |
| Evidence/timeline/replay | `SRC-LIME-ROADMAP-AGENTUI`, `SRC-CODEX-PROTOCOL` |
| Spec writing style | `SRC-AGENTSKILLS-SPEC` |
| Team workbench and teammate identity | `SRC-CLAUDECODE-TEAM`, `SRC-CODEX-COLLAB`, `SRC-LIME-TEAM-RUNTIME` |
| Remote teammate mapping | `SRC-A2A-PROTOCOL`, `SRC-CLAUDECODE-TEAM` |
| Background teammate mapping | `SRC-PAPERCLIP-HEARTBEAT`, `SRC-LIME-TEAM-RUNTIME` |
| Standalone runnable examples | `SRC-VITEPRESS-PUBLIC` |
