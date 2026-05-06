# Concept E — Spectrum

## Reference DNA

- **Info We Trust** spirit (RJ Andrews) for the impulse: a career *as* a data visualization. The execution leaves the vintage register behind.
- **Pentagram / Eddy Studio** infographic posters — flat color, hierarchical typography, no kitsch.
- **The Pudding**, **Reuters Graphics**, **The Economist** data sections — clean, modern, content-first information design.
- **Nicholas Felton's Annual Reports** — single-operator, single life, indexed and color-coded.
- **Stripe / Linear / Vercel marketing** — typographic discipline, Inter at large display sizes, generous whitespace.

## Posture

A clean, contemporary infographic portrait of one operator. The site **is** a data visualization of a career: every project is a coloured bar plotted on a calendar axis; every client name carries the colours of the categories that touched it; every persona is a single hue used consistently across the site as a legend.

No vintage chrome. No "Plate I" decoration. No hand-lettered annotations. No ribbon banners. The visual interest comes from clean typography, color encoding, and the timeline itself.

## Type

- **Display + body**: [Inter](https://rsms.me/inter/) (free, via `@fontsource/inter`). 300–700 weights, tabular figures on by default. Hero set in 700 weight at the upper end of the modular scale.
- **Chrome (dates, labels, scale axes)**: [JetBrains Mono](https://www.jetbrains.com/lp/mono/). Used for date stamps, axis ticks, project counts — anything where alignment matters.

No serif on this concept. Deliberate.

## Color

The color system is the load-bearing design idea. Five categories, five colors, applied consistently:

| Category | Token | Hex |
|---|---|---|
| Builder (Product Builder) | `--cat-builder` | `#1d4ed8` (cobalt blue) |
| Storyteller (Data Storyteller) | `--cat-storyteller` | `#d97706` (amber) |
| Strategist | `--cat-strategist` | `#15803d` (forest green) |
| Founder | `--cat-founder` | `#a21caf` (plum) |
| Dev Tools | `--cat-devtools` | `#475569` (slate) |

Surface is near-white (`#fafafa`) with deep ink (`#0a0a0a`). The categorical palette is the only color in the design — body type stays in ink, surfaces stay neutral.

Where colors appear:
- The **CategoryLegend** is a horizontal nav-rail of pills, persistent across pages.
- The **Spectrum** timeline plots one row per category, each filled with that category's hue.
- **Project cards** carry a top stripe with one segment per category the project touches.
- **Logo wall tiles** carry the same multi-segment stripe under each client name.
- **Persona pages** use the category color as the closing-pitch border, the category dot, and the active legend pill.
- **Filter chips** flip to the category color on activation.

## Layout

- 1320px container max width.
- The home page leads with the throughline (display 700, ~5.5rem at desktop) and runs the **Spectrum** as the first signature visual.
- Project cards are 280px-min auto-fit grid; logo wall is also auto-fit grid sharing a single hairline border.
- Persona pages are a 1.6 / 1 split with a credibility-anchor sidebar.

## Persona switcher

The **CategoryLegend** is the persona switcher in disguise. It always lists the five categories with their swatches; clicking a category routes to `/for/{persona-id}/` and that pill becomes filled with its color. The active state survives back/forward navigation and is also persisted to `localStorage`.

## Signature moment

The **Spectrum** timeline on the home page. A horizontal calendar axis from 1990 → present, with one row per persona category. Each project is a coloured bar positioned across the years it spanned. Hovering reveals the project + client; clicking opens the case study. The whole career fits in one frame.

The visual answers the brief's central problem ("Visitors today cannot tell in 5 seconds what he is") by showing it: five lanes, all populated, all colored, all real.

## Motion

Almost none. 140ms hovers. No page transitions. No on-load animations.

## Build on company logos

Per the brief's preference for "small-caps text wall over blurry rasters," client wordmarks are rendered as **typeset text** at large sizes (22–28px, Inter 700, tight tracking) inside framed tiles. Each tile carries a colour stripe encoding the categories the work at that client touched.

The same pattern recurs on project cards: the client wordmark is the visual primary, with the project title set quieter underneath.

If a future iteration wants real SVG client marks (Apple, IBM, Microsoft), the wordmark slot can swap to an SVG without affecting layout.

## Print stylesheet

`@media print` strips the legend chrome and the colored stripes (replaces with category labels), retains the wordmark and outcome at point sizes, and renders persona pages as one-pagers via `window.print()`.

## What this concept gets uniquely right

- **Answers the brief's central problem with a chart.** The Spectrum makes the four-careers-stacked story legible in five seconds without text.
- **Color is functional, not decorative.** Every hue carries semantic weight; the legend at the top is the key to the entire site.
- **Modern enough to land with VC associates and HBS-trained operators alike.** Type and color reference Stripe / Linear / Pentagram, not letterpress or cinema.
- **Builds on company logos**, as requested. The wordmarks are the primary visual unit; the colors annotate them.

## What this concept sacrifices

- Less *atmospheric* than B (cinematic), C (scholarly), or D (atlas). Reads as a portfolio site, not a personal-brand object.
- Color encoding requires the visitor to learn it. Skim-readers may miss the meaning of the stripes.
- The five colors must look right together at all times — a real constraint for future updates (e.g., adding a sixth category would require palette rework).

## Who it lands hardest with

- Modern enterprise buyers, VC associates, design-aware founders, marketing-led readers.
- Anyone who reads The Pudding / Reuters / FT data graphics.
- A first-time visitor who needs to grasp the site in 10 seconds.

## Who it lands less well with

- A reader looking for warmth or atmosphere — they belong on B or D.
- A DEC SRC alumnus who reads everything in plain text — they belong on C.

## Deferred / TODO

- Real SVG client marks for the top-tier clients (Apple, IBM, Microsoft, Fidelity, Samsung). The current text-only wordmarks are correct per brief but a few tasteful SVG marks would lift the wall.
- A timeline detail view (zoom into a decade).
- Sortable / filterable project grid by client.
- Per-category landing graphic (e.g., a small in-line chart showing concentration of "Builder" work over time).
