# Personal Portfolio - Assignment 4

Final, polished personal portfolio: API-driven widgets, saved state, responsive layout, and deployment-ready assets.

## Highlights
- GitHub REST API widget with timeout, error/empty states, and persisted username.
- Projects: live search, category + level filters, sorting, saved preferences, expandable details, and stats line.
- State: dark/light theme, saved greeting name, visit counter, session timer, simulated auth gate for the contact form, remembered GitHub handle.
- UX/accessibility: lazy images, reveal animations, inline validation, `aria-live` status text, keyboard-friendly controls.

## Run Locally
1) Clone or download this folder.  
2) Open `index.html` in a browser.  
Optional (recommended): run `python -m http.server 8000` and open http://localhost:8000 for consistent API/CORS behavior.

## Deploy
### Live Demo (Netlify)
- https://coptrzpersonal.netlify.app/
- Netlify settings: publish directory `.` (repo root), no build command needed.

### GitHub Pages
1) Push this folder to a public repo named `assignment-4`.  
2) In GitHub: Settings -> Pages -> Source: Deploy from a branch; Branch: `main`; Folder: `/` (root); Save.  
3) Visit `https://<your-username>.github.io/assignment-4/` once it builds (usually under 2 minutes).

## Project Structure
```
assignment-4/
|- README.md
|- index.html
|- css/
|  |- styles.css
|- js/
|  |- script.js
|- assets/
|  |- images/
|- docs/
|  |- ai-usage-report.md
|  |- technical-documentation.md
|- presentation/
|  |- slides.pdf
|  |- demo-video.pdf
|- .gitignore
```

## Feature Tour
- Hero: time-based greeting plus saved-name greeting, visit counter, session timer, and a quote widget with retry/error states.
- Projects: search + filters (category/level) + sorting with saved choices, expandable details, live stats, and lazy images.
- GitHub activity: recent repos for any username; shows stars, language, last updated, and empty/error states.
- Contact: validation for required fields, email pattern, minimum message length, plus a simulated sign-in gate.
- Guidance: status text and helper messages are exposed via `aria-live`, and errors are shown inline so users know what to do next.

## Performance Notes
- `loading="lazy"` on images, lean CSS/JS, and short fetch timeouts to avoid stuck loaders.
- DOM updates are grouped during filtering/sorting to keep things smooth.
- No external dependencies; only browser APIs are used.

## Notable Touches / Innovation
- Offline quote fallback: if the public API fails, a local quote is shown with clear status text.
- Persisted UX state (theme, filters, auth gate, GitHub handle, visits) so the page feels personalized after refresh.
- Repo widget handles timeouts/empty/error states with friendly messages instead of blank UI.

## Compatibility & Testing
- Built for modern evergreen browsers; uses standard DOM APIs only.
- Manually checked responsive layout via browser DevTools. Re-test on Safari/Firefox mobile/desktop as needed.

## AI Usage (summary)
- I used ChatGPT for ideas and wording; I rewrote/verified all code to fit my structure. Full log: `docs/ai-usage-report.md`.

## Quick Testing Checklist
- Toggle filters/sorting; refresh to confirm saved state.
- Enter your GitHub username; try an invalid one to see the error state.
- Toggle sign-in status in Contact; submit invalid and then valid content to see validation flow.
- Toggle dark/light theme and reload to ensure persistence.
- On mobile viewport, ensure layout remains usable (nav hides links by design).
