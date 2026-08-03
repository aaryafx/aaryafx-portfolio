# AARYAFX — Design Contract v3 ("Holo dark")

**Subject:** Aarya Patel / AARYAFX — video editor & content creator, Ahmedabad. Five years
cutting short-form and brand content. 100+ videos for Zepto; brand work for Phoenix Palladium,
Gujarat Titans, Shivalik, Space India. Studio: Craywingz.

**The page's one job:** get a brand/agency person to watch the work, then email him.

**Reference (user-supplied): morez.co** — near-black ground where all content lives inside
big rounded panels; soft holographic/iridescent mesh gradients (pink → violet → green →
yellow) as panel fills; bold white grotesk headings; **mono body text**; a scratchy
hand-drawn marker logo; dual-direction name marquee bands with ✳/✚ separators; rotating
circular-text badges with a starburst center; playful stickers (smiley) and hand-drawn
underline accents on key words; client work as full-width solid-colour rounded panels with
the logo centered and name + URL below; gradient CTA pills; footer contact as stacked
outlined rounded rows; sections occasionally flip to a soft light gradient.

**Direction:** Morez's holo-dark panel system, in an editor's hands. The black is the edit
suite; the holo gradients are light spill from a monitor. The mono body voice survives from
v1/v2. The hover-scrub work interaction survives inside the panels — it's still the one
thing only an editor's portfolio would do.

## Signature moves

1. **Holo panels** — big rounded (24px) panels filled with soft iridescent mesh gradients.
   The hero is one. Class `.holo` (+ variants) in base.css.
2. **Dual marquee band** — two rows of "AARYAFX ✳ AARYAFX ✚" scrolling opposite
   directions (Marquee component, `reverse` on one).
3. **Scratchy brand** — Permanent Marker for the logo + tiny sticker moments ONLY.
   Never for headings or body.
4. **Rotating badge** — circular text + starburst center (shared `Badge` component),
   used as scroll cue / contact link.
5. **Hover-scrub work panels** — kept from v2, chrome adapted: full-width client panels
   (duotone from item hues) that scrub on pointer move.
6. **Marker accents** — hand-drawn dashed/highlight underline on one key word per
   section (CSS, no images).

## Tokens (`src/styles/tokens.css`) — never hardcode values in components

| Token | Value | Use |
|---|---|---|
| `--black` | `#070707` | Page ground |
| `--panel` | `#0E0E0E` | Solid dark panels on black |
| `--white` | `#FAFAFA` | Headings, primary text |
| `--muted` | `rgba(250,250,250,.62)` | Secondary text |
| `--line` | `rgba(250,250,250,.16)` | Outlined rows, hairlines |
| `--ink` | `#0B0B0B` | Text on light/holo surfaces |
| Holo stops | `--holo-a #F5A8D0`, `--holo-b #9B8CF2`, `--holo-c #8ED9B5`, `--holo-d #F2E28A` | Mesh gradient system, always used together |
| `--light` | `#F4EFF2` | Light-flip section ground (soft pink-white) |

Type: `--font-head` Archivo (normal width, 700/800, NOT expanded, sentence case — Morez
headings are Helvetica-plain); `--font-mono` JetBrains Mono — **the body voice**: paragraphs,
metadata, buttons; `--font-marker` Permanent Marker — logo/stickers only.
Scale: `--fs-hero`, `--fs-xl`, `--fs-lg`, `--fs-md`, `--fs-body` (mono ~0.9375rem),
`--fs-sm`, `--fs-xs`.

Shape: `--r-panel: 24px`, `--r-card: 16px`, `--r-pill: 999px`. Motion tokens unchanged
(collapse to 1ms under reduced motion).

## Shared primitives (base.css)

`.container`; `.head` (heading style); `.mono-strong` (bold mono, Morez's emphasis);
`.holo` / `.holo--cool` / `.holo--warm` (mesh gradient fills); `.panel` (rounded dark
panel); `.row-outline` (outlined rounded contact row); `.pill` (solid white-on-black /
`.pill--gradient` holo fill, `.pill--dark` black); `.scratch` (marker font);
`.underline-marker` (dashed hand-drawn underline accent); `.reveal` as before.
`Marquee` and `Badge` components in `src/components/`.

## Quality floor

360px-solid, `:focus-visible` everywhere, reduced-motion = static marquees/badges + instant
reveals, keyboard-reachable interactions, one `<h1>`/page, semantic landmarks. Copy voice:
plain, specific, a little playful is allowed here ("Let's go") but no agency-speak.
