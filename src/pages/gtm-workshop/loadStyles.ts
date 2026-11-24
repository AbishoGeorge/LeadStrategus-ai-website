export const GTM_STYLES_HREF = '/gtm-workshop/styles.css';

/**
 * Loads the GTM Workshop stylesheet before the page is shown, so client-side
 * navigation never flashes unstyled content. Resolves straight away on the server
 * and when the stylesheet is already on the page (e.g. a prerendered load).
 */
export function loadGtmStyles(): Promise<void> {
  if (typeof document === 'undefined') return Promise.resolve();
  const existing = document.querySelector<HTMLLinkElement>(`link[rel="stylesheet"][href="${GTM_STYLES_HREF}"]`);
  if (existing?.sheet) return Promise.resolve();
  return new Promise((resolve) => {
    const link = existing ?? document.createElement('link');
    link.addEventListener('load', () => resolve(), { once: true });
    link.addEventListener('error', () => resolve(), { once: true });
    if (!existing) {
      link.rel = 'stylesheet';
      link.href = GTM_STYLES_HREF;
      document.head.appendChild(link);
    }
  });
}
