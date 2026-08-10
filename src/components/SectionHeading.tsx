type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
};

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', className = '' }: Props) {
  return (
    <div className={`${align === 'center' ? 'text-center mx-auto' : 'text-left'} max-w-3xl ${className}`}>
      {eyebrow && (
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-cyan mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ice leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-silver/70 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
