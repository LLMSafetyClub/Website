import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// The notes live in content/, which is also an Obsidian vault. Obsidian leaves
// empty properties as null, so every optional field accepts null.
const text = z
  .union([z.string(), z.number()])
  .nullish()
  .transform((value) => (value == null || String(value).trim() === '' ? undefined : String(value).trim()));

const flag = z
  .boolean()
  .nullish()
  .transform((value) => value ?? false);

// Dates are wall-clock Atlanta time with no time zone: 2026-10-15T17:30 or 2026-10-15.
// They are kept as a Date whose UTC fields hold that wall-clock time.
const wallClock = z.union([z.string(), z.date()]).transform((value, ctx) => {
  if (value instanceof Date) return value;
  const match = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{1,2}):(\d{2}))?/);
  if (!match) {
    ctx.addIssue({ code: 'custom', message: 'Write dates as 2026-10-15 or 2026-10-15T17:30' });
    return z.NEVER;
  }
  const [, y, m, d, hh = '0', mm = '0'] = match;
  return new Date(Date.UTC(+y, +m - 1, +d, +hh, +mm));
});

const events = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/events' }),
  schema: z.object({
    title: text,
    date: wallClock,
    kind: text,
    location: text,
    speaker: text,
    summary: text,
    // A file name in content/attachments/ (a wikilink works too), or a full URL.
    slides: text,
    // Each item is "Label: https://..." or a bare URL.
    links: z
      .array(z.string().nullish())
      .nullish()
      .transform((items) => (items ?? []).filter((item): item is string => !!item?.trim())),
    draft: flag,
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/posts' }),
  schema: z.object({
    title: text,
    date: wallClock,
    author: text,
    summary: text,
    draft: flag,
  }),
});

const announcements = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/announcements' }),
  schema: z.object({
    title: text,
    date: wallClock,
    draft: flag,
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/pages' }),
  schema: z.object({ title: text }),
});

const club = defineCollection({
  loader: glob({ pattern: 'club.md', base: './content' }),
  schema: z.object({
    name: text,
    'short name': text,
    school: text,
    description: text,
    email: text,
    meeting: text,
    discord: text,
    'mailing list': text,
    pin: text,
    github: text,
  }),
});

export const collections = { events, posts, announcements, pages, club };
