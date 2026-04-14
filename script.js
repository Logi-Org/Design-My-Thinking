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

/* =========================================================
   Mobile nav / hamburger toggle
   ========================================================= */
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
    const isOpen = nav.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.addEventListener('click', (e) => {
    const clickedInside = nav.contains(e.target) || toggle.contains(e.target);
    if (!clickedInside) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  nav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => closeMenu());
  });
})();

/* =========================================================
   Service modal / lightbox (supports images + PDFs)
   - Home page: elements with [data-modal-img]
   - Musings / case studies: elements with [data-modal-pdf]
   ========================================================= */
(function () {
  const modal = document.getElementById('serviceModal');
  if (!modal) return;

  const modalImg = document.getElementById('serviceModalImg');
  const modalPdf = document.getElementById('serviceModalPdf');
  const closeBtn = modal.querySelector('.modal-close');
  const panel = modal.querySelector('.modal-panel');

  let lastFocusedEl = null;

  function setOpenState(isOpen) {
    if (isOpen) {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  function resetMedia() {
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

  function openImage(imgSrc, imgAlt) {
    lastFocusedEl = document.activeElement;

    resetMedia();

    if (!modalImg) return;

    modalImg.src = imgSrc;
    modalImg.alt = imgAlt || 'Service details';
    modalImg.style.display = 'block';

    setOpenState(true);

    if (closeBtn) closeBtn.focus();
  }

  function openPdf(pdfSrc) {
    lastFocusedEl = document.activeElement;

    resetMedia();

    if (!modalPdf) return;

    // Fit the PDF more cleanly within the iframe viewer
    modalPdf.setAttribute('src', pdfSrc + '#view=FitH');
    modalPdf.style.display = 'block';

    setOpenState(true);

    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    setOpenState(false);
    resetMedia();

    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
      lastFocusedEl.focus();
    }
  }

  document.querySelectorAll('[data-modal-img]').forEach((el) => {
    const handler = (e) => {
      if (el.tagName.toLowerCase() === 'a') e.preventDefault();

      const src = el.getAttribute('data-modal-img');
      const alt = el.getAttribute('data-modal-alt') || '';
      if (!src) return;

      openImage(src, alt);
    };

    el.addEventListener('click', handler);

    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handler(e);
      }
    });
  });

  document.querySelectorAll('[data-modal-pdf]').forEach((el) => {
    const handler = (e) => {
      if (el.tagName.toLowerCase() === 'a') e.preventDefault();

      const src = el.getAttribute('data-modal-pdf');
      if (!src) return;

      openPdf(src);
    };

    el.addEventListener('click', handler);

    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handler(e);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (panel && !panel.contains(e.target)) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
})();
