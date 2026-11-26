# NusaStat — National Statistics Explorer

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/yudhisutawan77/makefun-national-stats/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/yudhisutawan77/makefun-national-stats/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

An independent national statistics site for the
[make.fun bounty “Make the best national statistics site”](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

## What it is

NusaStat gathers population, income, health, work, connectivity, climate and
prices for **12 countries** over **2015–2023** — 8 indicators, 864 data points —
each figure with its source and year. All figures come from the World Bank's
World Development Indicators (WDI); every indicator page names its WDI series
code so any figure can be checked against the source.

## Pages

- **Home** — featured country (Indonesia, 2023), richest-per-person bar chart,
  longest-lives ranking, income-trend chart, and a searchable grid of all
  12 countries.
- **Country profile** (`#/country/IDN`) — all 8 indicators at a glance, an
  interactive line chart (pick any indicator and year range), and a
  year-by-year table with change from the previous year.
- **Compare** (`#/compare`) — up to three countries side by side on any
  indicator: bar ranking, trend chart and a full values table.
- **Indicators** (`#/indicators`) — definitions, units, sources and the top
  five countries for each of the 8 indicators.
- **About & sources** (`#/about`) — method, WDI series codes, limitations.

## How it works

A static site under `app/` — no build step, no network request, no framework.
Charts are hand-drawn inline SVG from `app/chart.js`; data lives in
`app/data.js`; routes are hash routes in `app/main.js`. It works offline once
loaded, on desktop and on a phone.

## Run it

```sh
node serve.ts        # serves app/ at http://localhost:8080
```

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/`
to the output directory and writes `dossier.json` with the vendored
`vendor/makefun-frontend.ts` library.

## License

MIT — see [LICENSE](LICENSE).
