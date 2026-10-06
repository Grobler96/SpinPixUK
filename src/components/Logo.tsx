export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="relative grid place-items-center w-10 h-10 rounded-xl bg-pop border-2 border-ink -rotate-6">
        <span className="w-5 h-5 rounded-full bg-sun border-2 border-ink grid place-items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-ink" />
        </span>
      </span>
      <span className={`font-display font-extrabold text-2xl tracking-tight ${light ? 'text-paper' : 'text-ink'}`}>
        SpinPix<span className="text-pop">UK</span>
      </span>
    </span>
  );
}
