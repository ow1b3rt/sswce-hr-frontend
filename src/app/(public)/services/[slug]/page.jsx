import { notFound } from 'next/navigation';
import { ROUTES } from '@/constants/routes/routes';
import DetailPage from '@/components/templates/DetailPage';

async function getServiceBySlug(slug) {
  try {
    const res = await fetch(ROUTES.API.SERVICES, { cache: 'no-store' });

    if (!res.ok) return null;

    const data = await res.json();
    if (data?.success && data?.layout?.items) {
      return data.layout.items.find((service) => service.slug === slug) ?? null;
    }
    return null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  return {
    title: service
      ? `${service.title} | SSWCE Human Resources`
      : 'Service | SSWCE Human Resources',
    description: service?.description || undefined,
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) notFound();

  const serviceData = {
    title: service.title,
    image: {
      src: service.image?.src || '/service_fallback.png',
      alt: service.image?.alt || service.title,
    },
    content: [service.description || ''],
  };

  return <DetailPage data={serviceData} />;
}
