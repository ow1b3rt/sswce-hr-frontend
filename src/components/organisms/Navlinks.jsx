'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'my-0.5 rounded-full px-4 py-1.5 font-semibold transition-colors lg:text-base xl:text-xl',
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
  const isActive = items.some((item) => pathname === item.href);

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn(
          'my-0.5 rounded-full px-4 py-1.5 text-base font-semibold transition-colors xl:text-lg 2xl:text-xl',
          isActive
            ? [
                'bg-primary-blue text-primary-foreground',
                'hover:bg-primary-blue hover:text-primary-foreground',
                'focus:bg-primary-blue focus:text-primary-foreground',
                'data-open:bg-primary-blue data-open:text-primary-foreground',
                'data-popup-open:bg-primary-blue data-popup-open:text-primary-foreground',
                'data-open:hover:bg-primary-blue data-open:hover:text-primary-foreground',
                'data-popup-open:hover:bg-primary-blue data-popup-open:hover:text-primary-foreground',
                'data-open:focus:bg-primary-blue data-open:focus:text-primary-foreground',
              ]
            : [
                'text-foreground bg-transparent',
                'hover:bg-muted hover:text-foreground',
                'data-open:bg-muted data-open:text-foreground',
                'data-popup-open:bg-muted data-popup-open:text-foreground',
              ],
        )}
      >
        {label}
      </NavigationMenuTrigger>

      <NavigationMenuContent>
        <ul className="grid min-w-48 max-w-60 gap-1 p-2">
          {items.map((item) => {
            const isSubActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'hover:bg-muted block rounded-md px-3 py-2 text-base font-medium transition-colors',
                    isSubActive && 'bg-muted text-primary font-semibold',
                  )}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export function Navlinks({ dropdownGroups }) {
  return (
    <nav className="col-span-8 hidden items-center justify-center gap-2 px-2 lg:flex xl:col-span-8">
      <NavLink href="/">Home</NavLink>
      <NavLink href="/about-us">About Us</NavLink>
      <NavLink href="/jobs">Jobs</NavLink>

      <NavigationMenu>
        <NavigationMenuList className="cursor-pointer gap-2">
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
