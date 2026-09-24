'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { simpleLinks, dropdownGroups } from '@/resources/data/nav-data';
import SafeImage from '@/components/ui/safe-image';

function AccordionGroup({ label, items, onNavigate }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="border-border/60 border-b">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-4 py-3.5 text-lg font-semibold"
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          className={cn(
            'h-5 w-5 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>
      <div
        className={cn(
          'grid overflow-hidden transition-all duration-300 ease-in-out',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <ul className="min-h-0 space-y-1 pb-3 pl-3">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  'hover:bg-muted block rounded-md px-3 py-2 text-base font-medium transition-colors',
                  pathname === item.href &&
                    'bg-muted text-primary font-semibold',
                )}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle navigation menu"
          >
            <Menu className="text-destructive size-8" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-[85%] max-w-sm p-0">
          <SheetHeader className="border-b px-5 py-2 text-left">
            <Link href="/">
              <SafeImage
                src="/images/logo.svg"
                alt="SSWCE Human Resources"
                width={176}
                height={64}
                objectFit="contain"
              />
            </Link>
          </SheetHeader>

          <div className="flex h-[calc(100vh-65px)] flex-col justify-between overflow-y-auto px-5 py-2">
            <div className="space-y-1">
              <div className="border-border/60 flex flex-col gap-4 border-b pb-2">
                {simpleLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'hover:bg-muted block rounded-md px-4 py-2.5 text-lg font-semibold',
                      pathname === link.href && 'bg-primary-blue text-card',
                    )}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>

              {dropdownGroups.map((group) => (
                <AccordionGroup
                  key={group.label}
                  label={group.label}
                  items={group.items}
                  onNavigate={() => setOpen(false)}
                />
              ))}
            </div>

            <div className="pt-6 pb-4">
              <Button className="from-red-shade to-destructive hover:from-foreground hover:to-foreground flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-linear-to-b py-6 transition duration-300 ease-in-out">
                <Image
                  src="/icons/application.svg"
                  width={20}
                  height={20}
                  alt="application"
                />
                <span className="text-lg font-semibold">Application</span>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNav;
