import AboutSection from '@/components/organisms/landing/AboutSection';
import HeroSection from '@/components/organisms/landing/HeroSection';
import ServicesSection from '@/components/organisms/landing/ServicesSection';

export default function Home() {
  return (
    <section className="grid space-y-12">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
    </section>
  );
}
