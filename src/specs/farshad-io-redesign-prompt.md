# Claude Code Brief — Farshad.io Redesign, Three Concepts

Copy everything below the `---` into Claude Code as a single prompt. It assumes you are running inside a fresh repo or a working copy of the current `farshad.io` source. If you are starting fresh, tell Claude Code to scaffold a new Astro + MDX project at the start of execution.

---

# Mission

You are redesigning **farshad.io**, the personal site of **Farshad Nayeri** — a builder/innovator with an unusual four-careers-stacked résumé. Your job is to produce **three distinct, complete, runnable redesign concepts** that I can review side-by-side. They should be designed-with-confidence and typographically *a little bold* — more designed than the average personal site, but never show-offy. Editorial discipline beats flash.

Treat this as a senior creative director's brief. Make taste decisions. Where this brief is silent or ambiguous, make a strong choice and document it in `NOTES.md` for that concept.

# About Farshad (read this carefully — it drives every decision)

**One-line throughline:** *I take vague ideas — about products, organizations, even whole categories — and turn them into things that actually run.*

**The four careers, woven:**
1. **Programming-language and developer-tools researcher.** GTE Labs (Distributed Object Manager, ECOOP 1994). DEC SRC Modula-3 lineage. Verizon Labs.
2. **Founder.** Critical Mass, Inc. (Cambridge, 1995) — commercial Modula-3, the **Reactor / CM3-IDE** (a web-based IDE delivered as a custom HTTP server with hyperlinked, syntax-highlighted code views — in 1996), and the **Critical Mass JVM** written entirely in Modula-3, class-compatible with Sun's JavaVM. Hired Bill Kalsow from DEC SRC. Edited *Threads: A Modula-3 Systems Journal* (Issues 1–3, 1995–1997). Open-sourced the codebase in 2001. Then iGEN Corporation (1998–present, [igencorp.com](https://igencorp.com)). Then Pixxa LLC (the **Perspective** iPad app, used in keynotes at Apple, Samsung, IBM, Fidelity, BNY Mellon, and Microsoft).
3. **Data storyteller / "Data Cinematographer"** (his own coined phrase). Co-creator with Horace Dediu of the **Airshow** "Data-Cinematic Storytelling" world tour (Boston, Tokyo, Vancouver, London, San Francisco, Helsinki, Seattle, Melbourne, 2013–2016). Co-author on Asymco. Invited speaker at **HarvardXR 2025**.
4. **Christensen-trained strategist.** Worked directly with Clayton Christensen and Dave Sundahl. Connected to the Christensen Institute and the **Disruptive MBA / Product Science Lab** ([dx.mba](https://dx.mba)). Has done strategy work at EY, Fidelity, Baupost, CME.

**Lives in Boston. Email: farshad@igencorp.com. LinkedIn: linkedin.com/in/farshadnayeri.**

**The problem to solve:** He knows about a lot of things and feels he is "a lot more talented than people know." Visitors today cannot tell in 5 seconds what he is. The redesign must establish a single coherent identity *and* let a visitor self-select a lens (persona) without it ever feeling like a list of hats.

**The named personas (always five, in this order, Product Builder is the default):**
1. **Product Builder** *(default/hero)*
2. **Data Storyteller**
3. **Strategist / Advisor**
4. **Founder**
5. **Developer Tools / Language Designer**

# What you are building

**Three complete, runnable redesigns**, each as a separate sub-project under a top-level `concepts/` directory:

```
concepts/
  01-editorial-press/      # Concept A
  02-cinematic-lens/       # Concept B
  03-systems-monograph/    # Concept C
README.md                  # Index page that links all three with screenshots
```

Each concept must be:
- A standalone Astro + MDX project (use Astro 4+ with the `@astrojs/mdx` integration)
- Fully runnable with `npm install && npm run dev`
- Deployable to Vercel/Netlify with zero config
- Visually and typographically *distinct* from the other two — not three skins of the same template
- Built around the **same content** (so I can compare apples to apples)
- Accessible: WCAG AA contrast, keyboard navigation, semantic HTML, prefers-reduced-motion respected

# Shared content (build this once, reuse across all three)

Create a `shared/content/` directory at the repo root with a single source of truth:

```
shared/content/
  profile.json           # Bio, contact, throughline, headlines
  personas.json          # The 5 personas, each with cribsheet structure
  projects/              # MDX file per project
    critical-mass.mdx
    pixxa-perspective.mdx
    airshow.mdx
    igen-pfizer.mdx
    dx-mba.mdx
    verizon-dti.mdx
    iphone-clock-app.mdx
    gte-labs-dom.mdx
  writing/               # MDX per essay (start with 2 placeholders)
  talks/                 # JSON list of talks (HarvardXR 2025, YOW Connected 2016, Airshow tour stops)
  testimonials.json      # Pulled from airshow.io: Gassée, Bajarin, Brody, Elmer-DeWitt, Singer
  clients.json           # Apple, Samsung, IBM, Fidelity, BNY Mellon, Microsoft, Verizon, EY, Baupost, CME, Pfizer
```

Each persona in `personas.json` follows the **Quantinuum cribsheet structure**:

```json
{
  "id": "product-builder",
  "label": "Product Builder",
  "default": true,
  "pitch_line": "I take vague ideas — about products, organizations, even whole categories — and turn them into things that actually run.",
  "credibility_anchors": [...],
  "shape_of_the_gap": "...",
  "what_he_uniquely_does": "...",
  "angles_to_play": [...],
  "head_off_early": "...",
  "closing_pitch": "...",
  "featured_project_slugs": ["pixxa-perspective", "critical-mass", "iphone-clock-app", "verizon-dti"]
}
```

Write the actual cribsheet copy yourself in Farshad's voice (taut, sensory, restrained, named-client-rich, cinematography-flavored where natural). Use the bio above. Do not invent facts that contradict the bio.

# Information architecture (identical across all three concepts)

```
/                            Home — hero + persona switcher + signature visual
/for/product-builder         Persona page (default)
/for/data-storyteller        Persona page
/for/strategist              Persona page
/for/founder                 Persona page
/for/dev-tools               Persona page
/work                        Filterable archive
/work/[slug]                 Project case studies
/writing                     Essays index + posts
/talks                       Talks list with HarvardXR 2025 featured
/about                       Long bio + clients + press
/contact                     Email, calendar, current availability
```

Each persona page renders the cribsheet structure as a single deep-linkable, printable, shareable page. The persona switcher updates the URL (`/for/{persona}`) and re-renders.

# The three concepts — distinct directions

## Concept A — **Editorial Press**

*Reference DNA: Stripe Press, Patrick Collison, Andy Matuschak homepage, Jane Street's site, MIT Press Reader.*

**Posture:** A serious operator's reading room. The site looks like a small publishing imprint dedicated to one author. Confidence through restraint.

- **Type:** Display in a high-contrast modern serif — **GT Sectra** (preferred, paid) or free fallback **Source Serif 4** at heavy display weights for headlines (96–140px on desktop, full hairline-to-black weight contrast). Body in **Söhne** (preferred) or **Inter Display** at 18–19px / 1.6 line height. Mono in **JetBrains Mono**.
- **Color:** Off-white paper (`#F8F5EE`), deep ink (`#15161A`), one signature ink color: a saturated archival red (`#B7251A`) used only for active persona, link hovers, and pull-quote rules. No gradients. No glass.
- **Layout:** Strict 12-column grid with prominent left-rail metadata (date, persona tags, reading time) on every page. Generous outer margins. Long-form-first.
- **Persona switcher:** A horizontal segmented control under the hero, set in display serif italic, with a visible underline-rule for the active state. Feels like flipping to a chapter.
- **Signature moment:** A single hand-typeset hero — name and throughline rendered as a one-of-a-kind editorial composition with mixed weights, an oversized initial cap, and a small Pixxa-style animated micro-chart in the right margin that animates once on load.
- **Motion:** Almost none. 200ms fade on persona swap. A subtle "page turn" feel via a 4px translate.

## Concept B — **Cinematic Lens**

*Reference DNA: Pixxa Perspective copy register, Linear's marketing site, Rauno Freiberg's signature interactions, Apple's product pages from the Jony Ive era.*

**Posture:** This is the "Data Cinematographer" version. The site itself demonstrates the craft: motion as meaning, frames as scenes, lenses as actual camera lenses. Builder-as-director.

- **Type:** Display in **Neue Haas Grotesk Display** (preferred) or free **Inter Display** at 120–180px desktop, ultra-light to bold contrast. Body in **Neue Haas Grotesk Text** or **Inter** 17px / 1.55. Numerals in tabular figures everywhere — this is a quiet flex for a data person. Editorial serif accent only for pull quotes (**Tiempos Text** or **Source Serif 4**).
- **Color:** Cinematic near-black (`#0B0D10`) as primary background on the homepage and persona pages, switching to warm off-white (`#FAFAF7`) for project case studies and writing (so reading is comfortable). Signature accent: a desaturated cinematic blue (`#1F3B5B`) plus a single warm highlight (`#E8B547`) used only for the active "lens" indicator.
- **Layout:** Letterboxed hero (16:9 framing on desktop). Generous negative space. Section dividers as thin 1px rules in the accent color.
- **Persona switcher:** Styled as five **lens markers** along a horizontal track — a literal camera-lens metaphor with the active lens visibly "focused" (slightly larger, with a focus ring). Tooltips on hover give the persona's pitch line.
- **Signature moment:** Switching personas triggers a **"rack focus"** transition — a fast (350ms) blur-and-reveal where the page contents recompose like a scene change. The hero also features one cinematic signature visual: a small Pixxa/Perspective-style animated chart that "directs" through three frames on load (data zooms in, highlights, settles).
- **Motion:** Confident but disciplined. Page transitions ~300ms with easing. Respect `prefers-reduced-motion` — fall back to instant.

## Concept C — **Systems Monograph**

*Reference DNA: Bret Victor (without the JS gymnastics), Andy Matuschak's working notes, Jane Street's tech blog, Brendan Gregg's brendangregg.com, the Modula-3 systems journal aesthetic.*

**Posture:** This is the engineer/researcher version. The site looks like a research lab that happens to be one person. Density of substance signals seniority. Reads like a monograph or a lab notebook for a serious career.

- **Type:** Body in a slightly bookish serif — **Tiempos Text** (preferred) or free **Source Serif 4** at 17px / 1.65. Display in the same family at heavier weights. Sans only for UI chrome (small caps labels, persona switcher) — **GT America Mono** or free **JetBrains Mono** for the chrome creates an interesting "lab printout" register. Footnotes and sidenotes treated like an academic paper.
- **Color:** Cream paper (`#F4EFE6`), warm black ink (`#1A1814`), and a single accent: a muted laboratory green (`#3D5A40`) for active states and links. Inline code in a soft tint (`#EAE3D4`). Feels like a Knuth-era monograph reprinted by a small university press.
- **Layout:** A **two-column layout with sidenotes** (Tufte-style, but disciplined). The main column carries the prose; the right margin carries dates, citations, named collaborators, and (on persona pages) the cribsheet credibility anchors as marginalia. On project pages, the sidenotes carry technical details (e.g., "Reactor IDE: custom HTTP server, Modula-3, Bill Kalsow lead"). On talks, sidenotes carry the venue and date.
- **Persona switcher:** A small-caps inline list at the top of the home page set as a single sentence: "READ AS — Product Builder · Data Storyteller · Strategist · Founder · Developer Tools." The active persona is underscored with a thin rule. Feels like choosing a chapter mode in a critical edition.
- **Signature moment:** The home page features **a single archival image** (the 1996 Reactor IDE screenshot, pulled from the Wayback Machine — Claude Code, fetch this from `https://web.archive.org/web/1998*/cmass.com` and embed the best capture you find) treated as a frontispiece, with a long caption. This is the credibility anchor as visual.
- **Motion:** Effectively none. Static, confident, scholarly. Persona swap is an instant content swap with a 100ms fade.

# Cross-cutting requirements (apply to all three concepts)

1. **Persona switcher behavior.** Updates the URL hash or path (`/for/{persona}`). Persists selection across page loads via a single cookie or localStorage key. Each persona page is independently SEO-indexable with its own `<title>`, `<meta description>`, and Open Graph image.

2. **Per-persona one-pager / PDF.** Each persona page has a "Download one-pager" link that produces a print-stylesheet-driven A4/Letter PDF rendering of the cribsheet. Use `@media print` styles. The print version should look as good as the screen version — different design, same content. Test with browser print preview.

3. **Project case studies.** Each project MDX must have frontmatter: `title`, `client`, `role`, `dates`, `personas: []` (array of persona ids it belongs to), `outcome` (one quantified line), `collaborators: []`. Render this metadata visibly on the page.

4. **Wayback Machine assets.** Pull the 1996–1998 Critical Mass / Reactor IDE screenshots from `https://web.archive.org/web/*/cmass.com*` (also try `criticalmass.com` and `cm.com`). If you cannot reach Wayback, generate a clearly-labeled placeholder card titled *"Reactor IDE, Critical Mass Inc., 1996 — pending archival image"* and note this in `NOTES.md` for that concept.

5. **Testimonial wall.** Pull these quotes from airshow.io and present them on the About page (and selectively on persona pages where relevant): Jean-Louis Gassée ("Airshow: Post-PowerPoint storytelling"), Paul Brody (EY), Ben Bajarin, Ryan Singer (Basecamp), Philip Elmer-DeWitt (Fortune/CNN). Format consistently across all three concepts but style each to match the concept.

6. **Client logo wall.** Apple, Samsung, IBM, Fidelity, BNY Mellon, Microsoft, Verizon, EY, Baupost, CME, Pfizer. Use simple monochrome SVG renderings or text-only treatment if you cannot source clean logos — *do not use blurry raster logos.* Better to render as small-caps text wall ("APPLE · SAMSUNG · IBM · FIDELITY …") than to look amateur.

7. **Contact page.** Email (`farshad@igencorp.com`), Boston location, a one-sentence "currently available for…" line driven by a JSON field so it can be edited in one place.

8. **Performance.** Lighthouse score 95+ on all four categories for each concept. Inline critical CSS. Lazy-load below-fold images. No client-side JS for anything that can be done with HTML/CSS (the persona switcher can be HTML+CSS+a tiny vanilla-JS sprinkle for state persistence).

9. **Typography hosting.** Use `@fontsource` packages for any free fonts. For paid fonts (Söhne, GT Sectra, Tiempos, Neue Haas Grotesk), include a clearly-labeled fallback in CSS and document the upgrade path in `NOTES.md`. The free fallbacks must look *good*, not just acceptable.

10. **Boldness without flash.** Type can be large. Layouts can be unconventional. Color palettes can be saturated in moments. But: no parallax, no scroll-jacking, no cursor effects, no ambient music, no "click anywhere to enter," no page-load animations longer than 400ms, no auto-playing video with sound. The design is bold *in its decisions*, not in its noisiness.

# Deliverables checklist

For each of the three concepts:

- [ ] Working Astro + MDX project under `concepts/0X-name/`
- [ ] All eleven routes implemented and styled
- [ ] All five persona pages with full cribsheet content
- [ ] Six to eight project case studies (Critical Mass and Pixxa Perspective are mandatory; others as time allows)
- [ ] Print stylesheet for the per-persona one-pager
- [ ] `NOTES.md` documenting type choices, color tokens, key design decisions, and what would change if the paid fonts were licensed
- [ ] One screenshot per route (1280×800) saved to `concepts/0X-name/screenshots/` for the top-level review

For the repo as a whole:

- [ ] Top-level `README.md` with side-by-side hero screenshots of all three concepts and a one-paragraph posture description for each
- [ ] A `shared/content/` directory used by all three concepts (single source of truth)
- [ ] Top-level `package.json` with workspace scripts: `npm run dev:a`, `npm run dev:b`, `npm run dev:c`, `npm run build:all`
- [ ] An `EVALUATION.md` that for each concept lists: *what it gets uniquely right, what it sacrifices, who it lands hardest with* (e.g., "Concept C lands hardest with Quantinuum's CTO and DEC SRC alumni; weakest with marketing-led buyers")

# Working method

1. Read this entire brief before writing code.
2. Build the shared content layer first. Get the cribsheet copy right — this is the soul of the site.
3. Scaffold all three concepts in parallel, but commit them incrementally so I can `git diff` between them.
4. For each concept: build the home page first, then one persona page, then iterate the typography and color until it feels *unmistakably itself* before scaling out the remaining routes. Do not build all routes at low quality and then "polish." Polish first, scale second.
5. Run Lighthouse and accessibility audits before declaring each concept done.
6. Take the screenshots last, after the design is final.

# Tone and judgment notes

- When writing copy in Farshad's voice: terse, sensory, named-collaborator-rich, declarative. Borrow the cadence of the Pixxa Perspective marketing copy ("Motion brings Emotion. Bring the power of cinematography to your data.") and the Asymco terseness ("Nobody brings numbers to life like Horace Dediu does."). Avoid LinkedIn-speak ("passionate," "results-driven," "strategic leader").
- When in doubt about a design decision: choose the option that an HBS-trained, technically deep, 50-something operator would find *credible*. Not the option that would impress a junior designer on Twitter.
- The site exists to make a senior CTO, founder, board chair, or partner-track VC at a Boston/Cambridge enterprise want to email `farshad@igencorp.com` within 90 seconds of landing on the homepage. Every decision serves that.

Begin.
