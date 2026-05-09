---
layout: home
title: Agent UI
description: Runtime-first UI contracts for agent products.

hero:
  name: Agent UI
  text: Runtime-first UI contracts for agent products.
  tagline: "Project agent facts into controllable conversation, process, task, artifact, evidence, and session surfaces."
  actions:
    - theme: brand
      text: Read the specification
      link: /en/specification
    - theme: alt
      text: Implementation quickstart
      link: /en/authoring/quickstart
    - theme: alt
      text: Standards ecosystem
      link: /en/reference/agent-ecosystem
    - theme: alt
      text: Runnable examples
      link: /en/examples/
    - theme: alt
      text: LLM full context
      link: ../llms-full.txt

features:
  - title: Runtime projection
    details: "Agent UI starts from typed runtime events, durable snapshots, artifact facts, and evidence facts."
  - title: Surface separation
    details: "Composer, messages, status, tools, tasks, artifacts, timeline, evidence, and sessions each own a clear user question."
  - title: Controlled writes
    details: "Approvals, interrupts, queue actions, steering, artifact edits, and evidence exports write through owning systems."
  - title: Clean final answers
    details: "Text, reasoning, tools, actions, artifacts, and evidence stay separate so generated answers do not become process dumps."
  - title: Progressive recovery
    details: "Old sessions can hydrate shells and recent messages before fetching full timelines, tool details, artifacts, and evidence."
  - title: Product-native
    details: "The standard does not require a UI bundle, design system, CSS framework, or manifest-based pack format."
---

## What Agent UI Defines

| Contract | What it answers |
| --- | --- |
| Projection model | How do runtime facts become user-visible UI state without becoming authority? |
| Message parts | Which text, reasoning, tool, action, artifact, and evidence parts should be rendered separately? |
| Standard surfaces | Which surface answers conversation, process, task, artifact, evidence, and session questions? |
| User actions | Which buttons, approvals, interrupts, edits, exports, and queue controls are controlled writes? |
| Hydration | What should appear immediately, and what can load progressively? |
| Acceptance | Which behavior-level scenarios prove the UI is compatible? |

## Start Here

- [What is Agent UI?](./what-is-agent-ui.md)
- [Latest specification](./specification.md)
- [Implementation quickstart](./authoring/quickstart.md)
- [Runnable examples](./examples/index.md)
- [Interactive workbench demo](./examples/interactive-workbench.md)
- [Runtime event projection](./contracts/runtime-event-projection.md)
- [Artifact Workspace](./surfaces/artifact-canvas.md)
- [Agent standards ecosystem](./reference/agent-ecosystem.md)

## For AI Clients

- [llms.txt](../llms.txt): concise navigation index.
- [llms-full.txt](../llms-full.txt): current English core documentation in one file.
- [llm.txt](../llm.txt) and [llm-full.txt](../llm-full.txt): compatibility aliases.

## Agent Standards Ecosystem

UI owns the projection layer. Runtime owns execution facts, Artifact systems own deliverables, Evidence owns trust records, and Knowledge owns source-grounded context.
