import TitleDescCard from '@/components/molecules/TitleDescCard';
import ChairmanMessage from '@/components/organisms/about-us/ChairmanMessage';
import JobOpportunitiesCard from '@/components/organisms/about-us/JobOpportunitiesCard';
import { MissionTimeline } from '@/components/organisms/about-us/MissionTimeLine';
import { TestimonialsSection } from '@/components/organisms/about-us/TestimonialsSection';
import SafeImage from '@/components/ui/safe-image';
import { getTestimonials } from '@/lib/api/testimonials';
import AnimatedCard from '@/components/ui/animated-card';

const SITE_URL = 'https://sswcehumanresources.com';

export const metadata = {
  title: 'About Us',
  description:
    'Learn about SSWCE Human Resources, a Nepal-based recruitment and skill development company preparing skilled Nepali youth for jobs in Japan through Japanese language training, SSW and ESD programs.',
  keywords: [
    'about SSWCE Human Resources',
    'Nepal Japan recruitment company',
    'SSW program Nepal',
    'Japanese language training Nepal',
    'skilled workers Japan',
  ],
  alternates: {
    canonical: '/about-us',
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/about-us`,
    siteName: 'SSW Training Centre Nepal',
    title: 'About Us | SSWCE Human Resources',
    description:
      'A trusted bridge between Nepal and Japan for skills, employment, and long-term cooperation.',
    locale: 'en_US',
    images: [
      {
        url: '/images/landing/hero-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SSWCE Human Resources',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | SSWCE Human Resources',
    description:
      'A trusted bridge between Nepal and Japan for skills, employment, and long-term cooperation.',
    images: ['/images/landing/hero-image.jpg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About SSWCE Human Resources',
  url: `${SITE_URL}/about-us`,
  mainEntity: {
    '@type': 'Organization',
    name: 'SSWCE Human Resources',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.svg`,
  },
};

const aboutUsData = {
  whyChooseUs: {
    title: 'Why Choose Us',
    description:
      'SSWCE is different from other recruitment companies because we focus on Japan-focused talent development as well as recruitment. Our main strengths are quality candidates, Japanese language training, skill development, and reliable employer coordination. We prepare candidates for Japan through Japanese language, job skills, workplace manners, culture, and practical guidance, and we keep supporting them after selection with continuous coordination throughout the process. Candidates can expect clear guidance, proper training, transparent information, and ongoing support, while employers can expect well-prepared, motivated candidates and professional recruitment support. Our approach to recruitment centers on quality, suitability, transparency, and long-term success, and we support various SSW sectors and employment pathways based on employer requirements. We are guided by integrity, transparency, quality, responsibility, professionalism, and skill development, and we believe in building long-term, trust-based partnerships with both candidates and employers. Our WIN-WIN-WIN philosophy means creating sustainable value for candidates, employers, and SSWCE. Employers choose us for prepared candidates, clear communication, responsible coordination, and long-term cooperation, and candidates choose us for career guidance, skill development, transparent recruitment, and support for their Japan career. Our commitment is the right person, the right opportunity, and responsible support. Our vision is to become a trusted bridge between Nepal and Japan for skills, employment, and long-term cooperation, and our long-term goal is to contribute to a stronger Nepal–Japan relationship through skilled human resources and sustainable employment.',
  },
};

const AboutUs = async () => {
  let testimonials = [];

  try {
    const { items: testimonialItems } = await getTestimonials({
      page: 1,
      limit: 10,
    });
    testimonials = testimonialItems;
  } catch {
    testimonials = [];
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-card flex flex-col space-y-8 lg:space-y-20 lg:px-0">
        <AnimatedCard
          direction="right"
          className="grid grid-cols-1 items-center gap-y-4 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12"
        >
          <div className="relative h-72 w-full overflow-hidden rounded-xl border sm:h-125 lg:h-full">
            <SafeImage
              src="/images/landing/hero-image.jpg"
              alt="SSWCE Human Resources"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              objectFit="cover"
              className="rounded-xl"
            />
            <div className="absolute bottom-0 left-0 p-1 sm:p-4">
              <JobOpportunitiesCard />
            </div>
          </div>

          <div>
            <TitleDescCard
              name={aboutUsData.whyChooseUs.title}
              batch=""
              description={aboutUsData.whyChooseUs.description}
              showDivider={false}
            />
          </div>
        </AnimatedCard>
        <MissionTimeline />
        <ChairmanMessage />
        {testimonials?.length > 0 && (
          <TestimonialsSection testimonails={testimonials} />
        )}
      </div>
    </>
  );
};

export default AboutUs;
