'use client';

import { useId } from 'react';

import { ImageContainer } from '@/components/molecules/ImageContainer';

function notchedRectPath(
  aspectRatio,
  radiusPct,
  notchWidthPct,
  notchHeightPct,
  notchRadiusPct,
) {
  const rx = radiusPct / 100;
  const ry = rx * aspectRatio;
  const nwx = notchWidthPct / 100;
  const nhy = notchHeightPct / 100;
  const nrx = notchRadiusPct / 100;
  const nry = nrx * aspectRatio;

  return `
    M ${rx} 0
    H ${1 - rx}
    A ${rx} ${ry} 0 0 1 1 ${ry}
    V ${1 - nhy - nry}
    A ${nrx} ${nry} 0 0 1 ${1 - nrx} ${1 - nhy}
    H ${1 - nwx + nrx}
    A ${nrx} ${nry} 0 0 0 ${1 - nwx} ${1 - nhy + nry}
    V ${1 - nry}
    A ${nrx} ${nry} 0 0 1 ${1 - nwx - nrx} 1
    H ${rx}
    A ${rx} ${ry} 0 0 1 0 ${1 - ry}
    V ${ry}
    A ${rx} ${ry} 0 0 1 ${rx} 0
    Z
  `;
}

const CORNER_TRANSFORM = {
  'bottom-right': '',
  'bottom-left': 'translate(1, 0) scale(-1, 1)',
  'top-right': 'translate(0, 1) scale(1, -1)',
  'top-left': 'translate(1, 1) scale(-1, -1)',
};

export function NotchedImage({
  src,
  alt,
  aspectRatio = 4 / 5, // width / height
  radius = 4, // % of width
  notchWidth = 55, // % of width
  notchHeight = 42, // % of height
  notchRadius = 8, // % of width
  notchCorner = 'bottom-right',
  className,
}) {
  const clipId = useId();
  const d = notchedRectPath(
    aspectRatio,
    radius,
    notchWidth,
    notchHeight,
    notchRadius,
  );
  const transform = CORNER_TRANSFORM[notchCorner];

  return (
    <div className={className} style={{ aspectRatio }}>
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={d} transform={transform} />
          </clipPath>
        </defs>
      </svg>
      <ImageContainer
        src={src}
        alt={alt}
        className="h-full w-full"
        style={{ clipPath: `url(#${clipId})` }}
      />
    </div>
  );
}
