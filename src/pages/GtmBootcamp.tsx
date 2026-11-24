import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import pageHtml from './gtm-bootcamp/content.html?raw';

// The GTM Engineering Workshop page is built from gtm-bootcamp/ by
// scripts/build-gtm-bootcamp.mjs. Its styles are scoped under .gtm-root.
export default function GtmBootcamp() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/gtm-bootcamp/main.js';
    document.body.appendChild(script);
    return () => {
      script.remove();
      // Stop the page's animations; their elements are gone once we navigate away.
      const w = window as Window & { __gtmTimers?: number[] };
      (w.__gtmTimers ?? []).forEach((id) => {
        clearInterval(id);
        clearTimeout(id);
      });
      w.__gtmTimers = [];
      document.body.classList.remove('modal-open');
    };
  }, []);

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="/gtm-bootcamp/styles.css" />
        <link rel="preload" href="/gtm-bootcamp/fonts/montserrat.woff2" as="font" type="font/woff2" crossOrigin="" />
      </Helmet>
      <div className="gtm-root" dangerouslySetInnerHTML={{ __html: pageHtml }} />
    </>
  );
}
