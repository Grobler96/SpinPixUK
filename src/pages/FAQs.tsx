import { useState } from 'react';
import { Icon } from '@/components/Icon';
import SectionHeading from '@/components/SectionHeading';
import CTABand from '@/components/CTABand';
import { faqs } from '@/data/content';
import { useSEO } from '@/lib/useSEO';

export default function FAQs() {
  useSEO('FAQs', 'Answers to common questions about SpinPix UK photo booth hire: booking, setup, sharing and coverage.');
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <section className="border-b-2 border-ink bg-cream px-4 sm:px-6 py-16">
        <div className="mx-auto max-w-7xl"><SectionHeading eyebrow="FAQs" title="Good questions" subtitle="Can’t see yours? Call or email us and we’ll answer it." /></div>
      </section>
      <section className="px-4 sm:px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`rounded-2xl border-2 border-ink bg-white ${isOpen ? 'shadow-hard-sm' : ''}`}>
                <h3>
                  <button className="w-full flex items-center justify-between gap-4 text-left p-5 sm:p-6" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
                    <span>
                      <span className="block text-xs font-display font-bold uppercase tracking-widest text-pop">{f.category}</span>
                      <span className="block font-display font-bold text-lg sm:text-xl mt-0.5">{f.q}</span>
                    </span>
                    <span className={`grid place-items-center w-9 h-9 rounded-full border-2 border-ink shrink-0 ${isOpen ? 'bg-sun' : ''}`}><Icon name={isOpen ? 'Minus' : 'Plus'} size={16} /></span>
                  </button>
                </h3>
                {isOpen && <p className="px-5 sm:px-6 pb-6 -mt-1 text-ink/75 leading-relaxed">{f.a}</p>}
              </div>
            );
          })}
        </div>
      </section>
      <CTABand title="Still wondering?" subtitle="Ask us anything. We’re friendly, promise." />
    </>
  );
}
