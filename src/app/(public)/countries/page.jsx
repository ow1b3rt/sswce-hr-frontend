import InfoCard from '@/components/molecules/cards/InfoCard';
import { ROUTES } from '@/constants/routes/routes';
import { slugify } from '@/lib/utils';
import { Globe } from 'lucide-react';

async function getCountries() {
  try {
    const res = await fetch(ROUTES.API.COUNTRY, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.layout?.items || [];
  } catch (error) {
    return [];
  }
}

export default async function CountriesPage() {
  const countries = await getCountries();
  const cols = Math.min(countries.length || 1, 3);
  const mdCols = Math.min(countries.length || 1, 2);
  const mdColClass = mdCols === 1 ? 'md:grid-cols-1' : 'md:grid-cols-2';
  const lgColClass =
    cols === 1
      ? 'lg:grid-cols-1'
      : cols === 2
        ? 'lg:grid-cols-2'
        : 'lg:grid-cols-3';

  return (
    <section className="flex flex-col items-center gap-8 pb-12">
      <h1 className="text-primary-blue text-4xl font-bold">Countries</h1>
      
      {!countries || countries.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">No countries available at the moment.</p>
      ) : (
        <div className={`grid w-full grid-cols-1 justify-center gap-6 ${mdColClass} ${lgColClass}`}>
          {countries.map((country, index) => (
            <InfoCard
              key={country.slug || index.toString()}
              item={{
                name: country.title,
                description: country.description,
                imageSrc: country.image?.src || `/flags/${slugify(country.title)}.webp`,
              }}
              imageAlt={`${country.title} flag`}
              icon={Globe}
              href={ROUTES.COUNTRIES.SINGLE(country.slug || slugify(country.title))}
            />
          ))}
        </div>
      )}
    </section>
  );
}
