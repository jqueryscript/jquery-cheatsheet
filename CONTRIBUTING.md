# Contributing

Thanks for improving this jQuery 4 cheat sheet. Keep changes factual, short, and useful for beginners.

## Content Rules

- Verify API behavior against official jQuery documentation before editing examples.
- Use jQuery 4-safe examples.
- Do not add removed APIs except inside the removed API section.
- Prefer short examples that show one concept.
- Use explicit CSS units in `.css()` and `.animate()` examples.
- Mark each entry with one `jquery4Status`: `current`, `changed`, `removed`, or `caution`.
- Include an official jQuery URL for every entry.

## Data Format

Edit `data/jquery-4-cheatsheet.json` for content changes.

```json
{
  "id": "events-on",
  "title": "Attach an event handler",
  "syntax": ".on(events[, selector], handler)",
  "example": "$(\".save-button\").on(\"click\", function () {\\n  $(this).text(\"Saving...\");\\n});",
  "notes": ".on() is the main event API for current jQuery code.",
  "jquery4Status": "current",
  "replacement": "",
  "officialUrl": "https://api.jquery.com/on/"
}
```

## Checks

Run:

```bash
npm run validate
```

Review the Pages site locally:

```bash
npm run serve
```

Open `http://localhost:4173` and check search, filters, copy buttons, dark mode, and mobile layout.
