# Concept C — Systems Monograph

## Posture

A research lab that happens to be one person. Density of substance signals seniority. Reads like a monograph or lab notebook for a serious career. Bret Victor's reading list, with discipline.

## Type

- **Display & body**: [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4) (free, via `@fontsource/source-serif-4`). Set bookishly at 17–19px / 1.65 line height. Old-style numerals on by default.
- **Chrome (smallcaps, sidenote markers, dates)**: [JetBrains Mono](https://www.jetbrains.com/lp/mono/) at 10–12px in upper-case with `0.16em+` letter-spacing — a "lab printout" register.

### Upgrade path (paid)

- **Source Serif 4 → Tiempos Text** (Klim Type Foundry, paid). Tiempos is the obvious upgrade — sharper bracket serifs at body sizes, a much more luxurious italic. Swap `--serif`/`--display` in `tokens.css`.
- **JetBrains Mono → GT America Mono** (Grilli Type, paid). GT America Mono has a tighter horizontal rhythm in the lab-printout register and a slightly cleaner numeral set. Swap `--mono`.

## Color

| Token | Hex | Use |
|------|-----|-----|
| `--paper` | `#F4EFE6` | Cream paper |
| `--paper-2` | `#EBE5D6` | Plate frames, featured talk surface |
| `--ink` | `#1A1814` | Warm black ink |
| `--ink-soft` | `#36312A` | Body variant |
| `--ink-quiet` | `#6E655A` | Marginalia, dates |
| `--rule` | `#C8BFAE` | Hairline rules |
| `--tint` | `#EAE3D4` | Inline code background |
| `--lab` | `#3D5A40` | Active states, links, sidenote markers |

Feels like a Knuth-era monograph reprinted by a small university press.

## Layout

A two-column Tufte-style article: main column at 60ch, right margin (180–240px) carrying dates, citations, named collaborators, and credibility anchors as marginalia. On project pages, the sidenotes carry technical details (e.g., "Reactor IDE: custom HTTP server, Modula-3, Bill Kalsow lead"). Below 900px the marginalia stacks under the body.

## Persona switcher

A small-caps inline list at the top of every persona-relevant page, set as a single sentence: <code>READ AS — Product Builder · Data Storyteller · Strategist · Founder · Developer Tools.</code> The active persona is underscored with a thin lab-green rule. Reads like choosing a chapter mode in a critical edition.

## Signature moment

The home page features a **frontispiece**: the 1998 capture of the Critical Mass Inc. masthead pulled from `web.archive.org` (<https://web.archive.org/web/19981212023843/http://www.cmass.com/>), beneath an illustrative reconstruction of the Reactor IDE startup terminal. The frontispiece is treated as <em>Plate I.</em>, with a long sidenote-style caption — credibility anchor as a visual.

The Wayback assets are committed under `public/wayback/` so the frontispiece works fully offline. The Reactor terminal is a stylized re-creation rather than an original screenshot; the caption discloses this.

## Motion

Effectively none. A blinking cursor on the frontispiece terminal is the single piece of motion (1.05s `step(2)` infinite). Persona swap is an instant content swap — no animation. Respects `prefers-reduced-motion` by default.

## Print monograph

A4-tuned print stylesheet collapses to a single column, drops the lab-green to black, and resets type to point sizes. The persona one-pager prints cleanly via `window.print()`.

## Wayback assets

Successfully retrieved on 2026-04-26 from the 1998-12-12 capture of cmass.com:

- `public/wayback/cmass-logofront.gif` — masthead, 324×63
- `public/wayback/cmass-news-side.gif` — news sidebar
- `public/wayback/cmass-side2.gif` — sidebar artwork

These ship with the build for offline viewing. The figure caption attributes the source.

## What this concept gets uniquely right

- Lands hardest with the audience the brief points at: DEC SRC alumni, Quantinuum-style CTOs, anyone who has read enough Knuth or Tufte to recognize the register.
- The marginalia structure handles the "knows about a lot of things" problem cleanly: the *substance* is in the sidenotes, the *narrative* is in the column.
- The frontispiece is the credibility anchor as visual evidence — a deliberately old artifact that nobody else can fake.

## What this concept sacrifices

- Risks reading as "academic" to a marketing-led buyer or junior designer; that audience belongs to Concept B.
- Requires excellent copy in the marginalia; if the sidenotes are thin, the layout collapses into a gimmick.

## Deferred / TODO

- An original Reactor IDE screenshot (currently reconstructed; the original is in the Critical Mass archive, not yet digitized).
- Footnoted bibliography on long essays once the writing index expands.
- Variable-font upgrade for Tiempos Text once licensed.
