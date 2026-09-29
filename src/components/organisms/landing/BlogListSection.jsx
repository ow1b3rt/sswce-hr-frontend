import { Button } from '@base-ui/react';
import Link from 'next/link';
import { BlogList } from './BlogList';
import { AnimatedWords } from '@/components/ui/animated-words';
import { CirclePlay } from 'lucide-react';
import { getMediaUrl } from '@/lib/utils';
import { stripHtml } from '@/packages/admin/utils/utils';
import { ROUTES } from '@/constants/routes/routes';

const FALLBACK_IMAGE = '/images/logo.svg';

function toBlogPost(item) {
  const date = new Date(item.publishedAt || item.createdAt);
  const hasDate = !Number.isNaN(date.getTime());
  const content = stripHtml(item.content);

  return {
    id: item.id,
    day: hasDate ? date.toLocaleDateString('en-US', { day: '2-digit' }) : '',
    month: hasDate
      ? date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
      : '',
    year: hasDate ? date.toLocaleDateString('en-US', { year: 'numeric' }) : '',
    author: item.author?.name || 'SSWCE Team',
    title: item.title,
    excerpt: content.slice(0, 160) + (content.length > 160 ? '...' : ''),
    image: (item.media && getMediaUrl(item.media.url)) || FALLBACK_IMAGE,
    slug: item.slug,
  };
}

const blogData = [
  {
    id: 1,
    day: '15',
    month: 'JAN',
    year: '2026',
    author: 'Bishad Kandel',
    title:
      'Lorem ipsum dolor sit amet consectetur. Tristique ultrices malesuada',
    excerpt:
      'Lorem ipsum dolor sit amet consectetur. Vitae eget turpis diam elementum sit id. Lacinia ut porttitor et neque.',
    image: '/images/landing/hero-image.jpg',
  },
  {
    id: 2,
    day: '17',
    month: 'JAN',
    year: '2026',
    author: 'Bishad Kandel',
    title:
      'Lorem ipsum dolor sit amet consectetur. Tristique ultrices malesuada',
    excerpt:
      'Lorem ipsum dolor sit amet consectetur. Vitae eget turpis diam elementum sit id. Lacinia ut porttitor et neque.',
    image: '/images/landing/hero-image.jpg',
  },
  {
    id: 3,
    day: '30',
    month: 'JAN',
    year: '2026',
    author: 'Bishad Kandel',
    title:
      'Lorem ipsum dolor sit amet consectetur. Tristique ultrices malesuada',
    excerpt:
      'Lorem ipsum dolor sit amet consectetur. Vitae eget turpis diam elementum sit id. Lacinia ut porttitor et neque.',
    image: '/images/landing/hero-image.jpg',
  },
];
export default function Highlight({ blogs }) {
  const blogsPost = blogs
    ? (blogs.items ?? []).map(toBlogPost).slice(0, 4)
    : blogData;

  return (
    <main className="mb-16 flex flex-col items-center space-y-12 bg-white">
      <h1 className="text-destructive text-center text-4xl font-bold md:text-5xl lg:text-7xl">
        <AnimatedWords
          text="Highlights"
          animKey="text"
          staggerMs={100}
          durationMs={800}
          direction="up"
          className="mt-1 justify-center"
        />
      </h1>
      <BlogList posts={blogsPost} />
      <Button
        nativeButton={false}
        render={<Link href={ROUTES.BLOGS.HOME} />}
        className="bg-primary-blue hover:bg-foreground text-card flex max-w-44 cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-b px-5 py-4 transition duration-300 ease-in-out"
      >
        <CirclePlay />
        <span className="text-lg font-semibold">See More</span>
      </Button>
    </main>
  );
}
