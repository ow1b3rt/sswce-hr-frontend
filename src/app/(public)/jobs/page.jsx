import JobCard from '@/components/molecules/cards/JobCard';

const jobs = [
  {
    id: 1,
    title: 'Frontend Engineer',
    locationType: 'Onsite',
    salaryMin: 'Rs 5000',
    salaryMax: 'Rs 8000',
    description:
      'Lorem ipsum dolor sit amet consectetur. Eget morbi at varius in sagittis tellus commodo diam scelerisque. Orci quis enim tristique nam neque mauris tellus consectetur.',
    experienceYears: 2,
    postedDaysAgo: 3,
  },
  {
    id: 2,
    title: 'HR Specialist',
    locationType: 'Remote',
    salaryMin: 'Rs 6000',
    salaryMax: 'Rs 10000',
    description:
      'Lorem ipsum dolor sit amet consectetur. Eget morbi at varius in sagittis tellus commodo diam scelerisque. Orci quis enim tristique nam neque mauris tellus consectetur.',
    experienceYears: 3,
    postedDaysAgo: 5,
  },
  {
    id: 3,
    title: 'Recruiter',
    locationType: 'Hybrid',
    salaryMin: 'Rs 4500',
    salaryMax: 'Rs 7500',
    description:
      'Lorem ipsum dolor sit amet consectetur. Eget morbi at varius in sagittis tellus commodo diam scelerisque. Orci quis enim tristique nam neque mauris tellus consectetur.',
    experienceYears: 1,
    postedDaysAgo: 1,
  },
  {
    id: 4,
    title: 'People Ops Associate',
    locationType: 'Onsite',
    salaryMin: 'Rs 3000',
    salaryMax: 'Rs 5000',
    description:
      'Lorem ipsum dolor sit amet consectetur. Eget morbi at varius in sagittis tellus commodo diam scelerisque. Orci quis enim tristique nam neque mauris tellus consectetur.',
    experienceYears: 1,
    postedDaysAgo: 7,
  },
];

export default function Jobs() {
  const cols = Math.min(jobs.length, 3);
  const mdCols = Math.min(jobs.length, 2);
  const mdColClass = mdCols === 1 ? 'md:grid-cols-1' : 'md:grid-cols-2';
  const lgColClass = cols === 1 ? 'lg:grid-cols-1' : cols === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3';
  return (
    <section className="flex flex-col items-center gap-8">
      <h1 className="text-primary-blue text-4xl font-bold">Jobs</h1>
      <div className={`grid w-full grid-cols-1 items-start justify-center gap-6 ${mdColClass} ${lgColClass}`}>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job}></JobCard>
        ))}
      </div>
    </section>
  );
}
