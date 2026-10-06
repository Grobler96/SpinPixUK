// Single source of truth for brand + contact details
export const site = {
  name: 'SpinPix UK',
  tagline: 'Capture the moment. Spin the fun.',
  description:
    'Family-run photo booth hire company based in West Yorkshire, covering the whole of the UK with modern, high-quality entertainment for weddings, birthdays, corporate events, proms, school leavers’ parties, Christmas parties and all special occasions.',
  phone: '07985 732238',
  phoneHref: 'tel:+447985732238',
  email: 'spinpixuk@gmail.com',
  emailHref: 'mailto:spinpixuk@gmail.com',
  base: 'West Yorkshire',
  coverage: 'Nationwide UK coverage',
  instagram: 'https://www.instagram.com/spinpixuk?igsh=MzdoNWFxc3ZkdTZi',
  facebook: 'https://www.facebook.com/share/1NxxFherc2/',
  google: 'https://share.google/NcfdmORITdOI4FxdL',
} as const;

export const nav = [
  { label: 'Booths', path: '/booths' },
  { label: 'Weddings', path: '/weddings' },
  { label: 'Parties', path: '/parties' },
  { label: 'Proms', path: '/proms' },
  { label: 'Corporate', path: '/corporate' },
  { label: 'About', path: '/about' },
  { label: 'FAQs', path: '/faqs' },
] as const;
