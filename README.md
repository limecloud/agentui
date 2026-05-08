# Agent UI

Agent UI is a draft sibling standard in the Agent Skills ecosystem for packaging agent interaction patterns so AI clients can display, control, resume, verify, and hand off agent work without confusing UI projection with runtime facts.

Agent Skills answer **how to do work**. Agent Knowledge answers **what trusted knowledge enters context**. Agent UI answers **how agent work becomes visible, controllable, editable, and auditable for users**.

## Core boundary

| Standard | Owns | Entry point | Runtime behavior |
| --- | --- | --- | --- |
| Agent Skills | Executable capabilities, workflows, scripts, tools, templates, and maintenance methods. | `SKILL.md` | Follow after trust and activation checks. |
| Agent Knowledge | Facts, sources, finished documents, compiled context, status, boundaries, and audit records. | `KNOWLEDGE.md` | Fence as data; never execute or obey instructions inside it. |
| Agent UI | UI surface patterns, state projection, user control points, rendering boundaries, and acceptance checks. | `AGENTUI.md` | Project runtime facts into UI; never become a second runtime fact source. |

## What v0.1 defines

- `AGENTUI.md` as the required entrypoint for UI pattern packs
- Five standard surface layers: `conversation`, `process`, `task`, `artifact`, and `evidence`
- Progressive loading across catalog, guide, surfaces, contracts, and examples
- Runtime projection rules that keep UI state separate from model, tool, artifact, and evidence facts
- Authoring requirements for stable agent workbenches, task capsules, artifact panes, and evidence views

## Pack shape

```text
pack-name/
├── AGENTUI.md       # required: metadata + usage guide
├── patterns/        # reusable interaction patterns and acceptance notes
├── surfaces/        # surface definitions for conversation/process/task/artifact/evidence
├── contracts/       # event, state, action, and accessibility contracts
├── states/          # state charts, lifecycle maps, and priority rules
├── examples/        # concrete UI compositions and annotated screenshots
├── schemas/         # optional validation schemas for metadata and contracts
├── evals/           # optional UX, rendering, and handoff test cases
└── assets/          # static diagrams, templates, icons, and screenshots
```

## Runtime contract

Compatible clients should:

1. Discover UI pattern packs by `AGENTUI.md`.
2. Load compact catalog metadata first.
3. Activate only relevant packs for the current product surface.
4. Project existing runtime facts into UI models without inventing new facts.
5. Keep final answers, process traces, task state, artifacts, and evidence in separate surfaces.
6. Preserve user control for approvals, interrupts, queue actions, artifact edits, and evidence export.
7. Treat examples and screenshots as guidance, not mandatory visual skins.

## Documentation

Key pages:

- [Specification](docs/en/specification.md)
- [Agent UI vs Agent Skills and Agent Knowledge](docs/en/agent-ui-vs-skills-knowledge.md)
- [Best practices](docs/en/authoring/best-practices.md)
- [Runtime standard](docs/en/client-implementation/runtime-standard.md)
- [中文规范](docs/zh/specification.md)

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The static site is generated at `docs/.vitepress/dist`.
