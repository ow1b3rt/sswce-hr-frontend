import { ROUTES } from "@/constants/routes/routes";

import { getServices } from "@/lib/api/services";
import AnimatedCard from "@/components/ui/animated-card";

import { ServicesGrid } from "./HomeServicesGrid";
import { ServicesIntro } from "./HomeServicesIntro";

const servicesSection = {
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

export async function HomeServices() {
  let section = servicesSection;

  try {
    const services = await getServices();
    if (services?.length) {
      section = {
        theme: servicesSection.theme,
        list: services.slice(0, 6).map((service) => ({
          image: service.image,
          title: service.title,
          desc: service.description,
          url: ROUTES.SERVICES.SINGLE_VIA_SLUG(service.slug),
        })),
      };
    }
  } catch {
    section = servicesSection;
  }

  return (
    <section
      id="home-services"
      className="grid gap-x-8 gap-y-8 md:pt-10 lg:grid-cols-2 xl:gap-y-16"
    >
      <AnimatedCard direction="down" distance={12} triggerOnView>
        <ServicesIntro />
      </AnimatedCard>
      <AnimatedCard direction="up" distance={12} triggerOnView>
        <ServicesGrid section={section} />
      </AnimatedCard>
    </section>
  );
}
