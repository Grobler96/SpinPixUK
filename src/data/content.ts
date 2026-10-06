export type FAQ = { q: string; a: string; category: 'Booking' | 'On the day' | 'Sharing' };

export const faqs: FAQ[] = [
  {
    category: 'Booking',
    q: 'How do I get a quote?',
    a: 'Get in touch through the enquiry form, Facebook, Instagram, email or on 07985 732238. We’ll chat about your event, venue and date, recommend the most suitable booth and send you a quotation.',
  },
  {
    category: 'Booking',
    q: 'How do I secure my date?',
    a: 'Once you’re happy with your quote, a £50 booking fee secures the date. The remaining balance is due the day before the event.',
  },
  {
    category: 'Booking',
    q: 'Which areas do you cover?',
    a: 'We’re based in West Yorkshire and cover the whole of the UK, with travel available throughout Yorkshire and surrounding areas. Tell us your venue and we’ll confirm.',
  },
  {
    category: 'Booking',
    q: 'Are there any hidden costs?',
    a: 'No. We offer competitive pricing with no hidden costs, and your quote sets out what’s included.',
  },
  {
    category: 'Booking',
    q: 'Are you insured?',
    a: 'Yes, we’re fully insured.',
  },
  {
    category: 'Booking',
    q: 'Which booth should I choose?',
    a: 'Not sure? Tell us about your event and guests and we’ll recommend one. The Selfie Pod suits almost anything, the 360 Video Booth is a showstopper for parties, proms and brand events, and the Magic Mirror adds a touch of elegance.',
  },
  {
    category: 'On the day',
    q: 'Do you set up and collect?',
    a: 'Yes. Friendly setup and collection is included, and we arrive in plenty of time to set up and test all equipment. An attendant is on hand where applicable.',
  },
  {
    category: 'On the day',
    q: 'Can the booth be left running all day?',
    a: 'The Letterbox Selfie Pod is ideal for unattended all-day hire. Tell us what you need for the other booths.',
  },
  {
    category: 'On the day',
    q: 'Can you personalise the photos?',
    a: 'Yes. We design a custom photo overlay for every booking to match your theme, and bespoke branding is available for corporate events.',
  },
  {
    category: 'Sharing',
    q: 'How do guests get their photos?',
    a: 'Guests can share instantly by AirDrop, WhatsApp, email or QR code where available, and you get an online gallery after the event. Digital-only and print packages are available depending on the booth.',
  },
  {
    category: 'Sharing',
    q: 'Can guests use the booth as much as they like?',
    a: 'Yes, every hire can include unlimited visits during the hire period, with a large selection of fun props.',
  },
];

export const steps = [
  { n: '1', title: 'Get in touch', text: 'Website, Facebook, Instagram, email or phone. We chat about your event, venue and date and recommend the right booth.', icon: 'MessageCircle' },
  { n: '2', title: 'Quote & booking fee', text: 'You get a quotation, and once you’re happy a £50 booking fee secures your date.', icon: 'Camera' },
  { n: '3', title: 'We design your overlay', text: 'We create a personalised photo overlay to match your theme or brand.', icon: 'Palette' },
  { n: '4', title: 'We set up & you enjoy', text: 'We arrive in plenty of time to set up and test everything, with an attendant on hand where applicable.', icon: 'Truck' },
  { n: '5', title: 'Your online gallery', text: 'After the event you get access to your gallery to download and enjoy every photo.', icon: 'Images' },
];
