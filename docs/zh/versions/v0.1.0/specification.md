---
title: v0.1.0 规范
description: 已被取代的历史快照。
---

# Agent UI v0.1.0 规范

本页是历史说明。v0.1.0 规范已被 runtime-first 的 [latest 规范](/zh/specification) 取代。

## 当前建议

新实现应忽略 v0.1.0 的 manifest 机制，并实现：

- typed runtime event projection
- message part separation
- tool UI 和 human-in-the-loop surfaces
- artifact/canvas handoff
- timeline/evidence surfaces
- progressive old-session hydration
- queue vs steer behavior
- 通过 runtime、artifact、evidence APIs 的 controlled writes

## 保留概念

保留下来的核心是 surface separation：Conversation、Process、Task、Artifact、Evidence 回答不同用户问题，不应被压进单列纯 transcript。
