import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import vm from "node:vm";

const require = createRequire(import.meta.url);
const { buildChineseUrl, normalizeLanguage, resolvePreferredLanguage } = require("../language.js");
const controllerSource = readFileSync(new URL("../language.js", import.meta.url), "utf8");

const runBrowserController = ({ lang = "en", stored = null, primary = "en-US", href }) => {
  const redirects = [];
  const window = {
    localStorage: { getItem: () => stored },
    navigator: { languages: [primary], language: primary },
    location: { href, replace: (target) => redirects.push(target) },
  };
  vm.runInNewContext(controllerSource, {
    document: { documentElement: { lang } },
    globalThis: {},
    URL,
    window,
  });
  return redirects;
};

test("language normalization recognizes Chinese variants and defaults other languages to English", () => {
  assert.equal(normalizeLanguage("zh-CN"), "zh");
  assert.equal(normalizeLanguage("zh-Hant"), "zh");
  assert.equal(normalizeLanguage("en-US"), "en");
  assert.equal(normalizeLanguage("ja-JP"), "en");
  assert.equal(normalizeLanguage(""), null);
});

test("an explicit saved choice overrides the browser primary language", () => {
  assert.equal(resolvePreferredLanguage({ stored: "en", primary: "zh-CN" }), "en");
  assert.equal(resolvePreferredLanguage({ stored: "zh", primary: "en-US" }), "zh");
  assert.equal(resolvePreferredLanguage({ stored: null, primary: "zh-TW" }), "zh");
  assert.equal(resolvePreferredLanguage({ stored: "invalid", primary: "fr-FR" }), "en");
});

test("Chinese redirect preserves search and hash for HTTP and local-file previews", () => {
  assert.equal(
    buildChineseUrl("https://video.zzh.app/?source=share#install"),
    "https://video.zzh.app/zh/?source=share#install",
  );
  assert.equal(
    buildChineseUrl("file:///tmp/agentic-video-foundry/website/index.html#film"),
    "file:///tmp/agentic-video-foundry/website/zh/index.html#film",
  );
});

test("the early browser controller redirects only the default English entry", () => {
  assert.deepEqual(
    runBrowserController({
      primary: "zh-CN",
      href: "https://video.zzh.app/?source=share#install",
    }),
    ["https://video.zzh.app/zh/?source=share#install"],
  );
  assert.deepEqual(
    runBrowserController({
      stored: "en",
      primary: "zh-CN",
      href: "https://video.zzh.app/",
    }),
    [],
  );
  assert.deepEqual(
    runBrowserController({
      lang: "zh-CN",
      primary: "en-US",
      href: "https://video.zzh.app/zh/",
    }),
    [],
  );
});
