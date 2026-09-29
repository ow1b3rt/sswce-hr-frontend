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
  const lines = text.split('\n');

  let globalIndex = 0;
  const totalWords = lines.reduce(
    (sum, line) => sum + line.trim().split(/\s+/).filter(Boolean).length,
    0,
  );

  return (
    <span key={animKey} className={cn('block', className)}>
      {lines.map((line, lineIdx) => {
        const words = line.trim().split(/\s+/).filter(Boolean);

        return (
          <span key={lineIdx} className="block">
            {words.map((word, i) => {
              const order = reverse
                ? totalWords - 1 - globalIndex
                : globalIndex;
              globalIndex += 1;

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
                  {/* Preserve a real space between words */}
                  {i < words.length - 1 && '\u00A0'}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}
