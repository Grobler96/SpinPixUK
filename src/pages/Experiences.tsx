import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import ServiceCard from '@/components/ServiceCard';
import CTABand from '@/components/CTABand';
import Breadcrumbs from '@/components/Breadcrumbs';
import { services } from '@/data/services';
import { eventTypes } from '@/data/eventTypes';
import { useSEO } from '@/lib/useSEO';

export default function Experiences() {
  useSEO('Experiences', 'Explore every photo booth and 360° video booth experience SpinPix offers across the UK.');

  return (
    <>
      <section className="relative pt-32 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-violet/15 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl">
          <Breadcrumbs items={[{ label: 'Experiences' }]} />
          <SectionHeading
            eyebrow="All Experiences"
            title="Find your perfect booth"
            subtitle="Every experience includes delivery, setup, a professional attendant and a private online gallery — so you can focus on the fun."
            align="left"
            className="mt-8"
          />
        </div>
      </section>

      {/* Services grid */}
      <section className="pb-20 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
        </div>
      </section>

      {/* Event types */}
      <section className="py-20 px-4 sm:px-6 bg-midnight/30">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Browse by event"
            title="Tailored for your occasion"
            subtitle="Jump straight to the experience that matches your celebration."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {eventTypes.map((e) => (
              <Link key={e.slug} to={`/${e.slug}`} className="group relative rounded-2xl overflow-hidden h-64 neon-edge">
                <img src={e.heroImage} alt={e.name} loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <h3 className="font-display font-bold text-xl text-ice">{e.name}</h3>
                  <p className="text-sm text-silver/70 mt-1">{e.tagline}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm text-cyan font-semibold mt-3">
                    Explore <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
