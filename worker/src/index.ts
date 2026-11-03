/**
 * SpinPix UK event portal API (Cloudflare Worker + KV).
 *
 * Ian creates an event in the admin page and pastes in the links from TouchPix (guest upload link, gallery link,
 * gallery password). The couple then log in on the website with an event code and password to get their QR code,
 * printable table cards and gallery link. Photos themselves stay in TouchPix; this only stores the event details.
 *
 *   POST   /api/admin/login                      { password }            -> { token }
 *   GET    /api/admin/events                                              -> { events }
 *   POST   /api/admin/events                     { ...fields }           -> { event, customerPassword }
 *   PUT    /api/admin/events/:code               { ...fields }           -> { event }
 *   POST   /api/admin/events/:code/reset-password                        -> { customerPassword }
 *   DELETE /api/admin/events/:code                                       -> { ok }
 *   POST   /api/portal/login                     { code, password }      -> { token, event }
 *   GET    /api/portal/event                     (customer token)        -> { event }
 */

interface KV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
  list(options: { prefix: string; cursor?: string }): Promise<{ keys: { name: string }[]; list_complete: boolean; cursor?: string }>;
}
interface Env {
  EVENTS: KV;
  ADMIN_PASSWORD: string;
  TOKEN_SECRET: string;
  ALLOWED_ORIGINS: string;
}

type StoredEvent = {
  code: string;
  title: string;
  eventDate: string; // YYYY-MM-DD or ''
  guestLink: string; // TouchPix link/QR target guests scan to upload
  galleryLink: string; // TouchPix gallery link
  galleryPassword: string; // TouchPix gallery password, shown to the couple only
  embedGallery: boolean; // show the gallery inside the website (only if TouchPix allows it)
  notes: string; // extra instructions shown to the couple
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
  updatedAt: string;
};

const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no 0/O, 1/I/L
const enc = new TextEncoder();
const TOKEN_HOURS = { admin: 12, event: 8 } as const;

/* ---------- small helpers ---------- */
const b64 = (bytes: ArrayBuffer | Uint8Array) => {
  const a = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let s = '';
  a.forEach((x) => (s += String.fromCharCode(x)));
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};
const unb64 = (s: string) => {
  const p = s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4);
  return Uint8Array.from(atob(p), (c) => c.charCodeAt(0));
};
const randomString = (len: number) => {
  const r = crypto.getRandomValues(new Uint8Array(len));
  return Array.from(r, (x) => ALPHABET[x % ALPHABET.length]).join('');
};
const same = (a: string, b: string) => {
  // constant-time comparison of two equal-purpose strings
  const x = enc.encode(a), y = enc.encode(b);
  let d = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) d |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return d === 0;
};
const sha256 = async (s: string) => b64(await crypto.subtle.digest('SHA-256', enc.encode(s)));

async function hashPassword(password: string, salt: string) {
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: unb64(salt), iterations: 100000 }, key, 256);
  return b64(bits);
}
const normalisePassword = (p: string) => p.toUpperCase().replace(/[^A-Z0-9]/g, '');
const normaliseCode = (c: string) => {
  const t = c.toUpperCase().replace(/[^A-Z0-9]/g, '');
  return t.startsWith('SPX') ? `SPX-${t.slice(3)}` : `SPX-${t}`;
};
const newCustomerPassword = () => { const p = randomString(8); return `${p.slice(0, 4)}-${p.slice(4)}`; };

async function hmac(secret: string, data: string) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return b64(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
}
async function makeToken(env: Env, role: 'admin' | 'event', subject: string) {
  const exp = Math.floor(Date.now() / 1000) + TOKEN_HOURS[role] * 3600;
  const body = `${role}.${subject}.${exp}`;
  return `${body}.${await hmac(env.TOKEN_SECRET, body)}`;
}
async function readToken(env: Env, request: Request, role: 'admin' | 'event'): Promise<string | null> {
  const h = request.headers.get('Authorization') ?? '';
  const t = h.startsWith('Bearer ') ? h.slice(7) : '';
  const parts = t.split('.');
  if (parts.length !== 4) return null;
  const [r, subject, exp, sig] = parts;
  if (r !== role || Number(exp) < Date.now() / 1000) return null;
  if (!same(sig, await hmac(env.TOKEN_SECRET, `${r}.${subject}.${exp}`))) return null;
  return subject;
}

/* ---------- responses & CORS ---------- */
function corsHeaders(request: Request, env: Env): Record<string, string> {
  const origin = request.headers.get('Origin');
  const allowed = env.ALLOWED_ORIGINS.split(',').map((s) => s.trim()).filter(Boolean);
  const h: Record<string, string> = { Vary: 'Origin' };
  if (origin && allowed.includes(origin)) {
    h['Access-Control-Allow-Origin'] = origin;
    h['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
    h['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    h['Access-Control-Max-Age'] = '86400';
  }
  return h;
}
const reply = (request: Request, env: Env, data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...corsHeaders(request, env),
    },
  });
class HttpError extends Error { constructor(public status: number, message: string) { super(message); } }

/* ---------- login throttling (best effort: 10 tries / 15 min per address) ---------- */
async function throttle(env: Env, request: Request, scope: string) {
  const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
  const key = `rl:${scope}:${await sha256(ip)}`;
  const n = Number((await env.EVENTS.get(key)) ?? '0');
  if (n >= 10) throw new HttpError(429, 'Too many attempts. Please wait 15 minutes and try again.');
  await env.EVENTS.put(key, String(n + 1), { expirationTtl: 900 });
  return () => env.EVENTS.delete(key); // call after a successful login to clear the counter
}

/* ---------- validation ---------- */
const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
function httpsUrl(v: unknown, label: string, required: boolean) {
  const s = clean(v, 600);
  if (!s) { if (required) throw new HttpError(400, `${label} is required.`); return ''; }
  try {
    const u = new URL(s);
    if (u.protocol !== 'https:') throw new Error();
    return u.toString();
  } catch { throw new HttpError(400, `${label} must be a full https:// link.`); }
}
function readFields(body: Record<string, unknown>) {
  const title = clean(body.title, 80);
  if (!title) throw new HttpError(400, 'Please enter a name for the event, e.g. "Toni & Luke".');
  const eventDate = clean(body.eventDate, 10);
  if (eventDate && !/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) throw new HttpError(400, 'The event date must look like 2026-09-26.');
  return {
    title,
    eventDate,
    guestLink: httpsUrl(body.guestLink, 'The guest upload link', false),
    galleryLink: httpsUrl(body.galleryLink, 'The gallery link', false),
    galleryPassword: clean(body.galleryPassword, 100),
    embedGallery: body.embedGallery === true,
    notes: clean(body.notes, 1000),
  };
}
const publicView = (e: StoredEvent) => {
  const { passwordHash: _h, passwordSalt: _s, ...rest } = e; // eslint-disable-line @typescript-eslint/no-unused-vars
  return rest;
};

/* ---------- storage ---------- */
const getEvent = async (env: Env, code: string) => {
  const raw = await env.EVENTS.get(`event:${code}`);
  return raw ? (JSON.parse(raw) as StoredEvent) : null;
};
const saveEvent = (env: Env, e: StoredEvent) => env.EVENTS.put(`event:${e.code}`, JSON.stringify(e));
async function listEvents(env: Env) {
  const out: StoredEvent[] = [];
  let cursor: string | undefined;
  do {
    const page = await env.EVENTS.list({ prefix: 'event:', cursor });
    for (const k of page.keys) { const raw = await env.EVENTS.get(k.name); if (raw) out.push(JSON.parse(raw)); }
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);
  return out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
async function withNewPassword(e: StoredEvent) {
  const customerPassword = newCustomerPassword();
  const passwordSalt = b64(crypto.getRandomValues(new Uint8Array(16)));
  const passwordHash = await hashPassword(normalisePassword(customerPassword), passwordSalt);
  return { customerPassword, event: { ...e, passwordSalt, passwordHash } };
}

/* ---------- routes ---------- */
async function route(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, '');
  const method = request.method;
  const json = async () => {
    try { return (await request.json()) as Record<string, unknown>; } catch { throw new HttpError(400, 'Invalid request.'); }
  };

  if (path === '/api/health') return reply(request, env, { ok: true });

  /* customer */
  if (path === '/api/portal/login' && method === 'POST') {
    const clearThrottle = await throttle(env, request, 'portal');
    const b = await json();
    const code = normaliseCode(clean(b.code, 40));
    const ev = await getEvent(env, code);
    const supplied = await hashPassword(normalisePassword(clean(b.password, 40)), ev?.passwordSalt ?? b64(new Uint8Array(16)));
    if (!ev || !same(supplied, ev.passwordHash)) throw new HttpError(401, 'That event code and password don’t match. Please check them and try again.');
    await clearThrottle();
    return reply(request, env, { token: await makeToken(env, 'event', ev.code), event: publicView(ev) });
  }
  if (path === '/api/portal/event' && method === 'GET') {
    const code = await readToken(env, request, 'event');
    const ev = code ? await getEvent(env, code) : null;
    if (!ev) throw new HttpError(401, 'Please log in again.');
    return reply(request, env, { event: publicView(ev) });
  }

  /* admin */
  if (path === '/api/admin/login' && method === 'POST') {
    const clearThrottle = await throttle(env, request, 'admin');
    const b = await json();
    if (!env.ADMIN_PASSWORD || !same(await sha256(clean(b.password, 200)), await sha256(env.ADMIN_PASSWORD))) throw new HttpError(401, 'Wrong password.');
    await clearThrottle();
    return reply(request, env, { token: await makeToken(env, 'admin', 'admin') });
  }
  if (path.startsWith('/api/admin/')) {
    if (!(await readToken(env, request, 'admin'))) throw new HttpError(401, 'Please log in again.');

    if (path === '/api/admin/events' && method === 'GET') return reply(request, env, { events: (await listEvents(env)).map(publicView) });

    if (path === '/api/admin/events' && method === 'POST') {
      const fields = readFields(await json());
      let code = '';
      do { code = `SPX-${randomString(6)}`; } while (await getEvent(env, code));
      const now = new Date().toISOString();
      const base: StoredEvent = { code, ...fields, passwordHash: '', passwordSalt: '', createdAt: now, updatedAt: now };
      const { customerPassword, event } = await withNewPassword(base);
      await saveEvent(env, event);
      return reply(request, env, { event: publicView(event), customerPassword }, 201);
    }

    const m = path.match(/^\/api\/admin\/events\/([A-Za-z0-9-]+)(\/reset-password)?$/);
    if (m) {
      const code = normaliseCode(m[1]);
      const ev = await getEvent(env, code);
      if (!ev) throw new HttpError(404, 'Event not found.');
      if (m[2] && method === 'POST') {
        const { customerPassword, event } = await withNewPassword({ ...ev, updatedAt: new Date().toISOString() });
        await saveEvent(env, event);
        return reply(request, env, { event: publicView(event), customerPassword });
      }
      if (!m[2] && method === 'PUT') {
        const updated = { ...ev, ...readFields(await json()), updatedAt: new Date().toISOString() };
        await saveEvent(env, updated);
        return reply(request, env, { event: publicView(updated) });
      }
      if (!m[2] && method === 'DELETE') { await env.EVENTS.delete(`event:${code}`); return reply(request, env, { ok: true }); }
    }
  }
  throw new HttpError(404, 'Not found.');
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders(request, env) });
    try {
      return await route(request, env);
    } catch (err) {
      if (err instanceof HttpError) return reply(request, env, { error: err.message }, err.status);
      console.error(err);
      return reply(request, env, { error: 'Something went wrong. Please try again.' }, 500);
    }
  },
};
