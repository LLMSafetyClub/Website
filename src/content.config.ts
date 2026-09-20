import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['meeting', 'workshop', 'talk', 'reading group', 'social']),
    // Start time, with the Atlanta UTC offset: 2026-10-01T17:30:00-04:00
    date: z.coerce.date(),
    location: z.string(),
    summary: z.string(),
    speaker: z.string().optional(),
    // A path under public/ (e.g. /slides/intro.pdf) or a full URL.
    slides: z.string().optional(),
    // Extra links: notebooks, recordings, papers.
    materials: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    summary: z.string(),
    draft: z.boolean().default(false),
  }),
});

const announcements = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/announcements' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
});

export const collections = { events, posts, announcements };
