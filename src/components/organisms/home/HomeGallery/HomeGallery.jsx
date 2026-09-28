import Link from "next/link";
import { ROUTES } from "@/constants/routes/routes";

import AnimatedCard from "@/components/ui/animated-card";
import { ImageContainer } from "@/components/molecules/ImageContainer";

const section = {
  items: [
    {
      column: "left",
      image: { src: "/favicon.jpg", alt: "Reception" },
      label: "Reception",
      height: 340,
    },
    {
      column: "left",
      image: { src: "/favicon.jpg", alt: "T-shirt gift" },
      label: null,
      height: 220,
    },
    {
      column: "center",
      image: { src: "/favicon.jpg", alt: "Gathering" },
      label: "Gathering",
      height: 580,
    },
    {
      column: "right",
      image: { src: "/favicon.jpg", alt: "Team Member" },
      label: "Team Member",
      height: 340,
    },
    {
      column: "right",
      image: { src: "/favicon.jpg", alt: "Team gathering" },
      label: null,
      height: 220,
    },
  ],
  ctaLabel: "Explore Gallery",
  ctaURL: ROUTES.GALLERY,
};

const COLUMNS = ["left", "center", "right"];

export function GalleryCard({ image, label, height, theme = "lightblue" }) {
  const THEMES = {
    lightblue: "bg-faint-blue text-primary-blue",
    darkblue: "bg-primary-blue-dark text-white",
  };
  return (
    <div
      className="bg-faint-blue flex w-full flex-col gap-3 rounded-2xl border p-4 shadow-sm"
      style={{ height: height ? `${height}px` : "auto" }}
    >
      <ImageContainer
        className="aspect-square w-full flex-1 rounded-xl"
        src={image?.src || ""}
        alt={image?.alt || "Gallery Image"}
      />
      {label && (
        <div
          className={`bg-primary-blue } rounded-xl border py-4 text-center text-lg font-bold text-white`}
        >
          {label}
        </div>
      )}
    </div>
  );
}

async function fetchGallery() {
  try {
    const res = await fetch(ROUTES.API.LAYOUT_GALLERY, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.layout : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function HomeGallery({ section: fallbackData = section }) {
  const data = await fetchGallery();
  let rawItems = data?.items || fallbackData.items;
  let desktopItems;

  if (data?.items && data.items.length > 0) {
    desktopItems = data.items.slice(0, 6).map((item, index) => {
      const colIndex = index % 3;
      const row = Math.floor(index / 3);

      let column = "left";
      if (colIndex === 1) column = "center";
      else if (colIndex === 2) column = "right";

      let height;
      if (row === 0) {
        height = column === "center" ? 600 : 450;
      } else {
        height = column === "center" ? 260 : 410;
      }

      return {
        ...item,
        column,
        height,
        label: row === 1 ? null : item.label,
      };
    });
  }

  const ctaLabel = data?.ctaLabel || fallbackData.ctaLabel;
  const ctaURL = ROUTES.GALLERY;

  return (
    <>
      {desktopItems?.length > 0 && (
        <div
          id="home-gallery"
          className="flex w-full flex-col items-center gap-2 gap-y-8 md:pt-10 xl:gap-y-16"
        >
          <AnimatedCard
            className="rounded-lg bg-black px-10 py-2.5"
            direction="up"
            distance={12}
            triggerOnView
          >
            <h2 className="mb-1 text-3xl leading-none font-black tracking-[1px] text-white md:text-4xl xl:text-5xl">
              Gallery
            </h2>
          </AnimatedCard>
          <div className="flex w-full flex-col gap-4 md:hidden">
            {rawItems?.slice(0, 3).map((item, i) => (
              <GalleryCard theme="darkblue" key={i} {...item} height={null} />
            ))}
          </div>

          <AnimatedCard
            className="relative hidden w-full flex-col gap-4 md:flex md:flex-row lg:gap-8"
            direction="down"
            distance={12}
            triggerOnView
          >
            {COLUMNS.map((column) => (
              <div key={column} className="flex flex-1 flex-col gap-4 lg:gap-8">
                {desktopItems
                  ?.filter((item) => item.column === column)
                  .map((item, j) => (
                    <GalleryCard key={j} {...item} />
                  ))}
              </div>
            ))}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-white to-transparent" />
          </AnimatedCard>

          <AnimatedCard direction="up" distance={12} triggerOnView>
            <Link
              href={ctaURL}
              className="bg-primary-red rounded-lg px-10 py-4 text-lg font-bold text-white transition duration-500 ease-in-out hover:bg-black"
            >
              {ctaLabel}
            </Link>
          </AnimatedCard>
        </div>
      )}
    </>
  );
}
