---
title: Human-in-the-loop surface
description: Approval, permission, plan, and elicitation patterns for Agent UI.
---

# Human-in-the-loop surface

As agents gain execution power, user intervention must be modeled as structured state, not as ordinary assistant prose.

## Standard request types

| Type | Use when | Required UI |
| --- | --- | --- |
| `approval` | User must approve or reject a proposed action. | Approve/reject controls and scope summary. |
| `permission` | Runtime needs elevated capability. | Risk, target, duration, and consequence. |
| `plan_review` | Agent produced a plan before execution. | Approve, reject, edit, request changes. |
| `elicitation` | Agent needs missing user input. | Form, options, or free text with clear prompt. |
| `credential_needed` | User must configure credentials. | Safe route to settings; preserve current task. |
| `cost_confirmation` | Task may spend notable money, tokens, or time. | Estimate, limit, and cancel path. |
| `handoff_acceptance` | User or another agent must accept transferred work. | Summary, artifacts, evidence, accept/decline. |

## Request contract

A human-in-the-loop request SHOULD include:

- stable request id
- task or turn id
- request type
- title and concise explanation
- risk or severity
- available responses
- expiration or stale policy
- audit summary after response
- replay or evidence reference when relevant

A client MUST NOT treat a Markdown sentence as sufficient permission for a high-risk action.

## Plan UI

Plan approval should be a stateful object:

- proposed steps
- scope and expected outputs
- risk/cost summary
- approve/reject/edit controls
- saved plan or artifact reference when applicable
- rejection reason or change request
- audit summary after decision

If a plan is rejected, preserve the plan and the reason so the agent can revise without losing context.

## Completion behavior

After a request is resolved:

- remove it from pending attention surfaces
- keep a compact audit summary
- link the response to process and evidence surfaces
- avoid leaving stale sticky cards in the main conversation

## Acceptance scenarios

1. A high-risk action renders as approval UI with scope and consequence.
2. Approving or rejecting writes through a controlled runtime action.
3. A resolved request collapses to summary and stops appearing as pending.
4. A rejected plan preserves the reason and can be revised.
5. A credentials-needed state preserves the user's draft and task context.
