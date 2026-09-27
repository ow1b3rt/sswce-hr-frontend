'use client';

import React from 'react';
import AnimatedCard from '@/components/ui/animated-card';
import ContactForm from '@/components/organisms/forms/ContactForm';
import { AnimatedWords } from '@/components/ui/animated-words';

export default function ContactUs() {
  return (
    <section className="flex flex-col items-center gap-8 pb-12 w-full px-4">
      <AnimatedCard direction="down" distance={12} className="text-center" triggerOnView>
        <h1 className="text-primary-red text-4xl font-black md:text-5xl">
          <AnimatedWords text="Contact Us" animKey="contactTitle" direction="up" />
        </h1>
      </AnimatedCard>

      <AnimatedCard direction="up" distance={12} className="w-full max-w-5xl" triggerOnView>
        <ContactForm />
      </AnimatedCard>
    </section>
  );
}
