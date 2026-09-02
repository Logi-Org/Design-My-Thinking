/* Clean-route loader for /musings/ and individual musing URLs.
   musings.html remains the single source of truth for the page and field-note content. */
(async function () {
  const loader = document.getElementById('musings-route-loader');

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  function loadStyle(href) {
    if ([...document.styleSheets].some(sheet => sheet.href && sheet.href.includes(href.split('?')[0]))) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }

  try {
    const response = await fetch('/musings.html?v=20260902-musing09', { cache: 'no-cache' });
    if (!response.ok) throw new Error('Unable to load Musings source: ' + response.status);

    const html = await response.text();
    const source = new DOMParser().parseFromString(html, 'text/html');
    source.body.querySelectorAll('script').forEach((script) => script.remove());

    document.body.className = source.body.className || 'musings-page';
    document.body.innerHTML = source.body.innerHTML;

    loadStyle('/musing07.css?v=20260826a');
    loadStyle('/musing07-polish.css?v=20260826b');
    loadStyle('/musing07-polish-fix.css?v=20260826d');
    loadStyle('/musing07-visual-v2.css?v=20260826e');
    loadStyle('/musing07-paper-match.css?v=20260826j');
    loadStyle('/musing08.css?v=20260827d');
    loadStyle('/musing09.css?v=20260902a');
    await loadScript('/script.js?v=20260825a');
    await loadScript('/musings-transparent-art.js?v=20260826e');
    await loadScript('/musing06-card-paper-match.js?v=20260826a');
    await loadScript('/musing07.js?v=20260826a');
    await loadScript('/musing07-polish.js?v=20260826b');
    await loadScript('/musing07-visual-v2.js?v=20260826e');
    await loadScript('/musing07-loop-fix.js?v=20260826f');
    await loadScript('/musing07-image-fix.js?v=20260826h');
    await loadScript('/musing08.js?v=20260827a');
    await loadScript('/musing08-image.js?v=20260827d');
    await loadScript('/musing09.js?v=20260902a');
    await loadScript('/musing09-image.js?v=20260902b');
  } catch (error) {
    console.error(error);
    if (loader) {
      loader.innerHTML = '<main style="max-width:760px;margin:80px auto;padding:24px;font-family:Inter,Arial,sans-serif"><h1>Musings</h1><p>This page did not load as expected.</p><p><a href="/musings.html">Open the Musings page →</a></p></main>';
    }
  }
})();
