import { asset } from '@/lib/asset';

/**
 * The homepage scroll film: "A night with SpinPix".
 *
 * Each clip is a folder of numbered WebP frames made by scripts/make-film.sh:
 *   public/film/<id>/d/001.webp …  landscape frames for desktop (optional)
 *   public/film/<id>/m/001.webp …  portrait frames for phones
 * Clips play one after another as you scroll and blend into each other.
 * Chapters are the words on screen; `at` is the slice of the whole film (0 to 1) they show for.
 */
export type Clip = { id: string; frames: number; desktop: boolean };
export type Chapter = { at: [number, number]; eyebrow: string; title: string; titleColor: string; text?: string; side: 'left' | 'right' | 'centre' };

export const clips: Clip[] = [
  // Placeholder until the six Veo shots are in: the opening of the disco ball clip.
  { id: 'hero', frames: 56, desktop: false },
];

export const chapters: Chapter[] = [
  { at: [0.08, 0.46], eyebrow: '01 · The ball drops', title: 'Capture the moment.', titleColor: '#2F7BFF', side: 'centre' },
  { at: [0.5, 0.88], eyebrow: '02 · The spin', title: 'Spin the fun.', titleColor: '#FF2E93', text: 'Selfie pods, magic mirrors, classic booths and slow motion 360 video, for weddings, parties, proms and work events across the UK.', side: 'centre' },
];

export const frameUrl = (clip: Clip, i: number, mobile: boolean) =>
  asset(`film/${clip.id}/${mobile || !clip.desktop ? 'm' : 'd'}/${String(i + 1).padStart(3, '0')}.webp`);
