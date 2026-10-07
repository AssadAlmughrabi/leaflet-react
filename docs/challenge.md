# Leaflet — Plant Watering Tracker (React web)

## The challenge

Build a mobile-first web app called **Leaflet** that helps someone keep track of which of their houseplants have been watered today. This is a self-contained challenge with no backend and no design file beyond the images provided — everything you need to know about layout, spacing, and colors is either shown in the reference images or listed in the style guide.

There is no hint sheet and no suggested file structure for this one. Read the requirements below, study the reference images in `docs/design/`, and decide the implementation yourself.

> The provided designs are a guide, not a pixel-perfect specification. If a default or reference image contains a small layout inconsistency, use your judgment to make the interface coherent and usable rather than reproducing the flaw.

## Your app should let a user do the following

- See a page titled **"My Plants"** listing every plant they own.
- See a summary at the top of the page showing how many plants have been watered today out of the total (e.g. **"3/6"**), with a progress bar that fills proportionally.
- Filter the plant list using three tabs: **All**, **Needs Water**, and **Watered** — each tab shows a live count in parentheses, and selecting a tab immediately narrows the list to matching plants.
- See each plant displayed as a card containing:
  - the selected plant illustration, or a neutral no-image placeholder
  - the plant's name
  - the room it's in and how often it needs watering (e.g. "every 7 days")
  - a status badge reading either **"Watered today"** or **"Needs water"**
  - a button that toggles that plant's status. The button's label changes depending on current status ("Mark as watered" / "Mark as needs water").
  - a large, easy-to-hit **More actions** (`•••`) `<button>` that opens the plant action sheet (a bottom-sheet modal)
- Click/tap a plant's button to toggle its watered status **instantly**, without navigating away from the list. The badge, the button, the tab counts, and the top summary must all update together, immediately, in response to that single click.
- Add a plant from a clearly discoverable control. The add flow needs a plant name, an optional plant illustration, room, watering frequency (in days), and a choice of whether it has already been watered today. Saving it must immediately add a card to the currently relevant list and update the summary and all filter counts in the same running session.
- Edit an existing plant's name, optional plant illustration, room, watering frequency, and watered-today status. The edit flow must let the user change the image or remove it. Saving the edit must immediately update that card, the summary, and the filter counts in the same running session.
- Delete a plant from its edit flow only after a clear confirmation step. Confirming deletion must immediately remove the card and update the summary and all filter counts in the same running session. Cancelling must leave the plant unchanged.
- See a distinct empty state when there are no plants at all: an illustration, the message **"No plants yet"**, and a short supporting line of text. (The "Needs Water" and "Watered" tabs can still exist in this state — they'll just show a count of 0.)
- Use the app comfortably in the browser across phone-sized viewport widths (320–430px); on wider screens center the content column. Keep the plant list as a single column.

## Navigation and flows

The reference images (mobile-sized) show the complete path through each action:

1. From **My Plants**, click **Add plant** to open the add-plant page (its own route/view).
2. On Add, click **Choose plant image** to choose one supplied illustration or **No image**. The selection is shown in the form, then **Save plant** adds the new card.
3. From a plant card, click its **More actions** (`•••`) control to open the action sheet (bottom-sheet modal with backdrop).
4. In that sheet, click **Edit plant** to change details or the image. **Change plant image** opens the same picker; **Remove image** is equivalent to choosing **No image**. The changed card appears after **Save changes**. Click **Delete plant** to reach the confirmation dialog.
5. In the confirmation dialog (a custom modal — not `window.confirm`), click **Keep plant** to cancel or **Delete plant** to remove it.

Clicking **Mark as watered** or **Mark as needs water** is a separate, immediate action. It does not open another page or require a save button.

## What the reference images show you

| File | What it's showing you |
|---|---|
| `mobile-design-empty.jpg` | The empty **My Plants** page. The two Add controls lead to the same add-plant page. |
| `mobile-design-filled.jpg` | The single-column home list with the **Add plant** entry point, optional plant artwork, status icon/badge, and card-level **More actions** (`•••`) control. |
| `mobile-design-add-plant.jpg` | The dedicated add-plant page. Its **Choose plant image** control opens the bundled-image picker before saving. |
| `mobile-design-plant-image-picker.jpg` | The image picker: select **No image** or one of the six illustrations in `src/assets/plants/`, then confirm the choice. |
| `mobile-design-plant-actions.jpg` | The action sheet opened by a card's **More actions** control. It explicitly shows the choices to edit or delete; its dimmed list is context only. |
| `mobile-design-edit-plant.jpg` | The dedicated edit-plant page, including **Change plant image**, **Remove image**, save, cancel, and the route to deletion. |
| `mobile-design-delete-plant.jpg` | The destructive confirmation dialog, including the safe **Keep plant** exit and the permanent **Delete plant** action. |
| `mobile-design-live-updates.jpg` | The before-and-after behavior of the water-status button: the card, summary, and both relevant tab counts update together with no save button. |

Match the spacing, corner radii, colors, and type sizes shown in these images and in `style-guide.md` as closely as you can.

## Data

Start with these six plants so the initial "3/6 watered today" matches the reference images:

| Name | Room | Frequency | Starting status |
|---|---|---|---|
| Monstera | Living Room | every 7 days | Watered today |
| Snake Plant | Bedroom | every 14 days | Needs water |
| Basil | Kitchen | every 2 days | Needs water |
| Aloe Vera | Bathroom | every 21 days | Watered today |
| Boston Fern | Hallway | every 3 days | Needs water |
| Succulent Trio | Office | every 10 days | Watered today |

Reusable plant illustrations for the six default plants are provided in `src/assets/plants/`. Each is a 512px square PNG on the same Cream background used by the icon tiles:

| Plant | Asset |
|---|---|
| Monstera | `src/assets/plants/monstera.png` |
| Snake Plant | `src/assets/plants/snake-plant.png` |
| Basil | `src/assets/plants/basil.png` |
| Aloe Vera | `src/assets/plants/aloe-vera.png` |
| Boston Fern | `src/assets/plants/boston-fern.png` |
| Succulent Trio | `src/assets/plants/succulent-trio.png` |

Use the matching asset for each default plant. Treat the selected illustration as in-memory plant data (for example, an `imageKey` that is one of the six asset names or `null`). For an added or edited plant, the image picker must offer these seven choices: **No image**, Monstera, Snake Plant, Basil, Aloe Vera, Boston Fern, and Succulent Trio. **No image** is a valid selection: it removes the image from the form preview and, after saving, the card shows a neutral no-image placeholder. It does not delete the plant. Do not use `<input type="file">`, camera, upload, or network requests — only the bundled images, imported as modules (e.g. `import monstera from './assets/plants/monstera.png'`).

The supplied smiling-pot empty-state illustration is `src/assets/plants/empty-state-plant.png`. Use it in the **No plants yet** empty state shown in `mobile-design-empty.jpg`; it is not a choice in the plant-image picker.

Reusable status icons are also provided in `src/assets/icons/`:

| Status | Asset | Use |
|---|---|---|
| Watered today | `src/assets/icons/watered-today.png` | Forest droplet on a pale Forest-tinted medallion |
| Needs water | `src/assets/icons/needs-water.png` | Amber droplet on a pale Amber-tinted medallion |

Use the matching status icon alongside the card's status badge, as shown in the references. The badge label remains live text so it updates with the plant's watered state.

Keep plant data **in memory only** (React state — `useState`/`useReducer`, Context, or a store such as Zustand). No database, backend, local storage, or other persistence is required. It is expected and acceptable for the app to reset to the six default plants on page refresh or dev-server restart. Within one running session, however, add, edit, delete, and watered-status changes must all be live and keep the cards, summary counter, and filter-tab counts in sync.

## Constraints

- Build it in **React** for the web (Vite + TypeScript). Mobile-first layout, max width ~430px centered on wider screens.
- No login, backend, database, or network calls required. Keep data in memory; resetting to the default plants on page refresh is correct for this challenge.
- Every clickable button or tab must be a real `<button>` with a comfortably large hit area (min ~44×44px) — nothing fiddly to hit on a touch screen. Keyboard focus must be visible.
- Text and badge colors must have enough contrast to read easily against their background at a glance.
- Design mobile-first (portrait phone viewport) and keep the plant list in a single column. Use CSS (plain CSS, CSS Modules, or Tailwind) — no React Native styling APIs.

## Required live screen recording

Include a **screen-recording video of the running app** with the submission. Static screenshots, a design prototype, or a narrated walkthrough without live interaction are not sufficient.

In one continuous running session, the recording must visibly demonstrate:

1. The initial **My Plants** list, including the `3/6` summary and live filter counts.
2. Clicking a water-status button and showing the card, summary, and tab counts update immediately.
3. Adding a plant, including choosing either a bundled plant image or **No image**, then showing the new card and updated counts.
4. Filtering the list with **Needs Water** and **Watered**.
5. Opening **More actions**, editing a plant, saving the change, and showing the updated card.
6. Opening **More actions** again, showing the delete confirmation, and confirming deletion so the card and counts update immediately.

The video should show real interactions in the running React app (browser, phone-sized viewport), using only the in-memory state from that session.

## React web mapping (from the original React Native brief)

| React Native idea | React web equivalent |
|---|---|
| Screens + native stack navigator | Routes with React Router (`/`, `/add`, `/edit/:id`) or a simple view-state switch |
| `FlatList` | `plants.map(...)` rendering a single-column list (`<ul>`/`<li>`) |
| `View` / `Text` / `Image` / `Pressable` | `div`/`section`, `h1`/`p`/`span`, `img` (with `alt`), `button` |
| `StyleSheet.create` | CSS file / CSS Modules / Tailwind, using style-guide tokens as CSS variables |
| Action sheet (`Modal`) | Bottom-sheet overlay: fixed backdrop + panel, closes on backdrop click / Escape |
| `Alert.alert` confirmation | Custom confirm modal (`role="dialog"`, `aria-modal`) — not `window.confirm` |
| `Switch` (Watered today?) | Styled checkbox toggle (`<input type="checkbox" role="switch">`) |
| Room picker | `<select>` |
| `require('./plant.png')` | `import img from './assets/plants/plant.png'` |
| Emulator screen recording | Browser recording in a phone-sized viewport (DevTools device mode, 375px wide) |

That's the whole brief — no bonus section, no extra features expected.
