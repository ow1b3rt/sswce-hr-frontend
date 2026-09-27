import TitleDescCard from '@/components/molecules/TitleDescCard';
import JobOpportunitiesCard from '@/components/organisms/about-us/JobOpportunitiesCard';
import { MissionTimeline } from '@/components/organisms/about-us/MissionTimeLine';
import SafeImage from '@/components/ui/safe-image';

const aboutUsData = {
  whyChooseUs: {
    title: 'Why Choose Us',
    description:
      'Lorem ipsum dolor sit amet consectetur. Vitae non tincidunt hac cursus fringilla in. Maecenas ullamcorper justo tortor pretium porttitor. Scelerisque rhoncus lacus sed ultricies suscipit interdum. Ridiculus sapien scelerisque aliquet tristique aliquam. Scelerisque donec leo aliquam ipsum turpis. Mattis lorem accumsan ullamcorper commodo etiam. Faucibus non semper placerat risus pharetra nibh pharetra. Maecenas ultricies ut scelerisque orci ipsum fermentum massa aliquet. Urna non tellus etiam ipsum ultrices. Pretium aliquam hac vitae quam mattis sit odio nibh condimentum. Sagittis duis sed consectetur mauris eget. Mattis malesuada nisi ultrices justo. Non tellus ullamcorper aliquet cursus pellentesque vel rhoncus. Nullam id ullamcorper dictum et amet at vel neque tempus.\nPretium aliquam hac vitae quam mattis sit odio nibh condimentum. Sagittis duis sed consectetur mauris eget. Mattis malesuada nisi ultrices justo. Non tellus ullamcorper aliquet cursus pellentesque vel rhoncus. Nullam id ullamcorper dictum et amet at vel neque tempus.\nLorem ipsum dolor sit amet consectetur. Vitae non tincidunt hac cursus fringilla in. Maecenas ullamcorper justo tortor pretium porttitor. Scelerisque rhoncus lacus sed ultricies suscipit interdum. Ridiculus sapien scelerisque aliquet',
  },
};

const AboutUs = () => {
  return (
    <div className="bg-white px-4">
      <div className="grid grid-cols-1 items-center gap-y-4 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
        <div className="relative h-72 w-full overflow-hidden rounded-xl border sm:h-125 lg:h-full">
          <SafeImage
            src="/images/landing/hero-image.jpg"
            alt="SSWCE Human Resources"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            objectFit="cover"
            className="rounded-xl"
          />
          <div className="absolute bottom-0 left-0 p-1 sm:p-4">
            <JobOpportunitiesCard />
          </div>
        </div>

        <div>
          <TitleDescCard
            name={aboutUsData.whyChooseUs.title}
            batch=""
            description={aboutUsData.whyChooseUs.description}
            showDivider={false}
          />
        </div>
      </div>
      <MissionTimeline />
    </div>
  );
};

export default AboutUs;
