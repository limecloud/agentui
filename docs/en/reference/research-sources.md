---
title: Research sources
description: External and implementation references behind Agent UI.
---

# Research sources

Agent UI is informed by existing agent UI protocols, SDKs, and product implementation patterns. The standard does not copy their APIs. It extracts stable UI requirements that appear across them.

## Traceability

Normative and implementation references are maintained in the dedicated [Source index](./source-index). Use that page when changing requirements, schemas, acceptance scenarios, or release notes.

## Primary external references

| Source | Relevant pattern | How Agent UI uses it |
| --- | --- | --- |
| [Vercel AI SDK UI](https://ai-sdk.dev/docs) | `UIMessage` parts, streaming text, reasoning/data/tool parts, tool state lifecycle, `useChat`. | Confirms message parts and tool lifecycle states should be first-class UI concepts. |
| [assistant-ui](https://www.assistant-ui.com/docs) | Thread, ThreadList, composer, message part primitives, attachments, tool-call rendering, event-stream runtime adapter. | Confirms UI components need runtime adapters and scoped state access rather than global string parsing. |
| [CopilotKit](https://docs.copilotkit.ai/) | Frontend tools, generative UI, shared state, human-in-the-loop, event-stream integrations. | Confirms user-facing tools and approval UI must be controlled runtime interactions. |
| [OpenAI Apps SDK reference](https://developers.openai.com/apps-sdk/reference.md) | Tool descriptors, `structuredContent`, component resources, `_meta.ui.resourceUri`, widget bridge, tool input/output notifications. | Confirms rich UI should be attached to structured tool results and component boundaries, not inferred from prose. |
| [OpenAI ChatKit guides](https://developers.openai.com/api/docs/guides/custom-chatkit.md) | Client tools, file store integration, long-running tool progress, widgets, thread metadata. | Confirms agent UI needs tool progress, file/artifact contracts, and thread state beyond plain chat text. |
| [Claude Artifacts help](https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them) | Substantial standalone content is opened in a dedicated artifact area separate from the main conversation. | Confirms durable deliverables need an Artifact Workspace rather than remaining only as assistant text. |
| [Vercel AI SDK `UIMessage`](https://ai-sdk.dev/docs/reference/ai-sdk-core/ui-message) | `UIMessage.parts` includes text, reasoning, tool, file, source, and typed data parts. | Confirms artifacts should be represented as typed references or files, not inferred from prose. |
| [Agent2Agent Protocol specification](https://a2aproject.github.io/A2A/latest/specification/) | Agent Cards, tasks, messages, parts, artifacts, and remote task states. | Confirms remote agents should project as remote teammates with explicit task/input/auth/artifact facts. |
| [Paperclip heartbeat protocol](https://docs.paperclip.ing/guides/agent-developer/heartbeat-protocol) | Background wakes, heartbeat loop, and background task records. | Informs background teammate surfaces, while Agent UI deliberately avoids making hierarchy-first models normative. |
| [Agent Skills specification](https://agentskills.io/specification.md) | Compact protocol-writing style with fields, constraints, examples, and validation. | Confirms Agent UI docs should be written as a traceable standard, not a prose-only design note. |

## Product implementation references

Agent UI also folds in lessons from desktop agent workbench planning:

- Conversation, process, task, artifact, and evidence should be separate layers.
- Runtime status should appear before first text when the runtime has accepted work.
- Queue and steer need different visual semantics.
- Artifacts should leave the message body and enter an Artifact Workspace surface.
- Artifact cards, previews, versions, diffs, exports, and handoff links are UI semantics; full content storage remains outside Agent UI.
- Evidence export, review, and replay should consume the same runtime facts rather than UI guesses.
- Old session hydration should be shell-first, recent-message-first, and timeline-on-demand.
- Agent workbench implementations such as Claude Code and Codex show that active live process should stay separate from the completed transcript/archive; running thinking/tool progress stays visible, while historical reasoning defaults to summaries or user-controlled expansion.
- Claude Code and Codex multi-agent implementations show that coordinator/team work needs explicit teammate identity, worker notifications, spawn/send/wait/close controls, parent/child thread ids, delegated approvals, and transcript refs.
- Lime's current implementation already has a Team Workspace direction: `agent turn`, `subagent turn`, and `automation job` are the execution taxonomy; child subagent sessions, team phase, queue/parallelism facts, and team memory should guide Agent UI rather than a separate hierarchy-first model.
- AI SDK `UIMessage.parts` order-based rendering shows that reasoning, tools, and answer text should be able to interleave by part order instead of collapsing into a single thinking area.

## Non-goals from research

The standard intentionally does not mandate:

- one protocol transport
- one React component library
- one visual style
- one tool schema
- one artifact file store
- one vendor SDK

A compatible client may use any of the referenced systems if it preserves the projection boundary.
