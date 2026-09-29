import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, Mail } from 'lucide-react';
import SafeImage from '@/components/ui/safe-image';
import Divider from '@/components/ui/divider';
import { getCountryLinks, getServicesLinks } from '@/resources/data/nav-data'; // adjust path to wherever nav-data.js lives

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
  </svg>
);

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.15 0-3.5.01-4.74.07-.9.04-1.4.19-1.72.32-.44.17-.75.37-1.08.7-.33.33-.53.64-.7 1.08-.13.32-.28.82-.32 1.72-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.04.9.19 1.4.32 1.72.17.44.37.75.7 1.08.33.33.64.53 1.08.7.32.13.82.28 1.72.32 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.4-.19 1.72-.32.44-.17.75-.37 1.08-.7.33-.33.53-.64.7-1.08.13-.32.28-.82.32-1.72.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.9-.19-1.4-.32-1.72a2.9 2.9 0 0 0-.7-1.08 2.9 2.9 0 0 0-1.08-.7c-.32-.13-.82-.28-1.72-.32-1.24-.06-1.59-.07-4.74-.07Zm0 2.76a5.46 5.46 0 1 1 0 10.92 5.46 5.46 0 0 1 0-10.92Zm0 9a3.54 3.54 0 1 0 0-7.08 3.54 3.54 0 0 0 0 7.08Zm6.95-9.22a1.28 1.28 0 1 1-2.55 0 1.28 1.28 0 0 1 2.55 0Z" />
  </svg>
);

const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.29l13.32 17.41Z" />
  </svg>
);

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.14-.15.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.05 21.8h-.01a9.86 9.86 0 0 1-5.02-1.38l-.36-.21-3.73.98 1-3.64-.24-.37a9.83 9.83 0 0 1-1.51-5.27c0-5.44 4.43-9.86 9.88-9.86 2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.89 6.97c0 5.44-4.43 9.87-9.88 9.87Zm8.4-18.27A11.8 11.8 0 0 0 12.05.25C5.5.25.18 5.57.18 12.11c0 2.09.55 4.13 1.59 5.93L.08 24.25l6.36-1.67a11.8 11.8 0 0 0 5.61 1.43h.01c6.54 0 11.87-5.32 11.87-11.86 0-3.17-1.24-6.15-3.48-8.4Z" />
  </svg>
);

const SOCIALS = [
  { href: 'https://facebook.com', label: 'Facebook', icon: FacebookIcon },
  { href: 'https://youtube.com', label: 'YouTube', icon: YoutubeIcon },
  { href: 'https://instagram.com', label: 'Instagram', icon: InstagramIcon },
  { href: 'https://x.com', label: 'X', icon: XIcon },
  {
    href: 'https://wa.me/9779800000000',
    label: 'WhatsApp',
    icon: WhatsAppIcon,
  },
];

const CONTACT = {
  address: {
    line1: 'Narayangopal Chowk,',
    line2: 'Kathmandu, Nepal',
    href: 'https://maps.google.com/?q=Narayangopal+Chowk+Kathmandu',
  },
  phone: {
    label: '01-5921567',
    href: 'tel:015921567',
  },
  email: {
    label: 'ssw@gmail.com',
    href: 'mailto:ssw@gmail.com',
  },
};

const ABOUT = {
  title: 'About SSWCE Human Resources',
  description:
    'Lorem ipsum dolor sit amet consectetur. Scelerisque id condimentum a dui adipiscing urna gravida scelerisque risus.',
};

const CTA = {
  heading: 'We are here to support your',
  accent: 'Career Journey.',
  buttonLabel: 'Call Us',
  buttonHref: 'tel:015921567',
};

const COPYRIGHT = {
  prefix: 'Copyright ©',
  text: 'SSWCE Human Resource ',
  company: 'Design & Maintained By Enlighten Infosys Pvt. Ltd.',
  companyHref: '/',
};

// nav-data uses `title`, FooterColumn expects `label`
const toColumnItems = (links) =>
  links.map(({ title, href }) => ({ label: title, href }));

function FooterColumn({ title, items }) {
  return (
    <div>
      <h4 className="text-foreground mb-4 text-lg font-bold">{title}</h4>
      <ul className="flex flex-col gap-3 text-gray-600">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="hover:text-destructive transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactColumn({ title, contact }) {
  return (
    <div>
      <h4 className="text-foreground mb-4 text-lg font-bold">{title}</h4>
      <ul className="flex flex-col gap-4 text-gray-600">
        <li className="flex items-start gap-3">
          <MapPin size={20} className="text-foreground mt-0.5 shrink-0" />
          <Link
            href={contact.address.href}
            target="_blank"
            rel="noreferrer"
            className="hover:text-destructive transition-colors"
          >
            {contact.address.line1}
            <br />
            {contact.address.line2}
          </Link>
        </li>
        <li className="flex items-center gap-3">
          <Phone size={18} className="text-foreground shrink-0" />
          <Link
            href={contact.phone.href}
            className="hover:text-destructive transition-colors"
          >
            {contact.phone.label}
          </Link>
        </li>
        <li className="flex items-center gap-3">
          <Mail size={18} className="text-foreground shrink-0" />
          <Link
            href={contact.email.href}
            className="hover:text-destructive transition-colors"
          >
            {contact.email.label}
          </Link>
        </li>
      </ul>
    </div>
  );
}

export async function Footer() {
  const [services, countries] = await Promise.all([
    getServicesLinks(),
    getCountryLinks(),
  ]);

  return (
    <footer className="bg-card w-full pt-16 pb-8 text-gray-800 inset-shadow-2xs inset-shadow-gray-300">
      <div className="mx-auto">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-8">
          <div className="flex w-full flex-col justify-between lg:w-1/3 lg:pr-8">
            <div>
              <div className="mb-6">
                <SafeImage
                  src="/images/logo.svg"
                  alt="SSWCE Human Resources"
                  width={200}
                  height={64}
                  objectFit="contain"
                  className="h-18 w-auto"
                />
              </div>
              <div className="mb-8">
                <h4 className="mb-2 text-lg font-bold text-gray-900">
                  {ABOUT.title}
                </h4>
                <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                  {ABOUT.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="mb-1 text-base font-bold text-gray-900">
                    Location
                  </h4>
                  <p className="text-sm text-gray-600">
                    {CONTACT.address.line1}
                    <br />
                    {CONTACT.address.line2}
                  </p>
                </div>
                <div>
                  <h4 className="mb-1 text-base font-bold text-gray-900">
                    Inquiry
                  </h4>
                  <Link
                    href={CONTACT.email.href}
                    className="hover:text-destructive text-sm text-gray-600 transition-colors"
                  >
                    {CONTACT.email.label}
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-10 hidden items-center gap-4 md:flex lg:mt-12 lg:justify-end">
              {SOCIALS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-all duration-300 ease-out hover:scale-110 hover:bg-red-600"
                >
                  <Icon className="h-4 w-4 transition-colors duration-300" />
                </Link>
              ))}
            </div>
          </div>

          <Divider
            orientation="vertical"
            backgroundColor="bg-gray-200"
            className="hidden lg:block"
          />

          <div className="flex w-full flex-col lg:w-2/3 lg:pl-12">
            <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <h2 className="text-foreground text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl">
                {CTA.heading} <br className="hidden sm:block" />
                <span className="text-destructive">{CTA.accent}</span>
              </h2>

              <Link
                href={CTA.buttonHref}
                className="to-destructive from-red-shade flex shrink-0 items-center gap-2 rounded-xl bg-linear-to-b px-6 py-3 font-semibold text-white shadow-md transition-transform hover:scale-105"
              >
                <Phone size={20} fill="currentColor" />
                {CTA.buttonLabel}
              </Link>
            </div>

            <Divider backgroundColor="bg-gray-200" className="mb-10" />

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
              <FooterColumn title="Services" items={toColumnItems(services)} />
              <FooterColumn title="Country" items={toColumnItems(countries)} />
              <ContactColumn title="Get In Touch" contact={CONTACT} />
            </div>
          </div>
          <div className="flex items-center gap-4 md:hidden">
            {SOCIALS.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="group flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-all duration-300 ease-out hover:scale-110 hover:bg-red-600"
              >
                <Icon className="h-4 w-4 transition-colors duration-300" />
              </Link>
            ))}
          </div>
        </div>

        <Divider backgroundColor="bg-gray-200" className="mt-12" />

        <div className="pt-6">
          <p className="text-center text-sm text-gray-800">
            {COPYRIGHT.prefix}
            {new Date().getFullYear()} {COPYRIGHT.text}{' '}
            <Link
              href={COPYRIGHT.companyHref}
              className="hover:text-destructive font-bold transition-colors"
            >
              {COPYRIGHT.company}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
