// §6.2 Hero — mechanic M1, the signature moment. ~350vh pin; headline scrubs
// out; the phone rig (photo + live DOM thread, welded) rises and plays six
// beats; satellite cards swap; rotation settles head-on at the ✅.
import { useRef } from 'react';
import ChatThread from '../components/ChatThread';
import HeroGrid from '../components/HeroGrid';
import { heroThread } from '../data/threads';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import {
  buildThreadTimeline,
  applyDiscreteStates,
  beatWindows,
} from '../lib/threadChoreo';
import { prefersReducedMotion } from '../lib/gsap';
import { WA_LINK } from '../lib/site';
import screenRect from '../assets/hero-screen-rect.json';

// share of the pin the thread owns (entrance before, settle after)
const THREAD_START = 0.16;
const THREAD_SPAN = 0.78;

const windows = beatWindows(heroThread);
const master = (t: number) => THREAD_START + t * THREAD_SPAN;

export default function Hero() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const common = (threadRoot: HTMLElement, rig: HTMLElement | null) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section.current,
            start: 'top top',
            // function-based absolute distance: a %-string here resolves
            // against the trigger's height, which includes the pin spacer —
            // every refresh would compound the padding exponentially
            end: () => '+=' + window.innerHeight * 3.5,
            pin: '.hero-pin',
            // pre-existing spacer: no re-parent at init, so the prerendered
            // H1 (the LCP element) is never repainted by pin setup (§8)
            pinSpacer: '.hero-pin-spacer',
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = gsap.utils.clamp(0, 1, (self.progress - THREAD_START) / THREAD_SPAN);
              applyDiscreteStates(threadRoot, p, heroThread);
            },
            onToggle: (self) => {
              if (rig) rig.style.willChange = self.isActive ? 'transform' : '';
            },
          },
        });
        tl.set({}, {}, 1); // exact duration 1 == pin progress

        // headline clears BEFORE the phone crosses it — no collision moment
        tl.to('.hero-copy', { autoAlpha: 0, y: -40, duration: 0.07, ease: 'power2.in' }, 0.03);

        // thread beats
        const threadTl = buildThreadTimeline(threadRoot, heroThread);
        threadTl.paused(false);
        tl.add(threadTl, THREAD_START);
        threadTl.duration(THREAD_SPAN);

        return tl;
      };

      // §9: reduced motion — no pin, no scrub, final states applied.
      // ?motion forces the animated path for dev/testing in automated browsers.
      const reduced =
        prefersReducedMotion() && !new URLSearchParams(window.location.search).has('motion');

      if (reduced) {
        section.current!.querySelectorAll<HTMLElement>('.screen-rect').forEach((root) => {
          const tl = buildThreadTimeline(root, heroThread);
          tl.progress(1).kill();
          applyDiscreteStates(root, 1, heroThread);
        });
        gsap.set('.hero-sat', { autoAlpha: 1, x: 0 });
        return;
      }

      mm.add('(min-width: 768px)', () => {
        const rig = section.current!.querySelector<HTMLElement>('.phone-rig')!;
        const threadRoot = rig.querySelector<HTMLElement>('.screen-rect')!;

        // welded unit: photo + DOM thread transform together (§5 M1)
        gsap.set(rig, {
          rotateY: -6,
          rotateX: 2,
          scale: 0.965,
          transformOrigin: '50% 60%',
          y: () => window.innerHeight * 0.82,
        });
        gsap.set('.hero-sat', { autoAlpha: 0 });

        const tl = common(threadRoot, rig);

        // entrance: a long silky glide up from the bottom edge, starting only
        // after the headline has begun to clear
        tl.to(rig, { y: 0, scale: 1, duration: 0.18, ease: 'power3.out' }, 0.05);
        // then a barely-there drift through the beats — never frozen
        tl.to(rig, { y: -16, duration: 0.62, ease: 'none' }, 0.3);

        // satellite cards — two swaps, never more than two on screen (§5 M1)
        tl.fromTo('.hero-sat-l', { x: -60, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.05, ease: 'power2.out' }, master(windows[2].start));
        tl.to('.hero-sat-l', { x: -30, autoAlpha: 0, duration: 0.04, ease: 'power2.in' }, master(windows[4].start));
        tl.fromTo('.hero-sat-r', { x: 60, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.05, ease: 'power2.out' }, master(windows[5].start));

        // beat 6: the ✅ lands, the rig settles head-on, glow warms (§6.2)
        tl.to(rig, { rotateY: 0, rotateX: 0, duration: 0.16, ease: 'power2.inOut' }, master(windows[5].start));
        tl.to('.hero-glow', { opacity: 1.5, duration: 0.14 }, master(windows[5].start));
      });

      mm.add('(max-width: 767.98px)', () => {
        const frame = section.current!.querySelector<HTMLElement>('.phone-frame-mobile')!;
        const threadRoot = frame.querySelector<HTMLElement>('.screen-rect')!;

        gsap.set(frame, { y: () => window.innerHeight * 0.9, scale: 0.97, transformOrigin: '50% 60%' });
        const tl = common(threadRoot, frame);
        tl.to(frame, { y: 0, scale: 1, duration: 0.18, ease: 'power3.out' }, 0.05);
      });

      return () => mm.revert();
    },
    { scope: section },
  );

  // cqw is relative to the RIG (image) width, so the radius must be scaled
  // against imgW — dividing by the screen width over-rounds the corners ~3x
  const rectStyle = {
    left: `${screenRect.pct.left}%`,
    top: `${screenRect.pct.top}%`,
    width: `${screenRect.pct.width}%`,
    height: `${screenRect.pct.height}%`,
    borderRadius: `${(screenRect.radius / screenRect.imgW) * 100}cqw`,
  };

  return (
    <section ref={section} id="top" aria-label="VIXA AI — send money on WhatsApp">
      <div className="hero-pin-spacer">
      <div className="hero-pin relative h-screen overflow-hidden">
        <HeroGrid />

        {/* headline block (§6.2) */}
        <div className="hero-copy gutter absolute inset-x-0 top-[15vh] z-10 text-center">
          <h1 className="font-display text-display-lg mx-auto max-w-[22ch] font-bold">
            Send money on <span className="text-vx-lime">WhatsApp</span> — instantly across{' '}
            <span className="text-vx-lime">Africa</span>.
          </h1>
          <p className="text-body-lg mx-auto mt-5 max-w-[56ch] text-vx-ash">
            Send money like you send a message. Buy, sell, swap, or move crypto. No apps. No long
            steps. Just send a message, confirm with your PIN, and your money moves.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <a
              href={WA_LINK}
              className="rounded-pill bg-vx-olive px-7 py-3.5 text-[15px] font-semibold text-vx-void transition-colors hover:bg-vx-olive-lo cursor-pointer"
            >
              Chat on WhatsApp Now
            </a>
            <a
              href="#demo"
              className="rounded-pill border border-vx-slate px-7 py-3.5 text-[15px] font-medium text-vx-bone transition-colors hover:border-vx-olive"
            >
              Send your first transfer
            </a>
          </div>
        </div>

        {/* stage */}
        <div className="pointer-events-none absolute inset-0 z-20" style={{ perspective: '1600px' }}>
          {/* one radial glow behind the phone (§3) — desktop has it baked into
              the photo itself so no seam can outline the image rectangle */}
          <div
            aria-hidden="true"
            className="hero-glow absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-[46%] md:hidden"
            style={{
              background:
                'radial-gradient(closest-side, rgba(126,139,61,0.16), rgba(126,139,61,0.05) 55%, transparent 72%)',
            }}
          />

          {/* desktop: photo rig — image + thread are siblings, welded (§5 M1) */}
          <div
            className="phone-rig absolute left-1/2 top-[-14vh] hidden h-[132vh] -translate-x-1/2 md:block"
            style={{
              aspectRatio: '1400 / 1875',
              transformStyle: 'preserve-3d',
              containerType: 'inline-size',
            }}
          >
            <picture>
              <source srcSet="/hero-hand-phone.avif" type="image/avif" />
              <img
                src="/hero-hand-phone.webp"
                width={1400}
                height={1875}
                alt="A hand holding a phone running VIXA AI in WhatsApp"
                fetchPriority="high"
                decoding="async"
                className="h-full w-full"
                onLoad={() => ScrollTrigger.refresh()}
              />
            </picture>
            <div className="screen-rect absolute overflow-hidden" style={rectStyle}>
              <ChatThread messages={heroThread} />
            </div>
          </div>

          {/* mobile: minimal CSS device frame — the visitor is already holding
              a phone; the photo adds nothing at 390px (§5 M1) */}
          <div className="phone-frame-mobile absolute left-1/2 top-[7vh] h-[86vh] w-[min(92vw,44vh)] -translate-x-1/2 md:hidden">
            <div className="h-full w-full rounded-[40px] border border-vx-slate bg-black p-[8px] shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
              <div className="screen-rect h-full w-full overflow-hidden rounded-[32px]">
                <ChatThread messages={heroThread} />
              </div>
            </div>
          </div>

          {/* satellite cards (§5 M1) — data echoes of the thread, not new copy */}
          <div className="hero-sat hero-sat-l absolute left-[7%] top-[38%] z-30 hidden items-center gap-3 rounded-card border border-vx-slate bg-vx-char px-4 py-3 lg:flex">
            <img src="/flags/ke.svg" alt="" width={36} height={36} className="h-9 w-9 rounded-full" loading="lazy" decoding="async" />
            <div>
              <p className="text-[15px] font-semibold leading-5">6,450 KES</p>
              <p className="text-mono-meta mt-0.5 text-vx-ash">via M-Pesa</p>
            </div>
          </div>
          <div className="hero-sat hero-sat-r absolute right-[7%] top-[54%] z-30 hidden items-center gap-3 rounded-card border border-vx-slate bg-vx-char px-4 py-3 lg:flex">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-vx-olive/25 text-vx-lime" aria-hidden="true">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 8.5l3.5 3.5 7.5-8" />
              </svg>
            </span>
            <div>
              <p className="text-[15px] font-semibold leading-5">Ref: VX-8291</p>
              <p className="text-mono-meta mt-0.5 text-vx-ash">Sent to +254****</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
