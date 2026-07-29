// §6.4 — use cases. Split: copy + case list on one side, the phone showing a
// completed transfer on the other.
import SplitSection from '../components/SplitSection';
import PhoneStage from '../components/PhoneStage';
import ScrollThread from '../components/ScrollThread';
import { whyThread } from '../data/threads';

const CARDS = [
  { h: 'Send money home', b: 'Support family across borders in seconds.' },
  { h: 'Pay freelancers', b: 'Work with anyone across Africa without bank delays.' },
  { h: 'Run your business', b: 'Send and receive payments across countries easily.' },
  { h: 'Move crypto to cash', b: 'Convert USDT to local currency instantly.' },
];

export default function WhyVixa() {
  return (
    <SplitSection
      id="why"
      labelledBy="why-h"
      tone="mint"
      watermark="WHY"
      eyebrow="Why VIXA"
      heading={
        <>
          Built for how <span className="text-vx-olive">Africa actually moves money</span>
        </>
      }
      body={
        <ul className="mt-2 flex flex-col gap-5">
          {CARDS.map((c) => (
            <li key={c.h} className="flex gap-3.5">
              <span
                className="mt-[7px] h-[7px] w-[7px] shrink-0 rounded-full bg-vx-olive"
                aria-hidden="true"
              />
              <span>
                <strong className="block font-semibold text-vx-bone">{c.h}</strong>
                <span className="text-[15.5px]">{c.b}</span>
              </span>
            </li>
          ))}
        </ul>
      }
      visual={
        <PhoneStage>
          <ScrollThread messages={whyThread} statusTime="8:13" />
        </PhoneStage>
      }
    />
  );
}
