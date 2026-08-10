import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULT_TITLE = 'SpinPix UK — Capture the moment. Spin the fun.';
const DEFAULT_DESC =
  'Premium interactive photo booth and 360° video booth experiences for weddings, parties, corporate events and proms across the UK.';

export function useSEO(title?: string, description?: string) {
  const location = useLocation();
  useEffect(() => {
    if (title) document.title = `${title} · SpinPix UK`;
    else document.title = DEFAULT_TITLE;

    const desc = description || DEFAULT_DESC;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);

    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [title, description, location.pathname]);
}
