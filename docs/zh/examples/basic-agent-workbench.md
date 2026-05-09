---
title: 基础 Agent 工作台
description: 独立 Runtime-first Agent UI 工作台 demo。
---

# 基础 Agent 工作台

Workbench demo 已经移出文档壳。它是完整独立页面，自己拥有 layout、reducer、scenario library、controls 与 projected surfaces。

<p>
  <a class="VPButton medium brand" href="../../examples/agent-workbench/?lang=zh" target="_self">打开独立 Agent UI Workbench demo</a>
</p>

## 架构边界

- 文档页面负责描述 Agent UI contract，并链接到可运行 demo。
- 独立 demo 自己拥有 runtime fixture、reducer、UI shell、controls 与 projected state。
- demo 继续使用标准里的事件语义：ordered events、typed surfaces、controlled actions、artifact/evidence separation、completed-process archive 与 team/workbench projection。

## 相关页面

- [可运行示例](./index.md)
- [全流程与分类](../reference/flow-and-taxonomy.md)
- [Message parts](../surfaces/message-parts.md)
- [Timeline and evidence](../surfaces/timeline-evidence.md)
