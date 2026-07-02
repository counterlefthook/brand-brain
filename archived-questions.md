# Archived questions

Questions removed from the Builder to shorten the questionnaire. Kept here so
they can be restored verbatim if wanted. Each entry records the internal `id`
(stable key), the on-screen position it held when removed, the file/section it
lived in, and its exact config object from `index.html`.

To restore one, paste its config object back into the matching section's
`questions:` array in the `FILES` config. Positional "Q#" numbers renumber
automatically; internal ids are unaffected.

Removed on 2026-07-01.

---

## Q44 - Supporting theme or secondary line
- On-screen position when removed: Q4
- File: Brand Profile > Brand Platform

```js
{ id:"Q44", n:"Q44", label:"Do you have a supporting theme or secondary line?", type:"repeat", max:1, single:true,
  fields:[{key:"theme",label:"Supporting theme"},{key:"use",label:"How to use it",ta:true},{key:"avoid",label:"How not to use it",ta:true}],
  help:"An emotive theme that supports the core brand line, with guidance on its use.",
  req:R.rec(),
  out:function(v){ var e=(v&&v[0])||{}; if(!has(e.theme)) return ""; var s="<supporting_theme>\n  <theme>"+t(e.theme)+"</theme>"; if(has(e.use)) s+="\n  <how_to_use>"+t(e.use)+"</how_to_use>"; if(has(e.avoid)) s+="\n  <how_not_to_use>"+t(e.avoid)+"</how_not_to_use>"; return s+"\n</supporting_theme>"; } }
```

---

## Q51 - Sum up your difference in a single line
- On-screen position when removed: Q8
- File: Brand Profile > Brand Difference

```js
{ id:"Q51", n:"Q51", label:"Sum up your difference in a single line.", type:"text", ph:"e.g. No one goes further to bring you closer.",
  help:"A short, memorable statement that captures what sets the brand apart.",
  req:R.rec(),
  out:function(v){ return has(v) ? "**Core difference statement:** "+t(v) : ""; } }
```

---

## Q49 - How does that personality show up in practice
- On-screen position when removed: Q11
- File: Brand Profile > Values and Personality

```js
{ id:"Q49", n:"Q49", label:"How does that personality show up in practice?", type:"textarea", size:"md",
  help:"How the persona translates into tone, behaviour, and content decisions.",
  req:R.rec(),
  out:function(v){ return has(v) ? "**Personality in practice:** "+t(v) : ""; } }
```

---

## Q11 - Gold-standard voice example
- On-screen position when removed: Q17
- File: Style Guide > Brand Voice

```js
{ id:"Q11", n:"Q11", label:"Give us an example of copy written in your brand voice that you consider a gold standard.", type:"textarea", size:"lg",
  help:"Paste copy you consider on-brand, from your website, a past campaign, or written now. The AI uses it as a target to match.",
  req:R.rec(),
  out:function(v){ return has(v) ? "<voice_example_good>\n"+t(v)+"\n</voice_example_good>" : ""; } }
```

---

## Q12 - Wrong-sounding voice example
- On-screen position when removed: Q18
- File: Style Guide > Brand Voice

```js
{ id:"Q12", n:"Q12", label:"Give us an example of copy that sounds wrong for your brand, and explain briefly why.", type:"repeat", max:1, single:true,
  fields:[{key:"example",label:"Example of wrong-sounding copy",ta:true},{key:"why",label:"Why it's wrong"}],
  help:"Provide a concrete off-brand example and the reason it is wrong. This defines what the AI should avoid.",
  req:R.rec(),
  out:function(v){ var e=(v&&v[0])||{}; return has(e.example) ? "<voice_example_bad>\n"+t(e.example)+"\n\nWhy this is wrong: "+t(e.why)+"\n</voice_example_bad>" : ""; } }
```

---

## Q23 - Language the audience uses
- On-screen position when removed: Q33
- File: Audience > Core Audience

```js
{ id:"Q23", n:"Q23", label:"What language does your audience use when they talk about this?", type:"textarea", size:"md",
  help:"The exact words they use in searches, reviews, and conversations, not internal terminology.",
  req:R.rec(),
  out:function(v){ return has(v) ? "**Language they use:** "+t(v) : ""; } }
```

---

## Q53 - Strategic GEO goal
- On-screen position when removed: Q36
- File: Keyword and Prompt Map > Prompt Strategy

```js
{ id:"Q53", n:"Q53", label:"What is your strategic GEO goal?", type:"textarea", size:"md",
  help:"What you want to be surfaced and recommended for when customers use AI search to research a decision like this.",
  req:R.rec(),
  out:function(v){ return has(v) ? "**Strategic GEO goal:** "+t(v) : ""; } }
```
