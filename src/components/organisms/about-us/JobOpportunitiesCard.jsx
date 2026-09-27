'use client';

import { AnimatedCounter } from '@/components/ui/animated-counter';
import React, { useState } from 'react';

const MONTHLY_DATA = [
  { month: 'Jan', value: 42 },
  { month: 'Feb', value: 68 },
  { month: 'Mar', value: 92 },
];

const BAR_COLORS = [
  'bg-[color:var(--chart-4)]',
  'bg-[color:var(--chart-3)]',
  'bg-[color:var(--chart-2)]',
];

export function JobOpportunitiesCard({
  title = 'Job Opportunities',
  subtitle = 'Explore available career opportunities',
  period = 'Monthly',
  availableLabel = 'Available Jobs',
  availableCount = 50,
  backgroundImage = '/images/landing/job-opportunities-bg.jpg',
  data = MONTHLY_DATA,
}) {
  const [active, setActive] = useState(data.length - 1);
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-2xl shadow-xl sm:max-w-md md:max-w-lg lg:max-w-xl">
      <div className="absolute inset-0">
        {backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 p-2 sm:p-6 md:p-7 lg:p-8">
        <div className="flex items-start justify-between gap-3 sm:mb-8 sm:gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="text-dark-green text-lg leading-tight font-bold sm:text-2xl md:text-3xl">
              {title}
            </h3>
            <p className="mt-1 text-xs text-(--dark-green)/80 sm:text-sm md:text-base">
              {subtitle}
            </p>
          </div>

          <button
            type="button"
            className="border-dark-green bg-faint-green text-dark-green hover:bg-dark-green shrink-0 rounded-full border px-3 py-1 text-xs font-semibold transition-colors hover:text-white sm:px-4 sm:py-1.5 sm:text-sm"
          >
            {period}
          </button>
        </div>

        <div className="flex items-end justify-between gap-2 sm:gap-4 md:gap-6">
          <div className="shrink-0">
            <p className="text-xs text-(--dark-green)/90 sm:text-sm md:text-base">
              {availableLabel}
            </p>
            <p className="text-dark-green mt-1 text-4xl leading-none font-extrabold sm:text-5xl md:text-6xl">
              <AnimatedCounter end={availableCount} suffix="+" start={0} />
            </p>
          </div>

          <div className="flex h-32 flex-1 items-end justify-end gap-2 sm:h-40 sm:gap-3 md:h-44 md:gap-4">
            {data.map((item, index) => {
              const heightPct = (item.value / maxValue) * 100;
              const isActive = index === active;
              return (
                <button
                  key={item.month}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className="group flex h-full flex-col items-center justify-end gap-1.5 focus:outline-none sm:gap-2"
                >
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs font-semibold transition-colors sm:px-2.5 sm:text-xs ${
                      isActive
                        ? 'border-dark-green text-dark-green bg-white'
                        : 'border-transparent bg-white/70 text-(--dark-green)/70'
                    }`}
                  >
                    {item.month}
                  </span>
                  <div
                    className={`w-10 rounded-xl bg-[linear-gradient(180deg,#044B00_15.38%,#4CAB47_100%)] transition-all duration-300 sm:w-12 sm:rounded-t-2xl md:w-14 lg:w-16 ${
                      BAR_COLORS[index % BAR_COLORS.length]
                    } ${isActive ? 'opacity-100' : 'opacity-80'}`}
                    style={{ height: `${Math.max(heightPct, 20)}%` }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobOpportunitiesCard;
