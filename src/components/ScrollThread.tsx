// A chat thread that plays itself as its section scrolls through the viewport.
// No pin — the hero owns the one pinned moment; every other section just plays
// its demo in place as you pass it.
import { useRef } from 'react';
import ChatThread, { type ChatMessage } from './ChatThread';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { buildThreadTimeline, applyDiscreteStates } from '../lib/threadChoreo';

export default function ScrollThread({
  messages,
  dateLabel = 'Today',
  statusTime = '9:41',
}: {
  messages: ChatMessage[];
  dateLabel?: string;
  statusTime?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = wrap.current!.querySelector<HTMLElement>('.wa-screen')!.parentElement!;

      if (prefersReducedMotion() && !new URLSearchParams(window.location.search).has('motion')) {
        requestAnimationFrame(() => {
          buildThreadTimeline(root, messages).progress(1).kill();
          applyDiscreteStates(root, 1, messages);
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap.current,
          start: 'top 80%',
          end: 'bottom 25%',
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => applyDiscreteStates(root, self.progress, messages),
        },
      });
      tl.set({}, {}, 1);
      const threadTl = buildThreadTimeline(root, messages);
      threadTl.paused(false);
      tl.add(threadTl, 0);
      threadTl.duration(1);
    },
    { scope: wrap, dependencies: [messages] },
  );

  return (
    <div ref={wrap} className="h-full w-full">
      <ChatThread messages={messages} dateLabel={dateLabel} statusTime={statusTime} />
    </div>
  );
}
