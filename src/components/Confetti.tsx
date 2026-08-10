import { useMemo } from 'react';

type Piece = {
  left: string;
  delay: string;
  duration: string;
  color: string;
  size: number;
  '--bx': string;
  '--by': string;
  '--br': string;
};

const COLORS = ['#54C8FF', '#168BFF', '#7C3CFF', '#B23CFF', '#E143FF', '#ffffff'];

export default function Confetti({ count = 60 }: { count?: number }) {
  const pieces = useMemo<Piece[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const dist = 120 + Math.random() * 220;
      return {
        left: `${50 + (Math.random() - 0.5) * 8}%`,
        delay: `${Math.random() * 0.6}s`,
        duration: `${1.4 + Math.random() * 1.2}s`,
        color: COLORS[i % COLORS.length],
        size: 6 + Math.floor(Math.random() * 8),
        '--bx': `${Math.cos(angle) * dist}px`,
        '--by': `${Math.sin(angle) * dist + 60}px`,
        '--br': `${Math.random() * 720 - 360}deg`,
      } as Piece;
    });
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="absolute top-1/2 rounded-sm"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 0.6,
            background: p.color,
            animation: `confetti-burst ${p.duration} ease-out ${p.delay} forwards`,
            // @ts-expect-error custom props
            '--bx': p['--bx'],
            '--by': p['--by'],
            '--br': p['--br'],
          }}
        />
      ))}
    </div>
  );
}
