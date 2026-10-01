import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes/index.js';

// Set these in studio/.env (see .env.example) or replace the fallbacks after running `npx sanity init`.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'ijkecloq';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

export default defineConfig({
  name: 'default',
  title: 'Thuvarakan Portfolio',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
