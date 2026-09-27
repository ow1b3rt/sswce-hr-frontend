import Image from 'next/image';
import { Quote } from 'lucide-react';

export function TestimonialCard({ testimonial }) {
  return (
    <div className="relative mx-auto max-w-72 pb-2 sm:max-w-96 lg:max-w-lg">
      <div
        aria-hidden="true"
        className="bg-dark-green absolute inset-x-3 top-12 -bottom-6 rounded-2xl opacity-90 sm:inset-x-5 sm:top-14 sm:-bottom-7 lg:top-16 lg:-bottom-8"
      />

      <div className="relative flex flex-col items-center">
        <div className="relative z-10 -mb-12 sm:-mb-14 lg:-mb-14">
          <div className="ring-dark-green relative h-24 w-24 rounded-full ring-4 sm:h-28 sm:w-28 lg:h-32 lg:w-32">
            <div className="ring-primary relative mt-2 h-full w-full overflow-hidden rounded-full ring-8">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                fill
                sizes="(max-width: 640px) 96px, (max-width: 1024px) 112px, 128px"
                className="rounded-full object-cover"
              />
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[72%] left-1/2 flex -translate-x-1/2 gap-1 sm:top-[74%] lg:top-[76%]"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-transparent sm:size-18">
              <Quote className="fill-primary text-primary size-6 rotate-180 sm:size-12" />
            </span>
          </div>
        </div>

        <div className="relative w-full rounded-2xl bg-white px-5 pt-16 pb-10 shadow-[0_20px_35px_-8px_rgba(4,75,0,0.28)] sm:px-10 sm:pt-20 sm:pb-14 lg:px-14 lg:pt-24">
          <blockquote className="text-muted-foreground mx-auto max-w-2xl text-center text-sm leading-relaxed sm:text-base lg:text-lg">
            {testimonial.quote}
          </blockquote>

          <figcaption className="mt-4 text-center">
            <p className="text-destructive text-base font-bold sm:text-lg lg:text-xl">
              {testimonial.name}
            </p>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              {testimonial.role}
            </p>
          </figcaption>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
