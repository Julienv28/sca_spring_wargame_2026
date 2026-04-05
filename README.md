# OPERATION CUTLINE
## Crisis Response Escape Room — GitHub Pages

A fully static escape room web experience for two teams (Blue / Red) simulating a submarine cable infrastructure incident.

### Structure

```
/
├── index.html          ← Entry point / team selection
├── css/
│   └── global.css      ← All shared styles + design system
├── js/
│   └── global.js       ← State management, helpers, BroadcastChannel race sync
└── pages/
    ├── phase1.html     ← Phase 1: Problem Identification (3 enigmas, shared)
    ├── phase2.html     ← Phase 2: Locating the Problem (4 enigmas, shared)
    └── phase3.html     ← Phase 3: Final Response (PARALLEL RACE — Blue vs Red)
```

### Hosting on GitHub Pages

1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch** → `main` → `/ (root)`
4. Your site will be live at `https://<username>.github.io/<repo-name>/`

### How to Play

- Open the URL on a **shared screen** (projector / display)
- Players choose their team at the landing screen
- Phases 1 and 2 are **shared puzzles** (same for both teams)
- Phase 3 is a **real-time parallel race**:
  - Open **two browser tabs** — one per team
  - Both start Phase 3 at the same time
  - First team to complete their track wins via `BroadcastChannel` API
  - The win/loss outcome updates in real-time on both tabs

### Phase Summary

| Phase | Enigma | Answer |
|-------|--------|--------|
| 1-1 | Network route DOWN | `192.168.48.0/21` |
| 1-2 | OTDR fault distance | `578 km` (±2) |
| 1-3 | Intrusion detected? | No (MCQ option C) |
| 2-1 | Grid sector | `C2` |
| 2-2 | Suspect MMSI | `273410820` |
| 2-3 | Vessel name | `ORLAN VOSTOK` |
| 2-4 | Last port | `Kaliningrad, Russia` |
| 3-Blue | IP addresses | 192.168.48.1 / 192.168.48.1 / 192.168.48.0/21 / 192.168.48.5 |
| 3-Blue | Simon rounds | 4 rounds of pattern memory |
| 3-Red | Maze | Navigate 10×10 grid to bottom-right |
| 3-Red | Code fix | `/var/log/audit` / `s/273410820/000000000/g` / `7` |

### Tech Stack
- Pure HTML/CSS/JavaScript — **no framework, no build step, no backend**
- Real-time race sync: `BroadcastChannel` API (works across tabs on same browser)
- Fonts: Google Fonts (Barlow Condensed, Share Tech Mono)
- All puzzles fully client-side
