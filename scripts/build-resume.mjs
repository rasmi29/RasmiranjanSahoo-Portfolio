/**
 * Builds every resume artefact from one source, resume/resume.html:
 *
 *   public/rasmiranjan-sahoo-resume.pdf   the download (RESUME.pdf in lib/site.ts)
 *   public/rasmiranjan-sahoo-resume.webp  the preview the /resume viewer animates
 *   resume/meta.json                      updated date + file size the viewer shows
 *
 *   npm run resume
 *
 * Needs Chrome or Edge (set CHROME_PATH if it lives somewhere unusual) and,
 * for the preview, ffmpeg on PATH. The resume is set in Calibri, which ships with
 * Windows and gets embedded in the PDF. On a machine without it, install Carlito
 * (same metrics) so the page still breaks the same way.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = join(import.meta.dirname, "..");
const source = pathToFileURL(join(root, "resume", "resume.html")).href;
const pdf = join(root, "public", "rasmiranjan-sahoo-resume.pdf");
const preview = join(root, "public", "rasmiranjan-sahoo-resume.webp");
const metaFile = join(root, "resume", "meta.json");

/* A4 at 96 CSS px/in is 793.7 × 1122.5; the screenshot is taken at 2× so the
   preview stays sharp on high-density screens. */
const VIEWPORT = { width: 794, height: 1123 };
const SCALE = 2;

const candidates = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

const browser = candidates.find((p) => existsSync(p));
if (!browser) {
  console.error("No Chrome/Edge found. Set CHROME_PATH to a Chromium-based browser.");
  process.exit(1);
}

const chrome = (...args) =>
  execFileSync(
    browser,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      // Gives the web fonts time to arrive before the page is captured.
      "--virtual-time-budget=15000",
      ...args,
      source,
    ],
    { stdio: "ignore" },
  );

/* ---------- PDF ---------- */
chrome("--no-pdf-header-footer", `--print-to-pdf=${pdf}`);

const pages = (readFileSync(pdf, "latin1").match(/\/Type\s*\/Page(?![a-z])/g) ?? []).length;
const pdfBytes = statSync(pdf).size;
console.log(`rasmiranjan-sahoo-resume.pdf  ${Math.round(pdfBytes / 1024)} KB, ${pages} page(s)`);
if (pages !== 1) {
  console.warn("  ! The resume no longer fits on one page — trim resume/resume.html.");
}

/* ---------- Preview ---------- */
const png = join(tmpdir(), `resume-preview-${process.pid}.png`);
chrome(
  `--window-size=${VIEWPORT.width},${VIEWPORT.height}`,
  `--force-device-scale-factor=${SCALE}`,
  `--screenshot=${png}`,
);

let previewOk = false;
try {
  execFileSync(
    "ffmpeg",
    ["-y", "-loglevel", "error", "-i", png, "-c:v", "libwebp", "-quality", "72", "-compression_level", "6", preview],
    { stdio: "inherit" },
  );
  previewOk = true;
  console.log(`rasmiranjan-sahoo-resume.webp ${Math.round(statSync(preview).size / 1024)} KB`);
} catch {
  console.warn("  ! ffmpeg not found — the preview image was NOT updated. Install ffmpeg and re-run.");
} finally {
  rmSync(png, { force: true });
}

/* ---------- Meta ---------- */
writeFileSync(
  metaFile,
  `${JSON.stringify(
    {
      updated: previewOk ? new Date().toISOString().slice(0, 10) : JSON.parse(readFileSync(metaFile, "utf8")).updated,
      pdfKB: Math.round(pdfBytes / 1024),
      pages,
      preview: { width: VIEWPORT.width * SCALE, height: VIEWPORT.height * SCALE },
    },
    null,
    2,
  )}\n`,
);
console.log("resume/meta.json updated");
