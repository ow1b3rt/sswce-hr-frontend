import AboutSection from '@/components/organisms/landing/AboutSection';
import Highlight from '@/components/organisms/landing/BlogListSection';
import HeroSection from '@/components/organisms/landing/HeroSection';
import PopularJobs from '@/components/organisms/landing/PopularJobs';
import ServicesSection from '@/components/organisms/landing/ServicesSection';

export default function Home() {
  return (
    <section className="grid space-y-20">
      <HeroSection />
      <AboutSection />
      <PopularJobs />
      <ServicesSection />
      <Highlight />
    </section>
  );
}
