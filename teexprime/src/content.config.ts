import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One Markdown file per case study in src/content/work/.
// Set draft: true to keep a case study off the site until it is ready.
const work = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/work' }),
  schema: z.object({
    client: z.string(),
    industry: z.string(),
    summary: z.string(),
    problem: z.string(),
    approach: z.string(),
    solution: z.string(),
    features: z.array(z.string()),
    outcome: z.string(),
    url: z.string().url().optional(),
    // Image paths inside /public, e.g. /work/orkiu/home.jpg. The first one is the card image.
    images: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work };
