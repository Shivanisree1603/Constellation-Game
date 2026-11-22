import type { GameState } from "../types/index.js";

export function updateHUD(state: GameState): void {
  const score = document.getElementById("hud-score");
  const level = document.getElementById("hud-level");
  const timer = document.getElementById("hud-timer");
  const stars = document.getElementById("hud-stars");
  const conns = document.getElementById("hud-connections");
  const progress = document.getElementById("progress-fill");
  const name = document.getElementById("constellation-name");

  if (score) score.textContent = state.score.toLocaleString();
  if (level) level.textContent = String(state.level + 1);
  if (timer) {
    timer.textContent = String(state.timeLeft);
    timer.className = state.timeLeft <= 10
      ? "text-2xl font-orbitron font-bold text-red-400"
      : "text-2xl font-orbitron font-bold text-white";
  }

  const total = state.requiredConnections.length;
  const done = state.completedConnections.size;
  if (stars) stars.textContent = `${done}/${total}`;
  if (conns) conns.textContent = `${done}/${total}`;

  const pct = total > 0 ? (done / total) * 100 : 0;
  if (progress) progress.style.width = `${pct}%`;

  if (name && state.constellation) {
    name.textContent = state.constellation.name;
  }
}

export function showHUD(): void {
  document.getElementById("hud")?.classList.remove("hidden");
  document.getElementById("hint-box")?.classList.remove("hidden");
  document.getElementById("conn-box")?.classList.remove("hidden");
}

export function hideHUD(): void {
  document.getElementById("hud")?.classList.add("hidden");
  document.getElementById("hint-box")?.classList.add("hidden");
  document.getElementById("conn-box")?.classList.add("hidden");
}
