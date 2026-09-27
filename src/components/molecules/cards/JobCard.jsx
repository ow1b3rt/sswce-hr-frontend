import BaseCard from '@/components/molecules/cards/BaseCard';
import { MapPin, Banknote, Clock } from 'lucide-react';

const JobCard = ({ job }) => {
  const {
    title = 'Job Title',
    locationType = 'Onsite',
    salaryMin = 'Rs 5000',
    salaryMax = 'Rs 8000',
    description = 'Lorem ipsum dolor sit amet consectetur. Eget morbi at varius in sagittis tellus commodo diam scelerisque. Orci quis enim tristique nam neque mauris tellus consectetur.',
    experienceYears = 2,
    postedDaysAgo = 3,
  } = job;

  return (
    <BaseCard>
      <div className="flex flex-col px-6 pt-6 pb-6">
        <h2 className="text-foreground pb-4 text-center text-xl font-bold md:text-2xl">
          {title}
        </h2>

        <hr className="border-border mb-5" />

        <div className="text-foreground mb-5 flex flex-wrap items-center gap-4 text-base font-medium sm:gap-6">
          <span className="flex items-center justify-center gap-2">
            <MapPin size={20} className="text-foreground" />
            {locationType}
          </span>
          <span className="flex items-center gap-2">
            <Banknote size={20} className="text-foreground" />
            {salaryMin} – {salaryMax}
          </span>
        </div>

        <p className="text-muted-foreground mb-5 line-clamp-3 text-base leading-relaxed">
          {description}
        </p>

        <div className="mb-5">
          <p className="text-foreground mb-1.5 text-base font-bold">
            Experience:
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-destructive text-2xl leading-none font-extrabold md:text-3xl lg:text-4xl">
              {experienceYears}+
            </span>
            <span className="text-foreground text-lg font-medium">
              Years of Experience
            </span>
          </div>
        </div>

        <hr className="border-border mb-5" />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-foreground flex items-center gap-2 text-base">
            <Clock size={20} />
            {postedDaysAgo} Days ago
          </span>
          <button className="bg-primary-blue hover:bg-dark-green cursor-pointer rounded-full px-6 py-2.5 text-base font-semibold text-white transition-colors duration-200">
            Apply Now
          </button>
        </div>
      </div>
    </BaseCard>
  );
};

export default JobCard;
