

## Plan: Align Landing Page to Spec (Gap Fix)

Most of the page structure already exists but has several mismatches with the spec. Here are the specific changes needed:

### 1. `src/pages/Index.tsx` — Fix section order, add StatementBlock, remove ImageStrip, add alternating backgrounds

Current order: Hero → WhyVixa → HowItWorks → IntelligenceStack → AfricaNetwork → ImageStrip → SafetyEngine → LiveChatDemo → FinalCTA

**Correct order per spec:**
Hero → StatementBlock → WhyVixa → AfricaNetwork → HowItWorks → SafetyEngine → IntelligenceStack → LiveChatDemo → FinalCTA

- Import and add `StatementBlock` after Hero
- Remove `ImageStrip` import and usage
- Apply alternating background tints: `#F7F6F2` / `#F3F2ED` / `#FFFFFF` via inline styles or utility classes on wrapper divs

### 2. `src/components/StatementBlock.tsx` — Fix copy

Change text from "Built for Africa. Not adapted for Africa." to:
- "Africa doesn't need another app."
- "It needs execution."
- Remove the `<span className="text-primary">` coloring — just plain bold black text

### 3. `src/components/WhyVixa.tsx` — Fix line text

Change "VIXA makes chat become execution." → "VIXA turns chat into execution."
Change "Apps are optional — WhatsApp is universal." → "Apps are optional — WhatsApp is everywhere."
Change "And every movement is PIN-confirmed." → "And every move is PIN-confirmed."

### 4. `src/components/AfricaNetwork.tsx` — Make full-width

Change `max-w-sm` → `max-w-3xl` and remove container constraint so the map feels continental-scale. Update title/subtext to match spec exactly.

### 5. `src/components/IntelligenceStack.tsx` — Fix layer 04

Change "Execution Layer" → "Settlement Rails"
Change description to "Stablecoin core connected to local banks and mobile money."
Update subtext to "Four layers working quietly behind every message."

### 6. `src/components/LiveChatDemo.tsx` — Fix headline

Change "See it in action." → "Built for real life — not demos."

### 7. `src/components/FinalCTA.tsx` — Fix button text and styling

Change button text "Launch VIXA on WhatsApp" → "Enter the VIXA Network"
Add inner shadow, subtle glow on hover, 1.03x scale on hover (no bounce)

### 8. `src/index.css` — Minor tweaks

Ensure alternating section utility classes exist for `#F7F6F2`, `#F3F2ED`, `#FFFFFF`.

