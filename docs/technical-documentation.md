# Technical Documentation - Assignment 4

## Overview
This is my Assignment 4 (final) portfolio. It carries forward the API data, interaction logic, saved state, and performance tweaks from Assignment 3, polished for deployment and presentation.

## File Map
```
index.html              Main layout and sections (About, Projects, GitHub API widget, Contact)
css/styles.css          Theming, layout, components, animations, and utilities
js/script.js            Interactivity, state management, API calls, validation, and UI logic
docs/ai-usage-report.md AI usage notes
docs/technical-documentation.md This file
```

## Key Functionality
### Theme & Personalization
- Dark/light mode saved in `localStorage`.
- Time-based greeting plus stored username; visit counter and session timer so the page feels stateful.

### Projects Module
- Filters by category and skill level, live search, and sorting (date asc/desc, title).
- Preferences saved as `projectFilter`, `projectLevel`, and `projectSort` in `localStorage`.
- Shows a stats line for what is currently visible; cards expand/collapse with `aria-expanded`.

### GitHub REST API Integration
- Fetches recent repos: `https://api.github.com/users/{user}/repos?per_page=5&sort=updated`.
- Handles loading, 6s timeout, empty results, and HTTP errors with friendly status text.
- Renders cards with repo name/link, stars, language, and last updated date; `githubUser` is persisted.

### Quote API
- Uses Quotable for random quotes with loading text, retry button, and error fallback.

### Contact & Auth Simulation
- Validation: required fields, email regex, minimum message length, inline errors, and animated status.
- Simulated auth toggle stored in `localStorage`; when signed out the form is disabled to show gated UI state.

## State Management
- Stored keys: `theme`, `username`, `visits`, `projectFilter`, `projectLevel`, `projectSort`, `auth`, `githubUser`.
- Session-only: `sessionStart` drives the timer.
- UI uses these values for theming, greeting, filters, sort, auth gating, and the GitHub username field.

## Performance Notes
- `loading="lazy"` on images; deduped CSS; limited DOM writes by batching filter/sort updates.
- Short fetch timeouts to avoid stuck loaders; no external libraries.
- Kept assets minimal (SVG placeholders and small PNGs); avoided unused files.

## Deployment Notes
- Static site hosted from repo root; compatible with GitHub Pages/Netlify (no build step, output dir `.`).
- Uses only HTTPS APIs (Quotable, GitHub), so it is safe behind Pages/Netlify defaults.
- Keep asset paths relative (`css/styles.css`, `js/script.js`, `assets/`).
- Live Netlify deployment: https://coptrzpersonal.netlify.app/

## Accessibility
- Semantic sections and headings.
- `aria-live` for status text; `aria-expanded` on toggles; focusable controls with clear hover/focus states.
- Input errors are shown inline; statuses announce changes for screen readers.

## Testing / Validation Tips
- Use DevTools network throttling/offline to see API fallbacks.
- Test GitHub widget with valid/invalid usernames to see empty/error states.
- Toggle filters/sorts and refresh to confirm saved preferences.
- Try contact form while signed out (blocked) vs. signed in (validates and succeeds).
- Check mobile viewport (<=640px) to confirm layout remains usable; header nav collapses by design.
- Run through Chrome/Edge/Firefox (desktop + mobile viewport emulation) for compatibility; add Safari/iOS verification before delivery if available.
## Reflection
- Through this assignment, I learned how to use APIs with JavaScript, manage browser state, and debug errors more effectively.
