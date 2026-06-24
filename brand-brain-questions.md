# Brand Brain — Question Set and Implementation Guide

## What This Document Is

This is the master question set for the Brand Brain builder app. It covers all five output files, defines how each question should be presented in the UI, and explains how answers map to the final markdown documents.

Use this as the specification when building or updating the app.

---

## How the App Works

The app asks a series of questions grouped by file. Each completed file becomes a markdown document with XML tags for LLM readability. The five files together form a brand's Brand Brain.

A **Master Context Block** is auto-generated from a subset of answers once the user completes the core questions. This short block (150-200 words) is designed to be pasted as a system prompt or loaded first in any AI tool for immediate use.

A **V2 Decision Logic tab** should exist in the UI but be locked/greyed out, labelled "Coming soon: VP-level strategic priorities and conflict resolution rules." This plants the flag without blocking launch.

---

## Output File Map

| File | Purpose | Primary owner |
|---|---|---|
| `brand-profile.md` | Who you are, what you sell, competitors, positioning, what you're not | Acquisition / Marketing Lead |
| `style-guide.md` | Voice, tone, writing principles, terminology, formatting rules | Creative Team |
| `audience.md` | Customer personas, motivations, objections, segments | Acquisition Team |
| `keyword-map.md` | Search terms, GEO topics, intent categories, competitor terms | SEO Team |
| `never-do.md` | Hard rules, prohibited copy, AI operating instructions | Marketing Leadership |

---

## XML Tagging Convention

Each file wraps its sections in semantic XML tags so LLMs can locate and apply specific context without reading the entire document.

Follow this pattern:

```
<brand_profile>
  <company_overview>...</company_overview>
  <products_and_services>...</products_and_services>
  <competitive_positioning>...</competitive_positioning>
  <competitors>...</competitors>
  <what_we_are_not>...</what_we_are_not>
  <proof_points>...</proof_points>
</brand_profile>
```

Full tag reference is listed under each file section below.

---

---

# FILE 1: Brand Profile

**Output file:** `brand-profile.md`
**XML wrapper:** `<brand_profile>`
**Purpose:** Defines who the brand is, what it sells, why customers choose it, and what it is not. This is the foundation all other files reference.

---

## Section: Company Overview

**XML tag:** `<company_overview>`

---

### Q1 — Brand name and website

**UI label:** What is your brand name and website?
**UI type:** Two separate text fields
**Field labels:** Brand name / Website URL
**Required:** Yes
**Helper text:** None needed. These seed every output file header and the Master Context Block.

**Output format:**
```
**Brand:** [answer]
**Website:** [answer]
```

---

### Q2 — Elevator pitch

**UI label:** Describe what you do in one or two sentences, as if explaining to someone at a dinner party who has never heard of you.
**UI type:** Short textarea (2-3 lines)
**Required:** Yes
**Helper text:** Avoid jargon. This becomes the opening line inside every AI interaction. If you have to think about it, that's normal — it's harder than it sounds.

**Output format:**
```
**Elevator pitch:** [answer]
```

---

### Q3 — Problem you solve

**UI label:** What specific problem do you solve for your customers?
**UI type:** Short textarea
**Required:** Yes
**Helper text:** Think about the frustration, gap, or desire your product removes. Not features — the underlying problem your customer has before they find you.

**Output format:**
```
**Problem solved:** [answer]
```

---

## Section: Products and Services

**XML tag:** `<products_and_services>`

---

### Q4 — Core products or services

**UI label:** Describe your core product or service in plain terms. If you have more than one, list the top three.
**UI type:** Repeating block (up to 5 entries)
**Field labels per entry:** Product or service name / One-sentence description / The single biggest benefit to the customer
**Required:** At least one entry
**Helper text:** Focus on what the customer gets, not how you deliver it.

**Output format:**
```
| Product/Service | Description | Key benefit |
|---|---|---|
| [name] | [description] | [benefit] |
```

---

## Section: Competitive Positioning

**XML tag:** `<competitive_positioning>`

---

### Q5 — Why customers choose you

**UI label:** Why do customers choose you over the alternatives?
**UI type:** Textarea (medium)
**Required:** Yes
**Helper text:** Be specific. "Better service" is not an answer. What do you do that customers genuinely cannot easily get elsewhere?

**Output format:**
```
**Why customers choose us:** [answer]
```

---

### Q6 — Proof points

**UI label:** What are your three to five strongest proof points?
**UI type:** Repeating block (3-5 entries)
**Field labels per entry:** Proof point / Source or context (optional)
**Required:** At least two entries
**Helper text:** These are facts that back up your positioning. Years in business, customer numbers, awards, verified statistics, notable clients. If you don't have evidence for a claim, don't include it here.

**Output format:**
```
**Proof points:**
- [proof point] — [source]
- [proof point] — [source]
```

---

## Section: Competitors

**XML tag:** `<competitors>`

---

### Q7 — Main competitors

**UI label:** Who are your two or three main competitors?
**UI type:** Repeating block (up to 5 entries)
**Field labels per entry:** Competitor name / Their main strength / Your advantage against them
**Required:** At least one entry
**Helper text:** Be honest about their strengths. The Brain is more useful when it understands the real competitive landscape, not a flattering version of it.

**Output format:**
```
| Competitor | Their strength | Our advantage |
|---|---|---|
| [name] | [strength] | [advantage] |
```

---

## Section: What We Are Not

**XML tag:** `<what_we_are_not>`

---

### Q8 — What we are not

**UI label:** Complete the sentence: "We are NOT..." Add up to five.
**UI type:** Repeating text input (up to 5)
**Field labels per entry:** We are not... / Why this matters to state (optional)
**Required:** At least two entries
**Helper text:** These are the misperceptions, the categories you don't want to be placed in, or the comparisons that frustrate you. E.g. "We are not a budget option." "We are not a traditional tour operator." "We are not a tech company that happens to do travel."

**Output format:**
```
**We are NOT:**
- [statement] — [reason if provided]
- [statement] — [reason if provided]
```

---

---

# FILE 2: Style Guide

**Output file:** `style-guide.md`
**XML wrapper:** `<style_guide>`
**Purpose:** Defines how the brand sounds, what it says, and what it never says. Used by anyone writing copy or prompting AI to write copy.

---

## Section: Brand Voice

**XML tag:** `<brand_voice>`

---

### Q9 — Voice in three to five words

**UI label:** Describe your brand voice in three to five words.
**UI type:** Short text input
**Required:** Yes
**Helper text:** Think of adjectives you'd use to describe a person with this voice. E.g. "Direct, warm, quietly confident." "Expert, grounded, never flashy."

**Output format:**
```
**Brand voice:** [answer]
```

---

### Q10 — Always and never sounds

**UI label:** What should your brand always sound like? And what should it never sound like?
**UI type:** Two-column repeating input
**Column labels:** Always sounds like / Never sounds like
**Required:** At least three entries in each column
**Helper text:** E.g. Always: specific and grounded. Never: salesy or breathless. Always: warm and inviting. Never: cold or corporate.

**Output format:**
```
**Always sounds:**
- [entry]

**Never sounds:**
- [entry]
```

---

### Q11 — Gold standard example

**UI label:** Give us an example of copy written in your brand voice that you consider a gold standard.
**UI type:** Large textarea
**Required:** Recommended, not mandatory
**Helper text:** This could be from your website, a past campaign, or something you write right now. It becomes the reference example inside the Brain — the AI will use it as a target to match.

**Output format:**
```xml
<voice_example_good>
[answer]
</voice_example_good>
```

---

### Q12 — Wrong voice example

**UI label:** Give us an example of copy that sounds wrong for your brand, and explain briefly why.
**UI type:** Textarea + short explanation field
**Field labels:** Example of wrong-sounding copy / Why it's wrong
**Required:** Recommended, not mandatory
**Helper text:** This is as useful as the good example. It teaches the AI what to avoid specifically. The more concrete, the better.

**Output format:**
```xml
<voice_example_bad>
[example]

Why this is wrong: [explanation]
</voice_example_bad>
```

---

## Section: Terminology

**XML tag:** `<terminology>`

---

### Q13 — Words and phrases we always use

**UI label:** List the specific words and phrases your brand always uses.
**UI type:** Repeating input (up to 20 entries)
**Field labels per entry:** Use this term / Instead of (optional)
**Required:** At least three entries
**Helper text:** Product names, category terms, preferred descriptions. E.g. "We always say expedition, not tour." "We say Expedition Specialist, not sales rep." Include the preferred term and, if useful, what it replaces.

**Output format:**
```
**Always use:**
| Use | Instead of |
|---|---|
| [term] | [avoided term or blank] |
```

---

### Q14 — Words and phrases we avoid

**UI label:** List words and phrases your brand actively avoids.
**UI type:** Repeating input (up to 20 entries)
**Field labels per entry:** Avoid this term / Reason (optional)
**Required:** At least three entries
**Helper text:** Overused industry words, competitor language, terms that feel off-brand or inaccurate. Add a reason for any that aren't obvious, so the AI understands the principle, not just the rule.

**Output format:**
```
**Never use:**
| Avoid | Reason |
|---|---|
| [term] | [reason or blank] |
```

---

## Section: Tone by Context

**XML tag:** `<tone_by_context>`

---

### Q15 — Tone shifts by situation

**UI label:** How does your tone shift depending on the situation? Fill in the ones that are relevant to your brand.
**UI type:** Pre-populated rows the user edits (show all, user fills in applicable ones, can skip rows)
**Rows presented:**

| Context | Desired tone | One example phrase |
|---|---|---|
| Website homepage | | |
| Product or trip page | | |
| Email to existing customers | | |
| Paid advertising | | |
| Social media | | |
| Customer support | | |
| Press or thought leadership | | |
| Internal communications | | |

**Required:** At least two rows completed
**Helper text:** Tone can shift while voice stays consistent. E.g. social media might be warmer and shorter than a product page, but both should still sound like the same brand.

**Output format:** Completed table rows only (skip blanks).

---

## Section: Formatting Rules

**XML tag:** `<formatting_rules>`

---

### Q16 — English variant

**UI label:** Do you use UK English or US English?
**UI type:** Single select (UK English / US English / Both, specify by market)
**Required:** Yes

**Output format:**
```
**English variant:** [answer]
```

---

### Q17 — Additional formatting rules

**UI label:** List any other formatting rules your AI outputs must follow consistently.
**UI type:** Repeating input (up to 10 entries)
**Field labels per entry:** Rule / Notes (optional)
**Required:** No
**Helper text:** Only add rules that genuinely matter to your brand. E.g. capitalisation preferences, how you write numbers, Oxford comma usage, headline casing conventions, how you handle brand name on first vs subsequent mentions.

**Output format:**
```
**Formatting rules:**
- [rule] — [notes if provided]
```

---

---

# FILE 3: Audience

**Output file:** `audience.md`
**XML wrapper:** `<audience>`
**Purpose:** Defines who the brand is trying to reach and what they actually need. Written as operating instructions for AI, not as a marketing persona card.

---

## Section: Core Audience

**XML tag:** `<core_audience>`

---

### Q18 — Primary customer description

**UI label:** Describe your primary customer in plain terms.
**UI type:** Textarea (medium)
**Required:** Yes
**Helper text:** Don't start with demographics. Start with who they are as a person: their mindset, their life stage, what they care about, how they think about this category. Demographics can follow. E.g. "Curious, well-traveled professionals in their 50s and 60s who value time and access over novelty."

**Output format:**
```
**Who they are:** [answer]
```

---

### Q19 — What they actually want

**UI label:** What does your primary customer actually want when they come to you?
**UI type:** Textarea (medium)
**Required:** Yes
**Helper text:** Not what you sell them — the outcome, feeling, or result they are looking for. What does success look like for them after working with you?

**Output format:**
```
**What they want:** [answer]
```

---

### Q20 — Decision motivators

**UI label:** What motivates them to make a decision?
**UI type:** Textarea (medium)
**Required:** Yes
**Helper text:** What tips them from considering to committing? A specific trigger event, social proof, a particular piece of information, a fear of missing out, a deadline? The more specific, the more useful this is.

**Output format:**
```
**What motivates decisions:** [answer]
```

---

### Q21 — Top objections

**UI label:** What are their top three objections or hesitations before buying?
**UI type:** Repeating input (3-5 entries)
**Field label:** Objection or hesitation
**Required:** At least two entries
**Helper text:** What makes them pause? Price, trust, complexity, time, not fully understanding the product? These need to be addressed directly in content. If your AI doesn't know what objections exist, it won't address them.

**Output format:**
```
**Key objections:**
- [objection]
```

---

### Q22 — Information sources

**UI label:** What does your customer read, watch, or listen to? Where do they go for information before making a decision like this?
**UI type:** Textarea (medium)
**Required:** Recommended
**Helper text:** This tells the AI how sophisticated and well-informed to assume the reader is. E.g. "They read the FT and Condé Nast Traveller, watch travel documentaries, and consult specialist travel advisors before booking." This changes the tone and assumed knowledge level in every output.

**Output format:**
```
**Information sources and sophistication:** [answer]
```

---

### Q23 — Customer's own language

**UI label:** What language does your customer use when they talk about this problem or this type of product?
**UI type:** Textarea (medium)
**Required:** Yes
**Helper text:** The exact words and phrases they use in searches, reviews, conversations — not the language you use internally. E.g. "They say private jet trip, not private jet expedition. They ask how many people go, not what is the group size." Bridging this gap is one of the highest-value things the Brain does.

**Output format:**
```
**Language they use:** [answer]
```

---

## Section: Audience Segments

**XML tag:** `<audience_segments>`

---

### Q24 — Distinct segments

**UI label:** Are there distinct customer segments that need different treatment from your content? If yes, describe up to three.
**UI type:** Repeating block (up to 3 entries)
**Field labels per entry:** Segment name / Who they are / What they specifically need from content
**Required:** No (skip if only one audience)
**Helper text:** E.g. first-time buyers vs returning customers, trade/B2B vs direct consumer, UK vs US audiences. Only add a segment if the content or tone would genuinely differ.

**Output format:**
```
**Audience segments:**

**[Segment name]**
Who they are: [description]
What they need from content: [description]
```

---

### Q25 — Who the product is NOT for

**UI label:** Who is your product not for?
**UI type:** Textarea (medium)
**Required:** Recommended
**Helper text:** This is as important as who it is for. Knowing who to filter out prevents wasted effort, keeps content sharply targeted, and helps the AI avoid writing for the wrong person. E.g. "Not for budget travellers, not for people who want fully independent itineraries, not for first-time international travellers."

**Output format:**
```
**Not for:** [answer]
```

---

---

# FILE 4: Keyword and Prompt Map

**Output file:** `keyword-map.md`
**XML wrapper:** `<keyword_and_prompt_map>`
**Purpose:** Defines the topics, questions, and search terms the brand needs to own. Goes beyond keywords to cover natural-language prompt intent, which is how AI-assisted search actually works.

---

## Section: Core Topics and Intent

**XML tag:** `<core_topics>`

---

### Q26 — Most important topics

**UI label:** What are the five to ten most important topics your content needs to cover?
**UI type:** Repeating input (5-10 entries)
**Field labels per entry:** Topic / Why it matters (optional)
**Required:** At least five entries
**Helper text:** Think about what someone would ask an AI assistant or search in Google when they are seriously considering your product. Focus on category terms, not brand terms. E.g. "luxury private jet expeditions," "all-inclusive expedition travel," "multi-destination private aviation."

**Output format:**
```
**Core topics:**
- [topic] — [reason if provided]
```

---

### Q27 — Questions customers ask before buying

**UI label:** What are the most common questions your customers ask before they buy?
**UI type:** Repeating input (up to 15 entries)
**Field label:** Question (write as a real question)
**Required:** At least five entries
**Helper text:** Think about support emails, sales call transcripts, FAQ pages, live chat logs. Write them as real questions, not topics. E.g. "What is included in the price?" not "pricing." These become the content the AI knows it must answer.

**Output format:**
```
**Pre-purchase questions:**
- [question]
```

---

### Q28 — Questions you wish they would ask

**UI label:** What questions do you wish customers would ask, because your answer would make you look great?
**UI type:** Repeating input (up to 10 entries)
**Field label:** Question
**Required:** At least two entries
**Helper text:** The comparison questions, the "why not just do it yourself" questions, the value-for-money questions. These are your best content opportunities. E.g. "How does a private jet expedition compare with planning the same trip independently?" These are often the questions that best differentiate you.

**Output format:**
```
**Opportunity questions:**
- [question]
```

---

### Q29 — Search and prompt terms to own

**UI label:** What specific search terms or question formats do you want to be found for?
**UI type:** Repeating input (up to 20 entries)
**Field labels per entry:** Term or question / Short or long-form (toggle)
**Required:** At least five entries
**Helper text:** Include both short keywords ("private jet expedition") and longer natural-language queries ("what is the difference between a private jet expedition and a commercial group tour"). Both matter for GEO visibility.

**Output format:**
```
**Target search terms:**

Short-form:
- [term]

Long-form queries:
- [query]
```

---

### Q30 — Topics and terms to avoid

**UI label:** Are there topics, terms, or associations you do not want to be found for or associated with?
**UI type:** Repeating input (up to 10 entries)
**Field labels per entry:** Topic or term / Reason
**Required:** Recommended
**Helper text:** Competitor terms you don't want to trigger, price brackets you don't occupy, categories that attract the wrong audience, topics that conflict with your positioning.

**Output format:**
```
**Do not associate with:**
- [topic/term] — [reason]
```

---

### Q31 — Geographic market differences

**UI label:** Do you have different keyword or topic priorities for different geographic markets?
**UI type:** Conditional — Yes/No toggle. If Yes, textarea expands.
**Required:** No
**Helper text:** E.g. UK audiences use different search language than US audiences. If your brand operates across markets, note the key differences here so the AI writes and optimises appropriately for each.

**Output format (if answered):**
```
**Geographic market differences:**
[answer]
```

---

---

# FILE 5: Never Do

**Output file:** `never-do.md`
**XML wrapper:** `<never_do>`
**Purpose:** The hard rules. If content breaks any of these, it gets rewritten before publishing. This is the most directly actionable file in the Brain for AI output quality.

---

**UI intro text to show at the top of this section:**

> This is the most important file in the Brain for controlling AI output. Vague rules produce vague compliance.
> For each rule, give it a name, describe what never to do, show a bad example, and show what good looks like instead.
> The more specific you are here, the more consistently every AI tool will follow it.

---

## Section: Messaging Rules

**XML tag:** `<messaging_rules>`

---

### Q32 — Messaging rules your brand never breaks

**UI label:** What are the messaging rules your brand never breaks?
**UI type:** Repeating block (up to 10 entries)
**Field labels per entry:**
- Rule name (short, e.g. "Never perform luxury")
- What to never do
- Example of the wrong version (required)
- Example of the right version (required)
**Required:** At least two complete entries
**Helper text:** The wrong and right examples are non-negotiable. A rule without an example teaches the AI almost nothing. A rule with a concrete before/after teaches it to recognise the pattern, not just remember the instruction.

**Output format per rule:**
```xml
<rule id="[rule_name]">
  <instruction>Never [what to never do].</instruction>
  <wrong>[wrong example]</wrong>
  <right>[right example]</right>
</rule>
```

---

## Section: Positioning Restrictions

**XML tag:** `<positioning_restrictions>`

---

### Q33 — How the brand should never be positioned

**UI label:** How should your brand never be positioned or described?
**UI type:** Repeating input (up to 8 entries)
**Field labels per entry:** Never position us as / Reason
**Required:** At least two entries
**Helper text:** The categories, comparisons, or framings that are simply wrong. E.g. "Never position us as a budget option." "Never describe us as a tour operator." "Never frame us as a technology company."

**Output format:**
```
**Never position as:**
- [statement] — [reason]
```

---

## Section: Claims Restrictions

**XML tag:** `<claims_restrictions>`

---

### Q34 — Claims the brand should never make

**UI label:** Are there claims your brand should never make, even if they seem positive?
**UI type:** Repeating input (up to 10 entries)
**Field labels per entry:** Never claim / Why
**Required:** At least two entries
**Helper text:** Unverified superlatives, access claims that haven't been confirmed, safety or medical claims that need sign-off, pricing you never state publicly, competitor comparisons you can't substantiate.

**Output format:**
```
**Never claim:**
- [claim] — [reason]
```

---

## Section: Content Restrictions

**XML tag:** `<content_restrictions>`

---

### Q35 — Content types the brand should never produce

**UI label:** Are there content types or formats your brand should never produce?
**UI type:** Repeating input (up to 8 entries)
**Field labels per entry:** Never create / Reason (optional)
**Required:** At least one entry
**Helper text:** E.g. "Never produce countdown urgency copy." "Never write simulated customer testimonials." "Never create content that implies competitor inferiority without evidence." "Never publish pricing without sign-off."

**Output format:**
```
**Never create:**
- [content type] — [reason if provided]
```

---

## Section: Audience Restrictions

**XML tag:** `<audience_restrictions>`

---

### Q36 — Audience targeting that is off-limits

**UI label:** Are there audience targeting approaches that are off-limits?
**UI type:** Textarea (medium)
**Required:** No
**Helper text:** Segments you've decided not to pursue, demographics that would be inappropriate for your brand, contexts or placements where you don't want to appear.

**Output format:**
```
**Audience restrictions:** [answer]
```

---

## Section: AI Operating Instructions

**XML tag:** `<ai_operating_instructions>`

---

### Q37 — AI-specific rules

**UI label:** What are the specific rules AI tools must follow when working for your brand?
**UI type:** Repeating input (up to 15 entries)
**Field labels per entry:** Always / Never (toggle) + instruction
**Required:** At least three entries
**Helper text:** These are instructions written directly for AI tools. Think about what has gone wrong with AI-generated content for your brand, or what you want to prevent. E.g. "Always ask for a destination name before writing trip copy." "Never invent product details — mark unknowns for review instead." "When uncertain between two tones, default to the more restrained option." "Always use the approved terminology list before writing."
**Additional UI note:** Below the input, show a prompt: *"What went wrong with the last piece of AI content you had to rewrite? Add a rule here."* This surfaces the most useful rules from lived experience, not anticipation.

**Output format:**
```
**AI must always:**
- [instruction]

**AI must never:**
- [instruction]
```

---

---

# Master Context Block

**Output:** Auto-generated summary, not a separate file. Displayed in the app after core questions are complete with a "Copy to clipboard" button.

**Generated from:** Q1 (brand name), Q2 (elevator pitch), Q9 (voice), Q18 (primary customer), Q19 (what they want), Q13 (key terminology), and the first two entries from Q32 (messaging rules).

**Template:**

```
You are working for [Brand name] ([Website]).

[Elevator pitch from Q2.]

Our primary customer: [answer from Q18]. They are looking for [answer from Q19].

Our brand voice is [answer from Q9]. Always [first Always entry from Q10]. Never [first Never entry from Q10].

Key terminology: [top 3-5 terms from Q13].

Critical rules: [first two rules from Q32, in plain language].

The full Brand Brain is loaded as supporting context. Refer to it for audience detail, competitive positioning, keyword priorities, and the complete list of restrictions.
```

---

---

# Implementation Notes for Claude Code

The following notes are written for the developer building or updating this app.

---

## Question types used

| Type | Description |
|---|---|
| Text input | Single line, short answer |
| Textarea | Multi-line, medium or large |
| Repeating block | Multiple entries with sub-fields. User clicks "Add another." |
| Repeating input | Multiple single-line entries. User clicks "Add another." |
| Two-column input | Side-by-side fields (e.g. Always / Never) |
| Pre-populated table | Rows shown by default, user fills applicable ones |
| Single select | Dropdown or radio (e.g. UK / US English) |
| Toggle + conditional | Yes/No that reveals additional fields if Yes |

---

## Critical UI decisions

**Q32 (messaging rules) is the most important question in the app.** It must force the user to provide a wrong example and a right example, not just a rule statement. If those fields are left blank, the rule output is significantly weaker. Consider making both example fields required before the entry can be saved.

**Q37 (AI operating instructions) has a post-hoc prompt.** Below the input fields, display: *"What went wrong with the last piece of AI content you had to rewrite? Add a rule here."* This is the most effective way to surface the most useful AI-specific rules.

**The Never Do file should be presented last**, after the other four files are complete. By that point the user has thought through their brand thoroughly and is better positioned to articulate restrictions.

**File completion should be saveable in stages.** Users should not need to complete all five files in one session. Show progress indicators per file (e.g. 3 of 5 files complete) and allow saving and returning.

**The Master Context Block** should appear as a persistent element once Q1, Q2, Q9, Q18, Q19, Q13, and Q32 have at least one entry. Show it as a preview that updates live as answers are added. Include a "Copy to clipboard" button and a note: *"Paste this as your system prompt or first message in any AI tool for immediate branded context."*

---

## Output file format

Each generated `.md` file should follow this structure:

```markdown
# [File title]

<[xml_wrapper_tag]>

## [Section name]

<[section_tag]>

[Compiled answers in the format specified per question]

</[section_tag]>

## [Next section]
...

</[xml_wrapper_tag]>
```

All five files should be downloadable individually and as a zip.

---

## V2 Decision Logic tab

Include a locked tab in the navigation labelled **"Decision Logic (V2)"**.

Show this message inside the tab:

> **Coming in V2: Strategic priorities and conflict resolution.**
>
> When your brand objectives conflict — premium positioning vs reach, distinctiveness vs search volume, expertise vs accessibility — what wins? The Decision Logic layer encodes those answers so every AI tool draws from the same strategic logic, not its own interpretation.
>
> This layer is owned by VP/Marketing Leadership and sits above the five information files as the governing priority framework.

---

## File naming convention

When generating the download:

```
[brand-name]-brand-profile.md
[brand-name]-style-guide.md
[brand-name]-audience.md
[brand-name]-keyword-map.md
[brand-name]-never-do.md
```

All lowercase, hyphenated, brand name pulled from Q1.

---

*End of document.*
