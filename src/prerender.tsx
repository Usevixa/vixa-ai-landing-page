// Build-time prerender entry (§8 LCP / §1.6 no-JS). Consumed by
// scripts/inject-prerender.mjs after `vite build --ssr`.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
