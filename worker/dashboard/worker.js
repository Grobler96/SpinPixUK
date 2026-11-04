// SpinPix UK event portal backend: paste this whole file into a Cloudflare Worker.
// Generated from worker/src/index.ts by "npm run build:dashboard". Do not edit by hand.
// Needs: a KV binding named EVENTS, and two secrets: ADMIN_PASSWORD and TOKEN_SECRET.
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.ts
async function secret(v) {
  if (!v) return "";
  return typeof v === "string" ? v : await v.get();
}
__name(secret, "secret");
var DEFAULT_ORIGINS = "https://grobler96.github.io,https://www.spinpixuk.co.uk,https://spinpixuk.co.uk";
var ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
var enc = new TextEncoder();
var TOKEN_HOURS = { admin: 12, event: 8 };
var b64 = /* @__PURE__ */ __name((bytes) => {
  const a = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let s = "";
  a.forEach((x) => s += String.fromCharCode(x));
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}, "b64");
var unb64 = /* @__PURE__ */ __name((s) => {
  const p = s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4);
  return Uint8Array.from(atob(p), (c) => c.charCodeAt(0));
}, "unb64");
var randomString = /* @__PURE__ */ __name((len) => {
  const r = crypto.getRandomValues(new Uint8Array(len));
  return Array.from(r, (x) => ALPHABET[x % ALPHABET.length]).join("");
}, "randomString");
var same = /* @__PURE__ */ __name((a, b) => {
  const x = enc.encode(a), y = enc.encode(b);
  let d = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) d |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return d === 0;
}, "same");
var sha256 = /* @__PURE__ */ __name(async (s) => b64(await crypto.subtle.digest("SHA-256", enc.encode(s))), "sha256");
async function hashPassword(password, salt) {
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: unb64(salt), iterations: 1e5 }, key, 256);
  return b64(bits);
}
__name(hashPassword, "hashPassword");
var normalisePassword = /* @__PURE__ */ __name((p) => p.toUpperCase().replace(/[^A-Z0-9]/g, ""), "normalisePassword");
var normaliseCode = /* @__PURE__ */ __name((c) => {
  const t = c.toUpperCase().replace(/[^A-Z0-9]/g, "");
  return t.startsWith("SPX") ? `SPX-${t.slice(3)}` : `SPX-${t}`;
}, "normaliseCode");
var newCustomerPassword = /* @__PURE__ */ __name(() => {
  const p = randomString(8);
  return `${p.slice(0, 4)}-${p.slice(4)}`;
}, "newCustomerPassword");
async function hmac(secret2, data) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret2), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64(await crypto.subtle.sign("HMAC", key, enc.encode(data)));
}
__name(hmac, "hmac");
async function makeToken(env, role, subject) {
  const exp = Math.floor(Date.now() / 1e3) + TOKEN_HOURS[role] * 3600;
  const body = `${role}.${subject}.${exp}`;
  return `${body}.${await hmac(await secret(env.TOKEN_SECRET), body)}`;
}
__name(makeToken, "makeToken");
async function readToken(env, request, role) {
  const h = request.headers.get("Authorization") ?? "";
  const t = h.startsWith("Bearer ") ? h.slice(7) : "";
  const parts = t.split(".");
  if (parts.length !== 4) return null;
  const [r, subject, exp, sig] = parts;
  if (r !== role || Number(exp) < Date.now() / 1e3) return null;
  if (!same(sig, await hmac(await secret(env.TOKEN_SECRET), `${r}.${subject}.${exp}`))) return null;
  return subject;
}
__name(readToken, "readToken");
function corsHeaders(request, env) {
  const origin = request.headers.get("Origin");
  const allowed = (env.ALLOWED_ORIGINS || DEFAULT_ORIGINS).split(",").map((s) => s.trim()).filter(Boolean);
  const h = { Vary: "Origin" };
  if (origin && allowed.includes(origin)) {
    h["Access-Control-Allow-Origin"] = origin;
    h["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
    h["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
    h["Access-Control-Max-Age"] = "86400";
  }
  return h;
}
__name(corsHeaders, "corsHeaders");
var reply = /* @__PURE__ */ __name((request, env, data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    ...corsHeaders(request, env)
  }
}), "reply");
var HttpError = class extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
  status;
  static {
    __name(this, "HttpError");
  }
};
async function throttle(env, request, scope) {
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const key = `rl:${scope}:${await sha256(ip)}`;
  const n = Number(await env.EVENTS.get(key) ?? "0");
  if (n >= 10) throw new HttpError(429, "Too many attempts. Please wait 15 minutes and try again.");
  await env.EVENTS.put(key, String(n + 1), { expirationTtl: 900 });
  return () => env.EVENTS.delete(key);
}
__name(throttle, "throttle");
var clean = /* @__PURE__ */ __name((v, max) => typeof v === "string" ? v.trim().slice(0, max) : "", "clean");
function httpsUrl(v, label, required) {
  const s = clean(v, 600);
  if (!s) {
    if (required) throw new HttpError(400, `${label} is required.`);
    return "";
  }
  try {
    const u = new URL(s);
    if (u.protocol !== "https:") throw new Error();
    return u.toString();
  } catch {
    throw new HttpError(400, `${label} must be a full https:// link.`);
  }
}
__name(httpsUrl, "httpsUrl");
function readFields(body) {
  const title = clean(body.title, 80);
  if (!title) throw new HttpError(400, 'Please enter a name for the event, e.g. "Toni & Luke".');
  const eventDate = clean(body.eventDate, 10);
  if (eventDate && !/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) throw new HttpError(400, "The event date must look like 2026-09-26.");
  const galleryUntil = clean(body.galleryUntil, 10);
  if (galleryUntil && !/^\d{4}-\d{2}-\d{2}$/.test(galleryUntil)) throw new HttpError(400, "The gallery end date must look like 2027-03-26.");
  return {
    title,
    eventDate,
    galleryUntil,
    guestLink: httpsUrl(body.guestLink, "The guest upload link", false),
    galleryLink: httpsUrl(body.galleryLink, "The gallery link", false),
    galleryPassword: clean(body.galleryPassword, 100),
    embedGallery: body.embedGallery === true,
    notes: clean(body.notes, 1e3)
  };
}
__name(readFields, "readFields");
var publicView = /* @__PURE__ */ __name((e) => {
  const { passwordHash: _h, passwordSalt: _s, ...rest } = e;
  return rest;
}, "publicView");
var getEvent = /* @__PURE__ */ __name(async (env, code) => {
  const raw = await env.EVENTS.get(`event:${code}`);
  return raw ? JSON.parse(raw) : null;
}, "getEvent");
var saveEvent = /* @__PURE__ */ __name((env, e) => env.EVENTS.put(`event:${e.code}`, JSON.stringify(e)), "saveEvent");
async function listEvents(env) {
  const out = [];
  let cursor;
  do {
    const page = await env.EVENTS.list({ prefix: "event:", cursor });
    for (const k of page.keys) {
      const raw = await env.EVENTS.get(k.name);
      if (raw) out.push(JSON.parse(raw));
    }
    cursor = page.list_complete ? void 0 : page.cursor;
  } while (cursor);
  return out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
__name(listEvents, "listEvents");
async function withNewPassword(e) {
  const customerPassword = newCustomerPassword();
  const passwordSalt = b64(crypto.getRandomValues(new Uint8Array(16)));
  const passwordHash = await hashPassword(normalisePassword(customerPassword), passwordSalt);
  return { customerPassword, event: { ...e, passwordSalt, passwordHash } };
}
__name(withNewPassword, "withNewPassword");
async function route(request, env) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, "");
  const method = request.method;
  const json = /* @__PURE__ */ __name(async () => {
    try {
      return await request.json();
    } catch {
      throw new HttpError(400, "Invalid request.");
    }
  }, "json");
  if (path === "/api/health") return reply(request, env, { ok: true });
  if (path === "/api/portal/login" && method === "POST") {
    const clearThrottle = await throttle(env, request, "portal");
    const b = await json();
    const code = normaliseCode(clean(b.code, 40));
    const ev = await getEvent(env, code);
    const supplied = await hashPassword(normalisePassword(clean(b.password, 40)), ev?.passwordSalt ?? b64(new Uint8Array(16)));
    if (!ev || !same(supplied, ev.passwordHash)) throw new HttpError(401, "That event code and password don\u2019t match. Please check them and try again.");
    await clearThrottle();
    return reply(request, env, { token: await makeToken(env, "event", ev.code), event: publicView(ev) });
  }
  if (path === "/api/portal/event" && method === "GET") {
    const code = await readToken(env, request, "event");
    const ev = code ? await getEvent(env, code) : null;
    if (!ev) throw new HttpError(401, "Please log in again.");
    return reply(request, env, { event: publicView(ev) });
  }
  if (path === "/api/admin/login" && method === "POST") {
    const clearThrottle = await throttle(env, request, "admin");
    const b = await json();
    const adminPassword = await secret(env.ADMIN_PASSWORD);
    if (!adminPassword || !same(await sha256(clean(b.password, 200)), await sha256(adminPassword))) throw new HttpError(401, "Wrong password.");
    await clearThrottle();
    return reply(request, env, { token: await makeToken(env, "admin", "admin") });
  }
  if (path.startsWith("/api/admin/")) {
    if (!await readToken(env, request, "admin")) throw new HttpError(401, "Please log in again.");
    if (path === "/api/admin/events" && method === "GET") return reply(request, env, { events: (await listEvents(env)).map(publicView) });
    if (path === "/api/admin/events" && method === "POST") {
      const fields = readFields(await json());
      let code = "";
      do {
        code = `SPX-${randomString(6)}`;
      } while (await getEvent(env, code));
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const base = { code, ...fields, passwordHash: "", passwordSalt: "", createdAt: now, updatedAt: now };
      const { customerPassword, event } = await withNewPassword(base);
      await saveEvent(env, event);
      return reply(request, env, { event: publicView(event), customerPassword }, 201);
    }
    const m = path.match(/^\/api\/admin\/events\/([A-Za-z0-9-]+)(\/reset-password)?$/);
    if (m) {
      const code = normaliseCode(m[1]);
      const ev = await getEvent(env, code);
      if (!ev) throw new HttpError(404, "Event not found.");
      if (m[2] && method === "POST") {
        const { customerPassword, event } = await withNewPassword({ ...ev, updatedAt: (/* @__PURE__ */ new Date()).toISOString() });
        await saveEvent(env, event);
        return reply(request, env, { event: publicView(event), customerPassword });
      }
      if (!m[2] && method === "PUT") {
        const updated = { ...ev, ...readFields(await json()), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
        await saveEvent(env, updated);
        return reply(request, env, { event: publicView(updated) });
      }
      if (!m[2] && method === "DELETE") {
        await env.EVENTS.delete(`event:${code}`);
        return reply(request, env, { ok: true });
      }
    }
  }
  throw new HttpError(404, "Not found.");
}
__name(route, "route");
var index_default = {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(request, env) });
    try {
      return await route(request, env);
    } catch (err) {
      if (err instanceof HttpError) return reply(request, env, { error: err.message }, err.status);
      console.error(err);
      return reply(request, env, { error: "Something went wrong. Please try again." }, 500);
    }
  }
};
export {
  index_default as default
};
