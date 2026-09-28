import { ROUTES } from '@/constants/routes/routes';

const EMPTY_LIST = {
  success: false,
  items: [],
  total: 0,
  page: 1,
  totalPages: 1,
};

export async function getTestimonials(page = 1, limit = 9) {
  try {
    const res = await fetch(
      ROUTES.API.TESTIMONIALS.ALL_TESTIMONIALS(page, limit),
      {
        cache: 'no-store',
      },
    );

    if (!res.ok) return EMPTY_LIST;

    const data = await res.json();

    return data ?? EMPTY_LIST;
  } catch {
    return EMPTY_LIST;
  }
}
