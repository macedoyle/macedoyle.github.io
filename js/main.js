/* ============================================================
   KENZIE DOYLE PORTFOLIO — MAIN JS
   ============================================================ */

/* ── CUSTOM CURSOR ──────────────────────────────────────── */
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

if (dot && ring) {
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  // Ring follows with slight lag
  function animateRing() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover state for interactive elements
  document.querySelectorAll('a, button, .work-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
}

/* ── SCROLL REVEAL ──────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger cards in a grid
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .work-card').forEach((el, i) => {
  // Stagger grid items
  if (el.classList.contains('work-card')) {
    el.dataset.delay = (i % 3) * 120;
  }
  revealObserver.observe(el);
});

/* ── ACTIVE NAV LINK ────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

if (sections.length && navLinks.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => navObserver.observe(s));
}

/* ── TICKER DUPLICATE (seamless loop) ───────────────────── */
const track = document.querySelector('.ticker-track');
if (track) {
  // Duplicate children for seamless infinite scroll
  const items = track.innerHTML;
  track.innerHTML = items + items;
}

/* ── PAGE TRANSITION FADE ───────────────────────────────── */
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  // Only internal page links (not anchors, not mailto)
  if (href && !href.startsWith('#') && !href.startsWith('mailto') && !href.startsWith('http')) {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.35s ease';
      setTimeout(() => { window.location.href = href; }, 350);
    });
  }
});

// Fade in on page load
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
});
