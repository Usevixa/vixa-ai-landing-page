/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // VIXA world — everything outside the phone screen
        'vx-void': '#14140F',
        'vx-char': '#1F1F19',
        'vx-slate': '#2E2E27',
        'vx-olive': '#7E8B3D',
        'vx-olive-lo': '#5C6630',
        'vx-lime': '#C3E043',
        'vx-bone': '#EDEDE4',
        'vx-ash': '#9A9A8C',
        // WhatsApp thread — ONLY inside the phone screen (sole exception: §6.9 testimonials)
        'wa-bg': '#0B141A',
        'wa-in': '#202C33',
        'wa-out': '#005C4B',
        'wa-header': '#202C33',
        'wa-text': '#E9EDEF',
        'wa-meta': '#8696A0',
        'wa-tick': '#53BDEB',
      },
      fontFamily: {
        display: ['"Clash Display"', '"Clash Fallback"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 9vw, 8.5rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2.5rem, 5.5vw, 4.5rem)', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        title: ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'body-lg': ['clamp(1.05rem, 1.4vw, 1.25rem)', { lineHeight: '1.55' }],
        body: ['1rem', { lineHeight: '1.6' }],
        eyebrow: ['0.8125rem', { lineHeight: '1', letterSpacing: '0.14em' }],
        'mono-meta': ['0.75rem', { lineHeight: '1', letterSpacing: '0.02em' }],
      },
      borderRadius: {
        chip: '4px',
        card: '14px',
        pill: '999px',
      },
      maxWidth: {
        content: '1280px',
      },
      spacing: {
        gutter: 'clamp(1.25rem, 5vw, 4rem)',
        section: 'clamp(6rem, 14vh, 11rem)',
      },
    },
  },
  plugins: [],
};
