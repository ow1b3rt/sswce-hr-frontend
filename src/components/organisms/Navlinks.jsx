'use client';

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const countryLinks = [
  { title: 'Nepal', href: '/country/nepal' },
  { title: 'India', href: '/country/india' },
  { title: 'UAE', href: '/country/uae' },
];

const servicesLinks = [
  { title: 'Recruitment', href: '/services/recruitment' },
  { title: 'Payroll', href: '/services/payroll' },
  { title: 'Consulting', href: '/services/consulting' },
];

const othersLinks = [
  { title: 'Blog', href: '/others/blog' },
  { title: 'FAQs', href: '/others/faqs' },
  { title: 'Contact', href: '/others/contact' },
];

function NavLink({ href, children, active = false }) {
  return (
    <Link
      href={href}
      className={cn(
        'my-0.5 rounded-full px-6 py-1 font-semibold transition-colors lg:text-xl',
        active
          ? 'bg-primary-blue text-primary-foreground'
          : 'text-foreground hover:bg-muted',
      )}
    >
      {children}
    </Link>
  );
}

function NavDropdown({ label, items }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="hover:bg-muted data-[state=open]:bg-muted rounded-full bg-transparent px-6 py-2 text-xl font-semibold">
        {label}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-48 gap-1 p-2">
          {items.map((item) => (
            <li key={item.href}>
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  className="hover:bg-muted block rounded-md px-3 py-2 text-lg font-medium"
                >
                  {item.title}
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export function Navlinks() {
  return (
    <nav className="col-span-8 flex items-center justify-center gap-4 px-6">
      <NavLink href="/" active>
        Home
      </NavLink>

      <NavLink href="/about-us">About Us</NavLink>

      <NavLink href="/jobs">Jobs</NavLink>

      <NavigationMenu>
        <NavigationMenuList className="gap-4">
          <NavDropdown label="Country" items={countryLinks} />
          <NavDropdown label="Services" items={servicesLinks} />
          <NavDropdown label="Others" items={othersLinks} />
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

export default Navlinks;
