'use client';

import { Button } from '@/components/ui/button';
import SafeImage from '@/components/ui/safe-image';
import AnimatedCard from '@/components/ui/animated-card';
import { AnimatedWords } from '@/components/ui/animated-words';
import { AutoCarousel } from '@/components/molecules/AutoCarousel';

const TrustedPartners = [
  '/images/partners/logo-1.png',
  '/images/partners/logo-2.png',
  '/images/partners/logo-3.png',
  '/images/partners/logo-4.png',
  '/images/partners/logo-5.png',
];

export const HeroSection = () => {
  return (
    <AnimatedCard
      direction="down"
      triggerOnView
      className="bg-hero relative mt-3 min-h-160 rounded-xl bg-cover bg-center bg-no-repeat lg:max-h-200 lg:min-h-200"
    >
      <div className="absolute z-10 h-full w-full overflow-hidden rounded-xl bg-[#02310080]" />
      <AnimatedCard
        triggerOnView
        duration={1500}
        className="absolute z-20 h-full w-full rounded-xl"
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-8">
          <h1 className="text-card max-w-4xl text-center text-4xl font-bold md:text-5xl lg:text-7xl">
            Connecting Talent <br />
            <AnimatedWords
              text="With Global Opportunities"
              animKey="text"
              staggerMs={100}
              durationMs={800}
              direction="up"
              className="mt-1 justify-center"
            />
          </h1>
          <p className="text-card max-w-4xl text-center! text-lg font-normal md:text-xl lg:text-2xl">
            <AnimatedWords
              text="SSWCE Human Resource connects skilled individuals with career opportunities, helping candidates build successful futures through trusted recruitment and professional support."
              animKey="text"
              staggerMs={80}
              durationMs={800}
              direction="down"
              className="justify-center"
            />
          </p>
          <Button className="bg-card text-dark-green hover:text-card flex! cursor-pointer items-center! rounded-xl px-6 py-6 text-xl transition duration-300 ease-in-out lg:py-7 lg:text-2xl">
            <AnimatedWords
              text="View Jobs"
              animKey="text"
              staggerMs={100}
              durationMs={800}
              direction="up"
              className="justify-center"
            />
            <SafeImage
              src="/icons/play.svg"
              alt="play"
              width={24}
              height={24}
              objectFit="contain"
              className="pt-1"
            />
          </Button>
          <div className="flex w-full flex-col items-center gap-4 md:mt-8 lg:gap-8">
            <h2 className="text-card text-xl font-medium md:text-2xl">
              Trusted by:
            </h2>

            <div className="max-w-3xl lg:max-w-7xl">
              {TrustedPartners && TrustedPartners.length > 0 && (
                <AutoCarousel
                  items={TrustedPartners}
                  transition="marquee"
                  itemClassName="flex items-stretch w-full justify-center basis-full sm:basis-1/2 lg:basis-1/3 2xl:basis-1/4 md:px-7"
                  renderItem={(blog, index) => (
                    <SafeImage
                      src={blog}
                      alt="SSWCE Human Resources"
                      width={176}
                      height={64}
                      objectFit="contain"
                      key={index}
                    />
                  )}
                  marqueeSpeed={90}
                  loop={true}
                />
              )}
            </div>
          </div>
        </div>
      </AnimatedCard>
    </AnimatedCard>
  );
};

export default HeroSection;
