/**
 * Post-build fix for nested routes in the static export.
 *
 * `next build` (output: "export") writes a nested route's prefetch payloads into
 * sub-folders — out/works/vedrastores/__next.works/vedrastores.txt — but the
 * client router requests them with dots — …/__next.works.vedrastores.txt — so
 * every prefetch of /works/vedrastores 404s and navigation falls back to a full
 * page load. This copies each nested file to the dotted name the client asks
 * for. Additive only: nothing Next wrote is moved or changed.
 */
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const out = join(import.meta.dirname, "..", "out");
let copied = 0;

const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory()) continue;
    if (name.startsWith("__next.")) flatten(dir, p);
    else walk(p);
  }
};

/** Copies every file under a `__next.*` folder next to it, with "/" → ".". */
const flatten = (parent, folder) => {
  const files = (d) =>
    readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? files(join(d, n)) : [join(d, n)]));
  for (const file of files(folder)) {
    const dotted = join(parent, relative(parent, file).split(sep).join("."));
    if (!existsSync(dotted)) {
      copyFileSync(file, dotted);
      copied++;
    }
  }
};

walk(out);
console.log(`fix-export-prefetch: added ${copied} dotted prefetch file(s)`);
