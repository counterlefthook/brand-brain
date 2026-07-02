# Brand Context Builder

A single, self-contained, offline web app that walks a brand team through a
questionnaire and exports a "Brand Brain": five Markdown files that give any AI
tool or agent persistent, consistent context about your brand.

- **Live:** https://brand-brain-gold.vercel.app/
- **The whole app is one file:** [`index.html`](index.html) - vanilla
  HTML/CSS/JS, no build step, no framework, no dependencies. It runs fully
  offline; the only network call is same-origin Vercel Web Analytics on the live
  deploy.

## What it does

- **Builder** - answer 38 grouped questions across five files (Brand Profile,
  Style Guide, Audience, Keyword and Prompt Map, Never Do). A live **Master
  Context Block** preview builds from the core answers for pasting straight into
  any AI tool.
- **Export** - download the five files as **Markdown** (default) or
  **XML-tagged** (for building AI agents), individually or as a `.zip`.
- **Save / load progress** - round-trip all answers as JSON.
- **Review template (.docx)** - hand a fillable Word document to someone who
  will not use the app, then import their answers back in.
- **Set it up** and **What is a Brand Brain?** guides explain how to store the
  files and point AI tools at them.

Everything (answers, format choice) persists in `localStorage`, so work is
resumable in the same browser.

## Naming

The **tool** is the "Brand Context Builder." The **artifact** it produces is
still called a "Brand Brain" in the app and its output. Internal storage keys
and the save-file format keep the `brand-brain` naming for backward
compatibility.

## Editing

The app is config-driven: a `FILES` array in the one `<script>` block defines
every file, section, and question. See [`handoff.md`](handoff.md) for the full
architecture, the question/output model, the `.docx` round-trip design, the
verify loop to run after edits, and the current list of next steps.

## Deploy

Static, no build. `vercel.json` sets `framework: null`; pushing to `main`
triggers a production deploy on Vercel automatically.
