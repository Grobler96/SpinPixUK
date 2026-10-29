import { useEffect, useRef, useState, type PointerEvent as RPointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from './Icon';
import { asset } from '@/lib/asset';

/* ---------- strip designs ---------- */
type Theme = {
  id: 'wedding' | 'birthday' | 'prom' | 'corporate';
  label: string;
  emoji: string;
  event: string; // contact form event value
  bg: string; ink: string; accent: string;
  line1: string; // default headline
};
const THEMES: Theme[] = [
  { id: 'wedding', label: 'Wedding', emoji: '💍', event: 'weddings', bg: '#FBF6EE', ink: '#2B2118', accent: '#C9A15A', line1: 'Sophie & James' },
  { id: 'birthday', label: 'Birthday', emoji: '🎂', event: 'parties', bg: '#FF2E93', ink: '#FFFFFF', accent: '#FFE14D', line1: "Ellie's 18th" },
  { id: 'prom', label: 'Prom', emoji: '🎓', event: 'proms', bg: '#0B0F3B', ink: '#FFFFFF', accent: '#4DE1FF', line1: 'Class of 2026' },
  { id: 'corporate', label: 'Corporate', emoji: '💼', event: 'corporate', bg: '#FFFFFF', ink: '#07050C', accent: '#2F7BFF', line1: 'Your brand here' },
];
const FILTERS = [
  { id: 'studio', label: 'Studio', css: 'contrast(1.08) saturate(1.12) brightness(1.04)' },
  { id: 'mono', label: 'Black & white', css: 'grayscale(1) contrast(1.2) brightness(1.05)' },
  { id: 'neon', label: 'Neon', css: 'contrast(1.15) saturate(1.5) hue-rotate(-12deg)' },
] as const;
const PROPS = ['🕶️', '👑', '🎩', '💋', '🥳', '🎸', '🦄', '💖', '⭐', '🎉'];
const SAMPLES = ['photos/magic-mirror-party.jpg', 'photos/magic-mirror-guests.jpg', 'photos/mirror-80th.jpg', 'photos/selfie-totem-couple.jpg'];
const SHOTS = 4;
// strip geometry (2 x 6 inch print at 300dpi)
const SW = 600, SH = 1800, CW = 540, CH = 360, PAD = 30, GAP = 20;

type Placed = { id: number; e: string; x: number; y: number; s: number }; // x,y,s as fractions of the frame width/height
type Stage = 'setup' | 'live' | 'shooting' | 'developing' | 'done';

const fmtDate = (iso: string) => {
  if (!iso) return '';
  const d = new Date(`${iso}T12:00:00`);
  return isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

function shutter() {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ac = new AC();
    const len = Math.floor(ac.sampleRate * 0.08);
    const buf = ac.createBuffer(1, len, ac.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    const src = ac.createBufferSource();
    const gain = ac.createGain();
    gain.gain.value = 0.35;
    src.buffer = buf; src.connect(gain).connect(ac.destination); src.start();
    src.onended = () => ac.close();
  } catch { /* no audio, no problem */ }
}

const loadImage = (src: string) => new Promise<HTMLImageElement>((res, rej) => {
  const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src;
});

export default function PhotoBooth() {
  const [theme, setTheme] = useState<Theme>(THEMES[0]);
  const [line1, setLine1] = useState(THEMES[0].line1);
  const [date, setDate] = useState('');
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>(FILTERS[0]);
  const [placed, setPlaced] = useState<Placed[]>([]);
  const [stage, setStage] = useState<Stage>('setup');
  const [count, setCount] = useState<number | null>(null);
  const [shot, setShot] = useState(0);
  const [flash, setFlash] = useState(0);
  const [sound, setSound] = useState(true);
  const [camError, setCamError] = useState('');
  const [sample, setSample] = useState<string | null>(null);
  const [strip, setStrip] = useState<string | null>(null);

  const video = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream | null>(null);
  const frameBox = useRef<HTMLDivElement>(null);
  const shots = useRef<HTMLCanvasElement[]>([]);
  const cancel = useRef(false);
  const stripBlob = useRef<Blob | null>(null);
  const drag = useRef<{ id: number; dx: number; dy: number } | null>(null);

  const stopCamera = () => { stream.current?.getTracks().forEach((t) => t.stop()); stream.current = null; };
  useEffect(() => () => { cancel.current = true; stopCamera(); if (strip) URL.revokeObjectURL(strip); }, [strip]);

  const pickTheme = (t: Theme) => {
    setTheme(t);
    if (THEMES.some((x) => x.line1 === line1) || !line1.trim()) setLine1(t.line1);
  };

  const startCamera = async () => {
    setCamError('');
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 960 } }, audio: false });
      stream.current = s;
      setSample(null);
      setStage('live');
      requestAnimationFrame(() => {
        if (video.current) { video.current.srcObject = s; video.current.play().catch(() => {}); }
        frameBox.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    } catch {
      setCamError('We couldn’t open your camera, so here’s one of our real party photos to play with instead.');
      pickSample();
    }
  };
  const pickSample = (src?: string) => {
    stopCamera();
    const next = src ?? SAMPLES[(SAMPLES.indexOf(sample ?? '') + 1) % SAMPLES.length];
    setSample(next);
    setStage('live');
    requestAnimationFrame(() => frameBox.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  };
  const onUpload = (f?: File) => {
    if (!f) return;
    stopCamera();
    setSample(URL.createObjectURL(f));
    setStage('live');
  };

  /* draw the current source (camera or photo) into a cell, cover cropped, with props on top */
  const capture = async () => {
    const c = document.createElement('canvas');
    c.width = CW; c.height = CH;
    const g = c.getContext('2d')!;
    g.filter = filter.css;
    let src: CanvasImageSource, sw: number, sh: number, mirror = false;
    if (sample) {
      const img = await loadImage(sample.startsWith('blob:') ? sample : asset(sample));
      src = img; sw = img.naturalWidth; sh = img.naturalHeight;
    } else {
      const v = video.current!;
      src = v; sw = v.videoWidth; sh = v.videoHeight; mirror = true;
    }
    const s = Math.max(CW / sw, CH / sh);
    const dw = sw * s, dh = sh * s;
    g.save();
    if (mirror) { g.translate(CW, 0); g.scale(-1, 1); }
    g.drawImage(src, (CW - dw) / 2, (CH - dh) / 2, dw, dh);
    g.restore();
    g.filter = 'none';
    g.textAlign = 'center'; g.textBaseline = 'middle';
    for (const p of placed) {
      g.font = `${Math.round(p.s * CW)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;
      g.fillText(p.e, p.x * CW, p.y * CH);
    }
    return c;
  };

  const run = async () => {
    cancel.current = false;
    shots.current = [];
    setStage('shooting');
    for (let i = 0; i < SHOTS; i++) {
      setShot(i + 1);
      for (const n of [3, 2, 1]) {
        if (cancel.current) return;
        setCount(n);
        await new Promise((r) => setTimeout(r, 750));
      }
      setCount(null);
      if (sound) shutter();
      setFlash((f) => f + 1);
      shots.current.push(await capture());
      await new Promise((r) => setTimeout(r, 650));
    }
    setStage('developing');
    await buildStrip();
    stopCamera();
    setTimeout(() => setStage('done'), 2600);
  };

  const buildStrip = async () => {
    await document.fonts?.ready;
    const c = document.createElement('canvas');
    c.width = SW; c.height = SH;
    const g = c.getContext('2d')!;
    g.fillStyle = theme.bg; g.fillRect(0, 0, SW, SH);
    // Transparent SpinPix logo stamped on every photo, so cropping off the footer doesn't remove the branding.
    const mark = await loadImage(asset('watermark.png')).catch(() => null);
    shots.current.forEach((s, i) => {
      const y = PAD + i * (CH + GAP);
      g.drawImage(s, PAD, y);
      if (mark) {
        const mw = 150, mh = (mark.naturalHeight / mark.naturalWidth) * mw;
        g.save();
        g.shadowColor = 'rgba(0,0,0,0.65)'; g.shadowBlur = 10; g.globalAlpha = 0.92;
        g.drawImage(mark, PAD + CW - mw - 14, y + CH - mh - 12, mw, mh);
        g.restore();
      }
      g.strokeStyle = theme.accent; g.lineWidth = 3; g.strokeRect(PAD + 1.5, y + 1.5, CW - 3, CH - 3);
    });
    const top = PAD + SHOTS * (CH + GAP) - GAP; // footer starts here
    const mid = SW / 2;
    g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = theme.ink;
    g.font = '800 46px "Bricolage Grotesque", sans-serif';
    let t = line1.trim() || theme.line1;
    while (g.measureText(t).width > SW - 70 && t.length > 4) t = t.slice(0, -1);
    g.fillText(t, mid, top + 62);
    const d = fmtDate(date);
    g.font = '500 24px "DM Sans", sans-serif';
    g.fillStyle = theme.accent;
    g.fillText(d ? d.toUpperCase() : theme.emoji, mid, top + 112);
    try {
      const wm = await loadImage(asset('wordmark.png'));
      const ww = 220, wh = (wm.naturalHeight / wm.naturalWidth) * ww;
      const bx = mid - ww / 2 - 14, by = SH - wh - 46;
      g.fillStyle = '#000'; g.beginPath(); g.roundRect(bx, by, ww + 28, wh + 16, 16); g.fill();
      g.drawImage(wm, mid - ww / 2, by + 8, ww, wh);
    } catch {
      g.font = '800 26px "Bricolage Grotesque", sans-serif'; g.fillText('SPINPIX UK', mid, SH - 70);
    }
    const blob = await new Promise<Blob | null>((r) => c.toBlob(r, 'image/jpeg', 0.92));
    if (!blob) return;
    stripBlob.current = blob;
    setStrip((old) => { if (old) URL.revokeObjectURL(old); return URL.createObjectURL(blob); });
  };

  const share = async () => {
    const b = stripBlob.current;
    if (!b) return;
    const file = new File([b], 'spinpix-photo-strip.jpg', { type: 'image/jpeg' });
    const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
    if (nav.canShare?.({ files: [file] })) {
      try { await navigator.share({ files: [file], title: 'My SpinPix photo strip', text: 'Made with the SpinPix UK online photo booth' }); } catch { /* closed */ }
    }
  };
  const canShareFiles = typeof navigator !== 'undefined' && 'canShare' in navigator;

  const reset = () => { cancel.current = true; setStage('setup'); setCount(null); setShot(0); stopCamera(); setSample(null); };

  /* props: tap to add, drag to move, double tap to remove */
  const addProp = (e: string) => setPlaced((p) => [...p.slice(-7), { id: Date.now() + Math.random(), e, x: 0.3 + Math.random() * 0.4, y: 0.3 + Math.random() * 0.3, s: 0.16 }]);
  const onDown = (ev: RPointerEvent, p: Placed) => {
    const r = frameBox.current!.getBoundingClientRect();
    drag.current = { id: p.id, dx: (ev.clientX - r.left) / r.width - p.x, dy: (ev.clientY - r.top) / r.height - p.y };
    (ev.target as HTMLElement).setPointerCapture(ev.pointerId);
  };
  const onMove = (ev: RPointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const r = frameBox.current!.getBoundingClientRect();
    const x = Math.min(0.97, Math.max(0.03, (ev.clientX - r.left) / r.width - d.dx));
    const y = Math.min(0.97, Math.max(0.03, (ev.clientY - r.top) / r.height - d.dy));
    setPlaced((ps) => ps.map((p) => (p.id === d.id ? { ...p, x, y } : p)));
  };

  const bookHref = `/contact?event=${theme.event}${date ? `&date=${date}` : ''}`;
  const live = stage === 'live' || stage === 'shooting';

  return (
    <section id="try-the-booth" className="relative px-4 sm:px-6 py-20 sm:py-28 border-y-2 border-line bg-[radial-gradient(70%_60%_at_50%_0%,rgba(139,61,255,0.25),transparent)]">
      <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[1fr_1.1fr] items-start">
        {/* left: design your strip */}
        <div>
          <p className="font-display font-bold uppercase tracking-[0.2em] text-sm text-pop">Try the booth</p>
          <h2 className="mt-3 font-display font-extrabold text-4xl sm:text-6xl leading-[0.95]">Step inside. Strike a pose.</h2>
          <p className="mt-5 text-lg text-paper/75 max-w-xl">
            Our online booth works just like the real thing. Design your overlay, then it counts you down for four snaps and prints your strip.
            Your photos never leave your device.
          </p>

          <div className="mt-8 space-y-6">
            <fieldset>
              <legend className="font-display font-bold text-sm mb-2">1. Pick your event</legend>
              <div className="flex flex-wrap gap-2">
                {THEMES.map((t) => (
                  <button key={t.id} type="button" onClick={() => pickTheme(t)} aria-pressed={theme.id === t.id}
                    className={`inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 font-display font-bold transition-colors ${theme.id === t.id ? 'bg-pop border-pop text-white' : 'border-line bg-card hover:border-pop'}`}>
                    <span aria-hidden="true">{t.emoji}</span>{t.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="pb-line1" className="block font-display font-bold text-sm mb-1.5">2. Names or headline</label>
                <input id="pb-line1" className="field" maxLength={28} value={line1} onChange={(e) => setLine1(e.target.value)} />
              </div>
              <div>
                <label htmlFor="pb-date" className="block font-display font-bold text-sm mb-1.5">Your event date</label>
                <input id="pb-date" type="date" className="field" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
            </div>
            <fieldset>
              <legend className="font-display font-bold text-sm mb-2">3. Choose a look</legend>
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                  <button key={f.id} type="button" onClick={() => setFilter(f)} aria-pressed={filter.id === f.id}
                    className={`rounded-full border-2 px-4 py-2 font-display font-bold text-sm ${filter.id === f.id ? 'bg-paper text-ink border-paper' : 'border-line bg-card hover:border-paper/60'}`}>
                    {f.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="font-display font-bold text-sm mb-2">4. Grab some props <span className="font-body font-normal text-paper/60">(tap to add, drag to place, double tap to remove)</span></legend>
              <div className="flex flex-wrap gap-2">
                {PROPS.map((p) => (
                  <button key={p} type="button" onClick={() => addProp(p)} disabled={stage !== 'live'}
                    className="grid place-items-center w-12 h-12 rounded-2xl border-2 border-line bg-card text-2xl hover:border-sun disabled:opacity-40 transition-colors" aria-label={`Add ${p} prop`}>
                    {p}
                  </button>
                ))}
                {placed.length > 0 && (
                  <button type="button" onClick={() => setPlaced([])} className="inline-flex items-center gap-1.5 rounded-2xl border-2 border-line px-3 text-sm font-bold hover:border-pop"><Icon name="Trash2" size={15} /> Clear</button>
                )}
              </div>
            </fieldset>
          </div>
        </div>

        {/* right: the booth */}
        <div className="relative">
          <div className="relative rounded-[2rem] border-2 border-line bg-card p-3 sm:p-4 shadow-[0_0_0_2px_#FF2E93,0_0_60px_rgba(255,46,147,0.35)]">
            {/* ring light */}
            <div aria-hidden="true" className={`absolute -top-5 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-[6px] transition-all duration-300 ${live ? 'border-white shadow-[0_0_40px_10px_rgba(255,255,255,0.6)]' : 'border-white/30'}`} />

            {stage !== 'developing' && stage !== 'done' && (
              <div ref={frameBox} className={`relative mt-8 ${stage === 'setup' ? 'aspect-[4/5] sm:aspect-[3/2]' : 'aspect-[3/2]'} overflow-hidden rounded-2xl bg-ink touch-none select-none [container-type:inline-size]`} onPointerMove={onMove} onPointerUp={() => (drag.current = null)}>
                {stage === 'setup' && (
                  <div className="absolute inset-0 grid place-items-center text-center p-4 sm:p-6">
                    <div>
                      <p className="font-display font-extrabold text-2xl sm:text-3xl">Ready when you are</p>
                      <p className="mt-2 text-paper/70 text-sm">Allow your camera when asked. Nothing is uploaded or saved anywhere.</p>
                      <div className="mt-5 flex flex-wrap justify-center gap-2">
                        <button type="button" onClick={startCamera} className="btn btn-pop"><Icon name="Camera" size={18} /> Open the booth</button>
                        <button type="button" onClick={() => pickSample(SAMPLES[0])} className="btn btn-ghost"><Icon name="Images" size={18} /> Use a party photo</button>
                      </div>
                    </div>
                  </div>
                )}
                {live && !sample && <video ref={video} playsInline muted className="absolute inset-0 w-full h-full object-cover -scale-x-100" style={{ filter: filter.css }} />}
                {live && sample && <img src={sample.startsWith('blob:') ? sample : asset(sample)} alt="Sample party photo used in the online booth" className="absolute inset-0 w-full h-full object-cover" style={{ filter: filter.css }} />}

                {live && placed.map((p) => (
                  <span key={p.id} role="img" aria-label="Prop"
                    onPointerDown={(e) => onDown(e, p)} onDoubleClick={() => setPlaced((ps) => ps.filter((q) => q.id !== p.id))}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing leading-none drop-shadow-lg"
                    style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%`, fontSize: `${p.s * 100}cqw` }}>
                    {p.e}
                  </span>
                ))}

                <AnimatePresence>
                  {count !== null && (
                    <motion.div key={`${shot}-${count}`} initial={{ scale: 1.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.35 }}
                      className="absolute inset-0 grid place-items-center pointer-events-none">
                      <span className="font-display font-extrabold text-[7rem] sm:text-[9rem] leading-none text-white neon">{count}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                {stage === 'shooting' && <p className="absolute top-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-bold">Shot {shot} of {SHOTS}</p>}
                {flash > 0 && <div key={flash} className="absolute inset-0 bg-white pointer-events-none animate-flash" />}
              </div>
            )}

            {(stage === 'developing' || stage === 'done') && (
              <div className="mt-8 relative grid place-items-center pb-4">
                <div aria-hidden="true" className="w-56 h-3 rounded-full bg-black border-2 border-line" />
                <div className="relative w-44 sm:w-52 overflow-hidden -mt-1.5" style={{ height: 'min(70vh, 34rem)' }}>
                  <motion.img
                    src={strip ?? undefined} alt={`Your SpinPix photo strip: ${line1}`}
                    initial={{ y: '-100%', filter: 'brightness(2.2) saturate(0)' }}
                    animate={{ y: 0, filter: 'brightness(1) saturate(1)' }}
                    transition={{ y: { duration: 2.4, ease: [0.3, 0.7, 0.2, 1] }, filter: { duration: 3.2, delay: 0.6 } }}
                    className="w-full shadow-2xl rounded-sm"
                  />
                </div>
              </div>
            )}

            {/* controls */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              {stage === 'live' && (
                <>
                  <button type="button" onClick={run} className="btn btn-pop"><Icon name="Camera" size={18} /> Start the countdown</button>
                  <div className="flex gap-2">
                    {sample && <button type="button" onClick={() => pickSample()} className="btn btn-ghost !px-4" aria-label="Try another party photo"><Icon name="Shuffle" size={18} /></button>}
                    <label className="btn btn-ghost !px-4 cursor-pointer" aria-label="Upload your own photo"><Icon name="Upload" size={18} /><input type="file" accept="image/*" className="sr-only" onChange={(e) => onUpload(e.target.files?.[0])} /></label>
                    <button type="button" onClick={() => setSound((s) => !s)} className="btn btn-ghost !px-4" aria-label={sound ? 'Mute shutter sound' : 'Turn shutter sound on'}><Icon name={sound ? 'Volume2' : 'VolumeX'} size={18} /></button>
                  </div>
                </>
              )}
              {stage === 'shooting' && <button type="button" onClick={reset} className="btn btn-ghost">Stop</button>}
              {stage === 'developing' && <p className="font-display font-bold text-paper/80">Printing your strip…</p>}
              {stage === 'done' && (
                <>
                  <div className="flex flex-wrap gap-2">
                    {strip && <a href={strip} download="spinpix-photo-strip.jpg" className="btn btn-sun"><Icon name="Download" size={18} /> Save my strip</a>}
                    {canShareFiles && <button type="button" onClick={share} className="btn btn-ghost"><Icon name="Share2" size={18} /> Share</button>}
                    <button type="button" onClick={reset} className="btn btn-ghost"><Icon name="RotateCcw" size={18} /> Again</button>
                  </div>
                </>
              )}
            </div>
            {camError && stage === 'live' && <p role="status" className="mt-3 text-sm text-sun">{camError}</p>}
          </div>

          <AnimatePresence>
            {stage === 'done' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="mt-6 rounded-3xl border-2 border-line bg-pop text-white p-6 sm:p-8 shadow-hard">
                <p className="font-display font-extrabold text-2xl sm:text-3xl">Love it? Imagine it with real lights, real props and all your guests.</p>
                <p className="mt-2 text-white/85">{date ? `Let’s get ${fmtDate(date)} in the diary.` : 'Tell us your date and we’ll check it for you.'}</p>
                <Link to={bookHref} className="btn btn-sun mt-5">Book the real booth <Icon name="ArrowRight" size={18} /></Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
