---
title: 术语表
description: Agent UI 核心术语。
---

# 术语表

## Agent UI

把结构化 Agent facts 转换为用户可见交互表面和受控动作的 runtime projection 标准。

## Runtime fact

由 Agent runtime 或 protocol adapter 拥有的事实，例如 run id、lifecycle state、text delta、tool call、queue state 或 action request。

## Projection state

从 facts 派生的 UI-owned state，例如 selected tab、collapsed tool rows、visible message window、focused artifact 或 local draft。Projection state 不是权威 runtime truth。

## Surface

回答一类用户问题的用户可见区域。标准 surfaces 包括 Composer、Message Parts、Runtime Status、Tool UI、Human-in-the-loop、Task Capsule、Artifact 工作区、Timeline/Evidence 和 Session/Tabs。

## Message part

消息 UI 中的 typed piece，例如 final text、reasoning、tool call、action request、data、artifact reference 或 evidence reference。

## Runtime status

展示 Agent 是否 submitted、routing、preparing、streaming、calling tools、blocked、retrying、cancelled、failed 或 completed 的短状态。

## Tool UI

展示 tool lifecycle、安全输入摘要、进度、输出预览、大输出 offload 和详情检查的表面。

## Human-in-the-loop

Runtime 在继续前需要用户审批、结构化输入、计划决策、修正或取消的状态。

## Queue

安排在当前 active run 结束后执行的用户输入。

## Steer

用于影响当前 active run 的用户输入。

## Artifact

生成或编辑的交付物，例如 document、file、diff、image、table、code object、canvas 或 structured output。

## Evidence

支撑或解释 Agent run 的 trace、citation、verification、replay、review 或 audit 信息。
