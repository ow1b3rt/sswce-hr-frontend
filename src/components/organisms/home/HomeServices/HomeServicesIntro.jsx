import Link from "next/link";
import { ROUTES } from "@/constants/routes/routes";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { AnimatedWords } from "@/components/ui/animated-words";
import { ImageContainer } from "@/components/molecules/ImageContainer";

const defaultSection = {
  title: "What We Offer",
  desc: "Explore our wide range of services crafted to help you grow and succeed.",
  ctaLabel: "Explore More",
  ctaURL: ROUTES.SERVICES.HOME,
  image: { src: "/images/home/wholeteam.jpg", alt: "SSW team group photo" },
};

export function ServicesIntro({
  section: data = defaultSection,
  className = "bg-faint-blue",
  titleClassName = "",
  descClassName = "",
  ctaClassName = "bg-blue-500 hover:bg-primary-blue",
  ctaIconClassName = "",
  imageClassName = "",
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col justify-between gap-6 rounded-3xl px-4 pt-4 md:px-8 md:pt-6 lg:h-full xl:gap-10",
        className,
      )}
    >
      <div className="mt-5 flex flex-col gap-4">
        <h2 className={cn("text-4xl font-extrabold xl:text-6xl", titleClassName)}>
          <AnimatedWords
            text={data.title}
            animKey="title"
            durationMs={1000}
            staggerMs={100}
            direction="left"
          />
        </h2>
        <p className={cn("max-w-2xl text-lg text-black/60 md:text-xl", descClassName)}>
          {data.desc}
        </p>

        <Link
          href={data.ctaURL}
          className={cn(
            "inline-flex w-fit items-center gap-2 rounded-xl px-8 py-2.5 text-lg font-semibold text-white transition duration-500 ease-in-out md:rounded-3xl md:text-xl",
            ctaClassName,
          )}
        >
          {data.ctaLabel}
          <ArrowRight size={30} className={ctaIconClassName} />
        </Link>
      </div>

      <ImageContainer
        className={cn(
          "aspect-video h-full w-full rounded-3xl rounded-b-none lg:w-full",
          imageClassName,
        )}
        src={data.image.src}
        alt={data.image.alt}
      />
    </div>
  );
}
