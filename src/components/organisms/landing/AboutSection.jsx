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
            text={`Lorem ipsum dolor sit amet consectetur. Arcu rhoncus amet ante turpis gravida quam a. Vulputate tincidunt libero quam lectus odio donec fermentum vel. Ultrices leo facilisis ut leo lobortis eu. Sed in lorem congue pellentesque egestas. Consectetur bibendum lectus non proin tristique purus arcu adipiscing. Imperdiet diam laoreet molestie congue faucibus nascetur dignissim in amet. Lacus volutpat ultricies mauris porttitor lobortis. Mollis quam sodales enim fermentum enim dui. Ullamcorper urna amet viverra enim platea pulvinar venenatis. Vitae aliquam etiam sed tortor vitae. Mi sagittis sed quis faucibus. Cursus id varius maecenas quis non. A rutrum duis ullamcorper ac lorem.\nSed pulvinar luctus sed blandit ut magna viverra at gravida. Orci gravida fringilla aliquet bibendum nulla habitasse mi. Augue nec quam pharetra nisl dui aliquam mauris enim sodales. Nunc quisque eu aenean tellus. Sit odio sed egestas eu in pellentesque sollicitudin egestas. Mauris iaculis sem auctor velit vitae facilisi quis vitae. `}
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
