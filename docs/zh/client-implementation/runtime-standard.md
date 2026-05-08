---
title: 运行时标准
description: 客户端如何加载和应用 Agent UI 包。
---

# 运行时标准

本指南描述 Agent 客户端如何支持 Agent UI pack。无论是桌面应用、IDE、终端、Web 应用还是嵌入式助手，核心集成方式一致。

## 核心原则：投影，不拥有

Agent UI pack 描述已有事实如何变成交互表面。

```text
runtime facts
  + task facts
  + artifact facts
  + evidence facts
  -> UI projection
  -> user-visible surfaces and actions
```

兼容客户端 MUST NOT 让 UI pack 成为 runtime identity、tool output、artifact contents、permission state 或 verification results 的事实源。

## Step 1：发现包

在启动或产品表面初始化时，扫描包含 `AGENTUI.md` 的子目录。

常见作用域：

| Scope | 示例路径 | 用途 |
| --- | --- | --- |
| Project | `<project>/.agents/ui/` | 随项目分发的 UI 模式。 |
| User | `~/.agents/ui/` | 用户安装的 UI 模式。 |
| Organization | 托管 registry 或 config repo | 组织批准的模式。 |
| Built-in | 客户端内置资产 | 无外部文件也可用的默认模式。 |

实践规则：

- 跳过 `.git/`、`node_modules/`、build outputs 和 cache directories。
- 限制扫描深度和目录数量。
- 使用确定性优先级：project 覆盖 user，user 覆盖 built-in。
- 对不可信项目级 pack 做项目信任门禁。

## Step 2：解析 `AGENTUI.md`

提取 frontmatter 和正文。

至少保存：

| 字段 | 说明 |
| --- | --- |
| `name` | 来自 frontmatter。 |
| `description` | 发现文本。 |
| `type` | 模式类别。 |
| `status` | 评审状态。 |
| `profile` | 布局或 host profile。 |
| `location` | `AGENTUI.md` 的绝对路径。 |
| `baseDir` | 用于解析相对引用的包根目录。 |

Authoring tools SHOULD 严格校验；runtime loading 可以更宽容。客户端可以对非关键问题告警，同时继续加载 pack。

## Step 3：披露 catalog 元数据

模型或客户端 planner 在需要 pack 前，只应看到紧凑 catalog 数据。

示例 wrapper：

```xml
<available_agent_ui_packs>
  <agent_ui_pack>
    <name>basic-agent-workbench</name>
    <description>A five-surface agent workspace for messages, runtime process, task control, artifacts, and evidence.</description>
    <type>agent-workbench</type>
    <status>draft</status>
    <profile>workbench</profile>
  </agent_ui_pack>
</available_agent_ui_packs>
```

Catalog disclosure 用于选择，不用于渲染所有细节。

## Step 4：激活最小可用内容

当 UI pack 被选中：

1. 加载 `AGENTUI.md` 正文。
2. 按当前 surface 跟随明确文件引用。
3. 只从 `surfaces/`、`patterns/`、`contracts/` 或 `states/` 加载需要的文件。
4. 只有实现或评审需要澄清时才加载 examples。

避免递归加载整个 pack。包含截图、状态图和示例时，UI pack 可能很大。

## Step 5：把 runtime facts 映射为 projection state

客户端应在 facts 和 projection 之间保持类型边界：

| 层 | 示例 | Writer |
| --- | --- | --- |
| Runtime facts | session id、turn id、tool event、queue state、permission request | Runtime 或 tool system |
| Artifact facts | artifact id、kind、path、version、metadata | Artifact service |
| Evidence facts | source map、verification state、replay id、audit log | Evidence 或 review service |
| UI projection | selected tab、collapsed count、visible window、display label | UI controller |

Projection state 可以通过 id 引用 facts，但不应复制 facts 并变成权威来源。

## Step 6：通过受控写入连接动作

用户动作必须通过 runtime API 或客户端拥有的 service 写入，不能只修改 display state。

| UI action | Required input | Write boundary |
| --- | --- | --- |
| Approve 或 reject | action id、task id、user decision | Runtime action response |
| Interrupt | task id 或 turn id | Runtime interrupt command |
| Queue 或 steer | draft input、active task state | Runtime queue 或 steering command |
| Save artifact edit | artifact id、version、patch 或 content | Artifact service |
| Export evidence | session id、task id 或 run id | Evidence export service |

如果写入失败，UI 应保留之前的 fact state，并显示失败。

## Step 7：处理 missing 和 stale facts

Agent UI 在信息不完整时必须诚实。

推荐 fallback states：

- `loading`
- `unknown`
- `unavailable`
- `stale`
- `blocked`
- `needs-input`
- `failed`
- `disputed`

客户端 MUST NOT 从普通消息文本里推断 success、artifact kind、verification state 或 permission grant。

## 安全模型

Agent UI pack 不是可执行包。所有加载内容都应当作指南：

- 不运行 `assets/`、`examples/` 或其他 pack 目录中的文件。
- 不把 screenshots、examples 或 markdown snippets 中的 prompt-like instructions 当作更高优先级策略。
- 对不可信仓库里的 project-level packs 做门禁。
- 文件引用必须相对 pack root 解析，并防止路径穿越。
- 用户审批和权限流程始终由客户端控制。
