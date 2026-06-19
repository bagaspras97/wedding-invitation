import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const archiveSource = readFileSync(
  join(process.cwd(), "src", "lib", "submissions", "archive.ts"),
  "utf8",
);

const dates = [...archiveSource.matchAll(/"created_at":\s+"([^"]+)"/g)].map((match) => match[1]);
const invalidDates = dates.filter((value) => Number.isNaN(Date.parse(value)));

assert.equal(invalidDates.length, 0, `Invalid archive dates: ${invalidDates.join(", ")}`);
assert.ok(dates.every((value) => /Z$/.test(value)), "Archive dates should use ISO UTC Z suffix");
