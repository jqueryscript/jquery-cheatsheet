# jQuery 4 Cheat Sheet

Fast jQuery lookup for real projects. This repo collects the jQuery 4 APIs developers reach for most often, plus the older jQuery patterns that still work in jQuery 4 and the removed APIs that need native JavaScript replacements.

Use it when you need to maintain legacy jQuery code, update a jQuery 3 project, check a method signature, copy a short example, or confirm whether an old snippet still belongs in a jQuery 4 codebase.

Web version:

```text
https://www.jqueryscript.net/jquery-cheat-sheet/
```

## What Is Included

- 63 beginner-friendly examples across 13 sections.
- jQuery 4 install and loading examples.
- Selectors, traversal, DOM manipulation, attributes, properties, data, CSS, dimensions, events, effects, Ajax, and utilities.
- Classic jQuery APIs that remain useful in jQuery 4, including `.val()`, `.serialize()`, `.one()`, `.trigger()`, `.eq()`, and `.hasClass()`.
- jQuery 4 migration notes for slim builds, Ajax behavior, CSS units, browser support, jQuery UI, and Node-like environments.
- Removed APIs with modern replacements.
- Short examples designed for quick copying and comparison.

## Live Page Target

Public URL:

```text
https://www.jqueryscript.net/jquery-cheat-sheet/
```

## Quick Start

Clone or download the repo, then run:

```bash
npm run validate
npm run serve
```

Open:

```text
http://localhost:4173
```

The project has no frontend build step. It is plain HTML, CSS, JavaScript, SVG, and JSON.

## jQuery 4 Install Examples

Official CDN:

```html
<script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
<script>
  $(function () {
    $(".status").text("jQuery is ready");
  });
</script>
```

npm:

```bash
npm install jquery@4.0.0
```

Bundler import:

```js
import $ from "jquery";

$(".notice").addClass("is-visible");
```

Slim build:

```html
<script src="https://code.jquery.com/jquery-4.0.0.slim.min.js"></script>
```

Use the full build when you need Ajax, effects, Deferred, Callbacks, or queues.

## Cheat Sheet Sections

| Section | Covers |
| --- | --- |
| Getting Started | CDN, npm, ready handlers, slim build, browser support |
| Classic APIs Still Useful in jQuery 4 | `.val()`, `.serialize()`, `.one()`, `.trigger()`, `.eq()`, `.hasClass()`, chaining |
| Selectors | CSS selectors, context selection, `.filter()`, `.find()` |
| DOM Traversal | `.closest()`, `.children()`, `.siblings()` |
| DOM Manipulation | `.text()`, `.html()`, `.append()`, `.prepend()`, `.remove()`, `.empty()` |
| Attributes, Properties, Data | `.attr()`, `.prop()`, `.data()`, class helpers |
| CSS and Dimensions | `.css()`, `.width()`, `.height()`, `.offset()`, `.position()` |
| Events | `.on()`, delegated events, `.off()`, focus event notes |
| Effects | `.show()`, `.hide()`, `.fadeIn()`, `.fadeOut()`, `.animate()` |
| Ajax | `$.ajax()`, `$.getJSON()`, `$.post()`, JSONP, script requests |
| Utilities and Miscellaneous | `.each()`, `.map()`, `$.extend()`, `$.uniqueSort()` |
| jQuery 4 Notes | Migrate, jQuery UI compatibility, factory entry point, Trusted Types |
| Removed APIs and Replacements | Removed helper APIs and native replacements |

## Common jQuery 4 Examples

Run code after the DOM is ready:

```js
$(function () {
  $(".menu").addClass("is-ready");
});
```

Select elements:

```js
$("#main");
$(".button");
$("nav a");
$("input[type='email']");
```

Find elements inside a container:

```js
$(".card")
  .find("button")
  .prop("disabled", false);
```

Use event delegation:

```js
$(".todo-list").on("click", ".remove", function () {
  $(this).closest("li").remove();
});
```

Read and set form values:

```js
const email = $("#email").val();
$("#email").val("editor@example.com");
```

Serialize a form:

```js
const payload = $("#contact-form").serialize();
$.post("/api/contact", payload);
```

Make an Ajax request:

```js
$.ajax({
  url: "/api/profile",
  method: "GET",
  dataType: "json"
}).done(function (profile) {
  $(".name").text(profile.name);
}).fail(function () {
  $(".error").text("Could not load profile");
});
```

Animate with explicit units:

```js
$(".progress-bar").animate({
  width: "75%"
}, 300);
```

## Classic APIs Still Useful in jQuery 4

Many jQuery snippets written before jQuery 4 still use APIs that remain valid. This cheat sheet includes those APIs because they are common in production code and still useful for beginners.

Examples:

```js
$(".notice")
  .addClass("is-visible")
  .text("Saved")
  .attr("role", "status");
```

```js
$(".intro-video").one("play", function () {
  $(".video-note").text("Started");
});
```

```js
$("#country").val("US").trigger("change");
```

```js
$(".gallery img").eq(2).addClass("is-featured");
$(".steps li").first().addClass("is-current");
$(".steps li").last().addClass("is-final");
```

## Important jQuery 4 Notes

- jQuery 4.0.0 is available from the official CDN and npm.
- The slim build excludes Ajax, effects, callbacks, deferred, and queue modules.
- IE 10 and older are no longer supported.
- Edge Legacy and older mobile browser versions are no longer supported.
- jQuery UI should be 1.13.3 or newer.
- `toggleClass(Boolean | undefined)` was removed.
- JSONP requests must use `dataType: "jsonp"` explicitly.
- Ajax script execution must use `dataType: "script"` or `$.getScript()`.
- Most CSS values that need units should be written with explicit units.
- In Node-like environments without a DOM window, use `require("jquery/factory")(window)`.

## Removed APIs and Replacements

| Removed API | Replacement |
| --- | --- |
| `$.trim(value)` | `String(value).trim()` or `value.trim()` |
| `$.parseJSON(text)` | `JSON.parse(text)` |
| `$.isArray(value)` | `Array.isArray(value)` |
| `$.isFunction(value)` | `typeof value === "function"` |
| `$.isNumeric(value)` | `Number.isFinite(Number(value))` or a project-specific check |
| `$.isWindow(value)` | Avoid when possible. If required, use `obj != null && obj === obj.window`. |
| `$.now()` | `Date.now()` |
| `$.type(value)` | `typeof`, `Array.isArray`, `instanceof`, or `Object.prototype.toString.call(value)` |
| `$.unique(array)` | `$.uniqueSort(array)` |
| `$.nodeName(element, name)` | `element.nodeName.toLowerCase()` |

## Project Structure

```text
.
|-- index.html
|-- assets/
|   |-- app.js
|   |-- styles.css
|   |-- favicon.svg
|   `-- jquery-4-cheat-sheet-og.svg
|-- data/
|   `-- jquery-4-cheatsheet.json
|-- scripts/
|   `-- validate-data.js
|-- .github/
|   |-- ISSUE_TEMPLATE/
|   `-- workflows/
|-- CONTRIBUTING.md
|-- LICENSE
|-- package.json
`-- README.md
```

## Content Data Model

All cheat sheet entries live in `data/jquery-4-cheatsheet.json`.

Each item uses this shape:

```json
{
  "id": "classic-val",
  "title": "Read or set form values",
  "syntax": ".val([value])",
  "example": "const email = $(\"#email\").val();\n$(\"#email\").val(\"editor@example.com\");",
  "notes": ".val() is still one of the most common jQuery form helpers.",
  "jquery4Status": "current",
  "replacement": "",
  "officialUrl": "https://api.jquery.com/val/"
}
```

Allowed `jquery4Status` values:

- `current`
- `changed`
- `removed`
- `caution`

## Validation

Run:

```bash
npm run validate
```

The validator checks:

- valid JSON
- required root fields
- required section fields
- required item fields
- duplicate IDs
- valid `jquery4Status` values
- official jQuery URLs
- replacements for removed APIs
- removed jQuery APIs accidentally used inside examples

## Local Development

Start a local static server:

```bash
npm run serve
```

Open:

```text
http://localhost:4173
```

No dependencies need to be installed for normal development. Node is used only for validation.

## SEO Notes

The `index.html` page includes:

- one H1
- concise title and meta description
- canonical URL
- Open Graph tags
- Twitter Card tags
- JSON-LD `BreadcrumbList`
- JSON-LD `TechArticle`
- JSON-LD `ItemList`
- crawlable intro copy
- stable section anchors

Recommended target keyword:

```text
jQuery 4 Cheat Sheet
```

Secondary topics:

- jQuery 4 selectors
- jQuery 4 events
- jQuery 4 Ajax
- jQuery 4 removed APIs
- jQuery 4 migration
- jQuery cheat sheet

## GitHub Repository Setup

Suggested repository values:

| Field | Value |
| --- | --- |
| Repository name | `jquery-4-cheatsheet` |
| Package name | `jquery-4-cheatsheet` |
| Display name | `jQuery 4 Cheat Sheet` |
| Short description | `A searchable jQuery 4 cheat sheet with classic APIs, migration notes, and removed API replacements.` |
| Homepage URL | `https://www.jqueryscript.net/jquery-cheat-sheet/` |
| Visibility | Public |
| License | MIT |
| Default branch | `main` |
| Pages source | Not required if hosted on jqueryscript.net |

Suggested GitHub topics:

```text
jquery
jquery-4
cheatsheet
javascript
web-development
frontend
ajax
dom
events
migration-guide
jqueryscript
```

Suggested social preview title:

```text
jQuery 4 Cheat Sheet
```

Suggested social preview description:

```text
Search and copy jQuery 4 examples for selectors, events, Ajax, effects, classic APIs, migration notes, and removed API replacements.
```

## package.json Metadata

```json
{
  "name": "jquery-4-cheatsheet",
  "version": "1.0.0",
  "description": "Searchable jQuery 4 cheat sheet with classic APIs, migration notes, and removed API replacements.",
  "private": true,
  "scripts": {
    "validate": "node scripts/validate-data.js",
    "serve": "python -m http.server 4173"
  },
  "keywords": [
    "jquery",
    "jquery-4",
    "jquery-cheatsheet",
    "cheatsheet",
    "javascript",
    "frontend",
    "dom",
    "ajax",
    "events",
    "migration-guide"
  ],
  "license": "MIT"
}
```

## Publishing Checklist

- Update the final canonical URL in `index.html`.
- Upload `index.html`, `assets/`, and `data/` to the target site path.
- Keep `data/jquery-4-cheatsheet.json` next to the page at the expected relative path.
- Confirm `assets/app.js` can fetch `data/jquery-4-cheatsheet.json`.
- Test search, filters, copy buttons, dark mode, and mobile layout.
- Run `npm run validate` before publishing.
- Check external links open in a new tab.

## Sources

- [jQuery 4.0.0 release post](https://blog.jquery.com/2026/01/17/jquery-4-0-0/)
- [jQuery Core 4.0 Upgrade Guide](https://jquery.com/upgrade-guide/4.0/)
- [jQuery API Documentation](https://api.jquery.com/)

## Contributing

Content corrections are welcome. Please keep examples short, beginner-friendly, and verified against official jQuery documentation.

Before opening a pull request:

```bash
npm run validate
```

## License

MIT
