# Concept A — Editorial Press

## Posture

A serious operator's reading room. The site behaves like a small publishing imprint dedicated to one author. Confidence through restraint.

## Type

- **Display & body**: [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4) (free, via `@fontsource/source-serif-4`). Used at full hairline-to-black weight contrast for editorial display, body, and italics.
- **UI / labels / metadata**: [Inter](https://rsms.me/inter/) at 11–13px with 0.16em+ tracking, set in uppercase for chrome and rail labels.
- **Mono**: [JetBrains Mono](https://www.jetbrains.com/lp/mono/) for code blocks.

### Upgrade path (paid)

- **Source Serif 4 → GT Sectra** (Grilli Type, paid). Source Serif 4 holds remarkably well at display sizes; GT Sectra would tighten the contrast curve, sharpen the bracket serifs at large sizes, and add the slightly more theatrical italic GT Sectra is known for. Swap in `tokens.css` (`--serif-display`).
- **Inter → Söhne** (Klim Type Foundry, paid). Söhne is cooler and slightly more letterspaced at small sizes; would add the *Sound of Type Today* tonality the brief points at. Swap `--sans`.

## Color

| Token | Hex | Use |
|------|-----|-----|
| `--paper` | `#F8F5EE` | Page background |
| `--ink` | `#15161A` | Primary type, rules, masthead |
| `--ink-soft` | `#2C2D33` | Body text variant |
| `--ink-quiet` | `#5A5B62` | Marginalia, labels, captions |
| `--rule` | `#D6CFBE` | Hairline rules |
| `--accent` | `#B7251A` | Active persona, link hovers, dropcap, pull-quote rules |

No gradients. No glass. The accent is used sparingly, in the spirit of a printed imprint where a second ink costs extra.

## Layout

- 12-column container at 1240px max width.
- Editorial article layout: a fixed left rail (200px) carries dates, persona tags, reading time. The body sits at 64ch.
- Section heads sit under a 2px ink rule with the section title in serif and the auxiliary link in upper-case Inter.

## Persona switcher

A horizontal segmented control set in display serif italic, with a 2px underline-rule for the active state. Reads as a chapter mode in a critical edition. URL drives selection (`/for/{persona-id}`); `localStorage` persistence is set on each visit so the choice survives page loads.

## Signature moment

The hero is a hand-typeset frontispiece. The display name is set in 900-weight Source Serif 4 with a horizontal accent slice cutting through the lower third of the cap-height. The right margin carries a small SVG bar chart that animates once on load (~900ms, staggered 60ms) — a Pixxa-style nod that says *data is the byline here*.

## Motion

Almost none. 200ms fade on links and chips. 280ms transitions reserved for persona swap. Respects `prefers-reduced-motion`.

## Print stylesheet

Persona pages render a print version via the "Print PDF" link (uses `window.print()`). The print stylesheet collapses to a single-column A4 layout with a left-aligned credibility column at the top, body underneath. Type is reset to point sizes so a printed Letter or A4 page reads cleanly.

## What this concept gets uniquely right

- Establishes seniority without flash. A senior CTO, founder, or partner can read this in one breath and trust the operator behind it.
- The cribsheet structure (Quantinuum-flavored) maps cleanly to the editorial article layout. The credibility anchors live in the rail, the framing in the body. It reads like a profile in *The Atlantic* or *MIT Press Reader*.
- The persona switch feels like flipping to a chapter, not flipping a tab.

## What this concept sacrifices

- Less suited to first-time visitors who need the *spectacle* of cinematography to understand "Data Cinematographer." Concept B will own that ground.
- The serif body is comfortable for long form but slightly less "modern" than a sans-led design — a deliberate choice that lands hardest with the reading audience and weakest with VC associates skimming for keywords.

## Deferred / TODO

- Additional essay copy (currently 2 placeholders).
- A small set of editorial illustrations (currently the SVG micro-chart is the lone graphic).
- Localizable open-graph image generation per persona.
