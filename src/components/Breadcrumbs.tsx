import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

type Crumb = { label: string; path?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-silver/70">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link to="/" className="hover:text-cyan transition-colors">Home</Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              <ChevronRight size={14} className="text-silver/40" />
              {item.path && !isLast ? (
                <Link to={item.path} className="hover:text-cyan transition-colors">{item.label}</Link>
              ) : (
                <span className="text-ice" aria-current="page">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
