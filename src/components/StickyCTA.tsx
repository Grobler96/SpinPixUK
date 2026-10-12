import { Link, useLocation } from 'react-router-dom';
import { Icon } from './Icon';
import { site } from '@/config/site';

/** Phone-only bar pinned to the bottom of the screen so "call" and "get a quote" are always one tap away. */
export default function StickyCTA() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/contact') || pathname.startsWith('/thank-you')) return null;
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t-2 border-line bg-ink/95 backdrop-blur px-3 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] flex gap-2">
      <a href={site.phoneHref} className="btn btn-ghost flex-1 !py-3 text-sm"><Icon name="Phone" size={16} /> Call us</a>
      <Link to="/contact" className="btn btn-pop flex-[1.4] !py-3 text-sm">Get a quote <Icon name="ArrowRight" size={16} /></Link>
    </div>
  );
}
