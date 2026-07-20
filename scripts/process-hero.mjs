// Hero asset pipeline (final): flat-#14140F-background edit from nano banana.
// No matte needed — the background matches the page color. We bake a soft
// alpha fade on top/left/right edges so no rectangle seam can ever show,
// re-measure the screen rect on this exact image, and encode to budget.
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const S = '/private/tmp/claude-501/-Users-sarmueil-Desktop-vixa-ai-page/78ed05c3-66cc-4b51-a60f-46eec59a2c7c/scratchpad';
const SRC = `${S}/hero-titanium.png`; // 1792x2400 RGB — titanium frame + Dynamic Island
const OUT = '/Users/sarmueil/Desktop/vixa-ai-page/public';

const TARGET_W = 1400; // 2x export per §4

const resized = sharp(SRC).resize(TARGET_W);
const { data, info } = await resized.clone().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;
console.log(`resized: ${W}x${H}x${C}`);

// --- 1. Screen rect via seed-expand on near-black pixels
const dark = (x, y) => {
  const i = (y * W + x) * C;
  return data[i] < 38 && data[i + 1] < 38 && data[i + 2] < 38;
};
const seedY = Math.round(H * 0.38), seedX = Math.round(W * 0.52);
const rowOk = (y, x0, x1) => {
  let ok = 0, n = 0;
  for (let x = x0; x <= x1; x += 2) { n++; if (dark(x, y)) ok++; }
  return ok / n > 0.95;
};
const colOk = (x, y0, y1) => {
  let ok = 0, n = 0;
  for (let y = y0; y <= y1; y += 2) { n++; if (dark(x, y)) ok++; }
  return ok / n > 0.95;
};
// phase 1: walk the seed row to find the screen's horizontal span
let left = seedX, right = seedX;
while (left > 0 && dark(left - 1, seedY)) left--;
while (right < W - 1 && dark(right + 1, seedY)) right++;
// phase 2: expand vertically over that span, then refine horizontally, twice
let top = seedY, bottom = seedY;
for (let round = 0; round < 4; round++) {
  const p = [top, bottom, left, right].join();
  while (top > 0 && rowOk(top - 1, left + 8, right - 8)) top--;
  while (bottom < H - 1 && rowOk(bottom + 1, left + 8, right - 8)) bottom++;
  while (left > 0 && colOk(left - 1, top + 8, bottom - 8)) left--;
  while (right < W - 1 && colOk(right + 1, top + 8, bottom - 8)) right++;
  if (p === [top, bottom, left, right].join()) break;
}
// Titanium image: verify auto-detected edges with profile scans before
// trusting them (see scan output below).
console.log(`auto-detected rect: x ${left}..${right}, y ${top}..${bottom}`);
const scanRow = (y, x0, x1) => {
  let out = [], prev = null;
  for (let x = x0; x <= x1; x++) {
    const i = (y * W + x) * C;
    const l = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
    if (prev !== null && Math.abs(l - prev) > 14) out.push(`${x}:${prev}->${l}`);
    prev = l;
  }
  return out.join(' ');
};
console.log('ROW y=700 x 380..1080 |', scanRow(700, 380, 1080));
// per-row dark counts near the bottom corners
for (let y = Math.round(H * 0.72); y <= Math.round(H * 0.82); y += 6) {
  let n = 0;
  for (let x = left; x <= right; x++) if (dark(x, y)) n++;
  console.log('rowdark', y, n);
}
// hand-verified: auto top (378) sat below the baked Dynamic Island; the true
// glass tangent is ~358, so the DOM thread fully covers the baked island
top = 358;
const radius = 58;
console.log(`screen rect (verified): x ${left}..${right} (${right - left}w), y ${top}..${bottom} (${bottom - top}h), r ${radius}`);

const sr = {
  x: left, y: top, w: right - left, h: bottom - top,
  radius, imgW: W, imgH: H,
  pct: {
    left: +(left / W * 100).toFixed(3), top: +(top / H * 100).toFixed(3),
    width: +((right - left) / W * 100).toFixed(3), height: +((bottom - top) / H * 100).toFixed(3),
  },
};
console.log('SCREEN RECT:', JSON.stringify(sr));
writeFileSync('/Users/sarmueil/Desktop/vixa-ai-page/src/assets/hero-screen-rect.json', JSON.stringify(sr, null, 2));

// --- 2a. Level-match: shift the whole image so the backdrop mean lands
// exactly on #14140F — kills the "own background" panel effect
const patches = [
  [0, 0, 380, 300], [W - 380, 0, 380, 300], [W - 220, 700, 220, 500],
  [Math.round(W * 0.35), 0, Math.round(W * 0.3), 160],
];
let sr_ = 0, sg = 0, sb = 0, n = 0;
for (const [px0, py0, pw, ph] of patches) {
  for (let y = py0; y < py0 + ph; y += 3) {
    for (let x = px0; x < px0 + pw; x += 3) {
      const i = (y * W + x) * C;
      sr_ += data[i]; sg += data[i + 1]; sb += data[i + 2]; n++;
    }
  }
}
const mean = [sr_ / n, sg / n, sb / n];
const TARGET = [20, 20, 15]; // #14140F
const off = TARGET.map((t, k) => t - mean[k]);
console.log(`bg mean rgb(${mean.map((v) => v.toFixed(1)).join(',')}) -> offset [${off.map((v) => v.toFixed(1)).join(',')}]`);

// --- 2b. Bake the §3 olive glow behind the phone INTO the image (a CSS glow
// behind an opaque rectangle would outline the seam), then feather all edges
// the titanium edit ships its own baked halo — only a whisper of extra olive
const GLOW = { cx: (left + right) / 2, cy: (top + bottom) / 2 + 40, r: 520, peak: 0.05 };
const OLIVE = [126, 139, 61];
// feather: opaque core rect, 200px smooth falloff outside it
const CORE = { x0: 150, y0: 270, x1: 1258, y1: H - 1 };
const FEATHER = 200;
const smooth = (t) => t * t * (3 - 2 * t);

const rgba = Buffer.alloc(W * H * 4);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const si = (y * W + x) * C, di = (y * W + x) * 4;
    const d = Math.hypot(x - GLOW.cx, y - GLOW.cy) / GLOW.r;
    const g = d < 1.4 ? Math.exp(-d * d * 2.2) * GLOW.peak : 0;
    for (let k = 0; k < 3; k++) {
      rgba[di + k] = Math.max(0, Math.min(255, Math.round(data[si + k] + off[k] + OLIVE[k] * g)));
    }
    const dx = Math.max(CORE.x0 - x, x - CORE.x1, 0);
    const dy = Math.max(CORE.y0 - y, y - CORE.y1, 0);
    const dist = Math.hypot(dx, dy);
    rgba[di + 3] = Math.round(255 * smooth(Math.max(0, 1 - dist / FEATHER)));
  }
}
const final = sharp(rgba, { raw: { width: W, height: H, channels: 4 } });

// --- 3. Encode to budget
async function fit(fmt, maxKB, qualities) {
  for (const q of qualities) {
    const buf = fmt === 'avif'
      ? await final.clone().avif({ quality: q, effort: 6 }).toBuffer()
      : await final.clone().webp({ quality: q, alphaQuality: 90 }).toBuffer();
    if (buf.length <= maxKB * 1024 || q === qualities[qualities.length - 1]) {
      writeFileSync(`${OUT}/hero-hand-phone.${fmt}`, buf);
      console.log(`${fmt}: q${q} -> ${(buf.length / 1024).toFixed(0)}KB ${buf.length <= maxKB * 1024 ? 'OK' : 'OVER BUDGET'}`);
      return;
    }
  }
}
await fit('avif', 180, [60, 52, 45, 38, 32, 26]);
await fit('webp', 260, [80, 72, 64, 56, 48]);

// --- 4. Debug overlay: lime rect over screen area, on #14140F page background
const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect x="${sr.x}" y="${sr.y}" width="${sr.w}" height="${sr.h}" rx="${sr.radius}"
        fill="rgba(195,224,67,0.28)" stroke="#C3E043" stroke-width="3"/></svg>`;
await sharp({ create: { width: W, height: H, channels: 3, background: '#14140F' } })
  .composite([{ input: await final.clone().png().toBuffer() }, { input: Buffer.from(svg) }])
  .jpeg({ quality: 80 }).toFile(`${S}/hero-screen-rect-debug.jpg`);
console.log('done');
