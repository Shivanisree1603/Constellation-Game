import type { ConstellationDef } from "../types/index.ts";

// i used 0 to 1 values for star positions so it works on any screen size
// connections are just which stars should be joined together

export const CONSTELLATIONS: ConstellationDef[] = [
  {
    name: "Orion",
    myth: "The mighty hunter Orion, placed among the stars by Zeus, forever chases the Pleiades across the night sky.",
    stars: [
      { x: 0.50, y: 0.20 }, { x: 0.62, y: 0.20 }, { x: 0.50, y: 0.35 },
      { x: 0.56, y: 0.35 }, { x: 0.62, y: 0.35 }, { x: 0.46, y: 0.52 },
      { x: 0.66, y: 0.52 }, { x: 0.56, y: 0.14 },
    ],
    conns: [[0,2],[1,4],[2,3],[3,4],[0,1],[2,5],[4,6],[0,7],[1,7]],
  },
  {
    name: "Ursa Major",
    myth: "Zeus transformed Callisto into a bear and placed her in the heavens as Ursa Major, the Great Bear.",
    stars: [
      { x: 0.30, y: 0.35 }, { x: 0.38, y: 0.42 }, { x: 0.46, y: 0.38 },
      { x: 0.54, y: 0.30 }, { x: 0.60, y: 0.22 }, { x: 0.68, y: 0.18 },
      { x: 0.76, y: 0.14 },
    ],
    conns: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[0,3]],
  },
  {
    name: "Cassiopeia",
    myth: "Queen Cassiopeia boasted her daughter was more beautiful than the sea nymphs, earning eternal punishment — spinning endlessly around the pole.",
    stars: [
      { x: 0.30, y: 0.45 }, { x: 0.40, y: 0.30 }, { x: 0.50, y: 0.42 },
      { x: 0.60, y: 0.28 }, { x: 0.70, y: 0.42 },
    ],
    conns: [[0,1],[1,2],[2,3],[3,4]],
  },
  {
    name: "Scorpius",
    myth: "The scorpion sent by Artemis to slay Orion. The two are placed on opposite sides of the sky so they never meet.",
    stars: [
      { x: 0.50, y: 0.18 }, { x: 0.46, y: 0.26 }, { x: 0.44, y: 0.34 },
      { x: 0.46, y: 0.42 }, { x: 0.50, y: 0.48 }, { x: 0.55, y: 0.53 },
      { x: 0.58, y: 0.60 }, { x: 0.55, y: 0.68 }, { x: 0.50, y: 0.72 },
      { x: 0.56, y: 0.24 }, { x: 0.62, y: 0.20 },
    ],
    conns: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[0,9],[9,10]],
  },
  {
    name: "Leo",
    myth: "The Nemean lion slain by Heracles as his first labor. Zeus immortalized the beast in the heavens.",
    stars: [
      { x: 0.38, y: 0.30 }, { x: 0.44, y: 0.24 }, { x: 0.52, y: 0.20 },
      { x: 0.60, y: 0.26 }, { x: 0.65, y: 0.35 }, { x: 0.60, y: 0.44 },
      { x: 0.46, y: 0.46 }, { x: 0.38, y: 0.42 },
    ],
    conns: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],[3,6]],
  },
  {
    name: "Cygnus",
    myth: "The swan form of Zeus as he flew to meet Leda, later placed in the heavens as the Northern Cross.",
    stars: [
      { x: 0.50, y: 0.22 }, { x: 0.50, y: 0.35 }, { x: 0.50, y: 0.48 },
      { x: 0.50, y: 0.62 }, { x: 0.50, y: 0.72 }, { x: 0.34, y: 0.48 },
      { x: 0.66, y: 0.48 },
    ],
    conns: [[0,1],[1,2],[2,3],[3,4],[5,2],[2,6]],
  },
  {
    name: "Perseus",
    myth: "Perseus, the hero who slew Medusa. He holds her severed head — the blinking star Algol — as a trophy.",
    stars: [
      { x: 0.50, y: 0.22 }, { x: 0.44, y: 0.30 }, { x: 0.50, y: 0.38 },
      { x: 0.58, y: 0.44 }, { x: 0.52, y: 0.52 }, { x: 0.44, y: 0.56 },
      { x: 0.38, y: 0.48 }, { x: 0.62, y: 0.32 },
    ],
    conns: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[2,7]],
  },
  {
    name: "Aquila",
    myth: "The eagle of Zeus, tasked with carrying thunderbolts and abducting the beautiful shepherd Ganymede.",
    stars: [
      { x: 0.50, y: 0.35 }, { x: 0.44, y: 0.30 }, { x: 0.56, y: 0.30 },
      { x: 0.38, y: 0.42 }, { x: 0.62, y: 0.42 }, { x: 0.50, y: 0.52 },
      { x: 0.50, y: 0.62 },
    ],
    conns: [[1,0],[0,2],[3,0],[0,4],[0,5],[5,6]],
  },
];
