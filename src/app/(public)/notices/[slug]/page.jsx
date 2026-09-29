import { notFound } from 'next/navigation';
import { ROUTES } from '@/constants/routes/routes';
import { resolveUrl } from '@/lib/utils';
import DetailPage from '@/components/templates/DetailPage';
import { localDate, localTime } from '@/lib/utils';

async function getEventBySlug(slug) {
  try {
    const res = await fetch(ROUTES.API.NOTICES.SINGLE_VIA_SLUG(slug), {
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (data?.success && data?.item) {
      return data.item;
    }
    return null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  return {
    title: event
      ? `${event.title} | SSWCE Human Resources`
      : 'Notice | SSWCE Human Resources',
    description: event?.description || undefined,
  };
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) notFound();

  const eventData = {
    title: event.title,
    image: {
      src: resolveUrl(event.mediaUrl),
      alt: event.mediaAlt || event.title,
    },
    content: [event.description || ''],
  };

  return <DetailPage data={eventData} />;
}
