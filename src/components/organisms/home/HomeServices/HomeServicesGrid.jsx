import Link from "next/link";
import { ROUTES } from "@/constants/routes/routes";
import {
  BedDouble,
  CreditCard,
  FileText,
  HardHat,
  HeartHandshake,
  Languages,
  PlaneTakeoff,
  RotateCw,
  Sprout,
  UserCheck,
  UtensilsCrossed,
} from "lucide-react";

import { ImageContainer } from "@/components/molecules/ImageContainer";

const ICONS = {
  UserCheck,
  FileText,
  BedDouble,
  RotateCw,
  Languages,
  CreditCard,
  HardHat,
  Sprout,
  UtensilsCrossed,
  PlaneTakeoff,
  HeartHandshake,
};

const THEMES = {
  green: {
    bg: "bg-primary-green",
    hoverBg: "hover:bg-primary-green/10",
  },
  red: {
    bg: "bg-primary-red",
    hoverBg: "hover:bg-primary-red/10",
  },
  blue: {
    bg: "bg-primary-blue-dark",
    hoverBg: "hover:bg-faint-blue",
  },
};

const section = {
  theme: "blue",
  list: [
    {
      image: { src: "/favicon.jpg", alt: "Career Counselling" },
      title: "Career Counselling",
      desc: "International English Language Testing System or IELTS",
      url: ROUTES.SERVICES.HOME,
    },
    {
      image: { src: "/favicon.jpg", alt: "Test Preparations" },
      title: "Test Preparations",
      desc: "Preparing for tests can be stressful, but SSW Training Centre Nepal is here to help.",
      url: ROUTES.SERVICES.HOME,
    },
    {
      image: { src: "/favicon.jpg", alt: "Hostel Faculty" },
      title: "Hostel Faculty",
      desc: "We understand that finding a comfortable place to stay is essential for our trainees.",
      url: ROUTES.SERVICES.HOME,
    },
    {
      image: { src: "/favicon.jpg", alt: "SSW Training" },
      title: "SSW Training",
      desc: "We provide training programs to equip you with needed for the SSW visa.",
      url: ROUTES.SERVICES.HOME,
    },
    {
      image: { src: "/favicon.jpg", alt: "JFT" },
      title: "JFT",
      desc: "Japanese language is crucial for a successful life and career in Japan.",
      url: ROUTES.SERVICES.HOME,
    },
    {
      image: { src: "/favicon.jpg", alt: "Visa Guidance" },
      title: "Visa Guidance",
      desc: "Navigating the visa process can be complex and time-consuming, but at SSW.",
      url: ROUTES.SERVICES.HOME,
    },
  ],
};

function ServiceCard({ image, icon, title, desc, url, theme }) {
  const Icon = ICONS[icon];
  const t = THEMES[theme] ?? THEMES.blue;

  return (
    <Link
      href={url || ROUTES.SERVICES.HOME}
      className={`group flex w-full flex-col gap-1 rounded-3xl p-4 shadow-sm transition-colors duration-600 sm:gap-4 sm:p-6 ${t.bg} ${t.hoverBg}`}
    >
      <div className="flex items-start">
        {image?.src ? (
          <ImageContainer
            className="h-16 w-16 border-2 border-white"
            src={image.src}
            alt={image.alt || title}
          />
        ) : Icon ? (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
            <Icon size={28} className="transition-colors duration-300" />
          </div>
        ) : null}
      </div>
      <h3 className="truncate text-base font-extrabold text-white transition-colors duration-300 group-hover:text-black md:text-2xl lg:text-xl xl:text-2xl">
        {title}
      </h3>
      <p className="line-clamp-3 text-sm text-white/70 transition-colors duration-300 group-hover:text-black/60 md:text-lg lg:text-base xl:text-lg">
        {desc}
      </p>
    </Link>
  );
}

export function ServicesGrid({ section: data = section, className }) {
  const { theme, list = [] } = data ?? {};

  return (
    <div className={`grid grid-cols-2 gap-2 sm:gap-4 ${className}`}>
      {list.map((item, i) => (
        <ServiceCard key={i} {...item} theme={theme} />
      ))}
    </div>
  );
}
