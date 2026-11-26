import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { PresenceContext } from 'framer-motion';

// True on the server, and in the browser when it is hydrating a prerendered page.
// False when the SPA fallback renders an empty #root from scratch.
const startsFromPrerender =
  typeof document === 'undefined' || Boolean(document.getElementById('root')?.hasChildNodes());

// What framer-motion reads from AnimatePresence. `initial: false` makes motion elements
// start at their final state instead of their `initial` (e.g. opacity 0).
const showWithoutEntrance = {
  id: 'first-page',
  isPresent: true,
  initial: false as const,
  register: () => () => {},
};

/**
 * Entrance animations start content at opacity 0, and only JavaScript brings it in.
 * In the prerendered HTML that made the first page look blank until the scripts had
 * loaded. On the page a visitor lands on, show everything straight away; pages they
 * then navigate to keep their entrance animations.
 */
export default function FirstPageMotion({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [firstPage, setFirstPage] = useState(startsFromPrerender);
  const landedOn = useRef(pathname);

  useEffect(() => {
    if (pathname !== landedOn.current) setFirstPage(false);
  }, [pathname]);

  return firstPage ? (
    <PresenceContext.Provider value={showWithoutEntrance}>{children}</PresenceContext.Provider>
  ) : (
    <>{children}</>
  );
}
