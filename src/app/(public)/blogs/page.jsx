import InfoCard from '@/components/molecules/cards/InfoCard';
import { ROUTES } from '@/constants/routes/routes';
import { slugify } from '@/lib/utils';
import { AnimatedHeading } from '@/components/atoms/headings';

// TODO: Blogs will need a slightly different card layout (to be updated later).
// Using InfoCard as a placeholder for now to match the overall page structure.
import { Pagenav } from '@/components/Reusables';

async function getBlogs(page = 1) {
  try {
    const res = await fetch(ROUTES.API.BLOGS.HOME(page, 9), { cache: 'no-store' });
    if (!res.ok) return { items: [], totalPages: 1 };
    const data = await res.json();
    return data || { items: [], totalPages: 1 };
  } catch (error) {
    return { items: [], totalPages: 1 };
  }
}

export default async function BlogsPage(props) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page || 1);
  const data = await getBlogs(page);
  const blogs = data?.items || [];
  const totalPages = data?.totalPages || 1;

  const cols = Math.min(blogs.length || 1, 3);
  const mdCols = Math.min(blogs.length || 1, 2);
  const mdColClass = mdCols === 1 ? 'md:grid-cols-1' : 'md:grid-cols-2';
  const lgColClass =
    cols === 1
      ? 'lg:grid-cols-1'
      : cols === 2
        ? 'lg:grid-cols-2'
        : 'lg:grid-cols-3';

  return (
    <section className="flex flex-col items-center gap-8 pb-12">
      <AnimatedHeading text="Blogs" />
      {!blogs || blogs.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">No blogs available at the moment.</p>
      ) : (
        <div className={`grid w-full grid-cols-1 justify-center gap-6 ${mdColClass} ${lgColClass}`}>
          {blogs.map((blog) => (
            <InfoCard
              key={blog.id}
              item={{
                name: blog.title || blog.name,
                description: blog.description
              }}
              href={ROUTES.BLOGS.SINGLE(blog.slug || slugify(blog.title || blog.name))}
            />
          ))}
        </div>
      )}
      
      {totalPages > 1 && (
        <div className="mt-8 w-full max-w-4xl">
          <Pagenav page={page} totalPages={totalPages} />
        </div>
      )}
    </section>
  );
}
