// nov17-frontpage — make.fun news-image-20261117
//
// The entry image is a newspaper front page summing up the world news of
// Tuesday 17 November 2026. It is composed once (see README.md) and shipped
// as entry.png; this program simply copies it to the grader's output
// directory, byte for byte, with no network and no other dependencies.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || join(here, "out");
const outPath = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(join(here, "entry.png"), outPath);

// Fail loudly instead of shipping a corrupt file: a PNG must start with
// its 8-byte signature, and the shipped image must stay under the 1 MiB cap.
const bytes = readFileSync(outPath);
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!bytes.subarray(0, 8).equals(PNG_SIGNATURE)) {
  throw new Error("entry.png is not a valid PNG");
}
if (bytes.length > 1048576) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB cap`);
}
