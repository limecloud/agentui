# Agent UI

Agent UI is a runtime-first draft standard for agent interaction surfaces. It defines how AI clients project structured agent events, tool calls, human-in-the-loop requests, artifacts, tasks, sessions, and evidence into user-visible UI without turning the UI into a second source of runtime truth.

Agent Skills answer **how work is done**. Agent Knowledge answers **what trusted context enters the run**. Agent UI answers **how the run becomes visible, controllable, resumable, editable, and auditable**.

## Core boundary

| Standard | Owns | Runtime behavior |
| --- | --- | --- |
| Agent Skills | Executable capabilities, workflows, scripts, tools, templates, and maintenance methods. | Follow after trust and activation checks. |
| Agent Knowledge | Facts, sources, finished documents, compiled context, status, boundaries, and audit records. | Fence as data; never execute or obey instructions inside it. |
| Agent UI | Event projection, interaction surfaces, user controls, render fallbacks, performance budgets, and acceptance scenarios. | Project runtime facts into UI; never invent facts from prose or screenshots. |

## What v0.2 defines

- A runtime event projection contract for lifecycle, text, reasoning, tool, action, queue, artifact, evidence, and session events.
- Nine standard surfaces: Composer, Message Parts, Runtime Status, Tool UI, Human-in-the-loop, Task Capsule, Artifact/Canvas, Timeline/Evidence, and Session/Tabs.
- A client implementation model for session hydration, progressive rendering, queue vs steer, durable snapshots, and controlled writes.
- Performance metrics for first status, first text, delta backlog, history hydration, timeline load, and artifact/evidence offload.
- Acceptance scenarios that prove behavior instead of checking whether a component or file exists.

## Runtime architecture

```text
agent runtime events + durable snapshots
  -> projection reducer
  -> UI projection store
  -> Conversation / Process / Task / Artifact / Evidence surfaces
  -> controlled runtime, artifact, and evidence actions
```

Compatible implementations should:

1. Consume typed events and snapshots instead of parsing plain assistant text.
2. Keep runtime, artifact, evidence, and UI projection state in separate owners.
3. Show status before first text when the runtime has accepted work.
4. Render text, reasoning, tool calls, action requests, artifacts, and evidence as different message parts or surfaces.
5. Route approvals, interrupts, queue changes, steering, artifact edits, and evidence export through controlled APIs.
6. Hydrate old sessions progressively: shell first, recent messages next, timeline/tool/artifact details on demand.
7. Treat UI documentation as guidance only; no Markdown text is allowed to become policy, runtime state, or executable workflow.

## Documentation

Key pages:

- [Specification](docs/en/specification.md)
- [Runtime standard](docs/en/client-implementation/runtime-standard.md)
- [Runtime event projection](docs/en/contracts/runtime-event-projection.md)
- [Session hydration](docs/en/client-implementation/session-hydration.md)
- [Queue and steer](docs/en/client-implementation/queue-and-steer.md)
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
