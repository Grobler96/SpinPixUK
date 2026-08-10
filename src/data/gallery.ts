export type GalleryImage = {
  src: string;
  alt: string;
  category: 'Weddings' | 'Parties' | 'Corporate' | 'Proms';
};

export const galleryImages: GalleryImage[] = [
  { src: 'https://images.pexels.com/photos/1779415/pexels-photo-1779415.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Wedding couple at a photo booth', category: 'Weddings' },
  { src: 'https://images.pexels.com/photos/796620/pexels-photo-796620.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Birthday party guests laughing in a booth', category: 'Parties' },
  { src: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Corporate event booth with branded overlay', category: 'Corporate' },
  { src: 'https://images.pexels.com/photos/1468322/pexels-photo-1468322.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Prom students posing in glam booth', category: 'Proms' },
  { src: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Wedding guests sharing a photo strip', category: 'Weddings' },
  { src: 'https://images.pexels.com/photos/1721349/pexels-photo-1721349.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Party crowd around a 360 video booth', category: 'Parties' },
  { src: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Conference attendees at a branded booth', category: 'Corporate' },
  { src: 'https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Prom couple on the 360 platform', category: 'Proms' },
  { src: 'https://images.pexels.com/photos/1024312/pexels-photo-1024312.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Bride and groom printing photos', category: 'Weddings' },
  { src: 'https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Friends with props at a birthday booth', category: 'Parties' },
  { src: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Brand activation with custom frame', category: 'Corporate' },
  { src: 'https://images.pexels.com/photos/1456613/pexels-photo-1456613.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Prom group with magic mirror', category: 'Proms' },
  { src: 'https://images.pexels.com/photos/1779431/pexels-photo-1779431.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Wedding audio guestbook phone', category: 'Weddings' },
  { src: 'https://images.pexels.com/photos/458676/pexels-photo-458676.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Anniversary couple in the glam booth', category: 'Parties' },
  { src: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Corporate gala booth with logo overlay', category: 'Corporate' },
  { src: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Leavers’ prom photo strip', category: 'Proms' },
];

export const galleryCategories = ['All', 'Weddings', 'Parties', 'Corporate', 'Proms'] as const;
