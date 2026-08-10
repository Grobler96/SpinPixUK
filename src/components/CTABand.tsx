import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { site } from '@/config/site';

export default function CTABand({
  title = 'Ready to capture your moment?',
  subtitle = 'Get a tailored quote in under 24 hours. No obligation, no pressure — just a friendly chat about your event.',
}: { title?: string; subtitle?: string }) {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-midnight via-electric/10 to-midnight" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-violet/20 blur-[120px]" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ice mb-5">{title}</h2>
        <p className="text-lg text-silver/70 mb-8 max-w-2xl mx-auto">{subtitle}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-electric to-violet text-white font-semibold hover:shadow-[0_0_30px_rgba(22,139,255,0.5)] transition-all"
          >
            Get your instant quote
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass text-ice font-semibold hover:border-cyan/40 transition-colors"
          >
            <Phone size={18} /> {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
