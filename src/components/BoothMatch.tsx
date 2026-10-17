import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from './Icon';
import { services, toneClasses } from '@/data/services';

type Slug = 'selfie-pod' | 'letterbox-selfie-pod' | 'magic-mirror-photo-booth' | 'enclosed-photo-booth' | '360-video-booth';
type Opt = { id: string; label: string; emoji: string; score: Partial<Record<Slug, number>>; event?: string };

const QUESTIONS: { q: string; opts: Opt[] }[] = [
  {
    q: 'What are you celebrating?',
    opts: [
      { id: 'wedding', label: 'A wedding', emoji: '💍', event: 'weddings', score: { 'magic-mirror-photo-booth': 2, 'enclosed-photo-booth': 2, 'letterbox-selfie-pod': 1, 'selfie-pod': 1, '360-video-booth': 1 } },
      { id: 'birthday', label: 'A birthday', emoji: '🎂', event: 'parties', score: { '360-video-booth': 2, 'magic-mirror-photo-booth': 2, 'selfie-pod': 1, 'enclosed-photo-booth': 1 } },
      { id: 'prom', label: 'Prom or leavers', emoji: '🎓', event: 'proms', score: { '360-video-booth': 3, 'magic-mirror-photo-booth': 2, 'selfie-pod': 1 } },
      { id: 'corporate', label: 'A work event', emoji: '💼', event: 'corporate', score: { 'selfie-pod': 2, '360-video-booth': 2, 'letterbox-selfie-pod': 1 } },
      { id: 'christmas', label: 'Christmas do', emoji: '🎄', event: 'parties', score: { 'magic-mirror-photo-booth': 2, 'enclosed-photo-booth': 2, '360-video-booth': 1 } },
    ],
  },
  {
    q: 'How many guests?',
    opts: [
      { id: 's', label: 'Under 50', emoji: '🙂', score: { 'enclosed-photo-booth': 1, 'selfie-pod': 1, 'letterbox-selfie-pod': 1 } },
      { id: 'm', label: '50 to 150', emoji: '😄', score: { 'magic-mirror-photo-booth': 1, 'selfie-pod': 1, '360-video-booth': 1 } },
      { id: 'l', label: '150 plus', emoji: '🤩', score: { 'magic-mirror-photo-booth': 2, '360-video-booth': 1, 'selfie-pod': 1 } },
    ],
  },
  {
    q: 'What’s the vibe?',
    opts: [
      { id: 'classy', label: 'Classy and elegant', emoji: '🥂', score: { 'magic-mirror-photo-booth': 2, 'enclosed-photo-booth': 2 } },
      { id: 'chaos', label: 'Props and chaos', emoji: '🤪', score: { 'magic-mirror-photo-booth': 2, 'enclosed-photo-booth': 1, '360-video-booth': 1 } },
      { id: 'video', label: 'Videos for socials', emoji: '🎬', score: { '360-video-booth': 4 } },
      { id: 'allday', label: 'All day, no fuss', emoji: '⏱️', score: { 'letterbox-selfie-pod': 4 } },
      { id: 'brand', label: 'Show off our brand', emoji: '✨', score: { 'selfie-pod': 2, '360-video-booth': 2 } },
    ],
  },
];

export default function BoothMatch() {
  const [answers, setAnswers] = useState<Opt[]>([]);
  const step = answers.length;
  const done = step === QUESTIONS.length;

  const ranked = done
    ? services
        .map((s) => ({ s, score: answers.reduce((n, a) => n + (a.score[s.slug as Slug] ?? 0), 0) + (s.popular ? 0.1 : 0) }))
        .sort((a, b) => b.score - a.score)
    : [];
  const best = ranked[0]?.s;
  const runner = ranked[1]?.s;
  const event = answers[0]?.event;

  return (
    <section className="px-4 sm:px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="font-display font-bold uppercase tracking-[0.2em] text-sm text-mint">Booth matchmaker</p>
          <h2 className="mt-3 font-display font-extrabold text-4xl sm:text-6xl leading-[0.95]">Three taps to your perfect booth.</h2>
        </div>

        <div className="mt-10 flex justify-center gap-2" aria-hidden="true">
          {QUESTIONS.map((_, i) => <span key={i} className={`h-2 rounded-full transition-all ${i < step ? 'w-10 bg-pop' : i === step ? 'w-10 bg-paper/60' : 'w-4 bg-paper/20'}`} />)}
        </div>

        <div className="mt-8 min-h-[380px]">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.fieldset key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
                <legend className="w-full text-center font-display font-extrabold text-2xl sm:text-3xl">{QUESTIONS[step].q}</legend>
                <div className="mt-8 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                  {QUESTIONS[step].opts.map((o) => (
                    <button key={o.id} type="button" onClick={() => setAnswers((a) => [...a, o])}
                      className="group rounded-3xl border-2 border-line bg-card p-5 text-center hover:border-pop hover:-translate-y-1 hover:shadow-hard-sm transition-all">
                      <span className="block text-4xl group-hover:scale-125 transition-transform" aria-hidden="true">{o.emoji}</span>
                      <span className="mt-3 block font-display font-bold">{o.label}</span>
                    </button>
                  ))}
                </div>
                {step > 0 && (
                  <button type="button" onClick={() => setAnswers((a) => a.slice(0, -1))} className="mt-6 mx-auto flex items-center gap-2 text-paper/70 hover:text-paper font-bold text-sm">
                    <Icon name="ArrowLeft" size={16} /> Back
                  </button>
                )}
              </motion.fieldset>
            ) : best && (
              <motion.div key="result" initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} transition={{ duration: 0.6, ease: 'easeOut' }} style={{ perspective: 1000 }}
                className={`grid md:grid-cols-[0.9fr_1.1fr] overflow-hidden rounded-[2rem] border-2 border-line shadow-hard ${toneClasses[best.tone].bg} ${toneClasses[best.tone].text}`}>
                <img src={best.photos[0].src} alt={best.photos[0].alt} className="w-full h-72 md:h-full object-cover object-[50%_70%]" loading="lazy" />
                <div className="p-7 sm:p-10">
                  <p className="font-display font-bold uppercase tracking-[0.2em] text-xs opacity-80">Your perfect match</p>
                  <h3 className="mt-2 font-display font-extrabold text-3xl sm:text-4xl">{best.name}</h3>
                  <p className="mt-2 text-lg opacity-90">{best.tagline}</p>
                  <ul className="mt-5 space-y-2">
                    {best.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-2"><Icon name="Check" size={18} className="mt-0.5 shrink-0" />{f}</li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link to={`/contact?booth=${best.slug}${event ? `&event=${event}` : ''}`} className="btn bg-paper text-ink shadow-hard-sm hover:shadow-hard">Check my date <Icon name="ArrowRight" size={18} /></Link>
                    <button type="button" onClick={() => setAnswers([])} className="btn border-current"><Icon name="RotateCcw" size={18} /> Start again</button>
                  </div>
                  {runner && <p className="mt-5 text-sm opacity-80">Also a great fit: <strong>{runner.name}</strong></p>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
