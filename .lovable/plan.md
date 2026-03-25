
Goal: remove the visible empty gap after the “Why VIXA” section while preserving the section’s narrative effect.

1) Diagnose and target the real source of spacing
- The gap is primarily from `WhyVixa` using a fixed sticky viewport section (`height: 130vh` + `h-screen`), especially at the current viewport width (889px) where the right visual is hidden (`hidden lg:flex`), making the extra sticky scroll feel like empty space.
- Secondary contribution: `AfricaNetwork` starts with additional internal top spacing (`mt-8` before the map block).

2) Tighten `WhyVixa` transition behavior (`src/components/WhyVixa.tsx`)
- Keep sticky storytelling on desktop only.
- Make tablet/mobile non-sticky (normal flow), so it doesn’t reserve viewport-height scroll space when the right-side visual is hidden.
- Replace hardcoded inline height with responsive classes:
  - Desktop (`lg`): keep a controlled sticky height (reduced from current value).
  - Below `lg`: remove sticky lock and use compact vertical padding.
- Reduce dead-tail scroll by normalizing progress so line/scene progression completes before section end (no long static phase).

3) Reduce top air in coverage section (`src/components/AfricaNetwork.tsx`)
- Tighten section intro spacing:
  - Reduce/remove the `mt-8` gap above the SVG map block.
  - Slightly reduce section bottom padding so spacing rhythm stays dense and consistent.

4) Keep page wrappers clean (`src/pages/Index.tsx`)
- Verify `#whyvixa` and `#coverage` wrappers introduce no extra spacing (no added margins/padding around those wrappers).

5) Fix blocking TypeScript errors while applying this pass
- `src/components/SafetyEngine.tsx`: replace `NodeJS.Timeout[]` with browser-safe timer types (`ReturnType<typeof setTimeout>[]`).
- `src/components/LiveSimulation.tsx`: same timer typing update.
- This removes `Cannot find namespace 'NodeJS'` and keeps the build green.

Technical details
- Sticky behavior pattern:
  - Desktop: `lg:sticky lg:top-0 lg:h-screen`
  - Mobile/tablet: normal flow (`relative`, no sticky, compact `py-*`)
- Progress normalization example:
  - `normalized = Math.min(1, scrollProgress / 0.82)` then use `normalized` for active line/scene.
- Spacing tuning targets:
  - Why VIXA should hand off immediately to “Local rails. Intelligent execution.” with no perceived blank band at 889x488 and standard desktop widths.

Validation
- Scroll from Why VIXA → Coverage at 889x488: no empty block between sections.
- Repeat at desktop width (>=1024): sticky narrative still feels intentional.
- Confirm no TS build errors from timer types.
