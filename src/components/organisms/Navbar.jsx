import { Button } from '../ui/button';
import SafeImage from '../ui/safe-image';
import Navlinks from './Navlinks';
import Image from 'next/image';

export const Navbar = () => {
  return (
    <section className="sticky top-0 z-50 grid grid-cols-12 items-center gap-4 py-3 backdrop-blur-2xl">
      <div className="col-span-2 max-h-20 max-w-44">
        <SafeImage
          src="/images/logo.svg"
          alt="SSWCE Human Resources"
          width={176}
          height={64}
          objectFit="contain"
        />
      </div>
      <Navlinks />
      <div className="col-span-2 flex max-h-20 items-center justify-end">
        <Button className="from-red-shade to-destructive hover:from-foreground hover:to-foreground flex max-w-44 cursor-pointer items-center justify-center gap-3 rounded-xl bg-linear-to-b px-5! py-6! transition duration-300 ease-in-out">
          <Image
            src="/icons/application.svg"
            width={22}
            height={21}
            alt="application"
          />
          <span className="text-xl font-semibold">Application</span>
        </Button>
      </div>
    </section>
  );
};

export default Navbar;
