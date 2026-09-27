import Image from 'next/image';
import { AnimatedWords } from '@/components/ui/animated-words';
import AnimatedCard from '@/components/ui/animated-card';

export default function DetailPage({ data }) {
  if (!data) return null;

  return (
    <main className="text-foreground container mx-auto px-4 py-10">
      {data.title && (
        <h1 className="mb-8 text-center text-3xl font-black tracking-tight md:text-5xl lg:text-[54px]">
          <AnimatedWords
            text={data.title}
            animKey="detail-title"
            durationMs={800}
            staggerMs={80}
            direction="up"
          />
        </h1>
      )}

      {data.image?.src && (
        <AnimatedCard
          direction="down"
          className="relative mx-auto mb-8 w-full overflow-hidden rounded-2xl md:w-3/4"
        >
          <Image
            src={data.image.src}
            alt={data.image.alt || data.title || 'Image'}
            width={1200}
            height={675}
            className="aspect-video w-full object-cover"
            sizes="(max-width: 768px) 100vw, 75vw"
          />
        </AnimatedCard>
      )}

      {data.content?.length > 0 && (
        <AnimatedCard className="mx-auto w-full space-y-6 text-lg leading-relaxed md:w-3/4">
          {data.content.map((block, index) => (
            <ContentBlock key={index} block={block} />
          ))}
        </AnimatedCard>
      )}
    </main>
  );
}

function ContentBlock({ block }) {
  if (typeof block === 'string') {
    return <p className="text-muted-foreground whitespace-pre-line">{block}</p>;
  }

  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-muted-foreground whitespace-pre-line">
          {block.text}
        </p>
      );

    case 'heading':
      return (
        <h2 className="text-foreground pt-4 text-[28px] font-bold">
          {block.text}
        </h2>
      );

    case 'subheading':
      return (
        <h3 className="text-foreground pt-2 text-[22px] font-semibold">
          {block.text}
        </h3>
      );

    case 'list':
      return (
        <ul className="text-muted-foreground list-disc space-y-2 pl-6">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    case 'ordered-list':
      return (
        <ol className="text-muted-foreground list-decimal space-y-2 pl-6">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );

    case 'image':
      return (
        <div className="relative my-8 aspect-[2.6/1] overflow-hidden rounded-2xl">
          <Image
            src={block.src}
            alt={block.alt || ''}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
          />
        </div>
      );

    default:
      return null;
  }
}
