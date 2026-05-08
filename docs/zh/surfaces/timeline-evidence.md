---
title: Timeline 与 Evidence 表面
description: 过程历史、引用、验证、重放、评审和审计规则。
---

# Timeline 与 Evidence 表面

Timeline 和 Evidence surfaces 解释 Agent 工作如何发生，以及结果是否可信。它们应可用，但不应压垮主 conversation。

## Timeline 层级

| 层 | 目的 | 默认 UI |
| --- | --- | --- |
| Inline process | 当前 turn 状态和关键事件。 | 紧凑且实时。 |
| Turn timeline | Tool calls、reasoning summaries、actions、artifacts。 | 默认折叠。 |
| Session timeline | 多回合历史和 incidents。 | 懒加载或分页。 |
| Diagnostic log | Provider、routing、retries、performance。 | 开发或支持视图。 |
| Evidence pack | 可导出审计资产。 | 后台任务和 evidence panel。 |
| Replay case | 可复现情境或失败 trace。 | Debug 或 review entry。 |

不是每个事件都属于用户可见 timeline。详细 facts 可以存储，但 UI 在用户请求细节前只投影有用摘要。

## Evidence facts

Evidence surfaces SHOULD 消费明确 evidence facts：

- source id 和 title
- source location 或 citation anchor
- artifact id 或 task id
- verification state
- reviewer decision
- replay reference
- generated timestamp
- provenance 或 tool reference
- disputed 或 stale status

缺少 evidence 时，显示 unavailable 或 unknown，不要编造 citations。

## Review 和 replay

Review decisions 与 replay cases 不是模型输出。

- Review decision SHOULD 表示人工或策略评审结果。
- Replay case SHOULD 捕获足够上下文以复现运行或失败。
- Evidence export 可能昂贵时 SHOULD 作为后台任务。
- UI status SHOULD 来自 evidence facts，而不是前端乐观推断。

## 来源链接

Generated artifacts 和 final answers SHOULD 在可用时链接 evidence：

```text
final answer -> evidence refs
artifact -> source refs
process item -> tool refs
review decision -> evidence pack
replay case -> runtime trace
```

这让用户能从 answer 到 source、从 artifact 到生成 turn、从 failure 到 diagnostic trace。

## 验收场景

1. 旧 session 的 timeline details 懒加载。
2. Tool events、artifacts、approvals 完成后仍可链接。
3. 只有 source facts 存在时才显示 citations。
4. Evidence export 不阻塞 active turn。
5. Review 和 replay views 使用同一底层 evidence facts。
