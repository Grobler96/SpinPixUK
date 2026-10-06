import { Link } from 'react-router-dom';
import { Icon } from './Icon';
import Logo from './Logo';
import { nav, site } from '@/config/site';

export default function Footer() {
  return (
    <footer className="bg-ink text-paper mt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo light />
          <p className="mt-5 text-paper/70 max-w-xs">{site.tagline} Family-run photo booth hire for weddings, parties, proms and corporate events.</p>
          <div className="mt-6 flex gap-3">
            {[
              { href: site.instagram, icon: 'Instagram', label: 'Instagram' },
              { href: site.facebook, icon: 'Facebook', label: 'Facebook' },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                className="grid place-items-center w-11 h-11 rounded-full border-2 border-paper/30 hover:bg-sun hover:text-ink hover:border-sun transition-colors">
                <Icon name={s.icon} size={20} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display font-bold text-sun mb-4">Explore</h3>
          <ul className="space-y-2.5">
            {nav.map((n) => (
              <li key={n.path}><Link to={n.path} className="text-paper/75 hover:text-white">{n.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display font-bold text-sun mb-4">Legal</h3>
          <ul className="space-y-2.5">
            <li><Link to="/privacy" className="text-paper/75 hover:text-white">Privacy</Link></li>
            <li><Link to="/terms" className="text-paper/75 hover:text-white">Terms</Link></li>
            <li><Link to="/accessibility" className="text-paper/75 hover:text-white">Accessibility</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display font-bold text-sun mb-4">Say hello</h3>
          <ul className="space-y-3 text-paper/80">
            <li><a href={site.phoneHref} className="inline-flex items-center gap-2 hover:text-white"><Icon name="Phone" size={16} />{site.phone}</a></li>
            <li><a href={site.emailHref} className="inline-flex items-center gap-2 hover:text-white break-all"><Icon name="Mail" size={16} />{site.email}</a></li>
            <li className="inline-flex items-start gap-2"><Icon name="MapPin" size={16} className="mt-1 shrink-0" />Based in {site.base}. {site.coverage}.</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/15 py-6 text-center text-sm text-paper/55">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
