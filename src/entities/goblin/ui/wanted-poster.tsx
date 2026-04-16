'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { GOBLIN_REGISTRY, type GoblinType } from '../model/registry';

export type { GoblinType } from '../model/registry';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const SHARE_PATH = '/goblin/result/';

const getShareText = (name: string) =>
  `⚔️ 我在戀愛地下城被通緝了！\n我的真實身份是「${name}」\n你也敢來測嗎？還是心虛不敢面對自己有多廢？🔥`;

export const WantedPoster: React.FC<{ type: GoblinType }> = ({ type }) => {
  const data = GOBLIN_REGISTRY[type];
  const typeLower = type.toLowerCase();
  const resultUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${basePath}${SHARE_PATH}${typeLower}`
    : `${basePath}${SHARE_PATH}${typeLower}`;
  const [imgSrc, setImgSrc] = useState(`${basePath}/assets/goblins/${typeLower}.png`);
  const [imgError, setImgError] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);

  const handleImageError = () => {
    if (imgSrc.endsWith('.png')) {
      setImgSrc(`${basePath}/assets/goblins/${typeLower}.svg`);
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
      
      {/* Share Button — 圖片下載 */}
      <button 
        onClick={handleShare}
        disabled={sharing}
        className="mt-8 px-12 py-3 bg-red-900 text-white font-bold tracking-widest uppercase hover:bg-red-800 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-wait"
      >
        {sharing ? '生成通緝令中...' : '📸 下載通緝令圖片'}
      </button>

      {/* Social Share Buttons */}
      <div className="mt-4 flex flex-col items-center gap-3 w-full max-w-md">
        <p className="text-neutral-500 text-xs uppercase tracking-widest">分享到社群，讓大家知道你有多廢</p>
        <div className="flex gap-3">
          {/* LINE */}
          <button
            onClick={() => window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(resultUrl)}&text=${encodeURIComponent(getShareText(data.name))}`, '_blank')}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#06C755] text-white text-sm font-bold rounded hover:brightness-110 transition-all cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
            LINE
          </button>
          {/* Facebook */}
          <button
            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(resultUrl)}&quote=${encodeURIComponent(getShareText(data.name))}`, '_blank')}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1877F2] text-white text-sm font-bold rounded hover:brightness-110 transition-all cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            FB
          </button>
          {/* X (Twitter) */}
          <button
            onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText(data.name))}&url=${encodeURIComponent(resultUrl)}`, '_blank')}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#000000] text-white text-sm font-bold rounded hover:brightness-150 transition-all border border-neutral-700 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            X
          </button>
          {/* Copy Link */}
          <button
            onClick={() => {
              const text = `${getShareText(data.name)}\n${resultUrl}`;
              navigator.clipboard.writeText(text).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              });
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-neutral-800 text-white text-sm font-bold rounded hover:bg-neutral-700 transition-all border border-neutral-600 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
            {copied ? '已複製！' : '複製'}
          </button>
        </div>
      </div>

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
