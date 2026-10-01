import AboutSection from '@/components/organisms/landing/AboutSection';
import Highlight from '@/components/organisms/landing/BlogListSection';
import HeroSection from '@/components/organisms/landing/HeroSection';
import PopularJobs from '@/components/organisms/landing/PopularJobs';
import ServicesSection from '@/components/organisms/landing/ServicesSection';
import { getBlogs } from '@/lib/api/blogs';
import { fetchJobs } from '@/lib/api/jobs';
import { getServices } from '@/lib/api/services';

const SITE_URL = 'https://sswcehumanresources.com';

export const metadata = {
  title: 'SSWCE Human Resources | Jobs in Japan from Nepal',
  description:
    'SSW Training Centre Nepal helps you build a career in Japan through career counselling, visa guidance, Japanese language preparation, JFT test prep, and SSW training.',
  keywords: [
    'SSW Nepal',
    'Specified Skilled Worker Japan',
    'jobs in Japan from Nepal',
    'JFT preparation Nepal',
    'Japanese language training Kathmandu',
    'manpower company Nepal',
    'ESD program',
    'SSWCE Human Resources',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'SSW Training Centre Nepal',
    title: 'SSWCE Human Resources | Build Your Career in Japan',
    description:
      'Career counselling, visa guidance, Japanese language preparation, and SSW training for Nepali youth seeking work in Japan.',
    locale: 'en_US',
    images: [
      {
        url: '/images/landing/ssw-office.jpg', // better: a dedicated 1200x630 og-image.jpg
        width: 1200,
        height: 630,
        alt: 'SSWCE Human Resources office, Kathmandu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SSWCE Human Resources | Build Your Career in Japan',
    description:
      'Career counselling, visa guidance, Japanese language preparation, and SSW training in Nepal.',
    images: ['/images/landing/ssw-office.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Structured data (JSON-LD) helps Google show rich results
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EmploymentAgency',
  name: 'SSWCE Human Resources',
  alternateName: 'SSW Training Centre Nepal',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.svg`,
  image: `${SITE_URL}/images/landing/ssw-office.jpg`,
  description:
    'Nepal-based manpower recruitment and skill development company preparing skilled Nepali youth for employment in Japan through SSW and ESD programs.',
  telephone: '+977-1-5921567',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Narayangopal Chowk',
    addressLocality: 'Kathmandu',
    addressCountry: 'NP',
  },
  areaServed: ['NP', 'JP'],
};

export default async function Home() {
  const jobs = await fetchJobs();
  const blogs = await getBlogs();
  const services = await getServices();
  const service = services?.layout?.items || [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="grid space-y-20">
        <HeroSection />
        <AboutSection />
        {jobs?.items?.length > 0 && <PopularJobs jobs={jobs} />}

        <ServicesSection services={service} />
        {blogs?.items?.length > 0 && <Highlight blogs={blogs} />}
      </section>
    </>
  );
}
