---
title: Basic agent workbench
description: Example Agent UI pack for a five-surface agent workspace.
---

# Basic agent workbench

This example shows a small Agent UI pack for a client that needs chat, progress, task control, artifact editing, and evidence review.

## Directory

```text
basic-agent-workbench/
├── AGENTUI.md
├── surfaces/
│   ├── conversation.md
│   ├── process.md
│   ├── task.md
│   ├── artifact.md
│   └── evidence.md
├── contracts/
│   └── actions.md
└── examples/
    └── prompt-to-artifact.md
```

## `AGENTUI.md`

```markdown
---
name: basic-agent-workbench
description: A five-surface agent workspace for messages, runtime process, task control, artifacts, and evidence. Use when building a general-purpose agent client.
type: agent-workbench
profile: workbench
status: draft
version: 0.1.0
language: en
runtime:
  projectionOnly: true
  requires:
    - text-parts
    - runtime-status
    - tool-events
    - task-state
    - artifact-references
    - evidence-references
---

# Basic Agent Workbench

Use this pack when agent work may take multiple steps, call tools, create artifacts, or require user approval.

## Surfaces

- Conversation: user messages and final assistant text.
- Process: runtime status, reasoning summary, tool progress, and errors.
- Task: queue, background work, needs input, approvals, and interrupts.
- Artifact: generated deliverables, previews, diffs, and editors.
- Evidence: citations, verification, replay, and review.

## Load details

- Load `surfaces/process.md` when tool or runtime status events are visible.
- Load `surfaces/artifact.md` when an artifact reference is present.
- Load `contracts/actions.md` before wiring approval, interrupt, or artifact edit controls.
```

## Surface summary

| Surface | Required facts | Fallback |
| --- | --- | --- |
| Conversation | user text, assistant text parts | pending message or empty state |
| Process | runtime status, tool events, errors | preparing, unknown, or stale |
| Task | task id, queue state, action requests | no active tasks |
| Artifact | artifact id, kind, title, read path | unknown artifact |
| Evidence | source, verification, replay, audit refs | evidence unavailable |

## Acceptance flow

1. User submits: "Create a migration checklist and save it as a document."
2. Conversation shows the user message immediately.
3. Process shows a preparing or routing state before first answer text.
4. If tools run, their output stays in Process and is collapsed after completion.
5. Task shows `needs-input` if approval is required.
6. Artifact shows the generated document with an open/edit action.
7. Evidence shows source or verification entries if the runtime produced them.
8. The final answer summarizes the deliverable and links to the artifact; it does not contain raw process logs.

## Why this is portable

The example defines semantics, not a visual skin. A terminal, IDE, desktop app, or web app can render the same surfaces differently while preserving the same runtime boundaries and user controls.
