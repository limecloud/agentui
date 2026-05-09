---
title: Progressive rendering
description: Rendering guidance for responsive Agent UI surfaces.
---

# Progressive rendering

Agent work is often slow, streaming, and partially known. A compatible Agent UI should show useful state early without blocking on full history, heavy tool output, or artifact previews.

## Rendering order

Prefer this order for interactive work:

```text
user action
  -> visible shell
  -> optimistic user message or pending preview
  -> early runtime status
  -> first answer text or process update
  -> tool and task details on demand
  -> artifact preview when available
  -> evidence and replay after completion or export
```

The shell should not wait for full history or every secondary panel.

## Keep streams typed

Do not merge every event into one Markdown string.

| Stream part | Surface | Rule |
| --- | --- | --- |
| user text | Conversation | Show immediately after submit. |
| assistant text | Conversation | Render as answer text. |
| reasoning or thinking | Process | Summarize or collapse; do not mix into final answer. |
| runtime status | Process or Task | Show before or between text updates. |
| tool call | Process | Show compact step with details on demand. |
| queued input | Task | Show as queue or capsule state. |
| artifact reference | Artifact | Show summary card and open in Artifact Workspace. |
| evidence reference | Evidence | Show source, verification, or replay entry. |

## Interleaved live rendering

For an interactive run, the primary column SHOULD project the active turn in event/part order instead of grouping all process content before or after the answer. A typical order may be:

```text
reasoning.delta
  -> tool.started
  -> tool.progress
  -> text.delta
  -> reasoning.summary
  -> text.delta
```

The UI should render the corresponding process/text parts in that order. This lets users see why the agent paused, which tool is running, and how the answer continues after the tool finishes.

Default behavior:

- Running reasoning/thinking expands to show streaming content; if policy forbids raw reasoning, show a live summary or status text.
- Running tool calls expand to show safe input summary, progress, and current phase; collapse to a tool row after completion.
- Completed process moves into the turn timeline or process archive, collapsed by default with a stable summary.
- Active inline process and completed timeline are two projection modes for the same facts; they should not duplicate the same detail on screen.
- Do not use half streaming tokens as process group titles; wait for a stable summary, tool name, or complete semantic label.

## Hydrate history progressively

When opening existing work:

1. Show the shell and title first.
2. Show cached or recent messages if available.
3. Load a bounded recent history window.
4. Defer timeline, large tool output, artifact previews, and evidence details.
5. Ignore stale hydration results if the user switches away.

This avoids blocking the main UI on expensive secondary data.

## Collapse high-volume process data

Process data should be searchable and inspectable, not always expanded.

Default behavior:

- active step expanded or showing a live summary
- completed tool steps collapsed
- large outputs summarized with an open-details action
- errors and needs-input states promoted
- background work compressed into capsules

## Avoid duplicate final text

Many runtimes emit both streaming deltas and a final completion payload. The UI must reconcile final content instead of appending it blindly.

Recommended behavior:

- Build answer text from typed text deltas.
- Use final content to reconcile, not duplicate.
- Keep reasoning, tool output, and status in their own parts.
- If the final payload conflicts with streamed text, prefer the runtime's explicit final answer and mark the reconciliation.

## Latency signals

Clients SHOULD record enough timing to debug perceived slowness:

| Metric | Meaning |
| --- | --- |
| `submitToShellMs` | Time from user submit to visible conversation shell. |
| `submitToStatusMs` | Time to first credible runtime status. |
| `submitToFirstTextMs` | Time to first assistant answer text. |
| `firstTextToPaintMs` | Rendering delay after first text delta. |
| `historyClickToShellMs` | Time from opening old work to visible shell. |
| `historyClickToRecentMessagesMs` | Time to useful recent content. |
| `artifactReferenceToPreviewMs` | Time from artifact reference to preview availability. |

Metrics are not part of the user-facing UI contract, but they make acceptance scenarios testable.

## Acceptance scenarios

A basic progressive rendering implementation should pass these scenarios:

1. Submitting a short prompt shows the user message and a runtime status before first text.
2. A tool-heavy task does not insert raw tool output into the final answer.
3. A generated artifact appears as a card or preview outside the final answer body.
4. Opening old work shows shell or recent content before full process history loads.
5. Switching between two sessions does not let stale hydration overwrite the active view.
6. A missing artifact kind is shown as unknown rather than guessed from message text.
7. Reasoning, tool progress, and answer text render in event/part order during a running turn.
8. Running tool/process content is not collapsed by default; it collapses into timeline or archive only after completion.
