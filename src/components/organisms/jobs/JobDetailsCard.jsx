import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AnimatedCard from '@/components/ui/animated-card';
import { AnimatedWords } from '@/components/ui/animated-words';
import { timeAgo } from '@/lib/utils';

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
              className="mt-1.5 h-4 w-4 shrink-0 md:h-4 md:w-6"
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

export function JobDetailsCard({ data }) {
  if (!data) return null;

  const postedAgo = timeAgo(data?.postedAt);

  return (
    <div className="container mx-auto w-full p-4 xl:p-0">
      <AnimatedCard
        triggerOnView
        className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[2fr_1fr] lg:gap-8"
      >
        {data?.imageUrl && (
          <div className="relative flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-2xl shadow-sm lg:aspect-auto lg:h-138">
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

        <Card className="border-border bg-card rounded-2xl border shadow-sm">
          <CardContent className="flex flex-col p-6 md:p-8">
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
            {data?.applyButtonText && data?.applyHref && (
              <Button
                nativeButton={false}
                render={<Link href={data.applyHref} />}
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
