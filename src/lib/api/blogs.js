import { ROUTES } from '@/constants/routes/routes';

const EMPTY_LIST = {
  success: false,
  items: [],
  total: 0,
  page: 1,
  totalPages: 1,
};

export async function getBlogs(page = 1, limit = 9) {
  try {
    const res = await fetch(ROUTES.API.BLOGS.HOME(page, limit), {
      cache: 'no-store',
    });

    if (!res.ok) return EMPTY_LIST;

    const data = await res.json();

    return data ?? EMPTY_LIST;
  } catch {
    return EMPTY_LIST;
  }
}

export async function getBlog(slug) {
  try {
    const res = await fetch(ROUTES.API.BLOGS.SINGLE_VIA_SLUG(slug), {
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const data = await res.json();

    return data?.item ?? null;
  } catch {
    return null;
  }
}
