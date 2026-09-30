import { CutoutStatCard } from '@/components/molecules/CutoutStatCard';
import TitleDescCard from '@/components/molecules/TitleDescCard';

const chairmanMessage = {
  whyChooseUs: {
    title: 'Kalakar Thapa',
    subTitle: 'Executive Chairman',
    description: `At S.S.W.C.E. Human Resources, our mission is to build a strong bridge between Nepal and Japan through skilled, responsible, and well-prepared human resources.
We focus on Specified Skilled Worker (SSW) and the Employment for Skill Development Program (ESDP), providing quality Japanese language education, skill development, and workplace and cultural training.
With Integrity, Transparency, Quality, and Professionalism, we aim to build lasting partnerships and create a WIN-WIN-WIN relationship for candidates, companies, and our communities.
Together, let us create opportunities, develop skills, and build a brighter future between Nepal and Japan.
Thank you for your continued trust and support.`,
  },
};

export const ChairmanMessage = () => {
  return (
    <div className="grid grid-cols-1 items-center gap-y-4 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
      <div>
        <CutoutStatCard />
      </div>

      <div>
        <TitleDescCard
          name={chairmanMessage.whyChooseUs.title}
          batch={chairmanMessage.whyChooseUs.subTitle}
          description={chairmanMessage.whyChooseUs.description}
          showDivider={false}
        />
      </div>
    </div>
  );
};

export default ChairmanMessage;
