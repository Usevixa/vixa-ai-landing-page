import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production ships prerendered HTML (§8: the hero H1 is the LCP element and
// must paint before React loads; §1.6: page readable without JS). Hydration
// reuses those nodes instead of replacing them — no LCP re-candidate.
// The ?playground dev page is client-only and always mismatches — hard render.
const isPlayground = new URLSearchParams(window.location.search).has('playground');
if (container.hasChildNodes() && !isPlayground) {
  hydrateRoot(container, app);
} else {
  container.innerHTML = '';
  createRoot(container).render(app);
}
