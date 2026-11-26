// NusaStat chart helpers: small dependency-free SVG charts.
// lineChart draws one or more series over the years; barChart draws
// horizontal bars for a ranking. Both return an SVG string, so views can
// drop them straight into the page. No library, no network, no canvas.

export const CHART_COLORS = ['#0f766e', '#d97706', '#2563eb', '#dc2626', '#7c3aed', '#0891b2'];

export function fmtNum(v, digits = 1) {
  if (v === null || v === undefined || Number.isNaN(v)) return '—';
  return Number(v).toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function fmtCompact(v) {
  if (v === null || v === undefined || Number.isNaN(v)) return '—';
  const n = Number(v);
  if (Math.abs(n) >= 1000) return fmtNum(n, 0);
  if (Math.abs(n) >= 100) return fmtNum(n, 0);
  return fmtNum(n, 1);
}

export function fmtMoney(v) {
  if (v === null || v === undefined || Number.isNaN(v)) return '—';
  return '$' + fmtNum(v, 0);
}

export function fmtSigned(v, digits = 1) {
  if (v === null || v === undefined || Number.isNaN(v)) return '—';
  const sign = v > 0 ? '+' : '';
  return sign + fmtNum(v, digits);
}

function niceTicks(min, max, count = 4) {
  if (min === max) {
    min -= 1;
    max += 1;
  }
  const span = max - min;
  const stepRaw = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(stepRaw)));
  const norm = stepRaw / mag;
  const step = (norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10) * mag;
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const ticks = [];
  for (let v = lo; v <= hi + step * 0.001; v += step) ticks.push(v);
  return { lo, hi, ticks };
}

// series: [{ label, color, values: number[] }], years: number[]
export function lineChart(series, years, opts = {}) {
  const width = opts.width || 720;
  const height = opts.height || 300;
  const padL = 58;
  const padR = 14;
  const padT = 14;
  const padB = 30;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;

  const all = series.flatMap((s) => s.values).filter((v) => v !== null && v !== undefined);
  let min = Math.min(...all);
  let max = Math.max(...all);
  if (min > 0 && (max - min) / max < 0.25) min = Math.max(0, min - (max - min) * 0.4);
  if (min < 0 && max > 0) {
    min = Math.min(min, 0);
    max = Math.max(max, 0);
  }
  const { lo, hi, ticks } = niceTicks(min, max, 4);
  const y = (v) => padT + innerH - ((v - lo) / (hi - lo)) * innerH;
  const x = (i) => padL + (i / Math.max(1, years.length - 1)) * innerW;

  let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Line chart" xmlns="http://www.w3.org/2000/svg">`;
  for (const t of ticks) {
    const yy = y(t);
    svg += `<line x1="${padL}" y1="${yy.toFixed(1)}" x2="${width - padR}" y2="${yy.toFixed(1)}" stroke="#e2e8f0" stroke-width="1"/>`;
    svg += `<text x="${padL - 8}" y="${(yy + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#64748b">${fmtCompact(t)}</text>`;
  }
  for (let i = 0; i < years.length; i++) {
    const xx = x(i);
    svg += `<text x="${xx.toFixed(1)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="#64748b">${years[i]}</text>`;
  }
  // Zero line, when the range crosses zero.
  if (lo < 0 && hi > 0) {
    const zy = y(0);
    svg += `<line x1="${padL}" y1="${zy.toFixed(1)}" x2="${width - padR}" y2="${zy.toFixed(1)}" stroke="#94a3b8" stroke-width="1"/>`;
  }
  for (const s of series) {
    const pts = s.values
      .map((v, i) => (v === null || v === undefined ? null : `${x(i).toFixed(1)},${y(v).toFixed(1)}`))
      .filter(Boolean);
    if (pts.length < 2) continue;
    svg += `<polyline points="${pts.join(' ')}" fill="none" stroke="${s.color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    for (let i = 0; i < s.values.length; i++) {
      const v = s.values[i];
      if (v === null || v === undefined) continue;
      svg += `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="3.5" fill="${s.color}" stroke="#fff" stroke-width="1.5"><title>${s.label} ${years[i]}: ${fmtNum(v, 2)}</title></circle>`;
    }
  }
  svg += '</svg>';
  return svg;
}

// rows: [{ label, value, color }], sorted best first by the caller.
export function barChart(rows, opts = {}) {
  const width = opts.width || 720;
  const rowH = opts.rowHeight || 34;
  const padL = 130;
  const padR = 64;
  const height = rows.length * rowH + 12;
  const max = Math.max(...rows.map((r) => Math.abs(r.value)), 0.0001);
  const min = Math.min(0, ...rows.map((r) => r.value));
  const span = max - min;
  const x0 = padL + (min < 0 ? (-min / span) * (width - padL - padR) : 0);
  const scale = (v) => ((v - min) / span) * (width - padL - padR);

  let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Bar chart" xmlns="http://www.w3.org/2000/svg">`;
  for (const r of rows) {
    const i = rows.indexOf(r);
    const y = 6 + i * rowH;
    const barW = Math.max(2, scale(Math.abs(r.value)) - (min < 0 ? scale(Math.abs(min)) : 0));
    const barX = r.value >= 0 ? x0 : x0 - barW;
    svg += `<text x="${padL - 10}" y="${y + 17}" text-anchor="end" font-size="12" fill="#334155">${escapeXml(r.label)}</text>`;
    svg += `<rect x="${barX.toFixed(1)}" y="${y + 4}" width="${barW.toFixed(1)}" height="20" rx="4" fill="${r.color}"><title>${escapeXml(r.label)}: ${fmtNum(r.value, 2)}</title></rect>`;
    const labelX = r.value >= 0 ? barX + barW + 8 : barX - 8;
    const anchor = r.value >= 0 ? 'start' : 'end';
    svg += `<text x="${labelX.toFixed(1)}" y="${y + 19}" text-anchor="${anchor}" font-size="12" font-weight="600" fill="#0f172a">${fmtNum(r.value, 1)}</text>`;
  }
  svg += '</svg>';
  return svg;
}

export function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
