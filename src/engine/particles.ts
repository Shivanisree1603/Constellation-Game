import type { GameState } from "../types/index.ts";

export function burst(
  state: GameState,
  x: number,
  y: number,
  n: number,
  col: string
): void {
  for (let i = 0; i < n; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3.5 + 0.8;
    state.parts.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      dec: Math.random() * 0.022 + 0.012,
      r: Math.random() * 3 + 1,
      col,
    });
  }
}

export function tickParts(state: GameState): void {
  state.parts = state.parts.filter(p => p.life > 0);
  for (const p of state.parts) {
    p.x += p.vx;
    p.y += p.vy;
    p.vx *= 0.97;
    p.vy *= 0.97;
    p.life -= p.dec;
  }
}

export function drawParts(ctx: CanvasRenderingContext2D, state: GameState): void {
  for (const p of state.parts) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, Math.max(0.1, p.r * p.life), 0, Math.PI * 2);
    // make particle slowly disappear as life goes down
    ctx.fillStyle = p.col.replace(/[\d.]+\)$/, `${p.life.toFixed(3)})`);
    ctx.fill();
  }
}
