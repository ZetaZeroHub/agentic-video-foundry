# Agentic Video Foundry V5 证据阶梯实施计划

日期：2026-08-18

设计依据：`docs/superpowers/specs/2026-08-18-agentic-video-foundry-v4-evidence-ladder-refinement-design.md`

制作工程：`/Users/apple/Documents/Codex/2026-07-20/agentic-video-foundry-launch-v2`

## 目标

在不覆盖 V4 的前提下，生成约 88–92 秒的 V5 成片、十个独立章节、完整分轨和质检证据。关闭字幕截句、两处爆音、案例画布半透明、诊断解释不足和第 3/6/7/8 章表现力不足等缺陷。

## 任务 1：建立 V5 数据骨架

文件：

- `src/data/script-v5.json`
- `src/data/timeline-v5.json`
- `src/data/captions-v5.json`
- `src/data/mix-v5.json`
- `audio-plan.v5.voiceover.json`
- `audio-plan.v5.score.json`
- `scripts/build-timeline-v5.mjs`
- `tests/timeline-v5.test.mjs`

动作：

1. 写入批准的十段旁白和最小时长；
2. 旁白继续使用已选中的火山参考声线；
3. 字幕以完整句为最小单元，不再按 12 字截断；
4. 先 dry-run 验证音频计划与凭据路由，不消费额度；
5. 运行单元测试确认十章连续、无重叠、字幕不跨句。

## 任务 2：生成并核验 V5 音频

文件：

- `public/audio/v5/voiceover/*.wav`
- `public/audio/v5/bgm.wav`
- `src/data/audio-manifest-v5.json`
- `src/data/audio-manifest-v5-score.json`

动作：

1. 复用用户已批准的参考声线，不重复做无意义试听；
2. 按十个语义段生成旁白并保存供应商时间戳；
3. 生成覆盖完整故事弧的连续 BGM；
4. 检查文本忠实度、专有名词、时长和文件哈希；
5. 用真实旁白时长重建时间轴与字幕。

## 任务 3：实现 V5 十章画面

文件：

- `src/components/FoundryPopV5.jsx`
- `src/Root.jsx`
- `src/data/style-preset.json`（只在现有 preset 缺失批准 token 时补充）

动作：

1. 第一章加入“自己剪自己”和约 24 美元账单贴纸；
2. 第二章把受众、平台、时长、证据连成四条因果链；
3. 第三章现场演示允许与禁止的画面规则；
4. 第四章展示真实安装、对话演进、文件生成和预览；
5. 第五章展示 35.64M Token、约 24 美元、工具与返工轨迹；
6. 第六章实现真实声纹、试听、推子和节拍工作台；
7. 第七章实现 Remotion/Lottie/HyperFrames 支线汇入主时间轴；
8. 第八章实现安全区、字幕、编码、响度和峰值质检机器；
9. 第九章使用完全不透明的 16:9 案例播放画布；
10. 第十章只保留项目名、安装入口和 CTA。

## 任务 4：重建混音并关闭爆音

文件：

- `scripts/build-audio-stems-v5.mjs`
- `scripts/normalize-masters-v5.mjs`
- `public/audio/v5/full-voice.wav`
- `public/audio/v5/full-bgm.wav`
- `public/audio/v5/full-sfx.wav`
- `public/audio/v5/full-mix.wav`

动作：

1. 旁白、BGM、SFX 分轨构建；
2. 不复用可疑的宽带转场音效；
3. 对所有裁切点做短淡入淡出或等功率交叉淡化；
4. 在两个旧故障时间附近提取 stem、波形和频谱；
5. 确认无样本跳变、削波和非预期宽带瞬态；
6. 重新测量完整母带 LUFS 与 dBTP。

## 任务 5：代表帧与完整渲染

文件：

- `delivery-v5/contact-sheet/`
- `delivery-v5/agentic-video-foundry-pop-v5-mixed.mp4`
- `delivery-v5/agentic-video-foundry-pop-v5-clean.mp4`

动作：

1. 先渲染十章代表帧；
2. 检查安全区、完整字幕、真实 UI、网点、层级和案例画布；
3. 修复代表帧问题后才渲染完整 mixed/clean；
4. 完整观看和收听最终编码文件。

## 任务 6：模块化导出与质检

文件：

- `scripts/export-subtitles-v5.mjs`
- `scripts/package-video-v5.mjs`
- `scripts/validate-delivery-v5.mjs`
- `delivery-v5/segments/*`
- `delivery-v5/edit-manifest.json`
- `delivery-v5/validation/`

动作：

1. 导出十章 mixed/clean MP4；
2. 导出每章 voice/BGM/SFX/mix WAV 和完整句 SRT；
3. 核对每章视频、音轨和字幕边界；
4. 运行严格项目审计、`ffprobe`、LUFS/dBTP 和代表帧检查；
5. 保存验证摘要和复现命令。

## 任务 7：最终交付

产物：

1. V5 完整成片与十章模块包；
2. 已完成的波普官网项目与发布包；
3. 封面、字幕、脚本、音频清单、编辑清单、质检报告和发布文案。

只有最终编码文件通过完整视听和技术检测后，才宣布完成。
