---
title: Interactive workbench demo
description: Notes for the standalone Agent UI workbench demo.
---

# Interactive workbench demo

The interactive workbench is no longer embedded in this documentation page. Open the standalone demo to run the event stream, switch scenarios, approve HITL actions, edit/export artifacts, and inspect projected state.

<p>
  <a class="VPButton medium brand" href="../../examples/agent-workbench/" target="_self">Open standalone Agent UI Workbench demo</a>
</p>

## What the demo demonstrates

- Running process stays expanded while runtime work is active.
- Completed process collapses into archive detail by default.
- Reasoning, tools, HITL, artifact, evidence, and final text stay separate typed parts.
- Tool state comes from `tool.*` events, not from assistant prose.
- HITL uses an explicit `action.required` -> `action.resolved` control path.
- Artifact and evidence facts route outside the final answer body.
- The ordered event stream remains visible for debugging and conformance checks.

## Related pages

- [Runnable examples](./index.md)
- [Flow and taxonomy](../reference/flow-and-taxonomy.md)
- [Runtime event projection](../contracts/runtime-event-projection.md)
