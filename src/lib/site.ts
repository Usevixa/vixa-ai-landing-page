// Site-wide constants shared across the landing page and the legal pages.
// Kept dependency-free so the legal MPA entries don't pull in GSAP/Hero.

// §12: real wa.me deep link (client-supplied number)
const WA_NUMBER = '13072058438';
const WA_PREFILL = 'Hi VIXA, I want to get started';

export const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_PREFILL)}`;

export const SUPPORT_EMAIL = 'support@vixa.com';

// last-updated date shown on the legal pages
export const LEGAL_UPDATED = 'July 2026';


// Meta Pixel is initialised in index.html. It may be absent (adblockers,
// pixel script failed), so every call goes through optional chaining.
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Fires the Meta "Contact" conversion event for a WhatsApp CTA click.
 * `position` distinguishes the buttons in Events Manager: 'hero', 'nav', etc.
 */
export function trackWhatsAppClick(position: string) {
  window.fbq?.('track', 'Contact', {
    content_name: 'WhatsApp CTA',
    cta_position: position,
  });
}