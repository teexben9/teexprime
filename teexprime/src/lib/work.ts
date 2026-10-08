import { getCollection } from 'astro:content';

/** Published case studies, in display order. */
export const getWork = async () =>
  (await getCollection('work', ({ data }) => !data.draft)).sort((a, b) => a.data.order - b.data.order);
