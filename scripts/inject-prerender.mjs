// Injects the SSR-rendered App into dist/index.html's empty #root.
// Runs after `vite build` + `vite build --ssr src/prerender.tsx`.
import { readFileSync, writeFileSync } from 'node:fs';

const { render } = await import('../dist-ssr/prerender.js');
const html = render();

const file = new URL('../dist/index.html', import.meta.url);
let doc = readFileSync(file, 'utf8');
const marker = '<div id="root"></div>';
if (!doc.includes(marker)) {
  throw new Error('inject-prerender: empty #root marker not found in dist/index.html');
}
doc = doc.replace(marker, `<div id="root">${html}</div>`);
writeFileSync(file, doc);
console.log(`prerender injected: ${(html.length / 1024).toFixed(1)}KB of markup`);
