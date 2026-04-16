'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { GOBLIN_REGISTRY, type GoblinType } from '../model/registry';

export type { GoblinType } from '../model/registry';

export const WantedPoster: React.FC<{ type: GoblinType }> = ({ type }) => {
  const data = GOBLIN_REGISTRY[type];
  const typeLower = type.toLowerCase();
  const [imgSrc, setImgSrc] = useState(`/assets/goblins/${typeLower}.png`);
  const [imgError, setImgError] = useState(false);
  const [sharing, setSharing] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);

  const handleImageError = () => {
    if (imgSrc.endsWith('.png')) {
      setImgSrc(`/assets/goblins/${typeLower}.svg`);
    } else {
      setImgError(true);
    }
  };

  const handleShare = useCallback(async () => {
    if (!posterRef.current || sharing) return;
    setSharing(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(posterRef.current, {
        scale: 2,
        backgroundColor: '#e3d5b8',
        useCORS: true,
        allowTaint: false,
        logging: false,
      });
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/png')
      );
      if (!blob) throw new Error('Failed to create image');
      const file = new File([blob], `goblin-${typeLower}.png`, { type: 'image/png' });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: `我的通緝令 — ${data.name}`,
          text: `我在戀愛地下城的真實身份是「${data.name}」。你敢測嗎？還是心虛不敢面對自己有多廢？ 🔥`,
          files: [file],
        });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `goblin-${typeLower}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      console.error('Share failed:', err);
      alert('截圖失敗，請長按海報手動儲存圖片');
    } finally {
      setSharing(false);
    }
  }, [sharing, data.name, typeLower]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 p-4 font-serif">
      {/* 9:16 Poster Canvas */}
      <div ref={posterRef} className="relative w-full max-w-md bg-[#e3d5b8] shadow-[20px_20px_60px_rgba(0,0,0,0.8)] border-[12px] border-[#3d2b1f] overflow-hidden group flex flex-col">
        
        {/* Parchment Texture Overlay (CSS-based, no external resource) */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#3d2b1f 0% 25%, transparent 0% 50%)', backgroundSize: '4px 4px' }} />
        
        {/* Poster Header */}
        <div className="pt-10 pb-4 text-center">
          <h1 className="text-6xl font-black text-[#3d2b1f] tracking-tighter uppercase leading-none italic">
            WANTED
          </h1>
          <div className="mt-2 h-1 w-3/4 mx-auto bg-[#3d2b1f]" />
          <p className="mt-2 text-xl font-bold text-[#3d2b1f] border-y border-[#3d2b1f] inline-block px-4">
            {data.name}
          </p>
        </div>

        {/* Image Section */}
        <div className="relative mx-8 aspect-square border-4 border-[#3d2b1f] overflow-hidden bg-[#171717] group-hover:scale-[1.02] transition-transform duration-500">
          {imgError ? (
            <div className="w-full h-full flex items-center justify-center text-[#737373] text-sm">
              {data.name}
            </div>
          ) : (
            <Image 
              src={imgSrc} 
              alt={data.name}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              onError={handleImageError}
            />
          )}
          <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]" />
        </div>

        {/* Poster Body */}
        <div className="px-8 mt-6 space-y-3 text-[#3d2b1f]">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest block opacity-70">Attribute / 屬性標籤</span>
            <p className="text-base font-black leading-tight">{data.tag}</p>
          </div>

          <div>
            <span className="text-xs uppercase font-bold tracking-widest block opacity-70">Special Skill / 必殺技</span>
            <p className="text-base font-bold italic">「{data.skill}」</p>
          </div>

          <div className="pt-2 border-t" style={{ borderColor: 'rgba(61,43,31,0.3)' }}>
            <p className="text-xs leading-relaxed font-medium">
              {data.description}
            </p>
          </div>
        </div>

        {/* Poster Footer */}
        <div className="px-8 pt-4 pb-8 mt-auto flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Threat Level</span>
            <span className="text-3xl font-black text-[#7f1d1d]" style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.05))' }}>{data.rank}</span>
          </div>
          
          <div className="text-right">
            <div className="w-14 h-14 bg-[#3d2b1f] flex items-center justify-center p-1 rounded-sm">
              <div className="w-full h-full border border-[#e3d5b8] flex items-center justify-center">
                <span className="text-[8px] text-[#e3d5b8] font-bold leading-none text-center">GOBLIN<br/>DNA</span>
              </div>
            </div>
            <p className="text-[8px] mt-1 font-bold opacity-50 uppercase tracking-tighter">LOVERS DUNGEON v1.2</p>
          </div>
        </div>

        {/* Distressing Effects */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.4)]" />
      </div>
      
      {/* Share Button */}
      <button 
        onClick={handleShare}
        disabled={sharing}
        className="mt-8 px-12 py-3 bg-red-900 text-white font-bold tracking-widest uppercase hover:bg-red-800 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-wait"
      >
        {sharing ? '生成通緝令中...' : '承認罪狀並分享通緝令'}
      </button>

      {/* Navigation */}
      <div className="mt-4 flex gap-4 text-sm">
        <a href="/goblin/quiz" className="text-neutral-400 hover:text-red-500 transition-colors underline underline-offset-4">
          不服？再測一次
        </a>
        <a href="/goblin/preview" className="text-neutral-400 hover:text-red-500 transition-colors underline underline-offset-4">
          看看其他廢物
        </a>
      </div>
    </div>
  );
};
