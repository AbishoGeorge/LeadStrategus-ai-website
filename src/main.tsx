import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './App.tsx';
import './index.css';

const router = createBrowserRouter(routes);

const app = (
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>
);

const container = document.getElementById('root')!;

// Prerendered pages ship real HTML in #root; hydrate it. The SPA fallback ships an empty root.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
