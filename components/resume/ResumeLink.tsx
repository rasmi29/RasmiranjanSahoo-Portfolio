"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { RESUME } from "@/lib/site";
import { openResume, preloadResume } from "@/components/resume/resumeEvents";

/**
 * A link to /resume that opens the animated viewer in place on a plain click.
 * `before` runs first — the mobile menu uses it to close itself.
 */
export default function ResumeLink({
  children,
  before,
  onClick,
  ...rest
}: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  children: ReactNode;
  before?: () => void;
}) {
  return (
    <a
      {...rest}
      href={RESUME.page}
      onClick={(e) => {
        onClick?.(e);
        openResume(e, before);
      }}
      onPointerEnter={preloadResume}
      onFocus={preloadResume}
    >
      {children}
    </a>
  );
}
