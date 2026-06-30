# Brand Brain Builder, handoff

## Status

Live and deployed. The app is a single, self-contained, offline `index.html`
that walks a brand team through a questionnaire and exports a "Brand Brain":
five Markdown files, either plain Markdown (default) or wrapped in semantic XML
tags for LLM/agent readability.

- **Production:** https://brand-brain-gold.vercel.app/ (auto-deploys on every push to `main`)
- **Repo:** `counterlefthook/brand-brain`
- **Stack:** vanilla HTML/CSS/JS, no build step, no framework. The only network
  call is the Vercel Web Analytics script, which is same-origin, deferred, and
  loads only on the live deploy; the app is fully functional offline.

## Repo layout

| File | What it is |
|---|---|
| `index.html` | The entire app (config, engine, styles, embedded fonts). This is the deliverable. |
| `vercel.json` | Static no-build deploy config (`framework: null`, serves the repo root). |
| `brand-brain-questions.md` | The original 37-question spec. Historical reference; the app has since evolved past it. |
| `handoff.md` | This file. |
| `.gitignore` | Standard ignores. |

Note: the original Google AI Studio V1 React/Vite app was removed. The app is
now a single file.

## What the app does

Three top-level tabs in the header:

1. **Builder** (the core). Five files, each a section of grouped questions:
   - **Brand Profile** — Company Overview (name + website, brand description),
     Brand Platform (core brand line, supporting theme, brand purpose, brand
     promise), Brand Difference (+ one-line difference statement), Values and
     Personality (values, persona, personality in practice), Messaging Pillars,
     What We Are Not.
   - **Style Guide** — Brand Voice (voice in words, always/never sounds, tone
     attributes, gold-standard example, wrong example), Writing Principles
     (principles + how to write about key topics), Reasons to Believe,
     Terminology (always use / avoid), Visual Identity (typography, colour
     palette, imagery, logo usage).
   - **Audience** — Core Audience (overview, mindset, what they value most,
     emotional drivers, practical concerns, language they use, not for) and
     Audience Segments.
   - **Keyword and Prompt Map** — Prompt Strategy (strategic GEO goal, primary
     prompt categories pre-seeded with the 6 standard categories) and
     Exclusions and Markets (topics to avoid, geographic differences).
   - **Never Do** — messaging rules (each requires a wrong and a right
     example), positioning restrictions, claims restrictions, content
     restrictions, audience-targeting restrictions, AI operating instructions
     (pre-seeded with sensible default Always/Never rules).
   - A locked **"Decision Logic (V2)"** tab is shown but greyed out.
2. **Set it up** — post-export guide (create a shared folder, add the five
   files, share with the team) with an animated SVG storyboard and a copyable
   start prompt.
3. **What is a Brand Brain?** — a native explainer with five internal tabs
   (What it is, What's inside, Where it lives, How to use it, Why it matters).

Other behaviour:
- **Master Context Block:** a live 150-200 word preview built from the core
  answers, with copy-to-clipboard. Unlocks once the core questions are filled.
- **Persistence:** all answers save to `localStorage` (resumable).
- **Save / load progress:** sidebar buttons download the full answers as
  `[slug]-brand-brain.json` and load it back. Loading opens a chooser: replace
  all answers, fill only empty fields (deep merge that keeps existing answers
  and fills gaps - sub-fields, repeat rows element-wise, untouched questions
  wholesale), or cancel. Invalid/non-JSON files are rejected before the chooser
  opens. Offline and dependency-free.
- **Per-file owner labels** (Acquisition, Creative Team, etc.) shown in headers.
- **Export:** choose **Markdown only** (default, recommended for general brand
  context) or **XML-tagged** (best for building AI agents). The choice persists
  in `localStorage` and drives the preview, each `.md`, and the "Download all"
  `.zip` (a tiny native store-method zip writer, so there is no third-party
  dependency and no network request).

## How it is built (for future edits)

Everything lives in the one `<script>` block in `index.html`.

- **Config-driven.** A `FILES` array defines every file, section, and question.
  Each question declares: `id` (stable internal key), `type`, type-specific
  keys, a `req` rule, and an `out(value)` function that compiles the answer into
  spec-exact Markdown/XML.
- **Question types:** `text`, `dualtext`, `textarea` (sm/md/lg), `select`,
  `repeat` (repeating entries; supports `single`, `max`, per-field `toggle`,
  `ta` textarea fields, and `seed` to pre-populate rows), `twocol`,
  `tonetable`, `toggletext`.
- **Display numbers are positional.** The visible "Q#" labels are computed by
  document order at load, so inserting/removing questions renumbers
  automatically. Internal `id`s never change, which is why the Master Context
  Block and completion logic keep working. When the user refers to a question
  by number, it is the current on-screen positional number, not the internal id.
- **Master Context Block** depends on these internal ids: `Q1` (brand), `Q2`
  (description), `Q9` (voice), `Q10` (always/never), `Q13` (terminology), `Q18`
  (audience overview), `Q19` (what they value), `Q32` (messaging rules). Keep
  those ids stable.
- **Output has two formats, one source.** Each question's `out()` still emits
  the semantic-XML form (tabular/multi-field answers compile to nested tags such
  as `<colour>`, `<prompt_categories>`; simple text uses `**Label:** value`;
  raw text is kept unescaped for readability). A global `outputMode`
  (`"md"` default, or `"xml"`) selects the export. Markdown mode runs the
  compiled XML through `xmlBlockToMd()` - a *tolerant* tag scanner (not a strict
  XML parser, so unescaped `&`/`<` survive) that turns list blocks into bold-led
  bullets, single records into labelled fields, and text blocks into labelled
  prose; already-plain `out()` strings (those not starting with `<`) pass
  through untouched. This means new questions need no converter changes. There
  are no em-dashes anywhere in the app or its output (house style).
- **File completion** (`fileComplete`) requires both that all blocking `req`
  rules are met AND that the file compiles to real content (`fileHasOutput`).
  The second check matters for files with no required questions (the Keyword and
  Prompt Map): without it they read as complete while empty or seed-only.
- **Design** is the Travelopia Design System: Blue `#185274`, Coral `#D04A5B`,
  Teal `#179D98`, Playfair Display + Arial. Fonts are embedded as base64 so the
  file stays fully offline. All CSS is in the single `<style>` block.

### Editing workflow that has worked
Because the file is large and the config contains multi-line `out()` functions,
edits were made with small Node scripts that do asserted string/brace-matched
replacements, followed by `node --check` on the extracted script, a `jsdom`
render pass (no runtime errors, sections render), a `vm` pass to compile sample
output, and `parse5` to confirm the HTML is well-formed. Keep that verify loop.

## Deployment

Static, no build. `vercel.json` sets `framework: null` and no-op install/build
so Vercel serves `index.html` at the root. Pushing to `main` triggers a
production deploy automatically. Work happens on a feature branch and merges via
PR. (The Vercel project's stored framework preset is "Vite" from the original
import; `vercel.json` overrides it, but setting it to "Other" in the dashboard
would remove the mismatch.)

**Vercel Web Analytics** is enabled. Because this is a single static file (not a
framework app), it uses the plain-HTML method: a `window.va` stub plus
`<script defer src="/_vercel/insights/script.js">` in `<head>`. There is no
`@vercel/analytics` npm package or React component. Data shows in the project's
Analytics tab; content/ad blockers commonly block `/_vercel/insights`.

---

## Done since last handoff
- **Save / load progress (JSON round-trip).** Shipped - download/load a
  `[slug]-brand-brain.json` with a replace / fill-empty-only / cancel chooser.
- **Markdown-or-XML export** with a persisted format toggle (Markdown default).
- **Sidebar pill buttons** for Save / Load / Clear (Clear is a coral danger
  variant).
- **Vercel Web Analytics** enabled.
- **Fix:** files with no required questions (Keyword and Prompt Map) no longer
  report complete while empty or seed-only.

## Next steps

### 1. Connected storage (optional, later)
The single-browser limit is solved by the JSON round-trip above. Only if that is
not enough: sync progress to a shared drive or a small backend so it follows the
user across devices. Heavier; needs a backend, which breaks the current
zero-dependency/offline posture - weigh carefully.

### 2. Round-trip template (offline review by a non-user)
Let a user hand the questionnaire to someone who will not use the app, then pull
their answers back in automatically.
- **Download a fillable template** with every question inline, as a spreadsheet
  or Word document, structured so each answer maps to a known question id.
- **Upload the completed document** and have the app parse it and auto-fill the
  matching responses, then let the user review and export.
- Decisions to make: file format (a structured `.xlsx` with one row per
  question and a hidden id column is the most reliably parseable; `.docx` is
  friendlier to reviewers but harder to parse reliably), and a parsing approach
  that does not break the offline/no-dependency constraint (a spreadsheet via a
  small inlined XLSX reader is the most tractable).

### Also parked (from the Exodus template review)
- **Strategic Decisions log** in Never Do (decision, reason, date). This is also
  the content the locked "Decision Logic (V2)" tab is meant to hold.
- **Audience research insights** field (the evidence behind the personas).
- **Set it up enrichment:** specific deploy targets (ChatGPT Projects, Custom
  GPTs, Microsoft Copilot, Copilot Agents, Claude Projects, Gemini Gems), the
  "point your AI tools at the live folder rather than re-uploading copies"
  version-control tip, and a quarterly review reminder.
