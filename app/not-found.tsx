import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 text-center text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/4 left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-emerald-900/20 blur-[120px]"
      />

      <div className="relative z-10 flex flex-col items-center">
        <span className="mb-6 font-mono text-xs uppercase tracking-[0.4em] text-emerald-400">
          Error 404
        </span>
        <p className="text-[22vw] font-black leading-none tracking-tighter text-white/5 md:text-[16rem]">
          404
        </p>
        <h1 className="-mt-8 text-4xl font-bold tracking-tighter md:text-6xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-6 max-w-md text-neutral-300">
          The link may be out of date, or the page may have moved. Everything
          else is still here.
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-black transition-colors hover:bg-emerald-400"
          >
            Back home
          </Link>
          <Link
            href="/works"
            className="inline-flex items-center justify-center border border-white/25 px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-white transition-colors hover:border-white/60 hover:bg-white/5"
          >
            View case studies
          </Link>
        </div>
      </div>
    </main>
  );
}
