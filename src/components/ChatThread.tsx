// The heart of the site (§7). Purely presentational — all scroll/slider
// choreography is applied externally via lib/threadChoreo.ts so the same
// component serves the hero (M1), the live demo (M1b) and the playground.
//
// The screen is laid out at a fixed iPhone design width (390pt, iOS-true
// WhatsApp metrics) and scaled as ONE unit to fit whatever rect hosts it —
// exactly how a real screenshot would scale. This kills every viewport-
// dependent reflow (wrapping placeholders, cramped bubbles).
import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from '../lib/gsap';

export type ChatMessage = {
  id: string;
  side: 'in' | 'out';
  type: 'text' | 'voice' | 'typing';
  body?: string;
  time: string;
  /** final tick state an outgoing message reaches */
  tick?: 'one' | 'two' | 'blue';
};

const DESIGN_W = 390; // iPhone 14/15/16 Pro logical width

// WhatsApp-style doodle wallpaper as a tiled inline SVG (§6.2) — one pattern,
// zero network requests. Drawn white, faded via opacity.
const DOODLE = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round"><circle cx="22" cy="24" r="7"/><path d="M52 14c4 6 12 6 14 0"/><path d="M96 26l5-9 5 9z"/><path d="M118 64c-6 2-6 10 0 12"/><path d="M14 76q6-8 12 0t12 0"/><circle cx="66" cy="70" r="5"/><path d="M92 88l8 8m0-8l-8 8"/><path d="M28 116c2-6 10-6 12 0"/><path d="M64 112q8-6 12 2"/><circle cx="112" cy="118" r="6"/><path d="M124 16v10m-5-5h10"/></svg>`);

// §9: emoji in copy get accessible labels
const EMOJI_LABELS: Record<string, string> = {
  '✅': 'done',
  '⚡': 'instant',
  '🔒': 'secure',
  '🔐': 'secure',
  '💱': 'exchange rate',
  '⚠️': 'warning',
  '👉': 'pointing right',
};
const EMOJI_SPLIT = /(✅|⚡|🔒|🔐|💱|⚠️|👉)/g;

export function renderBody(text: string) {
  return text.split(EMOJI_SPLIT).map((part, i) =>
    EMOJI_LABELS[part] ? (
      <span key={i} role="img" aria-label={EMOJI_LABELS[part]}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

const VOICE_BARS = [
  6, 11, 17, 12, 20, 15, 8, 16, 21, 13, 7, 12, 18, 22, 15, 10, 17, 12, 7, 13,
  20, 16, 11, 18, 15, 8, 15, 21, 12, 7, 16, 11, 17, 13, 8, 12,
];

function Ticks({ final = 'blue' }: { final?: 'one' | 'two' | 'blue' }) {
  // starts hidden; choreography sets data-tick to one/two/blue
  return (
    <span
      className="wa-ticks inline-flex items-end"
      data-tick="none"
      data-final={final}
      aria-hidden="true"
    >
      <svg viewBox="0 0 18 11" width="18" height="11" fill="none">
        <path
          className="wa-tick-1"
          d="M1.5 6l3 3L10 2.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="wa-tick-2"
          d="M7.5 6.7L9.8 9 16.5 2.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function VoiceNote() {
  return (
    <span role="img" className="flex items-center gap-2.5 py-1.5" aria-label="Voice note, 4 seconds">
      <span
        className="wa-voice-play grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#00A884]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 12 14" width="13" height="15" fill="#0B141A">
          <path d="M1 1.3v11.4c0 .8.9 1.3 1.6.9l9-5.7c.6-.4.6-1.4 0-1.8l-9-5.7C1.9 0 1 .5 1 1.3z" />
        </svg>
      </span>
      <span className="relative flex h-7 items-center gap-[2.5px]" aria-hidden="true">
        {VOICE_BARS.map((h, i) => (
          <span
            key={i}
            className="wa-voice-bar w-[2.5px] rounded-full bg-wa-meta"
            style={{ height: `${h}px` }}
          />
        ))}
        {/* lime progress fill sweeps via width from choreography */}
        <span className="wa-voice-fill absolute inset-y-0 left-0 flex w-0 items-center gap-[2.5px] overflow-hidden">
          {VOICE_BARS.map((h, i) => (
            <span
              key={i}
              className="w-[2.5px] shrink-0 rounded-full bg-vx-lime"
              style={{ height: `${h}px` }}
            />
          ))}
        </span>
      </span>
      <span className="text-[13px] text-wa-meta" aria-hidden="true">
        0:04
      </span>
    </span>
  );
}

function TypingIndicator() {
  return (
    <span role="img" className="flex h-5 items-center gap-[4px] px-1.5" aria-label="VIXA is typing">
      <span className="wa-dot h-[7px] w-[7px] rounded-full bg-wa-meta" />
      <span className="wa-dot h-[7px] w-[7px] rounded-full bg-wa-meta" style={{ animationDelay: '0.15s' }} />
      <span className="wa-dot h-[7px] w-[7px] rounded-full bg-wa-meta" style={{ animationDelay: '0.3s' }} />
    </span>
  );
}

function Bubble({ msg, showTail }: { msg: ChatMessage; showTail: boolean }) {
  const out = msg.side === 'out';
  const isTyping = msg.type === 'typing';
  return (
    <div
      className={`wa-msg flex px-[14px] ${out ? 'justify-end' : 'justify-start'} ${isTyping ? 'wa-typing absolute left-0 top-0 w-full' : ''}`}
      data-msg={msg.id}
      data-side={msg.side}
      data-type={msg.type}
    >
      <div
        className={`wa-bubble relative max-w-[75%] px-[12px] pb-[8px] pt-[7px] text-[16.5px] leading-[22px] text-wa-text shadow-[0_1px_1px_rgba(0,0,0,0.18)] ${
          out
            ? `rounded-[16px] bg-wa-out ${showTail ? 'rounded-br-[5px]' : ''}`
            : `rounded-[16px] bg-wa-in ${showTail ? 'rounded-bl-[5px]' : ''}`
        }`}
      >
        {/* tail — bottom corner, correct side (iOS WhatsApp, §7) */}
        {showTail && (
          <span
            aria-hidden="true"
            className={`absolute bottom-0 h-0 w-0 border-b-[9px] ${
              out
                ? '-right-[7px] border-l-[9px] border-l-transparent border-b-wa-out'
                : '-left-[7px] border-r-[9px] border-r-transparent border-b-wa-in'
            }`}
          />
        )}
        <span className="sr-only">{out ? 'You:' : 'VIXA:'}</span>
        {isTyping ? (
          <TypingIndicator />
        ) : msg.type === 'voice' ? (
          <VoiceNote />
        ) : (
          <span className="whitespace-pre-line [overflow-wrap:anywhere]">{renderBody(msg.body ?? '')}</span>
        )}
        {!isTyping && (
          <>
            {/* spacer reserves room so the meta cluster never overlaps text —
                short messages keep the timestamp inline, like real WhatsApp */}
            <span
              aria-hidden="true"
              className={`inline-block h-0 ${out ? 'w-[78px]' : 'w-[46px]'}`}
            />
            <span
              className={`absolute bottom-[6px] right-[10px] flex items-center gap-[3px] text-[12px] leading-none ${
                out ? 'text-[#8AB3AA]' : 'text-wa-meta'
              }`}
              aria-hidden="true"
            >
              {msg.time}
              {out && <Ticks final={msg.tick ?? 'blue'} />}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default function ChatThread({
  messages,
  dateLabel = 'Today',
  statusTime = '12:25',
}: {
  messages: ChatMessage[];
  dateLabel?: string;
  statusTime?: string;
}) {
  // fit-to-container: layout at DESIGN_W, scale as one unit (screenshot-like)
  const outer = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ scale: 1, h: 844 });

  useEffect(() => {
    const el = outer.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) {
        const scale = width / DESIGN_W;
        setFit({ scale, h: height / scale });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // the fit-scale changes the thread's internal geometry, which the pinned
  // choreography measures — let ScrollTrigger re-read it once it settles
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [fit.scale, fit.h]);

  return (
    <div ref={outer} className="relative h-full w-full" style={{ borderRadius: 'inherit' }}>
      <div
        className="wa-screen absolute left-0 top-0 flex flex-col overflow-hidden bg-wa-bg"
        style={{
          // absolutely positioned so the design-width screen never participates
          // in layout — a flow child that resizes when the fit settles shifts
          // its whole column (measured CLS 0.119)
          width: DESIGN_W,
          height: fit.h,
          transform: `scale(${fit.scale})`,
          transformOrigin: 'top left',
          borderRadius: 24,
          // iOS renders WhatsApp in SF Pro — system stack inside the phone
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Inter, sans-serif",
        }}
      >
        {/* glass: a whisper of inner shadow sells the screen as physical */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            borderRadius: 'inherit',
            boxShadow: 'inset 0 0 18px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
        />
        {/* doodle wallpaper (§7) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `url("data:image/svg+xml,${DOODLE}")`, backgroundSize: '140px 140px' }}
        />

        {/* iOS status bar: time · Dynamic Island · signal/wifi/battery */}
        <div className="relative z-10 flex h-[52px] shrink-0 items-end justify-between bg-wa-header px-[28px] pb-[7px]" aria-hidden="true">
          <span className="w-[60px] text-center text-[16px] font-semibold tracking-[-0.02em] text-white">{statusTime}</span>
          <span className="absolute left-1/2 top-[11px] flex h-[36px] w-[125px] -translate-x-1/2 items-center justify-end rounded-[20px] bg-black pr-[10px]">
            <span className="h-[13px] w-[13px] rounded-full bg-[#14141c] ring-1 ring-[#2c2c35]" />
          </span>
          <span className="flex items-center gap-[7px] text-white">
            {/* cellular */}
            <svg viewBox="0 0 19 12" width="19" height="12" fill="currentColor">
              <rect x="0" y="7.5" width="3.4" height="4.5" rx="1" />
              <rect x="5" y="5" width="3.4" height="7" rx="1" />
              <rect x="10" y="2.5" width="3.4" height="9.5" rx="1" />
              <rect x="15" y="0" width="3.4" height="12" rx="1" fillOpacity="0.4" />
            </svg>
            {/* wifi */}
            <svg viewBox="0 0 17 12" width="17" height="12" fill="currentColor">
              <path d="M8.5 9.4a1.8 1.8 0 1 1 0 2.6 1.8 1.8 0 0 1 0-2.6z" />
              <path d="M5.2 7.5a5 5 0 0 1 6.6 0L10.4 9a3 3 0 0 0-3.8 0z" />
              <path d="M2 4.7a9.2 9.2 0 0 1 13 0l-1.4 1.5a7.2 7.2 0 0 0-10.2 0z" />
            </svg>
            {/* battery */}
            <svg viewBox="0 0 28 13" width="28" height="13" fill="none">
              <rect x="0.5" y="0.5" width="24" height="12" rx="4" stroke="currentColor" strokeOpacity="0.45" />
              <rect x="2" y="2" width="11" height="9" rx="2.5" fill="currentColor" />
              <path d="M26 4.5v4c1.2-.3 2-1.1 2-2s-.8-1.7-2-2z" fill="currentColor" fillOpacity="0.45" />
            </svg>
          </span>
        </div>

        {/* chat header — iOS WhatsApp: back chevron, avatar, name, video + call */}
        <header className="relative z-10 flex shrink-0 items-center gap-[10px] bg-wa-header px-[14px] pb-[10px] pt-[4px]">
          <span className="flex shrink-0 items-center" aria-hidden="true">
            <svg viewBox="0 0 12 20" width="12" height="20" className="text-wa-text" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 2L2.5 10l7.5 8" />
            </svg>
          </span>
          <span
            className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-white text-[13px] font-bold tracking-[-0.03em] text-[#0B141A]"
            aria-hidden="true"
          >
            VI
          </span>
          <div className="min-w-0">
            <p className="truncate text-[17px] font-semibold leading-[21px] text-wa-text">VIXA</p>
            <p className="text-[13px] leading-[17px] text-wa-meta">Online</p>
          </div>
          <span className="ml-auto flex shrink-0 items-center gap-[24px] pr-[6px] text-wa-text" aria-hidden="true">
            <svg viewBox="0 0 26 17" width="26" height="17" fill="none" stroke="currentColor" strokeWidth="1.7">
              <rect x="0.9" y="1.4" width="16" height="14.2" rx="3.6" />
              <path d="M18.4 7.2l4.7-3.4c.7-.5 1.7 0 1.7.9v8.1c0 .9-1 1.4-1.7.9l-4.7-3.4z" />
            </svg>
            <svg viewBox="0 0 21 21" width="21" height="21" fill="currentColor">
              <path d="M4.4 1.5c.5-.5 1.4-.5 1.9 0L9 4.2c.5.5.5 1.4 0 1.9L7.6 7.5c-.3.3-.4.8-.2 1.2a13.2 13.2 0 0 0 4.9 4.9c.4.2.9.1 1.2-.2l1.4-1.4c.5-.5 1.4-.5 1.9 0l2.7 2.7c.5.5.5 1.4 0 1.9l-1.5 1.5c-.9.9-2.3 1.3-3.5.9-5.3-1.8-9.5-6-11.3-11.3-.4-1.2 0-2.6.9-3.5z" />
            </svg>
          </span>
        </header>

        {/* messages — role=log (§9); inner .wa-scroll is translated by choreography */}
        <div className="relative min-h-0 flex-1 overflow-hidden" role="log" aria-label="Chat with VIXA">
          <div className="wa-scroll flex flex-col gap-[8px] pb-[8px] pt-[12px]">
            <div className="mb-[4px] flex justify-center">
              <span className="rounded-[8px] bg-wa-in px-[12px] py-[6px] text-[13px] font-medium text-wa-meta shadow-[0_1px_1px_rgba(0,0,0,0.18)]">
                {dateLabel}
              </span>
            </div>
            {(() => {
              // typing bubbles render inside the NEXT message's slot (absolute)
              // so their disappearance never shifts the flow — the real message
              // pops into the exact spot where the dots were.
              type Item = { m: ChatMessage; typing?: ChatMessage };
              const items: Item[] = [];
              let pendingTyping: ChatMessage | undefined;
              for (const m of messages) {
                if (m.type === 'typing') {
                  pendingTyping = m;
                  continue;
                }
                items.push({ m, typing: pendingTyping });
                pendingTyping = undefined;
              }
              return items.map(({ m, typing }) => {
                const bubble = <Bubble key={m.id} msg={m} showTail />;
                if (!typing) return bubble;
                return (
                  <div key={m.id} className="relative">
                    <Bubble msg={typing} showTail />
                    {bubble}
                  </div>
                );
              });
            })()}
          </div>
        </div>

        {/* composer — iOS WhatsApp: smiley · Message · clip · camera · mic (§7) */}
        <div className="relative z-10 shrink-0 pb-[30px]">
          <div className="flex items-center gap-[10px] px-[10px] pt-[8px]">
            <div className="flex h-[40px] flex-1 items-center gap-[10px] whitespace-nowrap rounded-full bg-wa-in pl-[12px] pr-[14px] text-[16.5px] text-wa-meta">
              {/* smiley */}
              <svg viewBox="0 0 22 22" width="23" height="23" className="shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="11" cy="11" r="9" />
                <path d="M7 13a5 5 0 0 0 8 0" strokeLinecap="round" />
                <circle cx="7.8" cy="8.6" r="1.1" fill="currentColor" stroke="none" />
                <circle cx="14.2" cy="8.6" r="1.1" fill="currentColor" stroke="none" />
              </svg>
              <span className="flex-1">Message</span>
              {/* paperclip */}
              <svg viewBox="0 0 20 22" width="21" height="23" className="shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M14.2 7.2v8.1a4.6 4.6 0 0 1-9.2 0V6.3a2.9 2.9 0 0 1 5.8 0v8.9a1.4 1.4 0 0 1-2.8 0V7.4" />
              </svg>
              {/* camera */}
              <svg viewBox="0 0 24 22" width="24" height="22" className="shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <rect x="1" y="4.4" width="22" height="16.2" rx="3.8" />
                <path d="M7.4 4.4L9 1.6h6l1.6 2.8" strokeLinejoin="round" />
                <circle cx="12" cy="12.4" r="4.3" />
              </svg>
            </div>
            <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-[#00A884]" aria-hidden="true">
              {/* mic */}
              <svg viewBox="0 0 20 22" width="20" height="22" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round">
                <rect x="6.6" y="1.6" width="6.8" height="11.4" rx="3.4" fill="#fff" stroke="none" />
                <path d="M3.8 10.2a6.2 6.2 0 0 0 12.4 0" />
                <path d="M10 16.4v3.4" />
              </svg>
            </span>
          </div>
          {/* iOS home indicator */}
          <span
            aria-hidden="true"
            className="absolute bottom-[9px] left-1/2 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-white/45"
          />
        </div>
      </div>
    </div>
  );
}
