---
title: v0.6.1 changelog
description: Agent UI v0.6.1 changelog.
---

# v0.6.1 Changelog

### Added

- Adds Agent Runtime profile projection test cases in English and Simplified Chinese, covering runtime ids, read model projection, tool approval, task retry, routing, evidence, replay, review, hydration, and governance failures.

### Changed

- Aligns the runtime event projection contract with Agent Runtime-style `RuntimeEvent`, `ThreadReadModel`, `TaskSnapshot`, and `EvidencePack` sources.
- Extends the public Agent UI event schema with optional runtime profile correlation fields such as `runtimeId`, `attemptId`, `stepId`, `subagentId`, `traceId`, `evidencePackRef`, `replayRef`, and `reviewRef`.
