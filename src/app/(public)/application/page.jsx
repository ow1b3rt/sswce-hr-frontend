'use client';

import React, { useState } from 'react';
import ApplicationForm from '@/components/organisms/forms/ApplicationForm';

export default function ApplicationPage() {
  const [loading, setLoading] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    console.log('Form submitted');
    setLoading(false);
  };

  return (
    <section className="flex flex-col items-center gap-8 pb-12">
      <ApplicationForm
        key={formKey}
        loading={loading}
        onSubmit={handleSubmit}
      />
    </section>
  );
}
