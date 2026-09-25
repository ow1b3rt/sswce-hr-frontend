'use client';

import { Button } from '@/components/ui/button';
import { OrbitingCircles } from '@/components/ui/orbiting-circles';
import SafeImage from '@/components/ui/safe-image';
import AnimatedCard from '@/components/ui/animated-card';

const industryData = [
  { id: 'foods', title: 'Foods', image: '/images/landing/hero-image.jpg' },
  {
    id: 'logistics',
    title: 'Logistics',
    image: '/images/landing/hero-image.jpg',
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    image: '/images/landing/hero-image.jpg',
  },
  {
    id: 'construction',
    title: 'Construction',
    image: '/images/landing/hero-image.jpg',
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    image: '/images/landing/hero-image.jpg',
  },
  {
    id: 'agriculture',
    title: 'Agriculture',
    image: '/images/landing/hero-image.jpg',
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    image: '/images/landing/hero-image.jpg',
  },
  {
    id: 'technology',
    title: 'IT & Tech',
    image: '/images/landing/hero-image.jpg',
  },
];

export function OrbitingCirclesDemo() {
  const halfIndex = Math.ceil(industryData.length / 2);
  const innerOrbitItems = industryData.slice(0, halfIndex);
  const outerOrbitItems = industryData.slice(halfIndex);
  return (
    <div className="bg-faint-green relative flex min-h-240 w-full flex-col items-center justify-center overflow-hidden rounded-xl">
      <AnimatedCard
        triggerOnView
        className="flex flex-col items-center justify-center gap-4"
      >
        <p className="text-dark-green flex items-center gap-2 text-lg">
          <div className="bg-destructive h-2 w-2 rounded-full" />
          INDUSTRIES WE CONNECT
        </p>
        <h3 className="text-dark-green text-center text-5xl font-bold whitespace-pre-wrap">
          Connecting Talent <br />
          Across <span className="text-destructive">Global Industries</span>
        </h3>
        <Button className="cursor-pointer bg-[linear-gradient(180deg,#044B00_15.38%,#4CAB47_100%)] px-6 py-6 text-xl font-semibold">
          Explore Services
        </Button>
      </AnimatedCard>

      <OrbitingCircles
        className="size-40 border-none bg-transparent"
        radius={160}
        reverse
      ></OrbitingCircles>

      <OrbitingCircles
        className="size-40 border-none bg-transparent"
        duration={80}
        delay={10}
        radius={280}
      >
        {innerOrbitItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-1 overflow-hidden rounded-xl"
          >
            <div className="max-h-24 max-w-24 overflow-hidden rounded-xl">
              <SafeImage
                src="/images/landing/hero-image.jpg"
                alt="SSWCE Human Resources"
                width={176}
                height={64}
                objectFit="cover"
                className="h-full w-full rounded-xl"
              />
            </div>
            <p className="text-card rounded-[16px] bg-[linear-gradient(180deg,#044B00_15.38%,#4CAB47_100%)] px-2 py-0.5 text-center text-xs font-semibold">
              {item.title}
            </p>
          </div>
        ))}
      </OrbitingCircles>

      <OrbitingCircles
        className="size-40 border-none bg-transparent"
        duration={90}
        delay={10}
        radius={380}
        reverse
        path={false}
      >
        {outerOrbitItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-1 overflow-hidden rounded-2xl"
          >
            <div className="max-h-24 max-w-24 overflow-hidden rounded-2xl">
              <SafeImage
                src="/images/landing/hero-image.jpg"
                alt="SSWCE Human Resources"
                width={176}
                height={64}
                objectFit="cover"
                className="h-full w-full rounded-xl"
              />
            </div>
            <p className="text-card rounded-[16px] bg-[linear-gradient(180deg,#044B00_15.38%,#4CAB47_100%)] px-2 py-0.5 text-center text-xs font-semibold">
              {item.title}
            </p>
          </div>
        ))}
      </OrbitingCircles>
    </div>
  );
}

export default OrbitingCirclesDemo;
