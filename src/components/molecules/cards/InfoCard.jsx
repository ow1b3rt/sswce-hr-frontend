import BaseCard from '@/components/molecules/cards/BaseCard';
import SafeImage from '@/components/ui/safe-image';
import { ArrowRight, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const InfoCard = ({ item = {}, imageAlt, onAction, href, icon: Icon }) => {
  const { name = '', description = '', imageSrc } = item;
  const ShowIcon = Icon && !imageSrc;
  console.log('imageSrc', imageSrc)

  const ActionWrapper = ({ children }) =>
    href ? (
      <Link
        href={href}
        className="bg-primary-blue hover:bg-dark-green inline-flex cursor-pointer items-center justify-center rounded-xl px-6 py-3 text-white transition-colors duration-200"
      >
        {children}
      </Link>
    ) : (
      <button
        onClick={onAction}
        className="bg-primary-blue hover:bg-dark-green cursor-pointer rounded-xl px-8 py-2 text-white transition-colors duration-200"
      >
        {children}
      </button>
    );

  return (
    <BaseCard className="group">
      <div className="flex min-h-40 flex-col px-4 pt-6 pb-6 md:px-6">
        {imageSrc ? (
          <div className="relative mb-4 aspect-video w-[clamp(80px,50%,120px)] overflow-hidden rounded-xl shadow-lg">
            <SafeImage
              src={imageSrc}
              alt={imageAlt ?? `${name} flag`}
              fill
              sizes="(max-width: 768px) 80px, 120px"
              className="object-cover"
            />
          </div>
        ) : ShowIcon ? (
          <div className="bg-primary-blue/10 mb-4 flex aspect-square w-[clamp(56px,40%,88px)] items-center justify-center rounded-xl">
            <Icon size={42} className="text-primary-blue" strokeWidth={1.5} />
          </div>
        ) : (
          <div className="mb-4 flex aspect-square w-[clamp(56px,40%,88px)] items-center justify-center rounded-xl bg-gray-100">
            <Globe size={42} className="text-gray-400" strokeWidth={1.5} />
          </div>
        )}

        <h2 className="text-foreground pb-1 font-bold md:text-xl lg:text-2xl xl:text-3xl">
          {name}
        </h2>

        <p className="text-muted-foreground mb-5 line-clamp-4 text-base leading-relaxed">
          {description}
        </p>

        <div className="flex translate-y-2 flex-wrap items-center justify-end gap-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ActionWrapper>
            <ArrowRight className="size-7" strokeWidth={4} />
          </ActionWrapper>
        </div>
      </div>
    </BaseCard>
  );
};

export default InfoCard;
