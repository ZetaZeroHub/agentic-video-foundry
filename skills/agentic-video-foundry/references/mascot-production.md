# 原创吉祥物与定格动作资产管线

本模块只在项目需要原创、可重复出现的吉祥物/IP 角色时加载。它负责把角色从叙事职责推进到可复用透明资产和定格动作帧；不替代主风格、分镜、主时间轴或最终视频质检。

## 目录

1. 适用边界
2. 产物与状态门
3. Identity Block
4. 文生图与参考图生成
5. 动作拆帧与抠图
6. 视频和网页集成
7. 资产清单
8. 专项质检

## 1. 适用边界

适合品牌介绍、产品教程、知识分享、系列栏目和官网演示中会跨镜重复出现的原创角色。角色必须承担明确职责，例如引导、思考、演示、试听、检查或 CTA；如果只是填补空白，不应生成吉祥物。

先选定主视觉风格，再设计角色。波普、手撕纸或其他风格模块决定材质、线条、阴影和运动语法；本模块只锁定角色身份和动作资产。

不得复刻第三方角色、商标形象或特定艺术家的签名风格。若用户提供现有品牌角色，记录其授权来源，并把原图作为身份锚点，不擅自重新设计。

## 2. 产物与状态门

| 阶段 | 产物 | 进入下一阶段的条件 |
| --- | --- | --- |
| M01 角色职责 | `mascot/01-role.md` | 写清受众、性格、叙事职责、出现镜头和不出现的位置 |
| M02 身份锁定 | `mascot/02-identity.md` + `identity-anchor.png` | 中性主姿势通过人工确认；轮廓、比例、脸、配色和标志物稳定 |
| M03 动作矩阵 | `mascot/03-action-matrix.md` | 每个动作有语义、所属镜头、2–3 个离散姿势和停留点 |
| M04 透明资产 | `mascot/frames/*.png` + contact sheet | 透明边缘、画布、锚点、比例和身份一致性通过检查 |
| M05 集成 | 主时间轴或网页预览 | 动作由离散帧驱动；不形变、不抢字幕和真实证据 |
| M06 验收 | `mascot/mascot-manifest.json` + QA 记录 | 来源、提示词哈希、帧哈希、尺寸、用途和最终观看结果齐全 |

身份锚点未确认前，不批量生成动作。一个动作不通过时只重做该动作，不重生成已确认的角色系统。

## 3. Identity Block

在首次出图前写入 `mascot/02-identity.md`：

```yaml
id: mascot-short-id
role: 角色在视频中的叙事职责
personality: 3-5 个可观察特征
silhouette: 外轮廓和头身比例
face: 眼睛、嘴、眉毛、腮红等稳定特征
palette: 主色、辅色、线条色、阴影色
material: 纸片、平涂、毛毡、像素或其他已选风格材质
outline: 线宽、转角和允许的不规则度
signature_prop: 唯一标志物；没有则写 none
shadow: 方向、偏移、硬度和透明度
anchor: 脚底、身体中心或其他跨帧对齐点
allowed_changes: 手势、视线、有限表情、道具状态
forbidden_changes: 身形、脸型、主色、标志物、材质、线宽、肢体数量
```

优先选择轮廓简单、缩小后仍可辨认、动作能靠姿势而非面部细节表达的设计。配色通常限制为 2–4 个角色色加轮廓色；标志物只保留一个，以降低跨图漂移。

## 4. 文生图与参考图生成

### 4.1 选择生成路径

- AI 工具具备文生图能力时，直接生成身份候选；Codex 环境优先使用可用的图像生成/编辑工具。
- 用户已有草图、Logo 或角色时，先查看原图，再通过参考图编辑扩展，不从文字重新猜测身份。
- 生成工具不能可靠输出透明通道时，先使用纯色、无纹理、与角色边缘高对比的背景；透明化是后续独立步骤。
- 工具能保持参考图身份时，动作资产使用图生图或编辑模式；不能保持时，缩小动作范围并逐动作生成，不一次生成整套角色。

### 4.2 身份候选提示模板

将方括号字段替换为项目事实，并附加所选风格模块的正向与负向提示块：

```text
Create an original brand mascot for [audience and product]. Its job is to [narrative role].
Character: [silhouette], [proportions], [face], [palette], [material], [outline],
with one stable signature prop: [prop]. Show one neutral full-body pose, centered and fully visible,
with clean separation between limbs and body. Use a plain high-contrast background suitable for clean cutout.
No text, no logo, no watermark, no extra character, no cropped limbs, no duplicate body parts.
```

一次可生成少量候选，但只批准其中一个身份。候选接触表只用于选择，不能直接拆成跨镜动作帧。

### 4.3 身份锚点确认

检查并记录：

- 100% 和目标成片缩放尺寸下，轮廓是否清楚；
- 手脚、五官和标志物是否能稳定重画；
- 角色是否与字幕、真实 UI 和品牌 Logo 区分；
- 是否存在乱码、水印、第三方标志或多余物体；
- 身份图的工具/模型（若可得）、提示词哈希、参考图哈希和输出 SHA-256。

确认后冻结 `identity-anchor.png`。后续动作都引用这张图，不使用“上一次生成结果”这种不可追踪描述。

## 5. 动作拆帧与抠图

### 5.1 从分镜派生动作矩阵

只为已批准镜头生成动作。每个动作写明：

| 字段 | 说明 |
| --- | --- |
| `action_id` | 稳定语义名，例如 `think`、`point`、`listen`、`inspect` |
| `scene_ids` | 使用它的镜头 |
| `meaning` | 观众应理解的单一含义 |
| `poses` | 2–3 个离散姿势；起势、落点、可选回弹 |
| `hold` | 主要信息落地时停在哪一帧 |
| `prop_state` | 道具是否出现、打开或切换 |
| `enter_exit` | 进出方向和遮罩；不得凭空出现或消失 |

动作数量服从叙事，不追求表情包大全。同一短视频通常先覆盖 4–8 个高价值动作。

### 5.2 单动作参考图提示模板

每次只生成一个动作的 2–3 个姿势，并把 `identity-anchor.png` 作为参考：

```text
Preserve the referenced mascot exactly: same silhouette, proportions, face, palette, material,
outline, signature prop and shadow system. Create [2 or 3] discrete stop-motion poses for [action].
Pose 1: [start]. Pose 2: [main readable beat]. Pose 3: [settled hold, if needed].
Keep the same camera, canvas, scale and foot/body anchor. The character remains rigid in the selected
[style] grammar; change only [allowed limbs, gaze, expression or prop state]. Plain high-contrast background.
No in-between blur, no morphing, no extra limbs, no identity drift, no text, no watermark.
```

如果工具把多个姿势合成一张接触表，该图只用于评审。生产帧应逐张生成或可靠拆分后逐张检查，不能带格线、标签或相邻角色残影。

### 5.3 抠图和标准化

1. 优先使用图像编辑工具把已确认帧改为透明背景；不要为了方便重新生成角色。
2. 输出带 alpha 的 PNG 源文件。网页需要时再额外生成 WebP/AVIF，不覆盖 PNG。
3. 在白、黑和品牌主色三种底色上检查发丝/纸边、白边、色溢、孔洞和半透明光晕。
4. 所有帧统一画布、分辨率、主体缩放和锚点；动作只能改变矩阵允许的部位。
5. 用命名 `mascot/<action_id>-01.png`、`-02.png`、`-03.png`，不把场景序号写进公共资产名。
6. 生成 contact sheet，同时看完同一动作和跨动作首帧；单帧看起来正常不等于身份连续。

## 6. 视频和网页集成

### 视频主时间轴

- Remotion 或其他逐帧渲染器用帧号选择离散 PNG；不使用 CSS animation、运行时计时器或随机抖动。
- 每个姿势保持 2–6 个输出帧，重要落点可停留更久；动作越快，姿势越少。
- 允许刚性平移、分级旋转、等比缩放和遮罩进退；禁止肢体弯曲插值、液化、补间变脸和连续呼吸缩放。
- 角色不是默认 Hero。真实产品证据、关键标题或 CTA 为 Hero 时，吉祥物降级为引导元素并离开文字安全区。
- 音效只对齐有叙事意义的接触点、指向或确认动作，不给每个换帧配音效。

### 网页或互动展示

- 使用优化格式优先、透明 PNG 回退，并声明固定宽高，避免布局偏移。
- 只让视口内最相关的一组动作运行；页面隐藏、离开视口或 `prefers-reduced-motion: reduce` 时停在静态帧。
- 静态托管若不保证 `.mjs` MIME，优先使用无依赖普通 `.js` 延迟脚本；本地验收同时覆盖 `file://` 和 HTTP。
- 角色动作不能成为唯一提示，必须有等价文字；同一动作组只提供一次有意义的替代文本。

## 7. 资产清单

在 `mascot/mascot-manifest.json` 中保存可审计事实，不保存 API Key：

```json
{
  "id": "mascot-short-id",
  "identityAnchor": {
    "path": "mascot/identity-anchor.png",
    "sha256": "...",
    "promptSha256": "...",
    "referenceSha256": "..."
  },
  "stylePreset": "selected-style-id",
  "actions": [
    {
      "id": "think",
      "sceneIds": ["S02"],
      "frames": [
        {"path": "mascot/think-01.png", "sha256": "...", "width": 1024, "height": 1024}
      ],
      "holdFrame": 2
    }
  ]
}
```

若生成服务公开模型、种子或任务 ID，可一并记录；不可得时写 `unknown`，不要猜测。素材来源、授权和人工修改也写进 manifest 或相邻 provenance 文件。

## 8. 专项质检

进入全片渲染前：

- [ ] Identity Block 与唯一身份锚点已经确认。
- [ ] 每个动作对应已批准镜头和单一语义，没有无用途动作。
- [ ] 同动作 2–3 帧及跨动作首帧的轮廓、比例、脸、配色、材质、线条和标志物一致。
- [ ] 没有多肢、断肢、视线漂移、阴影换向、道具瞬移、乱码、水印或第三方标志。
- [ ] 透明边缘已在浅色、深色和品牌色背景检查，无白边、色溢和明显光晕。
- [ ] 画布、锚点和缩放统一；所有进退场都有可见路径或遮罩。
- [ ] 生成来源、授权、提示词/参考图/输出哈希已写入无密钥 manifest。

进入交付前：

- [ ] 代表帧和动作接触表均已查看，手机尺寸下仍能读懂动作。
- [ ] 动作由主时间轴确定性驱动，暂停和落点与旁白、字幕、音效一致。
- [ ] 吉祥物没有遮挡字幕、真实 UI、按钮、Logo 或 CTA，也没有在每个镜头重复同一动作。
- [ ] 完整观看时角色帮助理解而非制造空洞热闹；删掉它不会损害理解的镜头应考虑删减角色。
