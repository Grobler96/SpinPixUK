import { Link } from 'react-router-dom';
import { Icon } from './Icon';
import { toneClasses, type Service } from '@/data/services';

export default function BoothCard({ s, i = 0 }: { s: Service; i?: number }) {
  const t = toneClasses[s.tone];
  const tilt = i % 2 === 0 ? '-rotate-1' : 'rotate-1';
  return (
    <Link
      to={`/booths#${s.slug}`}
      className={`group relative flex flex-col bg-card border-2 border-line rounded-3xl shadow-hard overflow-hidden transition-transform hover:-translate-y-1 hover:rotate-0 ${tilt}`}
    >
      <div className="relative border-b-2 border-line aspect-[4/3] overflow-hidden bg-card">
        <img src={s.photos[0].src} alt={s.photos[0].alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-[50%_30%] transition-transform duration-500 group-hover:scale-105" />
        <span className={`absolute left-4 top-4 grid place-items-center w-11 h-11 rounded-2xl border-2 border-line ${t.bg} ${t.text}`}><Icon name={s.icon} size={22} /></span>
        {s.popular && (
          <span className="absolute right-4 top-4 bg-paper text-ink border-2 border-line rounded-full px-3 py-1 text-xs font-display font-extrabold uppercase tracking-wider rotate-6">
            Crowd favourite
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display font-extrabold text-2xl leading-tight">{s.name}</h3>
        <p className="mt-2 text-paper/70 flex-1">{s.tagline}</p>
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
