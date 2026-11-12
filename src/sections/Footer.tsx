// §6.13 — no animation. Let the page end.
import { WA_LINK, SUPPORT_EMAIL, COMPANY_NAME } from '../lib/site';

export default function Footer() {
  return (
    <footer className="gutter border-t border-vx-slate bg-vx-void py-14">
      <div className="content-col flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-2">
          <a href="/" className="font-display text-[22px] font-bold tracking-[0.02em]">
            VIXA
          </a>
          <p className="text-[14px] text-vx-ash">A product of {COMPANY_NAME}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[14px] text-vx-ash">
            <li><a className="transition-colors hover:text-vx-bone" href="/#why">Why Vixa</a></li>
            <li><a className="transition-colors hover:text-vx-bone" href="/#how">How it Works</a></li>
            <li><a className="transition-colors hover:text-vx-bone" href="/#coverage">Coverage</a></li>
            <li><a className="transition-colors hover:text-vx-bone" href="/privacy">Privacy Policy</a></li>
            <li><a className="transition-colors hover:text-vx-bone" href="/terms">Terms of Service</a></li>
          </ul>
        </nav>

        <ul className="flex flex-col gap-2 text-[14px] text-vx-ash">
          <li>
            <a className="transition-colors hover:text-vx-bone" href={WA_LINK}>WhatsApp Support</a>
          </li>
          <li>
            <a className="transition-colors hover:text-vx-bone" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </li>
        </ul>
      </div>
      <p className="content-col text-mono-meta mt-12 text-vx-ash" suppressHydrationWarning>
        © {new Date().getFullYear()} {COMPANY_NAME}. VIXA is a product of {COMPANY_NAME}. All rights reserved.
      </p>
    </footer>
  );
}
