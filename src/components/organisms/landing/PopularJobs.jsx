'use client';
import { AnimatedWords } from '@/components/ui/animated-words';
import JobCard from '@/components/molecules/cards/JobCard';
import { AutoCarousel } from '@/components/molecules/AutoCarousel';

const jobsData = [
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

const PopularJobs = ({ jobs }) => {
  const jobsdata = jobs ? jobs.items.slice(0, 6) : jobsData;

  return (
    <section className="container mx-auto px-4 lg:px-0">
      <h1 className="text-destructive text-center text-4xl font-bold md:text-5xl lg:text-7xl">
        <AnimatedWords
          text="Popular Jobs"
          animKey="text"
          staggerMs={100}
          durationMs={800}
          direction="up"
          className="mt-1 justify-center"
        />
      </h1>
      <div className="flex items-center justify-center overflow-hidden">
        <AutoCarousel
          items={jobsdata}
          transition="marquee"
          marqueeSpeed={90}
          itemClassName="basis-full sm:basis-1/2 lg:basis-1/3"
          showGradientMask={false}
          className="max-w-80 sm:max-w-full"
          onlyEffectWhenNeeded
          renderItem={(job, index) => (
            <div data-no-drag>
              <JobCard key={job.id} job={job} />
            </div>
          )}
        />
      </div>
    </section>
  );
};

export default PopularJobs;
