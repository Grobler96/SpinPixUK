import { asset } from '@/lib/asset';
export default function Logo({ className = 'h-12' }: { className?: string }) {
  return <img src={asset('wordmark.png')} alt="SpinPix UK" width={1142} height={419} className={`w-auto mix-blend-screen ${className}`} />;
}
