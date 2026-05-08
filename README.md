# Agent UI

Agent UI is a runtime-first draft standard for agent interaction surfaces. It defines how AI clients project structured agent events, tool calls, human-in-the-loop requests, artifacts, tasks, sessions, and evidence into user-visible UI without turning the UI into a second source of runtime truth.

Agent UI sits between runtime facts and product interaction. It does not own execution, context, storage, policy, or visual components; it defines how facts from those systems become visible, controllable, resumable, editable, and auditable.

## Core boundary

| Adjacent system | It owns | Agent UI owns |
| --- | --- | --- |
| Agent runtime | Runs, turns, tasks, events, snapshots, and authoritative status. | Projection into status, messages, tasks, and controls. |
| Tools and workflows | Executable actions, connectors, procedures, scripts, and tool results. | Tool progress, safe summaries, recovery states, and user control points. |
| Context and policy | Facts, sources, memory, permissions, risk, and trust boundaries. | Citations, missing-state UI, approval/input surfaces, and honest fallbacks. |
| Artifacts and evidence | Files, canvases, diffs, traces, reviews, replays, verification, and audit records. | Artifact cards, canvas entrypoints, timelines, evidence surfaces, and handoff states. |
| Design systems | Visual components, tokens, layout, and responsive behavior. | Surface semantics and behavior-level acceptance checks. |

## What v0.2 defines

- A runtime event projection contract for lifecycle, text, reasoning, tool, action, queue, artifact, evidence, and session events.
- Nine standard surfaces: Composer, Message Parts, Runtime Status, Tool UI, Human-in-the-loop, Task Capsule, Artifact Workspace, Timeline/Evidence, and Session/Tabs.
- A client implementation model for session hydration, progressive rendering, queue vs steer, durable snapshots, and controlled writes.
- Performance metrics for first status, first text, delta backlog, history hydration, timeline load, and artifact/evidence offload.
- Acceptance scenarios that prove behavior instead of checking whether a component or file exists.

## Runtime architecture

```text
agent runtime events + durable snapshots
  -> projection reducer
  -> UI projection store
  -> Conversation / Process / Task / Artifact Workspace / Evidence surfaces
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
- [Ecosystem boundaries](docs/en/reference/ecosystem-boundaries.md)
- [中文规范](docs/zh/specification.md)


## Related Agent standards

- [Agent Knowledge](https://limecloud.github.io/agentknowledge/) - source-grounded knowledge packs.
- [Agent UI](https://limecloud.github.io/agentui/) - interaction surfaces for agent products.
- [Agent Runtime](https://limecloud.github.io/agentruntime/) - execution facts, controls, tasks, tools, and recovery.
- [Agent Evidence](https://limecloud.github.io/agentevidence/) - evidence, provenance, verification, review, replay, and export.
- [Agent Policy](https://limecloud.github.io/agentpolicy/) - policy decisions, approvals, permissions, risk, retention, waivers, and traces.

See the [Agent standards ecosystem](docs/en/reference/agent-ecosystem.md) page for the mutual-link map and future standard candidates.

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
