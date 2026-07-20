// §6.1 — floating pill nav. Full width at top; contracts to ~85% with deeper
// blur after 80px (single 0.4s transition, CSS-driven via a toggled class).
import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger, useGSAP } from '../lib/gsap';
import { WA_LINK } from '../sections/Hero';

const LINKS = [
  { label: 'Why Vixa', href: '#why' },
  { label: 'How it Works', href: '#how' },
  { label: 'Coverage', href: '#coverage' },
];

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      ScrollTrigger.create({
        start: 80,
        onEnter: () => ref.current?.classList.add('nav-contracted'),
        onLeaveBack: () => ref.current?.classList.remove('nav-contracted'),
      });
    },
    { scope: ref },
  );

  // close the mobile sheet on escape / anchor click
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header ref={ref} className="nav-pill fixed inset-x-0 top-5 z-50 mx-auto w-full px-4">
      <div className="nav-pill-inner mx-auto flex items-center justify-between gap-4 rounded-pill border border-vx-slate bg-vx-char/70 py-2.5 pl-6 pr-2.5 backdrop-blur-xl transition-all duration-[400ms] ease-out">
        <a href="#top" className="font-display text-[19px] font-bold tracking-[0.02em] text-vx-bone">
          VIXA
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[14px] font-medium text-vx-ash transition-colors hover:text-vx-bone"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={WA_LINK}
            className="rounded-pill bg-vx-olive px-5 py-2.5 text-[14px] font-semibold text-vx-void transition-colors hover:bg-vx-olive-lo"
          >
            Chat on WhatsApp
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="nav-sheet"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-pill border border-vx-slate text-vx-bone md:hidden"
          >
            <svg viewBox="0 0 20 20" width="18" height="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {open ? (
                <path d="M5 5l10 10M15 5L5 15" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* mobile sheet */}
      {open && (
        <div
          id="nav-sheet"
          className="mx-auto mt-2 rounded-card border border-vx-slate bg-vx-char/95 p-2 backdrop-blur-xl md:hidden"
        >
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-[10px] px-4 py-3 text-[15px] font-medium text-vx-bone hover:bg-vx-slate/40"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
