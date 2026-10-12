import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { site } from '@/config/site';
import { useSEO } from '@/lib/useSEO';

export default function ThankYou() {
  useSEO();
  const name = (useLocation().state as { name?: string } | null)?.name;
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-lg text-center bg-card border-2 border-line rounded-[2rem] shadow-hard p-10">
        <div className="mx-auto grid place-items-center w-20 h-20 rounded-full bg-mint border-2 border-line text-4xl" aria-hidden="true">🎉</div>
        <h1 className="mt-6 font-display font-extrabold text-4xl">Thanks{name ? `, ${name}` : ''}!</h1>
        <p className="mt-3 text-paper/70 text-lg">Your enquiry has been sent and we’ll be in touch soon. Need us sooner? Call {site.phone}.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-ink">Back home</Link>
          <Link to="/gallery" className="btn btn-ghost">See our gallery <Icon name="ArrowRight" size={18} /></Link>
        </div>
      </div>
    </section>
  );
}
