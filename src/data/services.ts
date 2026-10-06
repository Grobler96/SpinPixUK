import { asset } from '@/lib/asset';
export type Tone = 'pop' | 'sun' | 'volt' | 'mint' | 'grape';

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  duration: string;
  capacity: string;
  tone: Tone;
  icon: string;
  photos: { src: string; alt: string }[];
  popular?: boolean;
};

export const services: Service[] = [
  {
    slug: 'selfie-pod',
    name: 'Selfie Pod',
    tagline: 'Modern, shareable fun for every event',
    description:
      'A sleek selfie experience with professional studio lighting, instant sharing and plenty of creative options for guests of all ages.',
    features: [
      'Unlimited visits during hire',
      'AirDrop, WhatsApp, email and QR sharing where available',
      'Professional studio lighting',
      'Personalised photo overlays',
      'Online gallery after the event',
    ],
    duration: 'Flexible hire',
    capacity: 'Groups of 1–6',
    tone: 'volt',
    icon: 'Camera',
    photos: [{ src: asset('photos/selfie-pod.jpg'), alt: 'SpinPix UK selfie pod with ring light at an evening event' }],
    popular: true,
  },
  {
    slug: 'letterbox-selfie-pod',
    name: 'Letterbox Selfie Pod',
    tagline: 'Ideal for unattended all-day hire',
    description:
      'A compact letterbox-style selfie pod designed for simple, flexible and unattended all-day entertainment at venues and special occasions.',
    features: [
      'Unattended all-day hire option',
      'Instant digital sharing where available',
      'Professional studio lighting',
      'Personalised photo overlays',
      'Online gallery after the event',
    ],
    duration: 'All-day hire available',
    capacity: 'Groups of 1–6',
    tone: 'mint',
    icon: 'Smartphone',
    photos: [{ src: asset('photos/letterbox-pod.jpg'), alt: 'Letterbox selfie pod with a personalised Mr & Mrs wedding screen' }],
  },
  {
    slug: 'magic-mirror-photo-booth',
    name: 'Magic Mirror Photo Booth',
    tagline: 'Interactive photos with a touch of magic',
    description:
      'A full-length interactive mirror that adds personality to your event with fun prompts, flattering lighting and personalised photo designs.',
    features: [
      'Interactive full-length mirror',
      'Professional studio lighting',
      'Personalised photo overlays',
      'Large selection of fun props',
      'Digital and print packages available',
    ],
    duration: 'Flexible hire',
    capacity: 'Groups of 1–5',
    tone: 'pop',
    icon: 'Sparkles',
    photos: [
      { src: asset('photos/magic-mirror-prom.jpg'), alt: 'Magic mirror with a personalised school prom screen' },
      { src: asset('photos/magic-mirror-guests.jpg'), alt: 'Guests in props posing at the magic mirror' },
      { src: asset('photos/magic-mirror-party.jpg'), alt: 'Guests laughing with props in front of the magic mirror' },
    ],
  },
  {
    slug: 'enclosed-photo-booth',
    name: 'Enclosed Photo Booth',
    tagline: 'Classic booth fun with four skin options',
    description:
      'A traditional enclosed photo booth experience with four different booth skins, premium lighting, fun props and optional print packages.',
    features: [
      'Four different booth skin options',
      'Unlimited visits during hire',
      'Professional studio lighting',
      'Personalised photo overlays',
      'Print packages available',
    ],
    duration: 'Flexible hire',
    capacity: 'Groups of 1–6',
    tone: 'sun',
    icon: 'Monitor',
    photos: [
      { src: asset('photos/booth-camper.jpg'), alt: 'Enclosed photo booth with a camper van skin' },
      { src: asset('photos/booth-silver.jpg'), alt: 'Enclosed photo booth with a silver skin and light-up PHOTOS sign' },
      { src: asset('photos/booth-wood.jpg'), alt: 'Enclosed photo booth with a rustic wood skin' },
    ],
  },
  {
    slug: '360-video-booth',
    name: '360 Video Booth',
    tagline: 'Shareable slow-motion moments',
    description:
      'Capture guests in exciting 360 video clips that are ready to share, with bespoke branding available for corporate events.',
    features: [
      '360 video capture',
      'Instant digital sharing where available',
      'Professional studio lighting',
      'Personalised photo or video overlays',
      'Bespoke branding for corporate events',
    ],
    duration: 'Flexible hire',
    capacity: 'Small groups per spin',
    tone: 'grape',
    icon: 'Video',
    photos: [{ src: asset('photos/video-360.jpg'), alt: 'Guests posing with inflatable guitars on the 360 video platform' }],
    popular: true,
  },
];

export const toneClasses: Record<Tone, { bg: string; text: string; soft: string }> = {
  pop: { bg: 'bg-pop', text: 'text-white', soft: 'bg-pop/15' },
  sun: { bg: 'bg-sun', text: 'text-ink', soft: 'bg-sun/30' },
  volt: { bg: 'bg-volt', text: 'text-white', soft: 'bg-volt/15' },
  mint: { bg: 'bg-mint', text: 'text-ink', soft: 'bg-mint/25' },
  grape: { bg: 'bg-grape', text: 'text-white', soft: 'bg-grape/15' },
};

export const getService = (slug: string) => services.find((s) => s.slug === slug);
