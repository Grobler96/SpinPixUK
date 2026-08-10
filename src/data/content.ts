export type Testimonial = {
  name: string;
  role: string;
  event: string;
  rating: number;
  text: string;
};

export const testimonials: Testimonial[] = [];

export type FAQ = { q: string; a: string; category: string };

export const faqs: FAQ[] = [
  {
    category: 'Booking',
    q: 'How far in advance should I book?',
    a: 'We recommend booking 4–6 weeks ahead for weekends and peak season (May–September). For last-minute enquiries we always try our best to accommodate — give us a call and we will check availability.',
  },
  {
    category: 'Booking',
    q: 'What is included in the price?',
    a: 'Every package includes delivery and setup, a professional attendant or operator, your chosen booth, a props box (where applicable), unlimited digital sessions, and a private online guest gallery. Print packages include unlimited prints.',
  },
  {
    category: 'Booking',
    q: 'Do you require a deposit?',
    a: 'Yes — a £75 deposit secures your date. The balance is due 14 days before your event. Deposits are non-refundable but can be transferred to another date with 7 days’ notice.',
  },
  {
    category: 'Setup',
    q: 'How much space do you need?',
    a: 'A 2m × 2m area is ideal for most booths. The 360° Video Booth needs approximately 2.5m × 2.5m for the platform and arm clearance. We will confirm exact requirements when you book.',
  },
  {
    category: 'Setup',
    q: 'How long does setup take?',
    a: 'Most booths take 30–45 minutes to set up and test. We arrive 60–90 minutes before your start time so everything is ready before the first guest arrives.',
  },
  {
    category: 'Setup',
    q: 'Do you need power?',
    a: 'Yes — a standard UK 13-amp socket within 5 metres of the booth. We bring extension leads and cable ramps. For outdoor events we can arrange a quiet generator on request.',
  },
  {
    category: 'Experience',
    q: 'Can we customise the prints and overlays?',
    a: 'Absolutely. Share your colours, fonts, names, dates or logo and our design team will create a bespoke overlay. One round of revisions is included free of charge.',
  },
  {
    category: 'Experience',
    q: 'How do guests get their photos and videos?',
    a: 'Guests can scan a QR code to instantly download their media, share via AirDrop, or receive prints on the spot. After the event, everything is uploaded to a private online gallery for you and your guests.',
  },
  {
    category: 'Experience',
    q: 'Is there an attendant the whole time?',
    a: 'Yes. Every booking includes a professional attendant who manages the booth, helps guests, refills print media and keeps the queue moving — so you never have to lift a finger.',
  },
  {
    category: 'Logistics',
    q: 'What areas do you cover?',
    a: 'We are based in Sheffield and cover the whole of the UK. Travel within 25 miles of Sheffield is free. For events further afield we add a transparent travel contribution — you will see this in your quote.',
  },
  {
    category: 'Logistics',
    q: 'Are you insured?',
    a: 'Yes. We carry £5 million public liability insurance and can provide certificates and risk assessments for venues on request. All staff are DBS-checked for school and prom events.',
  },
  {
    category: 'Logistics',
    q: 'Can the booth be set up outdoors?',
    a: 'Yes, provided there is a solid, level surface and we can erect a weighted gazebo or marquee in case of rain. We will discuss the setup with you during booking.',
  },
];

export const faqCategories = ['All', 'Booking', 'Setup', 'Experience', 'Logistics'];

export type Benefit = { icon: string; title: string; text: string };

export const benefits: Benefit[] = [
  { icon: 'Truck', title: 'Nationwide delivery', text: 'Free within 25 miles of Sheffield, transparent travel costs beyond.' },
  { icon: 'UserCheck', title: 'Professional attendants', text: 'Friendly, uniformed hosts who keep your guests smiling all night.' },
  { icon: 'ShieldCheck', title: 'Fully insured', text: '£5m public liability and DBS-checked staff for peace of mind.' },
  { icon: 'Zap', title: 'Instant sharing', text: 'QR codes and AirDrop so content is shared the second it’s captured.' },
  { icon: 'Palette', title: 'Bespoke overlays', text: 'Custom designs matched to your colours, theme and branding.' },
  { icon: 'Images', title: 'Full guest gallery', text: 'Every photo and video in one private online gallery after the event.' },
];

export type ProcessStep = { step: string; title: string; text: string; icon: string };

export const processSteps: ProcessStep[] = [
  { step: '01', title: 'Enquire', text: 'Tell us about your event via our quote form or give us a call. We respond within 24 hours.', icon: 'MessageCircle' },
  { step: '02', title: 'Tailored quote', text: 'We send a transparent, itemised quote and confirm availability for your date.', icon: 'FileText' },
  { step: '03', title: 'Secure your date', text: 'A £75 deposit locks in your booking. We start designing your custom overlay.', icon: 'CalendarCheck' },
  { step: '04', title: 'We arrive & set up', text: 'Our team arrives 60–90 minutes early, sets up and tests everything before guests arrive.', icon: 'Truck' },
  { step: '05', title: 'Enjoy the moment', text: 'Your attendant runs the booth all night. Guests capture, share and laugh.', icon: 'PartyPopper' },
  { step: '06', title: 'Receive your gallery', text: 'Within 48 hours you get a private link to every photo and video from your event.', icon: 'Images' },
];

export type Stat = { value: string; label: string; icon: string };

export const stats: Stat[] = [
  { value: '1,800+', label: 'Events hosted', icon: 'PartyPopper' },
  { value: '4.9★', label: 'Average rating', icon: 'Star' },
  { value: '6 yrs', label: 'Trusted across the UK', icon: 'CalendarCheck' },
  { value: '48 hrs', label: 'Gallery delivery', icon: 'Images' },
];
