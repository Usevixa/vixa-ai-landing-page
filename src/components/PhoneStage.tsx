// A phone standing on a soft white panel — the visual half of a SplitSection.
// The device frame is pure CSS (no image request); the screen hosts whatever
// live demo the section needs.
import type { ReactNode } from 'react';

export default function PhoneStage({
  children,
  floats,
  stage = true,
  className = '',
}: {
  children: ReactNode;
  /** absolutely-positioned cards/chips that orbit the phone */
  floats?: ReactNode;
  /** draw the white rounded panel behind the phone */
  stage?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto w-full max-w-[520px] ${className}`}>
      {stage && (
        <div
          aria-hidden="true"
          className="split-stage absolute inset-x-[4%] inset-y-[6%]"
        />
      )}

      <div className="relative flex justify-center px-[8%] py-[9%]">
        {/* CSS device frame — titanium rail, thin bezel, dark glass */}
        <div
          className="phone-shell relative w-full max-w-[300px] rounded-[46px] p-[9px]"
          style={{
            background: 'linear-gradient(150deg, #d7dbd8 0%, #8d948f 28%, #5f6763 62%, #b9bfbb 100%)',
            boxShadow:
              '0 2px 4px rgba(15,25,18,0.14), 0 30px 60px -24px rgba(15,25,18,0.45)',
          }}
        >
          <div
            className="relative overflow-hidden rounded-[38px] bg-black"
            style={{ aspectRatio: '390 / 844' }}
          >
            {children}
          </div>
        </div>
      </div>

      {floats}
    </div>
  );
}

/** A floating stat/notification card that orbits the phone (§ Xara-style). */
export function FloatCard({
  children,
  className = '',
  depth = 0.5,
}: {
  children: ReactNode;
  className?: string;
  depth?: number;
}) {
  return (
    <div
      data-depth={depth}
      className={`absolute z-20 rounded-[16px] border border-vx-slate bg-white px-4 py-3 shadow-[0_10px_30px_-12px_rgba(15,25,18,0.25)] ${className}`}
    >
      {children}
    </div>
  );
}
