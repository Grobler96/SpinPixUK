export type EventType = {
  slug: string;
  name: string;
  tagline: string;
  heroImage: string;
  blurb: string;
  recommendedServices: string[];
  highlights: { icon: string; title: string; text: string }[];
  galleryImages: string[];
};

export const eventTypes: EventType[] = [
  {
    slug: 'weddings',
    name: 'Weddings',
    tagline: 'Romantic memories, captured frame by frame',
    heroImage:
      'https://images.pexels.com/photos/1779415/pexels-photo-1779415.jpeg?auto=compress&cs=tinysrgb&w=1600',
    blurb:
      'From the first dance to the last guest, our booths give your wedding a playful, elegant focal point. Custom overlays match your stationery, a dedicated attendant keeps the queue flowing, and every print becomes a keepsake.',
    recommendedServices: ['classic-photo-booth', 'glam-robo-booth', 'audio-guestbook', 'magic-mirror'],
    highlights: [
      { icon: 'Heart', title: 'Bespoke overlays', text: 'Names, dates and colours matched to your theme.' },
      { icon: 'Users', title: 'Dedicated attendant', text: 'A friendly host keeps every guest smiling.' },
      { icon: 'Gift', title: 'Keepsake prints', text: 'Guests leave with a print; you get the full gallery.' },
      { icon: 'Clock', title: 'Flexible timing', text: 'Book for the drinks reception, evening, or both.' },
    ],
    galleryImages: [
      'https://images.pexels.com/photos/1779415/pexels-photo-1779415.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024312/pexels-photo-1024312.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1779431/pexels-photo-1779431.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
  },
  {
    slug: 'parties',
    name: 'Parties',
    tagline: 'Birthdays, milestones and everything in between',
    heroImage:
      'https://images.pexels.com/photos/796620/pexels-photo-796620.jpeg?auto=compress&cs=tinysrgb&w=1600',
    blurb:
      'Milestone birthdays, anniversaries, engagements — any excuse to celebrate. Our booths bring instant energy with props, GIFs and a soundtrack that keeps the dance floor buzzing.',
    recommendedServices: ['glam-robo-booth', '360-video-booth', 'classic-photo-booth', 'magic-mirror'],
    highlights: [
      { icon: 'Music', title: 'Soundtrack-ready', text: 'Booths sync with your playlist for share-ready clips.' },
      { icon: 'Palette', title: 'Theme-matched props', text: 'Curated prop boxes for every decade and dress code.' },
      { icon: 'Zap', title: 'Instant sharing', text: 'QR codes and AirDrop keep the content flowing.' },
      { icon: 'Cake', title: 'All ages welcome', text: 'From kids’ parties to 80th celebrations.' },
    ],
    galleryImages: [
      'https://images.pexels.com/photos/796620/pexels-photo-796620.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1721349/pexels-photo-1721349.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/458676/pexels-photo-458676.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
  },
  {
    slug: 'corporate',
    name: 'Corporate',
    tagline: 'Brand activations that get people talking',
    heroImage:
      'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1600',
    blurb:
      'Product launches, conferences, end-of-year parties — we turn your brand into a moment worth sharing. Custom overlays, branded digital frames and a data-capture option for lead generation.',
    recommendedServices: ['digital-only-booth', '360-video-booth', 'glam-robo-booth', 'classic-photo-booth'],
    highlights: [
      { icon: 'Building2', title: 'Brand-matched overlays', text: 'Logos, colours and campaign hashtags baked in.' },
      { icon: 'BarChart3', title: 'Lead capture', text: 'Optional email capture for post-event follow-up.' },
      { icon: 'Share2', title: 'Social-ready content', text: 'Vertical clips optimised for Reels and TikTok.' },
      { icon: 'ShieldCheck', title: 'Fully insured', text: 'Public liability and risk assessments on request.' },
    ],
    galleryImages: [
      'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
  },
  {
    slug: 'proms',
    name: 'Proms',
    tagline: 'School leavers’ night, captured in style',
    heroImage:
      'https://images.pexels.com/photos/1468322/pexels-photo-1468322.jpeg?auto=compress&cs=tinysrgb&w=1600',
    blurb:
      'Give your leavers’ prom a red-carpet moment. Our Glam Robo Booth and 360° Video Booth are prom favourites — flattering lighting, slow-motion spins and prints for everyone.',
    recommendedServices: ['glam-robo-booth', '360-video-booth', 'magic-mirror', 'classic-photo-booth'],
    highlights: [
      { icon: 'Star', title: 'Red-carpet lighting', text: 'Glam lighting that makes every student shine.' },
      { icon: 'GraduationCap', title: 'Leavers’ keepsakes', text: 'Custom overlays with school name and year.' },
      { icon: 'Users', title: 'High throughput', text: 'We keep a 200+ guest queue moving smoothly.' },
      { icon: 'ShieldCheck', title: 'DBS-checked staff', text: 'All attendants are DBS-checked for schools.' },
    ],
    galleryImages: [
      'https://images.pexels.com/photos/1468322/pexels-photo-1468322.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1456613/pexels-photo-1456613.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
  },
];

export const getEventType = (slug: string) => eventTypes.find((e) => e.slug === slug);
