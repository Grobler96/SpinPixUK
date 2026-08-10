import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import CTABand from '@/components/CTABand';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Icon } from '@/components/Icon';
import { stats, testimonials } from '@/data/content';
import { site } from '@/config/site';
import { useSEO } from '@/lib/useSEO';

export default function About() {
  useSEO('About', 'Meet the SpinPix team — six years of bringing photo booth fun to events across the UK.');

  return (
    <>
      <section className="relative pt-32 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-violet/15 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl">
          <Breadcrumbs items={[{ label: 'About' }]} />
          <div className="mt-8 grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <SectionHeading
                eyebrow="About SpinPix"
                title="We make events unforgettable"
                subtitle="What started as a single booth at a friend's wedding has grown into one of the UK's most-loved photo booth hire companies."
                align="left"
              />
              <p className="mt-6 text-silver/70 leading-relaxed">
                We are a small, passionate team based in Sheffield, serving the whole of the UK.
                Every booking is personal — we treat your event like it is our own, because
                most of us started as event planners, DJs and wedding photographers before
                picking up the booth bug.
              </p>
              <p className="mt-4 text-silver/70 leading-relaxed">
                We believe a great booth is more than a camera in a box. It is the lighting,
                the attendant's energy, the props, the overlay, the music — all working
                together to create moments people want to share.
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-xl bg-gradient-to-r from-electric to-violet text-white font-semibold hover:shadow-[0_0_30px_rgba(22,139,255,0.5)] transition-all"
              >
                Work with us <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.pexels.com/photos/3754253/pexels-photo-3754253.jpeg?auto=compress&cs=tinysrgb&w=500" alt="SpinPix booth in action" loading="lazy" className="rounded-2xl neon-edge aspect-[3/4] object-cover" />
                <img src="https://images.pexels.com/photos/4946525/pexels-photo-4946525.jpeg?auto=compress&cs=tinysrgb&w=500" alt="360 video booth setup" loading="lazy" className="rounded-2xl neon-edge aspect-[3/4] object-cover mt-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 bg-midnight/30">
        <div className="mx-auto max-w-5xl grid grid-cols-2 lg:grid-cols-4 gap-6">
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
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Our Values" title="What we stand for" />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { icon: 'Heart', title: 'Personal, always', text: 'No call centres, no scripts. You speak to the same person from enquiry to gallery.' },
              { icon: 'ShieldCheck', title: 'Reliable by design', text: 'Redundant equipment, backup attendants and a 100% on-time arrival record.' },
              { icon: 'Sparkles', title: 'Quality you can see', text: 'Studio-grade lighting, premium prints and overlays designed in-house.' },
            ].map((v) => (
              <div key={v.title} className="rounded-2xl glass p-6">
                <div className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br from-electric/20 to-violet/20 text-cyan mb-4">
                  <Icon name={v.icon} size={22} />
                </div>
                <h3 className="font-display font-semibold text-lg text-ice mb-2">{v.title}</h3>
                <p className="text-sm text-silver/70 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 bg-midnight/30">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Testimonials" title="What our clients say" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <figure key={t.name} className="rounded-2xl glass p-6 flex flex-col">
                <blockquote className="text-sm text-silver/80 leading-relaxed flex-1">“{t.text}”</blockquote>
                <figcaption className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-sm font-semibold text-ice">{t.name}</p>
                  <p className="text-xs text-silver/60">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
