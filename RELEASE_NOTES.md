# Agent UI v0.4.4

Agent UI v0.4.4 fixes repository-base homepage asset links. The localized home pages now keep their home layout while LLM entrypoint links resolve under the project site path and the navigation logo loads from the correct public asset path.

## Highlights

- Fixes localized homepage LLM entrypoint links for GitHub Pages repository-base deployments.
- Fixes the documentation logo asset path under repository-base deployments.
- Keeps the localized home page layout correction from v0.4.3.
- Keeps the core Agent UI specification compatible with v0.4.3.
- Updates version snapshots and package metadata.

## Validation

- `VITEPRESS_BASE` repository-base build
- Localized homepage layout checks
- LLM file consistency checks
- `git diff --check`
- `npm audit --omit=dev`
- `npm pack --dry-run`
