---
title: What is Agent UI?
description: Agent UI is a file-first standard for agent interaction surface patterns.
---

# What is Agent UI?

Agent UI defines a portable directory format for describing how agent work should appear in an AI client. It is an interoperability sibling to Agent Skills and Agent Knowledge: Skills describe executable capabilities, Knowledge describes trusted context, and Agent UI describes interaction surfaces.

Use Agent UI when an agent product needs repeatable UI semantics for:

- chat and final answers
- streaming status and tool progress
- queued or background tasks
- human approval and interruption
- generated artifacts and editable canvases
- citations, evidence, review, and replay
- handoff between agents, users, and clients

Do not use it to store model prompts, tool protocols, business facts, or executable workflows. Those belong in Skills, Knowledge, or the client runtime.

## Surface layers

| Layer | User question | Common surfaces | Runtime source |
| --- | --- | --- | --- |
| `conversation` | What did I ask and what was the final answer? | Messages, composer, final response, branch controls. | User input and assistant text parts. |
| `process` | What is the agent doing now? | Status strip, thinking summary, tool step, timeline. | Runtime status, reasoning, tool events, errors. |
| `task` | What work is running, queued, blocked, or awaiting me? | Task capsule, queue panel, approval card, subagent strip. | Queue, turn, task, and action-required records. |
| `artifact` | Where is the deliverable and how can I edit it? | Canvas, preview, diff, file card, workbench. | Artifact graph, file store, generated object metadata. |
| `evidence` | Can I trust, replay, or audit the result? | Sources, evidence pack, verification, review decision. | Trace, source map, validation, replay, audit records. |

The layers can be rendered in one page or across multiple panes. The contract is separation of responsibility, not a mandated layout.

## Projection model

Agent UI is a projection layer:

```text
runtime facts + task facts + artifact facts + evidence facts
  -> UI projection model
  -> surfaces and user actions
```

A UI projection may cache titles, labels, collapsed summaries, scroll windows, and open panels. It must not become the owner of the runtime identity, tool result, artifact contents, evidence verdict, or permission grant.

## Why a standard?

Agent products repeatedly solve the same UI problems: streams arrive before final answers, tools produce large outputs, users need to approve actions, generated files need editing, and audits need evidence. Without shared terms, clients blend all of this into one message column.

Agent UI gives authors and clients a small vocabulary for packaging these decisions so products can interoperate without copying a visual skin.
