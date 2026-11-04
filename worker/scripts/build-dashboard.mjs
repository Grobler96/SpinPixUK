// Builds dashboard/worker.js: the whole backend as one plain JavaScript file that can be pasted straight into
// Cloudflare's website editor (no terminal needed to deploy). Re-run after changing src/index.ts:  npm run build:dashboard
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const out = mkdtempSync(join(tmpdir(), 'spinpix-worker-'));
execFileSync('npx', ['wrangler', 'deploy', '--dry-run', '--outdir', out], { stdio: 'ignore', shell: process.platform === 'win32' });
const code = readFileSync(join(out, 'index.js'), 'utf8').replace(/^\/\/ \.\.\/\.\.\/.*\n/gm, '').replace(/\n\/\/# sourceMappingURL=.*$/m, '');
const header = `// SpinPix UK event portal backend: paste this whole file into a Cloudflare Worker.
// Generated from worker/src/index.ts by "npm run build:dashboard". Do not edit by hand.
// Needs: a KV binding named EVENTS, and two secrets: ADMIN_PASSWORD and TOKEN_SECRET.
`;
writeFileSync(new URL('../dashboard/worker.js', import.meta.url), header + code);
rmSync(out, { recursive: true, force: true });
console.log('Wrote worker/dashboard/worker.js');
