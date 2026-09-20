<%*
const clean = (s) => s.replace(/[\\/:*?"<>|#^\[\]]/g, "").trim();
const title = await tp.system.prompt("Event title");
if (title && clean(title)) await tp.file.rename(clean(title));
const when = await tp.system.prompt("Date and start time", tp.date.now("YYYY-MM-DD") + "T17:30");
const kinds = ["meeting", "workshop", "talk", "reading group", "social"];
const kind = await tp.system.suggester(kinds, kinds);
-%>
---
date: <% when ?? "" %>
kind: <% kind ?? "" %>
location:
speakers:
summary:
slides:
links:
draft: false
---

<% tp.file.cursor() %>
