import { TimelineItem } from '@/components/organisms/about-us/TimelineItem';
import { timelineEntries } from '@/resources/data/timeline-data';

export function MissionTimeline() {
  return (
    <section className="bg-background">
      <div className="mx-auto py-12 sm:py-16 lg:px-0 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
          <div className="lg:pt-2">
            <h2 className="text-destructive text-3xl leading-[1.05] font-black sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-6xl">
              Building Careers,
              <br />
              Supporting Businesses,
              <br />
              Shaping Futures
            </h2>

            <p className="text-muted-foreground mt-5 text-base leading-relaxed sm:mt-6 sm:text-xl">
              SSWCE Human Resource is dedicated to connecting skilled
              individuals with meaningful career opportunities. We support
              candidates and employers through trusted recruitment services,
              professional guidance, and a commitment to building a capable and
              connected workforce.
            </p>
          </div>

          <ol className="flex flex-col">
            {timelineEntries.map((entry, idx) => (
              <TimelineItem
                key={entry.id}
                entry={entry}
                isLast={idx === timelineEntries.length - 1}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
