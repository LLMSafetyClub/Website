export const nav = [
  { label: 'Events', path: '/events/' },
  { label: 'Blog', path: '/blog/' },
  { label: 'Materials', path: '/materials/' },
  { label: 'About', path: '/about/' },
  { label: 'Join', path: '/join/' },
];

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix a site path with the deploy base. Full URLs pass through untouched. */
export function url(path: string): string {
  if (/^[a-z]+:/i.test(path)) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

// Content dates hold Atlanta wall-clock time in their UTC fields (see content.config.ts),
// so they are always formatted as UTC.

export function formatDay(date: Date): string {
  return date.toLocaleDateString('en-US', {
    timeZone: 'UTC',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/** Empty when the note gave a date with no time. */
export function formatTime(date: Date): string {
  if (date.getUTCHours() === 0 && date.getUTCMinutes() === 0) return '';
  return date.toLocaleTimeString('en-US', { timeZone: 'UTC', hour: 'numeric', minute: '2-digit' });
}

export function isoDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** The current Atlanta wall-clock time, held in UTC fields like the content dates. */
export function wallClockNow(): Date {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).formatToParts(new Date());
  const get = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  return new Date(Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute')));
}
