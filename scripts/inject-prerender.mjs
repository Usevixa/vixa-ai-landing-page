// Injects each SSR-rendered page into its dist/*.html empty #root.
// Runs after `vite build` + `vite build --ssr src/prerender.tsx`.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const { pages } = await import('../dist-ssr/prerender.js');
const marker = '<div id="root"></div>';

for (const [name, render] of Object.entries(pages)) {
  const file = new URL(`../dist/${name}.html`, import.meta.url);
  if (!existsSync(file)) {
    console.warn(`inject-prerender: dist/${name}.html not found, skipping`);
    continue;
  }
  let doc = readFileSync(file, 'utf8');
  if (!doc.includes(marker)) {
    throw new Error(`inject-prerender: empty #root marker not found in dist/${name}.html`);
  }
  const markup = render();
  doc = doc.replace(marker, `<div id="root">${markup}</div>`);
  writeFileSync(file, doc);
  console.log(`prerender injected: ${name}.html (${(markup.length / 1024).toFixed(1)}KB)`);
}
