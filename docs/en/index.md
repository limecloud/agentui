---
layout: home

hero:
  name: Agent UI
  text: Runtime-first UI contracts for agent products.
  tagline: "A draft standard for projecting agent events into controllable conversation, process, task, artifact, and evidence surfaces."
  actions:
    - theme: brand
      text: Read the specification
      link: /en/specification
    - theme: alt
      text: Implementation quickstart
      link: /en/authoring/quickstart

features:
  - title: Runtime projection
    details: "Agent UI starts from typed events and durable snapshots, not from Markdown manifests or visual skins."
  - title: Message parts
    details: "Text, reasoning, tool calls, action requests, artifacts, and evidence stay separate so final answers stay clean."
  - title: User control
    details: "Approvals, interrupts, queue actions, steering, artifact edits, and evidence export are first-class controlled writes."
  - title: Progressive hydration
    details: "Old sessions should show a shell and recent messages before loading timelines, tools, artifacts, and evidence details."
  - title: Surface separation
    details: "Composer, Runtime Status, Tool UI, Task Capsule, Artifact/Canvas, Timeline/Evidence, and Session/Tabs each answer a different user question."
  - title: Product-native
    details: "The contract fits inside existing products; no standalone UI bundle or manifest is required."
---

## Runtime shape

Agent UI defines the projection layer between an agent runtime and a product interface.

```text
agent events + session snapshots + artifact facts + evidence facts
  -> projection reducer
  -> UI projection state
  -> user-visible surfaces
  -> controlled write actions
```

The standard is useful when an agent product must show more than a plain transcript:

| User question | Surface |
| --- | --- |
| What did I ask and what is the final answer? | Conversation / Message Parts |
| Is the agent alive, waiting, calling tools, or blocked? | Runtime Status / Tool UI |
| What is queued, running, needs input, or failed? | Task Capsule / Session Tabs |
| Where is the deliverable and can I edit it? | Artifact / Canvas |
| Can I verify, review, replay, or hand off the result? | Timeline / Evidence |

## Core rules

Compatible clients SHOULD:

- Consume structured events instead of inferring state from prose.
- Separate runtime facts, artifact facts, evidence facts, and UI projection state.
- Reconcile final text without duplicating streamed text.
- Keep reasoning and process details outside final answer text unless explicitly exported.
- Render tool input/output as compressed, inspectable process UI with large output offload.
- Treat missing facts honestly as `unknown`, `unavailable`, `stale`, `blocked`, or `needs-input`.
- Route all state-changing user actions through runtime, artifact, or evidence APIs.

## Ecosystem boundary

Agent UI does not own the whole agent stack. Runtimes own authoritative events and snapshots. Tools and workflows own execution. Context and policy systems own facts, memory, permissions, and trust boundaries. Artifact and evidence services own durable files, traces, verification, and audit records. Design systems own visual components.

Agent UI owns the projection layer that turns those facts into user-visible surfaces, controlled actions, recovery states, and behavior-level acceptance checks.
