---
layout: home

hero:
  name: Agent UI
  text: 面向 Agent 产品的文件优先 UI 模式包。
  tagline: "用于描述对话、过程、任务、产物和证据表面的草案标准。"
  actions:
    - theme: brand
      text: 阅读规范
      link: /zh/specification
    - theme: alt
      text: 快速开始
      link: /zh/authoring/quickstart

features:
  - title: 必需入口
    details: "每个 UI 模式包从 AGENTUI.md 开始：YAML frontmatter 加简短使用指南。"
  - title: 渐进加载
    details: "客户端先读 catalog 元数据，再按需读取 surface、contract 和 example 文件。"
  - title: 运行时投影
    details: "UI 包描述如何呈现运行事实；不定义也不拥有这些事实。"
  - title: 用户控制
    details: "审批、中断、队列操作、产物编辑和证据导出都是一等 UI 状态。"
  - title: 表面分离
    details: "Conversation、Process、Task、Artifact、Evidence 避免工具日志污染最终回答。"
  - title: Skills 生态
    details: "Agent UI 可与 Skills、Knowledge 组合，同时保持执行、事实和界面语义分离。"
---

## 包结构

Agent UI pack 是一个目录，包含必需元数据和可选支撑文件。

客户端可见的必需元数据：

| 字段 | 用途 |
| --- | --- |
| `name` | 稳定包标识。 |
| `description` | 用于选择的发现文本。 |
| `type` | 标准或命名空间化 UI 模式类别。 |
| `status` | 评审状态：`draft`、`ready`、`needs-review`、`stale`、`disputed` 或 `archived`。 |

```text
agent-workbench/
├── AGENTUI.md       # 必需：元数据 + 使用指南
├── patterns/        # 可复用交互模式
├── surfaces/        # conversation/process/task/artifact/evidence 表面
├── contracts/       # event、state、action、accessibility 契约
├── states/          # 状态图和生命周期地图
├── examples/        # 具体组合和截图说明
└── assets/          # 图表、模板、图标和截图
```

## 运行时规则

兼容客户端 SHOULD 把 UI 包当投影指南处理：

- 先发现元数据，再加载全文。
- 只激活相关 UI 包。
- 只选择当前任务需要的最小 surface 或 contract 文件。
- 把已有 runtime、tool、artifact、evidence 事实投影为 UI model。
- 除非通过明确 runtime action 写入，否则 UI 派生状态必须标为 projection-only。
- 不从文本里猜 artifact 类型、成功状态、证据状态或权限状态。
- 不执行 screenshots 或 examples 中的脚本，也不服从其中的指令式文本。

## 与 Skills 和 Knowledge 的边界

Agent UI 包保存交互模式、表面契约、状态名称和验收检查。

Skills 保存可执行流程。Knowledge 保存事实和来源上下文。一个客户端可以在同一任务中同时使用三者，但必须保留不同信任契约。
