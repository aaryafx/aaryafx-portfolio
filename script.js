/* ==========================================================================
   AaryaFx
   1. local clock in the header
   2. sticky bar once the header scrolls away
   3. showreel: load and play only when it is on screen
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- 1. local clock ---------- */
  var clock = document.getElementById('clock');
  if (clock) {
    var fmt;
    try {
      fmt = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kolkata',
        day: 'numeric', month: 'short',
        hour: '2-digit', minute: '2-digit', hour12: false
      });
    } catch (e) { fmt = null; }

    var tick = function () {
      if (!fmt) return;
      // "14 Sep, 18:42"
      clock.textContent = fmt.format(new Date()).replace(/,\s*/, ', ');
    };
    tick();
    setInterval(tick, 30000);
  }

  /* ---------- 2. sticky bar ----------
     IntersectionObserver on the header, so there is no scroll handler.      */
  var bar  = document.getElementById('bar');
  var head = document.getElementById('top');
  if (bar && head && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      bar.classList.toggle('is-in', !entries[0].isIntersecting);
    }, { threshold: 0, rootMargin: '-70px 0px 0px 0px' }).observe(head);
  }

  /* ---------- 3. showreel ---------- */
  var reel  = document.getElementById('reel');

  if (reel) {
    var tryPlay = function () {
      var p = reel.play();
      if (p && p.catch) p.catch(function () {});   // autoplay can be refused
    };

    // load() aborts any play() already in flight, so wait for data before
    // playing. Without this the reel loads but never starts.
    var attach = function () {
      var src = reel.querySelector('source[data-src]');
      if (src && !src.src) {
        src.src = src.getAttribute('data-src');
        reel.addEventListener('loadeddata', tryPlay, { once: true });
        reel.load();
        return;
      }
      tryPlay();
    };

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          // Pause only when the reel is fully gone. While the video's
          // intrinsic size resolves the figure changes height, which dips the
          // ratio and would otherwise stutter playback on first load.
          if (entry.intersectionRatio === 0) {
            if (!reel.paused) reel.pause();      // offscreen, stop decoding
            return;
          }
          if (entry.intersectionRatio >= 0.25) attach();
        });
      }, { threshold: [0, 0.25] }).observe(reel);
    } else {
      attach();
    }

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

  function open(trigger) {
    opener = trigger || null;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
    document.addEventListener('keydown', onKey);

    // is-live drives the sheen and the row stagger
    requestAnimationFrame(function () { overlay.classList.add('is-live'); });
  }

  function close() {
    overlay.hidden = true;
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey);
    overlay.classList.remove('is-live');
    if (card) { card.style.removeProperty('--rx'); card.style.removeProperty('--ry'); }
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
   Custom cursor.
   A small dot eases after the pointer. Inside #work a tool badge trails a
   little further behind, leans with the direction of travel, and swaps to
   the next tool every ~170px of movement. One rAF loop, stops when settled.
   ========================================================================== */
(function () {
  'use strict';

  var layer = document.getElementById('cursor');
  if (!layer) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var dot   = document.getElementById('cursor-dot');
  var tool  = document.getElementById('cursor-tool');
  var tools = tool ? tool.querySelectorAll('.tool') : [];
  if (!dot || !tool || !tools.length) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var HOT = 'a[href], button, [role="button"], summary, label';
  var STEP = 170;                    // px of travel per tool swap
  var OFFSET = 34;                   // badge sits below-right of the pointer

  var mx = -200, my = -200, lx = mx, ly = my;
  var dx = mx, dy = my, tx = mx, ty = my, tilt = 0;
  var travelled = 0, idx = 0, inWork = false, raf = null;

  function loop() {
    var kd = reduce.matches ? 1 : 0.28;
    var kt = reduce.matches ? 1 : 0.13;

    dx += (mx - dx) * kd;  dy += (my - dy) * kd;
    var gx = mx + OFFSET, gy = my + OFFSET;
    var vx = gx - tx;
    tx += vx * kt;  ty += (gy - ty) * kt;
    // lean into the direction of travel, clamped, easing back to upright
    var lean = reduce.matches ? 0 : Math.max(-14, Math.min(14, vx * 0.12));
    tilt += (lean - tilt) * 0.2;

    dot.style.transform  = 'translate3d(' + dx + 'px,' + dy + 'px,0)';
    tool.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,0) rotate(' + tilt.toFixed(2) + 'deg)';

    var rest = Math.abs(mx - dx) + Math.abs(my - dy) + Math.abs(gx - tx) + Math.abs(gy - ty) + Math.abs(tilt);
    raf = rest < 0.2 ? null : requestAnimationFrame(loop);
  }
  function kick() { if (raf === null) raf = requestAnimationFrame(loop); }

  function swap() {
    tools[idx].classList.remove('is-active');
    idx = (idx + 1) % tools.length;
    tools[idx].classList.add('is-active');
  }

  document.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse') return;
    mx = e.clientX; my = e.clientY;
    if (inWork) {
      travelled += Math.hypot(mx - lx, my - ly);
      if (travelled >= STEP) { travelled = 0; swap(); }
    }
    lx = mx; ly = my;
    layer.classList.add('is-on');
    kick();
  }, { passive: true });

  document.addEventListener('pointerover', function (e) {
    var t = e.target;
    if (!t.closest) return;
    layer.classList.toggle('is-hot', !!t.closest(HOT));
    var w = !!t.closest('#work');
    if (w !== inWork) {
      inWork = w;
      layer.classList.toggle('is-work', w);
      if (w) { tx = mx + OFFSET; ty = my + OFFSET; }   // appear at the pointer, not flying in
    }
  });

  document.addEventListener('pointerout', function (e) {
    if (!e.relatedTarget) { layer.classList.remove('is-on', 'is-work', 'is-hot'); inWork = false; }
  });
  document.addEventListener('pointerdown', function () { layer.classList.add('is-down'); });
  document.addEventListener('pointerup',   function () { layer.classList.remove('is-down'); });
})();

/* ==========================================================================
   Pointer-aware tiles. Writes the cursor position onto each stat tile and
   service card so the light (stats) and the colour flood (services) start
   from where the cursor actually is. Stat tiles also lean toward it.
   ========================================================================== */
(function () {
  'use strict';
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.querySelectorAll('.stat, .svc').forEach(function (el) {
    var tilt = el.classList.contains('stat');
    var frame = null, px = 0, py = 0;

    function apply() {
      frame = null;
      var r = el.getBoundingClientRect();
      var x = (px - r.left) / r.width, y = (py - r.top) / r.height;
      el.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
      el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      if (tilt && !reduce.matches) {
        el.style.setProperty('--ry', ((x - 0.5) * 6).toFixed(2) + 'deg');
        el.style.setProperty('--rx', ((0.5 - y) * 6).toFixed(2) + 'deg');
      }
    }

    function track(e) {
      px = e.clientX; py = e.clientY;
      if (frame === null) frame = requestAnimationFrame(apply);
    }

    el.addEventListener('pointerenter', function (e) { px = e.clientX; py = e.clientY; apply(); });
    el.addEventListener('pointermove', track);
    el.addEventListener('pointerleave', function () {
      el.style.removeProperty('--rx');
      el.style.removeProperty('--ry');
    });
  });
})();
