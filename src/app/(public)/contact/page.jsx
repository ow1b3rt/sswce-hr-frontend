import React from 'react';
import AnimatedCard from '@/components/ui/animated-card';
import ContactForm from '@/components/organisms/forms/ContactForm';
import { AnimatedWords } from '@/components/ui/animated-words';

const SITE_URL = 'https://sswcehumanresources.com';

export const metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with SSWCE Human Resources in Kathmandu for career counselling, SSW training, JFT preparation, and visa guidance for jobs in Japan. Call 01-5921567 or send us a message.',
  keywords: [
    'contact SSWCE Human Resources',
    'Japan recruitment agency Kathmandu',
    'SSW training Narayangopal',
    'career counselling Kathmandu',
    'manpower company Nepal contact',
  ],
  alternates: {
    canonical: '/contact-us',
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/contact-us`,
    siteName: 'SSW Training Centre Nepal',
    title: 'Contact Us | SSWCE Human Resources',
    description:
      'Reach SSWCE Human Resources at Narayangopal Chowk, Kathmandu for career counselling and Japan job guidance.',
    locale: 'en_US',
    images: [
      {
        url: '/images/landing/ssw-office.jpg',
        width: 1200,
        height: 630,
        alt: 'SSWCE Human Resources office, Kathmandu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | SSWCE Human Resources',
    description:
      'Reach SSWCE Human Resources at Narayangopal Chowk, Kathmandu for career counselling and Japan job guidance.',
    images: ['/images/landing/ssw-office.jpg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact SSWCE Human Resources',
  url: `${SITE_URL}/contact-us`,
  mainEntity: {
    '@type': 'EmploymentAgency',
    name: 'SSWCE Human Resources',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.svg`,
    telephone: '+977-1-5921567',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Narayangopal Chowk',
      addressLocality: 'Kathmandu',
      addressCountry: 'NP',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+977-1-5921567',
      contactType: 'customer service',
      areaServed: 'NP',
      availableLanguage: ['English', 'Nepali'],
    },
  },
};

export default function ContactUs() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="flex w-full flex-col items-center gap-8 px-4 pb-12">
        <AnimatedCard
          direction="down"
          distance={12}
          className="text-center"
          triggerOnView
        >
          <h1 className="text-primary-red text-4xl font-black md:text-5xl">
            <AnimatedWords
              text="Contact Us"
              animKey="contactTitle"
              direction="up"
            />
          </h1>
        </AnimatedCard>

        <AnimatedCard
          direction="up"
          distance={12}
          className="w-full"
          triggerOnView
        >
          <ContactForm />
        </AnimatedCard>
      </section>
    </>
  );
}
