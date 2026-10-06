import SectionHeading from '@/components/SectionHeading';
import CTABand from '@/components/CTABand';
import Reveal from '@/components/Reveal';
import { gallery } from '@/data/gallery';
import { useSEO } from '@/lib/useSEO';

export default function Gallery() {
  useSEO('Gallery', 'Photos of SpinPix UK photo booths, magic mirrors, selfie pods and 360 video booths at real events.');
  return (
    <>
      <section className="border-b-2 border-line bg-card px-4 sm:px-6 py-16">
        <div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Gallery" title="Our booths at real events" subtitle="Weddings, parties, proms and more. More photos on our Facebook and Instagram." /></div>
      </section>
      <section className="px-4 sm:px-6 py-16">
        <div className="mx-auto max-w-7xl columns-1 sm:columns-2 lg:columns-3 gap-6 [&>*]:mb-6">
          {gallery.map((p, i) => (
            <Reveal key={p.src} delay={(i % 3) * 0.05}>
              <figure className="break-inside-avoid overflow-hidden rounded-3xl border-2 border-line bg-card shadow-hard-sm">
                <img src={p.src} alt={p.alt} loading="lazy" className="w-full h-auto block" />
                <figcaption className="px-5 py-3 font-display font-bold text-sm">{p.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
      <CTABand />
    </>
  );
}
