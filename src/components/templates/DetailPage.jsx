import Image from 'next/image';
import { AnimatedWords } from '@/components/ui/animated-words';
import SafeImage from '../ui/safe-image';
import AnimatedCard from '@/components/ui/animated-card';
import ArticleBody from '@/packages/admin/components/templates/ArticleBody';
import { Calendar, Clock, MapPin } from 'lucide-react';

export default function DetailPage({ data, isBlog = false, isEvent = false }) {
  if (!data) return null;

  console.log('details', data.image);

  return (
    <main className="text-foreground container mx-auto px-4 pb-10 md:px-0">
      {data.image?.src && (
        <AnimatedCard
          direction="down"
          className="relative mx-auto mb-8 max-h-143.75 w-full overflow-hidden rounded-2xl"
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

          {data.title && (
            <div className="absolute top-3 left-3 z-10 sm:top-6 sm:left-6 md:top-8 md:left-8">
              <h1 className="rounded-xl bg-black/70 px-6 py-2 text-xl font-bold tracking-tight text-white backdrop-blur-sm md:px-8 md:py-4 md:text-2xl lg:text-3xl">
                <AnimatedWords
                  text={data.title}
                  animKey="detail-title"
                  durationMs={800}
                  staggerMs={80}
                  direction="up"
                />
              </h1>
            </div>
          )}
        </AnimatedCard>
      )}

      {isEvent && (
        <div className="mx-auto mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {data.time && (
            <div className="text-primary-blue-dark border-primary-blue flex items-center justify-center gap-2 rounded-lg border bg-white px-4 py-3 text-[15px] font-semibold">
              <Clock className="text-primary-blue-dark h-4 w-4" />
              <span>Time: {data.time}</span>
            </div>
          )}

          {data.date && (
            <div className="text-primary-blue-dark border-primary-blue flex items-center justify-center gap-2 rounded-lg border bg-white px-4 py-3 text-[15px] font-semibold">
              <Calendar className="text-primary-blue-dark h-4 w-4" />
              <span>Date: {data.date}</span>
            </div>
          )}

          {data.venue && (
            <div className="text-primary-blue-dark border-primary-blue flex items-center justify-center gap-2 rounded-lg border bg-white px-4 py-3 text-[15px] font-semibold">
              <MapPin className="text-primary-blue-dark h-4 w-4" />
              <span>Venue: {data.venue}</span>
            </div>
          )}
        </div>
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
