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
