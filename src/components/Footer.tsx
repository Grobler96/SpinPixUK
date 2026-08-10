import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Star } from 'lucide-react';
import { site, footerNav } from '@/config/site';

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10 bg-midnight/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <span className="relative grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan via-electric to-violet neon-edge">
                <span className="absolute inset-1 rounded-lg disco-ball animate-spin-slow opacity-80" />
                <span className="relative w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
              </span>
              <span className="font-display font-bold text-lg text-ice">
                Spin<span className="text-gradient">Pix</span>
              </span>
            </Link>
            <p className="text-sm text-silver/70 max-w-xs leading-relaxed mb-5">
              {site.description}
            </p>
            <div className="flex items-center gap-1 mb-5">
              {[0,1,2,3,4].map((i) => (
                <Star key={i} size={15} className="fill-magenta text-magenta" />
              ))}
              <span className="ml-2 text-sm text-silver/70">
                {site.rating} · {site.reviewCount} reviews
              </span>
            </div>
            <div className="flex gap-3">
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="grid place-items-center w-10 h-10 rounded-xl glass text-silver hover:text-cyan hover:border-cyan/40 transition-colors">
                <Instagram size={18} />
              </a>
              <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="grid place-items-center w-10 h-10 rounded-xl glass text-silver hover:text-cyan hover:border-cyan/40 transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerNav).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-ice mb-4">{heading}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-sm text-silver/70 hover:text-cyan transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact bar */}
        <div className="mt-12 pt-8 border-t border-white/10 grid gap-4 sm:grid-cols-3">
          <a href={site.phoneHref} className="flex items-center gap-3 text-sm text-silver/70 hover:text-cyan transition-colors">
            <Phone size={16} className="text-cyan" /> {site.phone}
          </a>
          <a href={site.emailHref} className="flex items-center gap-3 text-sm text-silver/70 hover:text-cyan transition-colors">
            <Mail size={16} className="text-cyan" /> {site.email}
          </a>
          <div className="flex items-center gap-3 text-sm text-silver/70">
            <MapPin size={16} className="text-cyan" /> {site.address}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-silver/50">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>{site.serviceArea} · {site.hours}</p>
        </div>
      </div>
    </footer>
  );
}
