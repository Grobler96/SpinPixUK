import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NeonText from './NeonText';
import { Icon } from './Icon';
import { site } from '@/config/site';

/** Closing call to action: pick your date and go straight to the enquiry form with it filled in. */
export default function DateCTA() {
  const [date, setDate] = useState('');
  const [lit, setLit] = useState(false);
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);
  const go = (e: FormEvent) => { e.preventDefault(); navigate(`/contact${date ? `?date=${date}` : ''}`); };

  return (
    <section className="relative px-4 sm:px-6 py-24 sm:py-32 overflow-hidden bg-[radial-gradient(60%_70%_at_50%_100%,rgba(255,46,147,0.35),transparent)]">
      <motion.div className="mx-auto max-w-3xl text-center" onViewportEnter={() => setLit(true)} viewport={{ once: true, margin: '-25%' }}>
        <h2 className="font-display font-extrabold text-5xl sm:text-7xl leading-[0.95]">
          <NeonText text="Is your date" color="#8B3DFF" lit={lit} /><br /><NeonText text="still free?" color="#FF2E93" lit={lit} />
        </h2>
        <p className="mt-6 text-lg text-paper/75">Weekends go fast, especially in wedding and prom season. Pop your date in and we’ll check it for you.</p>
        <form onSubmit={go} className="mt-10 mx-auto max-w-xl flex flex-col sm:flex-row gap-3">
          <label htmlFor="cta-date" className="sr-only">Your event date</label>
          <input id="cta-date" type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className="field !text-lg !py-4 flex-1" />
          <button type="submit" className="btn btn-pop !py-4 text-lg"><Icon name="CalendarDays" size={20} /> Check my date</button>
        </form>
        <p className="mt-5 text-paper/60">Or call us on <a href={site.phoneHref} className="font-bold text-paper underline underline-offset-4">{site.phone}</a></p>
      </motion.div>
    </section>
  );
}
