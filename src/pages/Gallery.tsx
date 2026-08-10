import { useState } from 'react';
import SectionHeading from '@/components/SectionHeading';
import CTABand from '@/components/CTABand';
import Breadcrumbs from '@/components/Breadcrumbs';
import { galleryImages, galleryCategories } from '@/data/gallery';
import { useSEO } from '@/lib/useSEO';

export default function Gallery() {
  useSEO('Gallery', 'See SpinPix in action — real photos and moments from weddings, parties, corporate events and proms across the UK.');
  const [filter, setFilter] = useState<string>('All');

  const filtered = filter === 'All' ? galleryImages : galleryImages.filter((i) => i.category === filter);

  return (
    <>
      <section className="relative pt-32 pb-12 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-electric/15 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl">
          <Breadcrumbs items={[{ label: 'Gallery' }]} />
          <SectionHeading
            eyebrow="Gallery"
            title="Moments we have captured"
            subtitle="A glimpse into the fun — filter by event type to see booths in action."
            align="left"
            className="mt-8"
          />
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-7xl flex flex-wrap gap-2 justify-center">
          {galleryCategories.map((cat) => (
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

      {/* Grid */}
      <section className="py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((img, i) => (
            <div key={`${img.src}-${i}`} className="relative rounded-xl overflow-hidden group aspect-square neon-edge">
              <img src={img.src} alt={img.alt} loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <span className="absolute bottom-2 left-2 text-xs px-2 py-1 rounded-md glass-strong text-ice">
                {img.category}
              </span>
            </div>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
