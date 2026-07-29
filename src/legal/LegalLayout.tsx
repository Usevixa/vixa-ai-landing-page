// Shared chrome for the Privacy / Terms pages. Deliberately static — no GSAP,
// no ScrollTrigger — so each legal page ships a tiny, fast bundle.
import type { ReactNode } from 'react';
import { WA_LINK } from '../lib/site';
import Footer from '../sections/Footer';

export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      {/* minimal static header — matches the pill nav's language, not its motion */}
      <header className="fixed inset-x-0 top-5 z-50 mx-auto w-full px-4">
        <div className="mx-auto flex max-w-content items-center justify-between gap-4 rounded-pill border border-vx-slate bg-white/80 py-2.5 pl-6 pr-2.5 backdrop-blur-xl">
          <a href="/" className="font-display text-[19px] font-bold tracking-[0.02em] text-vx-bone">
            VIXA
          </a>
          <a
            href={WA_LINK}
            className="rounded-pill bg-vx-olive px-5 py-2.5 text-[14px] font-semibold text-vx-void transition-colors hover:bg-vx-olive-lo"
          >
            Chat on WhatsApp
          </a>
        </div>
      </header>

      <main className="gutter">
        <div className="mx-auto max-w-[760px] pb-24 pt-[160px]">
          <a
            href="/"
            className="text-mono-meta inline-flex items-center gap-1.5 text-vx-ash transition-colors hover:text-vx-bone"
          >
            <span aria-hidden="true">←</span> Back to home
          </a>
          <h1 className="font-display text-display-lg mt-6 font-bold text-vx-bone">{title}</h1>
          <p className="text-mono-meta mt-4 text-vx-ash">Last updated {updated}</p>
          <div className="legal-prose mt-12">{children}</div>
        </div>
      </main>

      <Footer />
    </>
  );
}
