import React from 'react';
import SafeImage from '@/components/ui/safe-image';
export const BlogList = ({ posts = [] }) => {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="mx-auto flex w-full flex-col gap-10 p-4 md:gap-14 lg:gap-16">
      {posts.map((post, index) => (
        <article
          key={post.id || index}
          className="group grid grid-cols-1 items-center gap-6 md:grid-cols-[auto_1.2fr_2fr] md:gap-8 lg:gap-10"
        >
          <div className="hidden flex-row items-center gap-3 md:flex">
            <span
              className="text-6xl font-black text-transparent lg:text-7xl"
              style={{ WebkitTextStroke: '2px #001f6b' }}
            >
              {post.day}
            </span>

            <div className="flex flex-col text-sm leading-tight font-bold tracking-wider text-slate-900 uppercase md:text-xl">
              <span>{post.month}</span>
              <span>{post.year}</span>
            </div>
          </div>

          <div className="relative aspect-video w-full overflow-hidden rounded-2xl md:h-full lg:max-h-60 lg:max-w-lg">
            <SafeImage
              src={post.image}
              alt={post.title || 'Blog post image'}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-2 flex items-center gap-2 md:hidden">
              <span
                className="text-4xl font-black text-transparent"
                style={{ WebkitTextStroke: '1.5px #001f6b' }}
              >
                {post.day}
              </span>
              <div className="flex flex-col text-xs leading-tight font-bold tracking-wider text-slate-900 uppercase">
                <span>{post.month}</span>
                <span>{post.year}</span>
              </div>
            </div>

            <p className="text-foreground/50 mb-2 text-sm lg:text-base">
              By {post.author}
            </p>

            <h3 className="text-primary-blue mb-3 text-xl leading-snug font-bold md:text-2xl lg:text-[1.75rem]">
              {post.title}
            </h3>

            <p className="text-foreground/50 text-sm leading-relaxed lg:text-base">
              {post.excerpt}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default BlogList;
