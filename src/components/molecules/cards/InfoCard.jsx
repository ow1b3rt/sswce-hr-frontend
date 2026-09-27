import BaseCard from '@/components/molecules/cards/BaseCard';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const InfoCard = ({ item = {}, imageAlt, onAction, icon: Icon }) => {
  const { name = '', description = '', imageSrc } = item;

  return (
    <BaseCard>
      <div className="flex min-h-40 flex-col px-6 pt-6 pb-6">
        {Icon && (
          <div className="rounded-baseRadius bg-primary-blue/10 mb-4 flex aspect-square w-[clamp(56px,40%,88px)] items-center justify-center">
            <Icon size={42} className="text-primary-blue" strokeWidth={1.5} />
          </div>
        )}
        {!Icon && imageSrc && (
          <div className="rounded-baseRadius relative mb-4 aspect-square w-[clamp(56px,40%,88px)] overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt ?? `${name} image`}
              fill
              sizes="(max-width: 768px) 56px, 88px"
              className="object-cover"
            />
          </div>
        )}
        <h2 className="text-foreground pb-1 font-bold md:text-2xl md:text-[1.75rem]">
          {name}
        </h2>{' '}
        <p className="text-muted-foreground mb-5 line-clamp-4 text-base leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap items-center justify-end gap-3">
          <button
            onClick={onAction}
            className="bg-primary-blue hover:bg-dark-green rounded-baseRadius cursor-pointer px-8 py-2 text-white transition-colors duration-200"
          >
            <ArrowRight size={20} strokeWidth={4} />
          </button>
        </div>
      </div>
    </BaseCard>
  );
};

export default InfoCard;
