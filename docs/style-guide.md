# Style Guide — Leaflet

## Layout

The reference designs were captured at a width of **375px**. Build mobile-first in CSS; test in browser DevTools device mode at 375px.

> 💡 The interface should hold up across viewport widths of roughly 320–430px, while keeping a single-column plant list. On wider screens, center a `max-width: 430px` column on the Cream background.

All px values below are CSS pixels. Define colors, radii and shadow as CSS custom properties on `:root` (e.g. `--forest: #1F6B4A`).

## Colors

- Forest (primary — headers, active tab, "Watered" badge text, progress fill): `#1F6B4A`
- Forest Dark (optional pressed feedback for primary elements): `#154430`
- Amber (needs-water button, needs-water badge text): `#E2922B`
- Amber Dark (needs-water badge background is Amber at low opacity — see below): `#B9721A`
- Cream (page background, icon tile background): `#F7F3E8`
- Card White (card + summary background): `#FFFFFF`
- Ink (primary text): `#1E2B22`
- Slate (secondary text — room, frequency, inactive tab text): `#6B7268`
- Border (card border, progress track, divider): `#E7DFC9`

Badge backgrounds are tinted, not solid (use `rgba`):
- "Watered today" badge background: Forest at 12% opacity (`rgba(31, 107, 74, 0.12)`), text in solid Forest
- "Needs water" badge background: Amber at 15% opacity (`rgba(226, 146, 43, 0.15)`), text in Amber Dark

## Status icons

Use the supplied icon files in `src/assets/icons/` with the matching status treatment:

- `watered-today.png`: Forest droplet on a pale Forest-tinted medallion
- `needs-water.png`: Amber Dark droplet on a pale Amber-tinted medallion

These icons reinforce the status; they do not replace the readable "Watered today" or "Needs water" badge text.

## Typography

- Font: [Poppins](https://fonts.google.com/specimen/Poppins) — load via Google Fonts `<link>` in `index.html` — weights 400 (body), 600 (card titles, buttons), 700 (page title, summary count)
- Page title ("My Plants"): 26px / 700
- Plant name (card title): 16px / 600
- Room + frequency line: 12px / 400, Slate
- Badge text: 11px / 700, `text-transform: uppercase`, `letter-spacing: 0.03em`
- Button text: 12–13px / 700
- Summary "watered today" label: 13px / 600, Slate
- Summary count ("3/6"): 20px / 700, Forest
- Empty state title: 18px / 700
- Empty state supporting text: 13px / 400, Slate

## Spacing & shape

- Base spacing unit: 4px (used as 4 / 8 / 12 / 16 / 18 / 24 as needed)
- Card corner radius: 18px
- Icon tile corner radius: 14px
- Button / badge / tab corner radius: fully rounded (pill) — `border-radius: 999px`
- Card shadow: soft, low-contrast — `box-shadow: 0 8px 20px rgba(30, 50, 35, 0.06)`
- Card border: 1px solid Border color, in addition to the shadow

## States

See `docs/design/mobile-design-live-updates.jpg` for the required live-update behavior. Clicking a water-status button immediately changes that card's badge and button, the top summary, and the Needs Water / Watered tab counts. No save button or press-and-hold state is required for this action. Add `:hover` / `:active` (Forest Dark) and a visible `:focus-visible` outline for buttons and tabs.

For filter tabs, **active** means the currently selected filter: use a Forest-filled pill with white text. Inactive tabs are white with a Border outline and Slate text.
