import { useEffect, useRef } from 'react';

const COLOURS = ['255,46,147', '47,123,255', '139,61,255', '77,225,255', '255,255,255'];

/**
 * Ambient disco ball reflections drifting across the whole page, like a mirror ball turning overhead.
 * Brighter at the top of the page, fainter as you scroll. Off for reduced motion.
 */
export default function DiscoLights() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cv = ref.current;
    const g = cv?.getContext('2d');
    if (!cv || !g) return;
    let w = 0, h = 0, raf = 0, t0 = performance.now();
    type Dot = { x: number; y: number; r: number; c: string; sp: number; ph: number; a: number };
    let dots: Dot[] = [];
    const size = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      cv.width = w * d; cv.height = h * d;
      g.setTransform(d, 0, 0, d, 0, 0);
      const n = Math.round(Math.min(90, (w * h) / 16000));
      dots = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h, r: 1.5 + Math.random() * 3.5,
        c: COLOURS[Math.floor(Math.random() * COLOURS.length)], sp: 12 + Math.random() * 30,
        ph: Math.random() * Math.PI * 2, a: 0.35 + Math.random() * 0.65,
      }));
    };
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - t0) / 1000); t0 = now;
      const fade = Math.max(0.28, 1 - window.scrollY / (window.innerHeight * 3));
      g.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x += d.sp * dt; d.ph += dt * 1.6;
        if (d.x > w + 10) { d.x = -10; d.y = Math.random() * h; }
        const tw = 0.55 + 0.45 * Math.sin(d.ph);
        const a = d.a * tw * fade;
        const grd = g.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 3);
        grd.addColorStop(0, `rgba(${d.c},${a})`);
        grd.addColorStop(1, `rgba(${d.c},0)`);
        g.fillStyle = grd;
        g.beginPath(); g.arc(d.x, d.y, d.r * 3, 0, Math.PI * 2); g.fill();
      }
      raf = requestAnimationFrame(frame);
    };
    const vis = () => { cancelAnimationFrame(raf); if (!document.hidden) { t0 = performance.now(); raf = requestAnimationFrame(frame); } };
    size(); raf = requestAnimationFrame(frame);
    window.addEventListener('resize', size);
    document.addEventListener('visibilitychange', vis);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', size); document.removeEventListener('visibilitychange', vis); };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="fixed inset-0 w-full h-full pointer-events-none z-40 mix-blend-screen" />;
}
