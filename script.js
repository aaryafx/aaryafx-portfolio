/* ==========================================================================
   AaryaFx - poster behaviour
   1. split each headline line into one span per character
   2. fit the type slab to the viewport (width AND height)
   3. dark / light toggle, persisted
   ========================================================================== */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var display = document.querySelector('.display');
  var stage   = display && display.parentElement;
  var lines   = display ? Array.prototype.slice.call(display.querySelectorAll('.line')) : [];

  /* ---------- 1. per-character split ------------------------------------
     Each letter becomes its own inline-block span so it can be transformed
     on its own (staggered entrance, per-letter hover).
     The <h1> carries aria-label and the lines are aria-hidden, so screen
     readers read one clean sentence instead of loose letters.              */
  var i = 0;
  lines.forEach(function (line) {
    var text = line.textContent;
    var frag = document.createDocumentFragment();

    for (var c = 0; c < text.length; c++) {
      var span = document.createElement('span');
      span.className = 'ch';
      span.style.setProperty('--i', i++);
      span.textContent = text[c] === ' ' ? ' ' : text[c];
      frag.appendChild(span);
    }

    line.textContent = '';
    line.appendChild(frag);
  });

  /* ---------- 2. fit the slab -------------------------------------------
     Lines have different character counts, so a pure vw font-size cannot
     guarantee the LONGEST line fits: it just overflows and gets clipped.
     Measure the widest line at a known size, then solve for the size that
     fills the available width, and cap that by the available height.      */
  var LH = 0.92;          // must match --line-height in style.css
  var WIDTH_SAFETY = 0.99;
  var HEIGHT_SHARE = 0.88; // share of the stage the slab may occupy

  function fitDisplay() {
    if (!display || !stage || !lines.length) return;

    var availW = stage.clientWidth  * WIDTH_SAFETY;
    var availH = stage.clientHeight * HEIGHT_SHARE;
    if (availW <= 0 || availH <= 0) return;

    // Measure at a fixed probe size so the ratio is stable.
    var PROBE = 100;
    display.style.fontSize = PROBE + 'px';

    var widest = 0;
    lines.forEach(function (l) { widest = Math.max(widest, l.scrollWidth); });
    if (!widest) return;

    var byWidth  = availW / (widest / PROBE);
    var byHeight = availH / (lines.length * LH);

    // A transient layout (pane resize, font swap) can report a tiny stage
    // height, which would floor the size to 0px and blank the headline.
    // Never go below a legible minimum.
    var size = Math.max(16, Math.floor(Math.min(byWidth, byHeight)));
    display.style.fontSize = size + 'px';
  }

  fitDisplay();
  // Re-fit once the webfont has actually swapped in, or metrics are wrong.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitDisplay);

  if ('ResizeObserver' in window && stage) {
    new ResizeObserver(fitDisplay).observe(stage);
  } else {
    window.addEventListener('resize', fitDisplay);
  }

  /* ---------- 3. theme toggle ------------------------------------------ */
  var root = document.documentElement;
  var btn  = document.getElementById('theme');

  function sync() {
    if (!btn) return;
    var dark = root.getAttribute('data-theme') === 'dark';
    btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  if (btn) {
    btn.addEventListener('click', function () {
      var dark = root.getAttribute('data-theme') === 'dark';
      if (dark) root.removeAttribute('data-theme');
      else root.setAttribute('data-theme', 'dark');
      try { localStorage.setItem('aaryafx-theme', dark ? 'light' : 'dark'); } catch (e) {}
      sync();
    });
    sync();
  }

  /* Follow the OS only while the visitor has not chosen for themselves. */
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  var onScheme = function (e) {
    var saved = null;
    try { saved = localStorage.getItem('aaryafx-theme'); } catch (err) {}
    if (saved) return;
    if (e.matches) root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    sync();
  };
  if (mq.addEventListener) mq.addEventListener('change', onScheme);
  else if (mq.addListener) mq.addListener(onScheme);
})();

/* ==========================================================================
   Subpage behaviour. Every block is guarded, so this same file is safe to
   load on the poster landing and on all four subpages.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- About: tab panels ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab[role="tab"]'));
  if (tabs.length) {
    var select = function (tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
    };

    tabs.forEach(function (tab, idx) {
      tab.addEventListener('click', function () { select(tab); });
      // Left/right arrows move between tabs, which is what a tablist should do.
      tab.addEventListener('keydown', function (e) {
        var dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!dir) return;
        e.preventDefault();
        var next = tabs[(idx + dir + tabs.length) % tabs.length];
        next.focus();
        select(next);
      });
    });
  }

})();

/* ==========================================================================
   Contact badge modal. Present on every page.
   ========================================================================== */
(function () {
  'use strict';

  var overlay = document.getElementById('contact');
  if (!overlay) return;

  var opener  = null;
  var closeBtn = overlay.querySelector('.overlay__close');

  function focusables() {
    return Array.prototype.slice.call(
      overlay.querySelectorAll('a[href], button:not([disabled])')
    );
  }

  var video = document.getElementById('contact-video');

  function open(trigger) {
    opener = trigger || null;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
    document.addEventListener('keydown', onKey);

    // Attach the source on first open only, so the reel is never downloaded
    // by visitors who never open the card.
    if (video) {
      var src = video.querySelector('source[data-src]');
      if (src && !src.src) {
        src.src = src.getAttribute('data-src');
        video.load();
      }
      var p = video.play();
      if (p && p.catch) p.catch(function () {});   // autoplay can be refused
    }

    // is-live drives the sheen and the row stagger
    requestAnimationFrame(function () { overlay.classList.add('is-live'); });
  }

  function close() {
    overlay.hidden = true;
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey);
    overlay.classList.remove('is-live');
    if (card) { card.style.removeProperty('--rx'); card.style.removeProperty('--ry'); }
    if (video) video.pause();
    if (opener) opener.focus();
  }

  function onKey(e) {
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab') return;
    // keep tabbing inside the dialog
    var f = focusables();
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---- pointer tilt + sheen ----
     The card hangs from the lanyard, so it leans toward the cursor. Values go
     straight onto CSS custom properties inside one rAF, never into layout
     properties, so this stays on the compositor.                            */
  var card = overlay.querySelector('.card');
  var MAX  = 7;                                  // degrees
  var frame = null, px = 0, py = 0;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  function applyTilt() {
    frame = null;
    if (!card || reduce.matches) return;
    var r = card.getBoundingClientRect();
    if (!r.width || !r.height) return;

    var nx = (px - r.left) / r.width  - 0.5;     // -0.5 .. 0.5
    var ny = (py - r.top)  / r.height - 0.5;

    card.style.setProperty('--ry', (nx *  MAX).toFixed(2) + 'deg');
    card.style.setProperty('--rx', (ny * -MAX).toFixed(2) + 'deg');
    card.style.setProperty('--mx', (((px - r.left) / r.width)  * 100).toFixed(1) + '%');
    card.style.setProperty('--my', (((py - r.top)  / r.height) * 100).toFixed(1) + '%');
  }

  overlay.addEventListener('pointermove', function (e) {
    px = e.clientX; py = e.clientY;
    if (frame === null) frame = requestAnimationFrame(applyTilt);
  });

  // leaving the card settles it back upright
  overlay.addEventListener('pointerleave', function () {
    if (!card) return;
    card.style.removeProperty('--rx');
    card.style.removeProperty('--ry');
  });

  document.querySelectorAll('.contact-open').forEach(function (btn) {
    btn.addEventListener('click', function () { open(btn); });
  });

  if (closeBtn) closeBtn.addEventListener('click', close);
  overlay.addEventListener('mousedown', function (e) {
    if (e.target === overlay) close();   // click the backdrop, not the card
  });
})();

/* ==========================================================================
   Sticky mini bar. Appears once the hero poster has scrolled away.
   IntersectionObserver, so no per-frame scroll handler.
   ========================================================================== */
(function () {
  'use strict';
  var bar = document.getElementById('minibar');
  var hero = document.getElementById('top');
  if (!bar || !hero || !('IntersectionObserver' in window)) return;

  new IntersectionObserver(function (entries) {
    bar.classList.toggle('is-in', !entries[0].isIntersecting);
  }, { threshold: 0, rootMargin: '-60px 0px 0px 0px' }).observe(hero);
})();
