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
  const visibleText = (html) => html.slice(html.indexOf("<body"), html.indexOf("</body>")).replace(/<[^>]+>/g, " ");
  assert.equal(visibleText(english).match(prohibited), null);
  assert.equal(visibleText(chinese).match(prohibited), null);
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
    assert.match(html, /"@type"\s*:\s*"SoftwareApplication"/);
    assert.match(html, /"@type"\s*:\s*"FAQPage"/);
  }
});
