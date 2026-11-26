import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Site-wide strip above the navbar. Its height (h-10) is part of the header
// height that Layout and the GTM Workshop page offset their content by.
export default function AnnouncementBar() {
  const { pathname } = useLocation();
  return (
    <Link
      to="/gtm-workshop"
      // Already on the workshop page: the route doesn't change, so scroll up ourselves.
      onClick={() => {
        if (pathname === '/gtm-workshop') window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className="group relative flex h-10 items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap sm:gap-2 bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 px-4 text-white"
    >
      {/* If space runs out (narrow phone, larger text setting) this text shortens first;
          the Apply button never shrinks, so it always stays fully visible. */}
      <span className="min-w-0 truncate text-[12px] font-medium sm:text-sm">
        <span className="sm:hidden">Cohort 1 open</span>
        <span className="hidden sm:inline">
          <span className="font-semibold">GTM Engineering Workshop:</span> Cohort 1 is open in Bengaluru
        </span>
      </span>
      <span className="inline-flex min-w-0 items-center gap-1.5 rounded-full border border-brand-red-400/50 bg-brand-red-500/15 px-2 py-0.5 text-[11px] font-semibold text-red-200 sm:px-2.5 sm:text-xs">
        <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red-400 opacity-75 motion-reduce:animate-none" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-red-400" />
        </span>
        <span className="truncate sm:hidden">Filling fast</span>
        <span className="hidden sm:inline">Seats filling fast</span>
      </span>
      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-red-500 px-2 py-0.5 text-[11px] font-semibold sm:px-2.5 sm:text-xs transition-colors group-hover:bg-brand-red-600">
        Apply
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
      </span>
    </Link>
  );
}
