'use client';

import { useState } from 'react';
import Image from 'next/image';

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
  const [src, setSrc] = useState(`/assets/goblins/${typeLower}.png`);
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
          setSrc(`/assets/goblins/${typeLower}.svg`);
        } else {
          setError(true);
        }
      }}
    />
  );
}
