---
title: Glossary
description: Core Agent UI terms.
---

# Glossary

## Agent UI

A runtime projection standard for turning structured agent facts into user-visible interaction surfaces and controlled actions.

## Runtime fact

A fact owned by an agent runtime or protocol adapter, such as run id, lifecycle state, text delta, tool call, queue state, or action request.

## Projection state

UI-owned state derived from facts, such as selected tab, collapsed tool rows, visible message window, focused artifact, or local draft. Projection state is not authoritative runtime truth.

## Surface

A user-visible region that answers one class of question. Standard surfaces include Composer, Message Parts, Runtime Status, Tool UI, Human-in-the-loop, Task Capsule, Artifact Workspace, Timeline/Evidence, and Session/Tabs.

## Message part

A typed piece of message UI, such as final text, reasoning, tool call, action request, data, artifact reference, or evidence reference.

## Runtime status

A short visible state showing whether the agent is submitted, routing, preparing, streaming, calling tools, blocked, retrying, cancelled, failed, or completed.

## Tool UI

The surface for tool lifecycle, safe input summaries, progress, output previews, large output offload, and detail inspection.

## Human-in-the-loop

A state where the runtime requires user approval, structured input, plan decision, correction, or cancellation before it can continue.

## Queue

A user input scheduled to run after the active run finishes.

## Steer

A user input intended to affect the currently active run.

## Artifact

A generated or edited deliverable such as a document, file, diff, image, table, code object, canvas, or structured output.

## Evidence

Trace, citation, verification, replay, review, or audit information that supports or explains an agent run.
