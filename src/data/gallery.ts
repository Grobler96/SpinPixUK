import { asset } from '@/lib/asset';

export type PhotoType = 'Magic Mirror' | 'Selfie Pod' | 'Enclosed Booth' | '360 Video';

export const photoTypes: PhotoType[] = ['Magic Mirror', 'Selfie Pod', 'Enclosed Booth', '360 Video'];

export type Photo = { src: string; alt: string; caption: string; type: PhotoType };

const p = (file: string, type: PhotoType, alt: string, caption: string): Photo => ({
  src: asset(`photos/${file}.jpg`), type, alt, caption,
});

// The first four are used on the home page "Real events" strip.
export const gallery: Photo[] = [
  p('video-360', '360 Video', 'Guests posing with inflatable guitars on the 360 video platform', '360 Video Booth'),
  p('magic-mirror-prom', 'Magic Mirror', 'Magic mirror with a personalised school prom screen', 'Magic Mirror · school prom'),
  p('booth-camper', 'Enclosed Booth', 'Enclosed photo booth with a camper van skin', 'Enclosed Booth · camper van skin'),
  p('selfie-pod', 'Selfie Pod', 'SpinPix UK selfie pod with ring light', 'Selfie Pod'),
  p('mirror-masquerade', 'Magic Mirror', 'Magic mirror with a personalised masquerade ball screen', 'Magic Mirror · masquerade ball'),
  p('video-360-wedding', '360 Video', 'Bride and groom with props on the 360 video platform', '360 Video Booth · wedding'),
  p('selfie-totem', 'Selfie Pod', 'Selfie pod with ring light and a personalised party screen', 'Selfie Pod · birthday party'),
  p('mirror-engagement', 'Magic Mirror', 'Magic mirror with a personalised engagement party screen', 'Magic Mirror · engagement'),
  p('booth-silver', 'Enclosed Booth', 'Enclosed photo booth with a silver skin and light-up PHOTOS sign', 'Enclosed Booth · silver skin'),
  p('mirror-bride-groom', 'Magic Mirror', 'Bride and groom with props at the magic mirror', 'Magic Mirror · wedding'),
  p('video-360-platform', '360 Video', 'SpinPix UK 360 video platform with LED lights and a props table', '360 Video Booth · set-up'),
  p('mirror-johnson', 'Magic Mirror', 'Magic mirror with a personalised wedding screen and a props table', 'Magic Mirror · wedding'),
  p('letterbox-pod', 'Selfie Pod', 'Letterbox selfie pod with a personalised Mr & Mrs wedding screen', 'Letterbox Selfie Pod · wedding'),
  p('enclosed-wood-night', 'Enclosed Booth', 'Enclosed photo booth with a wood skin and light-up PHOTOS sign at an evening event', 'Enclosed Booth · wood skin'),
  p('mirror-18th', 'Magic Mirror', 'Magic mirror with a personalised 18th birthday screen', 'Magic Mirror · 18th birthday'),
  p('magic-mirror-guests', 'Magic Mirror', 'Guests in props posing at the magic mirror', 'Magic Mirror · guests'),
  p('mirror-school-prom', 'Magic Mirror', 'Magic mirror with a personalised school prom screen', 'Magic Mirror · school prom'),
  p('selfie-totem-couple', 'Selfie Pod', 'Couple using a selfie pod with ring light and instant prints', 'Selfie Pod · prints'),
  p('mirror-simpson', 'Magic Mirror', 'Magic mirror with a personalised wedding screen', 'Magic Mirror · wedding'),
  p('enclosed-wood-landscape', 'Enclosed Booth', 'Enclosed photo booth with a wood skin, light-up PHOTOS sign and a props table', 'Enclosed Booth · props'),
  p('mirror-80th', 'Magic Mirror', 'Guests waving at the magic mirror during a countdown', 'Magic Mirror · 80th birthday'),
  p('mirror-peter-shelly', 'Magic Mirror', 'Magic mirror with a personalised wedding screen and balloons', 'Magic Mirror · wedding'),
  p('mirror-clock', 'Magic Mirror', 'Magic mirror with a personalised clock design screen', 'Magic Mirror · custom design'),
  p('selfie-totem-wide', 'Selfie Pod', 'Selfie pod with ring light and lighting stands at a birthday party', 'Selfie Pod · party set-up'),
  p('magic-mirror-party', 'Magic Mirror', 'Guests laughing with props in front of the magic mirror', 'Magic Mirror · party'),
  p('mirror-7th', 'Magic Mirror', 'Magic mirror with a personalised children’s birthday screen', 'Magic Mirror · birthday'),
  p('mirror-props', 'Magic Mirror', 'Magic mirror with a personalised screen and a colourful props table', 'Magic Mirror · props'),
  p('booth-wood', 'Enclosed Booth', 'Enclosed photo booth with a rustic wood skin', 'Enclosed Booth · wood skin'),
];
