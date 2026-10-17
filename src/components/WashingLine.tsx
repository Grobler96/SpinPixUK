import type { CSSProperties } from 'react';
import Reveal from './Reveal';
import { Icon } from './Icon';
import { reviews } from '@/data/reviews';
import { site } from '@/config/site';

/** Real reviews printed as polaroids, pegged on a string and gently swaying. */
export default function WashingLine() {
  return (
    <section className="py-20 sm:py-28 border-t-2 border-line overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="font-display font-bold uppercase tracking-[0.2em] text-sm text-sun">Kind words</p>
          <h2 className="mt-3 font-display font-extrabold text-4xl sm:text-6xl leading-[0.95]">Hung out to dry.<br className="hidden sm:block" /> (In a good way.)</h2>
          <p className="mt-4 text-lg text-paper/70">Real reviews from our Facebook page and Google profile.</p>
        </Reveal>
      </div>

      <div className="relative mt-14">
        <svg aria-hidden="true" className="absolute left-0 top-0 w-full h-16" viewBox="0 0 1000 60" preserveAspectRatio="none">
          <path d="M0,10 Q500,70 1000,10" fill="none" stroke="#F7F1FF" strokeOpacity="0.45" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
        <ul className="relative flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 sm:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pt-6 pb-10 [scrollbar-width:none]">
          {reviews.map((r, i) => (
            <li key={r.name + i} className="snap-center shrink-0" style={{ marginTop: `${Math.round(Math.sin(((i + 0.5) / reviews.length) * Math.PI) * 26)}px` }}>
              <figure className="sway relative w-[260px] sm:w-[290px] bg-white text-ink p-4 pb-5 rounded-sm shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)]"
                style={{ '--r0': `${i % 2 ? -3 : 2}deg`, '--r1': `${i % 2 ? 2 : -3}deg`, animationDelay: `${i * -0.9}s` } as CSSProperties}>
                <span aria-hidden="true" className="absolute -top-5 left-1/2 -translate-x-1/2 w-3.5 h-9 rounded-sm bg-gradient-to-b from-[#d9b98a] to-[#a8875a] shadow" />
                <div className="aspect-[4/3] rounded-sm bg-gradient-to-br from-pop via-grape to-volt grid place-items-center p-5">
                  <blockquote className="text-white text-[15px] leading-snug font-semibold text-center">“{r.text}”</blockquote>
                </div>
                <figcaption className="mt-3 text-center">
                  {r.stars && (
                    <span className="flex justify-center gap-0.5 text-[#F5A623]" aria-label={`${r.stars} out of 5 stars`}>
                      {Array.from({ length: r.stars }).map((_, k) => <Icon key={k} name="Star" size={14} className="fill-current" />)}
                    </span>
                  )}
                  <span className="mt-1 block font-display font-extrabold">{r.name}</span>
                  <span className="block text-xs text-ink/60">{r.source}{r.context ? ` · ${r.context}` : ''}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-wrap gap-3">
        <a href={site.google} target="_blank" rel="noreferrer" className="btn btn-ghost"><Icon name="Star" size={18} /> Read more on Google</a>
        <a href={site.facebook} target="_blank" rel="noreferrer" className="btn btn-ghost"><Icon name="Facebook" size={18} /> See us on Facebook</a>
      </div>
    </section>
  );
}
