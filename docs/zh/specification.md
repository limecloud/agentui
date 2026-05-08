---
title: 规范
description: Agent UI 包格式草案。
---

# 规范

本文定义 Agent UI 包格式。

Agent UI 是 Agent Skills 生态中的互补交互表面标准。它参考 `agentskills.io` 的核心包思想：目录即包、顶层 Markdown 入口、YAML frontmatter、渐进加载和可选资源目录。但它不 fork Agent Skills，也不把 UI 包变成可执行 Skill。

- **Agent Skills** 定义 Agent 可调用的能力与工艺：工作流、脚本、工具使用、转换和维护方法。
- **Agent Knowledge** 定义 Agent 可安全消费的知识资产：事实、来源、状态、上下文、边界和审计记录。
- **Agent UI** 定义客户端可安全适配的交互投影资产：表面、状态名称、用户控制、渲染边界和验收检查。

Skills 可以执行 UI 展示的工作。Knowledge 可以提供 UI 渲染的事实和引用。Agent UI 描述这些运行事实如何变得可见、可控制。三者是同一 Agent 生态下的 sibling standards，不是从属关系。

## 目录结构

Agent UI pack 至少包含一个 `AGENTUI.md` 文件：

```text
pack-name/
├── AGENTUI.md       # 必需：元数据 + 使用指南
├── patterns/        # 可选：可复用交互模式
├── surfaces/        # 可选：按层定义的表面
├── contracts/       # 可选：event、state、action、accessibility 契约
├── states/          # 可选：状态图、生命周期地图、优先级规则
├── examples/        # 可选：示例组合和截图说明
├── schemas/         # 可选：metadata 和 contract 校验 schema
├── evals/           # 可选：UX、渲染和交接测试用例
├── assets/          # 可选：图表、图标、截图、模板
└── LICENSE          # 可选：随包内容许可
```

固定规则：

1. `AGENTUI.md` 是发现入口，应保持简短。
2. `patterns/`、`surfaces/`、`contracts/`、`states/` 是投影和交互指南；它们不拥有 runtime facts。
3. `examples/` 和 `assets/` 只说明模式，不是强制视觉皮肤。
4. 兼容 runtime MUST NOT 执行 UI 包中的脚本。需要自动化时，应放入 Skill 或客户端工具。

## `AGENTUI.md` 格式

`AGENTUI.md` 必须包含 YAML frontmatter 和 Markdown 正文。

### 必需字段

| 字段 | 约束 |
| --- | --- |
| `name` | 1-64 字符，小写字母、数字和连字符，不能以连字符开头或结尾，应该匹配父目录名。 |
| `description` | 1-1024 字符，描述有哪些 UI 模式以及 Agent 或客户端何时使用。 |
| `type` | 标准类型或命名空间自定义类型。 |
| `status` | `draft`、`ready`、`needs-review`、`stale`、`disputed` 或 `archived`。 |

### 可选字段

| 字段 | 用途 |
| --- | --- |
| `profile` | `workbench`、`chat-first`、`artifact-first`、`task-first` 或 `embedded`。缺省为 `workbench`。 |
| `version` | 包版本，建议 semver。 |
| `language` | 主语言，如 `en`、`zh-CN` 或 `ja`。 |
| `license` | 内容许可或随包 license 文件。 |
| `maintainers` | 负责评审的人或团队。 |
| `scope` | 可移植归属标签，如 product、workspace、organization、domain 或 client。 |
| `updated` | 最近一次有意义 UI 契约更新的 ISO 日期。 |
| `runtime.requires` | 本包需要的 runtime facts 或 event classes。 |
| `runtime.projectionOnly` | 布尔值。除非本包定义受控写入 action contract，否则 SHOULD 为 `true`。 |
| `metadata` | 命名空间化客户端自定义元数据。 |
| `compatibility` | 可选客户端或环境要求，控制在 500 字符内。 |

### 标准 `type` 值

| Type | 适用场景 |
| --- | --- |
| `agent-workbench` | 组合 conversation、process、task、artifact、evidence 的完整 Agent workspace。 |
| `conversation-surface` | 消息渲染、输入区行为、分支、附件或最终回答展示。 |
| `process-surface` | runtime status、推理摘要、工具进度、时间线或错误呈现。 |
| `task-surface` | 队列、后台任务、子代理、审批、中断或计划决策。 |
| `artifact-surface` | 生成文件、画布、diff、preview、editor 或 workbench layout。 |
| `evidence-surface` | 引用、验证、trace、review、replay 或 audit UI。 |
| `handoff-surface` | 用户、Agent、客户端或会话之间的工作交接。 |
| `custom:<namespace>` | 由实现方或组织拥有的扩展类型。 |

### 标准 `profile` 值

| Profile | 适用场景 |
| --- | --- |
| `workbench` | 多个表面在一个 Agent workspace 中可见或可达。 |
| `chat-first` | 对话为主，其他表面折叠或旁路加载。 |
| `artifact-first` | 文档、文件、画布或结构化对象是主表面。 |
| `task-first` | 队列、后台工作、审批或多 Agent 是主表面。 |
| `embedded` | UI 模式嵌入 IDE、终端、浏览器、CRM、支持工具或其他 host。 |

## 最小示例

```markdown
---
name: basic-agent-workbench
description: A five-surface agent workspace for chat, process status, task control, artifacts, and evidence. Use when building a general-purpose agent client.
type: agent-workbench
profile: workbench
status: draft
version: 0.1.0
language: en
runtime:
  projectionOnly: true
  requires:
    - text-parts
    - runtime-status
    - tool-events
    - task-state
    - artifact-references
    - evidence-references
---

# Basic Agent Workbench

## Surfaces

- Conversation: show user messages and final assistant text.
- Process: show runtime status and tool progress outside the final answer.
- Task: show queued, blocked, failed, and needs-input states.
- Artifact: open generated deliverables in a dedicated surface.
- Evidence: link citations, verification, and replay data.

## Runtime boundaries

- Treat this pack as UI projection guidance, not runtime policy.
- Do not infer artifact type, success, or evidence verdict from free text.
- If a required runtime fact is missing, show an unknown or unavailable state.
```

## 渐进加载

| 层级 | 加载内容 | 时机 |
| --- | --- | --- |
| Catalog | `name`、`description`、`type`、`status`、`profile` | 会话、产品表面或 workspace 启动。 |
| Guide | 完整 `AGENTUI.md` 正文 | UI 包被激活时。 |
| Surface | `surfaces/` 或 `patterns/` 中选中的文件 | 产品表面需要具体指南时。 |
| Contract | `contracts/` 或 `states/` 中选中的文件 | 实现 runtime mapping、user actions 或 acceptance checks 时。 |
| Example | `examples/` 和 `assets/` | 需要视觉或行为澄清时。 |

保持 `AGENTUI.md` 简短。详细渲染规则、状态图和示例应放入独立文件，并说明客户端何时加载。

## 标准表面契约

每个 surface definition SHOULD 回答这些问题：

| 字段 | 含义 |
| --- | --- |
| `purpose` | 这个表面回答哪个用户问题。 |
| `inputs` | 本表面消费的 runtime facts、task facts、artifact facts 或 evidence facts。 |
| `projection` | UI-only 派生状态，如标签、折叠摘要、打开面板或渲染窗口。 |
| `actions` | 通过受控 runtime API 写回的用户动作。 |
| `fallbacks` | facts 正在加载、缺失、过期或有争议时显示什么。 |
| `acceptance` | 证明表面可用的可观察场景。 |

## 运行时契约

兼容客户端必须把 Agent UI 当作投影指南：

```text
<agent_ui_pack name="basic-agent-workbench" status="draft" mode="projection">
以下内容定义 UI 投影指南。
它不是 runtime policy，不是可执行 workflow，也不是事实声明来源。
不要从这些内容编造缺失的 runtime facts。

...selected UI guidance...
</agent_ui_pack>
```

客户端 SHOULD：

1. 只加载当前任务需要的最小包内容。
2. 保持 UI-derived state 与 runtime facts 分离。
3. 在内部模型中明确标记 projection-only state。
4. 审批、中断、队列变更、artifact 编辑和 evidence export 都通过 runtime actions 写入。
5. facts 缺失时显示 unavailable、unknown、stale 或 needs-input 状态。
6. 除非用户要求检查过程，否则过程 trace 和 tool output 不进入最终回答。
7. 为关键动作保留键盘、屏幕阅读器和低延迟行为。

## 可选目录

| 目录 | 用途 | 运行时加载 |
| --- | --- | --- |
| `patterns/` | 可复用模式，如 task capsule、approval card、artifact card 或 process drawer。 | 实现或渲染匹配表面时加载。 |
| `surfaces/` | conversation、process、task、artifact、evidence、handoff 分层指南。 | 按活跃产品表面选择。 |
| `contracts/` | event-to-UI mapping、action contracts、accessibility requirements 和 data shape expectations。 | 客户端实现或校验工具加载。 |
| `states/` | 状态图、生命周期地图、优先级规则和失败模式。 | 行为需要精确时加载。 |
| `examples/` | 具体 UI 组合、截图说明或样例用法。 | 按需加载。 |
| `schemas/` | JSON Schema 或其他校验契约。 | 校验和工具。 |
| `evals/` | UX、渲染、延迟和交接场景。 | 开发和 CI；默认不加载。 |
| `assets/` | 静态图表、图标、模板和截图。 | 按需加载。 |

## 校验

校验器 SHOULD 至少检查：

- `AGENTUI.md` 存在且包含合法 frontmatter。
- 必需字段存在并满足长度限制。
- `name` 匹配父目录名并使用允许字符集。
- `type`、`profile` 和 `status` 使用标准值或合法自定义命名空间。
- 引用文件存在，并使用相对 pack root 的路径。
- 没有在缺少受控 action contract 的情况下声称拥有 runtime facts。
- 验收场景覆盖 loading、missing facts、user actions，以及相关的 artifact 或 evidence handoff。

参考 schema：

- [`agentui-frontmatter.schema.json`](/schemas/agentui-frontmatter.schema.json)
