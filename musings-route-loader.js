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

  try {
    const response = await fetch('/musings.html?v=20260821-routes', { cache: 'no-cache' });
    if (!response.ok) throw new Error('Unable to load Musings source: ' + response.status);

    const html = await response.text();
    const source = new DOMParser().parseFromString(html, 'text/html');
    source.body.querySelectorAll('script').forEach((script) => script.remove());

    document.body.className = source.body.className || 'musings-page';
    document.body.innerHTML = source.body.innerHTML;

    await loadScript('/script.js?v=20260821-routes');
    await loadScript('/musings-transparent-art.js?v=20260817a');
  } catch (error) {
    console.error(error);
    if (loader) {
      loader.innerHTML = '<main style="max-width:760px;margin:80px auto;padding:24px;font-family:Inter,Arial,sans-serif"><h1>Musings</h1><p>This page did not load as expected.</p><p><a href="/musings.html">Open the Musings page →</a></p></main>';
    }
  }
})();