// §6.6 — three numbered steps. Split with the visual on the LEFT (flip), so
// the page alternates sides as you scroll.
import SplitSection from '../components/SplitSection';
import PhoneStage from '../components/PhoneStage';
import ScrollThread from '../components/ScrollThread';
import { howThread } from '../data/threads';

const STEPS = [
  { n: '01', h: 'You send a message', b: 'Text, voice note, or pidgin — VIXA understands you.' },
  { n: '02', h: 'VIXA understands instantly', b: 'It processes amount, destination, and rates in real time.' },
  { n: '03', h: 'You confirm with PIN', b: 'Nothing moves without your approval.' },
];

export default function HowItWorks() {
  return (
    <SplitSection
      id="how"
      labelledBy="how-h"
      tone="cream"
      watermark="HOW"
      eyebrow="How it works"
      heading={
        <>
          How your message becomes <span className="text-vx-olive">money</span>
        </>
      }
      body={
        <ol className="mt-2 flex flex-col gap-7">
          {STEPS.map((s) => (
            <li key={s.n} className="flex gap-4">
              <span
                className="text-mono-meta mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-vx-slate font-semibold text-vx-olive"
                aria-hidden="true"
              >
                {s.n}
              </span>
              <span>
                <strong className="block text-[17px] font-semibold text-vx-bone">{s.h}</strong>
                <span className="mt-1 block text-[15.5px]">{s.b}</span>
              </span>
            </li>
          ))}
        </ol>
      }
      visual={
        <PhoneStage>
          <ScrollThread messages={howThread} statusTime="1:05" />
        </PhoneStage>
      }
    />
  );
}
