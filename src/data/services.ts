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
  icon: string;
  popular?: boolean;
};

export const services: Service[] = [
  {
    slug: 'selfie-pod',
    name: 'Selfie Pod',
    tagline: 'Modern, shareable fun for every event',
    description: 'A sleek selfie experience with professional studio lighting, instant sharing and plenty of creative options for guests of all ages.',
    features: ['Unlimited visits during hire', 'AirDrop, WhatsApp, email and QR sharing where available', 'Professional studio lighting', 'Personalised photo overlays', 'Online gallery after the event'],
    includes: ['Friendly setup and collection', 'Fun props', 'Digital sharing', 'Online gallery'],
    priceFrom: 0,
    duration: 'Flexible hire',
    capacity: 'Groups of 1–6',
    image: 'https://images.pexels.com/photos/1796715/pexels-photo-1796715.jpeg?auto=compress&cs=tinysrgb&w=900',
    accent: 'blue',
    icon: 'Camera',
    popular: true,
  },
  {
    slug: 'letterbox-selfie-pod',
    name: 'Letterbox Selfie Pod',
    tagline: 'Ideal for unattended all-day hire',
    description: 'A compact letterbox-style selfie pod designed for simple, flexible and unattended all-day entertainment at venues and special occasions.',
    features: ['Unattended all-day hire option', 'Instant digital sharing where available', 'Professional studio lighting', 'Personalised photo overlays', 'Online gallery after the event'],
    includes: ['Friendly setup and collection', 'Fun props', 'Digital sharing', 'Online gallery'],
    priceFrom: 0,
    duration: 'All-day hire available',
    capacity: 'Groups of 1–6',
    image: 'https://images.pexels.com/photos/2027769/pexels-photo-2027769.jpeg?auto=compress&cs=tinysrgb&w=900',
    accent: 'cyan',
    icon: 'Smartphone',
  },
  {
    slug: 'magic-mirror-photo-booth',
    name: 'Magic Mirror Photo Booth',
    tagline: 'Interactive photos with a touch of magic',
    description: 'A full-length interactive mirror that adds personality to your event with fun prompts, flattering lighting and personalised photo designs.',
    features: ['Interactive full-length mirror', 'Professional studio lighting', 'Personalised photo overlays', 'Large selection of fun props', 'Digital and print packages available'],
    includes: ['Friendly setup and collection', 'Attendant where applicable', 'Fun props', 'Online gallery'],
    priceFrom: 0,
    duration: 'Flexible hire',
    capacity: 'Groups of 1–5',
    image: 'https://images.pexels.com/photos/3754305/pexels-photo-3754305.jpeg?auto=compress&cs=tinysrgb&w=900',
    accent: 'magenta',
    icon: 'Sparkles',
  },
  {
    slug: 'enclosed-photo-booth',
    name: 'Enclosed Photo Booth',
    tagline: 'Classic booth fun with four skin options',
    description: 'A traditional enclosed photo booth experience with four different booth skins, premium lighting, fun props and optional print packages.',
    features: ['Four different booth skin options', 'Unlimited visits during hire', 'Professional studio lighting', 'Personalised photo overlays', 'Print packages available'],
    includes: ['Friendly setup and collection', 'Attendant where applicable', 'Fun props', 'Online gallery'],
    priceFrom: 0,
    duration: 'Flexible hire',
    capacity: 'Groups of 1–6',
    image: 'https://images.pexels.com/photos/3754253/pexels-photo-3754253.jpeg?auto=compress&cs=tinysrgb&w=900',
    accent: 'blue',
    icon: 'Monitor',
  },
  {
    slug: '360-video-booth',
    name: '360 Video Booth',
    tagline: 'Shareable slow-motion moments',
    description: 'Capture guests in exciting 360 video clips that are ready to share, with bespoke branding available for corporate events.',
    features: ['360 video capture', 'Instant digital sharing where available', 'Professional studio lighting', 'Personalised photo or video overlays', 'Bespoke branding for corporate events'],
    includes: ['Friendly setup and collection', 'Attendant where applicable', 'Online gallery', 'Digital sharing'],
    priceFrom: 0,
    duration: 'Flexible hire',
    capacity: 'Small groups per spin',
    image: 'https://images.pexels.com/photos/4946525/pexels-photo-4946525.jpeg?auto=compress&cs=tinysrgb&w=900',
    accent: 'violet',
    icon: 'Video',
    popular: true,
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
