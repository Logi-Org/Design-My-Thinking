(function () {
  const sliders = document.querySelectorAll('[data-dmt-slider]');

  sliders.forEach((slider) => {
    const viewport = slider.querySelector('.dmt-slider__viewport');
    const track = slider.querySelector('.dmt-slider__track');
    const slides = Array.from(slider.querySelectorAll('.dmt-slide'));
    const prev = slider.querySelector('.dmt-slider__button--prev');
    const next = slider.querySelector('.dmt-slider__button--next');
    const dotsHost = slider.querySelector('.dmt-slider__dots');
    const counter = slider.querySelector('.dmt-slider__counter');
    if (!viewport || !track || !slides.length || !prev || !next) return;

    let currentPage = 0;
    let touchStartX = null;

    function perView() {
      if (window.matchMedia('(max-width: 700px)').matches) return 1;
      if (window.matchMedia('(max-width: 980px)').matches) return 2;
      return 3;
    }

    function pageCount() {
      return Math.ceil(slides.length / perView());
    }

    function pageOffset(page) {
      const index = Math.min(page * perView(), slides.length - 1);
      return slides[index].offsetLeft - slides[0].offsetLeft;
    }

    function renderDots(totalPages) {
      if (!dotsHost) return;
      dotsHost.replaceChildren();
      for (let i = 0; i < totalPages; i += 1) {
        const dot = document.createElement('span');
        dot.className = 'dmt-slider__dot' + (i === currentPage ? ' is-active' : '');
        dot.setAttribute('aria-hidden', 'true');
        dotsHost.appendChild(dot);
      }
    }

    function update() {
      const totalPages = pageCount();
      currentPage = Math.max(0, Math.min(currentPage, totalPages - 1));
      track.style.transform = `translate3d(${-pageOffset(currentPage)}px, 0, 0)`;
      prev.disabled = currentPage === 0;
      next.disabled = currentPage >= totalPages - 1;
      if (counter) counter.textContent = `${currentPage + 1} / ${totalPages}`;
      renderDots(totalPages);

      const visibleStart = currentPage * perView();
      const visibleEnd = visibleStart + perView();
      slides.forEach((slide, index) => {
        slide.setAttribute('aria-hidden', index < visibleStart || index >= visibleEnd ? 'true' : 'false');
      });
    }

    function go(delta) {
      currentPage += delta;
      update();
    }

    prev.addEventListener('click', () => go(-1));
    next.addEventListener('click', () => go(1));

    viewport.setAttribute('tabindex', '0');
    viewport.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        go(-1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        go(1);
      }
    });

    viewport.addEventListener('touchstart', (event) => {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    viewport.addEventListener('touchend', (event) => {
      if (touchStartX === null) return;
      const delta = event.changedTouches[0].clientX - touchStartX;
      touchStartX = null;
      if (Math.abs(delta) < 45) return;
      go(delta < 0 ? 1 : -1);
    }, { passive: true });

    let resizeTimer;
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        currentPage = 0;
        update();
      }, 100);
    });

    update();
  });
})();

/* Old Work links on secondary pages now land on the homepage glimpse section. */
document.querySelectorAll('a[href="case_studies.html"]').forEach((link) => {
  link.setAttribute('href', 'index.html#glimpses');
});
