import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { site, primaryNav } from '@/config/site';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-strong py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group" aria-label={`${site.name} home`}>
          <span className="relative grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan via-electric to-violet neon-edge">
            <span className="absolute inset-1 rounded-lg disco-ball animate-spin-slow opacity-80" />
            <span className="relative w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
          </span>
          <span className="font-display font-bold text-lg tracking-tight text-ice">
            Spin<span className="text-gradient">Pix</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {primaryNav.map((item) => {
            const active = pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active ? 'text-cyan' : 'text-silver hover:text-ice'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href={site.phoneHref} className="flex items-center gap-2 text-sm text-silver hover:text-ice transition-colors">
            <Phone size={16} /> {site.phone}
          </a>
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-electric to-violet text-white text-sm font-semibold hover:shadow-[0_0_24px_rgba(22,139,255,0.5)] transition-shadow"
          >
            Get a quote
          </Link>
        </div>

        <button
          className="lg:hidden grid place-items-center w-10 h-10 rounded-lg glass text-ice"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 top-[64px] glass-strong transition-all duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-1 p-6">
          {primaryNav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="px-4 py-3 rounded-xl text-base font-medium text-ice hover:bg-white/5 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-3">
            <a href={site.phoneHref} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass text-ice">
              <Phone size={18} /> {site.phone}
            </a>
            <Link
              to="/contact"
              className="px-4 py-3.5 rounded-xl bg-gradient-to-r from-electric to-violet text-white text-center font-semibold"
            >
              Get a quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
