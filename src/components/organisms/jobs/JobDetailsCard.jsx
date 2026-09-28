import Image from 'next/image';
import { Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AnimatedCard from '@/components/ui/animated-card';
import { AnimatedWords } from '@/components/ui/animated-words';
import { timeAgo } from '@/lib/utils';

const DEFAULT_DATA = {
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
};

function TickListSection({ title, items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-foreground mb-4 text-2xl font-bold tracking-tight uppercase md:text-3xl">
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <Image
              src="/icons/green-tick.svg"
              alt="tick"
              width={20}
              height={20}
              className="mt-1.5 h-4 w-4 shrink-0 md:h-5 md:w-5"
            />
            <span className="text-muted-foreground text-base leading-relaxed md:text-xl">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function JobDetailsCard({ data = DEFAULT_DATA }) {
  if (!data) return null;

  const postedAgo = timeAgo(data?.postedAt);

  return (
    <div className="container mx-auto w-full p-4 xl:p-0">
      <AnimatedCard
        triggerOnView
        className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[2fr_1fr] lg:gap-8"
      >
        {data?.imageUrl && (
          <div className="relative flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-2xl shadow-sm lg:aspect-auto lg:h-150">
            <Image
              src={data.imageUrl || '/images/landing/hero-image.jpg'}
              alt={data.imageAlt || 'Job Image'}
              fill
              className="z-0 object-cover"
              priority
            />
            <div className="bg-overlay absolute inset-0 z-10" />
            {data?.title && (
              <h1 className="relative z-20 text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                <AnimatedWords direction="down" text={data.title} />
              </h1>
            )}
          </div>
        )}

        <Card className="border-border bg-card h-full rounded-2xl border shadow-sm">
          <CardContent className="flex h-full flex-col p-6 md:p-8">
            {data?.summaryTitle && (
              <>
                <h2 className="text-foreground mb-4 text-2xl font-bold tracking-tight uppercase md:text-3xl">
                  {data.summaryTitle}
                </h2>
                <Separator className="mb-6" />
              </>
            )}

            {data.details && data.details.length > 0 && (
              <ul className="grow space-y-4 text-sm md:text-base">
                {data.details.map((item, index) => (
                  <li key={index} className="flex items-baseline">
                    <span className="text-foreground w-28 text-base font-semibold md:w-32 md:text-xl">
                      {item.label}
                    </span>
                    <span
                      className={`text-muted-foreground text-base md:text-lg ${item.valueClassName || ''}`}
                    >
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {postedAgo && (
              <div className="text-foreground mt-8 mb-6 flex items-center gap-2 text-sm font-semibold lg:text-lg">
                <Clock className="text-foreground h-5 w-5" />
                <span>{postedAgo}</span>
              </div>
            )}
            {(data.postedAt || (data.details && data.details.length > 0)) && (
              <Separator className="mb-6" />
            )}
            {data?.applyButtonText && (
              <Button
                onClick={data.onApply}
                className="bg-primary-blue hover:bg-secondary-blue text-card mt-auto w-full cursor-pointer rounded-xl py-7 text-xl font-semibold transition-colors"
              >
                {data.applyButtonText}
              </Button>
            )}
          </CardContent>
        </Card>
      </AnimatedCard>
      <AnimatedCard
        direction="down"
        className="mt-12 flex flex-col gap-4 md:mt-16"
      >
        {data?.overview && (
          <div>
            <h3 className="text-foreground mb-4 text-2xl font-bold tracking-tight uppercase md:text-3xl">
              Job Overview
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed md:text-xl">
              {data.overview}
            </p>
          </div>
        )}

        <TickListSection
          title="Responsibilities"
          items={data?.responsibilities}
        />

        <TickListSection title="Requirements" items={data?.requirements} />
      </AnimatedCard>
    </div>
  );
}
