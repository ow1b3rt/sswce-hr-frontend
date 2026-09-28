import JobCard from '@/components/molecules/cards/JobCard';
import { AnimatedHeading } from '@/components/atoms/headings';

import { Pagenav } from '@/components/Reusables';
import { ROUTES } from '@/constants/routes/routes';

async function fetchJobs(page = 1) {
  try {
    const res = await fetch(ROUTES.API.JOBS.OPEN(page, 9), {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch jobs');
    }
    const data = await res.json();
    return data || { items: [], totalPages: 1 };
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return { items: [], totalPages: 1 };
  }
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

  return (
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
  );
}
