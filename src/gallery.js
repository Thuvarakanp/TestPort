// Add your designs here. Drop the image into public/gallery/ and set `src: '/gallery/your-file.webp'`.
// Items without a `src` render as a coloured placeholder tile until you add the image.
// `ratio` is width / height and controls the tile shape in the masonry grid.
export const galleryCategories = ['All', 'UI/UX', 'Graphic design', 'Branding', 'Concept'];

export const gallery = [
  { id: 'storefront-night', title: 'Storefront at night', category: 'Concept', year: '2025', project: 'Day & Night portfolio', src: '/images/store.webp', ratio: 1.5, blurb: 'The night version of the shop that frames this portfolio.' },
  { id: 'taxi-booking', title: 'Taxi booking app', category: 'UI/UX', year: '2022–23', project: 'Smartzi Lanka', ratio: 0.8, color: '#244734', ink: '#f1efd9', blurb: 'B2B taxi booking interface.' },
  { id: 'storefront-day', title: 'Storefront by day', category: 'Concept', year: '2025', project: 'Day & Night portfolio', src: '/images/store-owner-day.webp', ratio: 1.5, blurb: 'The day version, with the owner welcoming visitors in.' },
  { id: 'driver-app', title: 'Driver app', category: 'UI/UX', year: '2022–23', project: 'Smartzi Lanka', ratio: 1, color: '#deb865', ink: '#243527', blurb: 'Screens for the driver-side application.' },
  { id: 'food-graphics', title: 'Food ordering graphics', category: 'Graphic design', year: '2019–20', project: 'Cookoo', ratio: 1.25, color: '#b04a2a', ink: '#fbf1e2', blurb: 'Product illustrations, app graphics and layouts.' },
  { id: 'museum', title: 'Museum poster', category: 'Graphic design', year: '2025', project: 'Personal', src: '/images/museum.webp', ratio: 1.33, blurb: 'A personal graphic exploration.' },
  { id: 'cyber-marketing', title: 'Cybersecurity marketing', category: 'Graphic design', year: '2016–17', project: 'Cyberarch', ratio: 0.85, color: '#2b3a5a', ink: '#e8eefb', blurb: 'Marketing materials for security and forensics services.' },
  { id: 'logo-set', title: 'Logo set', category: 'Branding', year: '2019–20', project: 'Cookoo', ratio: 1, color: '#e9e4d2', ink: '#1d2a20', blurb: 'Logo explorations.' },
];
