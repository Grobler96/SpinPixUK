import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import ServiceCard from '@/components/ServiceCard';
import CTABand from '@/components/CTABand';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Icon } from '@/components/Icon';
import { getEventType } from '@/data/eventTypes';
import { getService } from '@/data/services';
import { useSEO } from '@/lib/useSEO';

export default function EventTypePage() {
  const { slug } = useParams<{ slug: string }>();
  const event = slug ? getEventType(slug) : undefined;
  useSEO(event?.name, event?.blurb);

  if (!event) return <Navigate to="/404" replace />;

  const recommended = event.recommendedServices.map(getService).filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={event.heroImage} alt={event.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/70 to-ink" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 w-full">
          <Breadcrumbs items={[{ label: event.name }]} />
          <div className="mt-8 max-w-2xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-cyan mb-3">
              {event.name}
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-ice leading-tight mb-5">
              {event.tagline}
            </h1>
            <p className="text-lg text-silver/80 leading-relaxed mb-8">{event.blurb}</p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-electric to-violet text-white font-semibold hover:shadow-[0_0_30px_rgba(22,139,255,0.5)] transition-all"
            >
              Enquire about {event.name.toLowerCase()} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="What's included" title={`${event.name} highlights`} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {event.highlights.map((h) => (
              <div key={h.title} className="rounded-2xl glass p-6 hover:border-cyan/30 transition-colors">
                <div className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br from-electric/20 to-violet/20 text-cyan mb-4">
                  <Icon name={h.icon} size={22} />
                </div>
                <h3 className="font-display font-semibold text-lg text-ice mb-2">{h.title}</h3>
                <p className="text-sm text-silver/70 leading-relaxed">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended services */}
      <section className="py-20 px-4 sm:px-6 bg-midnight/30">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Recommended for you"
            title={`Booths perfect for ${event.name.toLowerCase()}`}
            subtitle="Based on thousands of events, these are the experiences our hosts choose again and again."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommended.map((s) => s && <ServiceCard key={s.slug} service={s} />)}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow={`${event.name} gallery`} title="Real moments from real events" />
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {event.galleryImages.map((src, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden group aspect-square neon-edge">
                <img src={src} alt={`${event.name} moment ${i + 1}`} loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand title={`Book your ${event.name.toLowerCase()} booth`} subtitle="Tell us about your event and we will send a tailored quote within 24 hours." />
    </>
  );
}
