---
title: Tool UI 表面
description: 工具调用、命令输出、外部动作和大结果的渲染规则。
---

# Tool UI 表面

Tool UI 把外部工作变成可理解的过程证据，同时不污染最终回答。

## 工具步骤结构

工具步骤 SHOULD 暴露：

| 字段 | 用途 |
| --- | --- |
| `tool.id` | 用于 linking、retry、evidence 和 logs 的稳定 id。 |
| `tool.kind` | Command、browser、file、API、search、database、custom。 |
| `status` | Pending、running、succeeded、failed、cancelled、timed out。 |
| `input.summary` | 安全、紧凑的输入预览。 |
| `output.preview` | 可读结果预览。 |
| `output.ref` | 大输出的完整引用。 |
| `duration` | 时间摘要。 |
| `risk` | 相关权限或敏感级别。 |
| `source_refs` | 工具产生的 sources 或 artifacts。 |

## 输入渲染

工具输入常包含 secrets、长 JSON、路径或无关默认值。客户端 SHOULD：

- 只显示最小有意义字段
- redact secrets 和 credentials
- 默认折叠长 JSON
- 原始输入只在可信诊断视图可见
- 用 count 或 size 解释省略字段

## 输出渲染

| 输出形态 | 推荐渲染 |
| --- | --- |
| Empty output | 显示 `No output` 和 exit/status 信息。 |
| Short text | 在 process step 内 inline preview。 |
| Large text | 摘要、byte/token count 和 open-details action。 |
| JSON object | 先渲染重要 keys；允许 raw view。 |
| Image or media | Thumbnail 或 placeholder + open action。 |
| File change | Diff 或 artifact reference。 |
| Source list | Evidence/source surface entry。 |
| Error | Failure summary、stderr preview、retry 或 diagnostic action。 |

## 大输出规则

Large tool output SHOULD NOT 插入最终回答或 message body。应使用 offloaded reference 和 detail surface。

Pack SHOULD 定义何时：

- truncate input
- summarize output
- offload full output
- warn about context impact
- require explicit expansion

## Retry 和 replay

如果支持 retry：

- 显示工具是否可安全重试。
- 每次 attempt 保留自己的 status 和 output reference。
- 不覆盖失败 attempt evidence。
- 高风险或非幂等工具需要确认。

## 验收场景

1. 无输出工具显示明确 empty state。
2. 大输出工具显示摘要和详情动作，不把全文塞进回答。
3. 失败工具保留 stderr 或 diagnostic preview。
4. 生成文件变成 artifact reference。
5. Tool evidence 可从 timeline 和 evidence surface 链接。
