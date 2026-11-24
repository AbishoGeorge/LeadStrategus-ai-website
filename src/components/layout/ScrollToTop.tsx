import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Links to a section (e.g. /gtm-workshop#apply) scroll to that section instead.
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
