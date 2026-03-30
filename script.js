document.addEventListener('DOMContentLoaded', () => {
  /* ---- ELEMENTS ---- */
  const navLinks      = document.querySelectorAll('.nav-link[data-tab]');
  const tabContents   = document.querySelectorAll('.tab-content');
  const hamburger     = document.querySelector('.hamburger');
  const navLinksList  = document.querySelector('.nav-links');
  const header        = document.querySelector('.header');

  /* ---- TAB SWITCHING ---- */
  function switchTab(tabId) {
    navLinks.forEach(l => l.classList.toggle('active', l.dataset.tab === tabId));
    tabContents.forEach(c => c.classList.toggle('active', c.id === tabId));

    // close mobile menu
    hamburger?.classList.remove('active');
    navLinksList?.classList.remove('open');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // re-arm scroll reveals for the new tab
    setTimeout(initScrollReveal, 150);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (link.dataset.tab) switchTab(link.dataset.tab);
    });
  });

  // brand click → home
  document.querySelector('.nav-brand')?.addEventListener('click', () => switchTab('about'));

  /* ---- HAMBURGER ---- */
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksList.classList.toggle('open');
  });

  /* ---- FAQ ACCORDION ---- */
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });

  /* ---- HEADER SCROLL SHADOW ---- */
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* ---- SCROLL REVEAL ---- */
  function initScrollReveal() {
    const els = document.querySelectorAll('.reveal:not(.visible)');
    const io  = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
  }
  initScrollReveal();

  /* ---- PROJECT FILTERS ---- */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // update active button
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // show/hide cards
      document.querySelectorAll('.project-card').forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ---- HERO CTA → CONTACT TAB ---- */
  document.querySelector('.hero-cta')?.addEventListener('click', () => switchTab('contact'));

  /* ---- FOOTER CTA → CONTACT TAB ---- */
  document.querySelector('#footer-cta-btn')?.addEventListener('click', () => switchTab('contact'));
});
