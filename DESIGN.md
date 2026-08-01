# AARYAFX — Design Contract v2 ("Poster wall")

**Subject:** Aarya Patel / AARYAFX — video editor & content creator, Ahmedabad. Five years
cutting short-form and brand content. 100+ videos for Zepto; brand work for Phoenix Palladium,
Gujarat Titans, Shivalik, Space India. Studio: Craywingz.

**The page's one job:** get a brand/agency person to watch the work, then email him.

**References (user-supplied):**
- benorth.studio — overall site + landing: warm cream ground, giant black grotesk marquee
  wordmark hero, pill-outline nav with ↗ arrows, orange accent metadata, collage/sticker
  physicality, full-bleed showreel block, numbered service pillars with tag lists, DRAG
  project carousel, big closing statement, address/contact footer.
- pacomepertant.com/about — About page: one giant centered statement with small media
  chips inline in the sentence, an accent asterisk ✲, rotating circular "showreel" text
  badge, horizontal auto-marquee of project thumbnails, minimal socials footer.

**Direction:** BeNorth's daylight poster-wall energy, carried by an editor's vocabulary.
Light warm paper, huge black expanded type, one hot "record" orange. The dark lives only
inside screens — video blocks and work thumbnails are little dark viewports punched into
the paper, like monitors on a bright desk. Mono metadata voice (timecode, REC, aspect
ratios) survives from v1 as the utility layer.

## Signature moves (spend boldness here, keep the rest quiet)

1. **Hero marquee wordmark** — "AARYAFX®" repeating, massive, scrolling horizontally.
2. **DRAG work carousel** — draggable strip with a cursor-following "DRAG" chip.
3. **Hover-scrub cards** — kept from v1 (editors preview clips by scrubbing); restyled
   as dark viewports on paper.
4. **Sticker layer** — small tilted mono chips (REC ●, 2.39:1, "100+ CUTS FOR ZEPTO",
   coordinates). Sparse: 2–3 per page maximum. They straighten on hover.
5. **About statement** — Pacôme-style giant sentence with inline chips, in our light system.

## Tokens — the contract (`src/styles/tokens.css`)

Never hardcode a colour, size, or duration in a component.

| Token | Value | Use |
|---|---|---|
| `--paper` | `#F1EFE9` | Page ground |
| `--paper-2` | `#E8E5DC` | Raised panels, pills' hover fill |
| `--ink` | `#131311` | Type, borders, dark fills |
| `--muted` | `#787369` | Secondary text |
| `--line` | `rgba(19,19,17,.16)` | Hairlines |
| `--line-strong` | `rgba(19,19,17,.34)` | Pill outlines |
| `--accent` | `#FF4B0A` | Record orange. Metadata highlights, CTAs, the ✲ |
| `--teal` | `#7CBFB0` | Rare second sticker colour (badge-style), tiny doses |
| `--screen` | `#0C0C0B` | Dark viewport fills (showreel, card screens) |
| `--screen-ink` | `#F3F1EB` | Text on dark viewports |

Type: Archivo variable (`--font-display` expanded wdth 118 / 800–900, uppercase; body
normal width) + JetBrains Mono (`--font-mono`) for all metadata, uppercase, tracked.
Scale: `--fs-marquee` (hero wordmark, ~20vw), `--fs-hero`, `--fs-xl`, `--fs-lg`,
`--fs-md`, `--fs-body`, `--fs-sm`, `--fs-xs`.

Shape: pills are fully rounded (`--r-pill: 999px`); panels/cards `--r-md: 10px`;
screens/viewports `--r-lg: 14px`. Motion tokens as v1 (`--dur-fast/--dur/--dur-slow`,
`--ease-out`), all collapsing to 1ms under reduced motion.

## Shared primitives (`src/styles/base.css`)

- `.container` — gutter + maxwidth.
- `.meta` — mono uppercase tracked label. `.meta--accent` for orange.
- `.eyebrow` — section opener row: mono label left, hairline rule filling middle, mono
  right slot. (Replaces v1 slates.)
- `.pill` — outlined rounded chip (nav, tags, CTAs). Hover = ink fill / paper text flip.
  `.pill--solid` inverse. Tag lists are `.pill`s at small size.
- `.display` — expanded Archivo, uppercase, tight.
- `.sticker` — tilted mono chip (`--tilt` custom prop per instance), straightens on
  hover. Paper or accent or teal fill.
- `.reveal` / `.is-visible` — scroll reveal, base state visible (unchanged from v1).
- `.marquee` primitive lives in `src/components/Marquee.jsx` — content duplicated
  aria-hidden, CSS keyframe translate, `--marquee-dur` per instance, static under
  reduced motion, pauses on hover/focus-within.

## Quality floor — non-negotiable

Responsive to 360px. Visible `:focus-visible` everywhere. Reduced motion: marquees
static, carousel still draggable/scrollable, reveals instant. Keyboard: carousel
focusable + arrow-scrollable, scrub cards keep arrow-key stepping. One `<h1>` per page.
Semantic `<nav>/<main>/<footer>`.

## Copy voice

Plain, active, specific to editing. No "passionate", no "elevate", no "storytelling".
Mono layer speaks in editor shorthand: REC ●, 00:00:00:00, 2.39:1, EST. 2021,
23.02°N 72.57°E (Ahmedabad). Sentence case prose; uppercase only in mono/display.
