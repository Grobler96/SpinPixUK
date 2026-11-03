import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { Icon } from '@/components/Icon';
import SectionHeading from '@/components/SectionHeading';
import {
  adminCreate, adminDelete, adminList, adminLogin, adminResetPassword, adminUpdate, apiConfigured, portalUrl,
  type EventFields, type PortalEvent,
} from '@/lib/api';
import { site } from '@/config/site';
import { useSEO } from '@/lib/useSEO';

const TOKEN_KEY = 'spx-admin-token';
const store = {
  get: () => { try { return sessionStorage.getItem(TOKEN_KEY); } catch { return null; } },
  set: (v: string) => { try { sessionStorage.setItem(TOKEN_KEY, v); } catch { /* private mode */ } },
  clear: () => { try { sessionStorage.removeItem(TOKEN_KEY); } catch { /* private mode */ } },
};
const empty: EventFields = { title: '', eventDate: '', galleryUntil: '', guestLink: '', galleryLink: '', galleryPassword: '', embedGallery: true, notes: '' };
const errText = (e: unknown) => (e instanceof Error ? e.message : 'Something went wrong.');

function Field({ id, label, hint, children }: { id: string; label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block font-display font-bold text-sm mb-1.5">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-paper/55">{hint}</p>}
    </div>
  );
}

function AdminLogin({ onToken }: { onToken: (t: string) => void }) {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setBusy(true); setError('');
    try {
      const { token } = await adminLogin(String(new FormData(ev.currentTarget).get('password') ?? ''));
      store.set(token); onToken(token);
    } catch (e) { setError(errText(e)); } finally { setBusy(false); }
  };
  return (
    <form onSubmit={submit} className="mt-10 max-w-sm bg-card border-2 border-line rounded-[2rem] shadow-hard p-6 grid gap-4">
      <Field id="admin-password" label="Admin password"><input id="admin-password" name="password" type="password" required className="field" autoComplete="current-password" /></Field>
      {error && <p role="alert" className="rounded-xl bg-pop/10 border-2 border-pop px-4 py-3 text-sm font-bold">{error}</p>}
      <button type="submit" disabled={busy} className="btn btn-pop disabled:opacity-60">{busy ? 'Checking…' : 'Log in'}</button>
    </form>
  );
}

function Manager({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [events, setEvents] = useState<PortalEvent[] | null>(null);
  const [form, setForm] = useState<EventFields>(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState<{ title: string; code: string; password: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const load = useCallback(async () => {
    try { setEvents((await adminList(token)).events); }
    catch (e) { if (/log in again/i.test(errText(e))) onLogout(); else setError(errText(e)); }
  }, [token, onLogout]);
  useEffect(() => { load(); }, [load]);

  const set = <K extends keyof EventFields>(k: K, v: EventFields[K]) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    setBusy(true); setError('');
    try {
      if (editing) {
        await adminUpdate(token, editing, form);
        setEditing(null);
      } else {
        const r = await adminCreate(token, form);
        setSent({ title: r.event.title, code: r.event.code, password: r.customerPassword });
      }
      setForm(empty);
      await load();
    } catch (e) { setError(errText(e)); } finally { setBusy(false); }
  };

  const edit = (e: PortalEvent) => {
    setEditing(e.code); setSent(null); setError('');
    setForm({ title: e.title, eventDate: e.eventDate, galleryUntil: e.galleryUntil ?? '', guestLink: e.guestLink, galleryLink: e.galleryLink, galleryPassword: e.galleryPassword, embedGallery: e.embedGallery, notes: e.notes });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const reset = async (e: PortalEvent) => {
    if (!window.confirm(`Make a new customer password for ${e.title}? The old one will stop working.`)) return;
    try { const r = await adminResetPassword(token, e.code); setSent({ title: e.title, code: e.code, password: r.customerPassword }); } catch (err) { setError(errText(err)); }
  };
  const remove = async (e: PortalEvent) => {
    if (!window.confirm(`Delete ${e.title}? The customer will lose access to this page. (Photos in TouchPix are not touched.)`)) return;
    try { await adminDelete(token, e.code); await load(); } catch (err) { setError(errText(err)); }
  };

  const message = sent
    ? `Hi! Here are the details for your SpinPix UK event gallery (${sent.title}):\n\nLog in: ${portalUrl()}\nEvent code: ${sent.code}\nPassword: ${sent.password}\n\nOnce you're in you'll find your QR code, printable table cards for your guests, and your gallery.\n\n${site.name}`
    : '';

  return (
    <div className="mt-10 grid gap-8">
      <div className="flex justify-end"><button type="button" onClick={onLogout} className="btn btn-ghost !py-2.5 !px-4 text-sm">Log out</button></div>

      {sent && (
        <div className="rounded-3xl border-2 border-mint bg-card p-6">
          <p className="font-display font-extrabold text-xl">Send this to the customer</p>
          <p className="mt-1 text-sm text-paper/70">This password is only shown now. If it’s lost, use “New password” on the event.</p>
          <pre className="mt-4 whitespace-pre-wrap rounded-2xl bg-ink border-2 border-line p-4 text-sm select-all">{message}</pre>
          <div className="mt-4 flex gap-2">
            <button type="button" className="btn btn-sun !py-2.5 !px-4 text-sm" onClick={async () => { try { await navigator.clipboard.writeText(message); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { window.prompt('Copy this:', message); } }}>
              <Icon name={copied ? 'Check' : 'Copy'} size={16} /> {copied ? 'Copied' : 'Copy message'}
            </button>
            <button type="button" className="btn btn-ghost !py-2.5 !px-4 text-sm" onClick={() => setSent(null)}>Done</button>
          </div>
        </div>
      )}

      <form onSubmit={submit} className="rounded-[2rem] border-2 border-line bg-card p-6 sm:p-8 shadow-hard grid gap-5 sm:grid-cols-2">
        <h2 className="sm:col-span-2 font-display font-extrabold text-2xl">{editing ? `Edit ${editing}` : 'New event'}</h2>
        <Field id="title" label="Event name *" hint="Shown to the couple and on the table cards, e.g. Toni & Luke"><input id="title" required maxLength={80} className="field" value={form.title} onChange={(e) => set('title', e.target.value)} /></Field>
        <Field id="date" label="Event date"><input id="date" type="date" className="field" value={form.eventDate} onChange={(e) => set('eventDate', e.target.value)} /></Field>
        <Field id="guest" label="Guest upload link (from TouchPix)" hint="The link guests open to upload. The QR code is made from this."><input id="guest" type="url" placeholder="https://…" className="field" value={form.guestLink} onChange={(e) => set('guestLink', e.target.value)} /></Field>
        <Field id="gallery" label="Gallery link (from TouchPix)"><input id="gallery" type="url" placeholder="https://…" className="field" value={form.galleryLink} onChange={(e) => set('galleryLink', e.target.value)} /></Field>
        <Field id="until" label="Gallery kept until" hint="When TouchPix stops storing it. On MultiPass that is 6 months from when the event was created in TouchPix, not from the event date."><input id="until" type="date" className="field" value={form.galleryUntil} onChange={(e) => set('galleryUntil', e.target.value)} /></Field>
        <Field id="gpass" label="Gallery password (only if it has one)"><input id="gpass" maxLength={100} className="field" value={form.galleryPassword} onChange={(e) => set('galleryPassword', e.target.value)} /></Field>
        <div className="flex items-end">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1 w-5 h-5 accent-[#FF2E93]" checked={form.embedGallery} onChange={(e) => set('embedGallery', e.target.checked)} />
            <span><span className="font-display font-bold text-sm">Show the gallery inside this page</span><span className="block text-xs text-paper/55">TouchPix galleries display fine here. Turn off if one ever doesn’t load; the couple still get an “Open my gallery” button either way.</span></span>
          </label>
        </div>
        <div className="sm:col-span-2"><Field id="notes" label="Note for the couple (optional)"><textarea id="notes" rows={3} maxLength={1000} className="field" value={form.notes} onChange={(e) => set('notes', e.target.value)} /></Field></div>
        {error && <p role="alert" className="sm:col-span-2 rounded-xl bg-pop/10 border-2 border-pop px-4 py-3 text-sm font-bold">{error}</p>}
        <div className="sm:col-span-2 flex gap-2">
          <button type="submit" disabled={busy} className="btn btn-pop disabled:opacity-60">{busy ? 'Saving…' : editing ? 'Save changes' : 'Create event'}</button>
          {editing && <button type="button" className="btn btn-ghost" onClick={() => { setEditing(null); setForm(empty); }}>Cancel</button>}
        </div>
      </form>

      <section>
        <h2 className="font-display font-extrabold text-2xl">Events</h2>
        {events === null ? <p className="mt-4 text-paper/70">Loading…</p> : events.length === 0 ? <p className="mt-4 text-paper/70">No events yet. Create the first one above.</p> : (
          <ul className="mt-4 grid gap-3">
            {events.map((e) => (
              <li key={e.code} className="rounded-2xl border-2 border-line bg-card p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-display font-bold text-lg">{e.title}</p>
                  <p className="text-sm text-paper/65">{e.code}{e.eventDate ? ` · ${e.eventDate}` : ''}{!e.guestLink ? ' · no guest link yet' : ''}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button type="button" className="btn btn-ghost !py-2 !px-3.5 text-sm" onClick={() => edit(e)}>Edit</button>
                  <button type="button" className="btn btn-ghost !py-2 !px-3.5 text-sm" onClick={() => reset(e)}>New password</button>
                  <button type="button" className="btn btn-ghost !py-2 !px-3.5 text-sm" onClick={() => remove(e)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default function Admin() {
  useSEO();
  const [token, setToken] = useState<string | null>(store.get());
  const logout = useCallback(() => { store.clear(); setToken(null); }, []);
  return (
    <section className="px-4 sm:px-6 py-16 min-h-[60vh]">
      <div className="mx-auto max-w-4xl">
        <SectionHeading as="h1" eyebrow="SpinPix team" title="Event galleries" subtitle="Create an event, paste in the TouchPix links, and send the customer their login." />
        {!apiConfigured ? (
          <p className="mt-10 max-w-xl rounded-2xl border-2 border-line bg-card px-5 py-4 text-lg text-paper/80">The event service isn’t connected yet. See the setup steps in the project README.</p>
        ) : token ? <Manager token={token} onLogout={logout} /> : <AdminLogin onToken={setToken} />}
      </div>
    </section>
  );
}
