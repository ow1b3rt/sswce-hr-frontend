import { BlogCard } from '@/components/molecules/cards/BlogCard';
import { ROUTES } from '@/constants/routes/routes';
import { slugify } from '@/lib/utils';
import { AnimatedHeading } from '@/components/atoms/headings';

import { stripHtml } from '@/packages/admin/utils/utils';
// TODO: Blogs will need a slightly different card layout (to be updated later).
// Using InfoCard as a placeholder for now to match the overall page structure.
import { Pagenav } from '@/components/Reusables';

const SITE_URL = 'https://sswcehumanresources.com';

export async function generateMetadata(props) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page || 1);
  const isFirstPage = page <= 1;

  const title = isFirstPage ? 'Blogs' : `Blogs - Page ${page}`;
  const description =
    'Read the latest articles, guides, and updates from SSWCE Human Resources on jobs in Japan, SSW and ESD programs, Japanese language learning, JFT preparation, and visa guidance for Nepali candidates.';
  const canonical = isFirstPage ? '/blogs' : `/blogs?page=${page}`;

  return {
    title,
    description,
    keywords: [
      'Japan jobs blog Nepal',
      'SSW program guide',
      'JFT preparation tips',
      'Japanese language learning Nepal',
      'Japan visa guidance',
      'SSWCE Human Resources blogs',
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}${canonical}`,
      siteName: 'SSW Training Centre Nepal',
      title: `${title} | SSWCE Human Resources`,
      description,
      locale: 'en_US',
      images: [
        {
          url: '/images/landing/ssw-office.jpg',
          width: 1200,
          height: 630,
          alt: 'SSWCE Human Resources Blogs',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | SSWCE Human Resources`,
      description,
      images: ['/images/landing/ssw-office.jpg'],
    },
  };
}

async function getBlogs(page = 1) {
  try {
    const res = await fetch(ROUTES.API.BLOGS.HOME(page, 9), {
      cache: 'no-store',
    });
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blogs | SSWCE Human Resources',
    url: `${SITE_URL}/blogs`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'SSWCE Human Resources',
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="flex flex-col items-center gap-8 pb-12">
        <AnimatedHeading text="Blogs" />
        {!blogs || blogs.length === 0 ? (
          <p className="mt-10 text-center text-gray-500">
            No blogs available at the moment.
          </p>
        ) : (
          <div
            className={`grid w-full grid-cols-1 justify-center gap-6 md:grid-cols-2 lg:grid-cols-3`}
          >
            {blogs.map((blog) => (
              <BlogCard key={blog.id} item={blog} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 w-full max-w-4xl">
            <Pagenav page={page} totalPages={totalPages} />
          </div>
        )}
      </section>
    </>
  );
}
