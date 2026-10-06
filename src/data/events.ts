import type { Tone } from './services';

export type EventType = {
  slug: 'weddings' | 'parties' | 'proms' | 'corporate';
  name: string;
  emoji: string;
  tone: Tone;
  headline: string;
  blurb: string;
  points: { icon: string; title: string; text: string }[];
  booths: string[];
};

export const eventTypes: EventType[] = [
  {
    slug: 'weddings',
    name: 'Weddings',
    emoji: '💍',
    tone: 'pop',
    headline: 'The dance floor’s second-favourite spot.',
    blurb:
      'Give your guests something to do between the speeches and the first dance. Personalised overlays, flattering lighting and instant sharing mean every table leaves with a memory, and you get the full online gallery after.',
    points: [
      { icon: 'Heart', title: 'Matched to your day', text: 'Personalised overlays to suit your colours, names and theme.' },
      { icon: 'Users', title: 'Guests of every age', text: 'Easy for nan, irresistible for the cousins.' },
      { icon: 'Images', title: 'Online gallery', text: 'Every photo in one place once the confetti settles.' },
      { icon: 'Clock', title: 'Flexible hire', text: 'Drinks reception, evening party, or the whole day.' },
    ],
    booths: ['magic-mirror-photo-booth', 'enclosed-photo-booth', 'selfie-pod', 'letterbox-selfie-pod'],
  },
  {
    slug: 'parties',
    name: 'Parties',
    emoji: '🎉',
    tone: 'sun',
    headline: 'Any excuse to pull a silly face.',
    blurb:
      'Birthdays, charity events, Christmas parties and every special occasion. Props, pulses of slow-motion and a queue of people wanting “just one more go”. We handle setup and collection, you handle the cake.',
    points: [
      { icon: 'PartyPopper', title: 'Props galore', text: 'Fun props that turn everyone into a photographer’s dream.' },
      { icon: 'Zap', title: 'Share instantly', text: 'AirDrop, WhatsApp, email and QR sharing where available.' },
      { icon: 'Palette', title: 'Your party, your look', text: 'Personalised overlays with names, ages and dates.' },
      { icon: 'Cake', title: 'All ages welcome', text: 'From kids’ parties to milestone birthdays.' },
    ],
    booths: ['360-video-booth', 'selfie-pod', 'enclosed-photo-booth', 'magic-mirror-photo-booth'],
  },
  {
    slug: 'proms',
    name: 'Proms',
    emoji: '🪩',
    tone: 'grape',
    headline: 'Red-carpet energy, leavers’ night.',
    blurb:
      'Proms and school leavers’ parties are big nights and the photos should match. The 360 Video Booth and Magic Mirror bring the glam, with personalised overlays for your school, year or theme.',
    points: [
      { icon: 'Star', title: 'Glam lighting', text: 'Professional studio lighting that makes everyone shine.' },
      { icon: 'GraduationCap', title: 'Leavers’ keepsakes', text: 'Custom overlays with your school or year group.' },
      { icon: 'Video', title: '360 slow-mo', text: 'Spin clips guests will post before the night is over.' },
      { icon: 'MessageCircle', title: 'Talk to us', text: 'Tell us your numbers and venue and we’ll suggest the right booth.' },
    ],
    booths: ['360-video-booth', 'magic-mirror-photo-booth', 'enclosed-photo-booth', 'selfie-pod'],
  },
  {
    slug: 'corporate',
    name: 'Corporate',
    emoji: '🏢',
    tone: 'volt',
    headline: 'Brand moments people actually want to share.',
    blurb:
      'Launches, conferences, award nights and Christmas parties. Fully insured, with bespoke branding. Branded overlays and 360 video put your company in the content your guests post themselves.',
    points: [
      { icon: 'Building2', title: 'Bespoke branding', text: 'Logos, colours and hashtags on photo and video overlays.' },
      { icon: 'Share2', title: 'Shareable content', text: 'Instant digital sharing and an online gallery after the event.' },
      { icon: 'Video', title: '360 with your brand', text: 'Bespoke branding available on 360 video clips.' },
      { icon: 'ShieldCheck', title: 'Fully insured', text: 'Reliable, professional service from first enquiry to the event itself.' },
    ],
    booths: ['360-video-booth', 'selfie-pod', 'letterbox-selfie-pod', 'enclosed-photo-booth'],
  },
];

export const getEvent = (slug: string) => eventTypes.find((e) => e.slug === slug);
