// §10 step 3: ChatThread in isolation with a manual progress slider.
// Dev-only page — not part of the marketing site.
import { useEffect, useRef, useState } from 'react';
import ChatThread from '../components/ChatThread';
import { heroThread, demoThread } from '../data/threads';
import { useGSAP } from '../lib/gsap';
import {
  buildThreadTimeline,
  applyDiscreteStates,
  resetDiscreteStates,
} from '../lib/threadChoreo';

function Frame({
  messages,
  label,
  progress,
}: {
  messages: typeof heroThread;
  label: string;
  progress: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const tlRef = useRef<ReturnType<typeof buildThreadTimeline> | null>(null);
  const pRef = useRef(progress);
  pRef.current = progress;

  useGSAP(
    () => {
      if (!ref.current) return;
      tlRef.current = buildThreadTimeline(ref.current, messages);
      tlRef.current.progress(pRef.current);
      applyDiscreteStates(ref.current, pRef.current, messages);
    },
    { scope: ref, dependencies: [messages] },
  );

  // slider drives both layers
  useEffect(() => {
    if (!ref.current || !tlRef.current) return;
    tlRef.current.progress(progress);
    if (progress === 0) resetDiscreteStates(ref.current);
    applyDiscreteStates(ref.current, progress, messages);
  }, [progress, messages]);

  return (
    <div>
      <p className="mb-3 text-center text-eyebrow font-medium uppercase tracking-[0.14em] text-vx-ash">
        {label}
      </p>
      <div
        ref={ref}
        className="h-[720px] w-[340px] overflow-hidden rounded-[44px] border border-vx-slate"
      >
        <ChatThread messages={messages} />
      </div>
    </div>
  );
}

export default function ThreadPlayground() {
  const [p, setP] = useState(0);

  return (
    <div className="min-h-screen py-10">
      <div className="mx-auto flex w-fit gap-10">
        <Frame messages={heroThread} label="Hero §6.2" progress={p} />
        <Frame messages={demoThread} label="Live demo §6.5" progress={p} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-4 border-t border-vx-slate bg-vx-char px-8 py-4">
        <span className="text-mono-meta w-16 text-vx-ash">p = {p.toFixed(3)}</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.001}
          value={p}
          onChange={(e) => setP(parseFloat(e.target.value))}
          className="flex-1 accent-[#7E8B3D]"
          aria-label="Thread progress"
        />
      </div>
    </div>
  );
}
