export default function PhotoCard({
  src, alt, caption, className = '', pos = 'center',
}: { src: string; alt: string; caption?: string; className?: string; pos?: string }) {
  return (
    <figure className={`bg-white text-black border-2 border-black rounded-md p-2 pb-2.5 shadow-hard w-[170px] sm:w-[210px] ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="w-full aspect-[3/4] object-cover rounded-sm" style={{ objectPosition: pos }} />
      {caption && <figcaption className="mt-2 text-center font-display font-extrabold text-[11px] tracking-[0.15em] uppercase">{caption}</figcaption>}
    </figure>
  );
}
