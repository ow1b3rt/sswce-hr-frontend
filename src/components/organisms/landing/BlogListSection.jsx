import { BlogList } from './BlogList';
import { AnimatedWords } from '@/components/ui/animated-words';

export default function BlogPage() {
  const blogPosts = [
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

  return (
    <main className="flex min-h-screen flex-col space-y-12 bg-white py-16">
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
      <BlogList posts={blogPosts} />
    </main>
  );
}
