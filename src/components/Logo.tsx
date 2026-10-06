export default function Logo({ className = 'h-12' }: { className?: string }) {
  return <img src="/wordmark.png" alt="SpinPix UK" width={1142} height={419} className={`w-auto mix-blend-screen ${className}`} />;
}
