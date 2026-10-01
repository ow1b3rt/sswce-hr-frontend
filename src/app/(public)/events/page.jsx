import InfoCard from '@/components/molecules/cards/InfoCard';
import { CalendarDays } from 'lucide-react';
import { ROUTES } from '@/constants/routes/routes';
import { resolveUrl } from '@/lib/utils';
import { AnimatedHeading } from '@/components/atoms/headings';

import { Pagenav } from '@/components/Reusables';

const SITE_URL = 'https://sswcehumanresources.com';

export async function generateMetadata(props) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page || 1);
  const isFirstPage = page <= 1;

  const title = isFirstPage ? 'Events' : `Events - Page ${page}`;
  const description =
    'Stay updated with upcoming and past events from SSWCE Human Resources, including seminars, orientation programs, Japanese language sessions, and recruitment activities for Nepali candidates seeking jobs in Japan.';
  const canonical = isFirstPage ? '/events' : `/events?page=${page}`;

  return {
    title,
    description,
    keywords: [
      'SSWCE events',
      'Japan job seminar Nepal',
      'SSW orientation program',
      'Japanese language events Kathmandu',
      'recruitment events Nepal',
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}${canonical}`,
      siteName: 'SSW Training Centre Nepal',
      title: `${title} | SSWCE Human Resources`,
      description,
      locale: 'en_US',
      images: [
        {
          url: '/images/landing/ssw-office.jpg',
          width: 1200,
          height: 630,
          alt: 'SSWCE Human Resources Events',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | SSWCE Human Resources`,
      description,
      images: ['/images/landing/ssw-office.jpg'],
    },
  };
}

async function getEvents(page = 1) {
  try {
    const res = await fetch(ROUTES.API.EVENTS.HOME(page, 9), {
      cache: 'no-store',
    });
    if (!res.ok) return { items: [], totalPages: 1 };
    const data = await res.json();
    return data || { items: [], totalPages: 1 };
  } catch (error) {
    return { items: [], totalPages: 1 };
  }
}

export default async function EventsPage(props) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page || 1);
  const data = await getEvents(page);
  const events = data?.items || [];
  const totalPages = data?.totalPages || 1;

  const cols = Math.min(events.length || 1, 3);
  const mdCols = Math.min(events.length || 1, 2);
  const mdColClass = mdCols === 1 ? 'md:grid-cols-1' : 'md:grid-cols-2';
  const lgColClass =
    cols === 1
      ? 'lg:grid-cols-1'
      : cols === 2
        ? 'lg:grid-cols-2'
        : 'lg:grid-cols-3';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Events | SSWCE Human Resources',
    url: `${SITE_URL}/events`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'SSWCE Human Resources',
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="flex flex-col items-center gap-8 pb-12">
        <AnimatedHeading text="Events" />

        {!events || events.length === 0 ? (
          <p className="mt-10 text-center text-gray-500">
            No events available at the moment.
          </p>
        ) : (
          <div
            className={`grid w-full grid-cols-1 justify-center gap-6 ${mdColClass} ${lgColClass}`}
          >
            {events.map((event) => (
              <InfoCard
                key={event.id}
                item={{
                  name: event.title,
                  description: event.description,
                  imageSrc: resolveUrl(event.mediaUrl),
                }}
                href={ROUTES.EVENTS.SINGLE(event.slug)}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 w-full max-w-4xl">
            <Pagenav page={page} totalPages={totalPages} />
          </div>
        )}
      </section>
    </>
  );
}
