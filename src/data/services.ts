export type Service = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  includes: string[];
  priceFrom: number;
  duration: string;
  capacity: string;
  image: string;
  accent: 'blue' | 'violet' | 'magenta';
  icon: string; // lucide icon name
  popular?: boolean;
};

export const services: Service[] = [
  {
    slug: 'classic-photo-booth',
    name: 'Classic Photo Booth',
    tagline: 'Timeless prints, instant smiles',
    description:
      'Our enclosed photo booth delivers studio-quality prints in seconds. Choose strip or square layouts, add a custom overlay, and let guests queue up for four sessions of fun.',
    features: [
      'Unlimited digital sessions',
      'Instant 6×4 prints in strip or square',
      'Custom event overlay design',
      'GIF & Boomerang capture modes',
      'Touch-screen start — no app needed',
    ],
    includes: ['Professional attendant', 'Delivery & setup', 'Props box', 'Guest gallery link'],
    priceFrom: 395,
    duration: '3 hours',
    capacity: 'Groups of 1–6',
    image:
      'https://images.pexels.com/photos/1796715/pexels-photo-1796715.jpeg?auto=compress&cs=tinysrgb&w=900',
    accent: 'blue',
    icon: 'Camera',
  },
  {
    slug: 'glam-robo-booth',
    name: 'Glam Robo Booth',
    tagline: 'Magazine-cover lighting, every time',
    description:
      'The Glam Robo Booth wraps guests in soft, flattering ring-light glamour and fires off rapid-fire sequences. The built-in skin-smoothing filter has everyone looking red-carpet ready.',
    features: [
      'Ring-light glamour lighting',
      'Skin-smoothing beauty filter',
      'Rapid-fire 4-shot sequences',
      'Animated GIF export',
      'Branded overlay available',
    ],
    includes: ['Professional attendant', 'Delivery & setup', 'Premium props', 'Guest gallery link'],
    priceFrom: 495,
    duration: '3 hours',
    capacity: 'Groups of 1–5',
    image:
      'https://images.pexels.com/photos/3754253/pexels-photo-3754253.jpeg?auto=compress&cs=tinysrgb&w=900',
    accent: 'magenta',
    icon: 'Sparkles',
    popular: true,
  },
  {
    slug: '360-video-booth',
    name: '360° Video Booth',
    tagline: 'Cinematic slow-motion spins',
    description:
      'Our flagship 360° video booth captures guests on a rotating platform with a motorised arm, producing scroll-stopping slow-motion reels ready to share the moment they step off.',
    features: [
      'Motorised 360° rotating arm',
      '1080p slow-motion capture',
      'Overhead & angled lighting',
      'Instant share via QR code',
      'Custom branded frames',
    ],
    includes: ['Professional operator', 'Delivery & setup', 'Platform lighting', 'Guest gallery link'],
    priceFrom: 645,
    duration: '3 hours',
    capacity: '1–3 per spin',
    image:
      'https://images.pexels.com/photos/4946525/pexels-photo-4946525.jpeg?auto=compress&cs=tinysrgb&w=900',
    accent: 'violet',
    icon: 'Video',
    popular: true,
  },
  {
    slug: 'magic-mirror',
    name: 'Magic Mirror',
    tagline: 'Interactive animations & voice guidance',
    description:
      'A full-length interactive mirror that talks guests through poses, captures animated sequences, and signs each print with a custom message. A genuine crowd-pleaser for all ages.',
    features: [
      'Full-length interactive mirror',
      'Voice-guided animations',
      'Touchscreen photo signing',
      'Animated GIF export',
      'Custom overlay & emojis',
    ],
    includes: ['Professional attendant', 'Delivery & setup', 'Props box', 'Guest gallery link'],
    priceFrom: 475,
    duration: '3 hours',
    capacity: 'Groups of 1–4',
    image:
      'https://images.pexels.com/photos/3754305/pexels-photo-3754305.jpeg?auto=compress&cs=tinysrgb&w=900',
    accent: 'blue',
    icon: 'Monitor',
  },
  {
    slug: 'digital-only-booth',
    name: 'Digital-Only Booth',
    tagline: 'All the fun, zero paper waste',
    description:
      'A compact, print-free booth focused on GIFs, Boomerangs and digital downloads. Perfect for brands and venues that want shareable content without the print queue.',
    features: [
      'Unlimited digital captures',
      'GIF, Boomerang & still modes',
      'Instant AirDrop & QR sharing',
      'Branded digital frames',
      'Compact footprint',
    ],
    includes: ['Professional attendant', 'Delivery & setup', 'Guest gallery link'],
    priceFrom: 345,
    duration: '3 hours',
    capacity: 'Groups of 1–5',
    image:
      'https://images.pexels.com/photos/2027769/pexels-photo-2027769.jpeg?auto=compress&cs=tinysrgb&w=900',
    accent: 'magenta',
    icon: 'Smartphone',
  },
  {
    slug: 'audio-guestbook',
    name: 'Audio Guestbook',
    tagline: 'Heartfelt messages, preserved forever',
    description:
      'A vintage-style phone that invites guests to pick up the handset and leave a 60-second voice message. Every recording is delivered as a polished digital keepsake.',
    features: [
      'Vintage rotary handset',
      '60-second voice recordings',
      'Prompted & open-message modes',
      'Mastered digital delivery',
      'Optional vinyl-style keepsake',
    ],
    includes: ['Setup & collection', 'Unlimited recordings', 'Digital delivery'],
    priceFrom: 195,
    duration: 'Full event',
    capacity: '1 speaker at a time',
    image:
      'https://images.pexels.com/photos/4226906/pexels-photo-4226906.jpeg?auto=compress&cs=tinysrgb&w=900',
    accent: 'violet',
    icon: 'PhoneCall',
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
