import Link from 'next/link';

const GOBLIN_LIST = [
  { id: 'ISFP', name: '孤穴哥布林 (母單)' },
  { id: 'ENTP', name: '幻影哥布林 (渣男)' },
  { id: 'ESTJ', name: '幼雛哥布林 (媽寶)' },
  { id: 'ISTJ', name: '鐵算哥布林 (小氣)' },
  { id: 'ESFP', name: '偽冠哥布林 (公主病)' },
  { id: 'ENTJ', name: '沼澤哥布林 (海王)' },
  { id: 'ENFJ', name: '營火哥布林 (暖男)' },
  { id: 'INTP', name: '鈍鐵哥布林 (鋼鐵直)' },
  { id: 'INTJ', name: '狂張哥布林 (普信)' },
  { id: 'INFP', name: '工兵哥布林 (舔狗)' },
  { id: 'ISTP', name: '寄生哥布林 (軟飯)' },
  { id: 'INFJ', name: '擬態哥布林 (綠茶)' },
  { id: 'ENFP', name: '焚心哥布林 (戀愛腦)' },
  { id: 'ESFJ', name: '海妖哥布林 (海后)' },
  { id: 'ESTP', name: '鑠金哥布林 (拜金)' },
  { id: 'ISFJ', name: '馱負哥布林 (扶弟魔)' },
];

export default function GoblinPreviewDashboard() {
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 p-8 font-serif">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b-4 border-red-900 pb-4">
          <h1 className="text-4xl font-black italic tracking-tighter">LOVERS DUNGEON: 戀愛廢物檔案室</h1>
          <p className="text-neutral-400 mt-2 uppercase tracking-widest text-sm">以下每一隻都是社會的損失。如果你覺得都不像自己，那大概是每個都有點像。</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {GOBLIN_LIST.map((goblin) => (
            <Link 
              key={goblin.id} 
              href={`/goblin/result/${goblin.id}`}
              className="group relative p-6 bg-neutral-800 border-l-4 border-neutral-700 hover:border-red-600 transition-all hover:translate-x-2"
            >
              <span className="text-xs font-bold text-neutral-500 block mb-1">{goblin.id}</span>
              <h3 className="text-xl font-bold group-hover:text-red-500 transition-colors">{goblin.name}</h3>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-2xl">⚔️</span>
              </div>
            </Link>
          ))}
        </div>

        <footer className="mt-16 pt-8 border-t border-neutral-800 text-xs text-neutral-600">
          <p>CLASSIFIED: PROJECT GOBLIN V1.2.0 | 你的感情就是這麼廉價</p>
        </footer>
      </div>
    </div>
  );
}
