

## Plan: Beautify Statement Block + Revamp Why VIXA with Word-by-Word Bold Effect

### 1. Statement Block ("Africa doesn't need another app")

**Current**: Plain centered text with basic fade-up animation.

**Upgrade**:
- Add a subtle radial gradient glow behind the text (primary green, very low opacity ~5-8%) that pulses slowly
- Add a decorative horizontal line element above and below the text block (thin, `border-primary/20`, max-width 120px, centered)
- "Africa doesn't need another app." stays `text-foreground` (works in both themes)
- "It needs execution." gets a subtle animated gradient text effect: `bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent` with a slow shimmer
- Add a faint decorative pattern or subtle dot grid behind the section (low opacity, theme-adaptive)
- Increase vertical spacing slightly for more breathing room
- Both light and dark mode: foreground text auto-adapts via semantic tokens; the green accent provides contrast in both

### 2. Why VIXA Section — Onboard-style Word-by-Word Bold

**Current**: Scroll-driven line-by-line opacity reveal. Each full line goes bold.

**New interaction model** (inspired by Onboard's "Why Onboard"):
- All text is displayed as a single flowing paragraph/block of words
- Each word starts at low opacity (`text-muted-foreground/30`) and normal weight
- As user scrolls, words progressively "light up" — becoming **bold** (`font-weight: 700`) and full opacity (`text-foreground`) one word at a time
- On hover, individual words also light up on cursor contact
- Words that have been "passed" by scroll stay at medium opacity (`text-foreground/60`, `font-weight: 600`)
- Uses `font-variation-settings` for smooth weight interpolation (Space Grotesk variable font already loaded)

**Layout changes**:
- Remove the 3 scene components (SceneA, SceneB, SceneC) — they add complexity without matching the new interaction model
- Single-column centered layout with the word cloud taking full width
- "WHY VIXA." heading stays bold and uppercase above
- Below the word block, add a single subtle accent element: a small animated line or primary-colored dot

**Technical approach**:
- Split all lines into a flat array of words with sentence boundary markers
- Track scroll progress to calculate `activeWordIndex`
- Each word rendered as an inline `<span>` with:
  - `transition: font-variation-settings 0.3s, opacity 0.3s, color 0.3s`
  - `font-variation-settings: "wght" 300` (inactive) vs `"wght" 700` (active)
  - `onMouseEnter` handler to temporarily bold on hover
- Sticky scroll behavior retained (`lg:h-[200vh]` with `sticky top-0`)
- Mobile: all words visible at medium weight, no scroll interaction

**Theme adaptation**:
- Active words: `text-foreground` (near-black in light, warm-white in dark)
- Inactive words: `text-muted-foreground/30` (adapts automatically)
- Past words: `text-foreground/60`

### Files Modified
- `src/components/StatementBlock.tsx` — decorative elements, gradient text, glow
- `src/components/WhyVixa.tsx` — full rewrite: word-by-word bold interaction, remove scenes, centered layout

