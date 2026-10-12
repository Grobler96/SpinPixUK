// Static hosts like GitHub Pages return a 404 status for paths that have no file, even when a 404.html
// serves the app. Give every route its own index.html so direct links return 200 and can be indexed.
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';

const app = readFileSync('src/App.tsx', 'utf8');
const routes = [...app.matchAll(/path="\/([a-z0-9-]+)"/g)].map((m) => m[1]);
if (routes.length === 0) throw new Error('No routes found in src/App.tsx');

for (const route of routes) {
  mkdirSync(`dist/${route}`, { recursive: true });
  copyFileSync('dist/index.html', `dist/${route}/index.html`);
}
// Unknown URLs still get the app (its own "page not found" screen).
copyFileSync('dist/index.html', 'dist/404.html');

console.log(`Copied index.html for ${routes.length} routes: ${routes.join(', ')}`);
