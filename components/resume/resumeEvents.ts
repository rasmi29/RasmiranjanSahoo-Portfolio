import type { MouseEvent } from "react";
import { RESUME } from "@/lib/site";

/**
 * Every "Resume" button on the site is a real link to /resume. On a plain
 * click it instead tells the one <ResumeViewer> mounted in the root layout to
 * open — so the viewer needs no context provider, and a middle-click,
 * cmd-click or a visitor without JavaScript still gets a working page.
 */
export const RESUME_OPEN_EVENT = "resume:open";

export function openResume(e?: MouseEvent, before?: () => void) {
  if (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
  }
  const fire = () => window.dispatchEvent(new Event(RESUME_OPEN_EVENT));
  if (before) {
    before();
    // Let whatever `before` closed (e.g. the mobile menu) release its scroll
    // lock first, so the two locks never interleave.
    requestAnimationFrame(() => requestAnimationFrame(fire));
  } else {
    fire();
  }
}

let preloaded = false;

/** Warms the cache on hover/focus, so the sheet is ready by the time it lands. */
export function preloadResume() {
  if (preloaded || typeof window === "undefined") return;
  preloaded = true;
  const img = new window.Image();
  img.decoding = "async";
  img.src = RESUME.preview.src;
}
