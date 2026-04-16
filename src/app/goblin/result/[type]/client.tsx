'use client';

import { useEffect, useState } from 'react';
import { WantedPoster, GoblinType } from '@/entities/goblin/ui/wanted-poster';
import { playStampSound, playPaperSound } from '@/shared/lib/sounds';

export function GoblinResultClient({ type }: { type: GoblinType }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    playPaperSound();
    const timer = setTimeout(() => {
      playStampSound();
      setRevealed(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className={`min-h-screen bg-black transition-opacity duration-700 ${
        revealed ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <WantedPoster type={type} />
    </main>
  );
}
