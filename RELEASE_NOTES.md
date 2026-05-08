# Agent UI v0.1.0

Agent UI v0.1.0 is the first public draft of a portable interaction-surface standard for AI agent products.

## Highlights

- Introduces `AGENTUI.md` as the required entrypoint for UI pattern packs.
- Defines five standard surfaces: Conversation, Process, Task, Artifact, and Evidence.
- Establishes projection-only runtime boundaries so UI state does not become a second runtime fact source.
- Adds standard `type` and `profile` values for workbench, chat-first, artifact-first, task-first, embedded, and related surface packs.
- Adds English and Simplified Chinese documentation, version snapshots, a basic workbench example, and a frontmatter schema.
- Adds GitHub Pages deployment workflow.

## Validation

- `npm install`
- `npm run build`
- `npm audit --omit=dev`
- Project-coupling text scan for product-specific or private implementation references outside generated output.

## Compatibility

- This is the first public draft.
- `AGENTUI.md` is the only required entrypoint.
- UI packs are projection guidance and should not be executed.
