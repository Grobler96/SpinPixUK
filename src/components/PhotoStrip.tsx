import type { Tone } from '@/data/services';

const frameBg: Record<Tone, string> = {
  pop: 'bg-pop', sun: 'bg-sun', volt: 'bg-volt', mint: 'bg-mint', grape: 'bg-grape',
};

/** A decorative photo-booth strip. Swap `faces` for real photos later by rendering <img> in each frame. */
export default function PhotoStrip({
  tones, faces, className = '', caption = 'SpinPix',
}: { tones: Tone[]; faces: string[]; className?: string; caption?: string }) {
  return (
    <div className={`bg-white border-2 border-ink rounded-md p-2.5 pb-3 shadow-hard w-[132px] sm:w-[156px] ${className}`}>
      <div className="flex flex-col gap-2">
        {tones.map((t, i) => (
          <div key={i} className={`${frameBg[t]} border-2 border-ink rounded-sm aspect-[4/3] grid place-items-center text-4xl sm:text-5xl`}>
            <span role="img" aria-label="">{faces[i % faces.length]}</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-center font-display font-extrabold text-[11px] tracking-[0.2em] uppercase">{caption}</p>
    </div>
  );
}
