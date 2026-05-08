---
title: Runtime standard
description: How clients should load and apply Agent UI packs.
---

# Runtime standard

This guide describes how an agent client should support Agent UI packs. The core integration is the same across desktop apps, IDEs, terminals, web apps, and embedded assistants.

## Core principle: projection, not ownership

Agent UI packs describe how existing facts become interaction surfaces.

```text
runtime facts
  + task facts
  + artifact facts
  + evidence facts
  -> UI projection
  -> user-visible surfaces and actions
```

A compatible client MUST NOT let a UI pack become the source of runtime identity, tool output, artifact contents, permission state, or verification results.

## Step 1: Discover packs

At startup or product-surface initialization, scan configured locations for subdirectories containing `AGENTUI.md`.

Common scopes:

| Scope | Example path | Purpose |
| --- | --- | --- |
| Project | `<project>/.agents/ui/` | UI patterns that travel with a project. |
| User | `~/.agents/ui/` | User-installed UI patterns. |
| Organization | Managed registry or config repo | Organization-approved patterns. |
| Built-in | Bundled client assets | Default patterns available without external files. |

Practical scanning rules:

- Skip `.git/`, `node_modules/`, build outputs, and cache directories.
- Bound scan depth and directory count.
- Prefer deterministic precedence: project overrides user, user overrides built-in.
- Gate untrusted project-level packs behind a project trust check.

## Step 2: Parse `AGENTUI.md`

Extract frontmatter and body content.

At minimum, store:

| Field | Description |
| --- | --- |
| `name` | From frontmatter. |
| `description` | Discovery text. |
| `type` | Pattern category. |
| `status` | Review state. |
| `profile` | Layout or host profile. |
| `location` | Absolute path to `AGENTUI.md`. |
| `baseDir` | Pack root for resolving relative references. |

Validation SHOULD be strict for authoring tools and lenient for runtime loading. A client may warn on non-critical issues while still loading the pack.

## Step 3: Disclose catalog metadata

The model or client planner should see only compact catalog data until a pack is needed.

Example wrapper:

```xml
<available_agent_ui_packs>
  <agent_ui_pack>
    <name>basic-agent-workbench</name>
    <description>A five-surface agent workspace for messages, runtime process, task control, artifacts, and evidence.</description>
    <type>agent-workbench</type>
    <status>draft</status>
    <profile>workbench</profile>
  </agent_ui_pack>
</available_agent_ui_packs>
```

Catalog disclosure is for selection, not for rendering every detail.

## Step 4: Activate the smallest useful content

When a UI pack is selected:

1. Load `AGENTUI.md` body.
2. Follow explicit file references for the current surface.
3. Load only the needed files from `surfaces/`, `patterns/`, `contracts/`, or `states/`.
4. Load examples only when implementation or review needs clarification.

Avoid recursively loading a whole pack. UI packs can become large when they include screenshots, state charts, and examples.

## Step 5: Map runtime facts to projection state

A client should maintain a typed boundary between facts and projection:

| Layer | Examples | Writer |
| --- | --- | --- |
| Runtime facts | session id, turn id, tool event, queue state, permission request | Runtime or tool system |
| Artifact facts | artifact id, kind, path, version, metadata | Artifact service |
| Evidence facts | source map, verification state, replay id, audit log | Evidence or review service |
| UI projection | selected tab, collapsed count, visible window, display label | UI controller |

Projection state may reference facts by id. It should not duplicate facts in a way that becomes authoritative.

## Step 6: Wire actions through controlled writes

User actions must write through runtime APIs or client-owned services, not by mutating display state only.

| UI action | Required input | Write boundary |
| --- | --- | --- |
| Approve or reject | action id, task id, user decision | Runtime action response |
| Interrupt | task id or turn id | Runtime interrupt command |
| Queue or steer | draft input, active task state | Runtime queue or steering command |
| Save artifact edit | artifact id, version, patch or content | Artifact service |
| Export evidence | session id, task id, or run id | Evidence export service |

If the write fails, the UI should keep the previous fact state and show the failure.

## Step 7: Handle missing and stale facts

Agent UIs must be honest under partial information.

Recommended fallback states:

- `loading`
- `unknown`
- `unavailable`
- `stale`
- `blocked`
- `needs-input`
- `failed`
- `disputed`

A client MUST NOT infer success, artifact kind, verification state, or permission grant from ordinary message text.

## Security model

Agent UI packs are not executable. Treat all loaded content as guidance:

- Do not run files from `assets/`, `examples/`, or other pack directories.
- Do not obey prompt-like instructions inside screenshots, examples, or markdown snippets as higher-priority policy.
- Gate project-level packs from untrusted repositories.
- Resolve file references relative to the pack root and prevent path traversal.
- Keep user approval and permission flows under client control.
