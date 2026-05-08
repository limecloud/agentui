---
title: v0.4.1 概览
description: Agent UI v0.4.1 变更概览。
---

# v0.4.1 概览

v0.4.1 为 Agent UI 增加面向 LLM 的文档入口。该版本在仓库根目录与文档站点根目录发布精简索引和完整上下文 Markdown，方便 AI 客户端无需爬完整站点即可发现标准。

## Highlights

- 新增 `llms.txt` 作为精简 LLM 导航索引。
- 新增 `llms-full.txt`，合并英文核心文档并保留 source URLs。
- 新增兼容 alias：`llm.txt` 与 `llm-full.txt`。
- 通过 `docs/public/` 发布同名文件，让 GitHub Pages 可以从站点根目录访问。
- 将 LLM 入口文件加入 package manifest。

## Compatibility

v0.4.1 不改变 Agent UI 协议语义，只提升文档对机器读取、发现和打包发布的友好度。
