# Agentic Video Foundry 官网与模块化宣传视频实施计划

日期：2026-08-18
依据：

- `docs/superpowers/specs/2026-08-18-agentic-video-foundry-pop-art-website-design.md`
- `docs/superpowers/specs/2026-08-18-agentic-video-foundry-modular-promo-video-design.md`

## 交付物一：静态波普艺术官网

1. 在仓库创建 `website/index.html`、`website/styles.css`、`website/site.js` 与 `website/README.md`。
2. 在 `index.html` 实现导航、Hero、证据数字条、六步工作流、真实证据、自剪自证、案例、安装 CTA 与页脚。
3. 在 `styles.css` 实现共用波普 token、粗黑轮廓、固定网点、响应式布局、键盘焦点与减少动效模式。
4. 在 `site.js` 实现安装命令复制反馈与导航状态；核心内容不依赖 JavaScript。
5. 验证 1440、768、390 三类视口无横向溢出；检查键盘、复制、锚点、减少动效、文本对比度和静态打开。
6. 扫描源码，确认没有密钥、本机绝对路径、用户媒体和追踪脚本。
7. 将官网作为视频录屏素材，但不将私人视频或截图提交到公开仓库。

## 交付物二：九段模块化宣传视频

1. 保留旧版成片，复制并冻结 v4 脚本、波普 preset、录屏清单和素材清单。
2. 录制或生成脱敏的真实官网、Codex、终端、Finder、播放器与交付目录画面；每个素材保存来源、用途与 SHA-256。
3. 重新检查外部 AI 游戏平台 MOV 的流信息，提取 16 秒压轴片段与代表帧，不修改源文件。
4. 为九段批准旁白创建无密钥音频计划；先 dry-run 和复用检查，再使用已认可火山声线生成带字幕/对齐的正式音频。
5. 为完整时间轴生成 2–3 个连续 BGM 候选，试听选择后冻结；SFX 只覆盖关键操作和两种转场。
6. 由真实旁白时长生成 `timeline-v4.json`、`captions-v4.json` 与音频 manifest。
7. 新建 v4 Remotion composition；统一主题、时间轴、字幕、EvidencePanel、ComicPanel、PopHeadline 和转场组件。
8. 实现九段内容，真实 UI 保持原像素；所有动画由帧值驱动，不使用 CSS animation、系统时间或无种子随机。
9. 渲染代表帧并检查安全区、单一 Hero、网点摩尔纹、文字截断、转场闪帧和真实证据可读性。
10. 渲染完整 raw master，完成最终混音与母带；由唯一主时间轴派生九段 mixed/clean MP4、voice/BGM/SFX/mix WAV 与 SRT。
11. 生成 `edit-manifest.json`，验证分段帧数、音轨长度、哈希和 BGM 样本连续性。
12. 对完整母带和九段成片执行 ffprobe、LUFS、dBTP、密钥扫描、确定性检查与 Foundry strict audit。
13. 完整观看和收听最终编码文件；耳机与手机外放复核 BGM 可感知、旁白清晰、无刺啦/爆音/异常静音。

## 提交与回退

- 官网提交只包含 `website/`、说明文档和必要 README 链接。
- 视频源工程与用户媒体留在外部制作工程，不提交到公开 Skill 仓库。
- 每次提交使用明确路径暂存，保留用户现有修改和旧版成片。
- 任何付费素材已存在且哈希一致时复用，避免重复消耗额度。
- 新版通过全部验收前，不覆盖 v3.1 唯一回退文件。

## 完成条件

- `website/index.html` 可本地直接浏览，核心交互、响应式和公开安全检查通过；
- 九段 mixed/clean MP4、每段四轨 WAV、SRT、完整四轨母带、封面、manifest、验证摘要齐全；
- 最终文件经过真实视觉、听觉与技术验收；
- 两个产物均包含独立复现说明。
