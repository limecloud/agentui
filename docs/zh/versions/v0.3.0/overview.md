---
title: v0.3.0 概览
description: Agent UI v0.3.0 的主要变化。
---

# v0.3.0 概览

v0.3.0 修正 Agent UI 的范围表述。Agent UI 不是围绕某一两个相邻标准展开的补充说明，而是位于完整 Agent 产品生态中的投影标准：把生态内各系统产生的事实转成可见、可控、可恢复、可编辑、可审计的交互表面。

## 主要变化

- 新增生态边界参考页。
- 把 runtime、model、tools、skills/workflows、context stores、artifacts、evidence、permissions、sessions 和 design systems 都作为一等相邻系统。
- 将边界说明从“开始”分组移到“参考”导航。
- 删除旧的以 Skills/Knowledge 为中心的边界页源文件。
- 更新 README、概览、定义和规范页面，把 Agent UI 描述为贯穿完整 Agent 产品栈的投影层。

## 兼容性

- 相比 v0.2.0，没有 runtime event schema 变更。
- v0.2.x 实现仍然有效。
- 新读者应从 runtime facts、surface contracts、controlled writes 和 ecosystem boundaries 开始。
