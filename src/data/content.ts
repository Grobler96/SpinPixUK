export type FAQ = { q: string; a: string; category: 'Booking' | 'On the day' | 'Sharing' };

export const faqs: FAQ[] = [
  {
    category: 'Booking',
    q: 'How do I get a quote?',
    a: 'Fill in the enquiry form or message us on 07985 732238. Tell us your date, venue and the kind of event and we’ll come back to you with options and pricing.',
  },
  {
    category: 'Booking',
    q: 'Which areas do you cover?',
    a: 'We’re based in West Yorkshire and cover the whole of the UK. Get in touch with your venue and we’ll confirm.',
  },
  {
    category: 'Booking',
    q: 'Which booth should I choose?',
    a: 'Not sure? Tell us about your event and guests and we’ll recommend something. The Selfie Pod suits almost anything, the 360 Video Booth is a showstopper for parties, proms and brand events, and the Magic Mirror is great where you want a bit of elegance.',
  },
  {
    category: 'On the day',
    q: 'Do you set up and collect?',
    a: 'Yes. Friendly setup and collection is part of every hire, and an attendant is provided where applicable for your chosen booth.',
  },
  {
    category: 'On the day',
    q: 'Can the booth be left running all day?',
    a: 'The Letterbox Selfie Pod is designed for unattended all-day hire. The other booths are flexible, so tell us what you need.',
  },
  {
    category: 'On the day',
    q: 'Can you personalise the photos?',
    a: 'Yes. Every booth supports personalised photo overlays, and the 360 Video Booth supports bespoke branding for corporate events.',
  },
  {
    category: 'Sharing',
    q: 'How do guests get their photos?',
    a: 'Guests can share instantly by AirDrop, WhatsApp, email or QR code where available, and you get an online gallery after the event. Print packages are available on the Magic Mirror and Enclosed Photo Booth.',
  },
];

export const steps = [
  { n: '1', title: 'Say hello', text: 'Send us your date, venue and a few details about your event.', icon: 'MessageCircle' },
  { n: '2', title: 'Pick your booth', text: 'We’ll recommend the best fit and send you a quote.', icon: 'Camera' },
  { n: '3', title: 'We set up', text: 'We deliver, set up and test everything so you don’t have to.', icon: 'Truck' },
  { n: '4', title: 'Everyone shares', text: 'Guests snap, share instantly, and you get the online gallery.', icon: 'Images' },
];
