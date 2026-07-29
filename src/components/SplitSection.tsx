// The layout primitive for the light redesign: copy on one side, a live
// demo on the other, alternating sides down the page.
//
// Source order is always copy-first so assistive tech and keyboard tabbing
// follow the narrative; `flip` only reorders visually at >=1024px (§9).
import type { ReactNode } from 'react';

export type SplitTone = 'white' | 'mint' | 'cream' | 'sky';

const TONE_BG: Record<SplitTone, string> = {
  white: 'bg-vx-void',
  mint: 'bg-vx-mint',
  cream: 'bg-vx-cream',
  sky: 'bg-vx-sky',
};

export default function SplitSection({
  id,
  eyebrow,
  heading,
  body,
  cta,
  visual,
  flip = false,
  tone = 'white',
  watermark,
  labelledBy,
}: {
  id?: string;
  eyebrow?: string;
  heading: ReactNode;
  body?: ReactNode;
  cta?: ReactNode;
  visual: ReactNode;
  /** visual on the left, copy on the right (desktop only) */
  flip?: boolean;
  tone?: SplitTone;
  /** oversized ghost word behind the section */
  watermark?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      className={`section-pad gutter relative overflow-hidden ${TONE_BG[tone]}`}
      aria-labelledby={labelledBy}
    >
      {watermark && (
        <span className="split-watermark font-display" data-text={watermark} aria-hidden="true" />
      )}

      <div className="content-col relative">
        <div className="split-grid" data-flip={flip ? 'true' : 'false'}>
          <div className="split-copy" data-reveal-group>
            {eyebrow && (
              <p
                data-reveal
                className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-vx-olive"
              >
                {eyebrow}
              </p>
            )}
            <h2
              id={labelledBy}
              data-reveal
              className={`font-display text-display-lg font-bold text-vx-bone ${eyebrow ? 'mt-5' : ''}`}
            >
              {heading}
            </h2>
            {body && (
              <div data-reveal className="text-body-lg mt-5 max-w-[46ch] text-vx-ash">
                {body}
              </div>
            )}
            {cta && (
              <div data-reveal className="mt-9">
                {cta}
              </div>
            )}
          </div>

          <div className="split-visual relative">{visual}</div>
        </div>
      </div>
    </section>
  );
}
