// Central site configuration — single source of truth for brand + contact details
export const site = {
  name: 'SpinPix UK',
  shortName: 'SpinPix',
  tagline: 'Capture the moment. Spin the fun.',
  description:
    'Premium interactive photo booth and 360° video booth experiences for weddings, parties, corporate events and proms across the UK.',
  phone: '0800 069 2424',
  phoneHref: 'tel:+442236942424',
  email: 'hello@spinpix.co.uk',
  emailHref: 'mailto:hello@spinpix.co.uk',
  address: 'Studio 7, The Old Glassworks, Sheffield, S3 8AA',
  hours: 'Mon–Sat: 8am–8pm · Sun: 10am–4pm',
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  tiktok: 'https://tiktok.com',
  serviceArea: 'Nationwide UK coverage',
  rating: 4.9,
  reviewCount: 327,
  yearsActive: 6,
  eventsHosted: 1800,
} as const;

export const primaryNav = [
  { label: 'Weddings', path: '/weddings' },
  { label: 'Parties', path: '/parties' },
  { label: 'Corporate', path: '/corporate' },
  { label: 'Proms', path: '/proms' },
  { label: 'Experiences', path: '/experiences' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'About', path: '/about' },
  { label: 'FAQs', path: '/faqs' },
] as const;

export const footerNav = {
  Experiences: [
    { label: 'Weddings', path: '/weddings' },
    { label: 'Parties', path: '/parties' },
    { label: 'Corporate', path: '/corporate' },
    { label: 'Proms', path: '/proms' },
    { label: 'All Experiences', path: '/experiences' },
  ],
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'FAQs', path: '/faqs' },
    { label: 'Contact', path: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Accessibility', path: '/accessibility' },
  ],
} as const;

export type NavItem = { label: string; path: string };
