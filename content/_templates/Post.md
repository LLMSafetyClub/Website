<%*
const clean = (s) => s.replace(/[\\/:*?"<>|#^\[\]]/g, "").trim();
const title = await tp.system.prompt("Post title");
if (title && clean(title)) await tp.file.rename(clean(title));
-%>
---
date: <% tp.date.now("YYYY-MM-DD") %>T00:00
authors:
summary:
draft: true
---

<% tp.file.cursor() %>
