import { useEffect, useState } from 'react';

// Content comes from Sanity when VITE_SANITY_PROJECT_ID is set; otherwise the bundled fallback data is used.
const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID;
const DATASET = import.meta.env.VITE_SANITY_DATASET || 'production';
const API_VERSION = '2024-01-01';

export const cmsEnabled = Boolean(PROJECT_ID);

export async function sanityFetch(query) {
  const url = `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sanity ${res.status}`);
  return (await res.json()).result;
}

// Resize/optimise an uploaded image through Sanity's image CDN.
export const sized = (url, w) => (url ? `${url}?w=${w}&auto=format&q=80` : url);

// Returns `fallback` immediately, then swaps in CMS content once it arrives. Empty or failed responses keep the fallback.
export function useCms(query, map, fallback) {
  const [data, setData] = useState(fallback);
  useEffect(() => {
    if (!cmsEnabled) return;
    let alive = true;
    sanityFetch(query)
      .then((rows) => { if (alive && Array.isArray(rows) && rows.length) setData(map(rows)); })
      .catch((e) => console.warn('CMS unavailable, using bundled content.', e));
    return () => { alive = false; };
  }, [query]);
  return data;
}

export const WORK_QUERY = `*[_type=="work"]|order(order asc){
  _id,title,company,kind,cover,eyebrow,line1,line2,tags,intro,problem,approach,details,next,nextLabel,footnote,actionLabel,
  "image":image.asset->url,"imageAlt":image.alt,"imageDay":imageDay.asset->url,"imageNight":imageNight.asset->url
}`;

export const DESIGN_QUERY = `*[_type=="design"]|order(order asc){
  _id,title,category,year,project,blurb,color,ink,
  "src":image.asset->url,"ratio":image.asset->metadata.dimensions.aspectRatio,"alt":image.alt
}`;

export const mapWork = (rows) =>
  rows.map((r) => ({
    id: r._id, cover: r.cover || 'cover-regression', eyebrow: r.eyebrow || '', lines: [r.line1 || '', r.line2 || ''], tags: r.tags || [],
    company: r.company || '', kind: r.kind || '', title: r.title, actionLabel: r.actionLabel || 'Explore the work',
    image: r.image ? sized(r.image, 900) : null, imageDay: r.imageDay ? sized(r.imageDay, 900) : null, imageNight: r.imageNight ? sized(r.imageNight, 900) : null,
    imageAlt: r.imageAlt || r.title,
    detail: {
      type: [r.company, r.kind].filter(Boolean).join(' / '), title: r.title, intro: r.intro, problem: r.problem, approach: r.approach,
      details: r.details, next: r.next, nextLabel: r.nextLabel || 'Role & period', footnote: r.footnote || 'Work overview based on my résumé.',
    },
  }));

export const mapDesigns = (rows) =>
  rows.map((r) => ({
    id: r._id, title: r.title, category: r.category || 'Design', year: r.year || '', project: r.project || '', blurb: r.blurb || '',
    src: r.src ? sized(r.src, 1400) : undefined, ratio: r.ratio || 1.25, color: r.color || '#244734', ink: r.ink || '#f1efd9',
  }));
