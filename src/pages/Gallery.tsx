import { useState } from 'react';
import SectionHeading from '@/components/SectionHeading';
import CTABand from '@/components/CTABand';
import Reveal from '@/components/Reveal';
import { gallery, photoTypes, type PhotoType } from '@/data/gallery';
import { site } from '@/config/site';
import { useSEO } from '@/lib/useSEO';

export default function Gallery() {
  useSEO();
  const [filter, setFilter] = useState<PhotoType | 'All'>('All');
  const shown = filter === 'All' ? gallery : gallery.filter((p) => p.type === filter);

  return (
    <>
      <section className="border-b-2 border-line bg-card px-4 sm:px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading as="h1" eyebrow="Gallery" title="Our booths at real events" subtitle="Weddings, parties, proms and more. See even more on our Instagram and Facebook." />
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter photos by booth">
            {(['All', ...photoTypes] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                aria-pressed={filter === t}
                className={`rounded-full border-2 px-4 py-2 font-display font-bold text-sm transition-colors ${
                  filter === t ? 'bg-pop text-white border-pop neon-box' : 'border-line hover:border-pop'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="px-4 sm:px-6 py-16">
        <div className="mx-auto max-w-7xl columns-1 sm:columns-2 lg:columns-3 gap-6 [&>*]:mb-6">
          {shown.map((p, i) => (
            <Reveal key={p.src} delay={(i % 3) * 0.05}>
              <figure className="break-inside-avoid overflow-hidden rounded-3xl border-2 border-line bg-card shadow-hard-sm">
                <img src={p.src} alt={p.alt} loading="lazy" className="w-full h-auto block" />
                <figcaption className="px-5 py-3 font-display font-bold text-sm">{p.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-paper/60">
          Want to see more? Follow us on <a className="underline hover:text-pop" href={site.instagram} target="_blank" rel="noreferrer">Instagram</a> and <a className="underline hover:text-pop" href={site.facebook} target="_blank" rel="noreferrer">Facebook</a>.
        </p>
      </section>
      <CTABand />
    </>
  );
}
