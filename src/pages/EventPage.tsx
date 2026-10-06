import { Link, Navigate, useLocation } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import SectionHeading from '@/components/SectionHeading';
import BoothCard from '@/components/BoothCard';
import PhotoStrip from '@/components/PhotoStrip';
import CTABand from '@/components/CTABand';
import Reveal from '@/components/Reveal';
import { getEvent } from '@/data/events';
import { getService, toneClasses } from '@/data/services';
import { useSEO } from '@/lib/useSEO';

const faces: Record<string, string[]> = {
  weddings: ['🥂', '💃', '💍', '😍'],
  parties: ['🎂', '🤪', '🎈', '🕺'],
  proms: ['👗', '🪩', '😎', '✨'],
};

export default function EventPage() {
  const slug = useLocation().pathname.slice(1);
  const ev = getEvent(slug);
  useSEO(ev ? `${ev.name} photo booth hire` : undefined, ev?.blurb.slice(0, 155));
  if (!ev || ev.slug === 'corporate') return <Navigate to="/" replace />;
  const t = toneClasses[ev.tone];

  return (
    <>
      <section className={`${t.bg} ${t.text} border-b-2 border-ink overflow-hidden`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div>
            <p className="font-display font-bold uppercase tracking-[0.2em] text-sm opacity-80">{ev.name} <span aria-hidden="true">{ev.emoji}</span></p>
            <h1 className="mt-3 font-display font-extrabold text-5xl sm:text-7xl leading-[0.95]">{ev.headline}</h1>
            <p className="mt-6 text-lg sm:text-xl max-w-xl opacity-90 leading-relaxed">{ev.blurb}</p>
            <Link to={`/contact?event=${ev.slug}`} className="btn btn-ink mt-8">Get a {ev.name.toLowerCase().replace(/s$/, '')} quote <Icon name="ArrowRight" size={18} /></Link>
          </div>
          <div className="hidden md:flex justify-center" aria-hidden="true">
            <PhotoStrip tones={['pop', 'sun', 'volt', 'mint']} faces={faces[ev.slug]} caption={ev.name} className="rotate-6 scale-110" />
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-20">
        <div className="mx-auto max-w-7xl grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ev.points.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="h-full bg-white border-2 border-ink rounded-3xl p-6 shadow-hard-sm">
                <span className={`grid place-items-center w-12 h-12 rounded-2xl border-2 border-ink ${t.bg} ${t.text}`}><Icon name={p.icon} size={22} /></span>
                <h3 className="mt-4 font-display font-bold text-xl">{p.title}</h3>
                <p className="mt-1.5 text-ink/70">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Recommended" title={`Booths we’d suggest for ${ev.name.toLowerCase()}`} /></Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {ev.booths.map((b, i) => {
              const s = getService(b);
              return s ? <Reveal key={b} delay={i * 0.06}><BoothCard s={s} i={i} /></Reveal> : null;
            })}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
