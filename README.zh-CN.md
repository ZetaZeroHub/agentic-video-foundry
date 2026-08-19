# Agentic Video Foundry ⚡️

> 把一句创意，锻造成一条真正能发布的短视频。

**简体中文** · [English](README.md)

[![Agent Skill](https://img.shields.io/badge/Agent%20Skill-Codex%20%7C%20Claude%20Code%20%7C%20Gemini-7C3AED)](#安装)
[![License: MIT](https://img.shields.io/badge/License-MIT-22C55E.svg)](LICENSE)
[![Renderers](https://img.shields.io/badge/Renderers-Remotion%20%7C%20HyperFrames-06B6D4)](#智能场景路由)
[![Audio](https://img.shields.io/badge/Audio-ElevenLabs%20%7C%20Volcengine-F97316)](#声音不是附属品)

**Agentic Video Foundry**（智能视频铸造厂）是一套面向 coding agents 的开源全流程短视频生产 Skill。它不会在“脚本写完了”或“渲染命令成功了”时提前宣布完成，而是把创意、分镜、配音、音乐、音效、字幕、动效、混音、渲染、视听质检和可编辑交付串成一条可复现的生产线。

适用于小红书、抖音、TikTok、Reels、Shorts、B 站、产品发布、知识分享、教程、数据短片和可批量复用的品牌栏目。

## 官网

双语波普艺术官网位于 [`website/`](website/)：根路径 `/` 默认英文，`/zh/` 提供简体中文。它不依赖框架，已包含 canonical、双向 hreflang、Open Graph、Twitter Card、JSON-LD、`robots.txt`、`sitemap.xml` 与 `llms.txt`。

公开部署目标为 [video.zzh.app](https://video.zzh.app/)。批准公开的展示视频单独进入部署包，不进入 Git 历史。

## 在常用 coding agent 中直接调用

<table>
  <tr>
    <td align="center"><img src="website/assets/brands/codex-color.svg" width="34" alt="Codex logo"><br><strong>Codex</strong></td>
    <td align="center"><img src="website/assets/brands/claudecode-color.svg" width="34" alt="Claude Code logo"><br><strong>Claude Code</strong></td>
    <td align="center"><img src="website/assets/brands/trae-color.svg" width="34" alt="Trae logo"><br><strong>Trae</strong></td>
    <td align="center"><img src="website/assets/brands/gemini-color.svg" width="34" alt="Gemini logo"><br><strong>Gemini CLI</strong></td>
    <td align="center"><img src="website/assets/brands/kimi-color.svg" width="34" alt="Kimi logo"><br><strong>Kimi Code</strong></td>
    <td align="center"><img src="website/assets/brands/minimax-color.svg" width="34" alt="MiniMax logo"><br><strong>MiniMax</strong></td>
  </tr>
</table>

以上是当前目标运行环境，不代表平台合作或背书。支持标准安装的工具可直接全局安装；其他工具可把 Skill 链接到私有技能目录，或通过仓库指令加载。

## 为什么是 Agentic Video Foundry

- **成片负责制**：终点是看过、听过、测过的发布文件，不是中间产物。
- **声音驱动时间轴**：真实旁白时间戳生成场景与字幕，拒绝估算和机械加速。
- **双音频后端**：ElevenLabs 与火山豆包语音可按旁白、音乐、音效分别选择。
- **真实 Demo 优先**：用真实界面、命令和输出证明能力，动效只负责聚焦与解释。
- **单一主时间轴**：Remotion 负责最终合成，其他工具只承担有边界的资产或场景支线。
- **渐进式风格模块**：主 Skill 只做风格选择，选中后才加载材质、排版、运动语法和硬失败项。
- **可听见的音乐**：BGM 在手机外放上有存在感，同时不遮住人声。
- **可复现与可审计**：固定依赖、素材哈希、无密钥 manifest、确定性逐帧动画。
- **质量硬闸门**：代表帧、平台安全区、完整视听、LUFS、dBTP、编码参数一个都不少。
- **经验会进化**：偶发问题先进入 `.learnings/`，重复验证后再晋升为规则或 Skill。

## 一条真正闭环的生产线

```mermaid
flowchart LR
  A["Brief + 素材"] --> B["剧本 + 节奏图"]
  B --> C["声线试听"]
  C --> D["时间戳旁白"]
  D --> E["场景路由"]
  E --> F["Remotion"]
  E --> G["Text-to-Lottie"]
  E --> H["HyperFrames"]
  F --> I["主时间轴"]
  G --> I
  H --> I
  I --> J["BGM + SFX + 字幕"]
  J --> K["代表帧质检"]
  K --> L["完整渲染 + 母带检测"]
  L --> M["MP4 + 封面 + 发布文案"]
  M --> N[".learnings"]
```

## 智能场景路由

| 能力 | 最适合 | Foundry 中的角色 |
|---|---|---|
| **Remotion** | 多场景、React、数据模板、旁白/字幕精确同步 | 默认主合成器 |
| **Text-to-Lottie** | Logo、图标、流程、KPI、微交互、透明矢量循环 | 可选资产支线，先 Skottie 后最终渲染器双验收 |
| **HyperFrames** | HTML/CSS/GSAP、网页素材、动态图表、DOM 动效 | 可选场景或项目后端 |
| **Remotion Scenes** | 快速复用 React/TSX 动效场景 | 按项目固定版本并 vendoring，不冒充 Skill |

Foundry 不鼓励为了“技术栈全家桶”而混用。每个镜头先按实际需求路由，最终由一个主时间轴收口。

## 可扩展风格模块

风格是材质、配色、排版、证据处理、运动语法、转场和失败条件的完整契约。主 Skill 先读取[风格路由](skills/agentic-video-foundry/references/style-routing.md)，选中后才加载具体模块。

- [手撕纸拼贴定格](skills/agentic-video-foundry/references/styles/flat-paper-collage-stop-motion.md)：暖米纸底、扁平纸片、统一撕边与右下投影、离散定格运动和明确的禁止形变规则。
- [波普漫画印刷动效](skills/agentic-video-foundry/references/styles/comic-pop-art-motion.md)：四色印刷、粗黑轮廓、局部网点、分格叙事、锐利 snap 节奏与强 CTA。

两个模块都要求真实产品 Demo 保持像素可读。风格服务于证据外围，不用虚构插画替代证据。

## 声音不是附属品

<p>
  <img src="website/assets/brands/elevenlabs.svg" width="30" alt="ElevenLabs logo"> <strong>ElevenLabs</strong>
  &nbsp;&nbsp;或&nbsp;&nbsp;
  <img src="website/assets/brands/volcengine-color.svg" width="30" alt="火山引擎 logo"> <strong>火山引擎 / OpenSpeech</strong>
</p>

Agentic Video Foundry 可在 ElevenLabs 与火山引擎/OpenSpeech 之间路由 AI 口播、多样音色试听、背景音乐和互动音效。两条路线都先生成同稿候选试听，再按语义段落生成带时间戳旁白；真实生成的音频时间戳直接驱动场景长度和字幕，而不是估算阅读速度。音乐提示词包含 BPM、乐器、情绪曲线和明确结尾；音效只强化关键落点。密钥只从 Keychain 或环境变量读取，永不进入源码、日志或 manifest。

火山能力可按 `cost`、`balanced`、`quality` 三档路由。详细边界见[音频供应商路由](skills/agentic-video-foundry/references/audio-provider-routing.md)与[火山模型路由](skills/agentic-video-foundry/references/volcengine-model-routing.md)。

```bash
~/.agents/skills/agentic-video-foundry/scripts/store-audio-credential.sh volcengine
~/.agents/skills/agentic-video-foundry/scripts/store-audio-credential.sh elevenlabs
```

任何声线、BGM、SFX、时间或增益变化都会让旧母带测量失效。必须重新渲染、重新测量，并用手机外放再听一遍。

## 安装

从 ZetaZeroHub 仓库全局安装：

```bash
npx skills add ZetaZeroHub/agentic-video-foundry@agentic-video-foundry -g -y
```

本地开发态安装：

```bash
ln -s "$PWD/skills/agentic-video-foundry" \
  "$HOME/.agents/skills/agentic-video-foundry"
```

兼容只扫描私有目录的工具时，可再链接到 `~/.codex/skills/`、`~/.claude/skills/`、`~/.gemini/skills/` 或 `~/.trae/skills/`。

重启 coding agent 后可以直接说：

```text
使用 $agentic-video-foundry，把这份文案做成一条 45 秒竖屏产品宣传片。
节奏要灵动，真实产品证据做画面主角，BGM 要听得见但不能遮住旁白。
```

## 可选能力安装

- [Text-to-Lottie](https://github.com/diffusionstudio/lottie) — MIT；矢量动效资产生成与 Skottie 预览。
- [HyperFrames](https://github.com/heygen-com/hyperframes) — Apache-2.0；HTML/GSAP/Lottie 确定性视频后端。
- [Remotion Scenes](https://github.com/lifeprompt-team/remotion-scenes) — MIT；按项目选取的 Remotion 场景源码库，不是 Agent Skill。

第三方版本与集成边界见 [THIRD_PARTY.md](THIRD_PARTY.md)。

## 自动审计

```bash
node "$HOME/.agents/skills/agentic-video-foundry/scripts/audit-video-project.mjs" \
  --project /absolute/path/to/video-project \
  --video /absolute/path/to/final.mp4 \
  --strict
```

审计器会检查常见密钥泄漏、非确定性动画、音频 manifest 哈希和最终视频流信息。它是交付闸门，但不能替代完整观看和收听。

## 内部验证基线

第一条内部参考成片采用 9 场景 Remotion + ElevenLabs 管线，输出 1080×1920、30 fps、H.264 + 48 kHz AAC。声线、BGM、SFX、字符级字幕、代表帧和母带均经过真实生成与检查。付费素材与源项目不在本仓库再分发；验证范围和输出哈希见 [case study](skills/agentic-video-foundry/references/case-study.md)。

## 仓库结构

```text
agentic-video-foundry/
├── README.md
├── README.zh-CN.md
├── AGENTS.md
├── THIRD_PARTY.md
├── website/
└── skills/
    └── agentic-video-foundry/
        ├── SKILL.md
        ├── agents/openai.yaml
        ├── references/
        └── scripts/{audit-video-project,audio-provider}.mjs
```

## License

Agentic Video Foundry 自有内容采用 [MIT License](LICENSE)。第三方框架、Skill、场景组件与生成素材遵循各自许可证；本仓库只记录集成边界，不重授权第三方内容。
