import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULT_TITLE = 'SpinPix UK | Photo booth & 360 video booth hire';
const DEFAULT_DESC =
  'Family-run photo booth, selfie pod, magic mirror and 360 video booth hire for weddings, parties, proms and corporate events across the UK.';

export function useSEO(title?: string, description?: string) {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = title ? `${title} | SpinPix UK` : DEFAULT_TITLE;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description || DEFAULT_DESC);
    window.scrollTo(0, 0);
  }, [title, description, pathname]);
}
