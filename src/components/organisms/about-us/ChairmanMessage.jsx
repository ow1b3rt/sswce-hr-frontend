import { CutoutStatCard } from '@/components/molecules/CutoutStatCard';
import TitleDescCard from '@/components/molecules/TitleDescCard';

const chairmanMessage = {
  whyChooseUs: {
    title: 'Binod Chaudhary',
    subTitle: 'Executive Chairman',
    description:
      'Lorem ipsum dolor sit amet consectetur. Vitae non tincidunt hac cursus fringilla in. Maecenas ullamcorper justo tortor pretium porttitor. Scelerisque rhoncus lacus sed ultricies suscipit interdum. Ridiculus sapien scelerisque aliquet tristique aliquam. Scelerisque donec leo aliquam ipsum turpis. Mattis lorem accumsan ullamcorper commodo etiam. Faucibus non semper placerat risus pharetra nibh pharetra. Maecenas ultricies ut scelerisque orci ipsum fermentum massa aliquet. Urna non tellus etiam ipsum ultrices. Pretium aliquam hac vitae quam mattis sit odio nibh condimentum. Sagittis duis sed consectetur mauris eget. Mattis malesuada nisi ultrices justo. Non tellus ullamcorper aliquet cursus pellentesque vel rhoncus. Nullam id ullamcorper dictum et amet at vel neque tempus.\nPretium aliquam hac vitae quam mattis sit odio nibh condimentum. Sagittis duis sed consectetur mauris eget. Mattis malesuada nisi ultrices justo. Non tellus ullamcorper aliquet cursus pellentesque vel rhoncus. Nullam id ullamcorper dictum et amet at vel neque tempus.\nLorem ipsum dolor sit amet consectetur. Vitae non tincidunt hac cursus fringilla in. Maecenas ullamcorper justo tortor pretium porttitor. Scelerisque rhoncus lacus sed ultricies suscipit interdum. Ridiculus sapien scelerisque aliquet',
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
