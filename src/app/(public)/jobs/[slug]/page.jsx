import { notFound } from 'next/navigation';
import { ROUTES } from '@/constants/routes/routes';
import { JobDetailsCard } from '@/components/organisms/jobs/JobDetailsCard';

const FALLBACK_IMAGE = '/images/landing/hero-image.jpg';

async function getJobBySlug(slug) {
  try {
    const res = await fetch(ROUTES.API.JOBS.SINGLE_VIA_SLUG(slug), {
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (data?.success && data?.item) {
      return data.item;
    }
    return null;
  } catch {
    return null;
  }
}

function resolveImageUrl(src) {
  if (!src) return FALLBACK_IMAGE;
  return src.startsWith('http') ? src : `${process.env.NEXT_PUBLIC_HOST}${src}`;
}

function buildSummaryRows(job) {
  return [
    { label: 'Position:', value: job.title },
    { label: 'Location:', value: job.location },
    { label: 'Job Type:', value: job.workingHours },
    { label: 'Experience:', value: job.experience },
    { label: 'Salary:', value: job.salary, valueClassName: 'text-primary' },
  ].filter((row) => row.value);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  return {
    title: job?.title || 'Job',
    description: job?.description || undefined,
  };
}

export default async function JobDetailsPage({ params }) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) notFound();

  const jobData = {
    title: job.title,
    imageUrl: resolveImageUrl(job.imgSrc),
    imageAlt: job.title,
    summaryTitle: 'Job Summary',
    postedAt: job.createdAt,
    applyButtonText: 'Apply Now',
    applyHref: ROUTES.APPLICATION,
    details: buildSummaryRows(job),
    overview: job.details?.overview || job.description,
    responsibilities: job.details?.responsibilities,
    requirements: job.details?.requirements,
  };

  return (
    <section className="flex flex-col items-center gap-8 pb-12">
      <JobDetailsCard data={jobData} />
    </section>
  );
}
