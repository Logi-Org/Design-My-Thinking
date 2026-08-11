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

/*
  Reusable content modal.
  Preferred pattern: trigger uses data-modal-template="template-id" and the page
  contains a matching <template id="template-id">. The same shell can therefore
  host musings, case studies, future narrated notes, images, or legacy PDFs.
*/
(function () {
  const modal = document.getElementById('serviceModal');
  if (!modal) return;

  const panel = modal.querySelector('.modal-panel');
  const closeBtn = modal.querySelector('.modal-close');
  const host = modal.querySelector('#serviceModalContent');
  const modalImg = modal.querySelector('#serviceModalImg');
  const modalPdf = modal.querySelector('#serviceModalPdf');
  let lastFocusedEl = null;

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

  function openTemplate(templateId, label) {
    const template = document.getElementById(templateId);
    if (!template || !host) return;
    lastFocusedEl = document.activeElement;
    resetContent();
    host.appendChild(template.content.cloneNode(true));
    if (panel && label) panel.setAttribute('aria-label', label);
    setOpenState(true);
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

  function closeModal() {
    setOpenState(false);
    resetContent();
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
      if (templateId) openTemplate(templateId, label);
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

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (panel && !panel.contains(e.target)) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
})();
