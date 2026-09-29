import AnimatedCard from '@/components/ui/animated-card';
const BaseCard = ({ radius = 'rounded-baseRadius', children, className }) => {
  return (
    <AnimatedCard
      triggerOnView
      className={`border-border bg-card hover:shadow-card-hover h-full border transition-shadow ${radius} ${className}`}
    >
      {children}
    </AnimatedCard>
  );
};

export default BaseCard;
