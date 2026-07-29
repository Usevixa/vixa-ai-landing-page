// §6.5 — the "break the perfection" section: pidgin and voice notes. In the
// split system it gets copy (the dark build ran it headerless), with the
// conversation itself doing the proving on the left.
import SplitSection from '../components/SplitSection';
import PhoneStage from '../components/PhoneStage';
import ScrollThread from '../components/ScrollThread';
import { demoThread } from '../data/threads';

export default function LiveDemo() {
  return (
    <SplitSection
      id="demo"
      labelledBy="demo-h"
      tone="white"
      flip
      watermark="TALK"
      eyebrow="Talk normally"
      heading={
        <>
          Say it <span className="text-vx-olive">how you'd say it</span>
        </>
      }
      body={
        <>
          Text, pidgin, or a voice note at walking pace. VIXA reads what you meant, not what a form
          field expects — then quotes the rate and waits for your PIN.
        </>
      }
      visual={
        <PhoneStage>
          <ScrollThread messages={demoThread} statusTime="2:18" />
        </PhoneStage>
      }
    />
  );
}
