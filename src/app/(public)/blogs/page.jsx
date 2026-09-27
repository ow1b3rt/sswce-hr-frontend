import InfoCard from '@/components/molecules/cards/InfoCard';

// TODO: Blogs will need a slightly different card layout (to be updated later).
// Using InfoCard as a placeholder for now to match the overall page structure.

const blogs = [
  {
    id: '1',
    name: 'How to Land Your First Job Abroad',
    description:
      'Discover the essential steps every first-time international job seeker should take — from building a global-ready CV to acing cross-cultural interviews.',
  },
  {
    id: '2',
    name: 'Top 5 Countries for Skilled Workers in 2026',
    description:
      'We break down the hottest destinations for skilled professionals this year, covering demand, salaries, visa pathways, and quality of life.',
  },
  {
    id: '3',
    name: 'Understanding Swiss Work Permits',
    description:
      'A comprehensive guide to the different categories of Swiss work permits, who qualifies, and how SSW CE HR can help simplify your application.',
  },
];

export default function BlogsPage() {
  const cols = Math.min(blogs.length, 3);
  const mdCols = Math.min(blogs.length, 2);
  const mdColClass = mdCols === 1 ? 'md:grid-cols-1' : 'md:grid-cols-2';
  const lgColClass =
    cols === 1 ? 'lg:grid-cols-1' : cols === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3';

  return (
    <section className="flex flex-col items-center gap-8">
      <h1 className="text-primary-blue text-4xl font-bold">Blogs</h1>
      <div className={`grid w-full grid-cols-1 justify-center gap-6 ${mdColClass} ${lgColClass}`}>
        {blogs.map((blog) => (
          <InfoCard key={blog.id} item={blog} />
        ))}
      </div>
    </section>
  );
}
