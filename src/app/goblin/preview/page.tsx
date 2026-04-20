import Link from 'next/link';
import { GOBLIN_REGISTRY, VALID_TYPES } from '@/entities/goblin/model/registry';
import { GoblinAvatar } from '@/shared/ui/goblin-avatar';

export default function GoblinPreviewDashboard() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-serif">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-red-900/30">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">⚔️</span>
            <span className="font-black text-lg tracking-tight">G-MBTI</span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/goblin/quiz" className="text-neutral-400 hover:text-red-400 transition-colors">靈魂審判</Link>
            <Link href="/goblin/preview" className="text-red-400 font-bold">哥布林圖鑑</Link>
          </div>
        </div>
      </nav>

      {/* ── Header ── */}
      <header className="max-w-5xl mx-auto px-4 pt-8 sm:pt-12 pb-6 sm:pb-8">
        <div className="inline-block bg-red-950/60 border border-red-900/40 rounded-full px-4 py-1 text-xs text-red-400 tracking-widest uppercase mb-4">
          全 {VALID_TYPES.length} 種通緝犯
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-3">戀愛廢物圖鑑</h1>
        <p className="text-neutral-500 text-sm">以下每一隻都是社會的損失。覺得都不像自己？那大概是每個都有點像。</p>
      </header>

      {/* ── Goblin Grid ── */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VALID_TYPES.map((type) => {
            const data = GOBLIN_REGISTRY[type];
            return (
              <Link
                key={type}
                href={`/goblin/result/${type.toLowerCase()}`}
                className="group flex gap-4 items-center p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-red-800/60 transition-all hover:bg-neutral-900"
              >
                {/* Avatar */}
                <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-neutral-800 border border-neutral-700">
                  <GoblinAvatar
                    type={type}
                    alt={data.name}
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black text-red-600 tracking-wider">{type}</span>
                    <span className="text-xs text-neutral-600">|</span>
                    <span className="text-xs text-neutral-500">{data.rank}</span>
                  </div>
                  <h3 className="font-bold text-base group-hover:text-red-400 transition-colors truncate">{data.name}</h3>
                  <p className="text-xs text-neutral-500 truncate">{data.tag}</p>
                </div>
                {/* Arrow */}
                <span className="text-neutral-700 group-hover:text-red-600 transition-colors shrink-0">⚔️</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-neutral-800">
        <div className="max-w-5xl mx-auto px-4 py-12 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl">⚔️</span>
            <span className="font-black text-lg tracking-tight">G-MBTI 戀愛地下城</span>
          </div>
          <div className="flex items-center justify-center gap-6 text-sm text-neutral-500">
            <Link href="/goblin/quiz" className="hover:text-red-400 transition-colors">靈魂審判</Link>
            <Link href="/goblin/preview" className="hover:text-red-400 transition-colors">哥布林圖鑑</Link>
          </div>
          <p className="text-xs text-neutral-700">© 2026 G-MBTI · 僅供娛樂，但說的都是真的</p>
        </div>
      </footer>
    </div>
  );
}
