"use client";

import Image from "next/image";
import { useState } from "react";

type TravelImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  preload?: boolean;
  className?: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackClassName?: string;
} & (
  | { fill: true; width?: never; height?: never }
  | { fill?: false; width: number; height: number }
);

export default function TravelImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes,
  preload = false,
  className = "",
  fallbackTitle = "여행의 다음 장면을 준비합니다",
  fallbackDescription,
  fallbackClassName = "bg-slate-100",
}: TravelImageProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null);

  if (!src.trim() || failedSource === src) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={!fill && width && height ? { aspectRatio: `${width} / ${height}` } : undefined}
        className={`${fill ? "absolute inset-0" : "w-full"} flex items-center justify-center p-6 text-center ${fallbackClassName} ${className}`}
      >
        <div>
          {fallbackTitle ? <p className="text-base font-bold text-slate-800">{fallbackTitle}</p> : null}
          {fallbackDescription ? (
            <p className="mt-2 text-sm leading-6 text-slate-600">{fallbackDescription}</p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      {...(fill ? { fill: true } : { width, height })}
      sizes={sizes}
      preload={preload}
      className={className}
      onError={() => setFailedSource(src)}
    />
  );
}
