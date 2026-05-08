---
title: v0.1.0 Specification
description: Superseded historical snapshot.
---

# Agent UI v0.1.0 Specification

This page is a historical note. The v0.1.0 specification is superseded by the runtime-first [latest specification](/en/specification).

## Current guidance

New implementations should ignore v0.1.0 manifest mechanics and implement:

- typed runtime event projection
- message part separation
- tool UI and human-in-the-loop surfaces
- artifact/canvas handoff
- timeline/evidence surfaces
- progressive old-session hydration
- queue vs steer behavior
- controlled writes through runtime, artifact, and evidence APIs

## Preserved concept

The preserved idea is surface separation: Conversation, Process, Task, Artifact, and Evidence answer different user questions and should not be collapsed into one plain transcript.
