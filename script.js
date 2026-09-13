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
  var sound = document.getElementById('sound');

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

    if (sound) {
      sound.addEventListener('click', function () {
        reel.muted = !reel.muted;
        sound.setAttribute('aria-pressed', reel.muted ? 'false' : 'true');
        sound.textContent = reel.muted ? 'Sound off' : 'Sound on';
        if (!reel.muted) tryPlay();
      });
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
      var play = function () {
        var p = video.play();
        if (p && p.catch) p.catch(function () {});  // autoplay can be refused
      };
      var src = video.querySelector('source[data-src]');
      if (src && !src.src) {
        src.src = src.getAttribute('data-src');
        video.addEventListener('loadeddata', play, { once: true });
        video.load();
      } else {
        play();
      }
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
