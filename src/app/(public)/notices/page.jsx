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

  const title = isFirstPage ? 'Notices' : `Notices - Page ${page}`;
  const description =
    'Read the latest official notices and announcements from SSWCE Human Resources, including admission updates, exam schedules, training programs, and recruitment information for candidates preparing for jobs in Japan.';
  const canonical = isFirstPage ? '/notices' : `/notices?page=${page}`;

  return {
    title,
    description,
    keywords: [
      'SSWCE notices',
      'Japan recruitment notice Nepal',
      'JFT exam notice',
      'SSW training announcement',
      'SSWCE Human Resources updates',
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
          alt: 'SSWCE Human Resources Notices',
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

async function getNotices(page = 1) {
  try {
    const res = await fetch(ROUTES.API.NOTICES.HOME(page, 9), {
      cache: 'no-store',
    });
    if (!res.ok) return { items: [], totalPages: 1 };
    const data = await res.json();
    return data || { items: [], totalPages: 1 };
  } catch (error) {
    return { items: [], totalPages: 1 };
  }
}

export default async function NoticesPage(props) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page || 1);
  const data = await getNotices(page);
  const notices = data?.items || [];
  const totalPages = data?.totalPages || 1;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Notices | SSWCE Human Resources',
    url: `${SITE_URL}/notices`,
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
        <AnimatedHeading text="Notices" />

        {!notices || notices.length === 0 ? (
          <p className="mt-10 text-center text-gray-500">
            No notices available at the moment.
          </p>
        ) : (
          <div
            className={`grid w-full grid-cols-1 justify-center gap-6 md:grid-cols-2 lg:grid-cols-3`}
          >
            {notices.map((notice) => (
              <InfoCard
                key={notice.id}
                item={{
                  name: notice.title,
                  description: notice.description,
                  imageSrc: resolveUrl(notice.mediaUrl),
                }}
                href={ROUTES.NOTICES.SINGLE(notice.slug)}
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
