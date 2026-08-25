(function () {
  document.querySelectorAll('.carousel').forEach(function (carousel) {
    const viewport = carousel.querySelector('.carousel-viewport');
    const prev = carousel.querySelector('.prev');
    const next = carousel.querySelector('.next');
    if (!viewport || !prev || !next) return;

    function updateButtons() {
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      prev.disabled = viewport.scrollLeft <= 0;
      next.disabled = viewport.scrollLeft >= maxScroll - 1;
    }

    function scrollByAmount(dir) {
      const step = Math.max(320, viewport.clientWidth * 0.6);
      viewport.scrollBy({ left: dir * step, behavior: 'smooth' });
    }

    prev.addEventListener('click', () => scrollByAmount(-1));
    next.addEventListener('click', () => scrollByAmount(1));
    viewport.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);
    viewport.setAttribute('tabindex', '0');
    viewport.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') scrollByAmount(-1);
      if (e.key === 'ArrowRight') scrollByAmount(1);
    });
    setTimeout(updateButtons, 0);
  });
})();

/* Mobile navigation */
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#site-nav');
  if (!toggle || !nav) return;

  function closeMenu() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }

  function openMenu() {
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
  }

  toggle.addEventListener('click', () => {
    nav.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
})();

/* Reusable content modal + clean Musings URLs. */
(function () {
  const modal = document.getElementById('serviceModal');
  if (!modal) return;

  const panel = modal.querySelector('.modal-panel');
  const closeBtn = modal.querySelector('.modal-close');
  const host = modal.querySelector('#serviceModalContent');
  const modalImg = modal.querySelector('#serviceModalImg');
  const modalPdf = modal.querySelector('#serviceModalPdf');
  let lastFocusedEl = null;

  const musingRoutes = {
    'musing-scenarios': { slug: 'scenarios-stretch-thinking', label: 'Scenarios stretch thinking' },
    'musing-questions': { slug: 'seed-the-question-not-the-answer', label: 'Seed the question, not the answer' },
    'musing-canvas': { slug: 'the-value-of-a-canvas', label: 'The value of a canvas' },
    'musing-html': { slug: 'when-post-its-become-wallpaper', label: 'When Post-its become wallpaper' },
    'musing-reverse-flow': { slug: 'sometimes-the-quiet-should-come-last', label: 'Sometimes the quiet should come last' }
  };

  function isMusingsLocation() {
    const pathname = window.location.pathname.toLowerCase();
    return pathname === '/musings.html' || pathname === '/musings' || pathname.startsWith('/musings/');
  }

  function templateForCurrentRoute() {
    const match = window.location.pathname.match(/^\/musings\/([^/]+)\/?$/i);
    if (!match) return null;
    const slug = decodeURIComponent(match[1]).toLowerCase();
    return Object.keys(musingRoutes).find((templateId) => musingRoutes[templateId].slug === slug) || null;
  }

  function setMusingUrl(templateId) {
    if (!isMusingsLocation() || !window.history || !window.history.pushState) return;
    const route = musingRoutes[templateId];
    if (!route) return;
    const nextPath = '/musings/' + route.slug + '/';
    if (window.location.pathname !== nextPath) {
      window.history.pushState({ musing: route.slug }, '', nextPath);
    }
  }

  function setMusingIndexUrl() {
    if (!isMusingsLocation() || !window.history || !window.history.replaceState) return;
    if (window.location.pathname !== '/musings/') {
      window.history.replaceState({}, '', '/musings/');
    }
  }

  function setOpenState(isOpen) {
    modal.classList.toggle('is-open', isOpen);
    modal.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (panel && isOpen) panel.scrollTop = 0;
  }

  function resetContent() {
    if (host) host.replaceChildren();
    if (modalImg) {
      modalImg.removeAttribute('src');
      modalImg.alt = '';
      modalImg.style.display = 'none';
    }
    if (modalPdf) {
      modalPdf.removeAttribute('src');
      modalPdf.style.display = 'none';
    }
  }

  function openTemplate(templateId, label, syncRoute) {
    const template = document.getElementById(templateId);
    if (!template || !host) return;
    lastFocusedEl = document.activeElement;
    resetContent();
    host.appendChild(template.content.cloneNode(true));
    if (panel && label) panel.setAttribute('aria-label', label);
    setOpenState(true);
    if (syncRoute) setMusingUrl(templateId);
    if (musingRoutes[templateId]) document.title = musingRoutes[templateId].label + ' — Design My Thinking';
    if (closeBtn) closeBtn.focus();
  }

  function openImage(imgSrc, imgAlt) {
    if (!modalImg) return;
    lastFocusedEl = document.activeElement;
    resetContent();
    modalImg.src = imgSrc;
    modalImg.alt = imgAlt || 'Details';
    modalImg.style.display = 'block';
    setOpenState(true);
    if (closeBtn) closeBtn.focus();
  }

  function openPdf(pdfSrc) {
    if (!modalPdf) return;
    lastFocusedEl = document.activeElement;
    resetContent();
    modalPdf.src = pdfSrc + '#toolbar=0&navpanes=0&scrollbar=1';
    modalPdf.style.display = 'block';
    setOpenState(true);
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(syncRoute) {
    setOpenState(false);
    resetContent();
    if (syncRoute && templateForCurrentRoute()) setMusingIndexUrl();
    if (isMusingsLocation()) document.title = 'Musings — Design My Thinking';
    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') lastFocusedEl.focus();
  }

  function activateTrigger(el, handler) {
    el.addEventListener('click', handler);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handler(e);
      }
    });
  }

  document.querySelectorAll('[data-modal-template]').forEach((el) => {
    activateTrigger(el, (e) => {
      if (el.tagName.toLowerCase() === 'a') e.preventDefault();
      const templateId = el.getAttribute('data-modal-template');
      const label = el.getAttribute('data-modal-label') || el.textContent.trim();
      if (templateId) openTemplate(templateId, label, true);
    });
  });

  document.querySelectorAll('[data-modal-img]').forEach((el) => {
    activateTrigger(el, (e) => {
      if (el.tagName.toLowerCase() === 'a') e.preventDefault();
      const src = el.getAttribute('data-modal-img');
      if (src) openImage(src, el.getAttribute('data-modal-alt') || '');
    });
  });

  document.querySelectorAll('[data-modal-pdf]').forEach((el) => {
    activateTrigger(el, (e) => {
      if (el.tagName.toLowerCase() === 'a') e.preventDefault();
      const src = el.getAttribute('data-modal-pdf');
      if (src) openPdf(src);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', () => closeModal(true));
  modal.addEventListener('click', (e) => {
    if (panel && !panel.contains(e.target)) closeModal(true);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal(true);
  });

  if (isMusingsLocation()) {
    const routeTemplate = templateForCurrentRoute();
    if (routeTemplate) openTemplate(routeTemplate, musingRoutes[routeTemplate].label, false);

    window.addEventListener('popstate', () => {
      const templateId = templateForCurrentRoute();
      if (templateId) {
        openTemplate(templateId, musingRoutes[templateId].label, false);
      } else if (window.location.pathname === '/musings/' || window.location.pathname === '/musings') {
        if (modal.classList.contains('is-open')) closeModal(false);
      }
    });
  }
})();

/* Keep the public site language and approved illustrated visual system consistent across inner pages. */
(function () {
  const pathname = window.location.pathname.toLowerCase();
  const path = (pathname.split('/').pop() || '').toLowerCase();
  const isHome = pathname === '/' || pathname === '/index.html';
  const isMusings = pathname === '/musings.html' || pathname === '/musings' || pathname.startsWith('/musings/');

  function loadCss(href) {
    const base = href.split('?')[0];
    if (document.querySelector('link[href*="' + base + '"]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }

  if (!isHome) loadCss('/illustrated-site.css?v=20260815a');

  /* These files contain the approved high-resolution raster illustrations as data URIs.
     Loading them explicitly means Musings never falls back to the rejected SVG artwork. */
  if (isMusings || path === 'approach.html') {
    loadCss('/inner-art-scenarios.css?v=20260815a');
    loadCss('/inner-art-question.css?v=20260815a');
    loadCss('/inner-art-canvas.css?v=20260815a');
    loadCss('/inner-art-wallpaper.css?v=20260815a');
  }
  if (isMusings) loadCss('/musings-refined.css?v=20260815a');
  if (path === 'about.html') loadCss('/about-refined.css?v=20260815a');
  if (path === 'contact.html') loadCss('/contact-refined.css?v=20260815a');
  if (path === 'thank-you.html') {
    loadCss('/inner-art-thanks.css?v=20260815a');
    loadCss('/thank-you-refined.css?v=20260815a');
  }

  const nav = document.getElementById('site-nav');
  if (nav && !isHome) {
    const current = path === 'approach.html' ? 'approach' : isMusings ? 'musings' : path === 'about.html' ? 'about' : path === 'contact.html' ? 'contact' : '';
    nav.innerHTML = [
      '<a href="/index.html#glimpses">Work</a>',
      '<a href="/approach.html"' + (current === 'approach' ? ' aria-current="page"' : '') + '>Approach</a>',
      '<a href="/musings/"' + (current === 'musings' ? ' aria-current="page"' : '') + '>Musings</a>',
      '<a href="/about.html"' + (current === 'about' ? ' aria-current="page"' : '') + '>About</a>',
      '<a href="/contact.html"' + (current === 'contact' ? ' aria-current="page"' : '') + '>Contact</a>'
    ].join('');
    const toggle = document.querySelector('.nav-toggle');
    nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  document.querySelectorAll('a[href="how-we-work.html"]').forEach((a) => { a.href = '/approach.html'; a.textContent = 'Approach'; });
  document.querySelectorAll('a[href="musings.html"]').forEach((a) => { a.href = '/musings/'; });
  document.querySelectorAll('.footer h5').forEach((h) => {
    if (h.textContent.trim().toLowerCase() !== 'explore') return;
    const ul = h.parentElement && h.parentElement.querySelector('ul');
    if (ul) ul.innerHTML = '<li><a href="/index.html#glimpses">Work</a></li><li><a href="/approach.html">Approach</a></li><li><a href="/musings/">Musings</a></li><li><a href="/about.html">About</a></li><li><a href="/contact.html">Contact</a></li>';
  });

  if (isMusings) {
    ['scenarios','questions','canvas','html','reverse-flow'].forEach((name, i) => {
      const thumb = document.querySelectorAll('.musing-thumb')[i];
      if (thumb) thumb.classList.add('musing-thumb--' + name);
      const sketch = document.querySelectorAll('.field-note-sketch')[i];
      if (sketch) sketch.classList.add('field-note-sketch--' + name);
    });
  }
})();