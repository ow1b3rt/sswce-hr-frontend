import { notFound } from 'next/navigation';
import { ROUTES } from '@/constants/routes/routes';
import DetailPage from '@/components/templates/DetailPage';

async function getCountryBySlug(slug) {
  try {
    const res = await fetch(ROUTES.API.COUNTRY, { cache: 'no-store' });

    if (!res.ok) return null;

    const data = await res.json();
    if (data?.success && data?.layout?.items) {
      return data.layout.items.find((country) => country.slug === slug) ?? null;
    }
    return null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const country = await getCountryBySlug(slug);
  return {
    title: country
      ? `${country.title} | SSWCE Human Resources`
      : 'Country | SSWCE Human Resources',
    description: country?.description || undefined,
  };
}

export default async function CountryDetailPage({ params }) {
  const { slug } = await params;
  const country = await getCountryBySlug(slug);

  if (!country) notFound();

  const countryData = {
    title: country.title,
    image: {
      src: country.image?.src || '/country_fallback.png',
      alt: country.image?.alt || country.title,
    },
    content: country.description || '' ,
  };

  return <DetailPage data={countryData} isBlog/>;
}
