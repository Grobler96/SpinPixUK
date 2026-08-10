// Central site configuration — single source of truth for brand + contact details
export const site = {
  name: 'SpinPix UK',
  shortName: 'SpinPix',
  tagline: 'Capture the moment. Spin the fun.',
  description:
    'Family-run photo booth hire across the UK, bringing modern, high-quality entertainment to weddings, birthdays, corporate events, proms and every special occasion.',
  phone: '07985 732238',
  phoneHref: 'tel:+447985732238',
  email: 'spinpixuk@gmail.com',
  emailHref: 'mailto:spinpixuk@gmail.com',
  address: 'West Yorkshire, UK',
  hours: 'By appointment · Nationwide UK coverage',
  instagram: 'https://www.instagram.com/spinpixuk?igsh=MzdoNWFxc3ZkdTZi',
  facebook: 'https://www.facebook.com/share/1NxxFherc2/',
  googleBusinessProfile: 'https://share.google/NcfdmORITdOI4FxdL',
  serviceArea: 'West Yorkshire · Nationwide UK coverage',
  rating: 0,
  reviewCount: 0,
  yearsActive: 0,
  eventsHosted: 0,
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
