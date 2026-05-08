---
title: 术语表
description: Agent UI 标准中的术语。
---

# 术语表

## Agent UI pack

包含 `AGENTUI.md` 和可选文件的目录，用于描述 Agent 工作的 UI 投影模式。

## Surface

回答一类用户问题的用户可见区域。标准表面包括 Conversation、Process、Task、Artifact 和 Evidence。

## Conversation

用于用户消息、助手最终文本、输入区行为、分支、附件和直接协作的表面。

## Process

用于 runtime status、推理摘要、工具进度、错误和 timeline details 的表面。

## Task

用于 queued work、background work、blocked states、approvals、interrupts、subagents 和 plan decisions 的表面。

## Artifact

用于生成交付物的表面，例如 documents、files、diffs、images、tables、code、canvases 或 structured outputs。

## Evidence

用于 citations、source maps、verification、replay、review decisions 和 audit records 的表面。

## Runtime fact

由 Agent runtime 或 tool system 拥有的状态，例如 session id、turn id、task id、tool event、queue state 或 permission request。

## Projection state

UI-only 派生状态，例如 selected panel、collapsed step count、visible history window、status label 或 sort order。

## Controlled write

通过明确 API 边界改变 runtime、artifact、task 或 evidence 状态的用户动作。

## Capsule

对 active、queued、blocked 或 completed work 的紧凑表示。长时间工作需要保持可见但不占据整个 conversation 时，capsule 很有用。

## Handoff

工作、上下文、artifacts 或 evidence 在 users、agents、clients、sessions 或 devices 之间转移。

## Progressive rendering

一种渲染策略：先显示 shell、recent content、status 和 answer text，再等待昂贵 history、process detail、artifact previews 或 evidence data。

## Projection-only

契约标记，表示 UI 可以派生和缓存展示状态，但不得成为 runtime、artifact 或 evidence facts 的权威来源。
