const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const isChinese = document.documentElement.lang.startsWith("zh");
const copyText = isChinese
  ? { copied: "安装命令已复制。", fallback: "命令已选中，请手动复制。", duration: "完整成片" }
  : { copied: "Install command copied.", fallback: "Command selected for manual copying.", duration: "Full film" };

const header = $("[data-header]");
const nav = $("[data-nav]");
const navToggle = $("[data-nav-toggle]");
const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 12);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

navToggle?.addEventListener("click", () => {
  const open = navToggle.getAttribute("aria-expanded") !== "true";
  navToggle.setAttribute("aria-expanded", String(open));
  nav?.classList.toggle("is-open", open);
});
$$('[data-nav] a').forEach((link) => link.addEventListener("click", () => {
  navToggle?.setAttribute("aria-expanded", "false");
  nav?.classList.remove("is-open");
}));

const copyButton = $("[data-copy-button]");
const command = $("[data-install-command]");
const copyStatus = $("#copy-status");
copyButton?.addEventListener("click", async () => {
  const value = command?.textContent?.trim();
  if (!value) return;
  try {
    await navigator.clipboard.writeText(value);
    copyStatus.textContent = copyText.copied;
  } catch {
    const range = document.createRange();
    range.selectNodeContents(command);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
    copyStatus.textContent = copyText.fallback;
  }
});

const evidenceVideo = $("[data-evidence-video]");
const durationLabel = $("[data-video-duration]");
const errorMessage = $("[data-video-error]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const durationText = (seconds) => `${copyText.duration} · ${Math.floor(seconds / 60)}:${Math.round(seconds % 60).toString().padStart(2, "0")}`;

if (evidenceVideo) {
  evidenceVideo.addEventListener("loadedmetadata", () => {
    if (durationLabel && Number.isFinite(evidenceVideo.duration)) durationLabel.textContent = durationText(evidenceVideo.duration);
  });
  evidenceVideo.addEventListener("error", () => { if (errorMessage) errorMessage.hidden = false; });
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.55 && !reduceMotion.matches && !document.hidden) evidenceVideo.play().catch(() => {});
      else if (entry.intersectionRatio < 0.2 || document.hidden) evidenceVideo.pause();
    }, { threshold: [0, 0.2, 0.55] });
    observer.observe(evidenceVideo);
  }
  document.addEventListener("visibilitychange", () => { if (document.hidden) evidenceVideo.pause(); });
}

const presetSection = $("[data-preset-active]");
const tabs = $$(".preset-tab");
const panels = $$("[data-preset-panel]");
const activatePreset = (id, focus = false) => {
  presetSection?.setAttribute("data-preset-active", id);
  tabs.forEach((tab) => {
    const active = tab.dataset.preset === id;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && focus) tab.focus();
  });
  panels.forEach((panel) => {
    const active = panel.dataset.presetPanel === id;
    panel.classList.toggle("is-active", active);
    panel.hidden = !active;
  });
};
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activatePreset(tab.dataset.preset));
  tab.addEventListener("keydown", (event) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    activatePreset(tabs[next].dataset.preset, true);
  });
});

$$('.language-link').forEach((link) => link.addEventListener("click", () => {
  try { localStorage.setItem("preferred-language", link.hreflang.startsWith("zh") ? "zh" : "en"); } catch {}
}));
