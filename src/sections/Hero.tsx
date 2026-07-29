// §6.2 Hero — light theme, split layout. Copy holds the left column while the
// phone on the right plays the six-beat WhatsApp thread on scroll.
//
// Changed from the dark build: the headline no longer scrubs away. Holding the
// copy in place for the whole pin is the point of the split — you read the
// promise while the demo proves it.
import { useRef } from 'react';
import ChatThread from '../components/ChatThread';
import { heroThread, HERO_DATE } from '../data/threads';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { buildThreadTimeline, applyDiscreteStates, beatWindows } from '../lib/threadChoreo';
import { WA_LINK } from '../lib/site';
import screenRect from '../assets/hero-screen-rect.json';

const THREAD_START = 0.1;
const THREAD_SPAN = 0.85;

const windows = beatWindows(heroThread);
const master = (t: number) => THREAD_START + t * THREAD_SPAN;

export default function Hero() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced =
        prefersReducedMotion() && !new URLSearchParams(window.location.search).has('motion');

      if (reduced) {
        requestAnimationFrame(() => {
          section.current?.querySelectorAll<HTMLElement>('.screen-rect').forEach((root) => {
            buildThreadTimeline(root, heroThread).progress(1).kill();
            applyDiscreteStates(root, 1, heroThread);
          });
          gsap.set('.hero-float', { autoAlpha: 1, y: 0 });
        });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const rig = section.current!.querySelector<HTMLElement>('.phone-rig')!;
        const threadRoot = rig.querySelector<HTMLElement>('.screen-rect')!;

        gsap.set('.hero-float', { autoAlpha: 0, y: 14 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section.current,
            start: 'top top',
            end: () => '+=' + window.innerHeight * 2.2,
            pin: '.hero-pin',
            pinSpacer: '.hero-pin-spacer',
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = gsap.utils.clamp(0, 1, (self.progress - THREAD_START) / THREAD_SPAN);
              applyDiscreteStates(threadRoot, p, heroThread);
            },
            onToggle: (self) => {
              rig.style.willChange = self.isActive ? 'transform' : '';
            },
          },
        });
        tl.set({}, {}, 1);

        const threadTl = buildThreadTimeline(threadRoot, heroThread);
        threadTl.paused(false);
        tl.add(threadTl, THREAD_START);
        threadTl.duration(THREAD_SPAN);

        // the phone drifts up a touch through the beats — never frozen
        tl.fromTo(rig, { y: 26 }, { y: -20, duration: 0.9, ease: 'none' }, 0.05);

        // floats ride their matching beats
        const RATE = windows[2].start;
        const DONE = windows[windows.length - 1].start;
        tl.to('.hero-float-rate', { autoAlpha: 1, y: 0, duration: 0.05, ease: 'power2.out' }, master(RATE));
        tl.to('.hero-float-done', { autoAlpha: 1, y: 0, duration: 0.05, ease: 'power2.out' }, master(DONE));
      });

      // below lg the section is a normal stacked block: the thread plays as it
      // scrolls through the viewport, no pin (a pinned phone-in-a-phone eats
      // the whole screen on mobile)
      mm.add('(max-width: 1023.98px)', () => {
        const frame = section.current!.querySelector<HTMLElement>('.phone-frame-mobile')!;
        const threadRoot = frame.querySelector<HTMLElement>('.screen-rect')!;

        gsap.set('.hero-float', { autoAlpha: 1, y: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: frame,
            start: 'top 78%',
            end: 'bottom 20%',
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => applyDiscreteStates(threadRoot, self.progress, heroThread),
          },
        });
        tl.set({}, {}, 1);
        const threadTl = buildThreadTimeline(threadRoot, heroThread);
        threadTl.paused(false);
        tl.add(threadTl, 0);
        threadTl.duration(1);
      });

      return () => mm.revert();
    },
    { scope: section },
  );

  const rectStyle = {
    left: `${screenRect.pct.left}%`,
    top: `${screenRect.pct.top}%`,
    width: `${screenRect.pct.width}%`,
    height: `${screenRect.pct.height}%`,
    borderRadius: `${(screenRect.radius / screenRect.imgW) * 100}cqw`,
  };

  return (
    <section ref={section} id="top" aria-label="VIXA — send money on WhatsApp">
      <div className="hero-pin-spacer">
        {/* the soft green wash is painted as a background, not a child element:
            a 900px decorative div inside a container that grows on font/image
            load is a pure CLS generator (measured 0.126) */}
        {/* items-center only where the split is side-by-side. Stacked, a
            vertically-centred column recentres on every late height change
            (fonts, thread fit) and drags the phone with it — measured as the
            page's entire CLS. */}
        {/* Deliberately flat white — no wash. The hero photo's backdrop is
            level-matched to pure #FFF, so ANY tint behind it exposes the
            image's rectangle as a lighter patch. */}
        <div className="hero-pin gutter relative flex min-h-screen items-start overflow-hidden bg-vx-void pt-[112px] lg:items-center lg:pt-0">
          <div className="content-col relative w-full">
            <div className="split-grid">
              {/* copy */}
              <div className="split-copy" data-reveal-group>
                <p
                  data-reveal
                  className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-vx-olive"
                >
                  Money on WhatsApp
                </p>
                <h1
                  data-reveal
                  className="font-display text-display-lg mt-5 max-w-[16ch] font-bold text-vx-bone"
                >
                  Send money on <span className="text-vx-olive">WhatsApp</span>, instantly across{' '}
                  <span className="text-vx-olive">Africa</span>.
                </h1>
                <p data-reveal className="text-body-lg mt-6 max-w-[48ch] text-vx-ash">
                  Send money like you send a message. Buy, sell, swap, or move crypto. No apps. No
                  long steps. Just send a message, confirm with your PIN, and your money moves.
                </p>
                <div data-reveal className="mt-9 flex flex-wrap items-center gap-4">
                  <a
                    href={WA_LINK}
                    className="inline-flex items-center gap-2.5 rounded-pill bg-vx-olive px-7 py-3.5 text-[15px] font-semibold text-vx-void transition-colors hover:bg-vx-olive-lo"
                  >
                    <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">
                      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.8-.6-3.1-1.3-5.1-4.4-5.3-4.6-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .5-.1.7.5l1 2.4c.1.2.1.4 0 .6l-.4.5-.3.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.2.4-.2.6-.1l2.2 1.1c.2.1.4.2.5.3.1.2.1.7-.1 1.4z" />
                    </svg>
                    Chat on WhatsApp
                  </a>
                  <a
                    href="#demo"
                    className="rounded-pill border border-vx-slate px-7 py-3.5 text-[15px] font-medium text-vx-bone transition-colors hover:border-vx-olive hover:text-vx-olive"
                  >
                    See it in action
                  </a>
                </div>
              </div>

              {/* phone */}
              <div className="split-visual relative">
                {/* desktop: the photographed hand, thread composited into the glass */}
                <div
                  className="phone-rig relative mx-auto hidden w-full max-w-[440px] lg:block"
                  style={{ aspectRatio: `${screenRect.imgW} / ${screenRect.imgH}`, containerType: 'inline-size' }}
                >
                  <picture>
                    <source srcSet="/hero-hand-phone.avif" type="image/avif" />
                    <img
                      src="/hero-hand-phone.webp"
                      width={screenRect.imgW}
                      height={screenRect.imgH}
                      alt="A hand holding a phone running VIXA in WhatsApp"
                      fetchPriority="high"
                      decoding="async"
                      className="h-full w-full"
                      onLoad={() => ScrollTrigger.refresh()}
                    />
                  </picture>
                  <div className="screen-rect absolute overflow-hidden" style={rectStyle}>
                    <ChatThread messages={heroThread} dateLabel={HERO_DATE} />
                  </div>
                </div>

                {/* below lg: a clean CSS device frame */}
                <div className="phone-frame-mobile mx-auto w-full max-w-[330px] lg:hidden">
                  <div
                    className="rounded-[46px] p-[9px]"
                    style={{
                      background:
                        'linear-gradient(150deg, #d7dbd8 0%, #8d948f 28%, #5f6763 62%, #b9bfbb 100%)',
                      boxShadow: '0 2px 4px rgba(15,25,18,0.14), 0 30px 60px -24px rgba(15,25,18,0.4)',
                    }}
                  >
                    <div
                      className="screen-rect relative overflow-hidden rounded-[38px] bg-black"
                      style={{ aspectRatio: '390 / 844' }}
                    >
                      <ChatThread messages={heroThread} dateLabel={HERO_DATE} />
                    </div>
                  </div>
                </div>

                {/* floating proof cards */}
                <div className="hero-float hero-float-rate absolute left-[-2%] top-[24%] z-20 hidden items-center gap-3 rounded-[16px] border border-vx-slate bg-white px-4 py-3 shadow-[0_10px_30px_-12px_rgba(15,25,18,0.25)] lg:flex">
                  <img src="/flags/ng.svg" alt="" width={34} height={34} className="h-[34px] w-[34px] rounded-full" loading="lazy" decoding="async" />
                  <div>
                    <p className="text-[15px] font-semibold leading-5 text-vx-bone">₦1,400.11</p>
                    <p className="text-mono-meta mt-0.5 text-vx-ash">Buy rate · USDT</p>
                  </div>
                </div>
                <div className="hero-float hero-float-done absolute right-[-3%] top-[62%] z-20 hidden items-center gap-3 rounded-[16px] border border-vx-slate bg-white px-4 py-3 shadow-[0_10px_30px_-12px_rgba(15,25,18,0.25)] lg:flex">
                  <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-vx-olive/12 text-vx-olive" aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.5 8.5l3.5 3.5 7.5-8" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold leading-5 text-vx-bone">100 USDT credited</p>
                    <p className="text-mono-meta mt-0.5 text-vx-ash">Balance: 100 USDT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
