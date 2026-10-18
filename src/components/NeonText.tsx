import type { CSSProperties, ElementType } from 'react';

/**
 * Text drawn like a neon tube sign. Letters flicker on when `lit` becomes true.
 * Words never break across lines. Colours come from the brand palette.
 */
export default function NeonText({
  text, color = '#FF2E93', lit = true, as: Tag = 'span', className = '',
}: { text: string; color?: string; lit?: boolean; as?: ElementType; className?: string }) {
  const words = text.split(' ');
  return (
    <Tag className={`neon-tube ${lit ? 'is-lit' : ''} ${className}`} style={{ '--neon': color } as CSSProperties} aria-label={text}>
      {words.map((word, w) => (
        <span key={w} aria-hidden="true" className="whitespace-nowrap">
          {Array.from(word).map((ch, i) => (
            <span key={i} style={{ animationDelay: `${((w * 7 + i) * 37) % 420}ms` }}>{ch}</span>
          ))}
          {w < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
