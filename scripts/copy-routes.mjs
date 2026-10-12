// Post-build step for static hosting (GitHub Pages).
//  1. Gives every route its own index.html so direct links return 200 (not the 404 that a 404.html fallback sends),
//     with that page's own title, description, canonical URL and social tags so link previews and search results are right.
//  2. Writes sitemap.xml and robots.txt.
//  3. Keeps 404.html for unknown addresses.
// Routes come from src/App.tsx; titles and descriptions from src/data/seo.json (also used by the in-app useSEO hook).
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const SITE_URL = (process.env.SITE_URL || 'https://grobler96.github.io/SpinPixUK').replace(/\/+$/, '');
const seo = JSON.parse(readFileSync('src/data/seo.json', 'utf8'));
const app = readFileSync('src/App.tsx', 'utf8');
const routes = [...app.matchAll(/path="\/([a-z0-9-]+)"/g)].map((m) => `/${m[1]}`);
if (routes.length === 0) throw new Error('No routes found in src/App.tsx');

const template = readFileSync('dist/index.html', 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function page(path, meta) {
  const url = `${SITE_URL}${path === '/' ? '/' : path}`;
  let html = template;
  const swap = (re, to) => {
    if (!re.test(html)) throw new Error(`index.html is missing a tag matching ${re}`);
    html = html.replace(re, () => to);
  };
  swap(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
  swap(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(meta.description)}" />`);
  swap(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);
  swap(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`);
  swap(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(meta.title)}" />`);
  swap(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(meta.description)}" />`);
  if (meta.noindex) html = html.replace('<meta charset="UTF-8" />', '<meta charset="UTF-8" />\n    <meta name="robots" content="noindex" />');
  return html.replaceAll('__SITE_URL__', SITE_URL);
}

writeFileSync('dist/index.html', page('/', seo['/']));
for (const route of routes) {
  const meta = seo[route];
  if (!meta) throw new Error(`Add "${route}" to src/data/seo.json`);
  mkdirSync(`dist${route}`, { recursive: true });
  writeFileSync(`dist${route}/index.html`, page(route, meta));
}
writeFileSync('dist/404.html', page('/404', seo['404']));

const indexable = ['/', ...routes.filter((r) => !seo[r].noindex)];
const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable
    .map((r) => `  <url><loc>${SITE_URL}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`,
);
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`Built ${routes.length} route pages + sitemap.xml (${indexable.length} URLs) + robots.txt for ${SITE_URL}`);
