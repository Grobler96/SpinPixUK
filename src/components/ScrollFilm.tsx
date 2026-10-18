import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useMotionValueEvent, useScroll, type MotionValue } from 'framer-motion';
import type { Clip } from '@/data/film';

type Props = {
  clips: Clip[];
  frameUrl: (clip: Clip, i: number, mobile: boolean) => string;
  /** Scroll length of the pinned section, in viewport heights. */
  length?: number;
  /** Accessible description of the film. */
  label: string;
  /** Overlays, given the 0 to 1 scroll progress. */
  children?: (progress: MotionValue<number>) => ReactNode;
};

const FADE = 0.12; // share of each clip spent blending into the next

/**
 * A pinned, scroll controlled film made of one or more clips. Frames are drawn on a canvas as
 * the visitor scrolls, forwards and backwards, and each clip blends into the next.
 * Cinematic touches: film grain and a vignette.
 * Phones get portrait frames; desktops get landscape frames when a clip has them,
 * otherwise the portrait film sits centred over a blurred copy of itself.
 */
export default function ScrollFilm({ clips, frameUrl, length = 3, label, children }: Props) {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const backdrop = useRef<HTMLCanvasElement>(null);
  const images = useRef<(HTMLImageElement | undefined)[][]>([]);
  const progressRef = useRef(0);
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const wide = !mobile && clips.every((c) => c.desktop);
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });

  const nearest = (c: number, i: number) => {
    const set = images.current[c] ?? [];
    for (let o = 0; o < clips[c].frames; o++) {
      const img = set[i - o] ?? set[i + o];
      if (img) return img;
    }
    return undefined;
  };

  const draw = () => {
    const cv = canvas.current;
    if (!cv || clips.length === 0) return;
    const f = Math.min(progressRef.current, 0.99999) * clips.length;
    const c = Math.floor(f), t = f - c;
    const a = nearest(c, Math.round(t * (clips[c].frames - 1)));
    if (!a) return;
    const paint = (el: HTMLCanvasElement, img: HTMLImageElement, alpha: number) => {
      const g = el.getContext('2d');
      if (!g) return;
      const s = Math.max(el.width / img.naturalWidth, el.height / img.naturalHeight);
      const w = img.naturalWidth * s, h = img.naturalHeight * s;
      g.globalAlpha = alpha;
      g.drawImage(img, (el.width - w) / 2, (el.height - h) / 2, w, h);
      g.globalAlpha = 1;
    };
    const both = (img: HTMLImageElement, alpha: number) => {
      paint(cv, img, alpha);
      if (backdrop.current?.offsetParent) paint(backdrop.current, img, alpha);
    };
    both(a, 1);
    if (c < clips.length - 1 && t > 1 - FADE) {
      const b = nearest(c + 1, 0);
      if (b) both(b, (t - (1 - FADE)) / FADE);
    }
  };

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    progressRef.current = v;
    draw();
  });

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    let cancelled = false;
    images.current = clips.map(() => []);
    // coarse pass across every clip first, then fill the gaps
    const order: [number, number][] = [];
    const seen = new Set<string>();
    for (const step of [12, 6, 3, 1]) {
      clips.forEach((clip, c) => {
        for (let i = 0; i < clip.frames; i += step) {
          const k = `${c}:${i}`;
          if (!seen.has(k)) { seen.add(k); order.push([c, i]); }
        }
      });
    }
    let next = 0;
    const pump = () => {
      if (cancelled || next >= order.length) return;
      const [c, i] = order[next++];
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => { if (cancelled) return; images.current[c][i] = img; draw(); pump(); };
      img.onerror = pump;
      img.src = frameUrl(clips[c], i, mobile);
    };
    for (let k = 0; k < 6; k++) pump();

    const size = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      for (const el of [canvas.current, backdrop.current]) {
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const scale = el === backdrop.current ? 0.08 : d;
        el.width = Math.max(1, Math.round(r.width * scale));
        el.height = Math.max(1, Math.round(r.height * scale));
      }
      draw();
    };
    size();
    window.addEventListener('resize', size);
    return () => { cancelled = true; window.removeEventListener('resize', size); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clips, mobile]);

  return (
    <section ref={section} className="relative" style={{ height: `${length * 100}vh` }}>
      <div className="sticky top-0 h-screen h-[100svh] overflow-hidden bg-ink">
        {!wide && <canvas ref={backdrop} aria-hidden="true" className="hidden md:block absolute -inset-[8%] w-[116%] h-[116%] blur-3xl opacity-80 saturate-150" />}
        <canvas
          ref={canvas}
          role="img"
          aria-label={label}
          className={`absolute inset-0 w-full h-full ${wide ? '' : 'md:left-1/2 md:-translate-x-1/2 md:w-auto md:aspect-[9/16] md:shadow-[0_0_120px_30px_rgba(139,61,255,0.35)]'}`}
        />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-[radial-gradient(120%_85%_at_50%_45%,transparent_45%,rgba(7,5,12,0.8))]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[60%] pointer-events-none bg-gradient-to-t from-ink/85 via-ink/35 to-transparent" />
        <div aria-hidden="true" className="film-grain absolute inset-0 pointer-events-none" />
        {children?.(scrollYProgress)}
      </div>
    </section>
  );
}
