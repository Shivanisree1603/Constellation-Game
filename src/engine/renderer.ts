import type { GameState } from "../types/index.ts";
import { drawBg } from "./background.ts";
import { tickParts, drawParts } from "./particles.ts";

function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  rad: number,
  core: string, glow: string,
  sel: boolean,
  t: number, idx: number
): void {
  const pulse = sel
    ? 1.3 + 0.2 * Math.sin(t * 0.004)
    : 1 + 0.08 * Math.sin(t * 0.002 + idx);
  const r = rad * pulse;

  // big soft glow around the star
  const gr = ctx.createRadialGradient(x, y, 0, x, y, r * 5);
  gr.addColorStop(0, glow.replace("1)", "0.45)"));
  gr.addColorStop(1, glow.replace("1)", "0)"));
  ctx.beginPath();
  ctx.arc(x, y, r * 5, 0, Math.PI * 2);
  ctx.fillStyle = gr;
  ctx.fill();

  // bright white center
  const cr = ctx.createRadialGradient(x, y, 0, x, y, r);
  cr.addColorStop(0, "rgba(255,255,255,1)");
  cr.addColorStop(0.35, core);
  cr.addColorStop(1, glow.replace("1)", "0.2)"));
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = cr;
  ctx.fill();

  // small cross lines that slowly rotate, makes it look like a real star
  if (sel || rad >= 7) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(t * 0.001);
    for (let i = 0; i < 4; i++) {
      ctx.rotate(Math.PI / 2);
      ctx.beginPath();
      ctx.moveTo(0, r * 1.3);
      ctx.lineTo(0, r * (sel ? 2.8 : 2.0));
      ctx.strokeStyle = core;
      ctx.lineWidth = sel ? 1.5 : 0.8;
      ctx.globalAlpha = sel ? 0.95 : 0.5;
      ctx.stroke();
    }
    ctx.restore();
    ctx.globalAlpha = 1;
  }
}

function drawLine(
  ctx: CanvasRenderingContext2D,
  x1: number, y1: number,
  x2: number, y2: number,
  done: boolean
): void {
  if (done) {
    // purple glow first then white line on top
    ctx.beginPath();
    ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
    ctx.strokeStyle = "rgba(139,92,246,.35)";
    ctx.lineWidth = 7;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
    ctx.strokeStyle = "rgba(199,210,254,.95)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
    ctx.strokeStyle = "rgba(99,102,241,.22)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 7]);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}

export function renderFrame(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  W: number, H: number,
  t: number
): void {
  ctx.clearRect(0, 0, W, H);
  drawBg(ctx, state, W, H, t);

  if (state.screen !== "play") {
    tickParts(state);
    drawParts(ctx, state);
    return;
  }

  // screen flash when you finish a level
  if (state.flash > 0) {
    ctx.fillStyle = `rgba(80,60,220,${(state.flash / 180).toFixed(3)})`;
    ctx.fillRect(0, 0, W, H);
    state.flash -= 2;
  }

  // draw the lines between stars
  state.conns.forEach(key => {
    const [a, b] = key.split(",").map(Number);
    const sa = state.stars[a], sb = state.stars[b];
    if (!sa || !sb) return;
    drawLine(ctx, sa.x, sa.y, sb.x, sb.y, state.done.has(key));
  });

  // dotted line following the mouse when a star is selected
  if (state.sel !== null && state.mouse) {
    const ss = state.stars[state.sel];
    if (ss) {
      ctx.beginPath();
      ctx.moveTo(ss.x, ss.y);
      ctx.lineTo(state.mouse.x, state.mouse.y);
      ctx.strokeStyle = "rgba(167,139,250,.55)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  // For drawing every star on screen
  for (let i = 0; i < state.stars.length; i++) {
    const s = state.stars[i];
    const isSel = state.sel === i;

    let isDone = false;
    state.done.forEach(k => {
      const pp = k.split(",");
      if (+pp[0] === i || +pp[1] === i) isDone = true;
    });

    let core: string, glow: string, rad: number;
    if (isSel) {
      core = "rgba(255,245,160,1)"; glow = "rgba(255,210,60,1)"; rad = 11;
    } else if (isDone) {
      core = "rgba(192,170,255,1)"; glow = "rgba(167,139,250,1)"; rad = 9;
    } else {
      core = "rgba(160,210,255,1)"; glow = "rgba(99,170,255,1)";  rad = 7;
    }

    drawStar(ctx, s.x, s.y, rad, core, glow, isSel, t, i);
  }

  tickParts(state);
  drawParts(ctx, state);
}
