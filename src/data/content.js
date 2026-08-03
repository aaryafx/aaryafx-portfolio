/**
 * Single source of truth for site copy and work items.
 * When real video links/thumbnails arrive, they slot into `media` below —
 * no component changes needed.
 */

export const site = {
  name: 'AARYA PATEL',
  brand: 'AARYAFX',
  role: 'Video editor & content creator',
  location: 'Ahmedabad, IN',
  coords: '23.02° N, 72.57° E',
  est: 'EST. 2021',
  email: 'aaryafx@gmail.com',
  years: 5,
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/', note: 'reels / portfolio' },
    { label: 'YouTube', href: 'https://youtube.com/', note: 'showreel' },
    { label: 'LinkedIn', href: 'https://linkedin.com/', note: 'profile' },
  ],
}

export const about = {
  /**
   * The About page's giant statement, Pacôme-style: a run of text spans
   * with small inline chips between them. Chips render as inline visual
   * tokens (icon tiles) inside the sentence.
   * kind: 'text' | 'chip' — chip ids map to inline SVG/emoji tiles.
   */
  statement: [
    { kind: 'text', t: 'I’m Aarya Patel,' },
    { kind: 'chip', id: 'clapper' },
    { kind: 'text', t: 'video editor based in Ahmedabad. I cut fast, trend-driven short-form' },
    { kind: 'chip', id: 'bolt' },
    { kind: 'text', t: 'with motion graphics built in. Five years,' },
    { kind: 'chip', id: 'counter' },
    { kind: 'text', t: '100+ videos — from quick commerce to cricket. Clean when the brand needs it,' },
    { kind: 'chip', id: 'burst' },
    { kind: 'text', t: 'loud when the feed demands it.' },
  ],
  lede: 'I cut fast. Five years editing short-form and brand content — the kind built to stop a thumb mid-scroll.',
  body: [
    'I run edits end to end: concept, shoot, cut, grade, sound. Most of my work is fast-cut, trend-aware short-form with motion graphics built in, delivered on schedules where "next week" is not an answer.',
    'At Craywingz I shot and edited 100+ videos for Zepto and cut brand work across retail, sports and entertainment — Phoenix Palladium, Gujarat Titans, Shivalik, Space India.',
  ],
  tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
  disciplines: [
    'Fast-cut / trend editing',
    'Motion graphics',
    'Colour grading',
    'Sound design & sync',
    'Short-form strategy',
    'On-set direction',
  ],
}

/**
 * The landing page's three numbered pillars (BeNorth's services pattern,
 * remapped to how an edit actually gets made).
 */
export const pillars = [
  {
    num: '01',
    name: 'Shoot',
    line: 'Footage worth cutting.',
    body: 'On-set direction and shooting built around the edit that comes after — coverage, angles and moments picked with the timeline already in mind.',
    tags: ['On-set direction', 'Concept', 'Coverage planning', 'Brand briefs'],
  },
  {
    num: '02',
    name: 'Cut',
    line: 'The scroll-stopping part.',
    body: 'Fast-cut, trend-aware editing with motion graphics built in. Short-form that lands in the first second and holds to the last.',
    tags: ['Fast-cut editing', 'Motion graphics', 'Trend formats', 'Hook structure'],
  },
  {
    num: '03',
    name: 'Finish',
    line: 'Make it feel expensive.',
    body: 'Grade, sound design and sync, delivery in every aspect ratio the campaign needs. The last 10% that separates content from brand work.',
    tags: ['Colour grade', 'Sound design', 'Sync', 'Multi-format delivery'],
  },
]

export const closing = {
  kicker: "Let's go !!",
  line: 'Need videos that stop the scroll?',
  cta: "Let's talk",
}

/**
 * Work items. `media` is null until real links arrive:
 *   { type: 'video', src: '/work/zepto.mp4', poster: '/work/zepto.jpg' }
 *   { type: 'youtube', id: 'abc123' }
 * `hues` drives each card's placeholder grade (duotone) until then.
 */
export const work = [
  {
    id: 'zepto',
    client: 'Zepto',
    title: '100+ social cuts',
    role: 'Shoot · edit · motion',
    sector: 'Quick commerce',
    year: '2022–26',
    frames: 8,
    hues: ['#2E1065', '#C4B5FD'],
    media: null,
  },
  {
    id: 'gujarat-titans',
    client: 'Gujarat Titans',
    title: 'Matchday content',
    role: 'Fast-cut edit',
    sector: 'Sport',
    year: '2024',
    frames: 8,
    hues: ['#0B2A4A', '#7FC8FF'],
    media: null,
  },
  {
    id: 'phoenix-palladium',
    client: 'Phoenix Palladium',
    title: 'Retail campaigns',
    role: 'Edit · grade',
    sector: 'Retail',
    year: '2023–25',
    frames: 8,
    hues: ['#3A1D0B', '#FFB25E'],
    media: null,
  },
  {
    id: 'shivalik',
    client: 'Shivalik',
    title: 'Brand films',
    role: 'Edit · sound',
    sector: 'Real estate',
    year: '2024',
    frames: 8,
    hues: ['#12302A', '#6FE3B4'],
    media: null,
  },
  {
    id: 'space-india',
    client: 'Space India',
    title: 'Launch content',
    role: 'Concept · edit',
    sector: 'Entertainment',
    year: '2025',
    frames: 8,
    hues: ['#2B0F2E', '#F08FFF'],
    media: null,
  },
]
