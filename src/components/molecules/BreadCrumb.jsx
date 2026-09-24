'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft, ChevronRight, House } from 'lucide-react';

import { Button } from '@/components/ui/button';

const ROUTE_LABELS = {
  about: 'About Us',
};

const formatSegmentLabel = (segment) => {
  if (ROUTE_LABELS[segment.toLowerCase()]) {
    return ROUTE_LABELS[segment.toLowerCase()];
  }

  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function Breadcrumb() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);

  const crumbs = segments.map((segment, i) => ({
    label: formatSegmentLabel(segment),
    path: '/' + segments.slice(0, i + 1).join('/'),
  }));

  return (
    <div className="bg-background/50 sticky top-0 z-10 flex items-center gap-3 py-3 backdrop-blur-xl lg:py-4">
      <button
        className="text-primaryBlue hidden sm:block"
        onClick={() => router.back()}
      >
        <ArrowLeft size={20} />
      </button>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          onClick={() => router.push('/')}
          className="text-foreground hover:text-primary-green flex cursor-pointer items-center gap-2 border-none bg-transparent p-0 outline-none hover:bg-transparent"
        >
          <House size={14} className="text-foreground" />
          <span className="font-semibold sm:text-base">Home</span>
        </Button>

        {crumbs.map((crumb, i) => (
          <div key={crumb.path} className="flex items-center gap-2">
            <ChevronRight size={18} className="text-foreground" />
            {i === crumbs.length - 1 ? (
              <span className="breadcrumb__current text-primary-green text-sm font-semibold sm:text-base">
                {crumb.label}
              </span>
            ) : (
              <button
                className="breadcrumb-btn text-primaryBlue hover:text-primary-green cursor-pointer text-sm font-semibold sm:text-base"
                onClick={() => router.push(crumb.path)}
              >
                {crumb.label}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
