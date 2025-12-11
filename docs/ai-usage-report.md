# AI Usage Report - Assignment 4

Document every AI interaction for this assignment: tool, prompt, output, edits, and what I learned. Add new entries below the template.

## Quick Template (copy per AI use)
- **Tool:**  
- **Prompt / request:**  
- **AI output (summary):**  
- **My edits:**  
- **Why I kept/changed it:**  
- **What I learned:**  

## Current Log
- **Tool:** ChatGPT  
  **Prompt / request:** Brainstorm API-driven widgets and stateful UX for the portfolio (GitHub repos, quotes, saved filters/theme/auth) and outline validation rules.  
  **AI output (summary):** Suggested GitHub REST widget with empty/error/timeout states, quote widget with retry, and persisted filters/sort/theme/auth; outlined validation rules for contact form.  
  **My edits:** Implemented all logic in vanilla JS, adjusted timeouts, simplified DOM updates, and tailored copy to assignment tone.  
  **Why I kept/changed it:** Kept the feature set to meet rubric (API, state, error handling); rewrote for my structure and to avoid extra dependencies.  
  **What I learned:** Structuring state with `localStorage`, grouping DOM updates for performance, and designing friendlier error/empty states.

- **Tool:** ChatGPT  
  **Prompt / request:** Add offline-friendly behavior to the quote widget and clean up deployment instructions with Netlify + GitHub Pages details.  
  **AI output (summary):** Recommended fallback messages/quotes and clearer deploy steps with live link placement.  
  **My edits:** Added local fallback quotes with status text, kept fetch timeout, rewrote README deploy section with Netlify URL and cleaned GitHub Pages steps.  
  **Why I kept/changed it:** Needed graceful degradation when the API is blocked and clearer docs for submission; simplified wording to stay concise.  
  **What I learned:** How to provide a non-network fallback without confusing status text; clearer deploy docs reduce reviewer friction.

- **Tool:** Gamma AI  
  **Prompt / request:** Long prompts back and forth, to generate the presentation slides.
  **AI output (summary):** Generated a long sildes with uneeded stuff, week coloring, and empty phases.
  **My edits:** edited almost everything except small details and pictures.
  **What I learned:** Only used Gamma to get use of time, pictures generation and explore AIs.
## Benefits Observed
- Faster planning for rubric-friendly features (API integration, complex logic, state management).
- Reminders on accessibility, error handling, and empty/timeout states.
- Saved time on documentation phrasing while keeping it accurate and student-focused.

## Challenges
- Keeping CSS/JS tidy and consistent across browsers.
- Managing multiple listeners while keeping state synchronized after UI updates.
- Handling GitHub API timeouts/rate limits without leaving blank UI.

## What I Learned
- Organizing/persisting state with `localStorage` (theme, filters, auth status, username, GitHub handle).
- Better error handling for public APIs (timeouts, empty data, retry messaging).
- Clearer validation with inline feedback and gated submission.
- Use AI as a learning aid: review suggestions critically and adapt them to the codebase.
