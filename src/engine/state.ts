import type { GameState } from "../types/index.ts";

export function createState(): GameState {
  return {
    screen: "start",
    diff: "normal",
    score: 0,
    level: 0,
    timeLeft: 60,
    timer: null,
    c: null,
    stars: [],
    conns: new Set(),
    done: new Set(),
    need: [],
    sel: null,
    parts: [],
    bg: [],
    flash: 0,
    mouse: null,
  };
}
