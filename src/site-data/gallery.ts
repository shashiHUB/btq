export interface GalleryImage {
  url: string;
  alt: string;
  category: 'boutique' | 'tailoring';
}

export const galleryImages: GalleryImage[] = [
  { url: '/src/site-data/imgs/boutique/photo-1501339847302-ac426a4a7cbb.jpg', alt: 'Boutique Collection 1', category: 'boutique' },
  { url: '/src/site-data/imgs/boutique/chikka.JPG', alt: 'Boutique Collection 2', category: 'boutique' },
  { url: '/src/site-data/imgs/boutique/photo-1442550528053-c431ecb55509.jpg', alt: 'Boutique Collection 3', category: 'boutique' },
  { url: '/src/site-data/imgs/boutique/photo-1495474472287-4d71bcdd2085.jpg', alt: 'Boutique Collection 4', category: 'boutique' },
  { url: '/src/site-data/imgs/tailoring/s-group-2.jpg', alt: 'Tailoring Collection 1', category: 'tailoring' },
  { url: '/src/site-data/imgs/tailoring/photo-1515283709260-ee29296f1534.jpg', alt: 'Tailoring Collection 2', category: 'tailoring' },
  { url: '/src/site-data/imgs/tailoring/photo-1611854779393-1b2da9d400fe.jpg', alt: 'Tailoring Collection 3', category: 'tailoring' },
  { url: '/src/site-data/imgs/tailoring/s-group-1.jpg', alt: 'Tailoring Collection 4', category: 'tailoring' }
];