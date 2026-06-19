import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const archivePath = join(root, "src", "lib", "submissions", "archive.ts");
const wishesRoutePath = join(root, "src", "app", "api", "wishes", "route.ts");
const rsvpRoutePath = join(root, "src", "app", "api", "rsvp", "route.ts");
const adminRoutePath = join(root, "src", "app", "api", "admin", "responses", "route.ts");

const archiveSource = readFileSync(archivePath, "utf8");
const wishesRoute = readFileSync(wishesRoutePath, "utf8");
const rsvpRoute = readFileSync(rsvpRoutePath, "utf8");
const adminRoute = readFileSync(adminRoutePath, "utf8");

assert.match(archiveSource, /export const archivedRsvps/, "RSVP archive should be exported");
assert.match(archiveSource, /export const archivedWishes/, "Wish archive should be exported");
assert.match(archiveSource, /export const archivedSummary/, "Archive summary should be exported");

assert.doesNotMatch(wishesRoute, /supabaseRest/, "Wishes GET should not depend on Supabase");
assert.match(wishesRoute, /status:\s*410/, "Wishes POST should be closed");

assert.doesNotMatch(rsvpRoute, /supabaseRest/, "RSVP POST should not depend on Supabase");
assert.match(rsvpRoute, /status:\s*410/, "RSVP POST should be closed");

assert.doesNotMatch(adminRoute, /supabaseAdminRest/, "Admin responses should not depend on Supabase");
assert.match(adminRoute, /archivedSummary/, "Admin responses should use the archive summary");
