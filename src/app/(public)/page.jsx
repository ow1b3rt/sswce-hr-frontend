import AboutSection from '@/components/organisms/landing/AboutSection';
import Highlight from '@/components/organisms/landing/BlogListSection';
import HeroSection from '@/components/organisms/landing/HeroSection';
import PopularJobs from '@/components/organisms/landing/PopularJobs';
import ServicesSection from '@/components/organisms/landing/ServicesSection';
import { getBlogs } from '@/lib/api/blogs';
import { fetchJobs } from '@/lib/api/jobs';
import { getServices } from '@/lib/api/services';

export default async function Home() {
  const jobs = await fetchJobs();
  const blogs = await getBlogs();
  const services = await getServices();
  const service = services.layout.items;

  return (
    <section className="grid space-y-20">
      <HeroSection />
      <AboutSection />
      <PopularJobs jobs={jobs} />
      <ServicesSection services={service} />
      <Highlight blogs={blogs} />
    </section>
  );
}
