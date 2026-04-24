# Pedigree 3 Demo

Pedigree is a clickable MVP demo for enterprise AI-agent governance.

It demonstrates how organizations can map AI agents to human owners, approval paths, risk findings, and HR lifecycle events in one workspace.

## What this repo contains

- **Landing site**: `index.html`
- **Interactive demo workspace**: `demo.html`
- **Frontend scripts**:
  - `js/app.jsx` (app shell and screen switching)
  - `js/components.jsx` (shared components, top bar, sidebar, CSV modal)
  - `js/screens.jsx` (org chart + drawers)
  - `js/screens2.jsx` (risk findings, HR simulation, approvals, audit packet, settings)
  - `js/screens3.jsx` (dashboard, integrations, walkthrough)
  - `js/demo-data.js` (demo dataset, import/reset helpers, derived risk/stats)
- **Styling**:
  - `css/tokens.css`
  - `css/demo.css`

## Key demo capabilities

- React Flow + Dagre org chart layout
- Human / agent / app-owner / orphan node visualization
- Risk dashboard and findings views
- HR offboarding simulation
- Approval queue interactions
- Audit packet preview
- CSV import (PapaParse) + localStorage persistence
- Reset to baseline demo dataset

## Running locally

This project is static (no build step required).

### Option A: Python

```bash
cd /workspace/Pedigree3
python3 -m http.server 4173
```

Open:

- `http://127.0.0.1:4173/index.html`
- `http://127.0.0.1:4173/demo.html`

### Option B: Any static web server

You can use any static file server as long as it serves this folder root.

## External runtime dependencies

Loaded from CDN in `demo.html`:

- React + ReactDOM
- Babel standalone (for browser JSX transform)
- React Flow (UMD)
- Dagre
- PapaParse

## CSV import schema

Minimum supported headers:

```csv
type,id,name,role,department,managerId,ownerId,platform,systemAccessed,riskLevel,approvalStatus,status
```

`type` must be either `human` or `agent`.

You can download an in-app sample CSV from the **Upload CSV** modal.

## Notes

- This is intentionally a **demo-first** application, not production backend software.
- State is kept client-side and persisted with `localStorage` for imported datasets.
