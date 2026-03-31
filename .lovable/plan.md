

## Plan: Beautify the Entire Page — Animations, Text Styling & Visual Polish

### Overview
Upgrade every section with richer animations, better text treatments, subtle decorative elements, and hover interactions — while keeping the brand identity (bold, premium, African fintech) consistent across light and dark modes.

### Changes by Section

**1. Statement Block (`StatementBlock.tsx`)**
- Add a pulsing radial glow behind the text (`bg-primary/[0.04] blur-[100px]`)
- Add thin decorative lines above and below text (80px wide, `border-primary/20`)
- "It needs execution." gets animated gradient text shimmer using `bg-clip-text text-transparent` with a moving `background-position`
- Staggered word-by-word reveal animation for the heading using framer-motion

**2. Why VIXA (`WhyVixa.tsx`)**
- Convert line-by-line bold to **word-by-word** bold on scroll (Onboard.xyz style)
- Each word rendered as inline `<span>` with smooth `font-variation-settings` transition (wght 400→700)
- Active word = full opacity + bold; past words = 60% opacity + semibold; future = 25% opacity + normal
- Hover on any word also triggers bold effect
- Remove the 3 scene components (SceneA, SceneB, SceneC) — replace with a single flowing text block
- Mobile: all words visible at medium weight, static

**3. How It Works (`HowItWorks.tsx`)**
- Add hover effect on each step card: subtle left border that slides in with primary color
- Step number badge gets a scale + glow animation on hover
- Add a connecting line between steps on desktop (thin primary-colored line with animated dots flowing along it)
- Title text gets `group-hover:translate-x-1` micro-shift

**4. Safety Engine (`SafetyEngine.tsx`)**
- PIN dots section: add a subtle shimmer/pulse ring around the card when all 4 dots fill
- Row items: add an animated checkmark icon that fades in from left on hover
- Add a faint shield icon watermark behind the PIN card at low opacity

**5. Intelligence Stack (`IntelligenceStack.tsx`)**
- Add a vertical connecting line on the left side linking all 4 layers (primary color, thin)
- Each row gets a subtle animated left-border accent that grows on hover
- Layer numbers get a glow effect on hover
- Add staggered entrance: each layer slides in from slightly further right

**6. Live Chat Demo (`LiveChatDemo.tsx`)**
- Cards get a subtle gradient border on hover (primary to transparent)
- Add a soft glow behind each card on hover
- Chat bubbles get slightly more pronounced entrance animation (spring physics)
- Add a "live" indicator dot in each card header that pulses

**7. Final CTA (`FinalCTA.tsx`)**
- Increase the radial glow intensity and add a slow rotation animation to it
- Button gets a subtle shimmer effect (animated gradient overlay)
- Add floating decorative elements: 2-3 tiny primary-colored dots orbiting slowly around the text
- Text entrance: character-by-character stagger for the heading

**8. Navigation (`Index.tsx` nav)**
- Nav links get smooth underline-on-hover animation (scale-x from 0 to 1)
- Add a subtle backdrop filter change on scroll (increase blur as user scrolls)

**9. Footer (`Index.tsx` footer)**
- Add a subtle gradient line above footer (primary fading to transparent on edges)
- Year text uses `tabular-nums` for clean rendering

**10. Global CSS (`index.css`)**
- Add `@keyframes shimmer` for gradient text shimmer effect
- Add `@keyframes float` for subtle floating elements
- Add `.animate-shimmer` and `.animate-float` utility classes

### Technical Details
- Word-by-word bold: split text into flat word array, calculate `activeWordIndex` from scroll progress, each word is `<span style={{ fontVariationSettings: \`"wght" ${weight}\`, transition: "all 0.3s" }}>`
- Gradient text shimmer: `background: linear-gradient(90deg, primary, primary/60, primary)`, `background-size: 200%`, animated `background-position`
- Connecting lines: CSS `::before` pseudo-elements or thin absolute-positioned divs with `bg-primary/20`
- All hover effects use `group` + `group-hover:` pattern for clean Tailwind composition
- Spring animations via framer-motion `type: "spring"` with `stiffness: 200, damping: 20`

### Files Modified
- `src/components/StatementBlock.tsx` — glow, decorative lines, gradient shimmer, word stagger
- `src/components/WhyVixa.tsx` — full rewrite: word-by-word bold interaction
- `src/components/HowItWorks.tsx` — hover effects, connecting line, micro-interactions
- `src/components/SafetyEngine.tsx` — shimmer ring, hover checkmarks, shield watermark
- `src/components/IntelligenceStack.tsx` — vertical line, hover accents, entrance stagger
- `src/components/LiveChatDemo.tsx` — gradient borders, glow, spring animations
- `src/components/FinalCTA.tsx` — rotating glow, shimmer button, floating dots, char stagger
- `src/pages/Index.tsx` — nav underline animation, footer gradient line
- `src/index.css` — new keyframes (shimmer, float), utility classes

