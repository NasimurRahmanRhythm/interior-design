// Uploads every file under public/images to the Supabase "media" bucket, keeping
// the same paths (public/images/projects/yolo-fest/1.jpg -> media/projects/yolo-fest/1.jpg),
// which is what the seeded tables point to. Safe to run again: existing files are replaced.
//
//   node --env-file=.env.local scripts/upload-media.mjs            upload
//   node --env-file=.env.local scripts/upload-media.mjs --dry-run  list what would be uploaded
//
// Needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY (the secret key, never the publishable one).

import { readdir, readFile, stat } from "node:fs/promises";
import { extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "media";
const ROOT = fileURLToPath(new URL("../public/images/", import.meta.url));
const CONCURRENCY = 6;
const TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".glb": "model/gltf-binary",
};

const dryRun = process.argv.includes("--dry-run");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => (e.isDirectory() ? walk(join(dir, e.name)) : e.isFile() ? [join(dir, e.name)] : []))
  );
  return files.flat();
}

const files = (await walk(ROOT)).filter((f) => !f.split(sep).pop().startsWith("."));
const skipped = files.filter((f) => !TYPES[extname(f).toLowerCase()]);
const uploads = files.filter((f) => TYPES[extname(f).toLowerCase()]);
const toPath = (f) => relative(ROOT, f).split(sep).join("/");

if (skipped.length) console.warn(`Skipping ${skipped.length} file(s) with unsupported types:`, skipped.map(toPath));

if (dryRun) {
  let bytes = 0;
  for (const f of uploads) bytes += (await stat(f)).size;
  uploads.forEach((f) => console.log(toPath(f)));
  console.log(`\n${uploads.length} file(s), ${(bytes / 1024 / 1024).toFixed(1)} MB would be uploaded to "${BUCKET}".`);
  process.exit(0);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY;
if (!url || !key) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY (for example in .env.local) first.");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

async function upload(file) {
  const path = toPath(file);
  const body = await readFile(file);
  for (let attempt = 1; ; attempt++) {
    const { error } = await supabase.storage.from(BUCKET).upload(path, body, {
      contentType: TYPES[extname(file).toLowerCase()],
      cacheControl: "31536000",
      upsert: true,
    });
    if (!error) return;
    if (attempt === 3) throw new Error(`${path}: ${error.message}`);
    await new Promise((r) => setTimeout(r, attempt * 1000));
  }
}

let done = 0;
const failed = [];
const queue = [...uploads];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    for (let file = queue.shift(); file; file = queue.shift()) {
      try {
        await upload(file);
      } catch (e) {
        failed.push(e.message);
      }
      done++;
      if (done % 20 === 0 || done === uploads.length) console.log(`${done}/${uploads.length}`);
    }
  })
);

if (failed.length) {
  console.error(`\n${failed.length} upload(s) failed:\n${failed.join("\n")}`);
  process.exit(1);
}
console.log(`\nUploaded ${uploads.length} file(s) to the "${BUCKET}" bucket.`);
