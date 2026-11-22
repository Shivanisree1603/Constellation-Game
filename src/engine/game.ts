import type { GameState } from "../types/index.ts";
import { CONSTELLATIONS } from "../data/constellations.ts";
import { DIFF } from "../data/difficulty.ts";
import { burst } from "./particles.ts";

// so stars dont appear too close to the edge
const PAD = 110;

export function placeStars(state: GameState, W: number, H: number): void {
  if (!state.c) return;
  state.stars = state.c.stars.map((s, i) => ({
    x: PAD + s.x * (W - PAD * 2),
    y: PAD + s.y * (H - PAD * 2),
    i,
  }));
}

export function loadLevel(state: GameState, W: number, H: number): void {
  const cfg = DIFF[state.diff];
  state.c = CONSTELLATIONS[state.level % CONSTELLATIONS.length];
  state.conns = new Set();
  state.done = new Set();
  state.sel = null;
  state.parts = [];
  state.flash = 0;
  state.timeLeft = cfg.time;
  state.need = state.c.conns.map(([a, b]) => `${Math.min(a, b)},${Math.max(a, b)}`);
  placeStars(state, W, H);
}

export function hitStar(state: GameState, mx: number, my: number): number {
  for (let i = 0; i < state.stars.length; i++) {
    const s = state.stars[i];
    const dx = s.x - mx;
    const dy = s.y - my;
    if (dx * dx + dy * dy < 32 * 32) return i;
  }
  return -1;
}

export function handleClick(
  state: GameState,
  hit: number,
  onComplete: () => void
): void {
  const cfg = DIFF[state.diff];

  if (state.sel === null) {
    state.sel = hit;
    burst(state, state.stars[hit].x, state.stars[hit].y, 10, "rgba(167,139,250,1)");
    return;
  }

  if (state.sel === hit) {
    state.sel = null;
    return;
  }

  const a = Math.min(state.sel, hit);
  const b = Math.max(state.sel, hit);
  const key = `${a},${b}`;
  state.sel = null;

  // if the line already exists, remove it
  if (state.conns.has(key)) {
    state.conns.delete(key);
    state.done.delete(key);
    return;
  }

  state.conns.add(key);

  const mx = (state.stars[a].x + state.stars[b].x) / 2;
  const my = (state.stars[a].y + state.stars[b].y) / 2;

  if (state.need.includes(key)) {
    state.done.add(key);
    state.score += cfg.cp;
    burst(state, mx, my, 22, "rgba(80,255,160,1)");
  } else {
    burst(state, mx, my, 10, "rgba(255,80,80,1)");
  }

  if (state.done.size === state.need.length) onComplete();
}

export function finishLevel(state: GameState): void {
  const cfg = DIFF[state.diff];
  state.score += state.timeLeft * cfg.tb + cfg.cb;
  state.flash = 60;
  if (state.timer) {
    clearInterval(state.timer);
    state.timer = null;
  }
}
