---
title: v0.1.0 概览
description: 已被 v0.2.0 取代的历史初稿。
---

# v0.1.0 概览

v0.1.0 是 Agent UI 的第一个公开草案。它提出了 Agent 界面需要分离 Conversation、Process、Task、Artifact、Evidence 五类表面的想法。

## 已被取代的方向

第一版对 runtime events、session hydration 和 controlled actions 的定义不足。这个方向已被 v0.2.0 取代。

v0.1.0 只作为历史上下文。新实现应遵循 runtime-first 的 latest 规范：

```text
typed runtime events + durable snapshots
  -> projection reducer
  -> UI surfaces
  -> controlled user actions
```

## 仍然有用的部分

- Conversation、Process、Task、Artifact、Evidence 仍是有用的表面分类。
- UI projection 不应拥有 runtime facts。
- Process details、tool output、artifacts、evidence 不应污染最终回答正文。

## v0.1.0 之后的变化

- 当前标准从 runtime facts 开始，而不是从文档形态开始。
- 当前标准从 event classes、snapshots、controlled writes、progressive hydration 和 acceptance scenarios 开始。
