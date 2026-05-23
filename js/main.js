/* =============================================================================
   MAIN.JS — Comportamientos globales del sitio Alikriss
   - Nav: clase .nav--scrolled al hacer scroll (CSS controla el estilo)
   - Reveal: animación de entrada al hacer scroll para .reveal
   - Smooth scroll: para todos los <a href="#...">
   Nota: respeta prefers-reduced-motion (las animaciones .reveal están
   deshabilitadas via CSS cuando el usuario lo prefiere).
============================================================================= */

(function () {
  'use strict';

  /* ── 1. Nav — clase al scroll ────────────────────────────────────────── */
  const nav = document.querySelector('.nav');

  if (nav) {
    const SCROLL_THRESHOLD = 60;

    const updateNav = () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav(); /* estado inicial */
  }


  /* ── 2. Reveal al scroll ─────────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target); /* solo una vez */
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    /* Fallback para navegadores sin IntersectionObserver */
    revealEls.forEach((el) => el.classList.add('visible'));
  }


  /* ── 3. Smooth scroll para anclas internas ───────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
