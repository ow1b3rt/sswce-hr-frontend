import { notFound } from 'next/navigation';
import { ROUTES } from '@/constants/routes/routes';
import DetailPage from '@/components/templates/DetailPage';
import { localDate, localTime, resolveUrl } from '@/lib/utils';

async function getEventBySlug(slug) {
  try {
    const res = await fetch(ROUTES.API.EVENTS.SINGLE_VIA_SLUG(slug), {
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
      : 'Event | SSWCE Human Resources',
    description: event?.description || undefined,
  };
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  console.log('events', event);

  if (!event) notFound();

  const eventData = {
    title: event.title,
    image: {
      src: resolveUrl(event.mediaUrl) || '/event_fallback.png',
      alt: event.mediaAlt || event.title,
    },
    content: [event.description || ''],
    date: localDate(event.time),
    time: localTime(event.time),
    venue: event.location,
  };

  return <DetailPage data={eventData} isEvent />;
}
