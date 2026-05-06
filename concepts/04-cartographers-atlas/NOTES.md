# Concept D — Cartographer's Atlas

## Reference DNA

- **RJ Andrews / Info We Trust** — hand-drawn data graphics, vintage cartographic register, pen-and-ink illustration as primary visual vocabulary, annotated diagrams over photographs.
- **Nigel Holmes** — handsome editorial information graphics with hand-lettered titles.
- **W. E. B. Du Bois's *The Exhibition of American Negroes* (1900)** — hand-drawn data plates, palette of off-white parchment + iron-gall ink + a single saturated accent.
- **Edward Tufte's *Beautiful Evidence*** — sparkline-on-page rigor combined with sympathetic vernacular illustration.

## Posture

A draftsman's atlas of one operator. The site behaves like a hand-illustrated cartographic edition: each persona is a *territory* on the same atlas, each project is a *specimen plate*, each essay is a *field note*. The visual register is pre-photography, pre-DTP. Confidence comes through hand-set type, ink-stamp banners, and pen-drawn diagrams that animate into being once on load.

## Type

- **Display & body**: [IM Fell English](https://iginomarini.com/fell/) (free, via `@fontsource/im-fell-english`). A faithful digitization of John Fell's seventeenth-century types — irregular metal-type letterforms with the vintage-press feel the brief points at.
- **Small caps & banners**: [IM Fell English SC](https://iginomarini.com/fell/) (free) for the persona switcher labels, ribbon banners, and section heads.
- **Hand annotations / marginalia**: [Caveat](https://fonts.google.com/specimen/Caveat) (free, via `@fontsource/caveat`) — a friendly, slightly drafted handwritten face used for the hand-lettered notes that wrap around the body type.
- **Mono / scale legends / dates**: [JetBrains Mono](https://www.jetbrains.com/lp/mono/) for date stamps and pseudo-scale-bar legends.

### Upgrade path (paid)

- **IM Fell English → Hoefler Text or Algerian** (commercial). IM Fell English is excellent and atypical; only swap if the printer hard-requires uniform metrics.
- **Caveat → Tabac Hand or Houschka Pro Hand** (Suitcase Type Foundry, paid). Tabac Hand has a more illustrator-grade looseness; would let the marginalia carry more authority.

## Color

| Token | Hex | Use |
|------|-----|-----|
| `--parchment` | `#F0E7D2` | Page paper |
| `--parchment-2` | `#E7DBBD` | Specimen card paper |
| `--parchment-3` | `#DDD0A8` | Drop-shadow plate |
| `--ink` | `#221A10` | Iron-gall ink — primary type |
| `--ink-soft` | `#3D3325` | Body variant |
| `--ink-quiet` | `#6E624C` | Marginalia, dates, legends |
| `--rule` | `#B9A982` | Hairline rules |
| `--rust` | `#B14A37` | Single saturated accent: ribbon banners, hand-lettered notes, link state |
| `--teal` | `#3F6C64` | A second pen-ink tint, used sparingly in the atlas frontispiece illustration |

A subtle CSS-noise paper grain is rendered via `::before` on the body so the parchment never reads as flat tan. Background-attached so it doesn't repaint on scroll.

## Layout

- 12-column container at 1240px max width.
- **Atlas grid** (`.atlas-grid`): two-column Tufte-style — main column at 60ch, marginal column at 200–280px — used on persona pages, case studies, About, and parts of the home page.
- **Specimen card** is the recurring unit: parchment-2 stock, double-rule frame (outer iron-gall, inner dashed), 4×4 drop-shadow on parchment-3, ribbon banner positioned just outside the top-left corner.

## Persona switcher

The **CompassSwitcher** renders an SVG compass rose with eight rhumb lines and a labelled north arrow on the left, beside a 5-item list of persona "bearings" (N, NE, E, SE, SW). Clicking a bearing routes to `/for/{persona-id}/` and underlines the active label.

The compass rose itself uses the `pen-draw` utility: each line and circle has a per-element `--len` and animates into being via `stroke-dashoffset`. Once on load. Honors `prefers-reduced-motion`.

## Signature moment

The **Atlas Frontispiece** on `/` — an SVG hand-drawn map of "an atlas of one operator." Five labelled territories (one per persona) with hand-drawn coastlines, fill tints, and Caveat-set hand annotations ("↗ exports to all four", "↖ Pixxa", etc.). A small island in the centre, labelled FARSHAD NAYERI, ties the territories together. A compass rose in the lower-right, a hand-drawn time-scale bar in the lower-left ("1985 — 2005 — 2026 / a working life").

The whole illustration animates in via the `pen-draw` utility: each path's stroke draws over 1.4s with staggered delays (territory paths between 200ms and 1240ms). Once on load. The static state is functional and beautiful; the animation is a flourish.

## Motion

The pen-stroke draw on the frontispiece and the compass rose. That is it. Everything else is static. Page-to-page navigation feels like turning to a new plate.

## Print stylesheet

`@media print` flattens the atlas to a single column, drops the parchment grain, neutralizes the rust accent to black, and shows the ribbon banners as plain text. Persona pages support `window.print()`.

## What this concept gets uniquely right

- Lands hardest with anyone who has read RJ Andrews's *Info We Trust* book or Nigel Holmes — the dataviz-as-illustration audience. They will *immediately* understand what the site is.
- The hand-drawn frontispiece **shows** "I take vague ideas and turn them into things that actually run" rather than asserting it. The visual is the proof.
- The vintage register sidesteps the "every personal site looks the same" trap. Nobody else looks like this.

## What this concept sacrifices

- Reads as too whimsical for a CFO or compliance-led buyer. They belong to Concept A.
- Requires hand-drawn graphics to maintain over time. Adding a new persona means redrawing the frontispiece — deliberate friction, but real.
- The IM Fell English type is gorgeous but irregular. Some senior readers will want a cleaner sans on first glance; that audience is in Concept B.

## Who it lands hardest with

- A dataviz-literate audience: RJ Andrews readers, Information+ conference regulars, the *Beautiful Evidence* shelf.
- A book-aware audience: anyone with strong opinions about typography or printed-page design.
- A creative director or art-leaning founder.

## Who it lands less well with

- Compliance-led buyers, big-firm legal-departments, or anyone scanning for "modern" cues to triage in 12 seconds.

## Deferred / TODO

- Replace the SVG frontispiece illustration with a hand-drawn original (commissioned or hand-inked + scanned). The current SVG is a best-effort first plate and should not pretend to be the final artwork.
- Per-persona "territory plates" — small SVG illustrations on each persona page that show their region in detail.
- Add a true letterpress-style page-edge texture (deckle edge) to the body container at large widths.
- An "Index of Plates" page (a bibliographic register of every illustration on the site).
