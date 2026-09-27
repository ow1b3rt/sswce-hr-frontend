const BaseCard = ({ radius = 'rounded-baseRadius', children, className }) => {
  return (
    <div
      className={`border-border bg-card hover:shadow-card-hover h-full border transition-shadow ${radius} ${className}`}
    >
      {children}
    </div>
  );
};

export default BaseCard;
