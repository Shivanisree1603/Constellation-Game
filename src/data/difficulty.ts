import type { Difficulty, DiffConfig } from "../types/index.ts";

// i tested these numbers a lot, hard mode is really fast

export const DIFF: Record<Difficulty, DiffConfig> = {
  easy:   { time: 90, tb: 10, cp: 15, cb: 300 },
  normal: { time: 60, tb: 8,  cp: 20, cb: 500 },
  hard:   { time: 45, tb: 5,  cp: 30, cb: 800 },
};
