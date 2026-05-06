# Concepts — Five Redesigns of farshad.io

Five complete, runnable redesign concepts for the personal site of Farshad Nayeri. Each is a standalone Astro 4 + MDX project, built from a single shared content layer at `../shared/content/`. Each is visually and typographically distinct, accessible, and deployable to Vercel/Netlify with zero configuration.

| Concept | Posture | Port |
|---|---|---|
| [**01 — Editorial Press**](./01-editorial-press) | Serious operator's reading room; small publishing imprint dedicated to one author. Confidence through restraint. | 4321 |
| [**02 — Cinematic Lens**](./02-cinematic-lens) | The site demonstrates the craft. Builder-as-director: motion as meaning, frames as scenes, lenses as actual lenses. | 4322 |
| [**03 — Systems Monograph**](./03-systems-monograph) | A research lab that happens to be one person. Dense, scholarly, sidenote-rich; reads like a small-press monograph. | 4323 |
| [**04 — Cartographer's Atlas**](./04-cartographers-atlas) | Hand-drawn editorial cartography in the spirit of *Info We Trust*. Five personas as labelled territories on an illustrated atlas. | 4324 |
| [**05 — Spectrum**](./05-spectrum) | Clean modern infographic. Five categories, five colors. Career as a calendar timeline; client wordmarks as visual primary. | 4325 |

## Run

From the repository root:

```bash
# Install Astro deps for all five concepts (one-time)
npm run install:concepts

# Run them individually
npm run dev:a    # Editorial Press,         http://localhost:4321
npm run dev:b    # Cinematic Lens,          http://localhost:4322
npm run dev:c    # Systems Monograph,       http://localhost:4323
npm run dev:d    # Cartographer's Atlas,    http://localhost:4324
npm run dev:e    # Spectrum,                http://localhost:4325

# Build all five for deploy
npm run build:all
```

Each concept's `dist/` after `build` is a pure static site that can be uploaded to any static host.

## Information architecture (identical across concepts)

| Path | Purpose |
|---|---|
| `/` | Frontispiece / hero, persona switcher, signature visual |
| `/for/{persona}` | One of five persona pages (cribsheet structure) |
| `/work` | Filterable archive of projects |
| `/work/{slug}` | Project case study |
| `/writing` | Essays index |
| `/writing/{slug}` | Essay |
| `/talks` | Talks list, HarvardXR 2025 featured |
| `/about` | Long bio, press wall, clients |
| `/contact` | Email, location, current availability |

Five personas, in order, with **Product Builder** as default:

1. Product Builder
2. Data Storyteller
3. Strategist / Advisor
4. Founder
5. Developer Tools / Language Designer

## Shared content

All three concepts read from `../shared/content/`:

```
shared/content/
  profile.json          # bio, contact, throughline
  personas.json         # the 5 personas, full cribsheet structure
  testimonials.json     # press quotes (Gassée, Brody, Bajarin, Singer, Elmer-DeWitt)
  clients.json          # client wall list
  talks/talks.json      # all talks, featured-flagged
  projects/*.mdx        # one MDX per project case study (12 included)
  writing/*.mdx         # essays (2 placeholders)
```

Each concept resolves these files via Astro's `import.meta.glob()` and presents them in its own register — same content, different volume.

## Per-concept design notes

See each concept's `NOTES.md` for the full rationale on type, color, layout, motion, paid-font upgrade paths, and what each concept gets uniquely right vs. sacrifices.

## Cross-cutting requirements (all met)

- **URL-driven persona switcher** with `localStorage` persistence (set on each persona page visit).
- **Per-persona one-pager / PDF** via `@media print` styles and `window.print()` in the persona page header.
- **Project case studies** with frontmatter (`title, client, role, dates, personas, outcome, collaborators`) rendered visibly.
- **Wayback assets** for Concept C frontispiece (Critical Mass Inc. masthead, 1998-12-12 capture).
- **Testimonial wall** on About in all three concepts (styled per concept).
- **Client logo wall** as a small-caps text wall (no blurry rasters).
- **Contact** with `farshad@igencorp.com`, Boston location, JSON-driven availability line.
- **Accessibility**: WCAG AA contrast, skip link, semantic HTML, keyboard navigation, `aria-current` on active nav, `prefers-reduced-motion` respected.
- **No client-side JS** beyond:
  - 6-line `localStorage` persona persistence
  - the `/work` filter chips
  - the persona print trigger (`window.print()`).
