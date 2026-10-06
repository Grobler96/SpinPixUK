import { asset } from '@/lib/asset';
export type Photo = { src: string; alt: string; caption: string; ratio: 'tall' | 'wide' | 'square' };

export const gallery: Photo[] = [
  { src: asset('photos/video-360.jpg'), alt: 'Guests posing with inflatable guitars on the 360 video platform', caption: '360 Video Booth', ratio: 'tall' },
  { src: asset('photos/magic-mirror-prom.jpg'), alt: 'Magic mirror with a personalised school prom screen', caption: 'Magic Mirror · school prom', ratio: 'tall' },
  { src: asset('photos/booth-camper.jpg'), alt: 'Enclosed photo booth with a camper van skin', caption: 'Enclosed Booth · camper van skin', ratio: 'wide' },
  { src: asset('photos/selfie-pod.jpg'), alt: 'SpinPix UK selfie pod with ring light', caption: 'Selfie Pod', ratio: 'tall' },
  { src: asset('photos/magic-mirror-party.jpg'), alt: 'Guests laughing with props in front of the magic mirror', caption: 'Magic Mirror · party', ratio: 'wide' },
  { src: asset('photos/letterbox-pod.jpg'), alt: 'Letterbox selfie pod with a personalised Mr & Mrs wedding screen', caption: 'Letterbox Selfie Pod · wedding', ratio: 'tall' },
  { src: asset('photos/booth-silver.jpg'), alt: 'Enclosed photo booth with a silver skin and light-up PHOTOS sign', caption: 'Enclosed Booth · silver skin', ratio: 'square' },
  { src: asset('photos/magic-mirror-guests.jpg'), alt: 'Guests in props posing at the magic mirror', caption: 'Magic Mirror · guests', ratio: 'tall' },
  { src: asset('photos/booth-wood.jpg'), alt: 'Enclosed photo booth with a rustic wood skin', caption: 'Enclosed Booth · wood skin', ratio: 'tall' },
];
