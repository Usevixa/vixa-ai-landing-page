

## Plan: Redesign Hero Background — Cinematic African Urban Life

### Overview
Replace the single static background image with a rich, layered composition: a desaturated urban African lifestyle photo, warm gradient overlays for text readability, subtle animated financial/chat overlays (ghost chat bubbles, flowing money-movement lines, pulsing activity nodes), slow parallax motion, and a radial glow behind the phone mockup. Layout, text, and chat demo remain untouched.

### Changes

**1. Generate new hero background image (`src/assets/hero-bg.jpg`)**
- Use AI image generation (Nano banana 2) to create a cinematic, warm-toned image of African urban life: people on smartphones in a modern market/street setting, natural light, slightly desaturated, editorial feel
- Prompt focus: "African young adults using smartphones in a vibrant modern urban market, warm golden hour light, shallow depth of field, cinematic editorial style, not posed"

**2. Update background layers in `HeroSection.tsx`**
- **Base image**: Apply CSS `filter: saturate(0.85)` for slight desaturation, `opacity-90`
- **Warm gradient overlay**: Replace current dark gradient with a left-to-right warm fade (`bg-gradient-to-r from-[#F7F6F2]/90 via-[#F7F6F2]/40 to-transparent`) for light mode, and `from-black/80 via-black/50 to-transparent` for dark mode — ensures left text area stays clean
- **Subtle dark unifier**: Add a `bg-black/[0.06]` overlay across the full image to unify tones
- **Grain**: Already exists globally; boost to `opacity-0.03` within hero via a local overlay

**3. Add animated background overlay elements (new SVG/CSS layer)**
- **Ghost chat bubbles**: 3-4 faint rounded-rect shapes at 10-12% opacity, positioned around the background, slowly drifting upward with CSS animation (`translateY` over 20s, infinite)
- **Money flow lines**: 2-3 thin curved SVG paths (quadratic bezier) representing cross-Africa movement, animated with `stroke-dashoffset` for a flowing effect, at 8-10% opacity, using primary green color
- **Pulsing activity nodes**: 5-6 small circles at fixed positions, pulsing gently (scale 1→1.3, opacity 0.1→0.2) on staggered 3-4s intervals

**4. Parallax motion**
- Wrap background image in a div that uses `useEffect` + `scroll` listener to apply a subtle `translateY` (0 to -10px based on scroll position) for slow parallax
- Add a very subtle CSS animation on the image: slow `scale(1) → scale(1.02)` over 30s, alternating — gives a "breathing" cinematic feel

**5. Phone mockup glow**
- Add a `div` behind the phone mockup with `bg-primary/10 blur-[80px]` as a soft radial glow, creating visual separation from the background

**6. Backdrop blur on text area**
- Add `backdrop-blur-sm` to the left text column wrapper so the text floats cleanly over the image regardless of what's behind it

**7. CSS additions (`src/index.css`)**
- Add keyframes: `hero-drift` (slow upward float for ghost bubbles), `hero-breathe` (slow scale pulse for bg image), `hero-flow` (stroke-dashoffset animation for money lines)

### Technical Details
- Parallax: `window.addEventListener('scroll', ...)` with `requestAnimationFrame`, applying `transform: translateY(${offset}px)` — capped at 10px shift
- Ghost bubbles: absolute-positioned `div`s with `rounded-2xl bg-white/10 border border-white/5` and CSS animation
- Flow lines: inline SVG `<path>` elements with `stroke-dasharray: 200` and `stroke-dashoffset` animated from 400 to 0 over 8s
- Activity nodes: `div`s with `animate-pulse-dot` (already defined in CSS), positioned absolutely
- Dark/light adaptation: gradient overlay uses a CSS class that changes direction based on `.dark` parent

### Files Modified
- `src/assets/hero-bg.jpg` — regenerated with new prompt
- `src/components/HeroSection.tsx` — background layers restructured, overlay elements added, parallax hook added, phone glow added
- `src/index.css` — new keyframes for hero animations

