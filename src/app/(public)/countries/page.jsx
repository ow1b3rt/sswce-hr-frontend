import InfoCard from '@/components/molecules/cards/InfoCard';
import { ROUTES } from '@/constants/routes/routes';
import { slugify } from '@/lib/utils';

const countries = [
  {
    id: '1',
    name: 'Switzerland',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.",
  },
  {
    id: '2',
    name: 'Switzerland',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.",
  },
];

export default function CountriesPage() {
  const cols = Math.min(countries.length, 3);
  const mdCols = Math.min(countries.length, 2);
  const mdColClass = mdCols === 1 ? 'md:grid-cols-1' : 'md:grid-cols-2';
  const lgColClass =
    cols === 1 ? 'lg:grid-cols-1' : cols === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3';

  return (
    <section className="flex flex-col items-center gap-8 pb-12">
      <h1 className="text-primary-blue text-4xl font-bold">Countries</h1>
      <div className={`grid w-full grid-cols-1 justify-center gap-6 ${mdColClass} ${lgColClass}`}>
        {countries.map((country) => (
          <InfoCard
            key={country.id}
            item={{
              ...country,
              imageSrc: `/flags/${slugify(country.name)}.webp`,
            }}
            imageAlt={`${country.name} flag`}
            href={ROUTES.COUNTRIES.SINGLE(slugify(country.name))}
          />
        ))}
      </div>
    </section>
  );
}
