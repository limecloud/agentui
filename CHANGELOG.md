# Changelog


## v0.4.3 - 2026-05-08

### Fixed

- Fixed Simplified Chinese homepage rendering by making localized index pages proper VitePress home pages.
- Fixed repository-base GitHub Pages logo loading.

### Changed

- Refined English and Simplified Chinese home pages with concise hero actions, quick links, ecosystem links, and LLM entrypoints.
- Updated package and version navigation to 0.4.3.

## v0.4.2 - 2026-05-08

### Added

- Added public Agent standards ecosystem page with mutual links across Agent Knowledge, Agent UI, Agent Runtime, and Agent Evidence.
- Added ecosystem navigation, reference sidebar entries, version snapshots, and LLM index links.

### Changed

- Updated package and version navigation to 0.4.2.

## v0.4.1

### Added

- Added root and site-root `llms.txt` files for concise LLM navigation.
- Added root and site-root `llms-full.txt` files with concatenated English core documentation and source URLs.
- Added `llm.txt` and `llm-full.txt` compatibility aliases.
- Added LLM entrypoint files to the package manifest.

### Changed

- Updated version navigation to include v0.4.1.

## v0.4.0

### Added

- Expanded Artifact into a first-class Agent UI Artifact Workspace surface.
- Added artifact interaction contract covering artifact facts, workspace regions, cards, preview, edit/canvas, versions, diff, export, handoff, source links, and evidence links.
- Added specific artifact event classes to the public event schema: `artifact.created`, `artifact.updated`, `artifact.preview.ready`, `artifact.version.created`, `artifact.diff.ready`, `artifact.export.started`, `artifact.export.completed`, `artifact.failed`, and `artifact.deleted`.
- Added external research notes from Claude Artifacts, Vercel AI SDK `UIMessage`, assistant-ui attachments/tool UI, and OpenAI Apps SDK structured tool/widget boundaries.
- Added v0.4.0 English and Simplified Chinese version snapshots.

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
