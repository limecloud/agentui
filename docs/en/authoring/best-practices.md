---
title: Best practices
description: How to author maintainable Agent UI packs.
---

# Best practices

Use this page as authoring requirements for Agent UI packs that must stay maintainable across clients.

## Keep UI projection separate from runtime facts

Agent UI packs MUST NOT define new model events, artifact stores, evidence verdicts, or permission grants.

Allowed content:

- surface purpose
- runtime inputs
- UI-only projection fields
- user controls
- fallback behavior
- accessibility requirements
- acceptance scenarios

Runtime protocols belong in the agent runtime or client implementation. Executable workflows belong in Agent Skills. Facts and citations belong in Agent Knowledge or a runtime evidence store.

## Write for progressive disclosure

Keep `AGENTUI.md` short. It SHOULD tell the client what exists and when to load details.

Good:

```markdown
Read `surfaces/artifact.md` when a task emits artifact references.
Read `contracts/actions.md` before wiring approval or interrupt controls.
```

Poor:

```markdown
Paste every surface state, screenshot annotation, accessibility rule, and event table into AGENTUI.md.
```

## Separate final answers from process traces

A common Agent UI failure is putting status, reasoning, tool output, and final answer text into one stream. Author packs so clients can keep these separate:

| Content | Preferred layer |
| --- | --- |
| User messages and final assistant text | `conversation` |
| Reasoning summary, tool progress, runtime errors | `process` |
| Queue, background work, needs input, plan approval | `task` |
| Files, canvases, diffs, structured deliverables | `artifact` |
| Sources, validation, replay, review | `evidence` |

## Name required runtime inputs

Do not say "show the artifact" without naming what the UI needs.

Better:

```markdown
Requires an `artifact.id`, `artifact.kind`, display title, and a runtime read path. If `artifact.kind` is missing, show an unknown artifact card and avoid guessing from message text.
```

## Provide fallbacks, not fake states

When facts are missing, the UI should say so.

Use states such as:

- loading
- unavailable
- unknown
- stale
- blocked
- needs-input
- failed
- disputed

Avoid optimistic labels like "verified" or "saved" unless a runtime fact confirms them.

## Preserve user control

Critical controls SHOULD remain reachable while the agent is running:

- interrupt
- approve or reject
- edit queued input
- open tool details
- open artifact
- export or inspect evidence
- retry or resume when supported

If a control is disabled, the UI should expose why.

## Compress long-running work

Long agent work needs a compact shape. Use capsules, strips, drawers, or summaries for high-volume process data. Keep the primary surface stable and disclose details on demand.

Good defaults:

- Show the latest active status in one line.
- Collapse completed tool steps by default.
- Summarize large output and open details on demand.
- Keep high-priority states visible: `needs-input`, `approval-required`, `failed`, `stale`.

## Write acceptance scenarios

Every pack SHOULD include observable scenarios. Good scenarios say what the user does and what must be visible.

Example:

```markdown
1. Submit a prompt that triggers a tool call.
2. The Conversation surface shows the user message immediately.
3. The Process surface shows runtime status before final text arrives.
4. The tool output is collapsed by default.
5. The final answer does not include raw tool logs.
```

## Avoid visual lock-in

Agent UI is not a CSS theme. Describe semantics before appearance.

Prefer:

- `high-priority task capsule`
- `collapsed process item`
- `artifact preview with open action`
- `evidence card with source count and verification state`

Avoid requiring a specific color, typography, framework, animation, or component library unless the pack is explicitly scoped to one client.
