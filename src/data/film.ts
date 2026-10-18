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
  // Veo footage (scripts/make-film.sh): prom night under the mirror ball, the 360 platform, the magic mirror.
  { id: 'night', frames: 96, desktop: false },
  { id: 'spin360', frames: 96, desktop: false },
  { id: 'mirrorwed', frames: 96, desktop: false },
];

// Three clips, each owns a third of the scroll. The first headline is already showing when the page opens.
export const chapters: Chapter[] = [
  { at: [-0.1, 0.29], eyebrow: 'SpinPix UK · Photo booth hire', title: 'Capture the moment.', titleColor: '#2F7BFF', text: 'Magic mirrors, selfie pods, classic booths and slow motion 360 video, for weddings, parties, proms and work events across the UK.', side: 'centre' },
  { at: [0.37, 0.62], eyebrow: 'The 360 video booth', title: 'Spin the fun.', titleColor: '#FF2E93', side: 'centre' },
  { at: [0.7, 0.9], eyebrow: 'The magic mirror', title: 'Strike a pose.', titleColor: '#8B3DFF', side: 'centre' },
];

export const frameUrl = (clip: Clip, i: number, mobile: boolean) =>
  asset(`film/${clip.id}/${mobile || !clip.desktop ? 'm' : 'd'}/${String(i + 1).padStart(3, '0')}.webp`);
