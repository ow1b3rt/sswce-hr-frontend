import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { ImageContainer } from '@/components/molecules/ImageContainer';

const section = {
  image: { src: '/images/logo.svg', alt: 'SSWCE HR' },
  author: { name: 'SSWCE Team', avatar: '/images/logo.svg' },
  date: 'Jan 01, 2026',
  title: 'Lorem ipsum dolor sit amet consectetur.',
  desc: 'Lorem ipsum dolor sit amet consectetur. Gravida faucibus sit dignissim tortor lorem. Euismod at at vitae lorem aliquet auctor dignissim aliquam.',
  ctaLabel: 'Read More',
  url: '#',
};

export function HomeBlogCard({ section: data = section }) {
  return (
    <article className="group flex h-full w-full flex-col justify-between gap-4">
      <ImageContainer
        className="aspect-4/3 max-h-64 w-full rounded-2xl"
        src={data.image?.src}
        alt={data.image?.alt || ''}
      />

      {(data.author || data.date) && (
        <div className="flex items-center justify-between">
          {data.author && (
            <div className="flex items-center gap-3">
              <ImageContainer
                className="h-10 w-10 rounded-full"
                src={data.author.avatar}
                alt={data.author.name}
                sizes="40px"
              />
              <span className="text-base text-foreground/70">
                {data.author.name}
              </span>
            </div>
          )}
          {data.date && (
            <span className="text-sm text-muted-foreground">{data.date}</span>
          )}
        </div>
      )}

      <h3 className="text-2xl leading-snug font-extrabold">{data.title}</h3>
      <p className="text-muted-foreground line-clamp-3 text-lg">{data.desc}</p>

      <Link
        href={data.url}
        className="bg-primary-blue hover:bg-dark-green group-hover:bg-primary-red inline-flex w-fit items-center gap-2 rounded-baseRadius px-8 py-2 text-lg font-bold text-white transition-colors duration-500 ease-in-out"
      >
        {data.ctaLabel}
        <ArrowRight size={24} />
      </Link>
    </article>
  );
}
