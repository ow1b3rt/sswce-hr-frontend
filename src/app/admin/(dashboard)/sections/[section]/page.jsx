'use client';

import { useParams } from 'next/navigation';
import { useApi, useGet, useToast } from '@/packages/admin';

import { HomeServicesEditable } from '@/components/organisms/home/HomeServices/HomeServicesEditable';

export default function SectionPage() {
  const { section } = useParams();
  const { data } = useGet(`/layouts/${section}`);
  const { post } = useApi();
  const toast = useToast();

  const handleSave = async (updatedSection) => {
    const res = await post(`/layouts/${section}`, updatedSection);
    if (res?.success) {
      toast.success('Countries updated successfully');
    } else {
      toast.error('Failed to update section');
    }
  };

  return (
    <section className="flex w-full flex-col gap-8 p-4">
      <HomeServicesEditable
        key={data}
        section={data?.layout}
        onSave={handleSave}
        sectionName={section}
      />
    </section>
  );
}
