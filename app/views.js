// NusaStat views: one render function per hash route. Each returns an HTML
// string for #app. Shared state lives in `ui` so the controls on a page
// (country, indicator, year range, compare picks) re-render the same route
// with new values. Every figure is shown with its source and year.

import {
  COUNTRIES,
  INDICATORS,
  INDICATOR_ORDER,
  YEARS,
  DATA_UPDATED,
  DATA_SOURCE_NOTE,
  countryByCode,
  valueAt,
  latestYear,
  rankCountries,
  changeSince,
} from './data.js';
import { CHART_COLORS, fmtNum, fmtCompact, fmtMoney, fmtSigned, lineChart, barChart, escapeXml } from './chart.js';

export const ui = {
  country: 'IDN',
  indicator: 'gdp_pc',
  yearFrom: 2015,
  yearTo: 2023,
  compare: ['IDN', 'VNM', 'PHL'],
  compareIndicator: 'gdp_pc',
  search: '',
};

export function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sourceLine() {
  return `<p class="source-note">Source: ${esc(DATA_SOURCE_NOTE)} Data updated ${esc(DATA_UPDATED)}.</p>`;
}

function indicatorOptions(selected) {
  return INDICATOR_ORDER.map(
    (k) => `<option value="${k}"${k === selected ? ' selected' : ''}>${esc(INDICATORS[k].label)}</option>`,
  ).join('');
}

function yearOptions(selected) {
  return YEARS.map(
    (y) => `<option value="${y}"${y === selected ? ' selected' : ''}>${y}</option>`,
  ).join('');
}

function countryOptions(selected) {
  return COUNTRIES.map(
    (c) => `<option value="${c.code}"${c.code === selected ? ' selected' : ''}>${esc(c.name)}</option>`,
  ).join('');
}

function kpiCard(label, value, sub, href) {
  const inner = `<div class="kpi-label">${esc(label)}</div><div class="kpi-value">${value}</div><div class="kpi-sub">${sub}</div>`;
  return href
    ? `<a class="card kpi" href="${href}">${inner}</a>`
    : `<div class="card kpi">${inner}</div>`;
}

function formatValue(indicator, v) {
  if (v === null || v === undefined) return '—';
  if (indicator === 'gdp_pc') return fmtMoney(v);
  if (indicator === 'population') return fmtNum(v, 1) + ' M';
  if (indicator === 'life_expectancy') return fmtNum(v, 1) + ' yrs';
  if (indicator === 'co2_pc') return fmtNum(v, 1) + ' t';
  if (indicator === 'unemployment' || indicator === 'internet_users') return fmtNum(v, 1) + '%';
  return fmtSigned(v, 1) + '%';
}

// ---- Home -----------------------------------------------------------------

export function renderHome() {
  const latest = latestYear();
  const featured = countryByCode('IDN');
  const gdpRank = rankCountries('gdp_pc', latest, true).slice(0, 5);
  const lifeRank = rankCountries('life_expectancy', latest, true).slice(0, 5);

  const q = ui.search.trim().toLowerCase();
  const shown = COUNTRIES.filter(
    (c) => !q || c.name.toLowerCase().includes(q) || c.region.toLowerCase().includes(q),
  );

  const countryCards = shown
    .map((c) => {
      const pop = valueAt(c, 'population', latest);
      const gdp = valueAt(c, 'gdp_pc', latest);
      const life = valueAt(c, 'life_expectancy', latest);
      return `<a class="card country-card" href="#/country/${c.code}">
        <div class="country-name">${esc(c.name)}</div>
        <div class="country-region">${esc(c.region)} · Capital ${esc(c.capital)}</div>
        <dl class="country-facts">
          <div><dt>Population ${latest}</dt><dd>${fmtNum(pop, 1)} M</dd></div>
          <div><dt>GDP per capita ${latest}</dt><dd>${fmtMoney(gdp)}</dd></div>
          <div><dt>Life expectancy ${latest}</dt><dd>${fmtNum(life, 1)} yrs</dd></div>
        </dl>
        <span class="card-link">Open profile →</span>
      </a>`;
    })
    .join('');

  const trendSeries = ['IDN', 'VNM', 'IND'].map((code, i) => {
    const c = countryByCode(code);
    return { label: c.name, color: CHART_COLORS[i], values: c.series.gdp_pc };
  });

  return `
  <section class="hero">
    <p class="eyebrow">National statistics · 12 countries · 2015–2023</p>
    <h1>Every country's numbers,<br>in one place.</h1>
    <p class="lede">NusaStat gathers population, income, health, work, connectivity,
    climate and prices for twelve countries — each figure with its source and
    year, shown as charts and tables you can explore.</p>
    <div class="search-row">
      <label class="visually-hidden" for="search">Search countries</label>
      <input id="search" type="search" placeholder="Search a country or region — try “Asia”…" value="${esc(ui.search)}" data-bind="search">
      <a class="btn" href="#/compare">Compare countries</a>
    </div>
    <p class="hero-stats"><strong>12</strong> countries · <strong>8</strong> indicators ·
    <strong>9</strong> years · <strong>864</strong> data points · Source: World Bank WDI</p>
  </section>

  <section>
    <h2>Featured: Indonesia in ${latest}</h2>
    <div class="kpi-grid">
      ${kpiCard('Population', fmtNum(valueAt(featured, 'population', latest), 1) + ' M', 'World Bank WDI, ' + latest, '#/country/IDN')}
      ${kpiCard('GDP per capita', fmtMoney(valueAt(featured, 'gdp_pc', latest)), 'World Bank WDI, ' + latest, '#/country/IDN')}
      ${kpiCard('Life expectancy', fmtNum(valueAt(featured, 'life_expectancy', latest), 1) + ' years', 'World Bank WDI, ' + latest, '#/country/IDN')}
      ${kpiCard('Unemployment', fmtNum(valueAt(featured, 'unemployment', latest), 1) + '%', 'World Bank WDI, ' + latest, '#/country/IDN')}
    </div>
  </section>

  <section class="two-col">
    <div class="card">
      <h2>Richest per person, ${latest}</h2>
      <p class="card-sub">GDP per capita, current US$. Source: World Bank WDI.</p>
      ${barChart(
        gdpRank.map((r, i) => ({ label: r.country.name, value: r.value, color: CHART_COLORS[i % CHART_COLORS.length] })),
        { width: 640 },
      )}
      <p><a href="#/indicators">See all indicators →</a></p>
    </div>
    <div class="card">
      <h2>Longest lives, ${latest}</h2>
      <p class="card-sub">Life expectancy at birth, years. Source: World Bank WDI.</p>
      <ol class="rank-list">
        ${lifeRank
          .map(
            (r, i) =>
              `<li><span class="rank-num">${i + 1}</span> <a href="#/country/${r.country.code}">${esc(r.country.name)}</a> <strong>${fmtNum(r.value, 1)} yrs</strong></li>`,
          )
          .join('')}
      </ol>
      <p class="card-sub">Japan leads at ${fmtNum(valueAt(countryByCode('JPN'), 'life_expectancy', latest), 1)} years; Singapore follows at ${fmtNum(valueAt(countryByCode('SGP'), 'life_expectancy', latest), 1)}.</p>
    </div>
  </section>

  <section class="card chart-card">
    <h2>Income is rising across Asia</h2>
    <p class="card-sub">GDP per capita, current US$, 2015–2023. Vietnam's line climbs fastest of the three; Indonesia's roughly doubles over the decade. Source: World Bank WDI.</p>
    ${lineChart(trendSeries, YEARS, { width: 720, height: 300 })}
    <div class="legend">${trendSeries.map((s) => `<span><i style="background:${s.color}"></i>${esc(s.label)}</span>`).join('')}</div>
  </section>

  <section>
    <h2>Browse all countries</h2>
    <p class="muted">${shown.length} of ${COUNTRIES.length} countries shown. Click a card for the full profile, charts and year-by-year table.</p>
    <div class="country-grid">${countryCards || '<p>No countries match that search.</p>'}</div>
  </section>
  ${sourceLine()}`;
}

// ---- Country profile -------------------------------------------------------

export function renderCountry(code) {
  const c = countryByCode(code) || countryByCode('IDN');
  const latest = latestYear();
  const ind = INDICATORS[ui.indicator];
  const fromIdx = YEARS.indexOf(ui.yearFrom);
  const toIdx = YEARS.indexOf(ui.yearTo);
  const lo = Math.min(fromIdx, toIdx);
  const hi = Math.max(fromIdx, toIdx);
  const yearsSlice = YEARS.slice(lo, hi + 1);
  const valuesSlice = c.series[ui.indicator].slice(lo, hi + 1);
  const chg = changeSince(c, ui.indicator, YEARS[lo], YEARS[hi]);

  const tableRows = YEARS.map((y, i) => {
    const v = c.series[ui.indicator][i];
    const prev = i > 0 ? c.series[ui.indicator][i - 1] : null;
    const delta = prev !== null && prev !== 0 ? ((v - prev) / Math.abs(prev)) * 100 : null;
    return `<tr><td>${y}</td><td>${formatValue(ui.indicator, v)}</td><td>${delta === null ? '—' : fmtSigned(delta, 1) + '%'}</td></tr>`;
  }).join('');

  const peers = rankCountries('gdp_pc', latest, true)
    .filter((r) => r.country.code !== c.code)
    .slice(0, 3);

  return `
  <nav class="crumbs"><a href="#/">Countries</a> › ${esc(c.name)}</nav>
  <section class="hero country-hero">
    <h1>${esc(c.name)}</h1>
    <p class="lede">${esc(c.region)} · Capital ${esc(c.capital)} · Currency ${esc(c.currency)} · Land area ${fmtNum(c.area_km2, 0)} km²</p>
    <label class="inline-label" for="country-pick">Switch country</label>
    <select id="country-pick" data-bind="country">${countryOptions(c.code)}</select>
  </section>

  <section>
    <h2>At a glance, ${latest}</h2>
    <div class="kpi-grid">
      ${INDICATOR_ORDER.map((k) =>
        kpiCard(
          INDICATORS[k].label,
          formatValue(k, valueAt(c, k, latest)),
          INDICATORS[k].unit + ' · WDI ' + latest,
        ),
      ).join('')}
    </div>
  </section>

  <section class="card chart-card">
    <h2>${esc(ind.label)} over time</h2>
    <p class="card-sub">${esc(ind.blurb)} Source: ${esc(ind.source)}.</p>
    <div class="controls">
      <label>Indicator <select data-bind="indicator">${indicatorOptions(ui.indicator)}</select></label>
      <label>From <select data-bind="yearFrom">${yearOptions(ui.yearFrom)}</select></label>
      <label>To <select data-bind="yearTo">${yearOptions(ui.yearTo)}</select></label>
    </div>
    ${lineChart([{ label: c.name, color: CHART_COLORS[0], values: valuesSlice }], yearsSlice, { width: 720, height: 300 })}
    <p class="chart-note">From ${YEARS[lo]} to ${YEARS[hi]} the figure moved from
    <strong>${formatValue(ui.indicator, c.series[ui.indicator][lo])}</strong> to
    <strong>${formatValue(ui.indicator, c.series[ui.indicator][hi])}</strong>
    (${chg === null ? '—' : fmtSigned(chg, 1) + '%'}).</p>
  </section>

  <section class="two-col">
    <div class="card">
      <h2>Year by year: ${esc(ind.label)}</h2>
      <p class="card-sub">Unit: ${esc(ind.unit)}. Source: ${esc(ind.source)}.</p>
      <table class="data-table">
        <thead><tr><th>Year</th><th>Value</th><th>Change</th></tr></thead>
        <tbody>${tableRows}</tbody>
      </table>
    </div>
    <div class="card">
      <h2>Compare ${esc(c.name)} with</h2>
      <p class="card-sub">The three richest countries per person in ${latest} (GDP per capita, current US$).</p>
      <ol class="rank-list">
        ${peers
          .map(
            (r) =>
              `<li><a href="#/country/${r.country.code}">${esc(r.country.name)}</a> <strong>${fmtMoney(r.value)}</strong> <a class="small-link" href="#/compare?c=${c.code},${r.country.code}">compare →</a></li>`,
          )
          .join('')}
      </ol>
      <p><a class="btn" href="#/compare">Open the comparison tool</a></p>
    </div>
  </section>
  ${sourceLine()}`;
}

// ---- Compare ---------------------------------------------------------------

export function renderCompare() {
  const latest = latestYear();
  const ind = INDICATORS[ui.compareIndicator];
  const picked = ui.compare.map((code) => countryByCode(code)).filter(Boolean);
  const desc = !['unemployment', 'co2_pc', 'inflation'].includes(ui.compareIndicator);

  const barRows = rankCountries(ui.compareIndicator, latest, desc)
    .filter((r) => picked.some((p) => p.code === r.country.code))
    .map((r, i) => ({
      label: r.country.name,
      value: r.value,
      color: CHART_COLORS[picked.findIndex((p) => p.code === r.country.code) % CHART_COLORS.length],
    }));

  const lineSeries = picked.map((c, i) => ({
    label: c.name,
    color: CHART_COLORS[i % CHART_COLORS.length],
    values: c.series[ui.compareIndicator],
  }));

  const tableRows = YEARS.map((y) => {
    const cells = picked
      .map((c) => `<td>${formatValue(ui.compareIndicator, valueAt(c, ui.compareIndicator, y))}</td>`)
      .join('');
    return `<tr><td>${y}</td>${cells}</tr>`;
  }).join('');

  return `
  <section class="hero">
    <h1>Compare countries</h1>
    <p class="lede">Pick up to three countries and one indicator. The bars rank them in
    ${latest}; the chart and table show the full 2015–2023 story.</p>
  </section>

  <section class="card">
    <div class="controls">
      <label>Country 1 <select data-bind="compare0">${countryOptions(ui.compare[0])}</select></label>
      <label>Country 2 <select data-bind="compare1">${countryOptions(ui.compare[1])}</select></label>
      <label>Country 3 <select data-bind="compare2">${countryOptions(ui.compare[2])}</select></label>
      <label>Indicator <select data-bind="compareIndicator">${indicatorOptions(ui.compareIndicator)}</select></label>
    </div>
    <p class="card-sub">${esc(ind.blurb)} Unit: ${esc(ind.unit)}. Source: ${esc(ind.source)}.</p>
  </section>

  <section class="two-col">
    <div class="card chart-card">
      <h2>${esc(ind.label)} in ${latest}</h2>
      ${barChart(barRows, { width: 640 })}
      <div class="legend">${picked.map((c, i) => `<span><i style="background:${CHART_COLORS[i % CHART_COLORS.length]}"></i>${esc(c.name)}</span>`).join('')}</div>
    </div>
    <div class="card chart-card">
      <h2>${esc(ind.label)}, 2015–2023</h2>
      ${lineChart(lineSeries, YEARS, { width: 640, height: 300 })}
      <div class="legend">${lineSeries.map((s) => `<span><i style="background:${s.color}"></i>${esc(s.label)}</span>`).join('')}</div>
    </div>
  </section>

  <section class="card">
    <h2>Values by year</h2>
    <table class="data-table">
      <thead><tr><th>Year</th>${picked.map((c) => `<th>${esc(c.name)}</th>`).join('')}</tr></thead>
      <tbody>${tableRows}</tbody>
    </table>
    <p class="card-sub">Unit: ${esc(ind.unit)}. Source: ${esc(ind.source)}.</p>
  </section>
  ${sourceLine()}`;
}

// ---- Indicators ------------------------------------------------------------

export function renderIndicators() {
  const latest = latestYear();
  const cards = INDICATOR_ORDER.map((k) => {
    const ind = INDICATORS[k];
    const desc = !['unemployment', 'co2_pc', 'inflation'].includes(k);
    const top = rankCountries(k, latest, desc).slice(0, 5);
    return `<article class="card indicator-card">
      <h2>${esc(ind.label)}</h2>
      <p>${esc(ind.blurb)}</p>
      <p class="card-sub">Unit: ${esc(ind.unit)} · Source: ${esc(ind.source)} · Latest year ${latest}</p>
      <ol class="rank-list">
        ${top
          .map(
            (r, i) =>
              `<li><span class="rank-num">${i + 1}</span> <a href="#/country/${r.country.code}">${esc(r.country.name)}</a> <strong>${formatValue(k, r.value)}</strong></li>`,
          )
          .join('')}
      </ol>
      <p><a href="#/compare">Compare this indicator →</a></p>
    </article>`;
  }).join('');

  return `
  <section class="hero">
    <h1>Indicators</h1>
    <p class="lede">Eight indicators, each with its definition, unit, source and the
    top five countries in ${latest}. Every figure on this site comes from the
    World Bank's World Development Indicators.</p>
  </section>
  <section class="indicator-grid">${cards}</section>
  ${sourceLine()}`;
}

// ---- About -----------------------------------------------------------------

export function renderAbout() {
  return `
  <section class="hero">
    <h1>About NusaStat</h1>
    <p class="lede">NusaStat is an independent statistics explorer. It is not affiliated
    with the World Bank or any government — it simply gathers their published
    figures into one readable place.</p>
  </section>

  <section class="card prose">
    <h2>What this site does</h2>
    <p>Each country profile shows eight headline indicators for 2015–2023:
    population, GDP per capita, life expectancy, unemployment, internet use,
    CO2 emissions per person, GDP growth and inflation. The comparison tool
    puts up to three countries side by side on any indicator, and the
    indicators page ranks every country on each measure.</p>
    <h2>Where the numbers come from</h2>
    <p>All figures are from the World Bank's <strong>World Development
    Indicators (WDI)</strong>, the Bank's primary collection of development
    data, compiled from national statistical offices and international
    agencies. Each indicator on this site names its WDI series code — for
    example population is SP.POP.TOTL and GDP per capita is NY.GDP.PCAP.CD —
    so any figure can be checked against the source. Figures are rounded for
    display; the underlying values are the Bank's published annual estimates.
    Data on this site was last updated ${esc(DATA_UPDATED)} and covers years
    2015–2023, the latest complete year in WDI at the time of writing.</p>
    <h2>How to read the charts</h2>
    <p>Line charts show the selected indicator across the chosen year range;
    the note under each chart states the change from the first to the last
    year shown. Bar charts rank the selected countries in the latest year.
    Tables list every year with the change from the previous year, so a dip
    such as the 2020 pandemic year is visible rather than hidden.</p>
    <h2>Limitations</h2>
    <ul>
      <li>Figures are national estimates; methods differ between countries, so small differences between neighbours should not be over-read.</li>
      <li>Unemployment follows the ILO modelled estimate, which is comparable across countries but differs from some national headline rates.</li>
      <li>Life expectancy and internet use are estimates for the year shown, not census counts.</li>
      <li>Values are rounded to one decimal place; totals may not add exactly.</li>
    </ul>
    <h2>How the site works</h2>
    <p>NusaStat is a static site: all data ships with the page, nothing is
    fetched from the network, and it works offline once loaded. It runs the
    same on a desktop and on a phone.</p>
  </section>
  ${sourceLine()}`;
}

// ---- Controls --------------------------------------------------------------

// Called by main.js when a control inside #app changes. Updates `ui` and
// reports whether the current route should be re-rendered.
export function handleControl(el) {
  const bind = el.getAttribute('data-bind');
  if (!bind) return false;
  if (bind === 'search') {
    ui.search = el.value;
    return true;
  }
  if (bind === 'country') {
    ui.country = el.value;
    location.hash = '#/country/' + el.value;
    return false;
  }
  if (bind === 'indicator') {
    ui.indicator = el.value;
    return true;
  }
  if (bind === 'yearFrom') {
    ui.yearFrom = Number(el.value);
    return true;
  }
  if (bind === 'yearTo') {
    ui.yearTo = Number(el.value);
    return true;
  }
  if (bind === 'compareIndicator') {
    ui.compareIndicator = el.value;
    return true;
  }
  if (bind === 'compare0' || bind === 'compare1' || bind === 'compare2') {
    ui.compare[Number(bind.slice(-1))] = el.value;
    return true;
  }
  return false;
}

export function fmtMoneyExport(v) {
  return fmtMoney(v);
}
export { fmtCompact };
