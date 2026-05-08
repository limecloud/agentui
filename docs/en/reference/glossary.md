---
title: Glossary
description: Terms used by the Agent UI standard.
---

# Glossary

## Agent UI pack

A directory containing `AGENTUI.md` and optional files that describe UI projection patterns for agent work.

## Surface

A user-facing area that answers one class of question. Standard surfaces are Conversation, Process, Task, Artifact, and Evidence.

## Conversation

The surface for user messages, assistant final text, composer behavior, branches, attachments, and direct collaboration.

## Process

The surface for runtime status, reasoning summaries, tool progress, errors, and timeline details.

## Task

The surface for queued work, background work, blocked states, approvals, interrupts, subagents, and plan decisions.

## Artifact

The surface for generated deliverables such as documents, files, diffs, images, tables, code, canvases, or structured outputs.

## Evidence

The surface for citations, source maps, verification, replay, review decisions, and audit records.

## Runtime fact

State owned by the agent runtime or tool system, such as session id, turn id, task id, tool event, queue state, or permission request.

## Projection state

UI-only derived state, such as selected panel, collapsed step count, visible history window, status label, or sort order.

## Controlled write

A user action that changes runtime, artifact, task, or evidence state through an explicit API boundary.

## Capsule

A compact representation of active, queued, blocked, or completed work. Capsules are useful when long-running work should remain visible without occupying the whole conversation.

## Handoff

A transition where work, context, artifacts, or evidence move between users, agents, clients, sessions, or devices.

## Progressive rendering

A rendering strategy that shows shell, recent content, status, and answer text before expensive history, process detail, artifact previews, or evidence data finish loading.

## Projection-only

A contract marker meaning the UI may derive and cache display state, but it must not become authoritative for runtime, artifact, or evidence facts.
