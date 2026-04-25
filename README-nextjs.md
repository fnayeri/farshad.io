# farshad.io — Next.js port

This branch (`claude/nextjs-port-n5O96`, originally `nextjs-port`) is a Next.js
15 / App Router rewrite of the Jekyll site, intended to be deployed on
Cloudflare Pages (free tier) via `@cloudflare/next-on-pages`.

The Jekyll source is preserved in `legacy-jekyll/` for reference. The branch
is **not** intended to be merged to `main` yet — `main` continues to serve
the Jekyll site through GitHub Pages until you cut over.

## Source of truth

Project content lives in **`src/_data/portfolio.csv`**. The CSV is read at
build time inside `lib/portfolio.ts` (using `papaparse`) and exposed via
`getProjects()`. Every row becomes a static page; project logos live at
`public/assets/logos/{name}.png`.

Other content sources:

- `content/showcase.json` — the three (or more) showcase tiles at the top
  of the home page (Pixxa, Health of Nations, Harvard XR, Linguistic
  Categories & AI). Not in the CSV because they're not portfolio rows.
- `content/about.json` — name, headshot path, contact info, resume path,
  LinkedIn, blog link, and the "Proven Product Leader" bullet list shown
  in the About modal.

## Local development

```bash
npm install

# 1. Plain Next.js dev server (fast iteration; not a Cloudflare runtime)
npm run dev          # http://localhost:3000

# 2. Cloudflare Pages preview (matches production behavior)
npm run preview      # builds with @cloudflare/next-on-pages, serves
                     # the .vercel/output/static directory via wrangler
```

`npm run preview` runs the actual `@cloudflare/next-on-pages` build and
serves the output through `wrangler pages dev` — this is the closest you
can get to production locally, and is what you should use before pushing.

To produce just the build artifacts:

```bash
npm run pages:build  # writes .vercel/output/static
```

## Editing content

### Add or update a project

1. Open `src/_data/portfolio.csv` in Numbers, Excel, or VS Code.
2. Add or edit a row. The columns are:
   - `name` — short identifier; also the basename of the logo image.
     Rows whose `name` starts with `#` are treated as comments and
     skipped. An empty `name` skips the row.
   - `permalink` — legacy Jekyll permalink (kept around for reference;
     not used by the Next.js port — routing is driven by `slug` /
     `name`).
   - `slug` — URL slug. If empty, the page is served at `/{name}/`;
     otherwise at `/{slug}/`. Slugs are sanitized to `[a-z0-9-]`.
   - `title`, `customer`, `role` — shown in the project header and on
     the project card / experience-table row on the home page.
   - `link` — optional external website. When set, the project logo
     and customer name on the project page link out to it.
   - `color`, `background`, `border` — three hex triplets without `#`
     (e.g. `888`, `FFF`, `1a5f7a`). Drive the per-project color accents.
     `background` falls back to `FFF`, `color` to `888`, and `border`
     falls back to `color` when empty.
   - `tags` — comma-separated. Drives the filter chips and the
     experience-table tag bubbles on the home page. Tag chips are
     auto-derived: anything in the `tags` column shows up in the
     home-page filters automatically.
   - `body` — short synopsis paragraph, shown as the lead text on the
     project page and in the experience table on the home page.
   - `problem`, `stakes`, `discovery`, `outcome` — long-form sections,
     each rendered as its own card with the matching color accent.
     Sections with empty cells are omitted.
   - `considerations` — currently not rendered (parsed but unused;
     keep it in the CSV if you'd like — it survives round-trips).
3. Drop a logo PNG at `public/assets/logos/{name}.png`.
4. Commit & push. Cloudflare Pages auto-rebuilds.

That's it. No code changes needed for routine portfolio updates.

### Edit the showcase carousel

Open `content/showcase.json`. Each item in `items` becomes a tile in the
top-of-page bento grid; clicking opens a modal with the body, links, and
graphic. The first three items are visible as tiles by default; all of
them are reachable via the modal's prev/next arrows.

### Edit the About modal

Open `content/about.json`. The fields drive both the nav links (email,
SMS, resume, LinkedIn, blog) and the About modal that opens from the
avatar / `ⓘ` button.

## Deploying to Cloudflare Pages

### First-time dashboard setup

1. Sign in at [dash.cloudflare.com](https://dash.cloudflare.com) and go
   to **Workers & Pages → Create application → Pages → Connect to Git**.
2. Pick the `fnayeri/farshad.io` repo and the `nextjs-port` (or
   `claude/nextjs-port-n5O96`) branch as the production branch — until
   you're ready to cut `main` over, this should not be `main`.
3. Build settings:
   - **Framework preset:** None (do not pick "Next.js" — that picks the
     Vercel-style serverless adapter, not next-on-pages).
   - **Build command:** `npm run pages:build`
   - **Build output directory:** `.vercel/output/static`
   - **Root directory:** (leave blank — repo root)
   - **Node version:** 20 or 22 (set via `NODE_VERSION` environment
     variable if needed).
4. After the project is created, go to **Settings → Functions →
   Compatibility flags** and add `nodejs_compat` to **both** the
   Production and Preview environments. Save and trigger a redeploy.
5. Set **Compatibility date** to `2024-12-18` (or newer) under the same
   page.

The `wrangler.toml` in the repo carries the same flag so local previews
match production.

### Subsequent deploys

Every push to the production branch triggers an auto-build. Preview
URLs are produced for every other branch / PR.

### Custom domain

`farshad.io` is already on Cloudflare DNS, so once the Pages project is
healthy:

1. In the Pages project, go to **Custom domains → Set up a custom
   domain**.
2. Enter `farshad.io` (and `www.farshad.io` if you want both). Cloudflare
   will configure the DNS records for you automatically because the
   zone is already on the account.
3. Wait for DNS propagation (usually < 1 minute given the zone is
   already on Cloudflare).

Until you're ready to cut over, you can verify everything against the
auto-generated `*.pages.dev` URL.

## Project layout

```
app/
  layout.tsx              # site nav + about modal + footer
  page.tsx                # home page
  [slug]/page.tsx         # one static page per CSV row
  not-found.tsx
  globals.css

components/
  SiteNav.tsx             # client (about-modal trigger)
  AboutModal.tsx          # client
  Showcase.tsx            # client (carousel + modal)
  FilterableProjects.tsx  # client (filter chips, project grid, experience table)

content/
  about.json
  showcase.json

lib/
  portfolio.ts            # CSV parser → getProjects(), getProjectBySlug()
  types.ts

public/
  assets/                 # mirror of the live /assets/ tree
  docs/resume/...         # resume PDF
  images/                 # legacy images dir

src/_data/portfolio.csv   # source of truth (preserved at original Jekyll path)

legacy-jekyll/            # original Jekyll config / Webpack pipeline (reference only)
```

## Notes & known gaps vs. the Jekyll original

- The home page's "chart view" (Chart.js doughnut/polar/stacked-bar/radar
  visualizations of roles, industry, core skills, and capability) is **not
  ported** in this initial pass. The list of source projects is the
  same; only the chart-view UI is dropped.
- The per-project artifacts lightbox (videos / PDFs swiped with arrow
  keys on the original `/{slug}/` pages) is **not ported**. The CSV
  doesn't currently carry the artifact lists; those live in
  `src/_layouts/portfolio.html`'s `page.artifacts` front-matter on the
  generated markdown. Adding back if you want this is a future
  follow-up.
- Several SCSS partials from the Jekyll source (`_sass/`) had per-
  component styles for the chart view, the artifacts lightbox, and the
  blog. We re-implemented the home / project / about styles directly in
  `app/globals.css` rather than porting all SCSS verbatim.
- The nav blog link points at `https://farshad.io/blog/`, the existing
  Jekyll-served blog. The blog itself is not ported.

## Why a separate branch

`main` continues to serve the Jekyll site via GitHub Pages. This branch
must not be merged to `main` until the Pages project is wired up to the
domain and you've decided to cut over. The Jekyll source is intentionally
left intact (under `legacy-jekyll/` and `src/`) so a revert is trivial if
needed.
