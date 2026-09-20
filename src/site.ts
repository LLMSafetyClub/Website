// Club-wide details. Edit these once and every page picks them up.
export const site = {
  name: 'LLM Safety & Interpretability Club',
  shortName: 'LSIC',
  school: 'Georgia State University',
  description:
    'A student club at Georgia State University for people who want to understand how large language models work inside, and how to make them safe.',
  email: 'placeholder@student.gsu.edu',
  // Leave a link empty to hide it.
  links: {
    discord: '',
    mailingList: '',
    pin: '',
    github: 'https://github.com/LLMSafetyClub',
  },
  meeting: 'Placeholder: Thursdays, 5:30 pm, room to be announced',
};

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

const TZ = 'America/New_York';

export function formatDay(date: Date): string {
  return date.toLocaleDateString('en-US', {
    timeZone: TZ,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/** For posts and announcements, whose dates have no time and parse as UTC midnight. */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    timeZone: 'UTC',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { timeZone: TZ, hour: 'numeric', minute: '2-digit' });
}

export function isoDay(date: Date): string {
  return date.toLocaleDateString('en-CA', { timeZone: TZ });
}
