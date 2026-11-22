// Game data types

export interface StarData {
  x: number; // 0-1 relative position
  y: number;
}

export interface ConstellationDef {
  name: string;
  myth: string;
  stars: StarData[];
  conns: [number, number][];
}

export interface PlacedStar {
  x: number; // actual canvas px
  y: number;
  i: number;
}

export interface BgStar {
  x: number;
  y: number;
  r: number;
  ph: number; // phase offset for twinkle
  sp: number; // speed
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // 0 to 1
  dec: number;  // decay rate
  r: number;
  col: string;
}

export type Difficulty = "easy" | "normal" | "hard";
export type Screen = "start" | "play" | "lc" | "over" | "win";

export interface DiffConfig {
  time: number;
  tb: number;  // time bonus per second left
  cp: number;  // connection points
  cb: number;  // completion bonus
}

export interface GameState {
  screen: Screen;
  diff: Difficulty;
  score: number;
  level: number;
  timeLeft: number;
  timer: ReturnType<typeof setInterval> | null;
  c: ConstellationDef | null;
  stars: PlacedStar[];
  conns: Set<string>;
  done: Set<string>;
  need: string[];
  sel: number | null;
  parts: Particle[];
  bg: BgStar[];
  flash: number;
  mouse: { x: number; y: number } | null;
}
