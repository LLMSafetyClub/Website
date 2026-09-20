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

/** Today's date in Atlanta, as 2026-10-15. */
export function today(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
}
