# Agent UI v0.3.0

Agent UI v0.3.0 reframes the standard around the full agent product ecosystem. It removes the misleading impression that Agent UI is mainly a boundary with two adjacent standards and makes tools, skills/workflows, context, artifacts, evidence, permissions, sessions, runtimes, models, and design systems first-class neighboring systems.

## Highlights

- Adds a new `Ecosystem boundaries` reference page under `/reference/ecosystem-boundaries`.
- Defines Agent UI's responsibility across runtimes, model/provider streams, tools/connectors, skills/workflows, memory/knowledge/context stores, artifact services, evidence/observability, permission/policy, session/storage, and design systems.
- Removes the old Skills/Knowledge-centered boundary page source files from the documentation tree.
- Updates the README, overview, definition, and specification pages to describe Agent UI as the projection layer from adjacent system facts to user interaction semantics.
- Keeps the runtime-first v0.2 surfaces and contracts intact: event projection, message parts, tool UI, HITL, artifacts/canvas, timeline/evidence, sessions/tabs, hydration, queue/steer, and performance budgets.

## Compatibility

- v0.3.0 does not change the runtime event schema introduced in v0.2.0.
- Existing v0.2.x implementors should treat this as a scope and documentation correction.
- New readers should start from runtime facts and ecosystem boundaries rather than from any single adjacent standard.

## Validation

- `npm run build`
- `VITEPRESS_BASE="/agentui/" npm run build`
- `npm pack --dry-run`
- `npm audit --omit=dev`
- Project-coupling and forbidden-term scan outside generated output.
- Build output checks for Mermaid rendering, corrected logo path, new ecosystem-boundary route, and removal of the old boundary route.
