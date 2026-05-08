# Agent UI v0.2.0

Agent UI v0.2.0 is a runtime-first correction and expansion of the draft standard. It focuses on the real work of agent products: projecting structured runtime events into controllable UI surfaces.

## Highlights

- Reframes Agent UI as a runtime projection and surface contract standard.
- Defines standard event classes for lifecycle, status, text, reasoning, tool, action, queue, artifact, evidence, state, messages, and completion.
- Adds nine surface standards: Composer, Message Parts, Runtime Status, Tool UI, Human-in-the-loop, Task Capsule, Artifact/Canvas, Timeline/Evidence, and Session/Tabs.
- Adds client implementation guidance for progressive session hydration, queue vs steer, controlled writes, and old-session recovery.
- Adds backend coordination and performance metrics for first status, first text paint, stream backlog, history restore, timeline load, artifact/evidence offload, and resource pressure.
- Adds behavior-level acceptance scenarios for send, tool calls, HITL, queue/steer, artifact handoff, evidence export, failures, missing facts, and old sessions.
- Adds research-source references for AI SDK UI, assistant-ui, CopilotKit, OpenAI Apps SDK, ChatKit, and event-stream UI implementations.
- Fixes Mermaid diagram rendering in the VitePress documentation site by adopting the Agent Knowledge docs pattern.

## Compatibility

- v0.1.0 is treated as superseded historical context.
- The current standard has no required Markdown entrypoint; implementations should start from runtime events and snapshots.
- New implementations should start from typed events, durable snapshots, surface contracts, controlled actions, and progressive hydration.

## Validation

- `npm install`
- `npm run build`
- `npm pack --dry-run`
- `npm audit --omit=dev`
- Project-coupling text scan for product-specific or private implementation references outside generated output.
- Build output check that Mermaid diagrams render through the client component instead of remaining `language-mermaid` code blocks.
