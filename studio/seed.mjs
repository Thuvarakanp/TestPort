// Seeds the dataset with the content that is currently bundled with the site.
// Usage (from /studio):  node seed.mjs > seed.ndjson && npx sanity dataset import seed.ndjson production --replace
import { fallbackWork } from '../src/data.js';
import { gallery } from '../src/gallery.js';

const out = [];
fallbackWork.forEach((w, i) => {
  out.push({
    _id: `work-${w.id}`, _type: 'work', title: w.title, company: w.company, kind: w.kind, cover: w.cover, eyebrow: w.eyebrow,
    line1: w.lines[0], line2: w.lines[1], tags: w.tags, actionLabel: w.actionLabel || 'Explore the work',
    intro: w.detail.intro, problem: w.detail.problem, approach: w.detail.approach, details: w.detail.details,
    next: w.detail.next, nextLabel: w.detail.nextLabel, footnote: w.detail.footnote, order: (i + 1) * 10,
  });
});
gallery.forEach((g, i) => {
  out.push({
    _id: `design-${g.id}`, _type: 'design', title: g.title, category: g.category, year: g.year, project: g.project, blurb: g.blurb,
    color: g.color, ink: g.ink, order: (i + 1) * 10,
  });
});
console.log(out.map((d) => JSON.stringify(d)).join('\n'));
