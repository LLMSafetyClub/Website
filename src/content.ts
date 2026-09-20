import { getCollection } from 'astro:content';
import { isoDay } from './site';

/** Events split around today (Atlanta time). An event stays upcoming through its own day. */
export async function getEvents() {
  const events = await getCollection('events');
  const today = isoDay(new Date());
  const upcoming = events
    .filter((event) => isoDay(event.data.date) >= today)
    .sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());
  const past = events
    .filter((event) => isoDay(event.data.date) < today)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return { upcoming, past };
}

export async function getPosts() {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getAnnouncements() {
  const announcements = await getCollection('announcements');
  return announcements.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
