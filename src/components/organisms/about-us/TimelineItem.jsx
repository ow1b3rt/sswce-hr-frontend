export function TimelineItem({ entry, isLast, nextVariant }) {
  const Icon = entry.icon;
  const isSolid = entry.variant === 'solid';
  const endOpacity = nextVariant === 'solid' ? 14 : 8;

  const lineGradient = isSolid
    ? `linear-gradient(
        to bottom,
        var(--primary-blue) 0%,
        color-mix(in oklch, var(--primary-blue) 60%, white) 30%,
        color-mix(in oklch, var(--primary-blue) ${endOpacity * 2}%, white) 70%,
        color-mix(in oklch, var(--primary-blue) ${endOpacity}%, white) 100%
      )`
    : `linear-gradient(
        to bottom,
        color-mix(in oklch, var(--primary-blue) 12%, white) 0%,
        color-mix(in oklch, var(--primary-blue) 12%, white) 100%
      )`;

  return (
    <li className="relative flex gap-4 sm:gap-5">
      <div className="relative flex shrink-0 flex-col items-center">
        <div
          className={[
            'relative z-10 flex h-11 w-11 items-center justify-center rounded-full sm:h-12 sm:w-12',
            isSolid
              ? 'bg-primary-blue text-white'
              : 'text-primary-blue bg-[color-mix(in_oklch,var(--primary-blue)_10%,white)]',
          ].join(' ')}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} />
        </div>

        {!isLast && (
          <span
            aria-hidden="true"
            style={{ background: lineGradient }}
            className="absolute top-11 bottom-0 w-1 sm:top-12 md:w-1.5"
          />
        )}
      </div>

      <div className={isLast ? 'pb-0' : 'pb-7 sm:pb-8'}>
        <h3 className="text-primary-blue text-base leading-snug font-bold sm:text-xl lg:text-2xl">
          {entry.title}
        </h3>
        <p className="text-muted-foreground mt-1 text-base leading-relaxed sm:text-lg lg:text-xl">
          {entry.description}
        </p>
      </div>
    </li>
  );
}
