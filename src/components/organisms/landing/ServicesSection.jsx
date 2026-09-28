import { OrbitingCirclesDemo } from './OribitingCricles';
const ServicesSection = ({ services }) => {
  return (
    <section className="flex flex-col items-center">
      <OrbitingCirclesDemo services={services} />
    </section>
  );
};

export default ServicesSection;
