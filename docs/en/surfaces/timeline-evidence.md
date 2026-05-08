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
