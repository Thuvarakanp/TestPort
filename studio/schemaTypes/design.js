import { defineField, defineType } from 'sanity';

// "Gallery / Selected designs": one document per design tile.
export const design = defineType({
  name: 'design',
  title: 'Gallery design',
  type: 'document',
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'image', title: 'Image', type: 'image', options: { hotspot: true },
      description: 'The tile shape follows the image proportions. Leave empty to show a coloured placeholder.',
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({
      name: 'category', title: 'Category', type: 'string', validation: (r) => r.required(),
      description: 'Categories become the filter chips. Pick one or type a new one.',
      options: { list: ['UI/UX', 'Graphic design', 'Branding', 'Concept'] },
    }),
    defineField({ name: 'year', title: 'Year', type: 'string', description: 'e.g. 2024 or 2022–23' }),
    defineField({ name: 'project', title: 'Project / client', type: 'string' }),
    defineField({ name: 'blurb', title: 'Short description', type: 'text', rows: 3 }),
    defineField({ name: 'order', title: 'Order', type: 'number', description: 'Lower numbers appear first.', initialValue: 10 }),
    defineField({ name: 'color', title: 'Placeholder background (hex)', type: 'string', description: 'Only used when there is no image.' }),
    defineField({ name: 'ink', title: 'Placeholder text colour (hex)', type: 'string' }),
  ],
  preview: { select: { title: 'title', subtitle: 'category', media: 'image' } },
});
