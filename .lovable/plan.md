

## Plan: Add Light/Dark Theme Toggle (Sekiapp-style)

### What You Get
A smooth toggle switch in the navbar that switches the entire site between a light cream theme and the current dark theme. All text remains fully visible in both modes — no text disappearing against matching backgrounds.

### Changes

**1. Add light theme CSS variables (`src/index.css`)**
- Current `:root` becomes the dark theme (move under `.dark` class)
- New `:root` gets light theme values:
  - Background: warm off-white (`60 20% 96%`)
  - Foreground: near-black (`220 20% 10%`)
  - Card: white (`0 0% 100%`)
  - Muted-foreground: medium gray (readable on light)
  - Primary stays lime-green but with dark foreground text
  - Border: light gray
  - vixa-green stays the same
- Grain overlay opacity adapts (lighter in light mode)

**2. Create `ThemeProvider` context (`src/contexts/ThemeContext.tsx`)**
- React context with `theme` state (`"light" | "dark"`)
- Toggles `.dark` class on `<html>` element
- Persists choice to `localStorage`
- Defaults to dark (current look)

**3. Add toggle to navbar (`src/pages/Index.tsx`)**
- Sekiapp-style: a small sun/moon icon toggle switch placed between nav links and "Get Started" button
- Uses the existing `Switch` component from `src/components/ui/switch.tsx`
- Smooth transition on background/foreground color changes via CSS `transition` on `body`

**4. Ensure all components stay readable in both themes**
- Components already use semantic tokens (`text-foreground`, `bg-background`, `text-muted-foreground`, `bg-card`, `border-border`) so they auto-adapt
- Hardcoded colors to audit and fix:
  - `HeroSection`: `bg-primary/[0.04]` blurs — fine in both
  - `AfricaNetwork`: SVG fills use hex colors — update stroke/fill to use CSS variables or ensure contrast
  - `bg-vixa-green` chat bubbles — works on both
  - `bg-secondary` elements — will adapt via variables
- Add `transition-colors duration-300` to the root `<div>` for smooth switching

**5. Tailwind config (`tailwind.config.ts`)**
- Already has `darkMode: ["class"]` — no change needed

### Technical Details
- Theme toggle: adds/removes `dark` class on `<html>`
- CSS structure: `:root` = light defaults, `.dark` = dark overrides (standard shadcn pattern)
- No text will disappear because all text uses `text-foreground` / `text-muted-foreground` which flip with the theme
- Africa map SVG: update the silhouette fill and stroke colors to use `currentColor` or CSS custom properties so they adapt

