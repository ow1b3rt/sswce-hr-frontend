import ApplicationForm from '@/components/organisms/forms/ApplicationForm';
import { getOpenJobs } from '@/lib/api/jobs';

export default async function ApplicationPage() {
  const jobs = await getOpenJobs();

  const positions = jobs
    .map((job) => ({ value: job.title, label: job.title }))
    .filter((option) => Boolean(option.value));

  return (
    <section className="flex flex-col items-center gap-8 pb-12">
      <ApplicationForm positions={positions} />
    </section>
  );
}
