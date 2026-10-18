import { asset } from '@/lib/asset';

/**
 * The panels in the "Party Tunnel" on the homepage.
 * Each panel shows `video` when it exists (a looping MP4 in public/tunnel/), otherwise the `image`.
 * To add a Veo clip: run scripts/make-loop.sh <clip.mp4> <id>, then set `video: true` here.
 */
export type TunnelPanel = {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  to: string;
  image: string;
  imagePos?: [number, number]; // focus point of the photo, 0 to 1
  video?: boolean;
};

export const tunnelPanels: TunnelPanel[] = [
  { id: 'mirror', eyebrow: 'Weddings & parties', title: 'Magic Mirror', text: 'A full length mirror that talks, sparkles and makes everyone look their best.', to: '/booths#magic-mirror-photo-booth', image: 'photos/magic-mirror-party.jpg', imagePos: [0.5, 0.4] },
  { id: 'spin', eyebrow: 'Slow motion video', title: '360 Spin', text: 'The camera arm sweeps right round your guests for video they share before they step off.', to: '/booths#360-video-booth', image: 'photos/video-360-wedding.jpg', imagePos: [0.5, 0.45] },
  { id: 'pod', eyebrow: 'Instant sharing', title: 'Selfie Pod', text: 'Studio lighting, a big screen and pictures on their phones in seconds.', to: '/booths#selfie-pod', image: 'photos/selfie-totem-couple.jpg', imagePos: [0.5, 0.4] },
  { id: 'booth', eyebrow: 'Four skins', title: 'Classic Booth', text: 'Curtain closed, props on, four flashes. The photo booth everyone remembers.', to: '/booths#enclosed-photo-booth', image: 'photos/booth-silver.jpg', imagePos: [0.5, 0.5] },
  { id: 'prom', eyebrow: 'Proms & leavers', title: 'Prom Night', text: 'Overlays personalised to your school, and a queue that never empties.', to: '/proms', image: 'photos/mirror-school-prom.jpg', imagePos: [0.5, 0.45] },
  { id: 'corporate', eyebrow: 'Brand activations', title: 'Corporate', text: 'Your branding on every photo and video, shared straight to socials.', to: '/corporate', image: 'photos/magic-mirror-prom.jpg', imagePos: [0.5, 0.45] },
  { id: 'props', eyebrow: 'Included', title: 'The Props Table', text: 'Boas, hats, glasses and inflatable guitars. Chaos, curated.', to: '/gallery', image: 'photos/magic-mirror-guests.jpg', imagePos: [0.5, 0.4] },
  { id: 'print', eyebrow: 'Yours to keep', title: 'The Print', text: 'Prints on the night and an online gallery after.', to: '/gallery', image: 'photos/selfie-totem.jpg', imagePos: [0.5, 0.45] },
];

export const panelMedia = (p: TunnelPanel) => ({
  image: asset(p.image),
  video: p.video ? asset(`tunnel/${p.id}.mp4`) : undefined,
});
