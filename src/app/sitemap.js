import { ROUTES } from '@/constants/routes/routes';
import { getBlogs } from '@/lib/api/blogs';
import { fetchJobs } from '@/lib/api/jobs';
import { getServices } from '@/lib/api/services';
import { slugify } from '@/lib/utils';

const SITE_URL = 'https://sswcehumanresources.com';
const PAGE_SIZE = 50;
const MAX_PAGES = 50; // safety cap so a bad API response can't loop forever

// Rebuild the sitemap at most once per hour
export const revalidate = 3600;

const toDate = (item) => {
  const value = item?.updatedAt || item?.publishedAt || item?.createdAt;
  const date = value ? new Date(value) : null;
  return date && !isNaN(date) ? date : new Date();
};

// Loops through every page of a paginated API and returns all items
async function fetchAllPages(fetchPage) {
  const all = [];
  try {
    for (let page = 1; page <= MAX_PAGES; page++) {
      const data = await fetchPage(page);
      const items = data?.items || [];
      all.push(...items);
      const totalPages = data?.totalPages || 1;
      if (page >= totalPages || items.length === 0) break;
    }
  } catch {
    // return whatever we collected so far
  }
  return all;
}

async function fetchJson(url) {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function sitemap() {
  const [blogs, jobs, events, notices, servicesData, countriesData] =
    await Promise.all([
      fetchAllPages((page) => getBlogs(page, PAGE_SIZE)),
      fetchAllPages((page) => fetchJobs(page)),
      fetchAllPages((page) => fetchJson(ROUTES.API.EVENTS.HOME(page, PAGE_SIZE))),
      fetchAllPages((page) => fetchJson(ROUTES.API.NOTICES.HOME(page, PAGE_SIZE))),
      getServices().catch(() => null),
      fetchJson(ROUTES.API.COUNTRY),
    ]);

  const services = servicesData?.layout?.items || [];
  const countries = countriesData?.layout?.items || [];

  const staticPages = [
    { path: '', changeFrequency: 'weekly', priority: 1 },
    { path: '/about-us', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/services', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/jobs', changeFrequency: 'daily', priority: 0.9 },
    { path: '/countries', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/blogs', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/events', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/notices', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/gallery', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/application', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/contact-us', changeFrequency: 'yearly', priority: 0.6 },
  ].map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const blogPages = blogs
    .filter((b) => b.slug)
    .map((b) => ({
      url: `${SITE_URL}/blogs/${b.slug}`,
      lastModified: toDate(b),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

  const jobPages = jobs
    .filter((j) => j.slug)
    .map((j) => ({
      url: `${SITE_URL}/jobs/${j.slug}`,
      lastModified: toDate(j),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

  const eventPages = events
    .filter((e) => e.slug)
    .map((e) => ({
      url: `${SITE_URL}/events/${e.slug}`,
      lastModified: toDate(e),
      changeFrequency: 'monthly',
      priority: 0.5,
    }));

  const noticePages = notices
    .filter((n) => n.slug)
    .map((n) => ({
      url: `${SITE_URL}/notices/${n.slug}`,
      lastModified: toDate(n),
      changeFrequency: 'monthly',
      priority: 0.5,
    }));

  const servicePages = services
    .map((s) => s.slug || slugify(s.title || s.name || ''))
    .filter(Boolean)
    .map((slug) => ({
      url: `${SITE_URL}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  const countryPages = countries
    .map((c) => c.slug || slugify(c.title || ''))
    .filter(Boolean)
    .map((slug) => ({
      url: `${SITE_URL}/countries/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  return [
    ...staticPages,
    ...servicePages,
    ...countryPages,
    ...jobPages,
    ...blogPages,
    ...eventPages,
    ...noticePages,
  ];
}
