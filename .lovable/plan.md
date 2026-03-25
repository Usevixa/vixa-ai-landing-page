

## Plan: Update Africa Map to Yellow Card Countries + Aesthetic Upgrade

### Country Changes

Yellow Card supports **19 countries**. Compared to current map:
- **Remove**: Ghana (GH), DR Congo (CD) — not in Yellow Card
- **Add**: Ethiopia (ET) — in Yellow Card Payments (Bank Transfer, USD)

### Final 19 Countries (from Yellow Card docs)

| Country | Bank | Mobile | Currency |
|---------|------|--------|----------|
| Benin | - | Mobile Money | XOF |
| Botswana | Bank | Mobile Money | BWP |
| Burkina Faso | - | Coming soon | XOF |
| Cameroon | - | Mobile Money | XAF |
| Congo Brazzaville | - | Mobile Money | XAF |
| Ethiopia | Bank | - | USD |
| Gabon | Bank | Coming soon | XAF |
| Ivory Coast | - | Mobile Money | XOF |
| Kenya | Bank | Mobile Money | KES |
| Mali | - | Coming soon | XOF |
| Malawi | Bank | Mobile Money | MWK |
| Nigeria | Bank | - | NGN |
| Rwanda | Bank | Mobile Money | RWF |
| Senegal | - | Coming soon | XOF |
| South Africa | Bank | - | ZAR |
| Tanzania | Bank | Mobile Money | TZS |
| Togo | - | Mobile Money | XOF |
| Uganda | Bank | Mobile Money | UGX |
| Zambia | - | Mobile Money | ZMW |

### Changes to `src/components/AfricaNetwork.tsx`

1. **Update `countries` array**: Remove Ghana/DR Congo, add Ethiopia (Addis Ababa: lat 9.0249, lon 38.7469). Update bank/mobile flags to match Yellow Card data exactly. Mark Burkina Faso, Gabon, Mali, Senegal with `comingSoon: true` for their "Coming soon" mobile money.

2. **Update `connectionPairs`**: Remove all pairs referencing GH/CD, add connections for Ethiopia (ET connected to KE and UG), rebalance cross-links.

3. **Update `labelOffsets`**: Remove GH/CD entries, add ET entry.

4. **Aesthetic upgrades**:
   - Add a subtle radial gradient fill inside the Africa silhouette (emerald center fading out)
   - Add a dotted grid pattern overlay inside Africa at very low opacity
   - Make connection lines curved (quadratic bezier) instead of straight lines for a more organic feel
   - Add a subtle inner glow/shadow on the Africa outline
   - Improve tooltip design: rounded corners, slight glassmorphism effect, show mobile network names
   - Add a small legend below the map (Bank / Mobile Money / Coming Soon dot colors)
   - Increase node differentiation: active countries get a brighter emerald, "coming soon" countries get a muted amber dot

5. **Update bottom stats**: Change "20-country coverage" to "19-country coverage"

### Technical Details
- Ethiopia coordinates: lat 9.0249, lon 38.7469 (Addis Ababa)
- Curved lines: replace `<line>` with `<path>` using quadratic bezier (`Q` command) with a midpoint offset
- Radial gradient: SVG `<radialGradient>` centered on Africa's centroid
- Legend: three small circles with labels below the map SVG

