/** Materialise the existing public demo page transforms into crawlable HTML.
 * Run: node scripts/build_prototype_pages.mjs [--check]
 * Uses local source files only; it does not execute the generated demo scripts.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';

const root = fileURLToPath(new URL('../', import.meta.url));
const origin = 'https://designmythinking.xyz';
const pages = [
  { slug: 'workshop-designer', source: '/prototype-workshop-designer.html' },
  { slug: 'linkedin-conversation-engine', source: '/prototype-linkedin-posts.html' },
];
const check = process.argv.includes('--check');

for (const page of pages) {
  const wrapper = await readFile(resolve(root, 'scripts/prototype-page-loaders', page.slug + '.html'), 'utf8');
  const code = wrapper.match(/<script>\s*([\s\S]*?)<\/script>/i)?.[1];
  if (!code) throw new Error('Missing page transform: ' + page.slug);
  let rendered = '';
  const context = {
    fetch: async (url) => {
      if (url.split('?')[0] !== page.source) throw new Error('Unexpected source: ' + url);
      const source = await readFile(resolve(root, page.source.slice(1)), 'utf8');
      return { ok: true, status: 200, text: async () => source };
    },
    document: { open() {}, write(html) { rendered += html; }, close() {} },
    console: { error(error) { throw error; } },
  };
  await vm.runInNewContext(code, context, { timeout: 5000 });
  if (!rendered.includes('<main') || !rendered.includes('<h1') || !rendered.includes('</body>')) {
    throw new Error('Incomplete page output: ' + page.slug);
  }
  // The existing transforms preserve the public demo behaviour and styling.
  // Add the canonical to the actual HTML rather than a runtime-only loader.
  const canonical = origin + '/prototypes/' + page.slug + '/';
  rendered = rendered.replace(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>\s*/gi, '');
  rendered = rendered.replace('</head>', '  <link rel="canonical" href="' + canonical + '" />\n</head>');
  const target = resolve(root, 'prototypes', page.slug, 'index.html');
  if (check) {
    if (await readFile(target, 'utf8') !== rendered) throw new Error('Rebuild required: ' + target);
  } else {
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, rendered);
  }
  console.log((check ? 'Checked ' : 'Built ') + '/prototypes/' + page.slug + '/');
}
