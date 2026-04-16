'use client';

import { useState } from 'react';
import Image from 'next/image';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function GoblinAvatar({
  type,
  alt,
  className = '',
  sizes = '80px',
}: {
  type: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  const typeLower = type.toLowerCase();
  const [src, setSrc] = useState(`${basePath}/assets/goblins/${typeLower}.png`);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center text-neutral-600 text-xs font-bold">
        {alt.charAt(0)}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      onError={() => {
        if (src.endsWith('.png')) {
          setSrc(`${basePath}/assets/goblins/${typeLower}.svg`);
        } else {
          setError(true);
        }
      }}
    />
  );
}
