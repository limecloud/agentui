# Agent UI v0.4.1

Agent UI v0.4.1 adds LLM-friendly documentation entrypoints. It publishes concise and full-context markdown files at the repository root and the documentation site root so AI clients can discover the standard without crawling the whole site.

## Highlights

- Adds `llms.txt` as the concise LLM navigation index.
- Adds `llms-full.txt` as a concatenated English core documentation file with source URLs.
- Adds compatible `llm.txt` and `llm-full.txt` aliases.
- Publishes the same files through `docs/public/` so GitHub Pages serves them from the site root.
- Includes the LLM entrypoint files in the package manifest.

## Validation

- `npm run build`
- `VITEPRESS_BASE="/agentui/" npm run build`
- `npm pack --dry-run`
- Root/public LLM file consistency checks
- Forbidden-term and project-coupling scan outside generated output

---

# Agent UI v0.4.0

Agent UI v0.4.0 makes Artifact Workspace a first-class surface in the standard. The release keeps Artifact inside Agent UI, but draws a hard boundary: Agent UI owns artifact interaction semantics; artifact services own content, storage, version persistence, export bytes, and write authority; evidence systems own verification, replay, and review facts.

## Highlights

- Expands the former artifact canvas guidance into `Artifact Workspace`.
- Defines the artifact workspace interaction contract: artifact facts, cards, preview, edit/canvas, version rail, diff/review, export/handoff, source links, and evidence links.
- Adds specific artifact event classes: `artifact.created`, `artifact.updated`, `artifact.preview.ready`, `artifact.version.created`, `artifact.diff.ready`, `artifact.export.started`, `artifact.export.completed`, `artifact.failed`, and `artifact.deleted`.
- Keeps `artifact.changed` as a collapsed adapter event for clients that cannot emit the finer-grained artifact lifecycle yet.
- Updates runtime projection, runtime standard, message parts, quickstart, examples, glossary, acceptance scenarios, and research references around artifact-first delivery.

## Compatibility

- Existing v0.2/v0.3 clients can keep projecting `artifact.changed` while they migrate to the new specific artifact events.
- The release does not turn Agent UI into an artifact storage protocol.
- Implementors should expose stable artifact references and interaction state instead of copying full artifact content into the conversation transcript.

## Research Inputs

- Claude Artifacts: substantial standalone content belongs in a dedicated artifact area rather than the main conversation stream.
- Vercel AI SDK `UIMessage`: UI rendering should use typed message parts such as files, sources, tools, data, text, and reasoning.
- assistant-ui: clients should render attachments, message parts, and tool UI through runtime adapters and typed renderers.
- OpenAI Apps SDK: rich UI belongs behind structured tool/component boundaries, with component-only metadata kept out of the model-visible transcript.

## Validation

- `npm run build`
- `VITEPRESS_BASE="/agentui/" npm run build`
- `npm audit --omit=dev`
- `npm pack --dry-run`
- Forbidden-term and project-coupling scan outside generated output.
- Build output checks for Artifact Workspace routes, artifact export events, Mermaid rendering, and corrected GitHub Pages logo path.
