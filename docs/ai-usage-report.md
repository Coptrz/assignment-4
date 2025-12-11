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
- **ChatGPT:** Brainstormed APIs/features (GitHub repos, quotes widget), then rewrote logic in vanilla JS. Tightened README/technical wording to match the build. Reviewed validation edge cases (email pattern, short messages) and simulated auth UX.

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
