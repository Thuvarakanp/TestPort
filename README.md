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

## Content management (Sanity)

The **Gallery** and **On the shelves** sections read from Sanity. Without configuration the site uses the bundled content in `src/data.js` and `src/gallery.js`, so it always works.

### Setup status
- Sanity project **Portfolio** (`ijkecloq`), dataset `production`, is created and seeded with the current Work cards and Gallery designs (published).
- CORS allows `http://localhost:5173` and `https://*.vercel.app`. Add your own domain in sanity.io/manage → API → CORS origins if you use one.
- Remaining: add `VITE_SANITY_PROJECT_ID=ijkecloq` (and `VITE_SANITY_DATASET=production`) in Vercel → Project → Settings → Environment Variables, then redeploy.
- Studio: `cd studio && npm install && npm run dev` (localhost:3333), or `npm run deploy` to host it at `<name>.sanity.studio`.

### Setup from scratch (other project)
1. Create a project at https://www.sanity.io/manage (free plan is fine) and note the **Project ID**.
2. In the project settings, **API → CORS origins**, add your Vercel domain and `http://localhost:5173` (no credentials needed, the dataset can stay public).
3. Studio: `cd studio && cp .env.example .env`, put the Project ID in `.env`, then `npm install` and `npm run dev`. Log in with `npx sanity login` first if asked.
4. Optional, load the current content as starting data (images are uploaded afterwards in the Studio):
   `node seed.mjs > seed.ndjson && npx sanity dataset import seed.ndjson production --replace`
5. Publish the Studio at `your-name.sanity.studio`: `npm run deploy`.
6. In Vercel, add the environment variables `VITE_SANITY_PROJECT_ID` (and `VITE_SANITY_DATASET` if not `production`), then redeploy.

### Day to day
Open the Studio, edit a **Work** or **Gallery design** document and press **Publish**. The site reads the Sanity CDN on each visit, so changes appear on reload without a rebuild. Lower `order` numbers appear first. Gallery filter chips are built from the categories you use.
