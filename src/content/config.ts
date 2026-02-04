import { defineCollection, z } from 'astro:content';

const ideasCollection = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    status: z.enum(['ideating', 'in-progress', 'production', 'archived']).default('ideating'),
    emoji: z.string().default('💡'),
    url: z.string().url().optional(),
    quality: z.enum(['okay', 'good', 'amazing']).optional(),
    categories: z.array(z.string()).optional(),
    relatedSlugs: z.array(z.string()).optional(),
    requirements: z.array(z.string()).optional(),
  }),
});

export const collections = {
  ideas: ideasCollection,
};
