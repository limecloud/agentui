---
title: Message parts surface
description: Typed rendering rules for final text, reasoning, tools, actions, artifacts, and evidence.
---

# Message parts surface

Message rendering MUST preserve typed parts. Agent UI clients should not flatten every runtime event into one Markdown string.

## Standard parts

| Part | Surface | Default behavior |
| --- | --- | --- |
| `user_text` | Conversation | Show immediately and preserve author identity. |
| `assistant_text` | Conversation | Render as final answer text. |
| `reasoning_summary` | Process | Collapse or summarize by default. |
| `reasoning_detail` | Process | Show only when policy and user setting allow it. |
| `runtime_status` | Process or Task | Display as compact status, not as message prose. |
| `tool_call` | Process | Show compact step with input summary. |
| `tool_result` | Process | Show preview, summary, or detail drawer. |
| `action_required` | Task | Show explicit CTA and pending state. |
| `artifact_ref` | Artifact | Show summary card and open in artifact surface. |
| `evidence_ref` | Evidence | Show source, verification, or replay entry. |
| `error` | Process or Task | Show recoverable diagnostic and next action. |

## Final answer boundary

The final answer SHOULD contain what the user needs to read or act on. It SHOULD NOT contain raw tool logs, queue events, unfiltered reasoning, runtime tracing, or evidence payloads.

Allowed in final answer:

- concise explanation
- user-facing conclusion
- links or references to artifacts
- citations backed by evidence facts
- next steps that are part of the answer

Not allowed by default:

- raw JSON tool output
- repeated streamed final text
- hidden reasoning markers
- provider debug logs
- approval payloads
- full evidence packs

## Reconciliation

Some runtimes stream deltas and later emit final content. The UI MUST reconcile final content instead of blindly appending it.

Recommended rules:

1. Append only typed `assistant_text` deltas to answer text.
2. Store `reasoning`, `tool`, `status`, `action`, and `artifact` in their own parts.
3. On final payload, compare with streamed answer and replace or mark reconciliation if necessary.
4. Never use final payload to duplicate the already-rendered answer.
5. Keep reconciliation deterministic and testable.

## Branch and retry

If a client supports retry, regenerate, or branch:

- Branches SHOULD preserve user message, selected context, mode, and artifacts.
- Each assistant branch SHOULD keep its own process and evidence references.
- Retrying a failed tool SHOULD create a new process item or attempt record.
- The UI SHOULD show which branch produced which artifact.

## Acceptance scenarios

1. Reasoning text never appears inside final answer text unless explicitly exported as an answer.
2. Tool output is inspectable but collapsed outside the final answer by default.
3. `action_required` renders as a CTA, not as plain Markdown.
4. `artifact_ref` opens a dedicated artifact surface.
5. Final payload reconciliation does not duplicate streamed text.
