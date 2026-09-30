# Thuvarakan | Day Shop & Night Shop

React (Vite) portfolio with a day/night theme and a scroll-driven storefront entrance.

## Develop

    npm install
    npm run dev       # http://localhost:5173
    npm run build     # outputs dist/
    npm run preview

## Deploy to Vercel

Import the repo in Vercel. The Vite preset is detected automatically (`vercel.json` also pins it):
build command `npm run build`, output directory `dist`. No environment variables needed.

## Structure

- `src/App.jsx`: page sections, theme and motion state.
- `src/components/`: Entrance (scroll animation), CareerShelves, Dialogs, Reveal.
- `src/data.js`: career, projects, toolkit and links. Edit content here.
- `src/styles/`: original CSS, unchanged.
- `public/images/`: portfolio images.
- `legacy/day-night-shop/`: the original static site, kept for reference.
