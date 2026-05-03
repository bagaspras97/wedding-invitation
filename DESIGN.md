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
- **Warm Cream** (`#f6f1ea`) — Secondary background, soft panels, image-adjacent surfaces.
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

Never:

- Split words awkwardly.
- Let character animation destroy word spacing.
- Use generic placeholder names like John Doe.
- Use emoji in UI.

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

## 5. Navigation

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

## 6. Hero Section

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

## 7. Invitation Intro

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

## 8. Story Section

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

## 9. Save The Date & Venue

This section should feel like a held ceremony announcement.

Content:

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

## 10. Wishes / Ucapan & Doa

This section is UI-only until database integration.

Preferred direction:

- Use an editorial guestbook strip, not heavy masonry cards.
- Form sits as a calm writing panel.
- Wishes appear as a refined list with thin separators, name, relation, and message.
- It should feel like a guestbook page, not a comment wall.

Form:

- Fields: name and message.
- Submit button: dark ink pill.
- Include small helper text that persistence/database integration is pending only if useful during development.

List:

- Use real-feeling Indonesian names.
- Keep messages warm and concise.
- Avoid oversized cards with too much empty interior space.

## 11. Motion & Interaction Standards

- Animate only `transform` and `opacity` for scroll-heavy sections.
- Use spring-like or cubic-bezier easing:
  - Preferred ease: `[0.22, 1, 0.36, 1]`
  - Premium spring range: stiffness `100-220`, damping `20-36`
- ScrollTrigger/framer scroll transforms must have equal input/output range lengths.
- No animation should require excessive user scroll before visible change.
- Respect `prefers-reduced-motion`.
- Avoid decorative motion that does not help reading or progression.

## 12. Image Rules

- Use real photographic imagery for wedding, venue, rings, ceremony, and couple moments.
- Images should feel warm, intimate, and editorial.
- Avoid generic stock compositions when a section needs specificity.
- Use rounded corners sparingly: cards may use small to medium radii, hero image may use larger framing.
- Photo cards can have soft shadows, but no harsh floating UI shadows.
- Unsplash placeholders are acceptable until client images arrive; broken image links are not acceptable.

## 13. Anti-Patterns

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

## 14. Implementation Notes

- Main content lives in `src/lib/content.ts`.
- Navigation lives in `src/components/Nav.tsx`.
- Hero collage lives in `src/components/Hero.tsx` and uses `heroCollage`.
- Invitation intro lives in `src/components/InvitationIntro.tsx`.
- Story stack lives in `src/components/Story.tsx`.
- Date and venue live in `src/components/SaveTheDate.tsx`.
- Countdown lives in `src/components/Countdown.tsx`.
- Wishes UI lives in `src/components/Wishes.tsx`.

Before calling a visual change complete:

1. Check desktop and mobile.
2. Confirm no text/image overlap.
3. Confirm scroll does not require dead effort.
4. Confirm navbar remains visible on dark and white backgrounds.
5. Run TypeScript verification.
