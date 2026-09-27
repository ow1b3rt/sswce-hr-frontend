import AnimatedCard from '@/components/ui/animated-card';
import { AnimatedWords } from '@/components/ui/animated-words';
import Divider from '@/components/ui/divider';

export default function TitleDescCard({
  name,
  batch,
  description,
  showDivider = true,
  batchClass = 'mb-8',
  className = 'bg-faint-red',
}) {
  return (
    <section
      className={`order-1 flex h-full flex-1 flex-col gap-2 rounded-lg md:order-2 lg:p-4 xl:gap-2 ${className}`}
    >
      <AnimatedCard direction="up" distance={12} triggerOnView>
        <h2 className="text-destructive mb-1 text-3xl leading-none font-black tracking-[1px] md:text-4xl xl:text-5xl">
          {' '}
          {name}{' '}
        </h2>
      </AnimatedCard>
      {showDivider && (
        <Divider backgroundColor="bg-primary-red/10" className="xl:-my-5" />
      )}

      {batch && (
        <AnimatedCard direction="up" distance={12} triggerOnView>
          <h3 className={`text-text-color text-lg font-bold ${batchClass}`}>
            {batch}
          </h3>
        </AnimatedCard>
      )}

      <AnimatedCard direction="up" distance={12} triggerOnView>
        <AnimatedWords
          text={description}
          animKey="description"
          durationMs={400}
          staggerMs={10}
          direction="up"
          className="text-justify text-base leading-relaxed text-wrap whitespace-pre-line text-black/70 xl:text-lg"
        />
      </AnimatedCard>
    </section>
  );
}
