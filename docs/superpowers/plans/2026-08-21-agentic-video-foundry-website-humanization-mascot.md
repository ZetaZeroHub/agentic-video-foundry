# Agentic Video Foundry Website Humanization and Mascot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the bilingual static website around a beginner-first story, place the complete V6 film immediately after the hero, and add accessible stop-motion loops using the existing 小铸 mascot frames.

**Architecture:** Keep the site dependency-free: two locale-specific HTML documents share one stylesheet and two small JavaScript modules. `site.js` owns navigation, copy, video, tabs, and disclosure behavior; `mascot.mjs` owns stop-motion state and viewport lifecycle. A Node test suite treats content order, bilingual parity, metadata, asset references, and animation timing as contracts.

**Tech Stack:** Semantic HTML5, CSS custom properties and media queries, browser-native JavaScript, IntersectionObserver, Page Visibility API, Node `node:test`, `cwebp`, `ffprobe`, Python static server, Git.

---

## Locked file map

- Modify `website/index.html`: default English page, metadata, structured data, and the approved eight-part page story.
- Modify `website/zh/index.html`: Simplified Chinese page with matching semantics and native Chinese copy.
- Modify `website/styles.css`: shared pop-art system, responsive layouts, document cards, style previews, disclosures, and mascot slots.
- Modify `website/site.js`: header menu, language preference, install copy fallback, evidence-video lifecycle, style tabs, and media error states.
- Create `website/mascot.mjs`: reusable stop-motion controller and pure timing helpers.
- Create `website/tests/site-contract.test.mjs`: bilingual structure, content, SEO, asset, and prohibited-jargon regression tests.
- Create `website/tests/mascot.test.mjs`: pure tests for frame advancement and motion preference.
- Create `website/assets/mascot/*.png`: transparent source fallbacks copied from the approved V6 project.
- Create `website/assets/mascot/*.webp`: optimized browser assets generated from those approved sources.
- Create `website/assets/brands/workbuddy.svg`: pinned icon from WorkBuddy's official website.
- Create `website/assets/brands/manus.svg`: pinned icon from Manus's official website.
- Modify `website/assets/README.md`: mascot provenance, source mapping, dimensions, and deployment-media boundary.
- Modify `website/assets/brands/README.md`: official source URLs, retrieval date, and hashes for the two added logos.
- Modify `website/README.md`: local verification commands and updated page behavior.
- Modify `website/llms.txt`: plain-language public summary matching the redesigned site.

The plan deliberately does not add React, Remotion, a package manager, analytics, a backend, or a build step.

## Specification coverage map

- Header, Hero, compatibility badges, and case evidence: Tasks 2, 3, and 5.
- Complete film immediately after Hero: Tasks 2, 3, 5, 6, and the full-watch gate in Task 7.
- Audience, platform, and duration diagnosis: Task 3.
- Four working documents: Task 3.
- ElevenLabs and Volcengine audio story with progressive technical disclosure: Task 3.
- Pop art, paper collage, and custom style extension: Tasks 3 and 5.
- 检查与交付, including captions, phone-speaker clarity, clean transitions, and editable assets: Tasks 3 and 7.
- Beginner FAQ, installation, Footer, SEO, bilingual parity, and machine-readable copy: Tasks 2, 3, and 6.
- 小铸 assets, stop-motion timing, one-active-player rule, viewport lifecycle, and reduced-motion fallback: Tasks 1, 2, 4, 5, and 7.
- Responsive, keyboard, media-error, no-JavaScript, and performance acceptance: Tasks 5 and 7.

### Task 1: Freeze the mascot and missing official brand assets

**Files:**
- Create: `website/assets/mascot/intro-{1,2,3}.png`
- Create: `website/assets/mascot/diagnosis-{1,2,3}.png`
- Create: `website/assets/mascot/documents-{1,2,3}.png`
- Create: `website/assets/mascot/audio-{1,2,3}.png`
- Create: `website/assets/mascot/qc-{1,2,3}.png`
- Create: `website/assets/mascot/intro-{1,2,3}.webp`
- Create: `website/assets/mascot/diagnosis-{1,2,3}.webp`
- Create: `website/assets/mascot/documents-{1,2,3}.webp`
- Create: `website/assets/mascot/audio-{1,2,3}.webp`
- Create: `website/assets/mascot/qc-{1,2,3}.webp`
- Create: `website/assets/brands/workbuddy.svg`
- Create: `website/assets/brands/manus.svg`
- Modify: `website/assets/README.md`
- Modify: `website/assets/brands/README.md`

- [ ] **Step 1: Copy only the five approved V6 action groups**

Run:

```bash
mkdir -p website/assets/mascot
cp /Users/apple/Documents/Codex/2026-07-20/agentic-video-foundry-launch-v2/public/assets/mascot/01-intro-f1.png website/assets/mascot/intro-1.png
cp /Users/apple/Documents/Codex/2026-07-20/agentic-video-foundry-launch-v2/public/assets/mascot/01-intro-f2.png website/assets/mascot/intro-2.png
cp /Users/apple/Documents/Codex/2026-07-20/agentic-video-foundry-launch-v2/public/assets/mascot/01-intro-f3.png website/assets/mascot/intro-3.png
cp /Users/apple/Documents/Codex/2026-07-20/agentic-video-foundry-launch-v2/public/assets/mascot/02-diagnosis-f1.png website/assets/mascot/diagnosis-1.png
cp /Users/apple/Documents/Codex/2026-07-20/agentic-video-foundry-launch-v2/public/assets/mascot/02-diagnosis-f2.png website/assets/mascot/diagnosis-2.png
cp /Users/apple/Documents/Codex/2026-07-20/agentic-video-foundry-launch-v2/public/assets/mascot/02-diagnosis-f3.png website/assets/mascot/diagnosis-3.png
cp /Users/apple/Documents/Codex/2026-07-20/agentic-video-foundry-launch-v2/public/assets/mascot/04-documents-f1.png website/assets/mascot/documents-1.png
cp /Users/apple/Documents/Codex/2026-07-20/agentic-video-foundry-launch-v2/public/assets/mascot/04-documents-f2.png website/assets/mascot/documents-2.png
cp /Users/apple/Documents/Codex/2026-07-20/agentic-video-foundry-launch-v2/public/assets/mascot/04-documents-f3.png website/assets/mascot/documents-3.png
cp /Users/apple/Documents/Codex/2026-07-20/agentic-video-foundry-launch-v2/public/assets/mascot/05-audio-f1.png website/assets/mascot/audio-1.png
cp /Users/apple/Documents/Codex/2026-07-20/agentic-video-foundry-launch-v2/public/assets/mascot/05-audio-f2.png website/assets/mascot/audio-2.png
cp /Users/apple/Documents/Codex/2026-07-20/agentic-video-foundry-launch-v2/public/assets/mascot/05-audio-f3.png website/assets/mascot/audio-3.png
cp /Users/apple/Documents/Codex/2026-07-20/agentic-video-foundry-launch-v2/public/assets/mascot/07-qc-f1.png website/assets/mascot/qc-1.png
cp /Users/apple/Documents/Codex/2026-07-20/agentic-video-foundry-launch-v2/public/assets/mascot/07-qc-f2.png website/assets/mascot/qc-2.png
cp /Users/apple/Documents/Codex/2026-07-20/agentic-video-foundry-launch-v2/public/assets/mascot/07-qc-f3.png website/assets/mascot/qc-3.png
```

Expected: 15 transparent PNG files exist and every file is 418×418.

- [ ] **Step 2: Generate compact WebP companions without changing dimensions**

Run:

```bash
for source in website/assets/mascot/*.png; do /opt/homebrew/bin/cwebp -quiet -q 82 -alpha_q 95 -m 6 "$source" -o "${source%.png}.webp"; done
```

Expected: 15 WebP files exist; `sips -g pixelWidth -g pixelHeight website/assets/mascot/intro-1.webp` reports 418×418.

- [ ] **Step 3: Record provenance and the stable public names**

Append this section to `website/assets/README.md`:

```markdown
## Mascot frames

`assets/mascot/` contains five approved stop-motion actions from the V6 launch-video project: `intro`, `diagnosis`, `documents`, `audio`, and `qc`. Each action has three 418×418 transparent PNG source frames and three optimized WebP delivery frames. The website uses WebP first and PNG as a fallback; it does not synthesize or redraw the character at runtime.

The public filenames intentionally omit project-local scene numbers so page sections can use stable semantic names. Do not add unused V6 action groups to the website bundle.
```

- [ ] **Step 4: Verify file count, dimensions, and size budget**

Run:

```bash
test "$(find website/assets/mascot -type f -name '*.png' | wc -l | tr -d ' ')" = "15"
test "$(find website/assets/mascot -type f -name '*.webp' | wc -l | tr -d ' ')" = "15"
find website/assets/mascot -name '*.webp' -size +30k -print
```

Expected: both count checks exit 0; the last command prints no paths. If a frame exceeds the 30KB target, inspect its transparent edge before changing quality and record the measured exception in `website/assets/README.md`.

- [ ] **Step 5: Pin the two missing icons from official sites**

Run:

```bash
curl -L -sS https://codebuddy-1328495429.cos.accelerate.myqcloud.com/web/workbuddy/7c350554d6e526d96bb1d2ba32fd594611e9e711/assets/logo.svg -o website/assets/brands/workbuddy.svg
curl -L -sS 'https://manus.im/icon.svg?icon.2kbcs13ndm9it.svg' -o website/assets/brands/manus.svg
rg -q '<svg' website/assets/brands/workbuddy.svg
rg -q '<svg' website/assets/brands/manus.svg
shasum -a 256 website/assets/brands/workbuddy.svg website/assets/brands/manus.svg
```

Expected: both SVG checks exit 0 and the command prints a stable SHA-256 for each file. Record the official page (`https://www.workbuddy.ai/` or `https://manus.im/`), exact asset URL, retrieval date, and SHA-256 in `website/assets/brands/README.md`; do not redraw either logo.

- [ ] **Step 6: Commit the approved media set**

```bash
git add website/assets/README.md website/assets/brands/README.md website/assets/brands/workbuddy.svg website/assets/brands/manus.svg website/assets/mascot
git diff --cached --check
git commit -m "feat: add website mascot frames"
```

### Task 2: Add a failing public-site contract suite

**Files:**
- Create: `website/tests/site-contract.test.mjs`

- [ ] **Step 1: Write the static contract test**

Create `website/tests/site-contract.test.mjs` with:

```javascript
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const english = read("../index.html");
const chinese = read("../zh/index.html");

const orderedIds = ["film", "diagnosis", "documents", "audio", "styles", "quality", "faq", "install"];

const assertOrderedSections = (html) => {
  let cursor = -1;
  for (const id of orderedIds) {
    const next = html.indexOf(`id="${id}"`);
    assert.ok(next > cursor, `${id} must appear once and in the approved order`);
    cursor = next;
  }
};

test("both locales use the approved beginner-first section order", () => {
  assertOrderedSections(english);
  assertOrderedSections(chinese);
});

test("hero leads with the result and full-film action", () => {
  assert.match(english, /Describe the video[\s\S]*Get something you can publish/);
  assert.match(english, /href="#film"[^>]*>Watch the full video/);
  assert.match(chinese, /说清你想做什么[\s\S]*拿到能发布的视频/);
  assert.match(chinese, /href="#film"[^>]*>先看完整成片/);
});

test("case evidence is explicit and not presented as a universal promise", () => {
  for (const html of [english, chinese]) {
    assert.match(html, /4\+/);
    assert.match(html, /9/);
  }
  assert.match(english, /This page(?:'s|’s) video/i);
  assert.match(chinese, /本页成片实测/);
});

test("main copy does not expose implementation jargon", () => {
  const prohibited = /routing|deterministic composition|manifest|endpoint|LUFS|dBTP|168 SEC/gi;
  assert.equal(english.match(prohibited), null);
  assert.equal(chinese.match(prohibited), null);
});

test("the film has native controls, metadata preload, fallback copy, and no stale duration badge", () => {
  for (const html of [english, chinese]) {
    assert.match(html, /<video[^>]*data-evidence-video[^>]*controls[^>]*preload="metadata"/);
    assert.match(html, /data-video-error/);
    assert.doesNotMatch(html, />168 SEC</);
  }
});

test("all five mascot actions use webp with png fallback dimensions", () => {
  for (const action of ["intro", "diagnosis", "documents", "audio", "qc"]) {
    for (const html of [english, chinese]) {
      assert.match(html, new RegExp(`data-mascot="${action}"`));
      assert.match(html, new RegExp(`assets/mascot/${action}-1\\.webp`));
      assert.match(html, new RegExp(`assets/mascot/${action}-1\\.png`));
      assert.match(html, /width="418" height="418"/);
    }
  }
});

test("compatibility and audio-provider facts remain visible", () => {
  for (const name of ["Codex", "Claude Code", "Trae", "Gemini CLI", "Kimi Code", "MiniMax", "WorkBuddy", "Manus"]) {
    assert.match(english, new RegExp(name));
  }
  for (const provider of ["ElevenLabs", "Volcengine"]) assert.match(english, new RegExp(provider));
  assert.match(chinese, /ElevenLabs/);
  assert.match(chinese, /火山引擎/);
});

test("metadata retains canonical bilingual discovery", () => {
  assert.match(english, /rel="canonical" href="https:\/\/video\.zzh\.app\/"/);
  assert.match(chinese, /rel="canonical" href="https:\/\/video\.zzh\.app\/zh\/"/);
  for (const html of [english, chinese]) {
    assert.match(html, /hreflang="en"/);
    assert.match(html, /hreflang="zh-CN"/);
    assert.match(html, /"@type": "SoftwareApplication"/);
    assert.match(html, /"@type": "FAQPage"/);
  }
});
```

- [ ] **Step 2: Run the test and confirm it fails for the old page**

Run:

```bash
node --test website/tests/site-contract.test.mjs
```

Expected: FAIL on missing `#film`, beginner-first hero copy, mascot hooks, and stale jargon.

### Task 3: Rewrite both locale pages around the approved story

**Files:**
- Modify: `website/index.html`
- Modify: `website/zh/index.html`

- [ ] **Step 1: Replace the header and Hero in both locales**

Use this shared semantic shape; translate only the visible strings and keep the same attributes:

```html
<header class="site-header" data-header>
  <a class="brand" href="#top" aria-label="Agentic Video Foundry home"><span class="brand-mark">AV</span><span>Agentic Video Foundry</span></a>
  <button class="nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-controls="site-nav">Menu</button>
  <nav class="site-nav" id="site-nav" data-nav aria-label="Primary navigation">
    <a href="#film">Watch</a><a href="#diagnosis">How it works</a><a href="#styles">Styles</a><a href="#install" class="nav-cta">Install</a>
    <a class="language-link" href="./zh/" hreflang="zh-CN" lang="zh-CN">中文</a>
  </nav>
</header>
<section class="hero" id="top" aria-labelledby="hero-title">
  <div class="hero-copy">
    <p class="eyebrow">This launch video was made by the Skill itself</p>
    <h1 id="hero-title">Describe the video.<span>Get something you can publish.</span></h1>
    <p class="hero-lead">It asks who the video is for, where it will be posted, and how long it should run. Then it writes the script, plans the shots, builds the audio and captions, and delivers the finished video with editable parts.</p>
    <div class="hero-actions"><a class="button button-primary" href="#film">Watch the full video</a><a class="button button-secondary" href="#install">Install the Skill</a></div>
    <p class="case-proof">This page's video: <strong>half a day</strong> · <strong>4+ conversations</strong> · <strong>9 reusable chapters</strong></p>
  </div>
  <picture class="mascot-stage mascot-stage-hero" data-mascot="intro" data-mascot-once>
    <source srcset="./assets/mascot/intro-1.webp" type="image/webp" />
    <img src="./assets/mascot/intro-1.png" width="418" height="418" alt="小铸 waves and points toward the finished video" fetchpriority="high" />
  </picture>
</section>
```

The Chinese page must use `菜单`, `看成片`, `怎么做`, `风格`, `安装`, the approved Hero strings from the design spec, `../assets/...` paths, and `<a class="language-link" href="../" hreflang="en" lang="en">EN</a>`.

Below the Hero copy, render all eight verified compatibility badges using the local assets for Codex, Claude Code, Trae, Gemini CLI, Kimi Code, MiniMax, WorkBuddy, and Manus. The `img` elements are decorative (`alt=""`); the adjacent visible product names supply the accessible label.

- [ ] **Step 2: Move the complete film directly below Hero**

Use `id="film"`, an opaque `evidence-video-frame`, native `controls`, `muted`, `playsinline`, and `preload="metadata"`. Include `data-video-duration` for the metadata-derived label and a hidden `data-video-error` fallback containing a link to `https://github.com/ZetaZeroHub/agentic-video-foundry`.

```html
<section class="section film-section" id="film" aria-labelledby="film-title">
  <div class="section-heading"><div><p class="section-kicker">THE FINISHED FILM</p><h2 id="film-title">See what the Skill actually makes</h2></div><p>This film started with one request. It plays muted when it enters view; turn on sound when you want to hear the narration, music, and effects.</p></div>
  <div class="evidence-video-card"><div class="evidence-video-toolbar"><span>FINAL CUT / V6</span><span data-video-duration>Loading duration…</span></div><div class="evidence-video-frame"><video data-evidence-video controls muted playsinline preload="metadata" poster="./assets/og-cover.png" aria-label="Complete Agentic Video Foundry launch video"><source src="./assets/agentic-video-foundry-demo.mp4" type="video/mp4" />Your browser does not support HTML video.</video><p class="media-error" data-video-error hidden>The film could not be loaded. <a href="https://github.com/ZetaZeroHub/agentic-video-foundry">View the project on GitHub.</a></p></div><p class="evidence-video-caption">The same Skill planned, voiced, edited, checked, and delivered the video it is introducing.</p></div>
</section>
```

The Chinese version uses the approved title `这套 Skill 到底能做什么，看完就知道` and matching plain-language instructions.

- [ ] **Step 3: Add diagnosis and four-document sections**

Create `#diagnosis` with audience, platform, short-video, and long-video examples. Create `#documents` with four document cards in this exact order: goal brief, storyboard, visual spec, independent prototype. Insert `diagnosis` and `documents` mascot `<picture>` blocks using the same WebP/PNG fallback pattern and `loading="lazy"`.

Use this English content:

```html
<section class="section diagnosis-section" id="diagnosis" aria-labelledby="diagnosis-title">
  <div class="section-with-mascot"><div><p class="section-kicker">START WITH THREE QUESTIONS</p><h2 id="diagnosis-title">Who is it for, where will it run, and how long should it be?</h2><p>The same idea needs a different opening, amount of detail, and pace on Xiaohongshu, Douyin, and Bilibili.</p><div class="method-grid"><article class="method-card"><strong>For beginners</strong><p>Lead with the result and explain terms only when they help.</p></article><article class="method-card"><strong>For specialists</strong><p>Keep the method, evidence, and useful settings.</p></article><article class="method-card"><strong>For short video</strong><p>Reach the point quickly and give every shot one job.</p></article><article class="method-card"><strong>For longer video</strong><p>Make room for context, proof, and a complete walkthrough.</p></article></div></div><picture class="mascot-stage" data-mascot="diagnosis"><source srcset="./assets/mascot/diagnosis-1.webp" type="image/webp" /><img src="./assets/mascot/diagnosis-1.png" width="418" height="418" loading="lazy" alt="小铸 pauses to think through the audience, platform, and duration" /></picture></div>
</section>
<section class="section documents-section" id="documents" aria-labelledby="documents-title">
  <div class="section-heading"><div><p class="section-kicker">FOUR WORKING DOCUMENTS</p><h2 id="documents-title">Turn one idea into a plan people can execute</h2></div></div><div class="section-with-mascot"><div class="document-grid"><article class="document-card"><span>01</span><h3>Goal brief</h3><p>Who should watch, and what should they remember?</p></article><article class="document-card"><span>02</span><h3>Storyboard</h3><p>What appears in each shot, and which line of narration belongs there?</p></article><article class="document-card"><span>03</span><h3>Visual guide</h3><p>Which colors, type, motion, and mascot actions stay consistent?</p></article><article class="document-card"><span>04</span><h3>Independent prototype</h3><p>Build the hardest shot first, approve it, then expand the system.</p></article></div><picture class="mascot-stage" data-mascot="documents"><source srcset="./assets/mascot/documents-1.webp" type="image/webp" /><img src="./assets/mascot/documents-1.png" width="418" height="418" loading="lazy" alt="小铸 flips through and checks the four production documents" /></picture></div>
</section>
```

Use these exact Chinese replacements: `开始前先问三个问题`, `发给谁，发到哪，准备讲多久`, `同一个想法，发小红书、抖音和 B 站，开头、信息量和节奏都不一样。`, `给新手 / 先讲结果，需要时再解释术语。`, `给专业用户 / 保留方法、证据和有用参数。`, `做短视频 / 更快进入重点，每个镜头只做一件事。`, `做长视频 / 留出空间，把背景、证据和完整过程讲清楚。`, `四份工作文档`, `四份文档，把一句想法变成能执行的方案`, `目标简报 / 这条片给谁看，要让人记住什么。`, `分镜表 / 每个镜头出现什么，旁白说到哪里。`, `视觉规范 / 颜色、字体、动效和吉祥物怎么动。`, `独立小样 / 先把最难的镜头做出来，满意后再铺开。`.

- [ ] **Step 4: Replace the provider matrix with the user-facing audio sequence**

Create `#audio` with this semantic content. The Chinese page uses the exact title `选声音，配旁白，加音乐，再把字幕跟准` and body `Skill 已经接入 ElevenLabs 和火山引擎。它能试听不同音色，生成旁白、背景音乐和动作音效，再让字幕跟着真实口播走。声音不合适可以换，音乐太小或太抢也可以直接调。`.

```html
<section class="section audio-section" id="audio" aria-labelledby="audio-title">
  <div class="section-heading"><div><p class="section-kicker">AUDIO THAT FITS THE FILM</p><h2 id="audio-title">Choose the voice, build the soundtrack, and keep captions in sync</h2></div><p>The Skill integrates ElevenLabs and Volcengine. It can audition voices, make narration, background music, and interaction sounds, then align captions to the recorded delivery.</p></div>
  <div class="provider-row" aria-label="Integrated audio providers"><span><img src="./assets/brands/elevenlabs.svg" alt="" />ElevenLabs</span><span><img src="./assets/brands/volcengine-color.svg" alt="" />Volcengine</span></div>
  <div class="section-with-mascot"><ol class="audio-steps"><li class="audio-step"><strong>01 · Audition</strong><p>Try more than one voice before producing the final narration.</p></li><li class="audio-step"><strong>02 · Narrate</strong><p>Generate the approved script at a pace that sounds natural.</p></li><li class="audio-step"><strong>03 · Score</strong><p>Add music and small sounds that support actions without covering the voice.</p></li><li class="audio-step"><strong>04 · Align</strong><p>Use the finished speech timing to place complete caption lines.</p></li></ol><picture class="mascot-stage" data-mascot="audio"><source srcset="./assets/mascot/audio-1.webp" type="image/webp" /><img src="./assets/mascot/audio-1.png" width="418" height="418" loading="lazy" alt="小铸 listens to voice options and taps along with the soundtrack" /></picture></div>
  <details class="technical-details"><summary>View integration details</summary><p>Keys stay in the operating-system keychain or environment variables. Provider setup, timestamps, voice-cloning permission, and final audio measurement are checked without exposing credentials in the repository.</p></details>
</section>
```

- [ ] **Step 5: Simplify styles and quality sections**

Rename the style section to `#styles`; keep two keyboard-operable tabs and visual demos, but move tokens, paths, and prohibited effects into one details disclosure per style. The visible English copy is `Pick one, or add your own`, `Pop art works well for bright, fast launch videos. Paper collage suits warmer stories with more texture. Each template keeps color, type, and motion consistent across shots.` The Chinese equivalents are `先选一种，也可以加自己的` and `波普艺术适合节奏快、颜色亮的宣传片；手撕纸适合更温和、更有质感的故事。每套模板都会约束配色、字体和动作方式，避免每个镜头各长各的。`.

Add this quality section and use the equivalent Chinese labels `字幕完整`, `手机外放听得清`, `转场干净`, `方便继续剪`:

```html
<section class="section quality-section" id="quality" aria-labelledby="quality-title">
  <div class="section-with-mascot"><div><p class="section-kicker">CHECK BEFORE DELIVERY</p><h2 id="quality-title">Watch it once. Listen once. Then deliver it.</h2><p>Check that captions are complete, phone-speaker audio is clear, transitions are clean, and the files can still be edited.</p><div class="quality-grid"><article class="quality-card"><strong>Complete captions</strong><p>No clipped sentence or missing word.</p></article><article class="quality-card"><strong>Clear on a phone</strong><p>Music stays present without hiding the voice.</p></article><article class="quality-card"><strong>Clean transitions</strong><p>No click, pop, flash, or accidental gap.</p></article><article class="quality-card"><strong>Ready to keep editing</strong><p>Receive the full film, chapter exports, audio tracks, and captions.</p></article></div></div><picture class="mascot-stage" data-mascot="qc"><source srcset="./assets/mascot/qc-1.webp" type="image/webp" /><img src="./assets/mascot/qc-1.png" width="418" height="418" loading="lazy" alt="小铸 uses a magnifier and checks the delivery" /></picture></div>
  <details class="technical-details"><summary>View acceptance details</summary><p>The full technical report records frame size, frame rate, encoding, loudness, true peak, subtitle timing, representative frames, and the complete watch-through.</p></details>
</section>
```

- [ ] **Step 6: Replace FAQ, install, and Footer copy**

Write six FAQ `<details>` items using these complete English answers; provide natural Chinese equivalents with the same facts:

```html
<section class="section faq-section" id="faq" aria-labelledby="faq-title"><div class="section-heading"><div><p class="section-kicker">FAQ</p><h2 id="faq-title">What people want to know before starting</h2></div></div><div class="faq-list">
  <details><summary>I do not edit video. Can I still use it?</summary><p>Yes. Start by describing the audience, platform, length, material, and result you want. The Skill turns that into working documents and visible checkpoints you can approve.</p></details>
  <details><summary>Can I bring my own images, recordings, or existing video?</summary><p>Yes. Real product footage and user-provided material can become the main evidence instead of being covered by decorative animation.</p></details>
  <details><summary>Can I change a voice or visual style I dislike?</summary><p>Yes. You can audition another voice, rebalance the music, change sound effects, switch templates, or add a custom style before the final render.</p></details>
  <details><summary>Can I edit the result later?</summary><p>Yes. Delivery can include the complete film, standalone chapter videos, narration, music, effects, captions, and the project files used to compose them.</p></details>
  <details><summary>Which AI tools can load it?</summary><p>Codex, Claude Code, Trae, Gemini CLI, Kimi Code, MiniMax, WorkBuddy, Manus, and other environments that can load Agent Skills or repository instructions.</p></details>
  <details><summary>Do ElevenLabs or Volcengine cost extra?</summary><p>The Skill is open source. Audio-provider usage follows the account and plan you connect, so preview short samples before approving paid generation.</p></details>
</div></section>
```

Keep the install command exactly:

```text
npx skills add ZetaZeroHub/agentic-video-foundry@agentic-video-foundry -g -y
```

Show three steps: copy command, restart the AI tool, describe the video. Footer contains only project name, `https://video.zzh.app`, GitHub, MIT License, and language entry.

```html
<section class="section install-section" id="install" aria-labelledby="install-title"><div><p class="eyebrow">MIT · OPEN SOURCE</p><h2 id="install-title">Add it to the AI tool you already use</h2><p>Copy the command, restart your tool, and describe the video you want to make.</p><ol class="install-steps"><li>Copy the global install command.</li><li>Restart Codex, Claude Code, Trae, WorkBuddy, Manus, or another compatible tool.</li><li>Tell it the audience, platform, length, material, and visual direction.</li></ol></div><div class="install-panel"><pre><code data-install-command>npx skills add ZetaZeroHub/agentic-video-foundry@agentic-video-foundry -g -y</code></pre><button class="copy-button" type="button" data-copy-button aria-describedby="copy-status">Copy install command</button><p class="copy-status" id="copy-status" role="status" aria-live="polite"></p><a class="repo-link" href="https://github.com/ZetaZeroHub/agentic-video-foundry">View the GitHub repository →</a></div></section>
```

The Chinese install title is `把它装进你常用的 AI 工具`; its lead is `复制命令，重启工具，再告诉它你想做什么视频。` Footer links must use the canonical site and ZetaZeroHub repository URLs.

- [ ] **Step 7: Run the contract test to expose only CSS and runtime gaps**

Run:

```bash
node --test website/tests/site-contract.test.mjs
```

Expected: all static content, order, asset-reference, compatibility, and metadata tests pass.

- [ ] **Step 8: Commit the bilingual content rewrite**

```bash
git add website/index.html website/zh/index.html website/tests/site-contract.test.mjs
git diff --cached --check
git commit -m "feat: rewrite website for first-time users"
```

### Task 4: Implement the mascot runtime with pure timing tests

**Files:**
- Create: `website/mascot.mjs`
- Create: `website/tests/mascot.test.mjs`
- Modify: `website/index.html`
- Modify: `website/zh/index.html`

- [ ] **Step 1: Write failing timing tests**

Create `website/tests/mascot.test.mjs`:

```javascript
import assert from "node:assert/strict";
import { test } from "node:test";
import { nextFrameIndex, shouldAnimate } from "../mascot.mjs";

test("frames advance and wrap", () => {
  assert.equal(nextFrameIndex(0, 3), 1);
  assert.equal(nextFrameIndex(2, 3), 0);
});

test("animation requires visibility, viewport presence, and motion consent", () => {
  assert.equal(shouldAnimate({ visible: true, inViewport: true, reducedMotion: false }), true);
  assert.equal(shouldAnimate({ visible: false, inViewport: true, reducedMotion: false }), false);
  assert.equal(shouldAnimate({ visible: true, inViewport: false, reducedMotion: false }), false);
  assert.equal(shouldAnimate({ visible: true, inViewport: true, reducedMotion: true }), false);
});
```

- [ ] **Step 2: Run it and verify the module is missing**

Run:

```bash
node --test website/tests/mascot.test.mjs
```

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `website/mascot.mjs`.

- [ ] **Step 3: Create the stop-motion controller**

Create `website/mascot.mjs`:

```javascript
export const nextFrameIndex = (current, count) => (current + 1) % count;
export const shouldAnimate = ({ visible, inViewport, reducedMotion }) => visible && inViewport && !reducedMotion;

const FRAME_DELAYS = [170, 210, 150];
const IDLE_DELAY = 1200;

class MascotPlayer {
  constructor(picture, motionQuery) {
    this.picture = picture;
    this.image = picture.querySelector("img");
    this.source = picture.querySelector("source");
    this.action = picture.dataset.mascot;
    this.once = picture.hasAttribute("data-mascot-once");
    this.motionQuery = motionQuery;
    this.index = 0;
    this.inViewport = false;
    this.completed = false;
    this.timer = 0;
  }

  setFrame(index) {
    this.index = index;
    if (this.image) this.image.src = this.image.src.replace(/-\d\.png$/, `-${index + 1}.png`);
    if (this.source) this.source.srcset = this.source.srcset.replace(/-\d\.webp$/, `-${index + 1}.webp`);
  }

  stop({ reset = false } = {}) {
    window.clearTimeout(this.timer);
    this.timer = 0;
    if (reset) this.setFrame(0);
  }

  tick() {
    if (!shouldAnimate({ visible: !document.hidden, inViewport: this.inViewport, reducedMotion: this.motionQuery.matches }) || this.completed) return;
    const isLast = this.index === FRAME_DELAYS.length - 1;
    if (isLast && this.once) {
      this.completed = true;
      return;
    }
    const delay = isLast ? IDLE_DELAY : FRAME_DELAYS[this.index];
    this.timer = window.setTimeout(() => {
      this.setFrame(nextFrameIndex(this.index, FRAME_DELAYS.length));
      this.tick();
    }, delay);
  }

  setInViewport(value) {
    this.inViewport = value;
    this.stop({ reset: !value && !this.once });
    if (value) this.tick();
  }
}

export const bootMascots = () => {
  const pictures = [...document.querySelectorAll("[data-mascot]")];
  if (!pictures.length) return;
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const players = pictures.map((picture) => new MascotPlayer(picture, motionQuery));
  if (!("IntersectionObserver" in window) || motionQuery.matches) return;

  let activePlayer;
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const player = players.find((candidate) => candidate.picture === entry.target);
      if (!player) continue;
      if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
        activePlayer?.setInViewport(false);
        activePlayer = player;
        player.setInViewport(true);
      } else if (player === activePlayer) {
        player.setInViewport(false);
        activePlayer = undefined;
      }
    }
  }, { threshold: [0, 0.35, 0.7] });

  players.forEach((player) => observer.observe(player.picture));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) players.forEach((player) => player.stop());
    else activePlayer?.tick();
  });
  motionQuery.addEventListener?.("change", () => {
    players.forEach((player) => player.stop({ reset: true }));
    if (!motionQuery.matches) activePlayer?.tick();
  });
};

if (typeof document !== "undefined") bootMascots();
```

- [ ] **Step 4: Load the module on both pages**

Add before `</body>` in both locale files:

```html
<script type="module" src="./mascot.mjs"></script>
```

Use `../mascot.mjs` in `website/zh/index.html`.

- [ ] **Step 5: Run the mascot tests**

Run:

```bash
node --test website/tests/mascot.test.mjs
```

Expected: 2 tests pass.

- [ ] **Step 6: Commit the mascot runtime**

```bash
git add website/mascot.mjs website/tests/mascot.test.mjs website/index.html website/zh/index.html
git diff --cached --check
git commit -m "feat: animate mascot in visible sections"
```

### Task 5: Refactor shared page behavior and styles

**Files:**
- Modify: `website/site.js`
- Modify: `website/styles.css`

- [ ] **Step 1: Add mobile navigation and disclosure-safe behavior to `site.js`**

Add a `data-nav-toggle` handler that updates `aria-expanded`, toggles `.is-open` on `[data-nav]`, and closes after a navigation link is activated. Keep the existing Clipboard API fallback and language preference behavior.

```javascript
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const setNavOpen = (open) => {
  nav?.classList.toggle("is-open", open);
  navToggle?.setAttribute("aria-expanded", String(open));
};
navToggle?.addEventListener("click", () => setNavOpen(navToggle.getAttribute("aria-expanded") !== "true"));
nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setNavOpen(false)));
```

- [ ] **Step 2: Make video state metadata-driven and failure-safe**

On `loadedmetadata`, write `Math.round(evidenceVideo.duration / 60)` minutes plus remaining seconds into `[data-video-duration]`. On `error`, hide the video, reveal `[data-video-error]`, and stop autoplay attempts. Keep muted viewport autoplay only when reduced motion is off; native controls remain the source of truth.

```javascript
const durationLabel = document.querySelector("[data-video-duration]");
const videoError = document.querySelector("[data-video-error]");
let videoAvailable = true;
evidenceVideo?.addEventListener("loadedmetadata", () => {
  const total = Math.round(evidenceVideo.duration);
  const minutes = Math.floor(total / 60);
  const seconds = String(total % 60).padStart(2, "0");
  if (durationLabel) durationLabel.textContent = `${minutes}:${seconds}`;
});
evidenceVideo?.addEventListener("error", () => {
  videoAvailable = false;
  evidenceVideo.hidden = true;
  if (videoError) videoError.hidden = false;
});
```

Guard `playEvidenceVideo()` with `if (!evidenceVideo || !videoAvailable) return;`.

- [ ] **Step 3: Keep the style tabs keyboard-operable**

Retain `ArrowLeft` and `ArrowRight`; add `Home` and `End`; set `tabIndex` to `0` for the active tab and `-1` for inactive tabs. Do not animate panel height.

```javascript
const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
presetTabs.forEach((tab) => tab.addEventListener("keydown", (event) => {
  if (!keys.includes(event.key)) return;
  event.preventDefault();
  const tabs = [...presetTabs];
  const current = tabs.indexOf(tab);
  const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : event.key === "ArrowRight" ? (current + 1) % tabs.length : (current - 1 + tabs.length) % tabs.length;
  tabs[next].focus();
  activatePreset(tabs[next].dataset.preset);
}));
```

Inside `activatePreset`, set `tab.tabIndex = isActive ? 0 : -1` for every tab.

- [ ] **Step 4: Replace legacy section CSS with the approved layout system**

Define and use these component groups:

```css
.film-section, .diagnosis-section, .documents-section, .audio-section, .styles-section, .quality-section, .faq-section, .install-section { padding: clamp(72px, 9vw, 132px) var(--gutter); }
.section-with-mascot { display: grid; grid-template-columns: minmax(0, 1fr) minmax(180px, 320px); gap: clamp(28px, 5vw, 72px); align-items: center; }
.mascot-stage { display: block; width: min(100%, 320px); aspect-ratio: 1; align-self: center; justify-self: center; }
.mascot-stage img { display: block; width: 100%; height: 100%; object-fit: contain; }
.document-grid, .method-grid, .audio-steps, .quality-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
.document-card, .method-card, .audio-step, .quality-card { border: 4px solid var(--ink); background: var(--white); box-shadow: 8px 8px 0 var(--ink); padding: clamp(22px, 3vw, 34px); }
.technical-details { margin-top: 24px; border: 3px solid var(--ink); background: rgba(255,255,255,.72); }
.technical-details summary { min-height: 44px; padding: 14px 18px; font-weight: 900; cursor: pointer; }
.technical-details > :not(summary) { margin-inline: 18px; }
.evidence-video-frame { background: #080808; }
.evidence-video-frame video { display: block; width: 100%; background: #080808; }
```

- [ ] **Step 5: Add responsive and reduced-motion rules**

```css
@media (max-width: 800px) {
  .nav-toggle { display: inline-flex; min-width: 44px; min-height: 44px; }
  .site-nav { display: none; position: absolute; inset: 100% 0 auto; background: var(--paper); border-bottom: 4px solid var(--ink); padding: 18px var(--gutter); }
  .site-nav.is-open { display: grid; }
  .section-with-mascot { grid-template-columns: 1fr; }
  .mascot-stage { width: min(64vw, 260px); }
}
@media (max-width: 480px) {
  .document-grid, .method-grid, .audio-steps, .quality-grid { grid-template-columns: 1fr; }
  .hero h1 { font-size: clamp(48px, 15vw, 72px); }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}
```

- [ ] **Step 6: Run both Node suites**

Run:

```bash
node --test website/tests/*.test.mjs
```

Expected: all tests pass.

- [ ] **Step 7: Commit behavior and presentation**

```bash
git add website/site.js website/styles.css
git diff --cached --check
git commit -m "feat: refine website interaction and layout"
```

### Task 6: Align SEO, public docs, and machine-readable copy

**Files:**
- Modify: `website/index.html`
- Modify: `website/zh/index.html`
- Modify: `website/README.md`
- Modify: `website/llms.txt`

- [ ] **Step 1: Update page metadata in both locales**

Use a result-first title and description, keep reciprocal canonical/hreflang links, and update Open Graph and Twitter descriptions. Keep the existing `SoftwareApplication`, `HowTo`, and `FAQPage` JSON-LD types, but make their visible claims match the new page. Use ISO 8601 `PT4M15S` for the current 255-second deployment master only after confirming with:

```html
<title>Agentic Video Foundry — Turn one request into a publishable video</title>
<meta name="description" content="An open-source Agent Skill that plans, voices, edits, checks, and delivers short videos from one clear request." />
<meta property="og:title" content="Agentic Video Foundry — One request to a publishable video" />
<meta property="og:description" content="Watch the finished film, see the four working documents, choose audio and visual styles, then install the open-source Skill." />
```

The Chinese metadata is `Agentic Video Foundry——一句需求，做到能发布的视频` and `一套开源 Agent Skill：先问清受众、平台和时长，再完成脚本、分镜、配音、音乐、字幕、质检和可编辑交付。`.

```bash
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 website/assets/agentic-video-foundry-demo.mp4
```

Expected: approximately `255.066667`. If the deployed master changes, derive and use its confirmed duration instead.

- [ ] **Step 2: Rewrite `website/llms.txt` in plain language**

State: what the Skill delivers, the eight-page-section workflow, supported AI tools, ElevenLabs/Volcengine integration, installation command, repository URL, canonical website, and the fact that private credentials/media are excluded from Git.

```text
# Agentic Video Foundry

Agentic Video Foundry is an open-source Agent Skill that turns a clear video request into a finished film and editable production assets.

It asks about the audience, publishing platform, duration, source material, and visual direction. It then creates a goal brief, storyboard, visual guide, and independent prototype; produces narration, music, sound effects, and aligned captions; composes the film; and completes visual and audio checks before delivery.

Compatible environments include Codex, Claude Code, Trae, Gemini CLI, Kimi Code, MiniMax, WorkBuddy, Manus, and other tools that can load Agent Skills or repository instructions. Audio integrations include ElevenLabs and Volcengine.

Install: npx skills add ZetaZeroHub/agentic-video-foundry@agentic-video-foundry -g -y
Website: https://video.zzh.app/
Repository: https://github.com/ZetaZeroHub/agentic-video-foundry

Credentials, paid media, and private recordings are not stored in the public Git repository.
```

- [ ] **Step 3: Update local-preview and verification instructions**

Add to `website/README.md`:

````markdown
## Verify

```bash
node --test website/tests/*.test.mjs
python3 -m http.server 4173 --directory website
```

Open `http://127.0.0.1:4173/` and `http://127.0.0.1:4173/zh/`. Check widths 375, 768, 1024, and 1440; keyboard navigation; reduced motion; muted viewport playback; manual sound; mascot pausing; and the Clipboard API fallback.
````

- [ ] **Step 4: Run contract and metadata checks**

Run:

```bash
node --test website/tests/*.test.mjs
python3 -m json.tool <(sed -n '/application\/ld+json/,/<\/script>/p' website/index.html | sed '1d;$d') >/dev/null
python3 -m json.tool <(sed -n '/application\/ld+json/,/<\/script>/p' website/zh/index.html | sed '1d;$d') >/dev/null
```

Expected: Node tests pass; both JSON commands exit 0.

- [ ] **Step 5: Commit metadata and documentation**

```bash
git add website/index.html website/zh/index.html website/README.md website/llms.txt
git diff --cached --check
git commit -m "docs: align website discovery and verification"
```

### Task 7: Run visual, accessibility, media, and repository acceptance

**Files:**
- Modify only files implicated by a reproduced acceptance failure.

- [ ] **Step 1: Start the static site on an explicit port**

Run:

```bash
python3 -m http.server 4173 --directory website
```

Expected: both locale URLs return HTTP 200 and all mascot/video requests return HTTP 200.

- [ ] **Step 2: Verify the four required responsive widths**

At 375, 768, 1024, and 1440 pixels, capture the Hero, full film, document cards, audio, style tabs, quality, FAQ, and install sections. Confirm no horizontal scroll, no hidden focus ring, no control smaller than 44×44, and no mascot overlap.

- [ ] **Step 3: Verify interaction and degradation paths**

With keyboard only: open/close mobile navigation, reach the film controls, switch style tabs with arrows/Home/End, open FAQ/details, and copy the install command. Enable reduced motion and confirm the video does not autoplay and every mascot remains on its first frame. Disable JavaScript and confirm core content, native video controls, language links, install command, and GitHub link remain usable.

- [ ] **Step 4: Watch and listen to the full embedded film**

Play the complete 255-second deployment master with sound. Confirm the frame is opaque, the soundtrack is audible without masking narration, no transition contains a click/pop, captions in the film remain readable, and playback reaches the final frame without interruption. This is a manual full-duration gate, not a representative-frame substitute.

- [ ] **Step 5: Run technical media and source checks**

Run:

```bash
ffprobe -v error -show_entries format=duration,size:stream=codec_name,width,height,r_frame_rate -of default=noprint_wrappers=1 website/assets/agentic-video-foundry-demo.mp4
rg -n "kinglegendzzh|ChatGPT Plus|168 SEC|routing|deterministic composition|manifest|LUFS|dBTP" website --glob '!tests/**'
git diff --check
git status --short
```

Expected: video reports H.264 720×1280 at 30 fps with AAC and a confirmed duration; the text scan prints no stale public copy; diff check passes; status shows only intended website changes and the untracked local `.superpowers/` brainstorm directory.

- [ ] **Step 6: Commit acceptance fixes only if needed**

```bash
git add website/index.html website/zh/index.html website/styles.css website/site.js website/mascot.mjs website/README.md website/llms.txt website/tests/site-contract.test.mjs website/tests/mascot.test.mjs website/assets/README.md website/assets/brands/README.md website/assets/brands/workbuddy.svg website/assets/brands/manus.svg website/assets/mascot
git diff --cached --check
git diff --cached --stat
git commit -m "fix: close website acceptance gaps"
```

If no acceptance fixes were needed, skip this commit.

- [ ] **Step 7: Produce the handoff record**

Report the tested URLs, responsive widths, Node test count, actual video metadata, full-watch result, reduced-motion result, keyboard result, final commit SHA, and any deployment-only media that remains intentionally outside Git. Do not report a successful render or HTTP 200 as proof of visual or audible acceptance.
