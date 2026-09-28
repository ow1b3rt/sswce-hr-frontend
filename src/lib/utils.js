
export { cn } from 'cn';
import { countryCodeMap } from '@/resources/data/country-code.js';

export function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

export function timeAgo(dateString) {
  if (!dateString) return null;

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return null;

  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'Just now';

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;

  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}

export function resolveUrl(url) {
  if (!url) return null;

  return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_HOST}${url}`;
}

export function localDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
}

export function getMediaUrl(path) {
  if (!path) return '';
  return path.startsWith('http')
    ? path
    : `${process.env.NEXT_PUBLIC_HOST}${path}`;
}

export function mapBlogItem(item) {
  const content = stripHtml(item.content);
  return {
    image: {
      src: item.media ? getMediaUrl(item.media.url) : '/images/logo.svg',
      alt: item.media?.alt || item.title,
    },
    author: {
      name: item.author?.name || 'SSWCE Team',
      avatar: getMediaUrl(item.author?.avatar) || '/images/logo.svg',
    },
    date: localDate(item.publishedAt || item.createdAt),
    title: item.title,
    desc: content.slice(0, 160) + (content.length > 160 ? '...' : ''),
    ctaLabel: 'Read More',
    url: `/blogs/${item.slug}`,
  };
}

export function getFlagUrlByCountryName(inputName, width = 640) {
  if (!inputName) return null;

  const key = inputName.trim().toLowerCase();

  const code = countryCodeMap[key];
  if (!code) {
    return null;
  }

  return `https://flagcdn.com/w${width}/${code}.webp`;
}
