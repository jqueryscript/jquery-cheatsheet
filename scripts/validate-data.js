const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "data", "jquery-4-cheatsheet.json");
const raw = fs.readFileSync(dataPath, "utf8");

let data;
try {
  data = JSON.parse(raw);
} catch (error) {
  fail(`Invalid JSON: ${error.message}`);
}

const statuses = new Set(["current", "changed", "removed", "caution"]);
const ids = new Set();
const errors = [];

required(data, "version", "root");
required(data, "updated", "root");

if (!Array.isArray(data.sections) || data.sections.length === 0) {
  errors.push("root.sections must be a non-empty array.");
}

for (const section of data.sections || []) {
  const sectionPath = `section:${section.id || "(missing id)"}`;
  required(section, "id", sectionPath);
  required(section, "title", sectionPath);
  required(section, "description", sectionPath);

  if (section.id) {
    unique(section.id, sectionPath);
  }

  if (!Array.isArray(section.items) || section.items.length === 0) {
    errors.push(`${sectionPath}.items must be a non-empty array.`);
    continue;
  }

  for (const item of section.items) {
    const itemPath = `item:${item.id || "(missing id)"}`;
    for (const field of [
      "id",
      "title",
      "syntax",
      "example",
      "notes",
      "jquery4Status",
      "officialUrl"
    ]) {
      required(item, field, itemPath);
    }

    if (item.id) {
      unique(item.id, itemPath);
    }

    if (item.jquery4Status && !statuses.has(item.jquery4Status)) {
      errors.push(`${itemPath}.jquery4Status must be one of ${Array.from(statuses).join(", ")}.`);
    }

    if (item.officialUrl && !/^https:\/\/(api\.jquery\.com|jquery\.com|blog\.jquery\.com)\//.test(item.officialUrl)) {
      errors.push(`${itemPath}.officialUrl must use an official jQuery URL.`);
    }

    if (item.jquery4Status === "removed" && !hasText(item.replacement)) {
      errors.push(`${itemPath}.replacement is required for removed APIs.`);
    }

    if (hasRemovedApi(item.example)) {
      errors.push(`${itemPath}.example appears to use a removed jQuery 4 API.`);
    }
  }
}

if (errors.length > 0) {
  fail(errors.join("\n"));
}

console.log(`Validated ${data.sections.length} sections and ${countItems(data.sections)} items.`);

function required(target, field, location) {
  if (!hasText(target[field])) {
    errors.push(`${location}.${field} is required.`);
  }
}

function unique(id, location) {
  if (ids.has(id)) {
    errors.push(`${location} has duplicate id "${id}".`);
  }
  ids.add(id);
}

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function hasRemovedApi(value) {
  return /\$\.trim\(|jQuery\.trim\(|\$\.parseJSON\(|jQuery\.parseJSON\(|\$\.isArray\(|jQuery\.isArray\(|\$\.type\(|jQuery\.type\(|\$\.now\(|jQuery\.now\(/.test(value);
}

function countItems(sections) {
  return sections.reduce((total, section) => total + section.items.length, 0);
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
