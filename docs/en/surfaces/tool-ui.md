---
title: Tool UI surface
description: Rendering rules for tool calls, command output, external actions, and large results.
---

# Tool UI surface

Tool UI turns external work into understandable process evidence without polluting the final answer.

## Tool step anatomy

A tool step SHOULD expose:

| Field | Purpose |
| --- | --- |
| `tool.id` | Stable id for linking, retry, evidence, and logs. |
| `tool.kind` | Command, browser, file, API, search, database, custom. |
| `status` | Pending, running, succeeded, failed, cancelled, timed out. |
| `input.summary` | Safe, compact input preview. |
| `output.preview` | Human-readable result preview. |
| `output.ref` | Pointer to full output when too large. |
| `duration` | Timing summary. |
| `risk` | Permission or sensitivity category when relevant. |
| `source_refs` | Sources or artifacts produced by the tool. |

## Input rendering

Tool input often contains secrets, long JSON, file paths, or irrelevant defaults. Clients SHOULD:

- show the smallest meaningful input fields
- redact secrets and credentials
- collapse long JSON by default
- keep raw input available only in trusted diagnostic views
- explain omitted fields with count or size

## Output rendering

| Output shape | Recommended rendering |
| --- | --- |
| Empty output | Show `No output` with exit/status information. |
| Short text | Inline preview inside process step. |
| Large text | Summary, byte/token count, and open-details action. |
| JSON object | Render important keys first; allow raw view. |
| Image or media | Thumbnail or placeholder with open action. |
| File change | Diff or artifact reference. |
| Source list | Evidence/source surface entry. |
| Error | Failure summary, stderr preview, retry or diagnostic action. |

## Large output rule

Large tool output SHOULD NOT be inserted into the final answer or message body. Use an offloaded reference and a detail surface.

Recommended thresholds are product-specific, but an implementation SHOULD define when to:

- truncate input
- summarize output
- offload full output
- warn about context impact
- require explicit expansion

## Retry and replay

If retry is supported:

- Show whether the tool is safe to retry.
- Preserve each attempt with its own status and output reference.
- Do not overwrite failed attempt evidence.
- Require confirmation for high-risk or non-idempotent tools.

## Acceptance scenarios

1. A tool with no output shows an explicit empty state.
2. A tool with large output shows a summary and detail action, not full output in the answer.
3. A failed tool preserves stderr or diagnostic preview.
4. A generated file becomes an artifact reference.
5. Tool evidence remains linkable from timeline and evidence surfaces.
