import { Icon } from '@/components/Icon';
import SectionHeading from '@/components/SectionHeading';
import CTABand from '@/components/CTABand';
import Reveal from '@/components/Reveal';
import PhotoStrip from '@/components/PhotoStrip';
import { site } from '@/config/site';
import { useSEO } from '@/lib/useSEO';

const values = [
  { icon: 'Heart', title: 'Family-run', text: 'A small team who care how your event goes, because our name is on it.' },
  { icon: 'Sparkles', title: 'Modern kit', text: 'Professional studio lighting and booths that look as good as the photos.' },
  { icon: 'Truck', title: 'Easy on the day', text: 'We deliver, set up, test and collect, so you can enjoy the party.' },
  { icon: 'Briefcase', title: 'Fun, but professional', text: 'Just as comfortable at a leavers’ prom as a company launch.' },
];

export default function About() {
  useSEO('About us', 'SpinPix UK is a family-run photo booth hire business based in West Yorkshire, covering the whole of the UK.');
  return (
    <>
      <section className="border-b-2 border-ink bg-cream px-4 sm:px-6 py-16 sm:py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl grid md:grid-cols-[1.4fr_1fr] gap-12 items-center">
          <div>
            <SectionHeading eyebrow="About SpinPix" title="Family-run. Fun-first. Seriously reliable." subtitle={`${site.description} We’re based in ${site.base} and cover the whole of the UK.`} />
          </div>
          <div className="hidden md:flex justify-center" aria-hidden="true">
            <PhotoStrip tones={['pop', 'sun', 'volt', 'mint']} faces={['👨‍👩‍👧', '😄', '📸', '🎉']} caption="The family" className="-rotate-6 scale-110" />
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-20">
        <div className="mx-auto max-w-7xl grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <div className="h-full bg-white border-2 border-ink rounded-3xl p-6 shadow-hard-sm">
                <span className="grid place-items-center w-12 h-12 rounded-2xl border-2 border-ink bg-sun"><Icon name={v.icon} size={22} /></span>
                <h3 className="mt-4 font-display font-bold text-xl">{v.title}</h3>
                <p className="mt-1.5 text-ink/70">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl">Come and say hi</h2>
          <p className="mt-4 text-lg text-ink/70">See what we’re up to on social, or get in touch directly.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={site.instagram} target="_blank" rel="noreferrer" className="btn btn-ghost"><Icon name="Instagram" size={18} /> Instagram</a>
            <a href={site.facebook} target="_blank" rel="noreferrer" className="btn btn-ghost"><Icon name="Facebook" size={18} /> Facebook</a>
            <a href={site.google} target="_blank" rel="noreferrer" className="btn btn-ghost"><Icon name="Star" size={18} /> Google profile</a>
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
