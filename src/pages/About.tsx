import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import SectionHeading from '@/components/SectionHeading';
import CTABand from '@/components/CTABand';
import Reveal from '@/components/Reveal';
import { services } from '@/data/services';
import { steps } from '@/data/content';
import Reviews from '@/components/Reviews';
import { site } from '@/config/site';
import { useSEO } from '@/lib/useSEO';

const included = [
  'Unlimited visits during the hire period',
  'Instant digital sharing (AirDrop, WhatsApp, email & QR code where available)',
  'Professional studio lighting',
  'Large selection of fun props',
  'Personalised photo overlays',
  'Online gallery after the event',
  'Friendly setup and collection',
  'Print packages on selected booths',
];

const why = [
  { icon: 'Sparkles', title: 'Premium equipment', text: 'Modern, high-quality kit maintained to professional standards.' },
  { icon: 'ShieldCheck', title: 'Reliable & fully insured', text: 'Dependable service from first enquiry to the event itself.' },
  { icon: 'Palette', title: 'Personalised designs', text: 'A custom photo overlay designed for every booking.' },
  { icon: 'Heart', title: 'No hidden costs', text: 'Competitive pricing, friendly and approachable people.' },
];

const occasions = ['Weddings', 'Birthdays', 'Corporate events', 'Proms', 'School leavers’ parties', 'Charity events', 'Christmas parties', 'Every special occasion'];

export default function About() {
  useSEO('About us', 'SpinPix UK is a family-run photo booth hire company based in West Yorkshire, covering the whole of the UK.');
  return (
    <>
      <section className="border-b-2 border-line bg-card px-4 sm:px-6 py-16 sm:py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl grid md:grid-cols-[1.4fr_1fr] gap-12 items-center">
          <div>
            <SectionHeading eyebrow="About SpinPix UK" title="Family-run. Fun-first. Seriously reliable." subtitle={site.description} />
            <p className="mt-5 text-lg text-paper/70 max-w-2xl leading-relaxed">Our aim is simple: a fun, stress-free experience that creates lasting memories. We pride ourselves on reliable service, premium equipment and exceptional customer service from the initial enquiry through to the event itself.</p>
          </div>
          <div className="hidden md:flex justify-center">
            <img src="/logo.jpg" alt="SpinPix UK logo" width={320} height={320} className="w-72 rounded-[2rem] border-2 border-pop neon-box -rotate-3" />
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Why SpinPix" title="Why choose us?" /></Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="h-full bg-card border-2 border-line rounded-3xl p-6 shadow-hard-sm">
                  <span className="grid place-items-center w-12 h-12 rounded-2xl border-2 border-line bg-sun text-ink"><Icon name={v.icon} size={22} /></span>
                  <h3 className="mt-4 font-display font-bold text-xl">{v.title}</h3>
                  <p className="mt-1.5 text-paper/70">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y-2 border-line bg-card px-4 sm:px-6 py-20">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Every hire can include" title="Everything you need to get snapping" />
            <ul className="mt-8 space-y-3">
              {included.map((t) => (
                <li key={t} className="flex items-start gap-3"><span className="mt-0.5 grid place-items-center w-5 h-5 rounded-full bg-pop text-white shrink-0"><Icon name="Check" size={13} /></span>{t}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading eyebrow="Our booths" title="Five to choose from" />
            <ul className="mt-8 grid gap-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/booths#${s.slug}`} className="flex items-center gap-4 rounded-2xl border-2 border-line px-5 py-4 hover:border-pop transition-colors">
                    <Icon name={s.icon} size={24} />
                    <span><span className="block font-display font-bold">{s.name}</span><span className="text-sm text-paper/60">{s.tagline}</span></span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-paper/70">Bespoke branding is available for corporate events, and digital-only and print packages are available depending on the booth.</p>
          </Reveal>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Booking" title="How booking works" subtitle="A £50 booking fee secures your date, and the balance is due the day before the event." /></Reveal>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <li className="h-full list-none rounded-3xl border-2 border-line bg-card p-6">
                  <span className="font-display font-extrabold text-5xl text-pop neon">{s.n}</span>
                  <h3 className="mt-3 font-display font-bold text-lg">{s.title}</h3>
                  <p className="mt-1.5 text-paper/70 text-sm">{s.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl">Suitable for</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            {occasions.map((o) => <span key={o} className="rounded-full border-2 border-line bg-card px-4 py-2 font-display font-bold">{o}</span>)}
          </div>
          <p className="mt-10 text-lg text-paper/70">See what we’re up to on social.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a href={site.instagram} target="_blank" rel="noreferrer" className="btn btn-ghost"><Icon name="Instagram" size={18} /> Instagram</a>
            <a href={site.facebook} target="_blank" rel="noreferrer" className="btn btn-ghost"><Icon name="Facebook" size={18} /> Facebook</a>
            <a href={site.google} target="_blank" rel="noreferrer" className="btn btn-ghost"><Icon name="Star" size={18} /> Google profile</a>
          </div>
        </div>
      </section>
      <Reviews />
      <CTABand />
    </>
  );
}
