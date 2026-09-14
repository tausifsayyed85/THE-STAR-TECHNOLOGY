import React, { useState } from 'react';

interface SkeletonProps {
  className?: string;
  rounded?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  rounded = 'rounded-xl',
}) => {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden bg-slate-200/80 ${rounded} ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/70 to-transparent" />
    </div>
  );
};

interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  imageClassName?: string;
  aspectRatio?: string;
  alt: string;
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  containerClassName = '',
  imageClassName = '',
  aspectRatio = 'aspect-[16/10]',
  onError,
  onLoad,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${containerClassName}`}>
      {/* Skeleton placeholder shown while loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-10">
          <Skeleton className="w-full h-full rounded-none" />
        </div>
      )}

      {/* Actual Image with smooth fade-in */}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={(e) => {
          setIsLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          setHasError(true);
          onError?.(e);
        }}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${imageClassName}`}
        {...rest}
      />
    </div>
  );
};

export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl bg-white p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
      <div>
        {/* Image Skeleton */}
        <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-5">
          <Skeleton className="w-full h-full rounded-xl" />
          <div className="absolute top-3 left-3">
            <Skeleton className="w-24 h-6 rounded-full" />
          </div>
        </div>

        {/* Category Pill Skeleton */}
        <Skeleton className="w-20 h-4 rounded-md mb-2" />

        {/* Title Skeleton */}
        <Skeleton className="w-3/4 h-6 rounded-lg mb-2" />

        {/* Short description Skeleton */}
        <Skeleton className="w-full h-3.5 rounded-md mb-1.5" />
        <Skeleton className="w-4/5 h-3.5 rounded-md mb-5" />
      </div>

      {/* Footer / Meta Skeleton */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <Skeleton className="w-28 h-4 rounded-md" />
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
    </div>
  );
};

export const BlogCardSkeleton: React.FC = () => {
  return (
    <div className="bg-slate-50/70 rounded-3xl p-7 border border-slate-200 flex flex-col justify-between shadow-xs">
      <div>
        {/* Meta row */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
          <Skeleton className="w-24 h-5 rounded-md" />
          <Skeleton className="w-16 h-4 rounded-md" />
        </div>

        {/* Title Skeleton */}
        <Skeleton className="w-full h-6 rounded-lg mb-2" />
        <Skeleton className="w-2/3 h-6 rounded-lg mb-4" />

        {/* Summary 3 lines */}
        <Skeleton className="w-full h-3.5 rounded-md mb-2" />
        <Skeleton className="w-full h-3.5 rounded-md mb-2" />
        <Skeleton className="w-3/4 h-3.5 rounded-md mb-6" />
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
        <Skeleton className="w-20 h-4 rounded-md" />
        <Skeleton className="w-24 h-4 rounded-md" />
      </div>
    </div>
  );
};

export const MetricCardSkeleton: React.FC = () => {
  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3.5">
      <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
      <div className="flex-1">
        <Skeleton className="w-14 h-5 rounded-md mb-1" />
        <Skeleton className="w-24 h-3.5 rounded-md" />
      </div>
    </div>
  );
};
