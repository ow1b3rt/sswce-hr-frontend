import InfoCard from '@/components/molecules/cards/InfoCard';
import { CalendarDays } from 'lucide-react';

const events = [
  {
    id: '1',
    name: 'Global Recruitment Fair 2026',
    description:
      'Join our flagship recruitment fair where top employers from across the globe connect with skilled professionals seeking new international opportunities.',
  },
  {
    id: '2',
    name: 'Visa Information Webinar',
    description:
      'A free online session covering the latest updates to work visa regulations, eligibility criteria, and application best practices.',
  },
  {
    id: '3',
    name: 'Networking Night – Zürich',
    description:
      'An exclusive evening for professionals already placed abroad to build connections, share experiences, and explore growth opportunities.',
  },
];

export default function EventsPage() {
  const cols = Math.min(events.length, 3);
  const mdCols = Math.min(events.length, 2);
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
      <div
        className={`grid w-full grid-cols-1 justify-center gap-6 ${mdColClass} ${lgColClass}`}
      >
        {events.map((event) => (
          <InfoCard key={event.id} item={event} icon={CalendarDays} />
        ))}
      </div>
    </section>
  );
}
