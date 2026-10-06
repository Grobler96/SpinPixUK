import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { getEvent } from '@/data/events';
import { getService } from '@/data/services';
import { site } from '@/config/site';
import { useSEO } from '@/lib/useSEO';

const useCases = ['Product launches', 'Conferences & exhibitions', 'Award nights', 'Staff parties & Christmas events', 'Brand activations', 'Open days & community events'];

export default function Corporate() {
  useSEO('Corporate photo booth & 360 hire', 'Branded photo booths and 360 video booths for corporate events across the UK. Bespoke overlays, instant sharing and professional setup.');
  const ev = getEvent('corporate')!;
  return (
    <div className="bg-navy text-white">
      <section className="relative overflow-hidden border-b border-white/15">
        <div className="absolute inset-0 grid-lines" aria-hidden="true" />
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-pop/40 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28">
          <p className="inline-flex items-center gap-2 font-display font-bold text-sm uppercase tracking-[0.2em] text-sun"><Icon name="Briefcase" size={16} /> Corporate & brand events</p>
          <h1 className="mt-5 font-display font-extrabold text-5xl sm:text-7xl leading-[0.98] max-w-4xl">{ev.headline}</h1>
          <p className="mt-6 text-xl text-white/75 max-w-2xl leading-relaxed">{ev.blurb}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/contact?event=corporate" className="btn btn-sun">Request a quote <Icon name="ArrowRight" size={18} /></Link>
            <a href={site.emailHref} className="btn border-white text-white hover:bg-white hover:text-navy"><Icon name="Mail" size={18} /> {site.email}</a>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-20">
        <div className="mx-auto max-w-7xl grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ev.points.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-white/15 bg-white/5 p-6 hover:border-sun/60 transition-colors">
                <span className="grid place-items-center w-11 h-11 rounded-xl bg-pop"><Icon name={p.icon} size={22} /></span>
                <h3 className="mt-4 font-display font-bold text-xl">{p.title}</h3>
                <p className="mt-1.5 text-white/70">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12">
          <Reveal>
            <SectionHeading dark eyebrow="Where it works" title="Built for the moments your brand shows up" />
            <ul className="mt-8 grid sm:grid-cols-2 gap-3">
              {useCases.map((u) => (
                <li key={u} className="flex items-center gap-3 rounded-xl border border-white/15 px-4 py-3"><span className="grid place-items-center w-5 h-5 rounded-full bg-mint text-ink shrink-0"><Icon name="Check" size={13} /></span>{u}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-paper text-ink p-8 sm:p-10 border-2 border-sun">
              <p className="font-display font-bold text-sm uppercase tracking-[0.2em] text-pop">Best for business</p>
              <h3 className="mt-2 font-display font-extrabold text-3xl">Our most-booked brand kit</h3>
              <div className="mt-6 space-y-5">
                {ev.booths.slice(0, 3).map((b) => {
                  const s = getService(b)!;
                  return (
                    <div key={b} className="flex gap-4">
                      <span className="grid place-items-center w-12 h-12 rounded-2xl bg-ink text-paper shrink-0"><Icon name={s.icon} size={22} /></span>
                      <div>
                        <p className="font-display font-bold text-lg">{s.name}</p>
                        <p className="text-ink/70">{s.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link to="/booths" className="btn btn-ink mt-8">See all booths <Icon name="ArrowRight" size={18} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20">
        <div className="mx-auto max-w-6xl rounded-3xl bg-pop p-8 sm:p-12 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl">Let’s talk about your event.</h2>
            <p className="mt-2 text-white/85">Send us the date, venue and what you’d like to achieve.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact?event=corporate" className="btn btn-sun">Get a quote</Link>
            <a href={site.phoneHref} className="btn bg-white text-ink"><Icon name="Phone" size={18} /> {site.phone}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
