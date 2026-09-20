# LLM Safety & Interpretability Club website

The site at [llmsafetyclub.org](https://llmsafetyclub.org). Built with [Astro](https://astro.build),
deployed to GitHub Pages on every push to `main`.

All the words on the site live in the `content/` folder, which is an Obsidian vault.

## Writing in Obsidian

1. In Obsidian choose "Open folder as vault" and pick this repo's `content/` folder.
   The Templates plugin, the template folder, and the attachments folder are already set up.
2. To add something, make a new note in the right folder, then run "Templates: Insert template"
   from the command palette (Ctrl/Cmd+P) and fill in the properties at the top.
3. Commit and push. The site updates in a minute or two. The
   [Obsidian Git](https://github.com/Vinzent03/obsidian-git) community plugin can do this from
   inside Obsidian.

| To add | New note in | Template |
| --- | --- | --- |
| An event, workshop, or talk | `events/` | Event |
| A blog post | `posts/` | Post |
| An announcement | `announcements/` | Announcement |

The note's file name is its title on the site (add a `title` property to override it).

The fixed pages are notes too. Whatever is written in them appears on the page, and an empty note
leaves the page with only its heading:

| Note | Page |
| --- | --- |
| `pages/home.md` | Home page headline (`title`) and intro |
| `pages/about.md` | About |
| `pages/join.md` | Join, above the contact details |
| `pages/events.md`, `blog.md`, `materials.md`, `announcements.md` | Intro above each list |
| `club.md` | Club name, email, meeting time, Discord / mailing list / PIN / GitHub links. Empty ones are hidden. |

### Properties

- `date`: `2026-10-15T17:30` for events, Atlanta time, no time zone needed. A plain `2026-10-15`
  works where the time does not matter.
- `kind`: any word, such as meeting, workshop, talk, reading group.
- `slides`: drop the PDF into the vault (it lands in `attachments/`), then set `slides` to its file
  name or `[[wikilink]]`. A full URL works too. Events with slides or links show up on Materials.
- `links`: a list, one per line, written as `Notebook: https://...` or a bare URL.
- `draft`: tick it to keep a note off the live site. Drafts still show in `npm run dev`.
- Any property can be left empty.

Events move from Upcoming to Past on their own, because the site rebuilds every morning.

### Obsidian syntax that works on the site

- `![[image.png]]` image embeds (paste or drag an image into a note as usual)
- `[[Note name]]` and `[[Note name|label]]` links to other events, posts, and pages
- `> [!note] Title` callouts
- `%%comments%%` are left out of the site
- Standard markdown: headings, lists, tables, code blocks, footnotes

Not supported: embedding one note inside another (`![[Some note]]`), Dataview, canvas, `==highlights==`.

## Run it locally

Needs Node 22.12 or newer (`nvm use` picks up `.nvmrc`).

```sh
npm install
npm run dev      # http://localhost:4321/ , reloads as notes are saved
npm run build    # writes the static site to dist/
```

## Where things are

- `content/`: the vault. `_templates/` and `.obsidian/` are not published.
- `src/pages/`, `src/components/`, `src/layouts/`: page structure. The only words here are
  interface labels (menu items, "Upcoming", "No upcoming events.", and so on).
- `src/styles/global.css`: all styling.
- `src/remark-obsidian.mjs`: the Obsidian syntax support.
- `astro.config.mjs` and `public/CNAME`: the domain.
