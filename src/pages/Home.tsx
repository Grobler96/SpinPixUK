import { Link } from 'react-router-dom';
import { ArrowRight, Star, Quote } from 'lucide-react';
import AnimatedHero from '@/components/AnimatedHero';
import SectionHeading from '@/components/SectionHeading';
import ServiceCard from '@/components/ServiceCard';
import CTABand from '@/components/CTABand';
import { Icon } from '@/components/Icon';
import { services } from '@/data/services';
import { eventTypes } from '@/data/eventTypes';
import { galleryImages } from '@/data/gallery';
import { testimonials, benefits, processSteps, stats } from '@/data/content';
import { site } from '@/config/site';
import { useSEO } from '@/lib/useSEO';

export default function Home() {
  useSEO();

  return (
    <>
      {/* 1. Hero */}
      <AnimatedHero />

      {/* 2. Stats bar */}
      <section className="relative -mt-10 z-30 px-4">
        <div className="mx-auto max-w-5xl rounded-2xl glass-strong p-6 sm:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="grid place-items-center w-11 h-11 rounded-xl bg-gradient-to-br from-electric/20 to-violet/20 text-cyan mx-auto mb-3">
                  <Icon name={s.icon} size={20} />
                </div>
                <p className="font-display font-bold text-2xl sm:text-3xl text-ice">{s.value}</p>
                <p className="text-xs sm:text-sm text-silver/60 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Services */}
      <section className="py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Our Experiences"
            title="Booths for every kind of celebration"
            subtitle="From classic prints to cinematic 360° spins, each booth is delivered, set up and run by our team — so you can focus on having fun."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
        </div>
      </section>

      {/* 4. Why choose us */}
      <section className="py-20 px-4 sm:px-6 bg-midnight/30">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Why SpinPix"
            title="Everything handled, start to finish"
            subtitle="We obsess over the details so your event runs flawlessly — from the first enquiry to the final gallery delivery."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl glass p-6 hover:border-cyan/30 transition-colors">
                <div className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br from-electric/20 to-violet/20 text-cyan mb-4">
                  <Icon name={b.icon} size={22} />
                </div>
                <h3 className="font-display font-semibold text-lg text-ice mb-2">{b.title}</h3>
                <p className="text-sm text-silver/70 leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Event types */}
      <section className="py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Events We Love"
            title="Tailored for your occasion"
            subtitle="Every event has its own energy. We match the booth, props and overlay to your celebration."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {eventTypes.map((e) => (
              <Link
                key={e.slug}
                to={`/${e.slug}`}
                className="group relative rounded-2xl overflow-hidden h-72 neon-edge"
              >
                <img src={e.heroImage} alt={e.name} loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <h3 className="font-display font-bold text-xl text-ice mb-1">{e.name}</h3>
                  <p className="text-sm text-silver/70 mb-3">{e.tagline}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm text-cyan font-semibold">
                    Discover <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. How it works */}
      <section className="py-20 px-4 sm:px-6 bg-midnight/30">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="How It Works"
            title="Six steps from enquiry to gallery"
            subtitle="A simple, transparent process that takes the stress out of booking and running your booth."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step) => (
              <div key={step.step} className="relative rounded-2xl glass p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-gradient-to-br from-electric to-violet text-white font-display font-bold">
                    {step.step}
                  </span>
                  <div className="grid place-items-center w-9 h-9 rounded-lg glass text-cyan">
                    <Icon name={step.icon} size={18} />
                  </div>
                </div>
                <h3 className="font-display font-semibold text-lg text-ice mb-2">{step.title}</h3>
                <p className="text-sm text-silver/70 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Gallery preview */}
      <section className="py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Gallery"
            title="Moments we have captured"
            subtitle="A glimpse of the fun — every event is unique, but the smiles are always the same."
          />
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {galleryImages.slice(0, 8).map((img) => (
              <div key={img.src} className="relative rounded-xl overflow-hidden group aspect-square neon-edge">
                <img src={img.src} alt={img.alt} loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <span className="absolute bottom-2 left-2 text-xs px-2 py-1 rounded-md glass-strong text-ice">
                  {img.category}
                </span>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/gallery" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-ice font-semibold hover:border-cyan/40 transition-colors">
              View full gallery <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Testimonials */}
      <section className="py-20 px-4 sm:px-6 bg-midnight/30">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Testimonials"
            title="Loved by hosts and guests alike"
            subtitle={`${site.rating} stars from ${site.reviewCount} verified reviews across ${site.eventsHosted}+ events.`}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl glass p-6 flex flex-col">
                <Quote size={28} className="text-violet/60 mb-4" />
                <blockquote className="text-sm text-silver/80 leading-relaxed flex-1">“{t.text}”</blockquote>
                <div className="flex mt-4 mb-3" aria-hidden>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-magenta text-magenta" />
                  ))}
                </div>
                <figcaption className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <div className="grid place-items-center w-10 h-10 rounded-full bg-gradient-to-br from-electric to-violet text-white font-display font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ice">{t.name}</p>
                    <p className="text-xs text-silver/60">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA */}
      <CTABand />

      {/* 10. Service area / contact strip */}
      <section className="py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl rounded-2xl glass p-8 sm:p-10 grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-ice mb-3">{site.serviceArea}</h2>
            <p className="text-silver/70 leading-relaxed mb-4">
              Based in Sheffield, we travel to venues across England, Scotland and Wales.
              Free delivery within 25 miles; transparent travel costs beyond.
            </p>
            <p className="text-sm text-silver/60">{site.hours}</p>
          </div>
          <div className="flex flex-col gap-3">
            <a href={site.phoneHref} className="flex items-center justify-between px-5 py-4 rounded-xl glass hover:border-cyan/40 transition-colors">
              <span className="text-ice font-semibold">Call us</span>
              <span className="text-cyan">{site.phone}</span>
            </a>
            <a href={site.emailHref} className="flex items-center justify-between px-5 py-4 rounded-xl glass hover:border-cyan/40 transition-colors">
              <span className="text-ice font-semibold">Email us</span>
              <span className="text-cyan">{site.email}</span>
            </a>
            <Link to="/contact" className="flex items-center justify-between px-5 py-4 rounded-xl bg-gradient-to-r from-electric to-violet text-white font-semibold">
              <span>Get a quote</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
