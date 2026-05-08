---
title: Acceptance scenarios
description: Standard behavior checklist for Agent UI implementations.
---

# Acceptance scenarios

Agent UI work is accepted by behavior, not by the existence of a component or document file. Use these scenarios for product QA, automated tests, or design review.

## 1. Send and first status

1. User sends a prompt.
2. The UI creates the user message optimistically.
3. Runtime listener is registered before submit.
4. Runtime status appears before first answer text when the runtime accepts work.
5. The composer exposes interrupt/cancel when supported.

Pass condition: the user can tell the agent is alive before text streaming begins.

## 2. Text/reasoning separation

1. Runtime emits reasoning/thinking content and final answer text.
2. Reasoning renders as process content, collapsed or summarized by default.
3. Final answer renders as clean message text.
4. Completed reasoning is not replayed as final answer text after hydration.

Pass condition: no `<think>` text, raw reasoning log, or process status pollutes the final answer.

## 3. Final reconciliation

1. Runtime streams text deltas.
2. Runtime later emits final answer content.
3. The UI reconciles the final answer with streamed content.

Pass condition: final text is not duplicated or appended twice.

## 4. Tool call

1. Runtime emits tool start with stable tool call id.
2. UI shows a compressed tool row with safe input summary.
3. Tool progress updates the row without entering final answer text.
4. Tool result links to output details or offload reference.
5. Errors render as recoverable tool failure UI.

Pass condition: tool execution is visible, inspectable, and not mixed into final answer prose.

## 5. Human-in-the-loop

1. Runtime emits an action request with id, type, scope, and optional schema.
2. UI promotes the request to an approval/input surface.
3. User approves, rejects, edits, or answers.
4. Response is sent through the runtime action response API.
5. UI only marks the request resolved after runtime confirmation.

Pass condition: high-risk or blocked work has explicit, auditable user control.

## 6. Queue and steer

1. A run is active.
2. User enters another prompt.
3. UI offers queue and steer as different modes.
4. Queue creates or updates a queued turn summary.
5. Steer targets the active run and shows pending steer state.

Pass condition: the user can distinguish “run this next” from “change what is happening now.”

## 7. Artifact handoff

1. Runtime emits artifact created/changed with stable artifact id.
2. Conversation shows a compact artifact card or reference.
3. Artifact surface opens preview/editor/diff using artifact service data.
4. Edits or exports go through artifact APIs.

Pass condition: deliverables leave the chat body and become editable artifacts.

## 8. Evidence export

1. User or system triggers evidence export.
2. UI shows background progress or task capsule.
3. Evidence service returns durable references.
4. Timeline/evidence surface links summary, trace, artifacts, verification, review, or replay.

Pass condition: evidence is traceable to runtime facts and does not block chat streaming.

## 9. Old-session recovery

1. User opens an old session.
2. Shell, tab, title, and cached snapshot appear immediately when available.
3. Recent messages render before full timeline details.
4. Queue/pending action/runtime summary hydrate next.
5. Older messages, tool details, artifacts, and evidence load on demand.

Pass condition: old sessions do not require full history or all artifacts before first paint.

## 10. Missing facts

1. Runtime omits artifact kind, verification status, or provider stage.
2. UI shows `unknown`, `unavailable`, or `stale` rather than guessing.
3. User controls remain safe and recoverable.

Pass condition: UI never fabricates success, approval, artifact type, or evidence verdict.
