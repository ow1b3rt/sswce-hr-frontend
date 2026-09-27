'use client';
import Image from 'next/image';
import { HexGridBackground } from '@/components/ui/hexgrid-background';
import { TestimonialCard } from '@/components/organisms/about-us/TestimonialCard';
import {
  featuredTestimonial,
  floatingAvatars,
} from '@/resources/data/testimonials-data';
import { AutoCarousel } from '@/components/molecules/AutoCarousel';

export function TestimonialsSection() {
  return (
    <section className="bg-faint-green relative isolate overflow-hidden py-16 sm:py-20 lg:py-24">
      <HexGridBackground />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        {floatingAvatars.map((a) => (
          <div
            key={a.id}
            className={`absolute ${a.position} ${a.size} ring-primary overflow-hidden rounded-full shadow-md ring-4`}
          >
            <Image
              src={a.src}
              alt=""
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="relative mx-auto px-0 sm:px-6 lg:max-w-7xl lg:px-0">
        <h2 className="text-destructive mx-auto max-w-3xl text-center text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem]">
          Hear From Our Successful Candidates
        </h2>
        <div className="mt-10 sm:mt-12 lg:mt-16">
          <AutoCarousel
            items={featuredTestimonial}
            itemsClassName="basis-full sm:basis-1/2 lg:basis-1/3 h-full"
            transition="marquee"
            marqueeSpeed={90}

            renderItem={(testimonial, index) => (
              <TestimonialCard testimonial={testimonial} />
            )}
          />
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
