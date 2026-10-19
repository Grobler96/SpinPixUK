import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import NeonText from '../NeonText';
import { Icon } from '../Icon';
import { panelMedia, tunnelPanels } from '@/data/tunnel';
import { asset } from '@/lib/asset';
import { useTilt } from './useTilt';

const COLORS = ['#FF2E93', '#2F7BFF', '#8B3DFF', '#4DE1FF'];

function canUse3D() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch { return false; }
}

/** Plain grid of the same experiences: used without WebGL or with reduced motion. */
function Grid() {
  return (
    <section className="px-4 sm:px-6 py-20 sm:py-28 bg-navy border-y-2 border-line">
      <div className="mx-auto max-w-7xl">
        <p className="font-display font-bold uppercase tracking-[0.2em] text-sm text-sun">SpinPix UK · Photo booth &amp; 360 video hire</p>
        <h1 className="mt-3 font-display font-extrabold text-4xl sm:text-6xl leading-[0.95]">Capture the moment. Spin the fun.</h1>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tunnelPanels.map((p) => (
            <Link key={p.id} to={p.to} className="group rounded-3xl overflow-hidden border-2 border-line bg-card hover:border-pop transition-colors">
              <img src={asset(p.image)} alt="" loading="lazy" className="w-full aspect-[3/4] object-cover" />
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-sun font-bold">{p.eyebrow}</p>
                <h3 className="mt-1 font-display font-extrabold text-xl">{p.title}</h3>
                <p className="mt-1 text-sm text-white/70">{p.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * "Explore the experiences": scroll flies you down a neon corridor past floating panels,
 * one per booth or event type. Tap a panel (or the menu) to open it.
 */
export default function PartyTunnel() {
  const [ok] = useState(canUse3D);
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const api = useRef<Awaited<ReturnType<typeof import('./scene').createTunnel>> | null>(null);
  const [active, setActive] = useState(-1);
  const [intro, setIntro] = useState(true);
  const [outro, setOutro] = useState(false);
  const navigate = useNavigate();
  const tilt = useTilt((x, y) => api.current?.setTilt(x, y));
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    api.current?.setProgress(v);
    setIntro(v < 0.09);
    setOutro(v > 0.93);
  });

  useEffect(() => {
    if (!ok || !canvas.current || !section.current) return;
    let disposed = false;
    let io: IntersectionObserver | undefined;
    const el = canvas.current;
    const mobile = window.innerWidth < 768;
    const onResize = () => api.current?.resize(el.clientWidth, el.clientHeight);
    import('./scene').then(({ createTunnel }) => {
      if (disposed) return;
      const t = createTunnel(el, tunnelPanels.map((p) => ({ ...panelMedia(p), imagePos: p.imagePos })), {
        mobile, logo: asset('wordmark.png'), onFocus: setActive,
      });
      api.current = t;
      t.resize(el.clientWidth, el.clientHeight);
      t.setProgress(scrollYProgress.get());
      io = new IntersectionObserver(([e]) => (e.isIntersecting ? t.start() : t.stop()), { rootMargin: '200px' });
      io.observe(section.current!);
      window.addEventListener('resize', onResize);
    });
    return () => {
      disposed = true;
      io?.disconnect();
      window.removeEventListener('resize', onResize);
      api.current?.dispose();
      api.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ok]);

  if (!ok) return <Grid />;

  const toNdc = (e: React.PointerEvent | React.MouseEvent) => {
    const r = canvas.current!.getBoundingClientRect();
    return [((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1] as const;
  };
  const jump = (i: number) => {
    const s = section.current, t = api.current;
    if (!s || !t) return;
    const top = s.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + t.progressFor(i) * (s.offsetHeight - window.innerHeight), behavior: 'smooth' });
  };
  const panel = active >= 0 ? tunnelPanels[active] : null;

  return (
    <section ref={section} className="relative" style={{ height: `${tunnelPanels.length * 85 + 120}vh` }} aria-label="SpinPix UK: explore the experiences">
      <div className="sticky top-0 h-screen h-[100svh] overflow-hidden bg-ink">
        <canvas
          ref={canvas}
          className="absolute inset-0 w-full h-full cursor-pointer"
          aria-hidden="true"
          onPointerMove={(e) => { const [x, y] = toNdc(e); api.current?.setPointer(x, y); }}
          onClick={(e) => { const [x, y] = toNdc(e); const i = api.current?.pick(x, y) ?? -1; if (i >= 0) navigate(tunnelPanels[i].to); }}
        />
        <div aria-hidden="true" className="film-grain absolute inset-0 pointer-events-none" />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-[radial-gradient(110%_80%_at_50%_45%,transparent_50%,rgba(7,5,12,0.85))]" />

        {/* intro: the opening of the homepage */}
        <AnimatePresence>
          {intro && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}
              className="absolute inset-x-0 bottom-40 md:bottom-14 text-center px-4 sm:px-5">
              <p className="hidden sm:block font-display font-bold uppercase tracking-[0.3em] text-xs text-white/80">SpinPix UK · Photo booth &amp; 360 video hire</p>
              <h1 className="mt-3 font-display font-extrabold text-[clamp(2rem,9vw,4.5rem)] leading-[0.95]">
                <NeonText text="Capture the moment." color="#2F7BFF" /><br /><NeonText text="Spin the fun." color="#FF2E93" />
              </h1>
              <p className="hidden sm:block mt-4 mx-auto max-w-xl text-white/80 [text-shadow:0_2px_14px_rgba(0,0,0,0.9)]">Magic mirrors, selfie pods, classic booths and slow motion 360 video for weddings, parties, proms and work events across the UK.</p>
              <div className="mt-5 sm:mt-6 flex justify-center gap-2 sm:gap-3 [&>*]:px-4 [&>*]:text-sm [&>*]:whitespace-nowrap [&_svg]:hidden sm:[&_svg]:block sm:[&>*]:px-6 sm:[&>*]:text-base">
                <Link to="/contact" className="btn btn-pop">Check my date <Icon name="CalendarDays" size={18} /></Link>
                <a href="#try-the-booth" className="btn btn-ghost">Try the booth <Icon name="Camera" size={18} /></a>
              </div>
              <p className="mt-4 sm:mt-5 font-display font-bold uppercase tracking-[0.3em] text-[11px] text-white/60">Scroll to step inside{tilt.state === 'on' && <span className="block mt-1.5 text-white/45">Tilt your phone to look around</span>}</p>
              {tilt.state === 'ask' && (
                <button type="button" onClick={tilt.enable} className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-display font-bold text-white backdrop-blur">
                  <Icon name="Smartphone" size={14} /> Tilt to look around
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* the end of the flight */}
        <AnimatePresence>
          {outro && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="absolute inset-x-0 top-1/3 text-center px-5">
              <p className="font-display font-extrabold text-[clamp(2rem,8vw,4rem)] leading-[0.95]"><NeonText text="Your party, your moment." color="#8B3DFF" /></p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/contact" className="btn btn-pop">Check my date <Icon name="CalendarDays" size={18} /></Link>
                <Link to="/booths" className="btn btn-ghost">Meet the booths</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* menu: real links, also the accessible way through */}
        <nav aria-label="Experiences" className="hidden md:block absolute left-6 lg:left-10 bottom-10">
          <p className="font-display font-bold uppercase tracking-[0.25em] text-[11px] text-white/60">What are you looking for?</p>
          <ul className="mt-3 space-y-1.5">
            {tunnelPanels.map((p, i) => (
              <li key={p.id}>
                <button type="button" onClick={() => jump(i)} className={`group flex items-center gap-2 font-display font-bold text-sm transition-colors ${i === active ? 'text-white' : 'text-white/45 hover:text-white/80'}`}>
                  <span aria-hidden="true" className="h-px transition-all" style={{ width: i === active ? 28 : 12, background: i === active ? COLORS[i % COLORS.length] : 'currentColor' }} />
                  {p.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* caption for the panel in focus */}
        <AnimatePresence mode="wait">
          {panel && (
            <motion.div key={panel.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}
              className="absolute inset-x-0 bottom-24 md:bottom-10 md:left-auto md:right-8 lg:right-12 md:max-w-sm px-5 md:px-0 text-center md:text-right">
              <p className="font-display font-bold uppercase tracking-[0.3em] text-[11px] text-white/75">{String(active + 1).padStart(2, '0')} · {panel.eyebrow}</p>
              <p className="mt-2 font-display font-extrabold text-4xl sm:text-5xl leading-none"><NeonText text={panel.title} color={COLORS[active % COLORS.length]} /></p>
              <p className="mt-3 text-white/80 [text-shadow:0_2px_14px_rgba(0,0,0,0.9)]">{panel.text}</p>
              <Link to={panel.to} className="mt-4 inline-flex items-center gap-2 font-display font-bold text-sm text-white border-b border-white/40 pb-0.5 hover:border-white">
                Explore {panel.title} <Icon name="ArrowRight" size={16} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
