import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Site-wide strip above the navbar. Its height (h-10) is part of the header
// height that Layout and the GTM Workshop page offset their content by.
export default function AnnouncementBar() {
  return (
    <Link
      to="/gtm-workshop#apply"
      className="group relative flex h-10 items-center justify-center gap-2 overflow-hidden bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 px-4 text-white"
    >
      <span className="truncate text-[13px] font-medium sm:text-sm">
        <span className="sm:hidden">Cohort 1 open</span>
        <span className="hidden sm:inline">
          <span className="font-semibold">GTM Engineering Workshop:</span> Cohort 1 is open in Bengaluru
        </span>
      </span>
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand-red-400/50 bg-brand-red-500/15 px-2.5 py-0.5 text-xs font-semibold text-red-200">
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red-400 opacity-75 motion-reduce:animate-none" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-red-400" />
        </span>
        Seats filling fast
      </span>
      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-red-500 px-2.5 py-0.5 text-xs font-semibold transition-colors group-hover:bg-brand-red-600">
        Apply
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
      </span>
    </Link>
  );
}
