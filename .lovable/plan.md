

## Plan: Fix Africa Map to Match Exact Supported Countries

### Problem
The current map includes **Ghana** and **DR Congo**, which are NOT in the user's supported country list. The user provided exactly **18 countries**. The bottom text also says "18-country coverage" but there are 20 nodes.

### Changes to `src/components/AfricaNetwork.tsx`

1. **Remove Ghana and DR Congo** from the `countries` array — they are not in the supported list.

2. **Update connections array** to remove any lines that referenced Ghana (27,44) or DR Congo (44,56) coordinates.

3. **Make the Africa silhouette bolder** — increase stroke width, use a filled semi-transparent silhouette instead of just an outline, so nodes clearly sit "inside" Africa.

4. **Increase the map size** — change from `max-w-3xl` to `max-w-5xl` and use a taller aspect ratio for more visual dominance.

5. **Improve node positioning** — adjust coordinates so all 18 nodes sit clearly within the Africa silhouette boundary (some like Senegal at x:18 may be outside the current path).

6. **Use a more accurate/larger Africa SVG path** that better contains all the West/East/Southern African country positions.

7. **Update bottom stat text** to say "18-country coverage" (already correct).

### Final 18 Countries (exact from user's list):
Benin, Botswana, Burkina Faso, Cameroon, Ivory Coast, Congo Brazzaville, Gabon, Kenya, Mali, Malawi, Nigeria, Senegal, South Africa, Tanzania, Togo, Rwanda, Uganda, Zambia

