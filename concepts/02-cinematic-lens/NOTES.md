# Concept B — Cinematic Lens

## Posture

The site demonstrates the craft. Builder-as-director: motion as meaning, frames as scenes, lenses as actual camera lenses. Decisive, low-noise, confidently letterboxed.

## Type

- **Display & body**: [Inter](https://rsms.me/inter/) (free, via `@fontsource/inter`). Variable weights from 200 to 700, with display set in 200/300 weight at large sizes for the slightly architectural register the brief points at.
- **Serif accent**: [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4) for italic pull quotes only. Editorial register inside an otherwise sans-led design.
- **Mono**: [JetBrains Mono](https://www.jetbrains.com/lp/mono/) — used for f-stop labels, dates, and other quiet "lab printout" cues.

### Upgrade path (paid)

- **Inter → Neue Haas Grotesk Display + Text** (Linotype, paid). Inter holds remarkably close to NHG's modern register at small sizes; at display sizes NHG would tighten the letterforms and add the clean, slightly warmer cap-height balance the brief points at. Swap in `tokens.css` (`--display`, `--body`).
- **Source Serif 4 → Tiempos Text** (Klim Type Foundry, paid) for italic pull quotes. Source Serif 4's italic is good; Tiempos is great. Swap `--serif`.

## Color

| Token | Hex | Use |
|------|-----|-----|
| `--film` | `#0B0D10` | Cinematic primary background (home, persona, talks) |
| `--film-2` | `#15181D` | Card surfaces, frame interiors |
| `--paper` | `#FAFAF7` | Reading surface (work case studies, writing) |
| `--paper-2` | `#F1EFE8` | Card surface on paper |
| `--ink` | `#15161A` | Type on paper |
| `--lens-blue` | `#1F3B5B` | Cinematic accent gradient, link blue on paper |
| `--highlight` | `#E8B547` | The single warm highlight: active lens, kicker, focus pulse |
| `--halo` | `#C5C8CC` | Quiet type on dark surface |

The cinematic backdrop on the home and persona pages flips to a warm off-white reading surface for case studies and essays. The deliberate switch keeps long-form reading comfortable; the frame stays cinematic where the *direction* is the point.

## Layout

- 16:9 letterboxed hero on home and persona pages, with the cinema black bars rendered via `:before/:after` pseudo-elements.
- Section dividers as 1px rules in the lens-blue accent.
- Generous negative space; no decorative panels.

## Persona switcher

A `<LensSwitcher>` rendered as five **lens markers** along a horizontal track. Each lens is two concentric circles plus an f-stop label. The active lens enlarges (~1.18×) and gains a soft yellow drop-shadow ("focus" indicator). Tooltips on hover show the persona's pitch line.

URL drives selection (`/for/{persona-id}`). `localStorage` persists across page loads.

## Signature moment

Two layers:

1. **Animated scene chart in the hero**. A small Pixxa/Perspective-style line+area chart that "directs" through three frames: the line draws, the area fills, the leading dot pops, and a slow pulse halo establishes the focus point. Annotated with two milestones (Critical Mass 1996, Pixxa Perspective).
2. **Rack-focus page transition**. Each `<main>` mounts under a 350ms blur-and-reveal animation (`@keyframes rackFocus`) — the cinematic equivalent of a scene change. Falls back to instant under `prefers-reduced-motion`.

## Motion

Confident but disciplined. 200ms for affordances. 350ms for page-level transitions. The hero's scene chart animates once on load (~1.4s total) with staggered draws.

## Print stylesheet

Persona pages support `window.print()`. The cinematic frame collapses to a clean A4 layout with the cribsheet content; black on white; the highlight color remains as accent rules.

## What this concept gets uniquely right

- The site *is* the demo reel. A director-grade visitor instantly reads "Data Cinematographer" without reading the words.
- The dark cinematic surface lands hardest on senior product/design audiences. Modern, deliberate, not flashy.
- The dual-surface approach (film for posture, paper for prose) avoids the trap of being beautiful-but-unreadable.

## What this concept sacrifices

- Lands less obviously with a Modula-3-era systems audience who read the world in plain text. Concept C will own that ground.
- The cinematic posture risks being read as "marketing-ish" by an HBS-trained reader unless the cribsheet copy is rigorous — which it is.

## Deferred / TODO

- Real keynote stills as letterbox hero artwork (currently SVG-only).
- Audio toggle for a 30-second teaser of the Airshow opener (deliberately deferred to honor "no auto-playing video with sound").
- Variable-font swap for Inter Display once licensed.
