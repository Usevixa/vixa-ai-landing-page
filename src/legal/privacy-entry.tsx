import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '../index.css';
import PrivacyPage from './PrivacyPage';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <PrivacyPage />
  </StrictMode>
);

// Production ships prerendered HTML (§1.6: readable without JS); hydrate it.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
