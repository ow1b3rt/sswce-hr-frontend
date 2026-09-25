import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import SafeImage from '@/components/ui/safe-image';
import Navlinks from './Navlinks';
import MobileNav from './MobileNavbar';

export const Navbar = () => {
  return (
    <header className="bg-background/80 bg-card sticky top-0 z-50 w-full pt-2">
      <div className="container mx-auto grid grid-cols-12 items-center gap-2 md:gap-4">
        <div className="col-span-8 flex max-h-20 max-w-44 items-center lg:col-span-2">
          <Link href="/">
            <SafeImage
              src="/images/logo.svg"
              alt="SSWCE Human Resources"
              width={176}
              height={64}
              objectFit="contain"
            />
          </Link>
        </div>

        <Navlinks />

        <div className="col-span-2 hidden max-h-20 items-center justify-end lg:flex">
          <Button className="from-red-shade to-destructive hover:from-foreground hover:to-foreground flex max-w-44 cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-b px-5 py-6 transition duration-300 ease-in-out">
            <Image
              src="/icons/application.svg"
              width={20}
              height={20}
              alt="application"
            />
            <span className="text-lg font-semibold">Application</span>
          </Button>
        </div>

        <div className="col-span-4 flex justify-end pr-4 lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
