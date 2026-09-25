import { AnimatedCounter } from '@/components/ui/animated-counter';
import SafeImage from '@/components/ui/safe-image';

const DEFAULT_DATA = {
  experts: { count: 20, suffix: '+', label: 'Experts' },
  experience: { count: 7, suffix: '+', label: 'Years Of Experience' },
  images: {
    consultation: '/images/landing/ssw-office.jpg',
    hrBlock: '/images/landing/ssw-office.jpg',
    teamMeeting: '/images/landing/ssw-office.jpg',
  },
};

export const AboutGrid = ({
  data = DEFAULT_DATA,
  className = 'mx-auto w-full max-w-6xl p-4',
}) => {
  const { experts, experience, images } = { ...DEFAULT_DATA, ...data };

  return (
    <div className={className}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        <div className="col-span-1 flex flex-col gap-4 sm:col-span-2">
          <div className="flex justify-center py-4">
            <div className="border-destructive text-destructive flex aspect-square w-36 flex-col items-center justify-center rounded-full border-6 md:w-48 md:border-10">
              <div className="flex items-center text-4xl leading-none font-black md:text-6xl">
                <AnimatedCounter
                  end={experts.count}
                  suffix={experts.suffix}
                  start={0}
                />
              </div>
              <span className="mt-1 text-lg font-bold md:text-2xl">
                {experts.label}
              </span>
            </div>
          </div>

          <div className="relative h-48 w-full overflow-hidden rounded-xl md:h-64">
            <SafeImage
              src={images.consultation}
              alt="Consultation"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-48 w-full overflow-hidden rounded-xl">
            <SafeImage
              src={images.hrBlock}
              alt="HR Block"
              fill
              className="object-cover md:hidden"
            />
          </div>
          <div className="bg-card absolute bottom-0 z-20 hidden h-56 w-111 overflow-hidden rounded-xl pt-4 pr-4 md:block lg:w-160 xl:w-180">
            <SafeImage
              src={images.hrBlock}
              alt="HR Block"
              fill
              className="rounded-xl object-cover"
            />
          </div>
        </div>

        <div className="col-span-1 flex flex-col gap-4 sm:col-span-3">
          <div className="relative min-h-48 w-full flex-1 overflow-hidden rounded-xl md:min-h-100">
            <SafeImage
              src={images.teamMeeting}
              alt="Team Meeting"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex w-full md:h-32">
            <div className="flex-1"></div>
            <div className="flex w-full flex-col items-center justify-center rounded-xl bg-[linear-gradient(180deg,#044B00_15.38%,#4CAB47_100%)] px-6 py-4 text-white shadow-lg md:w-2/3 lg:w-3/5">
              <div className="flex items-center text-4xl leading-none font-black md:text-5xl">
                <AnimatedCounter
                  end={experience.count}
                  suffix={experience.suffix}
                  start={0}
                />
              </div>
              <span className="mt-1 text-center font-bold md:text-xl">
                {experience.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutGrid;
