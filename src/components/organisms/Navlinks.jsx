'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { dropdownGroups } from '@/resources/data/nav-data';

function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'my-0.5 rounded-full px-4 py-1.5 font-semibold transition-colors lg:text-lg xl:text-xl',
        isActive
          ? 'bg-primary-blue text-primary-foreground'
          : 'text-foreground hover:bg-muted',
      )}
    >
      {children}
    </Link>
  );
}

function NavDropdown({ label, items }) {
  const pathname = usePathname();

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="hover:bg-muted data-[state=open]:bg-muted rounded-full bg-transparent px-4 py-2 text-lg font-semibold xl:text-xl">
        {label}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-48 gap-1 p-2">
          {items.map((item) => {
            const isSubActive = pathname === item.href;
            return (
              <li key={item.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      'hover:bg-muted block rounded-md px-3 py-2 text-base font-medium transition-colors',
                      isSubActive && 'bg-muted text-primary font-semibold',
                    )}
                  >
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              </li>
            );
          })}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export function Navlinks() {
  return (
    <nav className="col-span-8 hidden items-center justify-center gap-2 px-2 lg:flex">
      <NavLink href="/">Home</NavLink>
      <NavLink href="/about-us">About Us</NavLink>
      <NavLink href="/jobs">Jobs</NavLink>

      <NavigationMenu>
        <NavigationMenuList className="gap-2">
          {dropdownGroups.map((group) => (
            <NavDropdown
              key={group.label}
              label={group.label}
              items={group.items}
            />
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

export default Navlinks;
