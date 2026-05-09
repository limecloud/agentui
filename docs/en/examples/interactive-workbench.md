---
title: Interactive workbench demo
description: Frontend demo that projects Agent UI runtime events into standard surfaces.
---

# Interactive workbench demo

This example is a live frontend projection demo. It uses one ordered stream of Agent UI events and renders the same facts into conversation, active process, tool UI, HITL, artifact, evidence, task, and raw event surfaces.

<ClientOnly>
  <AgentWorkbenchDemo />
</ClientOnly>

## What this demonstrates

- Running process stays expanded while runtime work is active.
- Completed process collapses into archive detail by default.
- Reasoning, tools, HITL, artifact, evidence, and final text stay separate typed parts.
- Tool state comes from `tool.*` events, not from assistant prose.
- HITL uses an explicit `action.required` -> `action.resolved` control path.
- Artifact and evidence facts route outside the final answer body.
- The raw ordered event stream remains visible for debugging and conformance checks.

## Event sequence

The demo intentionally keeps the input small enough to inspect by eye:

```text
session.opened
run.started
run.status
context.changed
plan.delta
reasoning.delta
tool.started
tool.progress
tool.result
action.required
action.resolved
text.delta
artifact.preview.ready
evidence.changed
run.finished
```

## Implementation notes

A production client should replace the local fixture with a real runtime adapter. The reducer behavior should remain the same: normalize source events into the Agent UI envelope, preserve sequence order for the active run, then project facts into surfaces by `owner`, `scope`, `phase`, `surface`, and stable ids.

Related pages:

- [Flow and taxonomy](../reference/flow-and-taxonomy.md)
- [Runtime event projection](../contracts/runtime-event-projection.md)
- [Message parts](../surfaces/message-parts.md)
- [Timeline and evidence](../surfaces/timeline-evidence.md)

## Catalog

- [Runnable examples](./index.md)
