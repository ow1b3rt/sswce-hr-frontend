import ApplicationForm from '@/components/organisms/forms/ApplicationForm';
import { getOpenJobs } from '@/lib/api/jobs';

const SITE_URL = 'https://sswcehumanresources.com';

export const metadata = {
  title: 'Apply Now',
  description:
    'Apply online for jobs in Japan through SSWCE Human Resources. Submit your application for SSW and ESD positions and get support with training, documentation, and recruitment.',
  keywords: [
    'apply for jobs in Japan from Nepal',
    'Japan job application Nepal',
    'SSW application form',
    'SSWCE Human Resources apply',
  ],
  alternates: {
    canonical: '/application',
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/application`,
    siteName: 'SSW Training Centre Nepal',
    title: 'Apply Now | SSWCE Human Resources',
    description:
      'Apply online for jobs in Japan with SSWCE Human Resources and get full recruitment and training support.',
    locale: 'en_US',
    images: [
      {
        url: '/images/landing/ssw-office.jpg',
        width: 1200,
        height: 630,
        alt: 'Apply with SSWCE Human Resources',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apply Now | SSWCE Human Resources',
    description:
      'Apply online for jobs in Japan with SSWCE Human Resources and get full recruitment and training support.',
    images: ['/images/landing/ssw-office.jpg'],
  },
};

export default async function ApplicationPage({ searchParams }) {
  const params = await searchParams;
  const jobs = await getOpenJobs();
  const positions = jobs
    .map((job) => ({ value: job.title, label: job.title, slug: job.slug }))
    .filter((option) => Boolean(option.value));

  const requestedSlug = params?.position;
  const defaultPosition = requestedSlug
    ? (positions.find((option) => option.slug === requestedSlug)?.value ?? '')
    : '';

  return (
    <section className="flex flex-col items-center gap-8 pb-12">
      <ApplicationForm
        positions={positions}
        defaultPosition={defaultPosition}
      />
    </section>
  );
}
