'use client';

import { useApi, useGet, useToast } from '@/packages/admin';

import { HomeGalleryEditable } from '@/components/organisms/home/HomeGallery/GalleryEditable';

export default function GalleryPage() {
  const { data } = useGet('/layouts/gallery');
  const { post } = useApi();
  const toast = useToast();

  const handleSave = async (updatedSection) => {
    const res = await post('/layouts/gallery', updatedSection);
    if (res.success) {
      toast.success('Gallery layout saved successfully!');
    } else {
      toast.error('Failed to save gallery layout.');
    }
  };

  return (
    <section className="flex w-full flex-col gap-8 p-4">
      <HomeGalleryEditable
        key={data}
        section={data?.layout}
        onSave={handleSave}
      />
    </section>
  );
}
