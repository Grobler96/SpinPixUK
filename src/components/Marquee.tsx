export default function Marquee({ items, className = '' }: { items: string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden border-y-2 border-ink ${className}`} aria-hidden="true">
      <div className="flex w-max animate-marquee">
        {row.concat(row).map((t, i) => (
          <span key={i} className="flex items-center font-display font-extrabold text-2xl sm:text-3xl py-4 whitespace-nowrap">
            {t}
            <span className="mx-6 text-3xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
