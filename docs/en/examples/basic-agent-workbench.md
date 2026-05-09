---
title: Basic agent workbench
description: Standalone runtime-first Agent UI workbench demo.
---

# Basic agent workbench

The workbench demo now lives outside the documentation shell. It is a complete standalone page that owns its layout, reducer, scenario library, controls, and projected surfaces.

<p>
  <a class="VPButton medium brand" href="../../examples/agent-workbench/" target="_self">Open standalone Agent UI Workbench demo</a>
</p>

## Architecture boundary

- Documentation pages describe the Agent UI contract and link to the running demo.
- The standalone demo owns the runtime fixture, reducer, UI shell, controls, and projected state.
- The demo still uses the same event semantics as the standard: ordered events, typed surfaces, controlled actions, artifact/evidence separation, completed-process archive, and team/workbench projection.

## Related pages

- [Runnable examples](./index.md)
- [Flow and taxonomy](../reference/flow-and-taxonomy.md)
- [Message parts](../surfaces/message-parts.md)
- [Timeline and evidence](../surfaces/timeline-evidence.md)
