---
title: Timeline and evidence surface
description: Process history, citations, verification, replay, review, and audit rules.
---

# Timeline and evidence surface

Timeline and Evidence surfaces explain how agent work happened and whether it can be trusted. They should be available without overwhelming the primary conversation.

## Timeline layers

| Layer | Purpose | Default UI |
| --- | --- | --- |
| Inline process | Current turn status and key events. | Compact and live. |
| Turn timeline | Tool calls, reasoning summaries, actions, artifacts. | Collapsed by default. |
| Session timeline | Multi-turn history and incidents. | Lazy loaded or paged. |
| Diagnostic log | Provider, routing, retries, performance. | Developer or support view. |
| Evidence pack | Exportable audit artifact. | Background job and evidence panel. |
| Replay case | Reproducible scenario or failure trace. | Debug or review entry. |

Not every event belongs in the user-facing timeline. Store detailed facts, but project only the useful summary until the user asks for details.

## Inline process and timeline archive

Inline process owns the live state of the current active turn. Turn timeline owns inspectable archives for completed or historical turns. They SHOULD use the same runtime facts, but they should not display two detailed copies of the same fact on the same screen.

Recommended rules:

- Current running turn: reasoning, tool progress, action-required, and runtime status render live in inline process, with key running steps expanded by default.
- After turn completion: process items move into the turn timeline, collapsed by default behind a stable summary and expandable on demand.
- Old-session hydration: restore recent messages and compact process summary first; defer detailed timeline until idle or user expansion.
- Timeline summaries should prefer tool summaries, turn summaries, artifact/action labels, or complete reasoning summaries; do not use partial streaming tokens as titles.
- If the same tool/reasoning item is expanded in inline process, timeline may show only a placeholder summary or hide that detail until the run completes.

## Evidence facts

Evidence surfaces SHOULD consume explicit evidence facts:

- source id and title
- source location or citation anchor
- artifact id or task id
- verification state
- reviewer decision
- replay reference
- generated timestamp
- provenance or tool reference
- disputed or stale status

If evidence is missing, show unavailable or unknown. Do not invent citations.

## Review and replay

Review decisions and replay cases are not the same as model output.

- A review decision SHOULD represent a human or policy review result.
- A replay case SHOULD capture enough context to reproduce a run or failure.
- Evidence export SHOULD be a background task when it may be expensive.
- UI status SHOULD come from evidence facts, not from optimistic front-end inference.

## Source-linking

Generated artifacts and final answers SHOULD link to evidence when available:

```text
final answer -> evidence refs
artifact -> source refs
process item -> tool refs
review decision -> evidence pack
replay case -> runtime trace
```

This lets users move from answer to source, from artifact to generating turn, and from failure to diagnostic trace.

## Acceptance scenarios

1. Timeline details are lazy-loaded for old sessions.
2. Tool events, artifacts, and approvals remain linkable after completion.
3. Citations appear only when source facts exist.
4. Evidence export runs without blocking the active turn.
5. Review and replay views use the same underlying evidence facts.
6. Process details for the current running turn are not expanded in both inline process and timeline.
7. Running process is expanded; completed process is collapsed into the archive by default.
