import { Link } from 'react-router-dom';
import { Icon } from './Icon';
import { site } from '@/config/site';

export default function CTABand({ title = 'Ready to make your event unforgettable?', subtitle = 'Tell us the date and the vibe. We’ll do the rest.' }: { title?: string; subtitle?: string }) {
  return (
    <section className="px-4 sm:px-6 py-16">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border-2 border-line bg-pop text-white shadow-hard p-8 sm:p-14">
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-sun border-2 border-line" aria-hidden="true" />
        <div className="absolute right-24 -bottom-12 w-32 h-32 rounded-full bg-volt border-2 border-line" aria-hidden="true" />
        <div className="relative max-w-2xl">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.02]">{title}</h2>
          <p className="mt-4 text-lg text-white/90">{subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="btn btn-sun">Get a quote <Icon name="ArrowRight" size={18} /></Link>
            <a href={site.phoneHref} className="btn bg-paper text-ink hover:shadow-hard shadow-hard-sm">
              <Icon name="Phone" size={18} /> {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
