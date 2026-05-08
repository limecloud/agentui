# Agent UI v0.2.1

Agent UI v0.2.1 is a documentation-site patch release for v0.2.0. The standard content remains aligned with the v0.2.0 runtime-first specification.

## Fixed

- Fixed the GitHub Pages navigation logo path when the documentation site is deployed under `/agentui/`.
- Confirmed Mermaid diagrams still render through the client-side diagram component rather than static code blocks.

## Compatibility

- No specification contract changes from v0.2.0.
- Existing v0.2.0 implementation guidance remains valid.

## Validation

- `npm run build`
- `npm pack --dry-run`
- `npm audit --omit=dev`
- Project-coupling and forbidden-term scan outside generated output.
- Build output check for Mermaid rendering and corrected logo path.
