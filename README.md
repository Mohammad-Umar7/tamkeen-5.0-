# Curriculum Bridge

> AI proposes, professors approve, students build.

Hackathon MVP for the UAE Youth Hackathon (AI for Education & Skills track), built to the
approved design mockups.

## Screens

- **Student Dashboard** (`/`) — "Hello, Fatima": Skill Gap Map radar (Academic vs Industry),
  Your Top Gaps, Market Fit / Skill Rank stats, and Assigned Projects.
- **Student Workspace** (`/workspace`) — Real-time Weather API project: overall progress ring,
  current task with example snippet, upcoming API Wizard Badge, project community, and the
  docked **AI Tutor** chat (Show Documentation / Debug Code quick actions).
- **Approval Queue** (`/queue`) — Pending Recommendations with expandable Rationale Cards
  (market-demand evidence + Curriculum Synergy Score donut) and Approve / Edit /
  Reject-with-Feedback actions.
- **Curriculum Health Report** (`/health`) — 72% Health Index, Skill Alignment Trend,
  Outdated Topics, Critical Missing Skills, and the Strategic Implementation Plan.
- **Reports** (`/reports`) — institutional exports.

Use the floating **Professor / Student** toggle (bottom-right) to switch roles. Open a
project's play button on the dashboard to enter the workspace.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Stack

Vite · React 18 · Tailwind CSS v4 · React Router · Lucide icons. All charts are hand-rolled
SVG; demo content lives in `src/data/seed.js`; the AI tutor is simulated client-side so the
demo needs no backend or API keys.
