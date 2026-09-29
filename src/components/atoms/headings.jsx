import { AnimatedWords } from '@/components/ui/animated-words';

export function AnimatedHeading({ as: Component = 'h1', text }) {
  return (
    <Component className="text-destructive text-center text-xl font-bold md:text-2xl lg:text-3xl xl:text-5xl">
      <AnimatedWords
        text={text}
        animKey="text"
        staggerMs={100}
        durationMs={800}
        direction="up"
        className="mt-1 justify-center"
      />
    </Component>
  );
}
