import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { isoDay, today } from './site';

type Name = 'events' | 'posts' | 'announcements';
/** An entry whose date was readable. Everything the pages receive is one of these. */
export type Dated<C extends Name> = CollectionEntry<C> & { data: { date: Date } };

/** Published notes, newest first. Drafts show only in `npm run dev`; notes without a usable date are skipped. */
async function load<C extends Name>(name: C): Promise<Dated<C>[]> {
  const entries = (await getCollection(name)) as CollectionEntry<Name>[];
  const kept = entries.filter((entry) => {
    if (!entry.data.date) console.warn(`[content] Skipping ${entry.filePath}: its date is missing or not like 2026-10-15T17:30`);
    return entry.data.date && (import.meta.env.DEV || !entry.data.draft);
  }) as Dated<C>[];
  return kept.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** The `title` property if the note has one, otherwise its file name, as in Obsidian. */
export function titleOf(entry: { id: string; filePath?: string; data: { title?: string } }): string {
  if (entry.data.title) return entry.data.title;
  const file = entry.filePath?.split('/').pop()?.replace(/\.md$/, '');
  return file ?? entry.id;
}

export async function getClub() {
  const entry = await getEntry('club', 'club');
  const data = entry?.data;
  return {
    name: data?.name ?? 'LLM Safety & Interpretability Club',
    shortName: data?.['short name'],
    school: data?.school,
    description: data?.description,
    email: data?.email,
    meeting: data?.meeting,
    channels: [
      { label: 'Discord', href: data?.discord },
      { label: 'Mailing list', href: data?.['mailing list'] },
      { label: 'PIN', href: data?.pin },
      { label: 'GitHub', href: data?.github },
    ].filter((channel): channel is { label: string; href: string } => !!channel.href),
  };
}

export async function getPage(id: string) {
  return getEntry('pages', id);
}

/** Events split around today (Atlanta time). An event stays upcoming through its own day. */
export async function getEvents() {
  const events = await load('events');
  const now = today();
  const upcoming = events.filter((event) => isoDay(event.data.date) >= now).reverse();
  const past = events.filter((event) => isoDay(event.data.date) < now);
  return { upcoming, past };
}

export async function getPosts() {
  return load('posts');
}

export async function getAnnouncements() {
  return load('announcements');
}

// Files in the vault's attachments folder that an event can point to as slides.
const attachments = import.meta.glob<string>('/content/attachments/*.{pdf,pptx,ppt,key,odp,zip,ipynb}', {
  query: '?url&no-inline',
  import: 'default',
  eager: true,
});

/** Turn a `slides` property (URL, file name, or [[wikilink]]) into a link target. */
export function fileUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const name = value.replace(/^!?\[\[|\]\]$/g, '').split('|')[0].trim();
  if (/^https?:/i.test(name)) return name;
  const wanted = name.split('/').pop();
  const hit = Object.entries(attachments).find(([file]) => file.split('/').pop() === wanted);
  return hit?.[1];
}

/** Parse "Label: https://..." (or a bare URL) from an event's `links` property. */
export function parseLink(item: string): { label: string; href: string } | undefined {
  const match = item.trim().match(/^(?:(.*?)\s*[:|-]\s*)?(https?:\/\/\S+)$/);
  if (!match) return undefined;
  const [, label, href] = match;
  return { label: label?.trim() || new URL(href).hostname.replace(/^www\./, ''), href };
}

export function eventLinks(event: CollectionEntry<'events'>) {
  const slides = fileUrl(event.data.slides);
  return [
    ...(slides ? [{ label: 'Slides', href: slides }] : []),
    ...event.data.links.map(parseLink).filter((link) => link !== undefined),
  ];
}
