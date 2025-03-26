import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  fallbackSrc = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80',
}: ImageWithFallbackProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <>
      {isLoading && (
        <div className={className}>
          <Skeleton className="h-full w-full" baseColor="#1A1A1A" highlightColor="#2A2A2A" />
        </div>
      )}
      <img
        src={error ? fallbackSrc : src}
        alt={alt}
        className={`${className} ${isLoading ? 'hidden' : ''}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
      />
    </>
  );
}