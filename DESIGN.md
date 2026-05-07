# Design System: Yolla & Pras Wedding Invitation

## 1. Visual Theme & Atmosphere

This invitation should feel like a premium editorial wedding microsite: warm, cinematic, intimate, and quietly luxurious. The design is inspired by Cordially, but adapted for Yolla & Pras with a softer Indonesian wedding mood.

- **Density:** Gallery-airy. Sections need generous breathing room, but never empty scroll with no visual change.
- **Variance:** Editorial asymmetric. Desktop may use offset grids, pinned layouts, and image-led compositions. Mobile should be centered and direct.
- **Motion:** Cinematic but light. Scroll animation must feel responsive, never delayed or effortful.
- **Mood:** Warm ivory paper, dark ink typography, soft photo shadows, quiet ceremony details.

The experience should feel like turning through a designed story, not scrolling through a template.

## 2. Color Palette & Roles

- **Ivory Canvas** (`#fbf8f3`) — Primary page background. Use for most sections.
- **Warm Cream** (`#f6f1ea`) — Reserved for image-adjacent surfaces, soft inset panels, or hero card fills. Not used as a primary section background.
- **Sand Line** (`#e8dfd2`) — Borders, faint separators, photo-card outlines.
- **Stone Text** (`#8a7e6e`) — Body copy, descriptions, metadata, inactive text.
- **Charcoal Ink** (`#2b2620`) — Primary text, headings, CTA fill. Never use pure black.
- **Antique Gold** (`#b89968`) — Single accent for selection, small highlights, subtle focus states.

Rules:

- Keep the palette warm and restrained.
- Avoid purple, neon blue, saturated gradients, and pure black.
- Navbar must stay visible on white/ivory backgrounds using a slightly opaque pill, subtle border, and soft shadow.
- Photo overlays may use warm black/brown opacity, not cold grey overlays.

## 3. Typography Rules

- **Display font:** `var(--font-display)` for hero names, invitation intro, major section titles, and dates.
- **Body font:** `var(--font-body)` for nav, descriptions, forms, captions, buttons, and UI text.
- **Display behavior:** Large but controlled. Use `clamp()` and tight leading; never allow headings to cover content.
- **Body behavior:** Comfortable line-height, maximum readable width around `55ch` to `65ch`.
- **Navigation:** Uppercase or title text with deliberate tracking. Desktop nav can use wide tracking; mobile must remain readable.
- **Countdown/date:** The date can be dramatic, but it must not push the countdown out of the viewport.

Sizing guidance:

- Hero couple name on mobile: large enough to anchor the image, not so large that it competes with nav.
- Invitation intro text: desktop can be wide editorial; mobile must break by words, never by individual characters.
- Story title: desktop oversized `our story`; mobile smaller and always above the story copy and cards.
- Wishes names: display serif can be used, but list items should feel like a guestbook, not oversized cards.

Default weight rule:

- Editorial section titles (RSVP, Love Gift, Wishes, Save The Date eyebrow pairs) use `font-light` display weight to preserve airy elegance.
- Cinematic moments (Hero couple name, Invitation Intro single sentence, Story title) may use `font-semibold` for visual punch — these are signature exceptions, not the default.

Never:

- Split words awkwardly.
- Let character animation destroy word spacing.
- Use generic placeholder names like John Doe.
- Use emoji in UI.
- Mix `font-semibold` and `font-light` headings across editorial content sections — pick one rule (light) and keep it consistent.

## 4. Layout Principles

- Use section-level compositions, not nested cards inside cards.
- Every visual element needs a clear spatial zone. No accidental overlap between text and image.
- Desktop can use asymmetry; mobile should use a simple vertical story flow.
- Prefer `min-h-[100dvh]` over `h-screen`, especially on mobile.
- Use max-width containers for readable text, but let hero and large image sections feel immersive.
- Avoid empty scroll zones where the scrollbar moves but the frame appears unchanged.

Spacing guidance:

- Mobile section gaps should be generous but meaningful.
- Story card and text should be close enough to read as one chapter, but never collide.
- Save-the-date venue image needs enough hold time after the date, but the date/countdown must stay fully visible.
- Add real separation between story and the following section on mobile; do not rely only on scroll height.

## 5. Section Architecture & Universal Patterns

Every content section (everything except Hero, Footer, and the cinematic transitions) must follow the same architectural skeleton. This is what gives the page its single-voice, gallery-walk feel.

### 5.1 Section Background Rule

- **All content sections** use `bg-ivory` (`#fbf8f3`).
- **Footer only** uses `bg-ink` (`#2b2620`) — this is the intentional dark closing flip.
- **Hero only** may use the slightly warmer beige (`#ece7df`) because it acts as a framed photo surface, not a content panel.
- **Never** use `bg-cream` as a primary section background. Cream is reserved for inset surfaces, image cards, or muted secondary panels inside a section.

### 5.2 Section Padding Rule

- Mobile: `py-24` minimum, `py-28` preferred for major content sections.
- Desktop: `py-32` to `py-44`. Save The Date and Story may extend further due to scroll choreography.
- Horizontal padding: `px-6` on mobile, container-led on desktop.

### 5.3 Universal Section Heading Pattern

Every editorial content section opens with the same three-part heading block:

1. **Eyebrow label** — uppercase, wide-tracked, stone-colored, body font.
   - Class shorthand: `eyebrow` (defined in `globals.css`).
   - Example values: `Konfirmasi Kehadiran`, `Love & Gift`, `Ucapan & Doa`, `Save The Date`.
2. **Display heading** — `font-display`, `font-light`, ink-colored, lowercase, tight tracking.
   - Sizing: `clamp(4rem, 9vw, 8.2rem)` for primary section titles. May vary slightly per section but stays in the same family.
   - Leading: `0.86`. Tracking: `-0.06em` to `-0.065em`.
3. **Description text** — body font, stone color, max-width around 32rem, comfortable leading.
   - Example: `Mohon konfirmasi kehadiran agar kami dapat menyiapkan tempat dengan baik.`

This trio is **mandatory** for RSVP, Love Gift, and Wishes. Save The Date may use this pattern in a stripped form (eyebrow + dramatic date display).

### 5.4 Universal Form Pattern

All forms in this site (Wishes, RSVP) follow editorial guestbook styling, never SaaS card styling.

Required:

- **No outer card.** No `rounded-2xl` wrapper, no `backdrop-blur`, no large drop shadow on the form container itself.
- **Border-y separator** (`border-y border-ink/12`) is the preferred container treatment when one is needed.
- **Underline-only inputs.** Inputs use a single bottom border (`border-b border-ink/15`), transparent background, no rounded corners on the input itself, focus state shifts the bottom border to ink.
- **Label above input**, set in body font at `text-[10px] uppercase tracking-[0.28em] text-stone`.
- **Helper or error text below input**, set in body font at body small, red-800 for errors.
- **Submit button:** dark ink rounded-full pill, ivory text, subtle shadow. Hover may shift fill to accent gold.
- **Field group spacing:** `gap-5` to `gap-6` between fields. Section padding handles the outer rhythm.

Permitted exceptions:

- Toggle/choice buttons (e.g., "Akan Hadir / Berhalangan") may use `rounded-full` pill chips with selected/unselected states, since they are interactive controls, not container chrome.
- A subtle inset surface using `bg-cream/55` or `bg-ivory/70` is acceptable on individual interactive controls, not on the entire form wrapper.

Never:

- Wrap a form in a glassmorphism card with backdrop-blur and large shadow.
- Use boxed inputs with rounded corners and inner backgrounds — those belong to dashboard UI, not editorial print.
- Vary form treatment across sections. Wishes and RSVP must read as the same form family.

### 5.5 Section Rhythm Across the Page

The page should read like a magazine spread:

- Cinematic spreads (Hero, Story, Save The Date) carry visual weight through imagery and motion.
- Editorial content sections (Wishes, RSVP, Love Gift) carry weight through typography and whitespace.
- Footer closes with a dark flip.

A reader scrolling without reading the words should still feel a calm, repeating rhythm — not a slideshow of unrelated templates.

## 6. Navigation

Desktop:

- Logo: `Y & P`.
- Links: `Google Maps`, `Love`, `Gift for Us`.
- CTA: `Submit RSVP`.
- Do not include a separate RSVP nav link because the CTA already covers it.
- Nav pill should float above content with a warm translucent surface, subtle ring, and shadow.

Mobile:

- Logo on the left, CTA in the center, hamburger/close icon on the right.
- Menu dropdown must be readable over hero photos. Use solid warm cream/ivory and dark text.
- Touch targets must be at least `44px`.
- The nav should never visually disappear on a white section.

## 7. Hero Section

The hero is image-led and cinematic.

- The central photo is the primary focus.
- Couple name should read clearly over the image: `Yolla & Pras`.
- Date metadata should stay secondary.
- Desktop collage photos enter from the edges and land before the next white section appears.
- Edge photos must end in their final positions before the following section begins.
- Mobile hero should feel like a framed phone invitation: nav above, image below, no clutter.

Motion:

- Collage images should move with scroll using `transform` and `opacity`.
- Avoid late arrivals where side photos are still moving while the next section background is already visible.
- Avoid bounce, chevrons, or decorative scroll prompts. A restrained scroll label is acceptable when it fits the hero art direction.

## 8. Invitation Intro

Purpose: a quiet transition after hero and before story.

Text:

`you're cordially invited to celebrate the story of...`

Behavior:

- Starts in muted grey.
- As the user scrolls, characters transition into dark ink.
- The transition can be per-character, but word spacing must remain clean.
- Words must not break awkwardly.
- On desktop it can read as one long editorial line or composed multiline phrase.
- On mobile it should be centered, readable, and never hidden behind the fixed nav.

## 9. Story Section

Story is the most important interaction pattern.

Content model:

- Each chapter has two moments.
- Each moment has one image, one caption, and one description.
- Title/description must always match the active image.

Desktop behavior:

- Title `our story` stays above the composition.
- Image cards stack in the center and slightly downward, not upward into the title.
- Text alternates left/right around the card stack.
- Cards must stop below the title, never pass through it.
- The active card and active text must change together.
- The next card can peek subtly, but the standby state should not show too many competing photos.
- Scroll should feel continuous; do not require a long scroll before the next card starts moving.

Mobile behavior:

- Title and chapter copy stay above the card stack.
- Card should never cover title or description.
- Match chapter text and image exactly at every scroll position.
- Avoid `h-screen` traps that create blank space or bury the card.
- Story must have enough bottom spacing before the next section.

Motion:

- Use `transform` and `opacity`.
- Scrubbed scroll should feel smooth and direct.
- Avoid sticky dead zones where nothing changes.
- Card speed should be moderate: not rushed, not requiring excessive effort.

## 10. Save The Date & Venue

This section should feel like a held ceremony announcement.

Content:

- Eyebrow (optional): `Save The Date`
- Intro: `so please join us...`
- Date: `Sabtu, 6 Juni 2026`
- Countdown: days, hours, minutes, seconds.
- Venue image: use Unsplash placeholder until final venue photo is provided.
- Venue details shown below/over the venue image:
  - `Villa Edwin, Sirnagalih Bogor`
  - `Jl. Kabandungan II, Sirnagalih, Kec. Tamansari, Kabupaten Bogor, Jawa Barat 16610`
  - Google Maps link: `https://maps.app.goo.gl/srJPKoTqEbASQnCn7`

Behavior:

- Date should feel held during scroll before the venue image appears.
- Countdown must remain visible and never be clipped.
- Venue image appears after a deliberate pause.
- Do not keep a separate event-details section if the venue details already live with the image.

## 11. Wishes / Ucapan & Doa

This section is UI-only until database integration.

Heading block (per Section 5.3):

- Eyebrow: `Ucapan & Doa`
- Display heading: `ucapan dan doa` in `font-display font-light`, sized to match the universal heading rule.
- Description: a warm one-line invitation to leave a message.

Preferred direction:

- Use an editorial guestbook strip, not heavy masonry cards.
- Form sits as a calm writing panel using the Universal Form Pattern (Section 5.4).
- Wishes appear as a refined list with thin separators, name, relation, and message.
- It should feel like a guestbook page, not a comment wall.

Form:

- Fields: name and message.
- Inputs: underline-only, no boxed wrapper.
- Submit button: dark ink rounded-full pill.
- Include small helper text that persistence/database integration is pending only if useful during development.

List:

- Use real-feeling Indonesian names.
- Keep messages warm and concise.
- Avoid oversized cards with too much empty interior space.
- Each row separated by a thin `border-ink/12` divider; no card backgrounds.

## 12. RSVP / Konfirmasi Kehadiran

RSVP must read as a sibling of Love Gift and Wishes — same editorial voice, same flat surface, same heading family. It is **not** a SaaS form embedded in a wedding page.

Background:

- `bg-ivory` only. Do not use `bg-cream` here.

Heading block (per Section 5.3):

- Eyebrow: `Konfirmasi Kehadiran`
- Display heading: `rsvp` in `font-display font-light`, sized via `clamp(4.5rem, 10vw, 8.5rem)`, leading `0.86`, tracking `-0.06em`.
- Description: short one-liner explaining why confirmation matters.

Form layout:

- Centered single column on mobile; centered max-width container on desktop (around `max-w-3xl`).
- **No card wrapper.** Remove rounded-2xl, backdrop-blur, and outer shadow from the form container. The form sits directly on the ivory surface with optional top/bottom hairline separators.
- Field grid: name and guest count side by side on desktop, stacked on mobile.
- Attendance toggle: two `rounded-full` pill buttons (`Akan Hadir`, `Berhalangan`) — selected fills with ink, unselected uses a light cream/ivory surface with stone text and ink hover. This is the permitted exception in Section 5.4.
- Message field: optional textarea, underline-only.
- Submit CTA: dark ink rounded-full pill, ivory text, optional accent gold hover.

Confirmation behavior:

- On submit success show a small toast pill at the bottom of the viewport: `Konfirmasi Anda telah kami terima.`
- Toast uses ink background, ivory text, gold check icon. Auto-dismiss after ~4 seconds.
- Validation errors render inline beneath the field in a muted red. Never use disruptive modals.

Never:

- Wrap the form in a glassmorphism card.
- Use a different background color than the surrounding sections.
- Use `font-semibold` for the `rsvp` heading — it must remain `font-light` for editorial weight.
- Surround the form with an inner panel that visually separates it from the section.

## 13. Love Gift

Love Gift is the closing courtesy section before the footer. It should feel like a calm, well-set page in a printed program — not a payment form.

Background:

- `bg-ivory`.

Heading block (per Section 5.3):

- Eyebrow: `Love & Gift`
- Display heading: `love gift` in `font-display font-light`, sized via `clamp(4rem, 9vw, 8.2rem)`.
- Description: a short paragraph thanking guests and explaining the gift channel.

Layout:

- Two-column grid on desktop: sticky text column on the left, account list on the right.
- Single column on mobile, text first, then list.
- Use `border-y border-ink/12` to bracket the account list. No card around it.

Account row (one per gift channel):

- Type label (e.g., `Bank Transfer`, `E-Wallet`) in `text-[10px] uppercase tracking-[0.3em] text-stone`.
- Provider name (e.g., `BCA`, `GoPay`) in `font-display` ink, large.
- Account number in body font, large, ink. Display variant may include spacing for legibility.
- Account holder line: `a/n {name}` in stone.
- Copy button: outline rounded-full pill (`border-ink/14`) that fills with ink and turns ivory on hover. Switches icon from `Copy` to `Check` and label from `Salin` to `Tersalin` on success.

Confirmation behavior:

- On copy success show a small toast pill at the bottom: `Nomor berhasil disalin.`
- Toast styling matches the RSVP toast for consistency.

Never:

- Use a different button family than RSVP/Wishes.
- Wrap each account in a separate elevated card.
- Use `font-semibold` for the `love gift` heading.

## 14. Motion & Interaction Standards

- Animate only `transform` and `opacity` for scroll-heavy sections.
- Use spring-like or cubic-bezier easing:
  - Preferred ease: `[0.22, 1, 0.36, 1]`
  - Premium spring range: stiffness `100-220`, damping `20-36`
- ScrollTrigger/framer scroll transforms must have equal input/output range lengths.
- No animation should require excessive user scroll before visible change.
- Respect `prefers-reduced-motion`.
- Avoid decorative motion that does not help reading or progression.

## 15. Image Rules

- Use real photographic imagery for wedding, venue, rings, ceremony, and couple moments.
- Images should feel warm, intimate, and editorial.
- Avoid generic stock compositions when a section needs specificity.
- Use rounded corners sparingly: cards may use small to medium radii, hero image may use larger framing.
- Photo cards can have soft shadows, but no harsh floating UI shadows.
- Unsplash placeholders are acceptable until client images arrive; broken image links are not acceptable.

## 16. Anti-Patterns

Never introduce:

- Pure black `#000000`.
- Neon gradients or purple/blue AI palettes.
- Large empty scroll where nothing visually changes.
- Text hidden behind images.
- Images passing through story title.
- Story image and copy changing out of sync.
- Mobile `h-screen` layout that causes Safari viewport jumps or blank space.
- Three equal generic cards for premium content.
- Heavy nested cards.
- Overly large dates that crop countdown.
- Navbar blending into white backgrounds.
- Broken word wrapping in invitation intro.
- Emoji, filler UI copy, or generic template phrases.
- Glassmorphism cards (rounded wrappers with `backdrop-blur` and large shadows) inside editorial content sections.
- `bg-cream` as a primary section background — cream is for inset surfaces only.
- Mixing `font-semibold` and `font-light` for editorial section headings — pick the universal `font-light` rule.
- SaaS-style boxed inputs with rounded corners and inner backgrounds in any form on this site.
- Different form treatments between Wishes and RSVP — both must read as one editorial form family.

## 17. Implementation Notes

- Main content lives in `src/lib/content.ts`.
- Navigation lives in `src/components/Nav.tsx`.
- Hero collage lives in `src/components/Hero.tsx` and uses `heroCollage`.
- Invitation intro lives in `src/components/InvitationIntro.tsx`.
- Story stack lives in `src/components/Story.tsx`.
- Date and venue live in `src/components/SaveTheDate.tsx`.
- Countdown lives in `src/components/Countdown.tsx`.
- Wishes UI lives in `src/components/Wishes.tsx`.
- RSVP UI lives in `src/components/Rsvp.tsx`.
- Love Gift UI lives in `src/components/LoveGift.tsx`.
- Footer lives in `src/components/Footer.tsx`.
- Shared utility classes (`eyebrow`, `container-narrow`, `h-display`) live in `src/app/globals.css`.
- Tailwind tokens (ivory, cream, sand, stone, ink, accent) live in `tailwind.config.ts`.

Before calling a visual change complete:

1. Check desktop and mobile.
2. Confirm no text/image overlap.
3. Confirm scroll does not require dead effort.
4. Confirm navbar remains visible on dark and white backgrounds.
5. Confirm the section's heading block matches the Universal Section Heading Pattern (Section 5.3) when it is an editorial content section.
6. Confirm any form follows the Universal Form Pattern (Section 5.4) — no glassmorphism, no boxed inputs.
7. Confirm the section background uses `bg-ivory` (or `bg-ink` for Footer only).
8. Run TypeScript verification.
