---
title: Composer surface
description: Input, context, mode, queue, and steering semantics for Agent UI composers.
---

# Composer surface

The Composer surface is the user's control point before and during agent execution. It is not just a text box. It exposes the target, context, execution mode, permission boundary, and follow-up behavior for a task.

## Purpose

A composer SHOULD answer:

1. What will the agent work on?
2. Which context will enter the turn?
3. What execution mode or permission boundary applies?
4. If a task is already running, will this input queue the next turn or steer the current one?
5. Can the user recover drafts, attachments, and pending input after navigation?

## Standard inputs

| Input | Meaning | UI guidance |
| --- | --- | --- |
| `prompt.text` | User-authored instruction. | Preserve multiline editing, paste bursts, and IME behavior. |
| `context.refs` | Files, pages, artifacts, sessions, tasks, or selected text. | Render as removable chips with stable labels. |
| `attachments` | Images, documents, audio, screenshots, or structured files. | Show type, size, upload state, and failure. |
| `execution.mode` | Plan, act, safe, research, write, review, or custom mode. | Use compact mode chips; avoid hidden defaults for high-risk work. |
| `permission.policy` | Read-only, ask-before-write, network allowed, shell allowed, etc. | Surface high-risk capabilities before submit. |
| `model.route` | Model, provider, effort, or cost policy when user-visible. | Keep optional and compact; do not block common tasks. |
| `context.budget` | Token, memory, or workspace budget. | Use low-noise budget indicators; warn before truncation. |
| `draft.state` | Unsaved, queued, steering, submitted, or failed draft. | Preserve across session switches and failed submits. |

## Queue vs steer

When a task is running, additional input MUST have explicit semantics.

| Mode | Meaning | Required UI behavior |
| --- | --- | --- |
| `queue` | Send this input after the current turn completes. | Show queue position, preview, edit/remove actions. |
| `steer` | Deliver this input to the currently running turn. | Show that it affects current work; keep pending steer visible until accepted or rejected. |
| `new-task` | Start independent work. | Create or select a separate task/session surface. |
| `blocked` | Input cannot be accepted now. | Explain why and preserve the draft. |

A client SHOULD NOT silently guess between queue and steer after the user presses Enter. Pick a default, label it, and provide an escape hatch.

## Slash commands and mentions

Slash commands, mentions, and context chips are structured context selectors, not plain text decoration.

- Slash commands SHOULD map to capability, template, mode, or workflow identifiers.
- Mentions SHOULD resolve to stable references such as file id, artifact id, task id, URL, or selected range.
- Unresolved mentions MUST remain visibly unresolved and should not be sent as authoritative context.
- Autocomplete popups SHOULD be keyboard navigable and should not steal focus from IME composition.

## Draft recovery

A robust composer SHOULD preserve:

- current text draft
- queued draft
- pending steer preview
- attachments and upload states
- selected context refs
- mode and permission chips
- failed-submit diagnostic

At minimum, switching sessions or opening an artifact SHOULD NOT discard a draft without an explicit user action.

## Acceptance scenarios

1. Submitting a prompt shows a pending user message or draft preview immediately.
2. Adding a file mention creates a removable context chip with a stable label.
3. While a turn is running, a follow-up clearly enters queue or steer mode.
4. A queued item can be edited or removed before it starts.
5. A failed submit preserves the prompt, attachments, and selected mode.
6. A high-risk permission change is visible before submission.
