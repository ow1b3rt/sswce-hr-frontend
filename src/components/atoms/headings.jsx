import { AnimatedWords } from '@/components/ui/animated-words';

export function AnimatedHeading({ as: Component = 'h1', text }) {
  return (
    <Component className="text-destructive text-center text-4xl font-bold md:text-5xl lg:text-7xl">
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
