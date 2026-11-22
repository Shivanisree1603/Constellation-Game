import type { GameState } from "../types/index.js";
import { CONSTELLATIONS } from "../data/constellations.js";

type ScreenId =
  | "screen-start"
  | "screen-level-complete"
  | "screen-game-over"
  | "screen-win";

export function showScreen(id: ScreenId): void {
  const overlay = document.getElementById("overlay");
  if (!overlay) return;
  overlay.classList.remove("hidden");

  const all: ScreenId[] = [
    "screen-start",
    "screen-level-complete",
    "screen-game-over",
    "screen-win",
  ];
  all.forEach((s) => document.getElementById(s)?.classList.add("hidden"));
  document.getElementById(id)?.classList.remove("hidden");
}

export function hideOverlay(): void {
  document.getElementById("overlay")?.classList.add("hidden");
}

export function populateLevelComplete(state: GameState): void {
  const name = document.getElementById("lc-name");
  const pts = document.getElementById("lc-points");
  const time = document.getElementById("lc-time");
  const myth = document.getElementById("lc-myth");

  if (name && state.constellation) name.textContent = state.constellation.name;
  if (pts) pts.textContent = state.score.toLocaleString();
  if (time) time.textContent = `${state.timeLeft}s`;
  if (myth && state.constellation) myth.textContent = state.constellation.myth;
}

export function populateGameOver(state: GameState): void {
  const score = document.getElementById("go-score");
  const level = document.getElementById("go-level");
  const list = document.getElementById("go-list");

  if (score) score.textContent = state.score.toLocaleString();
  if (level) level.textContent = String(state.level + 1);

  const completed = CONSTELLATIONS.slice(0, state.level).map((c) => c.name);
  if (list) {
    list.textContent =
      completed.length > 0
        ? completed.join("  •  ")
        : "None — better luck next time!";
  }
}

export function populateWin(state: GameState): void {
  const score = document.getElementById("win-score");
  if (score) score.textContent = state.score.toLocaleString();
}
