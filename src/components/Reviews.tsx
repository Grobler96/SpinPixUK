import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { Icon } from './Icon';
import { reviews } from '@/data/reviews';
import { site } from '@/config/site';

export default function Reviews() {
  return (
    <section className="px-4 sm:px-6 py-20 sm:py-28 border-t-2 border-line">
      <div className="mx-auto max-w-7xl">
        <Reveal><SectionHeading eyebrow="Kind words" title="What our customers say" subtitle="Real reviews from our Facebook page and Google profile." /></Reveal>
        <div className="mt-12 columns-1 md:columns-2 lg:columns-3 gap-6 [&>*]:mb-6">
          {reviews.map((r, i) => (
            <Reveal key={r.name + i} delay={i * 0.05}>
              <figure className="break-inside-avoid rounded-3xl border-2 border-line bg-card p-6 shadow-hard-sm">
                {r.stars && (
                  <div className="flex gap-0.5 text-sun" aria-label={`${r.stars} out of 5 stars`}>
                    {Array.from({ length: r.stars }).map((_, k) => <Icon key={k} name="Star" size={18} className="fill-current" />)}
                  </div>
                )}
                <blockquote className="mt-3 text-lg leading-relaxed">“{r.text}”</blockquote>
                <figcaption className="mt-4 text-sm text-paper/60">
                  <span className="font-display font-bold text-paper">{r.name}</span> · {r.source}{r.context ? ` · ${r.context}` : ''}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={site.google} target="_blank" rel="noreferrer" className="btn btn-ghost"><Icon name="Star" size={18} /> Read more on Google</a>
          <a href={site.facebook} target="_blank" rel="noreferrer" className="btn btn-ghost"><Icon name="Facebook" size={18} /> See us on Facebook</a>
        </div>
      </div>
    </section>
  );
}
