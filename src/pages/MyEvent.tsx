import { useEffect, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import SectionHeading from '@/components/SectionHeading';
import TableCard from '@/components/TableCard';
import { apiConfigured, portalEvent, portalLogin, type PortalEvent } from '@/lib/api';
import { useQr } from '@/lib/useQr';
import { site } from '@/config/site';
import { useSEO } from '@/lib/useSEO';

const TOKEN_KEY = 'spx-event-token';
const store = {
  get: () => { try { return sessionStorage.getItem(TOKEN_KEY); } catch { return null; } },
  set: (v: string) => { try { sessionStorage.setItem(TOKEN_KEY, v); } catch { /* private mode */ } },
  clear: () => { try { sessionStorage.removeItem(TOKEN_KEY); } catch { /* private mode */ } },
};

const fmtDate = (iso: string) => {
  const d = iso ? new Date(`${iso}T12:00:00`) : null;
  return d && !isNaN(d.getTime()) ? d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
};
function CopyButton({ text, label }: { text: string; label: string }) {
  const [done, setDone] = useState(false);
  return (
    <button type="button" className="btn btn-ghost !py-2.5 !px-4 text-sm" onClick={async () => {
      try { await navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 1800); } catch { window.prompt('Copy this:', text); }
    }}>
      <Icon name={done ? 'Check' : 'Copy'} size={16} /> {done ? 'Copied' : label}
    </button>
  );
}

function Login({ onDone }: { onDone: (e: PortalEvent) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const submit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    setBusy(true); setError('');
    try {
      const r = await portalLogin(String(f.get('code') ?? ''), String(f.get('password') ?? ''));
      store.set(r.token);
      onDone(r.event);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally { setBusy(false); }
  };
  return (
    <form onSubmit={submit} className="mt-10 max-w-md bg-card border-2 border-line rounded-[2rem] shadow-hard p-6 sm:p-8 grid gap-5">
      <div>
        <label htmlFor="code" className="block font-display font-bold text-sm mb-1.5">Event code</label>
        <input id="code" name="code" required className="field uppercase" placeholder="SPX-ABC123" autoComplete="off" autoCapitalize="characters" />
      </div>
      <div>
        <label htmlFor="password" className="block font-display font-bold text-sm mb-1.5">Password</label>
        <input id="password" name="password" type="password" required className="field" placeholder="XXXX-XXXX" autoComplete="current-password" />
      </div>
      {error && <p role="alert" className="flex items-start gap-2 rounded-xl bg-pop/10 border-2 border-pop px-4 py-3 text-sm font-bold"><Icon name="AlertCircle" size={18} className="mt-0.5 shrink-0" /> {error}</p>}
      <button type="submit" disabled={busy} className="btn btn-pop disabled:opacity-60">
        {busy ? <><Icon name="Loader2" size={18} className="animate-spin" /> Checking…</> : <>Open my event <Icon name="ArrowRight" size={18} /></>}
      </button>
      <p className="text-sm text-paper/60">Your event code and password were sent to you by SpinPix UK. Can’t find them? Call {site.phone} or email {site.email}.</p>
    </form>
  );
}

function Portal({ event, onLogout }: { event: PortalEvent; onLogout: () => void }) {
  const qr = useQr(event.guestLink);
  const date = fmtDate(event.eventDate);
  const until = fmtDate(event.galleryUntil ?? '');
  return (
    <div className="mt-10 grid gap-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-lg text-paper/80">{date ? `${date} · ` : ''}Event code <span className="font-display font-bold text-paper">{event.code}</span></p>
        <button type="button" onClick={onLogout} className="btn btn-ghost !py-2.5 !px-4 text-sm">Log out</button>
      </div>

      {/* QR + cards */}
      <section className="rounded-[2rem] border-2 border-line bg-card p-6 sm:p-8 shadow-hard">
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl">{event.guestLink ? '1. Your guest QR code' : '1. Guest photo uploads'}</h2>
        {event.guestLink ? (
          <div className="mt-6 grid gap-8 md:grid-cols-[auto_1fr] items-start">
            <div className="rounded-3xl bg-white p-4 w-fit">
              {qr ? <img src={qr} alt={`QR code for guests to upload photos to ${event.title}`} className="block w-56 h-56 sm:w-64 sm:h-64" /> : <div className="w-56 h-56 sm:w-64 sm:h-64 grid place-items-center text-ink"><Icon name="Loader2" size={28} className="animate-spin" /></div>}
            </div>
            <div className="space-y-4">
              <p className="text-lg text-paper/80">Put this on every table. Guests scan it with their phone camera, then add the photos and videos they take to your gallery. No app and no sign-up.</p>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => window.print()} disabled={!qr} className="btn btn-pop"><Icon name="Printer" size={18} /> Print table cards</button>
                {qr && <a href={qr} download={`${event.title.replace(/[^a-z0-9]+/gi, '-')}-qr-code.png`} className="btn btn-ghost"><Icon name="Download" size={18} /> Save QR code</a>}
                <CopyButton text={event.guestLink} label="Copy guest link" />
              </div>
              <p className="text-sm text-paper/60">Printing tip: choose A4, margins “default”, and tick “Background graphics” if your browser shows it. You’ll get four cards per sheet to cut out.</p>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <p className="text-lg text-paper/80">If you want your guests to be able to upload their pictures to the gallery, contact us to add this feature.</p>
            <div className="flex flex-wrap gap-2">
              <Link to="/contact" className="btn btn-pop">Contact us <Icon name="ArrowRight" size={18} /></Link>
              <a href={site.phoneHref} className="btn btn-ghost"><Icon name="Phone" size={18} /> {site.phone}</a>
            </div>
          </div>
        )}
        {event.notes && <p className="mt-6 rounded-2xl border-2 border-line px-4 py-3 text-paper/85">{event.notes}</p>}
      </section>

      {/* gallery */}
      <section className="rounded-[2rem] border-2 border-line bg-card p-6 sm:p-8 shadow-hard">
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl">2. Your gallery</h2>
        {event.galleryLink ? (
          <>
            <p className="mt-4 text-lg text-paper/80">{event.guestLink ? 'Every photo and video your guests add appears in your private gallery.' : 'Your photos from the booth appear in your private gallery.'}{until ? ` It’s kept until ${until}, so please download your favourites before then.` : ' Please download your favourites once your event is over.'}</p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <a href={event.galleryLink} target="_blank" rel="noopener noreferrer" className="btn btn-sun">Open my gallery <Icon name="ArrowRight" size={18} /></a>
              <CopyButton text={event.galleryLink} label="Copy gallery link" />
              {event.galleryPassword && <CopyButton text={event.galleryPassword} label="Copy gallery password" />}
            </div>
            {event.galleryPassword && <p className="mt-4 text-paper/80">Gallery password: <span className="font-display font-bold text-paper select-all">{event.galleryPassword}</span></p>}
            {event.embedGallery && (
              <iframe title={`${event.title} gallery`} src={event.galleryLink} loading="lazy" allow="fullscreen" allowFullScreen className="mt-6 w-full h-[70vh] rounded-2xl border-2 border-line bg-white" />
            )}
          </>
        ) : (
          <p className="mt-4 text-lg text-paper/75">Your gallery link will appear here as soon as it’s ready.</p>
        )}
      </section>

      <p className="text-paper/60">Questions, or something not right? Call <a className="underline hover:text-pop" href={site.phoneHref}>{site.phone}</a> or <Link className="underline hover:text-pop" to="/contact">send us a message</Link>.</p>

      {/* printable sheet: four cards to an A4 page, only visible when printing */}
      {createPortal(
        <div className="print-area" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => <TableCard key={i} title={event.title} qr={qr} />)}
        </div>,
        document.body,
      )}
    </div>
  );
}

export default function MyEvent() {
  useSEO();
  const [event, setEvent] = useState<PortalEvent | null>(null);
  const [checking, setChecking] = useState(apiConfigured && !!store.get());

  useEffect(() => {
    const token = store.get();
    if (!apiConfigured || !token) return;
    portalEvent(token).then((r) => setEvent(r.event)).catch(() => store.clear()).finally(() => setChecking(false));
  }, []);

  const logout = () => { store.clear(); setEvent(null); };

  return (
    <section className="px-4 sm:px-6 py-16 min-h-[60vh]">
      <div className="mx-auto max-w-5xl">
        <SectionHeading as="h1" eyebrow="For our couples" title={event ? event.title : 'Your event gallery'}
          subtitle={event ? 'Everything you need to collect your guests’ photos and videos in one place.' : 'Log in to get your QR code, print your table cards and open your gallery.'} />
        {!apiConfigured ? (
          <p className="mt-10 max-w-xl rounded-2xl border-2 border-line bg-card px-5 py-4 text-lg text-paper/80">
            Event galleries are being set up. If you’ve booked a gallery with us, we’ll send you everything by email, or call {site.phone}.
          </p>
        ) : checking ? (
          <p className="mt-10 flex items-center gap-2 text-paper/70"><Icon name="Loader2" size={18} className="animate-spin" /> Loading your event…</p>
        ) : event ? (
          <Portal event={event} onLogout={logout} />
        ) : (
          <Login onDone={setEvent} />
        )}
      </div>
    </section>
  );
}
