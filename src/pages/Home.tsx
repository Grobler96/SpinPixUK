import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@/components/Icon';
import Marquee from '@/components/Marquee';
import PhotoStrip from '@/components/PhotoStrip';
import SectionHeading from '@/components/SectionHeading';
import BoothCard from '@/components/BoothCard';
import CTABand from '@/components/CTABand';
import Reveal from '@/components/Reveal';
import { services } from '@/data/services';
import { eventTypes } from '@/data/events';
import { steps } from '@/data/content';
import { site } from '@/config/site';
import { useSEO } from '@/lib/useSEO';

type Mode = 'fun' | 'pro';

const hero = {
  fun: {
    kicker: 'Weddings · Parties · Proms',
    title: ['Photo booths', 'that make the', 'party.'],
    text: 'Selfie pods, magic mirrors, classic booths and slow-mo 360 video. We bring the props, the lighting and the good-time energy. You bring the guests.',
    cta: 'Plan my celebration',
    to: '/contact',
  },
  pro: {
    kicker: 'Launches · Conferences · Award nights',
    title: ['Branded', 'content that', 'people share.'],
    text: 'Bespoke overlays, 360 video with your branding and instant digital sharing. Professional setup, polished results, and a team that’s easy to work with.',
    cta: 'Enquire for your business',
    to: '/corporate',
  },
} as const;

export default function Home() {
  useSEO();
  const [mode, setMode] = useState<Mode>('fun');
  const h = hero[mode];
  const pro = mode === 'pro';

  return (
    <>
      {/* HERO */}
      <section className={`relative overflow-hidden border-b-2 border-line transition-colors duration-500 ${pro ? 'bg-navy text-white' : 'bg-ink'}`}>
        <div className={`absolute inset-0 transition-opacity duration-500 ${pro ? 'grid-lines opacity-100' : 'grain opacity-100'}`} aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-16 sm:pt-16 sm:pb-24 grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
          <div>
            {/* audience switch */}
            <div role="tablist" aria-label="Who are you booking for?" className={`inline-flex p-1 rounded-full border-2 ${pro ? 'border-white/40 bg-white/10' : 'border-line bg-card'}`}>
              {([['fun', 'Celebrations', 'PartyPopper'], ['pro', 'Business', 'Briefcase']] as const).map(([m, label, icon]) => (
                <button
                  key={m}
                  role="tab"
                  aria-selected={mode === m}
                  onClick={() => setMode(m)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-display font-bold text-sm transition-colors ${
                    mode === m ? (pro ? 'bg-sun text-ink' : 'bg-paper text-ink') : pro ? 'text-white/70' : 'text-paper/60'
                  }`}
                >
                  <Icon name={icon} size={16} /> {label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <p className={`mt-8 font-display font-bold text-sm uppercase tracking-[0.2em] ${pro ? 'text-sun' : 'text-pop'}`}>{h.kicker}</p>
                <h1 className="mt-3 font-display font-extrabold text-[2.9rem] sm:text-7xl lg:text-[5.4rem] leading-[0.95]">
                  {h.title.map((l, i) => (
                    <span key={l} className="block">
                      {i === h.title.length - 1 ? (
                        <span className={`inline-block px-3 -mx-1 rounded-xl ${pro ? 'bg-pop text-white neon-box' : 'bg-pop text-white neon-box -rotate-1'}`}>{l}</span>
                      ) : l}
                    </span>
                  ))}
                </h1>
                <p className={`mt-7 text-lg sm:text-xl max-w-xl leading-relaxed ${pro ? 'text-white/75' : 'text-paper/75'}`}>{h.text}</p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link to={h.to} className={`btn ${pro ? 'btn-sun' : 'btn-pop'}`}>{h.cta} <Icon name="ArrowRight" size={18} /></Link>
                  <Link to="/booths" className={`btn ${pro ? 'border-white text-white hover:bg-white hover:text-navy' : 'btn-ghost'}`}>Meet the booths</Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* photo strip collage */}
          <div className="relative h-[380px] sm:h-[480px] mx-auto w-full max-w-md" aria-hidden="true">
            <motion.div className="absolute left-0 top-6" animate={{ rotate: pro ? -4 : -9 }} transition={{ type: 'spring', stiffness: 80 }}>
              <PhotoStrip tones={pro ? ['volt', 'sun', 'mint'] : ['pop', 'sun', 'mint']} faces={pro ? ['🤝', '📸', '🚀'] : ['🤪', '😎', '🥳']} caption={pro ? 'Launch night' : 'Big night'} />
            </motion.div>
            <motion.div className="absolute left-[34%] top-0 sm:left-[36%]" animate={{ rotate: pro ? 2 : 4 }} transition={{ type: 'spring', stiffness: 80 }}>
              <PhotoStrip tones={pro ? ['sun', 'volt', 'grape', 'mint'] : ['volt', 'grape', 'pop', 'sun']} faces={pro ? ['🏆', '🎤', '✨', '🥂'] : ['😂', '🕺', '🎉', '💃']} caption="SpinPix" className="scale-[1.08]" />
            </motion.div>
            <motion.div className="absolute right-0 top-14" animate={{ rotate: pro ? 7 : 11 }} transition={{ type: 'spring', stiffness: 80 }}>
              <PhotoStrip tones={pro ? ['grape', 'volt', 'sun'] : ['mint', 'pop', 'volt']} faces={pro ? ['📈', '💡', '🎯'] : ['👑', '🦄', '🍾']} caption={pro ? 'Brand day' : 'Prom night'} />
            </motion.div>
            <div className={`absolute -bottom-2 left-4 rotate-[-6deg] px-4 py-2 rounded-xl border-2 border-line font-display font-extrabold text-lg shadow-hard-sm animate-wobble ${pro ? 'bg-mint text-ink' : 'bg-pop text-white'}`}>
              {pro ? 'Your logo here ✓' : 'Say cheese! 📸'}
            </div>
          </div>
        </div>
      </section>

      <Marquee items={['Selfie Pods', 'Magic Mirrors', '360 Video', 'Photo Booths', 'Weddings', 'Parties', 'Proms', 'Corporate']} className="bg-sun text-ink" />

      {/* BOOTHS */}
      <section className="px-4 sm:px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading eyebrow="The line-up" title="Five ways to get everyone in the picture" subtitle="Every booth comes with professional studio lighting, personalised overlays, friendly setup and collection, and an online gallery." />
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.06}><BoothCard s={s} i={i} /></Reveal>
            ))}
            <Reveal delay={0.3}>
              <Link to="/contact" className="h-full min-h-[240px] flex flex-col justify-center items-start gap-3 rounded-3xl border-2 border-dashed border-line p-8 hover:bg-card transition-colors">
                <Icon name="MessageCircle" size={36} />
                <h3 className="font-display font-extrabold text-2xl">Not sure which?</h3>
                <p className="text-paper/70">Tell us about your event and we’ll point you to the right one.</p>
                <span className="font-display font-bold inline-flex items-center gap-2">Ask us <Icon name="ArrowRight" size={16} /></span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TWO SIDES */}
      <section className="px-4 sm:px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading eyebrow="Two sides of SpinPix" title="Pure fun. Properly professional." align="center" subtitle="The same friendly team and the same great kit, tuned to the occasion." />
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[2rem] border-2 border-line bg-pop text-white p-8 sm:p-10 shadow-hard relative overflow-hidden">
                <span className="absolute -right-6 -top-6 text-[8rem] opacity-90 rotate-12" aria-hidden="true">🎉</span>
                <p className="font-display font-bold uppercase tracking-[0.2em] text-sm text-sun">Celebrations</p>
                <h3 className="mt-2 font-display font-extrabold text-3xl sm:text-4xl">Weddings, parties & proms</h3>
                <p className="mt-4 text-white/90 max-w-md">Props, personalised overlays and the kind of laughs you’ll still be talking about at the next family do.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {eventTypes.filter((e) => e.slug !== 'corporate').map((e) => (
                    <Link key={e.slug} to={`/${e.slug}`} className="inline-flex items-center gap-2 bg-paper text-ink border-2 border-line rounded-full px-4 py-2 font-display font-bold hover:bg-sun transition-colors">
                      <span aria-hidden="true">{e.emoji}</span> {e.name}
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-[2rem] border-2 border-line bg-navy text-white p-8 sm:p-10 shadow-hard relative overflow-hidden">
                <div className="absolute inset-0 grid-lines" aria-hidden="true" />
                <div className="relative">
                  <p className="font-display font-bold uppercase tracking-[0.2em] text-sm text-sun">Corporate</p>
                  <h3 className="mt-2 font-display font-extrabold text-3xl sm:text-4xl">Brand activations, minus the cringe</h3>
                  <ul className="mt-5 space-y-3 text-white/85">
                    {['Bespoke branded overlays', '360 video with your branding', 'Instant digital sharing and online gallery', 'Clear communication from enquiry to collection'].map((t) => (
                      <li key={t} className="flex items-start gap-3"><span className="mt-0.5 grid place-items-center w-5 h-5 rounded-full bg-mint text-ink shrink-0"><Icon name="Check" size={13} /></span>{t}</li>
                    ))}
                  </ul>
                  <Link to="/corporate" className="btn btn-sun mt-8">Corporate hire <Icon name="ArrowRight" size={18} /></Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-card border-y-2 border-line px-4 sm:px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading dark eyebrow="How it works" title="Easy for you. Even easier for your guests." /></Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.07}>
                <div className="relative h-full rounded-3xl border-2 border-paper/20 p-7 hover:border-sun transition-colors">
                  <span className="font-display font-extrabold text-6xl text-sun/90 leading-none">{s.n}</span>
                  <h3 className="mt-5 font-display font-bold text-xl">{s.title}</h3>
                  <p className="mt-2 text-paper/70">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAMILY */}
      <section className="px-4 sm:px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl grid gap-10 md:grid-cols-[auto_1fr] items-center">
          <Reveal>
            <img src="/logo.jpg" alt="SpinPix UK logo: disco ball, photo booth and 360 platform" width={320} height={320} className="w-64 sm:w-80 rounded-[2rem] border-2 border-pop neon-box animate-floaty mx-auto" />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading eyebrow="Family-run" title="Real people, not a faceless hire company." />
            <p className="mt-5 text-lg text-paper/70 leading-relaxed">{site.description} We’re based in {site.base} and travel across the UK, and whoever you speak to at the start is who looks after your event.</p>
            <Link to="/about" className="btn btn-ink mt-7">Meet SpinPix <Icon name="ArrowRight" size={18} /></Link>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
