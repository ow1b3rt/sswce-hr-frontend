'use client';

import { cn } from '@/lib/utils';

const DIRECTION_OFFSET = {
  up: 'translateY(6px)',
  down: 'translateY(-6px)',
  left: 'translateX(10px)',
  right: 'translateX(-10px)',
};

export function AnimatedWords({
  text,
  animKey,
  staggerMs = 80,
  durationMs = 400,
  direction = 'up',
  reverse = false,
  className,
  wordClassName,
}) {
  const words = text.split(' ');
  const count = words.length;

  return (
    <span
      key={animKey}
      className={cn('inline-flex flex-wrap gap-x-1', className)}
    >
      {words.map((word, i) => {
        const order = reverse ? count - 1 - i : i;
        return (
          <span
            key={i}
            className={cn('animate-word-in inline-block', wordClassName)}
            style={{
              animationDelay: `${order * staggerMs}ms`,
              animationDuration: `${durationMs}ms`,
              '--word-offset': DIRECTION_OFFSET[direction],
            }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}
