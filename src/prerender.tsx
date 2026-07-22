// Build-time prerender entry (§8 LCP / §1.6 no-JS). Consumed by
// scripts/inject-prerender.mjs after `vite build --ssr`. One renderer per
// HTML page in the MPA.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import PrivacyPage from './legal/PrivacyPage';
import TermsPage from './legal/TermsPage';

const html = (node: React.ReactNode) => renderToString(<StrictMode>{node}</StrictMode>);

// keyed by the dist HTML filename (without .html)
export const pages: Record<string, () => string> = {
  index: () => html(<App />),
  privacy: () => html(<PrivacyPage />),
  terms: () => html(<TermsPage />),
};

// back-compat: the original single-page export
export function render() {
  return pages.index();
}
