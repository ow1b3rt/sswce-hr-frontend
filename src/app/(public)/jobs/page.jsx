import JobCard from '@/components/molecules/cards/JobCard';
import { AnimatedHeading } from '@/components/atoms/headings';

import { Pagenav } from '@/components/Reusables';
import { ROUTES } from '@/constants/routes/routes';
import { fetchJobs } from '@/lib/api/jobs';

const SITE_URL = 'https://sswcehumanresources.com';

export async function generateMetadata(props) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page || 1);
  const isFirstPage = page <= 1;

  const title = isFirstPage ? 'Jobs in Japan' : `Jobs in Japan - Page ${page}`;
  const description =
    'Browse current job openings in Japan for Nepali candidates through SSWCE Human Resources. Apply for SSW and ESD positions in construction and other sectors with full training and recruitment support.';
  const canonical = isFirstPage ? '/jobs' : `/jobs?page=${page}`;

  return {
    title,
    description,
    keywords: [
      'jobs in Japan for Nepali',
      'Japan job vacancy Nepal',
      'SSW jobs Japan',
      'construction jobs Japan',
      'Japan work visa Nepal',
      'SSWCE Human Resources jobs',
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
          alt: 'SSWCE Human Resources Jobs',
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

export default async function Jobs(props) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page || 1);
  const data = await fetchJobs(page);
  const jobs = data.items || [];
  const totalPages = data.totalPages || 1;

  const cols = Math.min(jobs.length || 1, 3);
  const mdCols = Math.min(jobs.length || 1, 2);
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
    name: 'Jobs in Japan | SSWCE Human Resources',
    url: `${SITE_URL}/jobs`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'SSWCE Human Resources',
      url: SITE_URL,
    },
    ...(jobs.length > 0 && {
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: jobs.map((job, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: job.title,
          url: `${SITE_URL}/jobs/${job.slug}`,
        })),
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="flex flex-col items-center gap-8 pb-12">
        <AnimatedHeading text="Jobs" />
        {jobs.length > 0 ? (
          <div
            className={`grid w-full grid-cols-1 items-start justify-center gap-6 ${mdColClass} ${lgColClass}`}
          >
            {jobs.map((job) => (
              <JobCard key={job.id} job={job}></JobCard>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-lg">
            No jobs available at the moment.
          </p>
        )}

        {totalPages > 1 && <Pagenav page={page} totalPages={totalPages} />}
      </section>
    </>
  );
}
