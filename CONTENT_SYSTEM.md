# Design My Thinking — Content System

This site treats Musings and Case Studies as lightweight, structured field notes rather than PDF documents.

The aim is to make future publishing simple: Daniel can narrate rough thoughts or describe an engagement in ChatGPT, and the content can be synthesised into the existing visual system without designing a new page each time.

## Musing field note

A new Musing should normally contain:

1. **Title** — short, opinionated, memorable.
2. **One-sentence premise** — what is the idea and why should someone care?
3. **Supporting hand-drawn graphic** — a simple visual metaphor or explanatory sketch; keep it rough, black-marker-like, with pink used sparingly as a highlighter.
4. **The thought** — 1–2 short paragraphs explaining the idea.
5. **Why it helps** — 2–4 concise bullets.
6. **Try it in the room** — practical application.
7. **Watch for** — limitation, misuse, counterpoint, or failure mode.
8. **Callout** — one memorable sentence in the handwritten treatment.
9. **Footer shorthand** — a short chain such as `Prompt → participation → better thinking`.

### Tone

- Human, practical and opinionated.
- Avoid “thought leadership” language.
- Do not inflate a hypothesis into a fact.
- Prefer a useful point of view over exhaustive explanation.
- Keep the reading experience light enough to consume inside a pop-up.

## Case-note field note

A new Case Study should normally contain:

1. **Case title**.
2. **Context/category** — e.g. `Trust + alignment`, `Strategy`, `Transformation`.
3. **Short case premise** — what was difficult or stuck?
4. **Supporting hand-drawn graphic** — show the problem or movement, not decorative workshop imagery.
5. **The situation** — enough context to understand the challenge.
6. **What was getting in the way** — 2–4 tensions, constraints or behaviours.
7. **What we designed for** — the intended conditions/outcomes of the intervention.
8. **The design sequence** — the major moves in the intervention, not a minute-by-minute agenda.
9. **What mattered most** — the principle or design choice that did the heavy lifting.
10. **What changed / what we learned** — only claim outcomes that are supported by the source material; otherwise describe learning or observed movement qualitatively.
11. **Callout** — one memorable line.
12. **Footer shorthand** — e.g. `Perspective → shared reality → reset`.

### Evidence rule

Never fabricate metrics, client claims, participant quotes or business outcomes. If a narrated case does not include evidence of an outcome, phrase the section as learning, intent, or observed movement rather than implying a measured result.

## Implementation pattern

- Listing cards live in `musings.html` or `case_studies.html`.
- Each clickable card points to a `<template>` using `data-modal-template="template-id"`.
- `script.js` clones that template into the shared `#serviceModalContent` host.
- Shared layout classes are defined in `style.css` under **Reusable field-note / case-note modal**.
- Existing source PDFs can remain in `/assets` as archive/source material, but they should not be the primary web reading experience.

## ChatGPT publishing workflow

For a future addition, Daniel can simply narrate the raw idea or case. The desired workflow is:

`Narration → clarify only if essential → synthesise → structure into the relevant schema → create a rough supporting visual → add listing card + template → review → publish.`

The source narration should remain the authority. Editing should sharpen and structure Daniel's thinking, not replace it with generic consultancy language.
