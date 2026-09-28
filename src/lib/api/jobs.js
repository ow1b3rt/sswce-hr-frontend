import { ROUTES } from '@/constants/routes/routes';

export async function getOpenJobs(limit = 100) {
  try {
    const res = await fetch(ROUTES.API.JOBS.OPEN(limit), {
      cache: 'no-store',
    });

    if (!res.ok) return [];

    const data = await res.json();

    return data?.items ?? [];
  } catch {
    return [];
  }
}

export async function fetchJobs(page = 1) {
  try {
    const res = await fetch(ROUTES.API.JOBS.HOME(page, 9), {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch jobs');
    }
    const data = await res.json();
    return data || { items: [], totalPages: 1 };
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return { items: [], totalPages: 1 };
  }
}
