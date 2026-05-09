# Agent UI v0.6.0

Agent UI v0.6.0 standardizes team-style multi-agent UI. It keeps the v0.5 runtime projection rules, then adds the missing workbench layer for coordinator teams, parallel workers, specialist handoffs, review teams, human/agent boards, background teammates, and remote teammates.

## Highlights

- Adds Team Workbench surfaces: team roster, work board, delegation graph, handoff lane, worker notifications, review lane, teammate transcript, background teammate, remote teammate, and team policy.
- Reframes multi-agent UI around teams and teammates, not a hierarchy-first model.
- Adds explicit rules for worker notifications: worker results are internal task/agent facts, not real user messages and not coordinator final prose.
- Adds parent/child lineage, delegated approvals, teammate identity, per-teammate policy, transcript refs, `runtimeEntity`, queue/parallelism facts, and remote/background teammate mapping to the taxonomy and schema.
- Expands the standalone runnable demo at `/examples/agent-workbench/` into a scenario matrix covering core Agent UI and team workbench scenarios.
- Updates traceability sources for Claude Code team/coordinator behavior, Codex collaborative agent tools, Lime Team Runtime, A2A remote tasks, Paperclip background wakes, and VitePress standalone demo publishing.

## Links

- Documentation: https://limecloud.github.io/agentui/
- Flow and taxonomy: https://limecloud.github.io/agentui/en/reference/flow-and-taxonomy
- Source index: https://limecloud.github.io/agentui/en/reference/source-index
- Team workbench demo: https://limecloud.github.io/agentui/examples/agent-workbench/?lang=zh
- Event schema: https://limecloud.github.io/agentui/schemas/agentui-event.schema.json
- LLM context: https://limecloud.github.io/agentui/llms-full.txt
