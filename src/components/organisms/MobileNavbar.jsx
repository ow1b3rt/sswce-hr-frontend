'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import SafeImage from '@/components/ui/safe-image';
import { ROUTES } from '@/constants/routes/routes';

function AccordionGroup({ label, items, onNavigate, index = 0 }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className="border-border/60 animate-bubble-in border-b"
      style={{ animationDelay: `${260 + index * 60}ms` }}
    >
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

export function MobileNav({ simpleLinks, dropdownGroups }) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [bubbleOrigin, setBubbleOrigin] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (open) handleClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && handleClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleOpen = useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      // Panel is right-anchored with w-[85%] max-w-sm
      const panelWidth = Math.min(window.innerWidth * 0.85, 384);
      const panelLeft = window.innerWidth - panelWidth;
      setBubbleOrigin({
        x: rect.left + rect.width / 2 - panelLeft,
        y: rect.top + rect.height / 2,
      });
    }
    setClosing(false);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 380);
  }, []);

  return (
    <div className="lg:hidden">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        aria-label="Toggle navigation menu"
        onClick={open ? handleClose : handleOpen}
        className="transition-transform duration-200 active:scale-90"
      >
        {open ? (
          <X className="text-destructive size-8" />
        ) : (
          <Menu className="text-destructive size-8" />
        )}
      </Button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className={cn(
              'fixed inset-0 z-[90] bg-black/40 transition-opacity duration-300',
              closing ? 'opacity-0' : 'opacity-100',
            )}
            onClick={handleClose}
          />

          {/* The panel — same dimensions as your old Sheet */}
          <div
            className={cn(
              'bg-card fixed top-0 right-0 z-[100] flex h-full w-[85%] max-w-sm flex-col',
              closing ? 'animate-panel-bubble-out' : 'animate-panel-bubble-in',
            )}
            style={{
              '--bubble-x': `${bubbleOrigin.x}px`,
              '--bubble-y': `${bubbleOrigin.y}px`,
            }}
          >
            {!closing && (
              <>
                <div
                  className="animate-bubble-in flex items-center justify-between border-b px-5 py-2"
                  style={{ animationDelay: '200ms' }}
                >
                  <Link href="/" onClick={handleClose}>
                    <SafeImage
                      src="/images/logo.svg"
                      alt="SSWCE Human Resources"
                      width={176}
                      height={64}
                      objectFit="contain"
                    />
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClose}
                    aria-label="Close menu"
                  >
                    <X className="text-destructive size-6" />
                  </Button>
                </div>

                <div
                  data-lenis-prevent
                  className="flex flex-1 flex-col justify-between overflow-y-auto px-5 py-2"
                >
                  <div className="space-y-1">
                    <div className="border-border/60 flex flex-col gap-4 border-b pb-2">
                      {simpleLinks.map((link, i) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={handleClose}
                          className={cn(
                            'hover:bg-muted animate-bubble-in block rounded-md px-4 py-2.5 text-lg font-semibold',
                            pathname === link.href &&
                              'bg-primary-blue text-card',
                          )}
                          style={{ animationDelay: `${260 + i * 60}ms` }}
                        >
                          {link.title}
                        </Link>
                      ))}
                    </div>

                    {dropdownGroups.map((group, i) => (
                      <AccordionGroup
                        key={group.label}
                        label={group.label}
                        items={group.items}
                        index={simpleLinks.length + i}
                        onNavigate={handleClose}
                      />
                    ))}
                  </div>

                  <div
                    className="animate-bubble-in pt-6 pb-4"
                    style={{
                      animationDelay: `${
                        260 + (simpleLinks.length + dropdownGroups.length) * 60
                      }ms`,
                    }}
                  >
                    <Link
                      href={ROUTES.APPLICATION}
                      onClick={handleClose}
                      className="from-red-shade to-destructive hover:from-foreground hover:to-foreground text-card flex max-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-b px-5 py-6 transition duration-300 ease-in-out"
                    >
                      <Image
                        src="/icons/application.svg"
                        width={20}
                        height={20}
                        alt="application"
                      />
                      <span className="text-base font-semibold 2xl:text-lg">
                        Application
                      </span>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default MobileNav;
