import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import CTABand from '@/components/CTABand';
import Breadcrumbs from '@/components/Breadcrumbs';
import { faqs, faqCategories } from '@/data/content';
import { useSEO } from '@/lib/useSEO';

export default function FAQs() {
  useSEO('FAQs', 'Answers to common questions about booking, setup, customisation and logistics for SpinPix photo booth hire.');
  const [open, setOpen] = useState<string | null>(faqs[0].q);
  const [filter, setFilter] = useState<string>('All');

  const filtered = filter === 'All' ? faqs : faqs.filter((f) => f.category === filter);

  return (
    <>
      <section className="relative pt-32 pb-12 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-electric/15 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl">
          <Breadcrumbs items={[{ label: 'FAQs' }]} />
          <SectionHeading
            eyebrow="FAQs"
            title="Questions, answered"
            subtitle="Everything you need to know about booking, setup and the day itself. Can't find your answer? Give us a call."
            align="left"
            className="mt-8"
          />
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-3xl flex flex-wrap gap-2 justify-center">
          {faqCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                filter === cat
                  ? 'bg-gradient-to-r from-electric to-violet text-white'
                  : 'glass text-silver/70 hover:text-ice hover:border-cyan/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Accordion */}
      <section className="py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-3">
          {filtered.map((faq) => {
            const isOpen = open === faq.q;
            return (
              <div key={faq.q} className="rounded-2xl glass overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : faq.q)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-semibold text-ice">{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-cyan transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-silver/70 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CTABand />
    </>
  );
}
