import Image from 'next/image';
import { AnimatedWords } from '@/components/ui/animated-words';
import SafeImage from '../ui/safe-image';
import AnimatedCard from '@/components/ui/animated-card';
import ArticleBody from '@/packages/admin/components/templates/ArticleBody';

export default function BlogDetailPage({ data, isBlog = false }) {
  if (!data) return null;

  return (
    <main className="text-foreground container mx-auto">
      <h1 className="py-6 text-xl font-bold text-center tracking-tight md:py-8 md:text-5xl lg:text-6xl">
        <AnimatedWords
          text={data.title}
          animKey="detail-title"
          durationMs={800}
          staggerMs={80}
          direction="up"
        />
      </h1>
      {data.image?.src && (
        <AnimatedCard
          direction="down"
          className="relative mb-8 max-h-143.75 w-full overflow-hidden rounded-2xl"
        >
          <SafeImage
            src={data.image.src}
            alt={data.image.alt || data.title || 'Image'}
            width={1920}
            height={1080}
            className="aspect-video w-full object-cover"
            sizes="(max-width: 768px) 100vw, 100vw"
            priority
          />

        </AnimatedCard>
      )}

      {data.description && (
        <AnimatedCard className="w-full space-y-6 text-base leading-relaxed md:text-lg">
          <p className="text-muted-foreground whitespace-pre-line">
            {data.description}
          </p>
        </AnimatedCard>
      )}

      {data.content?.length > 0 && (
        <AnimatedCard className="mx-auto w-full space-y-6 text-lg leading-relaxed">
          {isBlog ? (
            <ArticleBody html={data.content} />
          ) : (
            data.content.map((block, index) => (
              <ContentBlock key={index} block={block} />
            ))
          )}
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
        <h2 className="text-foreground pt-4 text-2xl font-bold md:text-3xl">
          {block.text}
        </h2>
      );

    case 'subheading':
      return (
        <h3 className="text-foreground pt-2 text-xl font-semibold md:text-2xl">
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
