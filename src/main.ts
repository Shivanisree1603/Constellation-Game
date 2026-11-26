import "./style.css";
import { createState } from "./engine/state.ts";
import { initBg } from "./engine/background.ts";
import { renderFrame } from "./engine/renderer.ts";
import { loadLevel, placeStars, hitStar, handleClick, finishLevel } from "./engine/game.ts";
import { CONSTELLATIONS } from "./data/constellations.ts";

const canvas = document.getElementById("c") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
let W = 0, H = 0;

const G = createState();

function resize(): void {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  if (G.screen === "play") placeStars(G, W, H);
}
window.addEventListener("resize", resize);
resize();
initBg(G, W, H);

// helper so i dont have to type getElementById every time
function el(id: string): HTMLElement {
  return document.getElementById(id) as HTMLElement;
}

function refreshHUD(): void {
  const done = G.done.size;
  const total = G.need.length;

  el("hScore").textContent = G.score.toLocaleString();
  el("hLevel").textContent = String(G.level + 1);
  el("hName").textContent  = G.c?.name ?? "—";
  (el("hBar") as HTMLElement).style.width = total ? `${(done / total) * 100}%` : "0%";

  const te = el("hTime");
  te.textContent = String(G.timeLeft);
  te.style.color = G.timeLeft <= 10 ? "#f87171" : "white";

  el("hConn").textContent = `${done}/${total}`;
}

function showHUD(on: boolean): void {
  el("hud").style.display  = on ? "block" : "none";
  el("hint").style.display = on ? "block" : "none";
}

function showScreen(id: string): void {
  el("overlay").style.display = "flex";
  ["sStart", "sLC", "sGO", "sWin"].forEach(s => (el(s).style.display = "none"));
  el(id).style.display = "block";
}

function hideOverlay(): void {
  el("overlay").style.display = "none";
}

function startTimer(): void {
  if (G.timer) clearInterval(G.timer);
  G.timer = setInterval(() => {
    G.timeLeft--;
    refreshHUD();
    if (G.timeLeft <= 0) {
      clearInterval(G.timer!);
      G.timer = null;
      doGameOver();
    }
  }, 1000);
}

function beginPlay(): void {
  G.screen = "play";
  loadLevel(G, W, H);
  refreshHUD();
  showHUD(true);
  hideOverlay();
  startTimer();
  // reset hint button for new level
  el("hHints").textContent = String(G.hints);
  (el("btnHint") as HTMLButtonElement).disabled = false;
  el("btnHint").style.opacity = "1";
}

function onLevelComplete(): void {
  finishLevel(G);
  G.screen = "lc";
  el("lcName").textContent  = G.c?.name ?? "";
  el("lcScore").textContent = G.score.toLocaleString();
  el("lcTime").textContent  = `${G.timeLeft}s`;
  el("lcMyth").textContent  = G.c?.myth ?? "";
  setTimeout(() => showScreen("sLC"), 1200);
}

function doGameOver(): void {
  G.screen = "over";
  el("goScore").textContent = G.score.toLocaleString();
  el("goLevel").textContent = String(G.level + 1);
  const found = CONSTELLATIONS.slice(0, G.level).map(c => c.name);
  el("goList").textContent  = found.length ? found.join("  ·  ") : "None — better luck next time!";
  showScreen("sGO");
}

function doWin(): void {
  G.screen = "win";
  el("winScore").textContent = G.score.toLocaleString();
  showHUD(false);
  showScreen("sWin");
}

function useHint(): void {
  if (G.screen !== "play" || G.hints <= 0) return;
  // find connections not done yet
  const remaining = G.need.filter(k => !G.done.has(k));
  if (remaining.length === 0) return;
  // pick one at random
  const pick = remaining[Math.floor(Math.random() * remaining.length)];
  G.hintKey = pick;
  G.hintTimer = 180; // show for 3 seconds at 60fps
  G.hints--;
  G.timeLeft = Math.max(1, G.timeLeft - 5); // -5 seconds as penalty
  refreshHUD();
  el("hHints").textContent = String(G.hints);
  if (G.hints <= 0) {
    (el("btnHint") as HTMLButtonElement).disabled = true;
    el("btnHint").style.opacity = "0.4";
  }
}

// connect all the buttons to their functions
el("btnStart").addEventListener("click", () => { G.score = 0; G.level = 0; beginPlay(); });

el("btnNext").addEventListener("click", () => {
  G.level++;
  if (G.level >= CONSTELLATIONS.length) { doWin(); return; }
  beginPlay();
});

el("btnRestart").addEventListener("click", () => { G.score = 0; G.level = 0; beginPlay(); });

el("btnMenu").addEventListener("click", () => {
  if (G.timer) { clearInterval(G.timer); G.timer = null; }
  G.screen = "start";
  showHUD(false);
  showScreen("sStart");
});

el("btnHint").addEventListener("click", useHint);

el("btnWinRestart").addEventListener("click", () => {
  G.score = 0; G.level = 0;
  showHUD(true);
  beginPlay();
});

document.querySelectorAll<HTMLButtonElement>(".diff").forEach(btn => {
  btn.addEventListener("click", () => {
    G.diff = btn.dataset["d"] as typeof G.diff;
    document.querySelectorAll<HTMLButtonElement>(".diff").forEach(b => {
      b.className = b.dataset["d"] === G.diff ? "pbtn diff" : "sbtn diff";
    });
  });
});

canvas.addEventListener("click", (e: MouseEvent) => {
  if (G.screen !== "play") return;
  const r = canvas.getBoundingClientRect();
  const hit = hitStar(G, e.clientX - r.left, e.clientY - r.top);
  if (hit === -1) { G.sel = null; return; }
  handleClick(G, hit, onLevelComplete);
  refreshHUD();
});

canvas.addEventListener("mousemove", (e: MouseEvent) => {
  if (G.screen !== "play") return;
  const r = canvas.getBoundingClientRect();
  G.mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
  canvas.style.cursor = hitStar(G, G.mouse.x, G.mouse.y) !== -1 ? "pointer" : "crosshair";
});

canvas.addEventListener("mouseleave", () => { G.mouse = null; });

// keeps drawing the game 60 times per second
let tick = 0;
function loop(): void {
  requestAnimationFrame(loop);
  tick++;
  renderFrame(ctx, G, W, H, tick);
}
loop();
