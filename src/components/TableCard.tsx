import { asset } from '@/lib/asset';

/** A table-top card with the guest upload QR code. Designed to print at roughly A6 (four to an A4 sheet). */
export default function TableCard({ title, qr }: { title: string; qr: string }) {
  return (
    <div className="print-card relative flex flex-col items-center justify-between text-center overflow-hidden rounded-3xl border-2 border-pop bg-[#0b0618] px-5 py-6 text-white"
      style={{ background: 'radial-gradient(120% 70% at 50% 0%, #3a1578 0%, #0b0618 60%)' }}>
      <img src={asset('wordmark.png')} alt="SpinPix UK" className="w-44 mix-blend-screen" />
      <div>
        <p className="font-display font-extrabold text-2xl leading-tight">Scan to upload<br />your photos &amp; videos</p>
        <p className="mt-1 text-sm text-white/70">Share your snaps with {title}</p>
      </div>
      <div className="rounded-2xl bg-white p-2.5">
        {qr ? <img src={qr} alt={`QR code to upload photos to ${title}`} className="block w-40 h-40" /> : <div className="w-40 h-40" />}
      </div>
      <p className="font-display font-bold text-xs uppercase tracking-[0.2em] text-[#ff8ad0]">Point your camera here</p>
    </div>
  );
}
