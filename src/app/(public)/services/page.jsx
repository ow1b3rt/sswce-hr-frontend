import InfoCard from '@/components/molecules/cards/InfoCard';
import { ROUTES } from '@/constants/routes/routes';
import { slugify } from '@/lib/utils';
import { Settings } from 'lucide-react';
import { AnimatedHeading } from '@/components/atoms/headings';

const SITE_URL = 'https://sswcehumanresources.com';

export const metadata = {
  title: 'Services',
  description:
    'Explore the services offered by SSWCE Human Resources, including career counselling, Japanese language and JFT test preparation, SSW training, visa guidance, and hostel facilities for candidates heading to Japan.',
  keywords: [
    'career counselling Nepal',
    'JFT preparation Kathmandu',
    'SSW training Nepal',
    'Japan visa guidance',
    'Japanese language classes Kathmandu',
    'hostel facility Kathmandu',
    'SSWCE Human Resources services',
  ],
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/services`,
    siteName: 'SSW Training Centre Nepal',
    title: 'Services | SSWCE Human Resources',
    description:
      'Career counselling, test preparation, SSW training, visa guidance, and hostel facilities for Nepali candidates preparing for jobs in Japan.',
    locale: 'en_US',
    images: [
      {
        url: '/images/landing/ssw-office.jpg',
        width: 1200,
        height: 630,
        alt: 'SSWCE Human Resources Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services | SSWCE Human Resources',
    description:
      'Career counselling, test preparation, SSW training, visa guidance, and hostel facilities for Nepali candidates preparing for jobs in Japan.',
    images: ['/images/landing/ssw-office.jpg'],
  },
};

async function getServices() {
  try {
    const res = await fetch(ROUTES.API.SERVICES.LAYOUT, { cache: 'no-store' });
    if (!res.ok) return { items: [] };
    const data = await res.json();
    return data || { items: [] };
  } catch (error) {
    return { items: [] };
  }
}

export default async function ServicesPage() {
  const data = await getServices();
  const services = data?.layout?.items || [];
  const cols = Math.min(services.length || 1, 3);
  const mdCols = Math.min(services.length || 1, 2);
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
    name: 'Services | SSWCE Human Resources',
    url: `${SITE_URL}/services`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'SSWCE Human Resources',
      url: SITE_URL,
    },
    ...(services.length > 0 && {
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: services.map((service, index) => {
          const name = service.title || service.name;
          return {
            '@type': 'ListItem',
            position: index + 1,
            name,
            url: `${SITE_URL}/services/${service.slug || slugify(name)}`,
          };
        }),
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
        <AnimatedHeading text="Services" />

        {!services || services.length === 0 ? (
          <p className="mt-10 text-center text-gray-500">
            No services available at the moment.
          </p>
        ) : (
          <div
            className={`grid w-full grid-cols-1 justify-center gap-6 ${mdColClass} ${lgColClass}`}
          >
            {services.map((service, index) => (
              <InfoCard
                key={service.slug || index.toString()}
                item={{
                  name: service.title || service.name,
                  description: service.description,
                  imageSrc: service.image?.src,
                }}
                imageAlt={service.image?.alt}
                icon={Settings}
                href={ROUTES.SERVICES.SINGLE(
                  service.slug || slugify(service.title || service.name),
                )}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
