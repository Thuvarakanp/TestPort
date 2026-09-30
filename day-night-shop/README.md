# Thuvarakan | Day Shop & Night Shop

Complete source for the current portfolio, including both themes, opening-door animation, the merged interactive career shelves, résumé-based work overviews, toolkit, education and contact links.

## Run locally

Extract this ZIP. Open day-night-shop/index.html in a browser.
No npm installation or build step is needed.

For a local web server, run these commands inside the extracted folder:

    cd day-night-shop
    python3 -m http.server 8000

On Windows, use `py -m http.server 8000` if needed.
Then open http://localhost:8000.

## Files

- index.html: all page content, contact links and career shelves.
- shared.css: shared layout, dialogs and motion styles.
- midnight.css: original shop styling.
- entrance.css: storefront, door geometry and scroll animation styles.
- shop-theme.css: day/night styling and current career, toolkit and education layouts.
- shared.js: project dialogs, career shelf selection, motion switch and interactions.
- entrance.js: scroll-controlled entrance and project images.
- shop-init.js: loads the saved theme before page rendering; defaults to Day Shop.
- shop-theme.js: theme switch and preference saving.
- assets/: all bundled portfolio images.

## Edit content

Edit text and links in index.html. Edit project details in the projectData object in shared.js. Career shelves are native details elements in index.html.

The portfolio uses your supplied résumé for earlier employment and your stated current QA role. The QA start date is not specified. Update earlier role end dates and education status when you have current details.

## Images and animation

The storefront's open and closed images are registered to the door crop coordinates in entrance.css. Replacing those images with a different composition requires adjusting the crop values. Day and night storefront assets are included, alongside the studio portrait.

Motion can be paused and respects the browser's reduced-motion preference. Career shelves support keyboard use and remain available without JavaScript. Contact links use mailto and tel; there is no contact form backend.

## Deploy

Upload the contents of day-night-shop to any static website host. The entry file is index.html. There are no dependencies, credentials or backend services.

Source snapshot: 8104938b66a4c5d76ce66c3f5db834ebe0ddceb0
