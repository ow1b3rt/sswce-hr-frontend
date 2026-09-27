export const ROUTES = {
  HOME: '/',
  ABOUT_US: '/about-us',
  JOBS: '/jobs',
  APPLICATION: '/application',
  EVENTS: '/events',

  BLOGS: {
    HOME: '/blogs',
    SINGLE: (slug) => `/blogs/${slug}`,
  },

  SERVICES: {
    HOME: '/services',
    SINGLE: (slug) => `/services/${slug}`,
  },

  COUNTRIES: {
    HOME: '/countries',
    SINGLE: (slug) => `/countries/${slug}`,
  },

  OTHERS: {
    FAQS: '/others/faqs',
    CONTACT: '/others/contact',
  },
};
