import { useEffect, useRef, type ReactNode } from 'react';
import { useMotionValueEvent, useScroll, type MotionValue } from 'framer-motion';

type Props = {
  /** Number of frames in the sequence. */
  count: number;
  /** URL of frame i (0 based). */
  frame: (i: number) => string;
  /** Scroll length of the pinned section, in viewport heights. */
  length?: number;
  /** Accessible description of what the film shows. */
  label: string;
  /** Overlays, given the 0 to 1 scroll progress. */
  children?: (progress: MotionValue<number>) => ReactNode;
  className?: string;
};

/**
 * A pinned, scroll controlled film: frames are drawn on a canvas as the visitor scrolls,
 * forwards and backwards. Frames load in a coarse pass first, then fill in, so it starts fast.
 */
export default function ScrollFilm({ count, frame, length = 3, label, children, className = '' }: Props) {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const backdrop = useRef<HTMLCanvasElement>(null);
  const images = useRef<(HTMLImageElement | undefined)[]>([]);
  const progressRef = useRef(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });

  const draw = () => {
    const cv = canvas.current;
    if (!cv) return;
    const want = Math.round(progressRef.current * (count - 1));
    let img: HTMLImageElement | undefined;
    for (let o = 0; o < count && !img; o++) img = images.current[want - o] ?? images.current[want + o];
    if (!img) return;
    const paint = (c: HTMLCanvasElement) => {
      const g = c.getContext('2d');
      if (!g) return;
      const s = Math.max(c.width / img!.naturalWidth, c.height / img!.naturalHeight);
      const w = img!.naturalWidth * s, h = img!.naturalHeight * s;
      g.drawImage(img!, (c.width - w) / 2, (c.height - h) / 2, w, h);
    };
    paint(cv);
    if (backdrop.current && backdrop.current.offsetParent) paint(backdrop.current);
  };

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    progressRef.current = v;
    draw();
  });

  useEffect(() => {
    let cancelled = false;
    const order: number[] = [];
    const seen = new Set<number>();
    for (const step of [8, 4, 2, 1]) for (let i = 0; i < count; i += step) if (!seen.has(i)) { seen.add(i); order.push(i); }
    if (!seen.has(count - 1)) order.push(count - 1);
    let next = 0;
    const pump = () => {
      if (cancelled || next >= order.length) return;
      const i = order[next++];
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => { if (cancelled) return; images.current[i] = img; draw(); pump(); };
      img.onerror = pump;
      img.src = frame(i);
    };
    for (let k = 0; k < 6; k++) pump();

    const size = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      for (const c of [canvas.current, backdrop.current]) {
        if (!c) continue;
        const r = c.getBoundingClientRect();
        c.width = Math.max(1, Math.round(r.width * (c === backdrop.current ? 0.08 : d)));
        c.height = Math.max(1, Math.round(r.height * (c === backdrop.current ? 0.08 : d)));
      }
      draw();
    };
    size();
    window.addEventListener('resize', size);
    return () => { cancelled = true; window.removeEventListener('resize', size); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <section ref={section} className={`relative ${className}`} style={{ height: `${length * 100}vh` }}>
      <div className="sticky top-0 h-screen h-[100svh] overflow-hidden bg-ink">
        <canvas ref={backdrop} aria-hidden="true" className="hidden md:block absolute -inset-[8%] w-[116%] h-[116%] blur-3xl opacity-80 saturate-150" />
        <canvas
          ref={canvas}
          role="img"
          aria-label={label}
          className="absolute inset-0 w-full h-full md:left-1/2 md:-translate-x-1/2 md:w-auto md:aspect-[9/16] md:shadow-[0_0_120px_30px_rgba(139,61,255,0.35)]"
        />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-[radial-gradient(120%_80%_at_50%_40%,transparent_45%,rgba(7,5,12,0.75))]" />
        {children?.(scrollYProgress)}
      </div>
    </section>
  );
}
