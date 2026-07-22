import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '../index.css';
import TermsPage from './TermsPage';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <TermsPage />
  </StrictMode>
);

// Production ships prerendered HTML (§1.6: readable without JS); hydrate it.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
