# LLM Safety & Interpretability Club website

The website for the LLM Safety & Interpretability Club at Georgia State University. Built with
[Astro](https://astro.build) and deployed to GitHub Pages on every push to `main`.

## Run it locally

Needs Node 22.12 or newer (`nvm use` picks up `.nvmrc`).

```sh
npm install
npm run dev      # http://localhost:4321/
npm run build    # writes the static site to dist/
```

## Adding content

Everything is a markdown file under `src/content/`. Copy an existing file, rename it, and edit.
The file name becomes the URL. Commit and push to `main`, and the site updates in a minute or two.

| To add | Create a file in | It shows up on |
| --- | --- | --- |
| An event, workshop, or talk | `src/content/events/` | Home, Events, and its own page |
| A blog post | `src/content/posts/` | Home, Blog, and its own page |
| An announcement | `src/content/announcements/` | Home and Announcements |
| Slides | `public/slides/`, then link them from the event | The event and Materials |

### Events

```yaml
---
title: Logit lens workshop
kind: workshop            # meeting, workshop, talk, reading group, or social
date: 2026-10-15T17:30:00-04:00   # -04:00 during daylight time, -05:00 otherwise
location: 25 Park Place, room 223
summary: One sentence shown in listings.
speaker: Jane Doe         # optional
slides: /slides/logit-lens.pdf    # optional, a file in public/slides/ or a full URL
materials:                # optional
  - label: Notebook
    href: https://colab.research.google.com/...
---

Anything below the second `---` is the body of the event page.
```

Events move from Upcoming to Past on their own: the site rebuilds every morning. After an event,
add `slides:` to its file and it appears on the Materials page.

### Blog posts

```yaml
---
title: Notes on sparse autoencoders
date: 2026-10-20
author: Jane Doe
summary: One or two sentences shown in listings.
draft: false              # true hides the post from the live site
---
```

### Announcements

```yaml
---
title: Room change this week
date: 2026-10-12
---

A short note. The three newest appear on the home page.
```

## Club details

The club name, email, meeting time, and Discord / mailing list / PIN links live in `src/site.ts`.
A link left empty is hidden. The About and Join pages are `src/pages/about.astro` and
`src/pages/join.astro`. Search the project for "Placeholder" to find copy that still needs writing.

## Custom domain

1. In `astro.config.mjs`, set `CUSTOM_DOMAIN` to the domain, for example `'llmsafetyclub.org'`.
2. Create `public/CNAME` containing only that domain.
3. At the domain registrar, point DNS at GitHub Pages: four `A` records for `@`
   (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and a `CNAME`
   record for `www` pointing to `llmsafetyclub.github.io`.
4. In the repository, open Settings, Pages, enter the domain under "Custom domain", and turn on
   "Enforce HTTPS" once it is offered.
