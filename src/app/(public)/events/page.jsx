import InfoCard from '@/components/molecules/cards/InfoCard';
import { CalendarDays } from 'lucide-react';
import { ROUTES } from '@/constants/routes/routes';

import { Pagenav } from '@/components/Reusables';

async function getEvents(page = 1) {
  try {
    const res = await fetch(ROUTES.API.EVENTS.HOME(page, 9), { cache: 'no-store' });
    if (!res.ok) return { items: [], totalPages: 1 };
    const data = await res.json();
    return data || { items: [], totalPages: 1 };
  } catch (error) {
    return { items: [], totalPages: 1 };
  }
}

export default async function EventsPage(props) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page || 1);
  const data = await getEvents(page);
  const events = data?.items || [];
  const totalPages = data?.totalPages || 1;
  
  const cols = Math.min(events.length || 1, 3);
  const mdCols = Math.min(events.length || 1, 2);
  const mdColClass = mdCols === 1 ? 'md:grid-cols-1' : 'md:grid-cols-2';
  const lgColClass =
    cols === 1
      ? 'lg:grid-cols-1'
      : cols === 2
        ? 'lg:grid-cols-2'
        : 'lg:grid-cols-3';

  return (
    <section className="flex flex-col items-center gap-8 pb-12">
      <h1 className="text-primary-blue text-4xl font-bold">Events</h1>

      {!events || events.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">No events available at the moment.</p>
      ) : (
        <div className={`grid w-full grid-cols-1 justify-center gap-6 ${mdColClass} ${lgColClass}`}>
          {events.map((event) => (
            <InfoCard
              key={event.id}
              item={{
                name: event.title,
                description: event.description,
              }}
              icon={CalendarDays}
              href={ROUTES.EVENTS.SINGLE(event.slug)}
            />
          ))}
        </div>
      )}
      
      {totalPages > 1 && (
        <div className="mt-8 w-full max-w-4xl">
          <Pagenav page={page} totalPages={totalPages} />
        </div>
      )}
    </section>
  );
}

