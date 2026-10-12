import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import seo from '@/data/seo.json';

type Meta = { title: string; description: string; noindex?: boolean };
const table = seo as Record<string, Meta>;

function setMeta(selector: string, attr: string, value: string, create: () => HTMLElement) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

/** Sets the page title and description for the current route from src/data/seo.json (also used at build time). */
export function useSEO(notFound = false) {
  const { pathname } = useLocation();
  useEffect(() => {
    const key = notFound ? '404' : pathname.replace(/\/+$/, '') || '/';
    const meta = table[key] ?? table['404'];
    document.title = meta.title;
    const mk = (tag: string, attrs: Record<string, string>) => () => {
      const e = document.createElement(tag);
      Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
      return e;
    };
    setMeta('meta[name="description"]', 'content', meta.description, mk('meta', { name: 'description' }));
    setMeta('meta[property="og:title"]', 'content', meta.title, mk('meta', { property: 'og:title' }));
    setMeta('meta[property="og:description"]', 'content', meta.description, mk('meta', { property: 'og:description' }));
    setMeta('meta[name="robots"]', 'content', meta.noindex ? 'noindex' : 'index,follow', mk('meta', { name: 'robots' }));
    window.scrollTo(0, 0);
  }, [pathname, notFound]);
}
