const FRAME_COUNT = 3;
const STEP_DELAYS = [170, 220, 150];
const LOOP_PAUSE = 1150;

export const nextFrameIndex = (current, count = FRAME_COUNT) => (current + 1) % count;

export const shouldAnimate = ({ visible, hidden, reducedMotion }) =>
  Boolean(visible && !hidden && !reducedMotion);

const setFrame = (stage, index) => {
  const image = stage.querySelector("img");
  const source = stage.querySelector("source");
  const action = stage.dataset.mascot;
  if (!image || !action) return;
  image.src = image.src.replace(new RegExp(`${action}-\\d\\.png$`), `${action}-${index + 1}.png`);
  if (source) source.srcset = source.srcset.replace(new RegExp(`${action}-\\d\\.webp$`), `${action}-${index + 1}.webp`);
};

if (typeof document !== "undefined" && typeof window !== "undefined") {
  const stages = [...document.querySelectorAll("[data-mascot]")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeStage = null;
  let timer = 0;
  let frame = 0;

  const stop = () => {
  window.clearTimeout(timer);
  timer = 0;
  frame = 0;
  if (activeStage) setFrame(activeStage, 0);
  activeStage = null;
  };

  const tick = () => {
  if (!activeStage || !shouldAnimate({ visible: true, hidden: document.hidden, reducedMotion: reducedMotion.matches })) {
    stop();
    return;
  }
  frame = nextFrameIndex(frame);
  setFrame(activeStage, frame);
  const pause = frame === 0 ? LOOP_PAUSE : STEP_DELAYS[frame];
  timer = window.setTimeout(tick, pause);
  };

  const start = (stage) => {
  if (activeStage === stage && timer) return;
  stop();
  activeStage = stage;
  stage.classList.add("is-animating");
  timer = window.setTimeout(tick, STEP_DELAYS[0]);
  };

  if (stages.length && "IntersectionObserver" in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver((entries) => {
    const candidate = entries
      .filter((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.45)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    stages.forEach((stage) => stage.classList.toggle("is-in-view", stage === candidate?.target));
    if (candidate) start(candidate.target);
    else stop();
    }, { threshold: [0, 0.45, 0.7] });
    stages.forEach((stage) => observer.observe(stage));
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
  });

  reducedMotion.addEventListener?.("change", (event) => {
    if (event.matches) stop();
  });
}
