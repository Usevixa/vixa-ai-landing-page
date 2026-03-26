

## Plan: Update Hero Section Text Content

### What Changes
Update the hero text content in `src/components/HeroSection.tsx` to match the new copy. No layout or styling changes — just text replacements.

### Content Updates

1. **Tagline** (line 123): stays "Africa's Financial Intelligence Layer" ✓ (already correct)
2. **Headline** (lines 131-136): stays "AI For / African / Money." ✓ (already correct)
3. **Subtitle** (lines 145-147): Replace current two-line text with:
   - Line 1: "Send money like you send a message."
   - Line 2: "Buy, sell, swap, or move crypto across Africa — VIXA handles the execution securely."
4. **Add action tags** below the subtitle (before the CTA button): A row of pill-style tags or a simple text line showing "Send • Receive • Buy • Sell • Swap • Cross-border"

### Technical Details
- File: `src/components/HeroSection.tsx`
- Lines 139-148: update the subtitle `<motion.p>` content
- Add a new `<motion.div>` after the subtitle with the action items as inline text with bullet separators, styled as `text-xs uppercase tracking-wider text-muted-foreground`

