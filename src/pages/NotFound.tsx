import { Link } from 'react-router-dom';
import { useSEO } from '@/lib/useSEO';

export default function NotFound() {
  useSEO('Page not found');
  return (
    <section className="px-4 py-28 text-center">
      <p className="text-8xl" aria-hidden="true">🫥</p>
      <h1 className="mt-4 font-display font-extrabold text-5xl">Blink and you missed it</h1>
      <p className="mt-3 text-lg text-ink/70">That page isn’t here. Let’s get you back to the fun.</p>
      <Link to="/" className="btn btn-pop mt-8">Back home</Link>
    </section>
  );
}
