import { Link } from 'react-router-dom';
import { Icon } from './Icon';
import { toneClasses, type Service } from '@/data/services';

export default function BoothCard({ s, i = 0 }: { s: Service; i?: number }) {
  const t = toneClasses[s.tone];
  const tilt = i % 2 === 0 ? '-rotate-1' : 'rotate-1';
  return (
    <Link
      to={`/booths#${s.slug}`}
      className={`group relative flex flex-col bg-white border-2 border-ink rounded-3xl shadow-hard overflow-hidden transition-transform hover:-translate-y-1 hover:rotate-0 ${tilt}`}
    >
      <div className={`${t.bg} ${t.text} border-b-2 border-ink px-6 py-8 flex items-center justify-between`}>
        <Icon name={s.icon} size={44} />
        {s.popular && (
          <span className="bg-paper text-ink border-2 border-ink rounded-full px-3 py-1 text-xs font-display font-extrabold uppercase tracking-wider rotate-6">
            Crowd favourite
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display font-extrabold text-2xl leading-tight">{s.name}</h3>
        <p className="mt-2 text-ink/70 flex-1">{s.tagline}</p>
        <div className="mt-5 flex items-center justify-between text-sm font-bold">
          <span className={`${t.soft} rounded-full px-3 py-1`}>{s.capacity}</span>
          <span className="inline-flex items-center gap-1 group-hover:gap-2 transition-all">
            Details <Icon name="ArrowRight" size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
