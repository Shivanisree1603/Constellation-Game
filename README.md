# 🌌 Constellation Game

A browser game where you connect stars to recreate ancient constellations from Greek mythology. I built this as a hobby project to practice TypeScript and learn how HTML canvas works.

---

## 👩‍💻 Why I Made This

II enjoy learning about stars and Greek mythology, so I thought it would be fun to build a small constellation game. Through this project, I wanted to learn more about canvas drawing, code modules, Tailwind CSS, and Vite.

It started as a simple experiment but gradually became a full game with levels, scoring, animations, and multiple screens.
---

## 🎮 How to Play

1. Click any star to select it —> it glows yellow
2. Click another star to draw a connection between them
3. Correct connections glow purple and give you points
4. Wrong connections flash red —> click them again to remove
5. Complete all required connections before the timer runs out
6. Leftover time gives you bonus points

---

## ✨ Features

- 8 real constellations with Greek mythology stories
- 3 difficulty modes — Easy (90s), Normal (60s), Hard (45s)
- Scoring system with time bonus and completion bonus
- Animated star field background with twinkling effect
- Particle bursts when you connect or disconnect stars
- Works on any screen size

---

## 🛠️ How I Built It

### Tools I Used

| Tool | What it does in this project |
|---|---|
| **TypeScript** | Writing the game logic with proper types |
| **Vite** | Dev server that compiles TypeScript automatically |
| **Tailwind CSS** | Styling all the UI screens and buttons |
| **HTML5 Canvas** | Drawing the stars, lines, and animations |
| **PostCSS** | Processes Tailwind CSS during the build |

### External Links Used in the Project

| Link | What it is |
|---|---|
| `https://fonts.googleapis.com` | Google Fonts CDN — loads Orbitron and Inter fonts |
| `https://fonts.gstatic.com` | Google Fonts static files CDN |

> **Note:** Tailwind CSS and fonts load from CDN only during development when there is no internet, the fonts will fall back to the system monospace font. In production build (`npm run build`) Tailwind CSS is compiled into a small static file so no CDN needed.

### Project Structure

```
src/
├── types/index.ts         → all TypeScript types and interfaces
├── data/
│   ├── constellations.ts  → star positions and connection data for all 8 constellations
│   └── difficulty.ts      → easy, normal, hard settings
├── engine/
│   ├── state.ts           → creates the initial game state object
│   ├── background.ts      → draws the twinkling star field background
│   ├── particles.ts       → particle burst effect when connecting stars
│   ├── renderer.ts        → main canvas draw loop, runs 60 times per second
│   └── game.ts            → level loading, click detection, scoring logic
├── ui/
│   ├── hud.ts             → updates score, timer, progress bar in the DOM
│   └── screens.ts         → shows and hides the overlay screens
├── style.css              → Tailwind setup + custom CSS for glass cards and buttons
└── main.ts                → entry point, connects everything together
```

### Why There is a style.css Even Though I Use Tailwind

Tailwind CSS needs an entry CSS file with `@tailwind base`, `@tailwind components`, and `@tailwind utilities` to work. Without these three lines PostCSS does not know to generate any Tailwind classes. I also put some custom styles in this file for things Tailwind does not support like the shimmer animation, the glass card background, and the gradient buttons.

---

## 🚀 How to Run It

You need [Node.js](https://nodejs.org) installed first.

```bash
# 1. clone the repo
git clone https://github.com/Shivanisree1603/Constellation-Game.git

# 2. go into the folder
cd Constellation-Game

# 3. install packages
npm install

# 4. start the dev server
npm run dev
```

Then open **http://localhost:5173** in your browser.

```bash
# to build for production
npm run build
```

---

## 🌟 The 8 Constellations

| Constellation | Mythology |
|---|---|
| Orion | The mighty hunter chasing the Pleiades |
| Ursa Major | Callisto transformed into a bear by Zeus |
| Cassiopeia | The vain queen spinning around the pole forever |
| Scorpius | The scorpion sent to slay Orion |
| Leo | The Nemean lion slain by Heracles |
| Cygnus | Zeus in swan form, the Northern Cross |
| Perseus | The hero who defeated Medusa |
| Aquila | The eagle of Zeus |

---

Made by **Shivanisree N** — built for people who want to learn constellations.🚀
