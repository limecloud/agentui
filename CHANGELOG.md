# Changelog

## v0.3.0

### Changed

- Reframed the boundary guide around the full Agent UI ecosystem: runtime, models, tools, skills/workflows, context, artifacts, evidence, permissions, sessions, and design systems.
- Moved the ecosystem boundary guide out of the start section and into reference navigation under `/reference/ecosystem-boundaries`.
- Removed the old Skills/Knowledge-centered boundary page source files to avoid implying that Agent UI is scoped to only two adjacent standards.
- Updated README, overview, definition, and specification pages so Agent UI is described as a projection layer across the full agent product stack.

## v0.2.1

### Fixed

- Fixed the GitHub Pages navigation logo path when the site is deployed under a repository base path.

## v0.2.0

### Added

- Runtime-first Agent UI specification focused on event projection, surface contracts, controlled writes, and progressive hydration.
- Standard surfaces: Composer, Message Parts, Runtime Status, Tool UI, Human-in-the-loop, Task Capsule, Artifact/Canvas, Timeline/Evidence, and Session/Tabs.
- Runtime event projection contract covering lifecycle, status, text, reasoning, tool, action, queue, artifact, evidence, state, messages, and completion events.
- Backend coordination, performance metrics, session hydration, queue/steer, and behavior-level acceptance scenarios.
- Research source reference for AI SDK UI, assistant-ui, CopilotKit, OpenAI Apps SDK, ChatKit, and other event-stream UI implementations.
- Mermaid rendering support for the documentation site.
- v0.2.0 English and Simplified Chinese version snapshots.

### Changed

- Reframed Agent UI around runtime events, projection state, and controlled UI actions.
- Quickstart now starts from an event adapter and projection store.
- Documentation navigation exposes surfaces, contracts, client implementation, and research as first-class sections.
- Removed the old document-entrypoint requirement from the current standard.

## v0.1.0

### Added

- Initial Agent UI standard draft.
- Initial documentation draft. Superseded by v0.2.0.
- Five-surface model: Conversation, Process, Task, Artifact, and Evidence.
- Runtime projection boundary for separating UI-derived state from runtime, artifact, and evidence facts.
- English and Simplified Chinese documentation site.
- Authoring, client implementation, reference, and example pages.
- v0.1.0 version snapshots and release notes.
- GitHub Pages deployment workflow.
