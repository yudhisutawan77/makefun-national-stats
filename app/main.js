// NusaStat router: hash routes, no framework. Routes:
//   #/                 home, country grid + featured stats
//   #/country/<CODE>   one country's profile, charts and tables
//   #/compare          up to three countries side by side
//   #/indicators       the eight indicators and their top fives
//   #/about            sources, method and limitations
// Controls inside #app re-render the current route through views.js.

import { renderHome, renderCountry, renderCompare, renderIndicators, renderAbout, handleControl, ui } from './views.js';

const app = document.getElementById('app');
const navLinks = Array.from(document.querySelectorAll('[data-nav]'));

function parseHash() {
  const raw = location.hash.replace(/^#\/?/, '');
  const [path, query] = raw.split('?');
  const parts = path.split('/').filter(Boolean);
  return { parts, query: new URLSearchParams(query || '') };
}

function route() {
  const { parts, query } = parseHash();
  let html;
  let active = 'home';

  if (parts.length === 0) {
    html = renderHome();
  } else if (parts[0] === 'country' && parts[1]) {
    ui.country = parts[1].toUpperCase();
    html = renderCountry(ui.country);
    active = 'country';
  } else if (parts[0] === 'compare') {
    const picks = query.get('c');
    if (picks) {
      const codes = picks.split(',').map((s) => s.trim().toUpperCase()).filter(Boolean).slice(0, 3);
      if (codes.length) {
        while (codes.length < 3) codes.push(codes[0]);
        ui.compare = codes;
      }
    }
    html = renderCompare();
    active = 'compare';
  } else if (parts[0] === 'indicators') {
    html = renderIndicators();
    active = 'indicators';
  } else if (parts[0] === 'about') {
    html = renderAbout();
    active = 'about';
  } else {
    html = renderHome();
  }

  app.innerHTML = html;
  for (const link of navLinks) {
    link.classList.toggle('active', link.getAttribute('data-nav') === active);
  }
  window.scrollTo(0, 0);
}

app.addEventListener('change', (event) => {
  const el = event.target;
  if (handleControl(el)) route();
});

app.addEventListener('input', (event) => {
  const el = event.target;
  if (el.getAttribute('data-bind') === 'search') {
    // Re-render on input, but keep the caret in the search box.
    const pos = el.selectionStart;
    ui.search = el.value;
    route();
    const box = document.getElementById('search');
    if (box) {
      box.focus();
      box.setSelectionRange(pos, pos);
    }
  }
});

window.addEventListener('hashchange', route);
route();
