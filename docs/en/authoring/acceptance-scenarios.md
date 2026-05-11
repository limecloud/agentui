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
2. Running reasoning renders as process content and remains live-visible; completed reasoning is collapsed or summarized by default.
3. Final answer renders as clean message text.
4. Completed reasoning is not replayed as final answer text after hydration.

Pass condition: no `<think>` text, raw reasoning log, or process status pollutes the final answer.

## 3. Interleaved active turn

1. Runtime emits reasoning, tool, text, reasoning summary, then more text in sequence.
2. UI renders those parts interleaved in event/part order.
3. Running tool/process content is expanded by default or shows its live body.
4. Timeline does not expand a duplicate copy of the same fact already shown by inline process.
5. After turn completion, process content archives into collapsed timeline summaries by default.

Pass condition: the user sees live execution order, not a top-heavy thinking stack or double-nested process blocks.

## 4. Final reconciliation

1. Runtime streams text deltas.
2. Runtime later emits final answer content.
3. The UI reconciles the final answer with streamed content.

Pass condition: final text is not duplicated or appended twice.

## 5. Tool call

1. Runtime emits tool start with stable tool call id.
2. UI shows a compressed tool row with safe input summary.
3. Tool progress updates the row without entering final answer text.
4. Tool result links to output details or offload reference.
5. Errors render as recoverable tool failure UI.

Pass condition: tool execution is visible, inspectable, and not mixed into final answer prose.

## 6. Human-in-the-loop

1. Runtime emits an action request with id, type, scope, and optional schema.
2. UI promotes the request to an approval/input surface.
3. User approves, rejects, edits, or answers.
4. Response is sent through the runtime action response API.
5. UI only marks the request resolved after runtime confirmation.

Pass condition: high-risk or blocked work has explicit, auditable user control.

## 7. Queue and steer

1. A run is active.
2. User enters another prompt.
3. UI offers queue and steer as different modes.
4. Queue creates or updates a queued turn summary.
5. Steer targets the active run and shows pending steer state.

Pass condition: the user can distinguish “run this next” from “change what is happening now.”

## 8. Artifact workspace

1. Runtime emits artifact created/updated with stable artifact id.
2. Conversation shows a compact artifact card or reference.
3. Artifact Workspace opens preview/editor/diff/version/export areas using artifact service data.
4. Edits, exports, forks, or handoffs go through artifact APIs or controlled runtime actions.
5. Failed saves preserve the last confirmed version and keep unsaved local edits visible.

Pass condition: deliverables leave the chat body and become editable, versioned, exportable artifacts.

## 9. Evidence export

1. User or system triggers evidence export.
2. UI shows background progress or task capsule.
3. Evidence service returns durable references.
4. Timeline/evidence surface links summary, trace, artifacts, verification, review, or replay.

Pass condition: evidence is traceable to runtime facts and does not block chat streaming.

## 10. Old-session recovery

1. User opens an old session.
2. Shell, tab, title, and cached snapshot appear immediately when available.
3. Recent messages render before full timeline details.
4. Queue/pending action/runtime summary hydrate next.
5. Older messages, tool details, artifacts, and evidence load on demand.

Pass condition: old sessions do not require full history or all artifacts before first paint.

## 11. Missing facts

1. Runtime omits artifact kind, verification status, or provider stage.
2. UI shows `unknown`, `unavailable`, or `stale` rather than guessing.
3. User controls remain safe and recoverable.

Pass condition: UI never fabricates success, approval, artifact type, or evidence verdict.

## 12. Task and multi-agent state

1. Runtime emits a queued turn, background task, teammate, subagent, or remote-agent update with a stable task/agent id.
2. UI updates task capsules, team roster, work board, or task center without creating fake assistant prose.
3. Needs-input, failed, plan-ready, and delegated-approval states are promoted above normal running state.
4. Completed task details archive into timeline summaries, worker notifications, or task history.

Pass condition: long-running and multi-agent work is observable and controllable outside the final answer transcript.

## 13. Coordinator team

1. A coordinator delegates work to one or more teammates.
2. UI shows the coordinator, teammates, roles, statuses, and parent/child session or thread ids.
3. Worker results arrive as worker notifications, not as real user messages.
4. Coordinator synthesis remains separate from worker result facts and transcript refs.

Pass condition: the user can see who did what and can trace worker results without confusing them with user speech.

## 14. Parallel workers

1. Runtime spawns multiple workers for independent tasks.
2. UI shows fanout/fanin state, wait state, partial completion, failures, and retry/continue controls.
3. UI shows queue/parallelism facts such as team phase, active count, queued count, and provider concurrency group when available.
4. Running workers remain visible while active.
5. Completed worker details archive into timeline/evidence without flattening the team to one assistant.

Pass condition: parallel delegation is visible, resumable, and auditable.

## 15. Specialist handoff

1. Runtime changes active owner from one teammate to another.
2. UI shows from, to, reason, resume target, and memory/context boundary.
3. Past transcript authorship is not rewritten.
4. The new owner can continue with its own policy and context constraints.

Pass condition: the user can tell who owns the work now and why.

## 16. Review team

1. Runtime or user requests review from a reviewer/verifier teammate.
2. UI shows reviewer, target, status, evidence refs, verdict, and requested fixes.
3. Review verdict stays in review/evidence facts rather than final prose only.
4. Requested fixes can be assigned back to a teammate or work item.

Pass condition: review is a first-class lane with traceable evidence and follow-up ownership.

## 17. Human/agent work board

1. Work items are assigned to humans and agents.
2. UI shows assignee, status, blocker, comments, dependencies, and progress.
3. User assignment or status changes write through a board/team API.
4. Completed work links to artifacts or evidence.

Pass condition: mixed human/agent work is managed as tasks, not hidden in the chat transcript.

## 18. Background teammate

1. Runtime schedules or wakes a background teammate.
2. UI shows wake reason, schedule, current run, last run record, pause/resume, and termination controls.
3. Background results archive as timeline/evidence facts.
4. The UI does not introduce a separate hierarchy for background work.

Pass condition: background agent work is understandable as teammate-owned work.

## 19. Remote teammate

1. Runtime creates or connects to a remote agent task.
2. UI shows remote agent card/capability, task id, status, messages, input/auth needs, and artifact updates.
3. Input-required and auth-required states are promoted to user controls.
4. A transient idle status is not treated as terminal completion without remote task confirmation.

Pass condition: remote agent work follows the same team surfaces while preserving remote protocol truth.

## 20. Context and compaction

1. Runtime emits context selection, missing context, budget, retrieval, or compaction facts.
2. UI shows context chips, budget state, missing-context fallback, or compaction boundary.
3. Compaction does not replay old reasoning as final answer text.
4. Source refs and citations remain linked to evidence or context facts.

Pass condition: context and memory changes are explicit facts, not hidden text mutations.

## 21. Diagnostics and metrics

1. Runtime or client emits safe diagnostics or performance metrics.
2. UI keeps them in diagnostics surfaces or trace views.
3. Normal conversation text stays free of raw debug logs.
4. Metrics can explain submit-to-status, first-text, paint, hydration, and detail-load latency.

Pass condition: debugging remains traceable without polluting the user-facing transcript.

## 22. Agent Runtime profile projection

1. Runtime provides `RuntimeEvent`, `ThreadReadModel`, `TaskSnapshot`, or `EvidencePack` facts.
2. UI preserves runtime correlation ids such as `sessionId`, `threadId`, `turnId`, `taskId`, `runId`, `toolCallId`, `actionId`, and `evidenceId`.
3. Status, task capsules, HITL controls, timeline/evidence, replay, and review surfaces are projected from those facts.
4. UI renders missing facts as `unknown`, `unavailable`, or `stale` instead of creating local runtime truth.

Pass condition: Agent UI can project an Agent Runtime-compatible source without becoming the owner of execution, approval, routing, task, or evidence facts. See [Runtime profile test cases](./runtime-profile-test-cases).
