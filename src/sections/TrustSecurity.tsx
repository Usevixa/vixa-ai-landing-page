// §6.7 — trust. Split, phone on the right, showing a flagged transaction the
// user cancels: the claim demonstrated rather than asserted.
import SplitSection from '../components/SplitSection';
import PhoneStage from '../components/PhoneStage';
import ScrollThread from '../components/ScrollThread';
import { trustThread } from '../data/threads';

const ICONS: Record<string, React.ReactNode> = {
  pin: (
    <>
      <rect x="4" y="9" width="16" height="12" rx="2.5" />
      <path d="M8 9V6.5a4 4 0 0 1 8 0V9" />
      <circle cx="12" cy="15" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  identity: (
    <>
      <circle cx="9.5" cy="9" r="3.2" />
      <path d="M4 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <path d="M15.5 9.5l2 2 3.5-4" />
    </>
  ),
  risk: (
    <>
      <path d="M12 3.5l7.5 3.5v5c0 4.5-3.2 7.6-7.5 8.5-4.3-.9-7.5-4-7.5-8.5v-5z" />
      <path d="M12 8.5v4.5" />
      <circle cx="12" cy="16" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  audit: (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <path d="M9 8.5h6M9 12h6M9 15.5h3.5" />
    </>
  ),
};

const ITEMS = [
  { icon: 'pin', h: 'PIN Required', b: 'Every transaction needs your confirmation.' },
  { icon: 'identity', h: 'Identity Verified', b: 'Only real users. Full compliance.' },
  { icon: 'risk', h: 'Risk Monitoring', b: 'Suspicious activity is automatically flagged.' },
  { icon: 'audit', h: 'Audit Trail', b: 'Every transaction is recorded and traceable.' },
];

export default function TrustSecurity() {
  return (
    <SplitSection
      labelledBy="trust-h"
      tone="white"
      flip
      watermark="TRUST"
      eyebrow="Trust &amp; security"
      heading={
        <>
          Money doesn't move <span className="text-vx-olive">without you</span>
        </>
      }
      body={
        <div className="mt-2 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {ITEMS.map((it) => (
            <div key={it.h} className="flex gap-3.5">
              <svg
                viewBox="0 0 24 24"
                width="23"
                height="23"
                fill="none"
                stroke="#1F6B3F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="mt-0.5 shrink-0"
              >
                {ICONS[it.icon]}
              </svg>
              <span>
                <strong className="block text-[16px] font-semibold text-vx-bone">{it.h}</strong>
                <span className="mt-1 block text-[15px]">{it.b}</span>
              </span>
            </div>
          ))}
        </div>
      }
      visual={
        <PhoneStage>
          <ScrollThread messages={trustThread} statusTime="11:32" />
        </PhoneStage>
      }
    />
  );
}
