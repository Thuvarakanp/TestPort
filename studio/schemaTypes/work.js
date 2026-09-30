import { defineField, defineType } from 'sanity';

// "03 / On the shelves": one document per card. Opening a card shows the fields under "Details".
export const work = defineType({
  name: 'work',
  title: 'Work (On the shelves)',
  type: 'document',
  groups: [
    { name: 'card', title: 'Card', default: true },
    { name: 'details', title: 'Details (popup)' },
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'card', validation: (r) => r.required() }),
    defineField({ name: 'company', title: 'Company / label (top-left small text)', type: 'string', group: 'card', description: 'e.g. SMARTZI LANKA' }),
    defineField({ name: 'kind', title: 'Kind (top-right small text)', type: 'string', group: 'card', description: 'e.g. UI/UX DESIGN' }),
    defineField({
      name: 'image', title: 'Card image', type: 'image', group: 'card', options: { hotspot: true },
      description: 'Optional. If empty, the coloured cover below is shown instead.',
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({
      name: 'cover', title: 'Cover colour (used when there is no image)', type: 'string', group: 'card', initialValue: 'cover-regression',
      options: { list: [
        { title: 'Green', value: 'cover-regression' },
        { title: 'Mustard', value: 'cover-access' },
        { title: 'Terracotta', value: 'cover-explore' },
      ], layout: 'radio' },
    }),
    defineField({ name: 'eyebrow', title: 'Cover eyebrow', type: 'string', group: 'card', description: 'e.g. 01 / PRODUCT INTERFACES' }),
    defineField({ name: 'line1', title: 'Cover headline, line 1', type: 'string', group: 'card' }),
    defineField({ name: 'line2', title: 'Cover headline, line 2', type: 'string', group: 'card' }),
    defineField({ name: 'tags', title: 'Cover tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, group: 'card' }),
    defineField({ name: 'actionLabel', title: 'Button text', type: 'string', group: 'card', initialValue: 'Explore the work' }),
    defineField({ name: 'order', title: 'Order', type: 'number', group: 'card', description: 'Lower numbers appear first.', initialValue: 10 }),

    defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 3, group: 'details' }),
    defineField({ name: 'problem', title: 'The question', type: 'text', rows: 3, group: 'details' }),
    defineField({ name: 'approach', title: 'The direction', type: 'text', rows: 3, group: 'details' }),
    defineField({ name: 'details', title: 'Scope', type: 'string', group: 'details', description: 'Short list, e.g. Visual direction · Illustration · Logos' }),
    defineField({ name: 'nextLabel', title: 'Last section heading', type: 'string', group: 'details', initialValue: 'Role & period' }),
    defineField({ name: 'next', title: 'Last section text', type: 'text', rows: 2, group: 'details' }),
    defineField({ name: 'footnote', title: 'Footnote', type: 'string', group: 'details', initialValue: 'Work overview based on my résumé.' }),
  ],
  preview: { select: { title: 'title', subtitle: 'company', media: 'image' } },
});
