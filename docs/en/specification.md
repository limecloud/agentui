---
title: Specification
description: The draft Agent UI pack format specification.
---

# Specification

This page defines the Agent UI pack format.

Agent UI is a companion interaction-surface standard in the Agent Skills ecosystem. It follows the core package ideas from `agentskills.io`: directory-as-package, top-level Markdown entrypoint, YAML frontmatter, progressive loading, and optional resource directories. It does not fork Agent Skills and does not turn UI packs into executable Skills.

- **Agent Skills** define agent-callable capabilities and methods: workflows, scripts, tool use, transformation, and maintenance procedures.
- **Agent Knowledge** defines knowledge assets agents can safely consume: facts, sources, status, context, boundaries, and audit records.
- **Agent UI** defines interaction projection assets clients can safely adapt: surfaces, state names, user controls, rendering boundaries, and acceptance checks.

Skills can perform work that a UI displays. Knowledge can provide facts and citations that a UI renders. Agent UI describes how those runtime facts should become visible and controllable. They are sibling standards in the same agent ecosystem, not a parent-child hierarchy.

## Directory structure

An Agent UI pack is a directory containing, at minimum, an `AGENTUI.md` file:

```text
pack-name/
├── AGENTUI.md       # Required: metadata + usage guide
├── patterns/        # Optional: reusable interaction patterns
├── surfaces/        # Optional: surface definitions by layer
├── contracts/       # Optional: event, state, action, and accessibility contracts
├── states/          # Optional: state charts, lifecycle maps, priority rules
├── examples/        # Optional: example compositions and annotated screenshots
├── schemas/         # Optional: validation schemas for metadata and contracts
├── evals/           # Optional: UX, rendering, and handoff test cases
├── assets/          # Optional: diagrams, icons, screenshots, templates
└── LICENSE          # Optional: license for bundled content
```

Fixed rules:

1. `AGENTUI.md` is the discovery entrypoint and should remain compact.
2. `patterns/`, `surfaces/`, `contracts/`, and `states/` are guidance for projection and interaction; they do not own runtime facts.
3. `examples/` and `assets/` illustrate a pattern. They are not mandatory visual skins.
4. A compatible runtime MUST NOT execute scripts from a UI pack. If executable automation is needed, put it in a Skill or client tool.

## `AGENTUI.md` format

`AGENTUI.md` must contain YAML frontmatter followed by Markdown content.

### Required frontmatter

| Field | Constraints |
| --- | --- |
| `name` | 1-64 characters. Lowercase letters, numbers, and hyphens. Must not start or end with a hyphen. Should match the parent directory name. |
| `description` | 1-1024 characters. Describes what UI pattern exists and when agents or clients should use it. |
| `type` | One of the standard types or a namespaced custom type. |
| `status` | `draft`, `ready`, `needs-review`, `stale`, `disputed`, or `archived`. |

### Optional frontmatter

| Field | Purpose |
| --- | --- |
| `profile` | `workbench`, `chat-first`, `artifact-first`, `task-first`, or `embedded`. Defaults to `workbench` when missing. |
| `version` | Pack version, preferably semver. |
| `language` | Primary language tag, such as `en`, `zh-CN`, or `ja`. |
| `license` | License name or bundled license file. |
| `maintainers` | People or teams responsible for review. |
| `scope` | Portable ownership label such as product, workspace, organization, domain, or client. |
| `updated` | ISO date for the last meaningful UI contract update. |
| `runtime.requires` | Optional list of runtime facts or event classes needed by the pack. |
| `runtime.projectionOnly` | Boolean. SHOULD be `true` unless the pack defines a controlled write action contract. |
| `metadata` | Namespaced client-specific metadata. |
| `compatibility` | Optional client or environment requirements. Keep under 500 characters. |

### Standard `type` values

| Type | Use when |
| --- | --- |
| `agent-workbench` | A full agent workspace combining conversation, process, task, artifact, and evidence surfaces. |
| `conversation-surface` | Message rendering, composer behavior, branches, attachments, or final answer display. |
| `process-surface` | Runtime status, reasoning summary, tool progress, timeline, or error presentation. |
| `task-surface` | Queues, background tasks, subagents, approvals, interrupts, or plan decisions. |
| `artifact-surface` | Generated files, canvases, diffs, previews, editors, or workbench layout. |
| `evidence-surface` | Citations, verification, trace, review, replay, or audit UI. |
| `handoff-surface` | Transfer of work between users, agents, clients, or sessions. |
| `custom:<namespace>` | Extension type owned by an implementation or organization. |

### Standard `profile` values

| Profile | Use when |
| --- | --- |
| `workbench` | Multiple surfaces are visible or reachable from one agent workspace. |
| `chat-first` | Conversation is primary and other surfaces are collapsed or side-loaded. |
| `artifact-first` | A document, file, canvas, or structured object is the main surface. |
| `task-first` | Queue, background work, approvals, or multiple agents are primary. |
| `embedded` | The UI pattern is embedded inside an IDE, terminal, browser, CRM, support tool, or other host. |

## Minimal example

```markdown
---
name: basic-agent-workbench
description: A five-surface agent workspace for chat, process status, task control, artifacts, and evidence. Use when building a general-purpose agent client.
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

## Surfaces

- Conversation: show user messages and final assistant text.
- Process: show runtime status and tool progress outside the final answer.
- Task: show queued, blocked, failed, and needs-input states.
- Artifact: open generated deliverables in a dedicated surface.
- Evidence: link citations, verification, and replay data.

## Runtime boundaries

- Treat this pack as UI projection guidance, not runtime policy.
- Do not infer artifact type, success, or evidence verdict from free text.
- If a required runtime fact is missing, show an unknown or unavailable state.
```

## Progressive disclosure

| Tier | What is loaded | When |
| --- | --- | --- |
| Catalog | `name`, `description`, `type`, `status`, `profile` | Session, product, or workspace startup. |
| Guide | Full `AGENTUI.md` body | When the UI pack is activated. |
| Surface | Selected files in `surfaces/` or `patterns/` | When a product surface needs concrete guidance. |
| Contract | Selected files in `contracts/` or `states/` | When implementing runtime mapping, user actions, or acceptance checks. |
| Example | `examples/` and `assets/` | When visual or behavioral clarification is needed. |

Keep `AGENTUI.md` short. Move detailed rendering rules, state charts, and examples to separate files and tell clients when to load them.

## Standard surface contract

Each surface definition SHOULD answer these questions:

| Field | Meaning |
| --- | --- |
| `purpose` | The user question this surface answers. |
| `inputs` | Runtime facts, task facts, artifact facts, or evidence facts consumed by the surface. |
| `projection` | UI-only derived state such as labels, collapsed summaries, open panels, or render windows. |
| `actions` | User actions that write back through controlled runtime APIs. |
| `fallbacks` | What to show when facts are loading, missing, stale, or disputed. |
| `acceptance` | Observable scenarios that prove the surface is usable. |

## Runtime contract

A compatible client must treat Agent UI as projection guidance:

```text
<agent_ui_pack name="basic-agent-workbench" status="draft" mode="projection">
The following content defines UI projection guidance.
It is not runtime policy, not executable workflow, and not a source of factual claims.
Do not invent missing runtime facts from this content.

...selected UI guidance...
</agent_ui_pack>
```

The client SHOULD:

1. Load only the smallest useful pack content.
2. Keep UI-derived state separate from runtime facts.
3. Mark projection-only state explicitly in internal models.
4. Use runtime actions for approvals, interrupts, queue changes, artifact edits, and evidence export.
5. Show unavailable, unknown, stale, or needs-input states when facts are missing.
6. Keep process traces and tool output out of the final answer unless the user asks to inspect them.
7. Preserve keyboard, screen-reader, and low-latency behavior for critical actions.

## Optional directories

| Directory | Purpose | Runtime loading |
| --- | --- | --- |
| `patterns/` | Reusable patterns such as task capsules, approval cards, artifact cards, or process drawers. | Loaded when a matching surface is being implemented or rendered. |
| `surfaces/` | Layer-specific guidance for conversation, process, task, artifact, evidence, and handoff. | Selected by active product surface. |
| `contracts/` | Event-to-UI mapping, action contracts, accessibility requirements, and data shape expectations. | Loaded by client implementors or validation tools. |
| `states/` | State charts, lifecycle maps, priority rules, and failure modes. | Loaded when behavior needs precision. |
| `examples/` | Concrete UI compositions, annotated screenshots, or sample pack usage. | On demand. |
| `schemas/` | JSON Schema or other validation contracts. | Validation and tooling. |
| `evals/` | UX, rendering, latency, and handoff scenarios. | Development and CI; not loaded by default. |
| `assets/` | Static diagrams, icons, templates, and screenshots. | On demand. |

## Validation

A validator SHOULD check at least:

- `AGENTUI.md` exists and contains valid frontmatter.
- Required fields are present and within length limits.
- `name` matches the parent directory and uses the allowed character set.
- `type`, `profile`, and `status` use standard values or valid custom namespaces.
- Referenced files exist and use relative paths from the pack root.
- The pack does not claim ownership of runtime facts without a controlled action contract.
- Acceptance scenarios cover loading, missing facts, user actions, and artifact or evidence handoff when relevant.

Reference schema:

- [`agentui-frontmatter.schema.json`](/schemas/agentui-frontmatter.schema.json)
