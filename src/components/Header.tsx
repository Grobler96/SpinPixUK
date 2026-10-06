import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Icon } from './Icon';
import Logo from './Logo';
import { nav, site } from '@/config/site';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b-2 border-ink">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4">
        <Link to="/" aria-label="SpinPix UK home"><Logo /></Link>

        <nav className="hidden xl:flex items-center gap-1" aria-label="Main">
          {nav.map((n) => (
            <NavLink
              key={n.path}
              to={n.path}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-full font-display font-bold text-[15px] transition-colors ${isActive ? 'bg-ink text-paper' : 'hover:bg-sun'}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={site.phoneHref} className="hidden md:inline-flex items-center gap-2 font-display font-bold text-sm">
            <Icon name="Phone" size={16} /> {site.phone}
          </a>
          <Link to="/contact" className="btn btn-pop !py-2.5 !px-5 text-sm hidden sm:inline-flex">Get a quote</Link>
          <button
            className="xl:hidden grid place-items-center w-11 h-11 rounded-full border-2 border-ink bg-white"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <Icon name={open ? 'X' : 'Menu'} size={22} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="xl:hidden border-t-2 border-ink bg-paper px-4 py-4 grid gap-1" aria-label="Mobile">
          {nav.map((n) => (
            <NavLink
              key={n.path}
              to={n.path}
              className={({ isActive }) =>
                `px-4 py-3 rounded-2xl font-display font-bold text-xl ${isActive ? 'bg-ink text-paper' : 'hover:bg-sun'}`
              }
            >
              {n.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn btn-pop mt-2">Get a quote</Link>
        </nav>
      )}
    </header>
  );
}
