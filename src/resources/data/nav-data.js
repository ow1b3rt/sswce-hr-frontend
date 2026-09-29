const API_URL = process.env.NEXT_PUBLIC_API;

export const simpleLinks = [
  { title: 'Home', href: '/' },
  { title: 'About Us', href: '/about-us' },
  { title: 'Jobs', href: '/jobs' },
];

// Fallbacks, used if the API is down
const fallbackCountryLinks = [
  { title: 'Nepal', href: '/countries/nepal' },
  { title: 'India', href: '/countries/india' },
  { title: 'UAE', href: '/countries/uae' },
];

const fallbackServicesLinks = [
  { title: 'Recruitment', href: '/services/recruitment' },
  { title: 'Payroll', href: '/services/payroll' },
  { title: 'Consulting', href: '/services/consulting' },
];

// Stays static: these aren't database-driven
const othersLinks = [
  { title: "Blog", href: "/blogs" },
  { title: "FAQs", href: "/faqs" },
  { title: "Notices", href: "/notices" },
  { title: "Events", href: "/events" },
  { title: "Contact", href: "/contact" },
];

async function fetchLinks(path, hrefPrefix) {
  const res = await fetch(`${API_URL}${path}`, { cache: 'no-store' });

  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  const { layout } = await res.json();
  const items = layout?.items || [];

  return items.map((item) => ({
    title: item.title,
    href: `${hrefPrefix}/${item.slug}`,
  }));
}

export async function getCountryLinks() {
  try {
    return await fetchLinks('/layouts/countries', '/countries');
  } catch {
    return fallbackCountryLinks;
  }
}

export async function getServicesLinks() {
  try {
    return await fetchLinks('/layouts/services', '/services');
  } catch {
    return fallbackServicesLinks;
  }
}

export async function getDropdownGroups() {
  const [countries, services] = await Promise.all([
    getCountryLinks(),
    getServicesLinks(),
  ]);

  return [
    { label: 'Country', items: countries },
    { label: 'Services', items: services },
    { label: 'Others', items: othersLinks },
  ];
}
