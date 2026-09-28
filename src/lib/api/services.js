import { ROUTES } from '@/constants/routes/routes';

export async function getServices() {
  try {
    const res = await fetch(ROUTES.API.SERVICES.LAYOUT, { cache: 'no-store' });
    if (!res.ok) return { items: [] };
    const data = await res.json();
    return data || { items: [] };
  } catch (error) {
    return { items: [] };
  }
}
