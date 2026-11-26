# SUBMIT README — NusaStat

- **Slug:** best-national-statistics-site-20261126-0539
- **Title:** Make the best national statistics site
- **Site name:** NusaStat — National Statistics Explorer
- **Repo name:** makefun-national-stats
- **Commit SHA:** see the builder's final report (this file is amended into the
  commit, so it cannot name its own SHA — the coordinator section below uses
  the placeholder `<FINAL_SHA>`; replace with the SHA from the report)
- **Deadline:** 29 Nov 2026 13:39 WITA (2026-11-29T05:39:00Z)
- **Pot:** $50, free entry (1st–10th $5 each)

## What the site is

A static, offline, no-framework national statistics site under `app/`:

- **12 countries** (Indonesia, Malaysia, Singapore, Thailand, Vietnam,
  Philippines, Japan, India, China, United States, Germany, Brazil),
  **8 indicators**, **2015–2023** — 864 data points.
- **Data:** real figures from the World Bank's World Development Indicators
  (WDI). Every indicator names its WDI series code and every figure is shown
  with source + year (see About page for method and limitations).
- **Pages (hash routes, all linked):** Home (featured Indonesia 2023 KPIs,
  richest-per-person bar chart, longest-lives ranking, income-trend line
  chart, searchable country grid) · Country profile (`#/country/IDN`, 8 KPIs,
  indicator + year-range line chart, year-by-year table) · Compare
  (`#/compare`, up to 3 countries, bar + line chart + values table) ·
  Indicators (`#/indicators`, definitions + top 5 per indicator) · About &
  sources.
- **Charts:** hand-drawn inline SVG (`app/chart.js`), no library, no network.
- **Files:** `app/index.html`, `app/style.css`, `app/data.js`,
  `app/chart.js`, `app/views.js`, `app/main.js` — one job each.
- **Screenshots:** 4 real renders (home desktop, country desktop, compare
  desktop, home phone 390×844), all ≤256 KiB, long side ≤1280.

## Entrypoint

`main.ts` (Node 22, stdlib only) copies `app/` + `screenshots/` to
`MAKEFUN_OUTPUT_DIR` (or `/output`) and writes `dossier.json` via
`vendor/makefun-frontend.ts` (kit copy, byte-identical, sha256 verified).

## Verification done by the builder

- Served `app/` locally; all 4 screenshots are genuine renders, visually
  checked (home, country, compare, phone layouts all render correctly).
- `main.ts` run twice to two output dirs: byte-identical output
  (`diff -r` clean). Dossier 463,643 bytes.
- Kit check (fresh kit, dev): **4 passed, 1 failed, 15 skipped** —
  passes: `competition_open`, `snapshot`, `license_osi`, `entrypoint`;
  fail: `transcripts_present` only (expected before bundle — coordinator
  bundles this session). 5 at-submission checks (repo_public, repo_owner,
  repo_created_after_open, commit_in_repo, duplicate_snapshot) are for
  submit time.
- `.makefun/owner.json` exactly 57 bytes, no trailing newline, wallet
  `75hiGPLRvXpicznWUqVBJhLA5tUbcq2Ry6fxTB6ehXdg`.
- README badges carry the slug segment in all three URLs.
- LICENSE: MIT.

## For the coordinator

Bundle this builder session + parent session as usual (`--muse-usage`,
`--prompt-file`, `--system-prompt`), then submit with
`--competition best-national-statistics-site-20261126-0539 --repo-url
https://github.com/yudhisutawan77/makefun-national-stats --commit
<FINAL_SHA> --bundle … --keypair
~/.makefun/keypairs/https_make.fun.json` (repo must be created on GitHub
after the 05:39 UTC opening and pushed first; verify the GitHub tree
file-by-file before submit).
