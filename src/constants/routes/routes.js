export const ROUTES = {
  HOME: '/',
  ABOUT_US: '/about-us',
  JOBS: '/jobs',
  APPLICATION: '/application',
  EVENTS: {
    HOME: '/events',
    SINGLE: (slug) => `/events/${slug}`,
  },

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

  API: {
    CONTACT: `${process.env.NEXT_PUBLIC_API}/contact`,
    SERVICES: {
      LAYOUT: `${process.env.NEXT_PUBLIC_API}/layouts/services`,
      HOME: (page = 1, limit = 9) => `${process.env.NEXT_PUBLIC_API}/services?page=${page}&limit=${limit}`,
    },
    BLOGS: {
      HOME: (page = 1, limit = 9) => `${process.env.NEXT_PUBLIC_API}/blogs?page=${page}&limit=${limit}`,
    },
    COUNTRY: `${process.env.NEXT_PUBLIC_API}/layouts/country`,
    APPOINTMENTS: `${process.env.NEXT_PUBLIC_API}/appointments`,
    EVENTS: {
      HOME: (page = 1, limit = 9) => `${process.env.NEXT_PUBLIC_API}/events?page=${page}&limit=${limit}`,
      SINGLE_VIA_SLUG: (slug) => `${process.env.NEXT_PUBLIC_API}/events/slug/${slug}`,
    }
  },
};

