import { Link } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';
import { useSEO } from '@/lib/useSEO';

export default function NotFound() {
  useSEO('Page not found');
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-violet/15 blur-[120px]" />
      <div className="relative text-center max-w-lg">
        <p className="font-display font-bold text-7xl sm:text-9xl text-gradient mb-4">404</p>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-ice mb-3">Page not found</h1>
        <p className="text-silver/70 mb-8">The page you are looking for has moved or no longer exists. Let's get you back on track.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-electric to-violet text-white font-semibold">
            <Home size={17} /> Back home
          </Link>
          <Link to="/experiences" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass text-ice font-semibold hover:border-cyan/40 transition-colors">
            Explore experiences <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
