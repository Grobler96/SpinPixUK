import { useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import SectionHeading from '@/components/SectionHeading';
import { services } from '@/data/services';
import { site } from '@/config/site';
import { supabase } from '@/lib/supabase';
import { useSEO } from '@/lib/useSEO';

const eventOptions = ['Weddings', 'Parties', 'Corporate', 'Proms', 'Other'];

export default function Contact() {
  useSEO('Get a quote', 'Tell SpinPix UK about your event and get a quote for photo booth, selfie pod or 360 video booth hire.');
  const [params] = useSearchParams();
  const preEvent = eventOptions.find((e) => e.toLowerCase() === params.get('event')) ?? '';
  const preBooth = services.find((s) => s.slug === params.get('booth'))?.name ?? '';

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [name, setName] = useState('');

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => ((f.get(k) as string) || '').trim();
    setName(v('name').split(' ')[0]);

    const guests = parseInt(v('guests'), 10);
    const row = {
      name: v('name'), email: v('email'), phone: v('phone') || null, event_type: v('event_type'),
      event_date: v('event_date') || null, venue: v('venue') || null, service: v('service') || null,
      guests: Number.isFinite(guests) ? guests : null, message: v('message') || null,
    };

    if (!supabase) {
      // Database not configured: fall back to the visitor's email client.
      const body = Object.entries(row).filter(([, val]) => val).map(([k, val]) => `${k}: ${val}`).join('\n');
      window.location.href = `${site.emailHref}?subject=${encodeURIComponent('Quote enquiry')}&body=${encodeURIComponent(body)}`;
      return;
    }
    setStatus('sending');
    const { error } = await supabase.from('enquiries').insert(row);
    setStatus(error ? 'error' : 'sent');
  };

  if (status === 'sent') {
    return (
      <section className="px-4 py-24">
        <div className="mx-auto max-w-lg text-center bg-card border-2 border-line rounded-[2rem] shadow-hard p-10">
          <div className="mx-auto grid place-items-center w-20 h-20 rounded-full bg-mint border-2 border-line text-4xl" aria-hidden="true">🎉</div>
          <h1 className="mt-6 font-display font-extrabold text-4xl">Thanks{name ? `, ${name}` : ''}!</h1>
          <p className="mt-3 text-paper/70 text-lg">Your enquiry is in. We’ll be in touch soon. Need us sooner? Call {site.phone}.</p>
          <Link to="/" className="btn btn-ink mt-8">Back home</Link>
        </div>
      </section>
    );
  }

  const L = ({ id, children }: { id: string; children: string }) => <label htmlFor={id} className="block font-display font-bold text-sm mb-1.5">{children}</label>;

  return (
    <>
      <section className="border-b-2 border-line bg-card px-4 sm:px-6 py-16">
        <div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Get a quote" title="Let’s plan something fun" subtitle="Tell us about your event and we’ll come back to you with options and a quote." /></div>
      </section>

      <section className="px-4 sm:px-6 py-16">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[1fr_340px]">
          <form onSubmit={submit} className="bg-card border-2 border-line rounded-[2rem] shadow-hard p-6 sm:p-10 grid gap-5 sm:grid-cols-2">
            <div><L id="name">Your name *</L><input id="name" name="name" required className="field" autoComplete="name" /></div>
            <div><L id="email">Email *</L><input id="email" name="email" type="email" required className="field" autoComplete="email" /></div>
            <div><L id="phone">Phone</L><input id="phone" name="phone" type="tel" className="field" autoComplete="tel" /></div>
            <div>
              <L id="event_type">Event type *</L>
              <select id="event_type" name="event_type" required defaultValue={preEvent} className="field">
                <option value="" disabled>Choose…</option>
                {eventOptions.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div><L id="event_date">Event date</L><input id="event_date" name="event_date" type="date" className="field" /></div>
            <div><L id="venue">Venue / town</L><input id="venue" name="venue" className="field" /></div>
            <div>
              <L id="service">Booth you’re interested in</L>
              <select id="service" name="service" defaultValue={preBooth} className="field">
                <option value="">Not sure yet</option>
                {services.map((s) => <option key={s.slug}>{s.name}</option>)}
              </select>
            </div>
            <div><L id="guests">Approx. guests</L><input id="guests" name="guests" type="number" min="1" className="field" /></div>
            <div className="sm:col-span-2"><L id="message">Anything else?</L><textarea id="message" name="message" rows={4} className="field" placeholder="Theme, timings, branding, questions…" /></div>

            {status === 'error' && (
              <p role="alert" className="sm:col-span-2 flex items-center gap-2 rounded-xl bg-pop/10 border-2 border-pop px-4 py-3 text-sm font-bold">
                <Icon name="AlertCircle" size={18} /> That didn’t send. Please try again, or email {site.email}.
              </p>
            )}
            <div className="sm:col-span-2">
              <button type="submit" disabled={status === 'sending'} className="btn btn-pop w-full sm:w-auto disabled:opacity-60">
                {status === 'sending' ? <><Icon name="Loader2" size={18} className="animate-spin" /> Sending…</> : <>Send enquiry <Icon name="Send" size={18} /></>}
              </button>
            </div>
          </form>

          <aside className="space-y-5">
            <div className="rounded-3xl bg-card border-2 border-pop shadow-hard-sm p-7">
              <h2 className="font-display font-extrabold text-2xl">Prefer to chat?</h2>
              <ul className="mt-5 space-y-4">
                <li><a href={site.phoneHref} className="flex items-center gap-3 hover:text-sun"><Icon name="Phone" size={20} />{site.phone}</a></li>
                <li><a href={site.emailHref} className="flex items-center gap-3 hover:text-sun break-all"><Icon name="Mail" size={20} />{site.email}</a></li>
                <li className="flex items-start gap-3"><Icon name="MapPin" size={20} className="mt-0.5 shrink-0" />Based in {site.base}. {site.coverage}.</li>
              </ul>
            </div>
            <div className="rounded-3xl bg-sun border-2 border-line text-ink p-7">
              <p className="font-display font-bold text-ink">Corporate booking?</p>
              <p className="mt-1 text-ink/80">Mention your brand or campaign and we’ll talk bespoke overlays.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
