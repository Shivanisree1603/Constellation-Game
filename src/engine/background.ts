import type { GameState } from "../types/index.ts";

export function initBg(state: GameState, W: number, H: number): void {
  const count = Math.floor((W * H) / 2600);
  state.bg = [];
  for (let i = 0; i < count; i++) {
    state.bg.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      ph: Math.random() * Math.PI * 2,
      sp: Math.random() * 0.005 + 0.002,
    });
  }
}

export function drawBg(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  W: number,
  H: number,
  t: number
): void {
  // dark space background, darker at the edges
  const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.9);
  bg.addColorStop(0, "#0c0a1e");
  bg.addColorStop(0.5, "#060d1f");
  bg.addColorStop(1, "#030712");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  for (const s of state.bg) {
    const a = 0.25 + 0.45 * Math.sin(t * s.sp + s.ph);
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,215,255,${a.toFixed(3)})`;
    ctx.fill();
  }
}
