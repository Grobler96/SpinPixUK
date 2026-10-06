export type Review = { name: string; source: 'Facebook' | 'Google'; stars?: 5; text: string; context?: string };

// Quotes taken from the business's Facebook and Google reviews (lightly trimmed, obvious typos fixed).
export const reviews: Review[] = [
  { name: 'Marina F.', source: 'Google', stars: 5, context: '18th birthday', text: 'Amazing! This was booked for my 18th and everybody said it was the best part of the night and it really was! Thank you.' },
  { name: 'Michelle R.', source: 'Facebook', context: 'School leavers’ party', text: 'Would highly recommend. My daughter came home with lots of lovely pictures with all her friends from their leavers party. She said she loved the magic mirror.' },
  { name: 'Nicola B.', source: 'Facebook', context: 'Party', text: 'Such a lovely memento of my party! Ian was professional from enquiry to completion and provided an amazing gallery which showed all our loved ones having a great time.' },
  { name: 'Graham H.', source: 'Facebook', context: 'Birthday', text: 'SpinPix have recently provided their camper van photobooth for my birthday. It looked amazing and definitely was a talking point.' },
  { name: 'Google reviewer', source: 'Google', stars: 5, context: 'Party', text: 'Absolutely the best for any party. Money well spent. All ages enjoyed themselves. Ian was fantastic.' },
];
