// NusaStat hand-in program (Node 22, standard library only).
//
// The site lives in app/ beside this file: plain static files a browser
// opens at app/index.html, with no build step and no network request.
// Screenshots of the site live in screenshots/. This program hands both in:
// it copies app/ and screenshots/ to the output directory and writes
// /output/dossier.json with the vendored make.fun library, which is the
// summary the judge reads (screenshots, first-load files and bytes, source).
// Leave vendor/makefun-frontend.ts untouched: the scorer rebuilds the
// dossier with its own copy and requires a byte-for-byte match.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Fail loudly instead of handing in an empty output when app/ is missing.
if (!existsSync(join(here, 'app', 'index.html'))) {
  throw new Error('app/index.html not found next to main.ts; nothing to hand in');
}

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// The scorer's own caps (reference/gate.json): only text_max_bytes shapes
// the bytes; the others refuse an entry the scorer would refuse (more than
// 4 screenshots or one over 256 KiB; more than 993 files and directories in
// app/ or 16 MiB of app files: app/ counts beside /output's own 1000-entry
// cap, its screenshots/ and dossier.json).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
