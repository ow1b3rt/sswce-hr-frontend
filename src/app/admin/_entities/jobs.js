import { defineEntity } from '@/packages/admin/index.jsx';
import { Cog } from 'lucide-react';

export const jobs = defineEntity({
  slug: 'jobs',
  label: 'Jobs',
  icon: Cog,
  titleField: 'title',
  roles: ['admin'],
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'experience',
      type: 'text',
      label: 'Experience',
      required: true,
    },
  ],
  filters: [],
});
