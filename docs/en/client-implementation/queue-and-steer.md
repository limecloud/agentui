---
title: Queue and steer
description: Handling follow-up input while an agent turn is running.
---

# Queue and steer

Users often want to add information while an agent is already working. A compatible UI must make the consequence explicit.

## Modes

| Mode | Semantics | UI consequence |
| --- | --- | --- |
| `queue` | Add a new turn after current work. | Queue capsule and editable preview. |
| `steer` | Deliver input to the current running turn. | Pending steer preview on current task. |
| `new-task` | Start separate work. | New task/session capsule or tab. |
| `reject` | Runtime cannot accept input. | Preserve draft and show reason. |

## Queue contract

Queued input SHOULD have:

- queued id
- target session or task id
- preview
- creation time
- position
- mode
- edit/remove capability when supported
- state transitions: queued, started, removed, failed

Queue events update Task and Composer surfaces. They should not create fake assistant messages.

## Steer contract

Steer input SHOULD have:

- target turn id
- user text or structured patch
- pending state
- accepted/rejected status
- optional cancellation
- visible relationship to the active task

A client SHOULD label steer as affecting current work. It should not look like a normal queued follow-up.

## Conflict handling

If the runtime cannot apply a steer:

- show rejected or unavailable state
- preserve user input
- offer queue or new-task fallback when possible
- keep diagnostic reason in process surface

## Acceptance scenarios

1. Pressing send during a running turn does not silently choose hidden behavior.
2. A queued follow-up shows position and can be removed before start.
3. A steer preview remains visible until accepted or rejected.
4. Queue mutation updates the task capsule without rehydrating full session history.
5. Rejected steer preserves the draft and offers another path.
