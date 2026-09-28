import { defineEntities } from '@/packages/admin/index.jsx';

import { appointments } from './appointment.js';
import { authors } from './authors.js';
import { blogs } from './blogs.js';
import { contact } from './contacts.js';
import { events } from './events.js';
import { faqs } from './faqs.js';
import { gallery } from './gallery.js';
import { services } from './services.js';
import { users } from './users.js';
import { countries } from './countries.js';
import { jobs } from './jobs.js';

export const entities = defineEntities({
  users,
  authors,
  blogs,
  faqs,
  gallery,
  events,
  contact,
  appointments,
  jobs,
  'sections/countries': countries,
  'sections/services': services,
});
