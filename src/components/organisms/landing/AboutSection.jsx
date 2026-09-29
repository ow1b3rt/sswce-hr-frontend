import { AnimatedWords } from '@/components/ui/animated-words';
import AnimatedCard from '@/components/ui/animated-card';

import AboutGrid from './AboutGrid';

export const AboutSection = () => {
  return (
    <section className="flex flex-col items-center">
      <AnimatedCard
        triggerOnView
        className="flex max-w-7xl flex-col gap-4 lg:gap-8"
      >
        <h1 className="text-destructive text-center text-4xl font-bold md:text-5xl lg:text-7xl">
          <AnimatedWords
            text="About Us"
            animKey="text"
            staggerMs={100}
            durationMs={800}
            direction="up"
            className="mt-1 justify-center"
          />
        </h1>
        <p className="text-foreground/70 text-center leading-relaxed font-normal lg:text-xl">
          <AnimatedWords
          text={`
            S.S.W.C.E. Human Resources is a professional manpower recruitment and skill development company based in Nepal, committed to creating reliable employment opportunities for Nepali youth and providing qualified, skilled, and work-ready human resources to employers in Japan and other international markets.\n
            Our core focus is to develop skills & Japanese Language, prepare candidates, and connect the right people with the right opportunities. Through our recruitment and training programs, we aim to bridge the gap between the growing demand for skilled manpower overseas and the talented workforce available in Nepal.
              `}
            animKey="text"
            staggerMs={10}
            durationMs={800}
            direction="down"
            className="justify-center whitespace-pre-line"
          />
        </p>
        <AboutGrid />
      </AnimatedCard>
    </section>
  );
};

export default AboutSection;
