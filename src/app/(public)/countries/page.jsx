import InfoCard from '@/components/molecules/cards/InfoCard';
import { ROUTES } from '@/constants/routes/routes';
import { slugify } from '@/lib/utils';
import { Globe } from 'lucide-react';
import { getFlagUrlByCountryName } from '@/lib/utils';
import { AnimatedWords } from '@/components/ui/animated-words';

const SITE_URL = 'https://sswcehumanresources.com';

export const metadata = {
  title: 'Countries',
  description:
    'Explore the countries where SSWCE Human Resources connects skilled Nepali candidates with employment opportunities, starting with Japan through SSW and ESD programs.',
  keywords: [
    'jobs in Japan from Nepal',
    'overseas employment Nepal',
    'foreign employment countries Nepal',
    'SSW Japan',
    'SSWCE Human Resources countries',
  ],
  alternates: {
    canonical: '/countries',
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/countries`,
    siteName: 'SSW Training Centre Nepal',
    title: 'Countries | SSWCE Human Resources',
    description:
      'Explore the countries where SSWCE Human Resources connects skilled Nepali candidates with employment opportunities.',
    locale: 'en_US',
    images: [
      {
        url: '/images/landing/ssw-office.jpg',
        width: 1200,
        height: 630,
        alt: 'SSWCE Human Resources Countries',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Countries | SSWCE Human Resources',
    description:
      'Explore the countries where SSWCE Human Resources connects skilled Nepali candidates with employment opportunities.',
    images: ['/images/landing/ssw-office.jpg'],
  },
};

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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Countries | SSWCE Human Resources',
    url: `${SITE_URL}/countries`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'SSWCE Human Resources',
      url: SITE_URL,
    },
    ...(countries.length > 0 && {
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: countries.map((country, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: country.title,
          url: `${SITE_URL}/countries/${country.slug || slugify(country.title)}`,
        })),
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="flex flex-col items-center gap-8 pb-12">
        <h1 className="text-destructive text-center text-4xl font-bold md:text-5xl lg:text-7xl">
          <AnimatedWords
            text="Countries"
            animKey="text"
            staggerMs={100}
            durationMs={800}
            direction="up"
            className="mt-1 justify-center"
          />
        </h1>
        {!countries || countries.length === 0 ? (
          <p className="mt-10 text-center text-gray-500">
            No countries available at the moment.
          </p>
        ) : (
          <div
            className={`grid w-full grid-cols-1 justify-center gap-6 ${mdColClass} ${lgColClass}`}
          >
            {countries.map((country, index) => {
              const flagUrl = getFlagUrlByCountryName(country.title);
              const finalImageSrc = flagUrl;
              return (
                <InfoCard
                  key={country.slug || index.toString()}
                  item={{
                    name: country.title,
                    description: country.description,
                    imageSrc: finalImageSrc,
                  }}
                  imageAlt={country.image?.alt || `${country.title} flag`}
                  icon={Globe}
                  href={ROUTES.COUNTRIES.SINGLE(
                    country.slug || slugify(country.title),
                  )}
                />
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
