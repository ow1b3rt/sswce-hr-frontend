import InfoCard from '@/components/molecules/cards/InfoCard';
import { ROUTES } from '@/constants/routes/routes';
import { slugify } from '@/lib/utils';
import { Settings } from 'lucide-react';

const services = [
  {
    id: '1',
    name: 'Work Visa Assistance',
    description:
      'We provide end-to-end support for work visa applications, helping you navigate complex immigration processes with ease and confidence.',
  },
  {
    id: '2',
    name: 'Job Placement',
    description:
      'Our expert recruiters connect skilled professionals with top employers across multiple industries, ensuring the right fit for every role.',
  },
  {
    id: '3',
    name: 'Career Counseling',
    description:
      'Get personalised career guidance from experienced advisors who understand the demands of the international job market.',
  },
];

export default function ServicesPage() {
  const cols = Math.min(services.length, 3);
  const mdCols = Math.min(services.length, 2);
  const mdColClass = mdCols === 1 ? 'md:grid-cols-1' : 'md:grid-cols-2';
  const lgColClass =
    cols === 1
      ? 'lg:grid-cols-1'
      : cols === 2
        ? 'lg:grid-cols-2'
        : 'lg:grid-cols-3';

  return (
    <section className="flex flex-col items-center gap-8 pb-12">
      <h1 className="text-primary-blue text-4xl font-bold">Services</h1>
      <div
        className={`grid w-full grid-cols-1 justify-center gap-6 ${mdColClass} ${lgColClass}`}
      >
        {services.map((service) => (
          <InfoCard
            key={service.id}
            item={service}
            icon={Settings}
            href={ROUTES.SERVICES.SINGLE(slugify(service.name))}
          />
        ))}
      </div>
    </section>
  );
}
