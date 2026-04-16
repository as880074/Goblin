'use client';

import React from 'react';
import { useGoblinQuiz } from '@/features/goblin-quiz/model/use-goblin-quiz';

export default function GoblinQuizPage() {
  const { currentQuestion, totalQuestions, currentIndex, handleAnswer, progress, isLoading } = useGoblinQuiz();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-red-800 font-black animate-pulse tracking-widest uppercase">
          Initializing Dungeon...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-serif">
      {/* Header / Progress */}
      <header className="p-6 border-b border-red-900/30">
        <div className="max-w-xl mx-auto flex justify-between items-end mb-2">
          <span className="text-xs font-black tracking-widest text-red-700 uppercase">Lovers Dungeon / 靈魂剝皮室</span>
          <span className="text-xl font-black italic text-red-600">{currentIndex + 1} / {totalQuestions}</span>
        </div>
        <div className="max-w-xl mx-auto h-1.5 bg-neutral-900 overflow-hidden">
          <div 
            className="h-full bg-red-800 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Main Quiz Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-xl mx-auto w-full">
        {currentQuestion.scenario && (
          <div className="mb-8 p-4 bg-red-950/20 border-l-2 border-red-800 text-neutral-400 text-sm italic">
            {currentQuestion.scenario}
          </div>
        )}

        <h2 className="text-2xl md:text-3xl font-bold mb-12 leading-snug tracking-tight text-center">
          {currentQuestion.text}
        </h2>

        <div className="w-full space-y-4">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option.type)}
              className="w-full group relative p-6 bg-neutral-900 border border-neutral-800 hover:border-red-700 transition-all active:scale-[0.98]"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-neutral-800 group-hover:bg-red-700 transition-colors" />
              <div className="flex items-center">
                <span className="text-xs font-black text-neutral-600 mr-4 group-hover:text-red-600 transition-colors">
                  OPT_{idx + 1}
                </span>
                <span className="text-lg font-medium text-left">
                  {option.text}
                </span>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Footer Decoration */}
      <footer className="p-12 text-center opacity-20">
        <div className="text-[10px] tracking-[0.5em] uppercase font-black">
          遇到這點事就開始 emo，你是來搞笑的嗎？
        </div>
      </footer>

      {/* Background Distressing */}
      <div className="fixed inset-0 pointer-events-none opacity-5 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/p6-dark.png')]" />
    </div>
  );
}
