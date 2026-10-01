import { cache } from 'react';
import { notFound } from 'next/navigation';
import { capitalise, stripHtml } from '@/packages/admin/utils/utils';

import { getBlog, getBlogs } from '@/lib/api/blogs';
import { getMediaUrl, localDate, mapBlogItem } from '@/lib/utils';
import BlogDetailPage from '@/components/templates/BlogDetailPage';
import { ImageContainer } from '@/components/molecules/ImageContainer';
import BlogsList from '@/components/organisms/BlogsList';

const SITE_URL = 'https://sswcehumanresources.com';
const RELATED_BLOGS_LIMIT = 6;
const FALLBACK_IMAGE = '/images/logo.svg';

// Dedupes the fetch so generateMetadata and the page share one request
const getBlogCached = cache(getBlog);

const toAbsoluteUrl = (url) => {
  if (!url) return undefined;
  return url.startsWith('http') ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};

const buildDescription = (blog) => {
  if (blog?.metaDescription) return blog.metaDescription;
  const text = stripHtml(blog?.content || '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!text) return undefined;
  return text.length > 160 ? `${text.slice(0, 157)}...` : text;
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogCached(slug);

  if (!blog) {
    return {
      title: 'Blog Not Found',
      robots: { index: false, follow: false },
    };
  }

  const title = blog.title || 'Blog';
  const description = buildDescription(blog);
  const canonical = `/blogs/${slug}`;
  const image = getMediaUrl(blog.mediaUrl) || '/images/landing/ssw-office.jpg';
  const publishedTime = blog.publishedAt || blog.createdAt;
  const authorName = blog.authorName || 'SSWCE Team';

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}${canonical}`,
      siteName: 'SSW Training Centre Nepal',
      title: `${title} | SSWCE Human Resources`,
      description,
      locale: 'en_US',
      publishedTime,
      modifiedTime: blog.updatedAt || publishedTime,
      authors: [authorName],
      images: [
        {
          url: image,
          alt: blog.mediaAlt || title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | SSWCE Human Resources`,
      description,
      images: [image],
    },
  };
}

export default async function SingleBlogPage({ params }) {
  const { slug } = await params;

  const [blog, relatedResult] = await Promise.all([
    getBlogCached(slug),
    getBlogs(1, RELATED_BLOGS_LIMIT + 1),
  ]);

  if (!blog) notFound();

  const blogData = {
    title: blog.title,
    image: {
      src: getMediaUrl(blog.mediaUrl) || FALLBACK_IMAGE,
      alt: blog.mediaAlt || blog.title,
    },
    content: blog.content,
  };

  const relatedBlogs = (relatedResult?.items || [])
    .filter((b) => b.slug !== slug)
    .slice(0, RELATED_BLOGS_LIMIT)
    .map(mapBlogItem);

  const authorName = blog.authorName || 'SSWCE Team';
  const authorImage = getMediaUrl(blog.authorAvatar) || FALLBACK_IMAGE;
  const publishedOn = blog.publishedAt || blog.createdAt;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blogs/${slug}`,
    },
    headline: blog.title,
    description: buildDescription(blog),
    image: toAbsoluteUrl(getMediaUrl(blog.mediaUrl) || FALLBACK_IMAGE),
    datePublished: publishedOn,
    dateModified: blog.updatedAt || publishedOn,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SSWCE Human Resources',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.svg`,
      },
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blogs', item: `${SITE_URL}/blogs` },
      {
        '@type': 'ListItem',
        position: 3,
        name: blog.title,
        item: `${SITE_URL}/blogs/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <main className="flex flex-col gap-10 px-4 pb-12 md:px-20">
        <BlogDetailPage data={blogData} isBlog />

        <div className="container mx-auto flex flex-col items-center gap-4 px-4 sm:flex-row lg:px-0">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full">
            <ImageContainer
              src={authorImage}
              alt={authorName}
              sizes="64px"
              className="h-full w-full"
            />
          </div>
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <h4 className="text-xl font-bold">{capitalise(authorName)}</h4>
            <h5 className="text-muted-foreground">Writer</h5>
            {publishedOn && (
              <p className="text-muted-foreground text-sm font-medium">
                Published on {localDate(publishedOn)}
              </p>
            )}
          </div>
        </div>

        {relatedBlogs.length > 0 && (
          <section className="container mx-auto lg:px-0">
            <BlogsList title="Other Blog Articles" blogs={relatedBlogs} />
          </section>
        )}
      </main>
    </>
  );
}
