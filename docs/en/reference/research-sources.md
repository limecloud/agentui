---
title: Research sources
description: External references behind Agent UI v0.2.
---

# Research sources

Agent UI is informed by existing agent UI protocols, SDKs, and product implementation patterns. The standard does not copy their APIs. It extracts stable UI requirements that appear across them.

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

## Product implementation references

Agent UI also folds in lessons from desktop agent workbench planning:

- Conversation, process, task, artifact, and evidence should be separate layers.
- Runtime status should appear before first text when the runtime has accepted work.
- Queue and steer need different visual semantics.
- Artifacts should leave the message body and enter an Artifact Workspace surface.
- Artifact cards, previews, versions, diffs, exports, and handoff links are UI semantics; full content storage remains outside Agent UI.
- Evidence export, review, and replay should consume the same runtime facts rather than UI guesses.
- Old session hydration should be shell-first, recent-message-first, and timeline-on-demand.

## Non-goals from research

The standard intentionally does not mandate:

- one protocol transport
- one React component library
- one visual style
- one tool schema
- one artifact file store
- one vendor SDK

A compatible client may use any of the referenced systems if it preserves the projection boundary.
