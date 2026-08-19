const copyButton = document.querySelector("[data-copy-button]");
const commandElement = document.querySelector("[data-install-command]");
const copyStatus = document.querySelector("#copy-status");
const header = document.querySelector("[data-header]");
const evidenceVideo = document.querySelector("[data-evidence-video]");
const videoToggle = document.querySelector("[data-video-toggle]");
const videoMute = document.querySelector("[data-video-mute]");
const videoState = document.querySelector("[data-video-state]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const isChinese = document.documentElement.lang.startsWith("zh");
const messages = isChinese
  ? {
      copied: "安装命令已复制。直接粘贴到终端即可。",
      selected: "浏览器未允许自动复制，命令已选中，请手动复制。",
      play: "播放",
      pause: "暂停",
      soundOn: "开启声音",
      mute: "静音",
      playLabel: "播放视频",
      pauseLabel: "暂停视频",
      soundOnLabel: "开启视频声音",
      muteLabel: "将视频静音",
      ended: "播放完成",
      paused: "已暂停",
      playingMuted: "● 正在静音播放",
      playing: "● 正在播放",
      clickPlay: "点击播放",
    }
  : {
      copied: "Install command copied. Paste it into your terminal.",
      selected: "Clipboard access was blocked. The command is selected for manual copying.",
      play: "Play",
      pause: "Pause",
      soundOn: "Sound on",
      mute: "Mute",
      playLabel: "Play video",
      pauseLabel: "Pause video",
      soundOnLabel: "Turn video sound on",
      muteLabel: "Mute video",
      ended: "Playback complete",
      paused: "Paused",
      playingMuted: "● Playing muted",
      playing: "● Playing",
      clickPlay: "Click to play",
    };

const setCopyStatus = (message) => {
  if (copyStatus) copyStatus.textContent = message;
};

const selectCommandText = () => {
  if (!commandElement) return;
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(commandElement);
  selection?.removeAllRanges();
  selection?.addRange(range);
};

copyButton?.addEventListener("click", async () => {
  const command = commandElement?.textContent?.trim();
  if (!command) return;

  try {
    await navigator.clipboard.writeText(command);
    setCopyStatus(messages.copied);
  } catch {
    selectCommandText();
    setCopyStatus(messages.selected);
  }
});

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 16);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const updateVideoUi = () => {
  if (!evidenceVideo) return;
  if (videoToggle) {
    videoToggle.textContent = evidenceVideo.paused ? messages.play : messages.pause;
    videoToggle.setAttribute("aria-label", evidenceVideo.paused ? messages.playLabel : messages.pauseLabel);
  }
  if (videoMute) {
    videoMute.textContent = evidenceVideo.muted ? messages.soundOn : messages.mute;
    videoMute.setAttribute("aria-label", evidenceVideo.muted ? messages.soundOnLabel : messages.muteLabel);
  }
  if (videoState) {
    videoState.textContent = evidenceVideo.ended
      ? messages.ended
      : evidenceVideo.paused
        ? messages.paused
        : evidenceVideo.muted
          ? messages.playingMuted
          : messages.playing;
  }
};

const playEvidenceVideo = async () => {
  if (!evidenceVideo) return;
  if (evidenceVideo.ended) evidenceVideo.currentTime = 0;
  try {
    await evidenceVideo.play();
  } catch {
    if (videoState) videoState.textContent = messages.clickPlay;
  }
};

if (evidenceVideo) {
  evidenceVideo.muted = true;
  updateVideoUi();

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45 && !reduceMotion.matches && !document.hidden) {
          playEvidenceVideo();
        } else if (!entry.isIntersecting || entry.intersectionRatio < 0.2 || document.hidden) {
          evidenceVideo.pause();
        }
      },
      { threshold: [0, 0.2, 0.45, 0.75] },
    );

    observer.observe(evidenceVideo);
  } else if (videoState) {
    videoState.textContent = messages.clickPlay;
  }
  ["play", "pause", "ended", "volumechange"].forEach((eventName) => {
    evidenceVideo.addEventListener(eventName, updateVideoUi);
  });

  videoToggle?.addEventListener("click", () => {
    if (evidenceVideo.paused) playEvidenceVideo();
    else evidenceVideo.pause();
  });

  videoMute?.addEventListener("click", () => {
    evidenceVideo.muted = !evidenceVideo.muted;
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) evidenceVideo.pause();
  });
}
