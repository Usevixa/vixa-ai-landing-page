// Light-theme hero asset.
//
// The alpha-matte route was tried and rejected: segmenting the warm hand off a
// white backdrop left the palm at alpha ~123 (half transparent), so any tint
// bled straight through the skin. Instead the white-backdrop render is used
// as-is, with its backdrop level-matched to pure #FFFFFF and the outer edges
// feathered — exact on the white hero section, and no matte to get wrong.
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const S = '/private/tmp/claude-501/-Users-sarmueil-Desktop-vixa-ai-page/78ed05c3-66cc-4b51-a60f-46eec59a2c7c/scratchpad';
const SRC = `${S}/hero-white.png`;
const OUT = '/Users/sarmueil/Desktop/vixa-ai-page/public';

const TARGET_W = 1400;

const resized = sharp(SRC).removeAlpha().resize(TARGET_W);
const { data, info } = await resized.clone().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;
console.log(`resized: ${W}x${H}x${C}`);

const lum = (x, y) => {
  const i = (y * W + x) * C;
  return 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
};
const dark = (x, y) => {
  const i = (y * W + x) * C;
  return data[i] < 42 && data[i + 1] < 42 && data[i + 2] < 42;
};

// --- backdrop level-match: sample corners, shift so the backdrop lands on pure white
const patches = [
  [0, 0, 260, 220], [W - 260, 0, 260, 220],
  [0, Math.round(H * 0.5), 120, 200], [W - 120, Math.round(H * 0.12), 120, 200],
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
const off = [255 - mean[0], 255 - mean[1], 255 - mean[2]];
console.log(`backdrop mean rgb(${mean.map((v) => v.toFixed(1)).join(',')}) -> offset [${off.map((v) => v.toFixed(1)).join(',')}]`);

// --- subject bbox (anything meaningfully darker than the backdrop)
let minX = W, minY = H, maxX = 0, maxY = 0;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (lum(x, y) < 238) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
console.log(`subject bbox: x ${minX}..${maxX}, y ${minY}..${maxY}`);

// --- screen rect: seed on the glass, walk to the true tangent edges
let seedX = Math.round((minX + maxX) / 2), seedY = Math.round(minY + (maxY - minY) * 0.22);
if (!dark(seedX, seedY)) {
  outer: for (let y = minY; y < maxY; y += 4) {
    for (let x = minX; x < maxX; x += 4) {
      if (dark(x, y)) { seedX = x; seedY = y; break outer; }
    }
  }
}
let left = seedX, right = seedX, top = seedY, bottom = seedY;
while (left > 0 && dark(left - 1, seedY)) left--;
while (right < W - 1 && dark(right + 1, seedY)) right++;
const mx = (left + right) >> 1;
while (top > 0 && dark(mx, top - 1)) top--;
while (bottom < H - 1 && dark(mx, bottom + 1)) bottom++;
const my = (top + bottom) >> 1;
while (left > 0 && dark(left - 1, my)) left--;
while (right < W - 1 && dark(right + 1, my)) right++;
console.log(`screen rect: x ${left}..${right} (${right - left}w), y ${top}..${bottom} (${bottom - top}h)`);

// Corner radius: the row-scan can't see it here (the tangent walk already
// lands on the widest row). Same phone at the same 1400w source scale as the
// titanium render, where 58px was verified against the debug overlay.
const radius = 58;
console.log(`corner radius: ${radius}px (pinned, verified on the shared source)`);

// --- crop: tight to the subject, but keep the bottom edge (arm exits frame)
const padX = 24, padTop = 24;
const cx0 = Math.max(0, minX - padX);
const cy0 = Math.max(0, minY - padTop);
const cx1 = Math.min(W - 1, maxX + padX);
const cy1 = maxY >= H - 4 ? H - 1 : Math.min(H - 1, maxY + padTop);
const cw = cx1 - cx0 + 1, ch = cy1 - cy0 + 1;
console.log(`crop ${cw}x${ch} at (${cx0},${cy0})`);

// --- apply level shift + feather the outer edges into the white page
const FEATHER = 90;
const smooth = (t) => t * t * (3 - 2 * t);
const rgba = Buffer.alloc(cw * ch * 4);
for (let y = 0; y < ch; y++) {
  for (let x = 0; x < cw; x++) {
    const si = ((y + cy0) * W + (x + cx0)) * C;
    const di = (y * cw + x) * 4;
    for (let k = 0; k < 3; k++) {
      rgba[di + k] = Math.max(0, Math.min(255, Math.round(data[si + k] + off[k])));
    }
    // fade top/left/right; bottom stays hard so the arm can run off-frame
    const f = Math.min(x / FEATHER, (cw - 1 - x) / FEATHER, y / FEATHER, 1);
    rgba[di + 3] = Math.round(255 * smooth(Math.max(0, Math.min(1, f))));
  }
}
const final = sharp(rgba, { raw: { width: cw, height: ch, channels: 4 } });

const sr = {
  x: left - cx0, y: top - cy0, w: right - left, h: bottom - top,
  radius, imgW: cw, imgH: ch,
};
sr.pct = {
  left: +(sr.x / cw * 100).toFixed(3), top: +(sr.y / ch * 100).toFixed(3),
  width: +(sr.w / cw * 100).toFixed(3), height: +(sr.h / ch * 100).toFixed(3),
};
console.log('SCREEN RECT:', JSON.stringify(sr));
writeFileSync('/Users/sarmueil/Desktop/vixa-ai-page/src/assets/hero-screen-rect.json', JSON.stringify(sr, null, 2));

async function fit(fmt, maxKB, qualities) {
  for (const q of qualities) {
    const buf = fmt === 'avif'
      ? await final.clone().avif({ quality: q, effort: 6 }).toBuffer()
      : await final.clone().webp({ quality: q, alphaQuality: 90 }).toBuffer();
    if (buf.length <= maxKB * 1024 || q === qualities[qualities.length - 1]) {
      writeFileSync(`${OUT}/hero-hand-phone.${fmt}`, buf);
      console.log(`${fmt}: q${q} -> ${(buf.length / 1024).toFixed(0)}KB ${buf.length <= maxKB * 1024 ? 'OK' : 'OVER'}`);
      return;
    }
  }
}
await fit('avif', 180, [62, 54, 46, 38, 32]);
await fit('webp', 260, [80, 72, 64, 56, 48]);

const svg = `<svg width="${cw}" height="${ch}" xmlns="http://www.w3.org/2000/svg">
  <rect x="${sr.x}" y="${sr.y}" width="${sr.w}" height="${sr.h}" rx="${sr.radius}"
        fill="rgba(31,107,63,0.30)" stroke="#1F6B3F" stroke-width="3"/></svg>`;
await sharp({ create: { width: cw, height: ch, channels: 3, background: '#FFFFFF' } })
  .composite([{ input: await final.clone().png().toBuffer() }, { input: Buffer.from(svg) }])
  .jpeg({ quality: 82 })
  .toFile(`${S}/hero-light-debug.jpg`);
console.log('done');
