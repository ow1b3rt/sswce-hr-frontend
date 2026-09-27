const BaseCard = ({ radius = 'rounded-baseRadius', children }) => {
  return (
    <div
      className={`border-border bg-card hover:shadow-card-hover h-full border transition-shadow ${radius}`}
    >
      {children}
    </div>
  );
};

export default BaseCard;
