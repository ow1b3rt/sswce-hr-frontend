'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
export default function SafeImage({
  src,
  alt,
  fallbackSrc = '/images/main-logo.png',
  width,
  height,
  fill = false,
  sizes,
  priority = false,
  quality = 75,
  objectFit = 'cover', // "cover" | "contain" | "fill" | "none" | "scale-down"
  rounded = false, // true | "sm" | "md" | "lg" | "full" | custom className handled below
  className = '',
  containerClassName = '',
  showSkeleton = true,
  skeletonClassName = '',
  onLoadComplete,
  onError,
  unoptimized = false,
  ...rest
}) {
  const isValidSrc = typeof src === 'string' && src.trim().length > 0;

  const [currentSrc, setCurrentSrc] = useState(isValidSrc ? src : fallbackSrc);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrored, setHasErrored] = useState(false);
  useEffect(() => {
    const nextIsValid = typeof src === 'string' && src.trim().length > 0;
    setCurrentSrc(nextIsValid ? src : fallbackSrc);
    setHasErrored(false);
    setIsLoading(true);
  }, [src, fallbackSrc]);

  const handleError = (event) => {
    if (!hasErrored) {
      setHasErrored(true);
      setCurrentSrc(fallbackSrc);
    }
    setIsLoading(false);
    onError?.(event);
  };

  const handleLoadingComplete = (result) => {
    setIsLoading(false);
    onLoadComplete?.(result);
  };

  const roundedClass =
    rounded === true
      ? 'rounded-md'
      : typeof rounded === 'string'
        ? `rounded-${rounded}`
        : '';

  const objectFitClass =
    {
      cover: 'object-cover',
      contain: 'object-contain',
      fill: 'object-fill',
      none: 'object-none',
      'scale-down': 'object-scale-down',
    }[objectFit] || '';

  return (
    <div
      className={`relative overflow-hidden ${
        fill ? 'h-full w-full' : ''
      } ${roundedClass} ${containerClassName}`}
    >
      {showSkeleton && isLoading && (
        <div
          className={`absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700 ${roundedClass} ${skeletonClassName}`}
          aria-hidden="true"
        />
      )}

      <Image
        src={currentSrc}
        alt={alt || ''}
        {...(fill
          ? { fill: true }
          : { width: width || 100, height: height || 100 })}
        sizes={sizes}
        priority={priority}
        quality={quality}
        unoptimized={unoptimized || hasErrored}
        onError={handleError}
        onLoadingComplete={handleLoadingComplete}
        className={`${objectFitClass} ${roundedClass} ${className} ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } transition-opacity duration-300`}
        {...rest}
      />
    </div>
  );
}
