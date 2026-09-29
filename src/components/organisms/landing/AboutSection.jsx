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
        <p className="text-foreground/70 leading-relaxed font-normal lg:text-xl">
          <AnimatedWords
          text={`
            S.S.W.C.E. Human Resources is a professional manpower recruitment and skill development company based in Nepal, committed to creating reliable employment opportunities for Nepali youth and providing qualified, skilled, and work-ready human resources to employers in Japan and other international markets. Our core focus is to develop skills and Japanese language ability, prepare candidates, and connect the right people with the right opportunities, bridging the gap between the growing demand for skilled manpower overseas and the talented workforce available in Nepal. Through our Specified Skilled Worker (SSW) and Employment for Skill Development (ESD) programs, we prepare Nepali youth for sustainable employment with practical skills, language education, workplace knowledge, cultural understanding, and career-oriented training, helping candidates become skilled, disciplined, confident, and work-ready before entering the international job market. We support the whole journey, from skill development and language preparation to recruitment, documentation, deployment, and post-deployment coordination, ensuring a smooth and responsible employment process for both candidates and employers.`}
            animKey="text"
            staggerMs={10}
            durationMs={800}
            direction="down"
            className=" whitespace-pre-line"
          />
        </p>
        <AboutGrid />
      </AnimatedCard>
    </section>
  );
};

export default AboutSection;
