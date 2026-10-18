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
  // 'hero' is still the placeholder disco ball footage; 'floor' is the keyframe camera move and the rest are
  // real SpinPix photos (scripts/make-photo-film.py). Swap any of them for a real video clip with scripts/make-film.sh.
  { id: 'hero', frames: 56, desktop: false },
  { id: 'floor', frames: 60, desktop: false },
  { id: 'booth', frames: 36, desktop: false },
  { id: 'mirror', frames: 36, desktop: false },
  { id: 'pod', frames: 36, desktop: false },
  { id: 'spin', frames: 36, desktop: false },
];

// Six clips, so each owns a sixth of the scroll: the words sit inside their clip and clear before the next one blends in.
export const chapters: Chapter[] = [
  { at: [0.02, 0.15], eyebrow: '01 · The ball drops', title: 'Lights down.', titleColor: '#2F7BFF', side: 'centre' },
  { at: [0.185, 0.315], eyebrow: '02 · The floor lights up', title: 'Your stage is set.', titleColor: '#FF2E93', side: 'centre' },
  { at: [0.35, 0.48], eyebrow: '03 · The classic booth', title: 'Step inside.', titleColor: '#8B3DFF', side: 'centre' },
  { at: [0.52, 0.645], eyebrow: '04 · The magic mirror', title: 'Strike a pose.', titleColor: '#FF2E93', side: 'centre' },
  { at: [0.685, 0.81], eyebrow: '05 · The selfie pod', title: 'Say cheese.', titleColor: '#4DE1FF', side: 'centre' },
  { at: [0.85, 0.93], eyebrow: '06 · The 360 spin', title: 'Spin the fun.', titleColor: '#FF2E93', text: 'Selfie pods, magic mirrors, classic booths and slow motion 360 video, for weddings, parties, proms and work events across the UK.', side: 'centre' },
];

export const frameUrl = (clip: Clip, i: number, mobile: boolean) =>
  asset(`film/${clip.id}/${mobile || !clip.desktop ? 'm' : 'd'}/${String(i + 1).padStart(3, '0')}.webp`);
