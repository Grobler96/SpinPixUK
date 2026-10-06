export default function SectionHeading({
  eyebrow, title, subtitle, align = 'left', dark = false,
}: { eyebrow?: string; title: string; subtitle?: string; align?: 'left' | 'center'; dark?: boolean }) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className={`inline-block font-display font-bold text-xs uppercase tracking-[0.2em] mb-3 px-3 py-1 rounded-full border-2 ${dark ? 'border-white/30 text-sun' : 'border-line bg-sun text-ink'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.02]">{title}</h2>
      {subtitle && <p className={`mt-4 text-lg leading-relaxed ${dark ? 'text-white/75' : 'text-paper/70'}`}>{subtitle}</p>}
    </div>
  );
}
