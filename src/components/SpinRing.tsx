import { useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import NeonText from './NeonText';
import { gallery } from '@/data/gallery';

const PICKS = gallery.slice(0, 12);

/**
 * "Scroll to spin": real event photos on a turning 3D ring, like the camera arm of the 360 booth.
 * Scroll turns it, and you can drag it round too.
 */
export default function SpinRing() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const drag = useMotionValue(0);
  const fromScroll = useTransform(scrollYProgress, [0, 1], [-60, 300]);
  const angle = useTransform(() => fromScroll.get() + drag.get());
  const smooth = useSpring(angle, { stiffness: 60, damping: 20, mass: 0.6 });
  const rotate = useTransform(smooth, (a) => `rotateX(-8deg) rotateY(${-a}deg)`);
  const [lit, setLit] = useState(false);
  const start = useRef<{ x: number; a: number } | null>(null);

  const down = (e: RPointerEvent) => { start.current = { x: e.clientX, a: drag.get() }; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); };
  const move = (e: RPointerEvent) => { if (start.current) drag.set(start.current.a - (e.clientX - start.current.x) * 0.35); };
  const up = () => { start.current = null; };

  const n = PICKS.length;
  return (
    <section ref={ref} className="relative overflow-hidden px-4 sm:px-6 py-20 sm:py-28 bg-navy border-y-2 border-line">
      <div className="absolute inset-0 grid-lines opacity-60" aria-hidden="true" />
      <motion.div className="relative mx-auto max-w-7xl text-center" onViewportEnter={() => setLit(true)} viewport={{ once: true, margin: '-30%' }}>
        <p className="font-display font-bold uppercase tracking-[0.2em] text-sm text-sun">The 360 booth</p>
        <h2 className="mt-3 font-display font-extrabold text-4xl sm:text-6xl leading-[0.95]">
          <NeonText text="Every angle." color="#2F7BFF" lit={lit} /><br />
          <NeonText text="Every guest." color="#FF2E93" lit={lit} />
        </h2>
        <p className="mt-5 text-lg text-white/75 max-w-2xl mx-auto">The camera arm sweeps right round your guests for slow motion video they can share before they’ve stepped off. Scroll or drag to spin through real SpinPix parties.</p>
      </motion.div>

      <div
        className="relative mx-auto mt-10 h-[340px] sm:h-[460px] cursor-grab active:cursor-grabbing touch-pan-y select-none"
        style={{ perspective: '1400px', '--ring-r': 'clamp(300px, 34vw, 470px)' } as CSSProperties}
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
        aria-label="A ring of real SpinPix party photos. Drag left or right to spin it."
        role="region"
      >
        <motion.div className="absolute left-1/2 top-1/2 w-0 h-0" style={{ transformStyle: 'preserve-3d', transform: rotate }}>
          {PICKS.map((p, i) => (
            <figure key={p.src} className="absolute -left-[75px] -top-[100px] sm:-left-[100px] sm:-top-[135px] w-[150px] h-[200px] sm:w-[200px] sm:h-[270px] rounded-2xl overflow-hidden border-2 border-white/80 shadow-[0_0_30px_rgba(139,61,255,0.5)] [backface-visibility:hidden]"
              style={{ transform: `rotateY(${(i * 360) / n}deg) translateZ(var(--ring-r))` }}>
              <img src={p.src} alt={p.alt} loading="lazy" draggable={false} className="w-full h-full object-cover" />
            </figure>
          ))}
        </motion.div>
        {/* the platform */}
        <div aria-hidden="true" className="absolute left-1/2 bottom-2 -translate-x-1/2 w-[70%] max-w-[560px] h-10 sm:h-14 rounded-[50%] bg-black border-b-4 border-mint shadow-[0_8px_40px_rgba(77,225,255,0.7),0_0_80px_rgba(47,123,255,0.5)]" />
      </div>
      <p className="relative mt-6 text-center text-sm text-white/60 flex items-center justify-center gap-2">Drag to spin</p>
    </section>
  );
}
