import assert from "node:assert/strict";
import { test } from "node:test";
import { nextFrameIndex, shouldAnimate } from "../mascot.mjs";

test("mascot frames loop through a three-frame stop-motion cycle", () => {
  assert.equal(nextFrameIndex(0), 1);
  assert.equal(nextFrameIndex(1), 2);
  assert.equal(nextFrameIndex(2), 0);
});

test("mascot pauses offscreen, in hidden tabs, and for reduced motion", () => {
  assert.equal(shouldAnimate({ visible: true, hidden: false, reducedMotion: false }), true);
  assert.equal(shouldAnimate({ visible: false, hidden: false, reducedMotion: false }), false);
  assert.equal(shouldAnimate({ visible: true, hidden: true, reducedMotion: false }), false);
  assert.equal(shouldAnimate({ visible: true, hidden: false, reducedMotion: true }), false);
});
