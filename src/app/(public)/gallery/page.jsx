import { fetcher } from '@/packages/admin';
import SafeImage from '@/components/ui/safe-image';
import AnimatedCard from '@/components/ui/animated-card';
import { AnimatedHeading } from '@/components/atoms/headings';

const SITE_URL = 'https://sswcehumanresources.com';

export const metadata = {
  title: 'Gallery',
  description:
    'Browse photos from SSWCE Human Resources, including training classes, Japanese language sessions, events, and activities with candidates preparing for careers in Japan.',
  keywords: [
    'SSWCE gallery',
    'Japanese language class Kathmandu photos',
    'SSW training Nepal',
    'Japan recruitment events Nepal',
    'SSWCE Human Resources photos',
  ],
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/gallery`,
    siteName: 'SSW Training Centre Nepal',
    title: 'Gallery | SSWCE Human Resources',
    description:
      'Photos from training classes, events, and activities at SSWCE Human Resources.',
    locale: 'en_US',
    images: [
      {
        url: '/images/landing/ssw-office.jpg',
        width: 1200,
        height: 630,
        alt: 'SSWCE Human Resources Gallery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery | SSWCE Human Resources',
    description:
      'Photos from training classes, events, and activities at SSWCE Human Resources.',
    images: ['/images/landing/ssw-office.jpg'],
  },
};

export default async function GalleryPage() {
  const data = await fetcher('/layouts/gallery');
  const items = data?.layout?.items || [];

  let columns = [[], [], []];
  items.forEach((item, index) => {
    columns[index % 3].push(item);
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Gallery | SSWCE Human Resources',
    url: `${SITE_URL}/gallery`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'SSWCE Human Resources',
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col gap-6 py-6">
        <AnimatedHeading text="Gallery" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-6">
              {column.map((item, itemIndex) => (
                <AnimatedCard
                  key={itemIndex}
                  distance={12}
                  triggerOnView
                  direction="up"
                >
                  <SafeImage
                    src={item.image.src}
                    alt={
                      item.image.alt ||
                      `SSWCE Human Resources gallery photo ${columnIndex + itemIndex * 3 + 1}`
                    }
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="h-auto w-full rounded-lg object-contain"
                  />
                </AnimatedCard>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
