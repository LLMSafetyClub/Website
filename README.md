# LLM Safety & Interpretability Club website

The site at [llmsafetyclub.org](https://llmsafetyclub.org). Built with [Astro](https://astro.build),
deployed to GitHub Pages on every push to `main`.

All the words on the site live in the `content/` folder, which is an Obsidian vault.

## Writing in Obsidian

The vault is this repo's `content/` folder. Use a copy of the repo on the normal Windows (or Mac)
disk; Obsidian does not work well on a folder inside WSL.

One-time setup:

1. In Obsidian choose "Open folder as vault" and pick the `content` folder.
2. When asked, choose "Trust author and enable plugins". The vault ships with two community
   plugins, already configured: Templater (fills in new notes) and Git (publishes).
3. Open Settings, Templater, and turn on "Trigger Templater on new file creation". Obsidian keeps
   this switch per computer, so it cannot be set ahead of time.

Adding something:

1. Right-click the `events`, `posts`, or `announcements` folder and choose "New note".
2. Answer the questions that pop up (title, and for events the date and kind). The note is named
   and its properties are filled in for you.
3. Fill in any other properties you want and write the body.
4. Publish: open the command palette (Ctrl/Cmd+P) and run "Git: Commit-and-sync". The site
   updates a minute or two later. The first time, a GitHub sign-in window appears.

New posts start with `draft` ticked, so they stay off the live site until you untick it.

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

- `date`: Atlanta time, no time zone needed. Use the date picker, or type `2026-10-15T17:30`.
  A note whose date is missing or unreadable is left off the site.
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

- `content/`: the vault. `_templates/` and `.obsidian/` (settings and the two plugins) are not published.
- `src/pages/`, `src/components/`, `src/layouts/`: page structure. The only words here are
  interface labels (menu items, "Upcoming", "No upcoming events.", and so on).
- `src/styles/global.css`: all styling.
- `src/remark-obsidian.mjs`: the Obsidian syntax support.
- `astro.config.mjs` and `public/CNAME`: the domain.
