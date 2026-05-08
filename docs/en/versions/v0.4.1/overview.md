---
title: v0.4.1 Overview
description: What changed in Agent UI v0.4.1.
---

# v0.4.1 Overview

v0.4.1 adds LLM-friendly documentation entrypoints for Agent UI. The release publishes concise and full-context markdown files at the repository root and the documentation site root so AI clients can discover the standard without crawling the whole site.

## Highlights

- Adds `llms.txt` as the concise LLM navigation index.
- Adds `llms-full.txt` as a concatenated English core documentation file with source URLs.
- Adds compatible `llm.txt` and `llm-full.txt` aliases.
- Publishes the same files through `docs/public/` so GitHub Pages serves them from the site root.
- Includes the LLM entrypoint files in the package manifest.

## Compatibility

v0.4.1 does not change Agent UI protocol semantics. It only improves machine-readable discovery and packaging for documentation consumers.
