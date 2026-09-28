import { JobDetailsCard } from '@/components/organisms/jobs/JobDetailsCard';

const jobs = [
  {
    title: 'Designer',
    imageUrl: '/images/landing/hero-image.jpg',
    imageAlt: 'Office Reception',
    summaryTitle: 'Job Summary',
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 1000).toISOString(),
    applyButtonText: 'Apply Now',
    details: [
      { label: 'Position:', value: 'UI/UX Designer' },
      { label: 'Location:', value: 'Kathmandu, Nepal' },
      { label: 'Job Type:', value: 'Full-Time' },
      { label: 'Experience:', value: '3+ Years' },
      { label: 'Salary:', value: 'Rs 8,000', valueClassName: 'text-primary' },
      { label: 'Lorem:', value: 'Ipsum' },
    ],
    overview:
      'Lorem ipsum dolor sit amet consectetur. Vitae non tincidunt hac cursus fringilla in. Maecenas ullamcorper justo tortor pretium porttitor. Scelerisque rhoncus lacus sed ultricies suscipit interdum. Ridiculus sapien scelerisque aliquet tristique aliquam. Scelerisque donec leo aliquam ipsum turpis. Mattis lorem accumsan ullamcorper commodo etiam. Faucibus non semper placerat risus pharetra nibh pharetra. Maecenas ultricies ut scelerisque orci ipsum fermentum massa aliquet. Urna non tellus etiam ipsum ultrices. Pretium aliquam hac vitae quam mattis sit odio nibh condimentum. Sagittis duis sed consectetur mauris eget. Mattis malesuada nisi ultrices justo. Non tellus ullamcorper aliquet cursus pellentesque vel rhoncus. Nullam id ullamcorper dictum et amet at vel neque tempus.',
    responsibilities: [
      "Australia, with over 840,000 international students and records more than 1 million enrolments, making it one of the world's leading study destinations.",
      'Nepal is currently the 3rd largest source country for international students in Australia (contributing 8% of the total population), ensuring a vibrant community and strong support networks for new arrivals.',
      'For 2026, the Australian Government has set the National Planning Level for new international student commencements at 295,000, an increase of 25,000 seats from the previous year to maintain sustainable growth.',
      'Students applying to "Level 1" (highly ranked) universities continue to see the highest visa grant rates, as these institutions are prioritized under the 2026 migration integrity frameworks.',
      "A majority of international students in Australia come from Asia, particularly countries like China, India, and Nepal, highlighting the region's strong representation in the student population.",
      'Australia is home to 9 of the top 100 universities in the world, offering degrees that are globally recognized and respected.',
      'For 2026, the Australian Department of Home Affairs requires international students to show evidence of at least AUD 29,710 per year to cover personal living expenses (excluding tuition and travel)',
    ],
    requirements: [
      "Australia, with over 840,000 international students and records more than 1 million enrolments, making it one of the world's leading study destinations.",
      'Nepal is currently the 3rd largest source country for international students in Australia (contributing 8% of the total population), ensuring a vibrant community and strong support networks for new arrivals.',
      'For 2026, the Australian Government has set the National Planning Level for new international student commencements at 295,000, an increase of 25,000 seats from the previous year to maintain sustainable growth.',
      'Students applying to "Level 1" (highly ranked) universities continue to see the highest visa grant rates, as these institutions are prioritized under the 2026 migration integrity frameworks.',
      "A majority of international students in Australia come from Asia, particularly countries like China, India, and Nepal, highlighting the region's strong representation in the student population.",
      'Australia is home to 9 of the top 100 universities in the world, offering degrees that are globally recognized and respected.',
      'For 2026, the Australian Department of Home Affairs requires international students to show evidence of at least AUD 29,710 per year to cover personal living expenses (excluding tuition and travel)',
    ],
  },
];

export default async function JobDetailsPage({ params }) {
  const { slug } = await params;

  const job = jobs.find((job) => job.slug === slug);

  return (
    <section className="flex flex-col items-center gap-8 pb-12">
      <JobDetailsCard data={job} />
    </section>
  );
}
