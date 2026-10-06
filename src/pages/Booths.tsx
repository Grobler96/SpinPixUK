import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import SectionHeading from '@/components/SectionHeading';
import CTABand from '@/components/CTABand';
import Reveal from '@/components/Reveal';
import { services, toneClasses } from '@/data/services';
import { useSEO } from '@/lib/useSEO';

export default function Booths() {
  useSEO('Our booths', 'Selfie Pod, Letterbox Selfie Pod, Magic Mirror, Enclosed Photo Booth and 360 Video Booth hire across the UK.');
  return (
    <>
      <section className="px-4 sm:px-6 pt-14 pb-10 border-b-2 border-line bg-card">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Booths" title="Pick your photo-making machine" subtitle="Each one includes professional studio lighting, personalised overlays, friendly setup and collection, and an online gallery after your event." />
        </div>
      </section>

      <div className="px-4 sm:px-6 py-16 space-y-10">
        {services.map((s, i) => {
          const t = toneClasses[s.tone];
          return (
            <Reveal key={s.slug}>
              <article id={s.slug} className="scroll-mt-28 mx-auto max-w-6xl grid md:grid-cols-[320px_1fr] bg-card border-2 border-line rounded-[2rem] shadow-hard overflow-hidden">
                <div className={`${t.bg} ${t.text} p-8 flex flex-col justify-between gap-10 md:border-r-2 border-b-2 md:border-b-0 border-line`}>
                  <Icon name={s.icon} size={64} />
                  <div>
                    <p className="font-display font-bold text-sm uppercase tracking-widest opacity-80">0{i + 1}</p>
                    <p className="font-display font-extrabold text-2xl leading-tight">{s.capacity}</p>
                    <p className="opacity-90">{s.duration}</p>
                  </div>
                </div>
                <div className="p-8 sm:p-10">
                  <h2 className="font-display font-extrabold text-3xl sm:text-4xl">{s.name}</h2>
                  <p className="mt-1 font-display font-bold text-paper/60">{s.tagline}</p>
                  <p className="mt-4 text-lg text-paper/75 leading-relaxed">{s.description}</p>
                  <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-3"><span className={`mt-1 grid place-items-center w-5 h-5 rounded-full border-2 border-line ${t.bg} shrink-0 ${t.text}`}><Icon name="Check" size={11} /></span>{f}</li>
                    ))}
                  </ul>
                  <Link to={`/contact?booth=${s.slug}`} className="btn btn-pop mt-8">Enquire about this booth <Icon name="ArrowRight" size={18} /></Link>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
      <CTABand title="Can’t decide? We’ll help." subtitle="Tell us about your event and we’ll recommend the best booth for it." />
    </>
  );
}
