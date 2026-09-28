import { defineEntity } from '@/packages/admin/index.jsx';
import { Quote } from 'lucide-react';

export const testimonials = defineEntity({
  slug: 'testimonials',
  label: 'Testimonials',
  icon: Quote,
  titleField: 'title',
  roles: ['admin', 'staff'],
  fields: [
    { name: 'title', type: 'text', label: 'Title', required: true },
    { name: 'name', type: 'text', label: 'Name', required: true },

    { name: 'batch', type: 'text', label: 'Batch', required: true },
    { name: 'description:textarea', type: 'textarea', label: 'Quote' },
    {
      name: 'image:image',
      type: 'image',
      label: 'Image',
      invisible: true,
      column: 'right',
    },
  ],
});
