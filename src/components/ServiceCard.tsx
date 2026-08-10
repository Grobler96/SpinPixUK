import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import type { Service } from '@/data/services';
import { Icon } from './Icon';

const accentMap = {
  blue: { glow: 'glow-blue', text: 'text-cyan', border: 'hover:border-cyan/40', from: 'from-electric', to: 'to-cyan' },
  violet: { glow: 'glow-violet', text: 'text-violet', border: 'hover:border-violet/40', from: 'from-violet', to: 'to-electric' },
  magenta: { glow: 'glow-magenta', text: 'text-magenta', border: 'hover:border-magenta/40', from: 'from-magenta', to: 'to-violet' },
};

export default function ServiceCard({ service, compact = false }: { service: Service; compact?: boolean }) {
  const a = accentMap[service.accent];
  return (
    <article className={`group relative rounded-2xl glass ${a.border} transition-all duration-300 overflow-hidden flex flex-col`}>
      {service.popular && (
        <span className="absolute top-4 right-4 z-10 text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-magenta to-violet text-white">
          Popular
        </span>
      )}
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className={`absolute bottom-3 left-4 grid place-items-center w-10 h-10 rounded-xl glass-strong ${a.text}`}>
          <Icon name={service.icon} size={20} />
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-xl text-ice mb-1">{service.name}</h3>
        <p className={`text-sm ${a.text} mb-3`}>{service.tagline}</p>

        {!compact && (
          <p className="text-sm text-silver/70 leading-relaxed mb-4">{service.description}</p>
        )}

        <ul className="space-y-2 mb-5 flex-1">
          {service.features.slice(0, compact ? 3 : 4).map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-silver/80">
              <Check size={15} className={`mt-0.5 shrink-0 ${a.text}`} /> {f}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <span className="text-xs text-silver/50">From</span>
            <p className="font-display font-bold text-2xl text-ice">£{service.priceFrom}</p>
          </div>
          <Link
            to="/contact"
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r ${a.from} ${a.to} text-white text-sm font-semibold hover:shadow-lg transition-shadow`}
          >
            Book <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
