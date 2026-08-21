(function (root) {
  "use strict";

  const STORAGE_KEY = "preferred-language";

  const normalizeLanguage = (value) => {
    if (typeof value !== "string" || !value.trim()) return null;
    return /^zh(?:-|$)/i.test(value.trim()) ? "zh" : "en";
  };

  const resolvePreferredLanguage = ({ stored, primary }) => {
    if (stored === "zh" || stored === "en") return stored;
    return normalizeLanguage(primary) || "en";
  };

  const buildChineseUrl = (href) => {
    const current = new URL(href);
    const target = new URL(current.protocol === "file:" ? "./zh/index.html" : "./zh/", current);
    target.search = current.search;
    target.hash = current.hash;
    return target.href;
  };

  if (typeof document !== "undefined" && typeof window !== "undefined") {
    let stored = null;
    try { stored = window.localStorage.getItem(STORAGE_KEY); } catch {}

    const primary = window.navigator.languages?.[0] || window.navigator.language || "en";
    const preferred = resolvePreferredLanguage({ stored, primary });
    const isDefaultEnglishPage = document.documentElement.lang.toLowerCase().startsWith("en");

    if (isDefaultEnglishPage && preferred === "zh") {
      window.location.replace(buildChineseUrl(window.location.href));
    }
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { buildChineseUrl, normalizeLanguage, resolvePreferredLanguage };
  } else {
    root.AgenticVideoLanguage = { buildChineseUrl, normalizeLanguage, resolvePreferredLanguage };
  }
}(typeof globalThis !== "undefined" ? globalThis : this));
