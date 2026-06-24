# Build: Brand Brain Builder — standalone offline HTML app

Read this file first, then the two reference files it points to, then confirm your
build plan before writing any code.

## What I want
Build a single, self-contained **standalone `.html` file** (vanilla JS, no build step) that
walks a user through a brand questionnaire and exports a "Brand Brain": five markdown files
with semantic XML tags for LLM readability.

## Reference files in this repo
- **`docs/brandbrainquestions.md`** — the master spec and SOURCE OF TRUTH. Defines all 37
  questions across 5 files: UI type, field labels, helper text, required rules, exact output
  format. Follow it exactly. Where the V1 code and the spec disagree, the spec wins.
- **`docs/design/brand-brain-explainer.html`** — the visual style. Apply its colors,
  typography, spacing, and components to the app's UI.
  (Source: https://claude.ai/design/p/741603dd-d7ac-44b5-bfdc-0e7b4b638d00 )

## Existing V1 code (also in this repo)
- The repo contains a prior V1: a Google AI Studio **React + Vite + Tailwind** app
  (entry `src/main.tsx`) that used the **Gemini API** server-side for AI-assist, plus JSZip.
- **Read the V1 `src/` for reusable logic** — question list, field labels, markdown/XML
  generation, JSZip download, clipboard handling.
- **But do NOT keep the V1 architecture.** Rebuild as ONE standalone offline HTML file.
  Treat V1 as reference, not foundation.

## Locked decisions (already settled — don't re-ask)
- **Stack:** ONE standalone offline `.html` file at repo root (e.g. `brand-brain.html`).
  Open-and-go in any browser. No server, no framework, no build step.
- **Pure offline:** NO AI / API calls. Drop ALL of V1's Gemini AI-assist. Just
  questionnaire → XML/markdown → download.
- **Downloads:** Inline **JSZip** (paste the lib into the HTML — zero external requests).
  Download each `.md` individually AND a "Download all" zip.
- **Resumable:** Persist all answers to `localStorage`.
- **File naming:** `[brand-name]-brand-profile.md`, `[brand-name]-style-guide.md`,
  `[brand-name]-audience.md`, `[brand-name]-keyword-map.md`, `[brand-name]-never-do.md`
  (lowercase, hyphenated, brand name from Q1).

## Key requirements (highlights — full detail in the spec)
- 5 files in order: Brand Profile → Style Guide → Audience → Keyword Map → **Never Do (last)**.
- Each file = markdown wrapped in the specified XML tags (e.g. `<brand_profile>` with nested
  section tags). Use the exact output format per question.
- **UI types:** text input; textarea (sm/md/lg); repeating block (sub-fields + "Add another");
  repeating input; two-column input (Always/Never); pre-populated editable table
  (tone-by-context); single select; toggle + conditional reveal.
- **Master Context Block:** live-updating 150–200 word preview from Q1, Q2, Q9, Q10, Q13, Q18,
  Q19, and first two Q32 rules. Show once those have entries, with a "Copy to clipboard" button
  and the note: "Paste this as your system prompt or first message in any AI tool for immediate
  branded context." Use the spec's template.
- **Q32 (messaging rules):** require a wrong-example AND a right-example before a rule saves.
- **Q37 (AI operating instructions):** show the prompt "What went wrong with the last piece of
  AI content you had to rewrite? Add a rule here."
- **Locked "Decision Logic (V2)" tab:** visible but greyed out/disabled, with the coming-soon
  copy from the spec.
- Per-file progress indicators (e.g. "3 of 5 files complete"); saveable in stages.

## Steps
1. Read `docs/brandbrainquestions.md` fully, then skim V1 `src/` for reusable logic.
2. Import the design via the Claude Design MCP (run `/design-login` if prompted) — or read
   `docs/design/brand-brain-explainer.html` — and extract visual tokens (palette, fonts,
   spacing, components).
3. Build `brand-brain.html` to spec, applying that design.
4. Verify it opens standalone in a browser: all question types render, XML/markdown output
   matches the spec, the Master Context Block updates live, downloads work (individual + zip),
   localStorage persistence works.
5. Commit and push.

## Git
- Develop on a new branch off `main` (e.g. `feature/standalone-html`). Leave V1 in place; add
  the new `brand-brain.html` alongside it. Commit clearly; push with `git push -u origin <branch>`.
  Do NOT open a PR unless I ask.