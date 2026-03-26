

## Plan: Revamp Hero with Background Image + Interactive Demo

### What You Get
A stunning hero section with a cinematic African cityscape/nature background image, a dark overlay for text contrast, and an embedded interactive chat demo showing how VIXA works — all while keeping both light/dark themes working.

### Changes

**1. Background Image (`src/components/HeroSection.tsx`)**
- Add a high-quality Unsplash image of an African cityscape/landscape as a full-bleed background (`object-cover`, `absolute inset-0`)
- Layer a dark gradient overlay on top (`bg-gradient-to-b from-black/70 via-black/50 to-background`) so text remains crisp in both themes
- Remove the current abstract gradient blurs and grid-overlay
- Add a subtle parallax feel via CSS `background-attachment: fixed` on desktop

**2. Embedded Interactive Demo in Hero**
- Replace the right-side floating notification cards with a live WhatsApp-style chat demo widget
- The demo auto-plays a 3-step transaction sequence:
  1. User types: "Send 50 USDT to Kenya"
  2. VIXA AI replies: "50 USDT ≈ 6,450 KES via M-Pesa. Reply PIN to confirm."
  3. User sends: "1234"
  4. VIXA AI: "Done! Sent to +254****. Ref: VX-8291"
- Each message appears with a typing indicator and staggered timing (500ms user → 800ms typing dots → AI reply)
- The widget has a phone-frame look: rounded corners, status bar, WhatsApp-green header bar with "VIXA AI" title
- On mobile (below `lg`), the demo appears below the headline text instead of hidden

**3. Hero Text Adjustments**
- Force hero text to white (`text-white`) since it's now over an image — bypasses theme color tokens for this section only
- Subtitle and tagline also forced white with slight opacity for hierarchy
- CTA button stays lime-green (`bg-primary`) — high contrast on the dark image overlay
- Marquee bar at bottom: semi-transparent dark background strip so it reads over the image edge

**4. Keep Marquee**
- Marquee stays at the bottom of the hero
- Add `bg-background/80 backdrop-blur-sm` to the marquee strip for readability over the background image

### Technical Details
- Background image: `https://images.unsplash.com/photo-1611348586804-61bf6c080437?auto=format&fit=crop&w=2400&q=80` (Nairobi skyline) — fetched lazily with `loading="eager"` since it's hero
- Chat demo uses local state + `useEffect` timers (no external deps), similar pattern to existing `LiveChatDemo` component
- Phone frame: a `div` with `rounded-[2rem] border-[6px] border-white/10 bg-black/80 backdrop-blur-md shadow-2xl` containing the chat sequence
- Mobile: demo stacks below text with `max-w-[340px] mx-auto`
- All other hero content (tagline, subtitle, CTA) uses `text-white` and `text-white/70` to ensure visibility regardless of theme

### Files Modified
- `src/components/HeroSection.tsx` — full rewrite

