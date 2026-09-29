import { UserCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import BaseCard from './BaseCard';
import { localDate, resolveUrl, stripHtml } from '@/lib/utils';

export function BlogCard({ item }) {
  if (!item) {
    return null;
  }

  const { title, content, slug } = item;
  const href = `/blogs/${slug}`;

  return (
    <BaseCard>
      <div className="flex min-h-40 flex-col px-6 pt-6 pb-6">
        <div className="rounded-baseRadius relative mb-4 aspect-video w-full overflow-hidden">
          <Image
            src={resolveUrl(item?.media?.url)}
            alt={`${item.title} image`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="mb-4 flex items-center justify-between">
          {item.author && (
            <div className="flex items-center gap-3">
              <UserCircle size={20} className="text-black" strokeWidth={1.5} />
              <span className="text-foreground/70 text-base">
                {item.author?.name}
              </span>
            </div>
          )}
          {item.publishedAt && (
            <span className="rounded-md bg-black p-2 text-sm text-white">
              {localDate(item.publishedAt)}
            </span>
          )}
        </div>
        <h2 className="text-foreground pb-1 font-bold md:text-2xl md:text-[1.75rem]">
          {title}
        </h2>{' '}
        <p className="text-muted-foreground mb-5 line-clamp-4 text-base leading-relaxed">
          {stripHtml(content)}
        </p>
        <div className="flex flex-wrap items-center justify-end gap-3">
          <Link
            href={href}
            className="bg-primary-blue hover:bg-dark-green rounded-baseRadius inline-flex cursor-pointer items-center justify-center px-8 py-2 text-white transition-colors duration-200"
          >
            <ArrowRight size={20} strokeWidth={4} />
          </Link>
        </div>
      </div>
    </BaseCard>
  );
}
