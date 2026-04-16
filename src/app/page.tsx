import Link from "next/link";
import { GOBLIN_REGISTRY, VALID_TYPES } from "@/entities/goblin/model/registry";
import { GoblinAvatar } from "@/shared/ui/goblin-avatar";

const FAQ_ITEMS = [
  { q: "G-MBTI 是什麼？又一個無聊測驗？", a: "別把它跟你在社群上轉的那些垃圾心理測驗搞混。G-MBTI 是戀愛地下城專屬的靈魂剝皮系統——用 16 種哥布林人格，把你在感情裡有多廢直接攤在陽光下。沒有正確答案，只有你不敢面對的真相。" },
  { q: "測驗要多久？我很忙欸。", a: "20 題，3 到 5 分鐘。比你花在已讀不回上面的時間短多了。題目每次隨機排列，別想背答案。" },
  { q: "我的資料會外洩嗎？", a: "放心，你的資料我們看都懶得看。全程瀏覽器前端運算，零上傳、零追蹤。你那點感情黑歷史，還不值得我們存。" },
  { q: "結果可以分享嗎？", a: "可以。系統會生成你的專屬通緝令海報，一鍵分享讓朋友知道你是什麼貨色。勇敢一點，還是說你連被嘲笑的勇氣都沒有？" },
  { q: "為什麼每次測出來不一樣？", a: "因為你這種人連自己是誰都搞不清楚，答案當然飄忽不定。題目順序會變，你的心境也在變——唯一不變的是你在感情裡的平庸。" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-serif">
      {/* ── Top Banner ── */}
      <div className="bg-red-900/90 text-center py-2.5 px-4 text-sm">
        <span className="inline-block bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider mr-2">NEW</span>
        <span className="text-red-100">16 張通緝令已解封——你的醜態即將公諸於世</span>
      </div>

      {/* ── Sticky Navbar ── */}
      <nav className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-red-900/30">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">⚔️</span>
            <span className="font-black text-lg tracking-tight">G-MBTI</span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/goblin/quiz" className="text-neutral-400 hover:text-red-400 transition-colors">靈魂審判</Link>
            <Link href="/goblin/preview" className="text-neutral-400 hover:text-red-400 transition-colors">哥布林圖鑑</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="max-w-5xl mx-auto px-4 pt-16 pb-20">
        <div className="rounded-2xl border border-red-900/30 bg-neutral-900/60 p-8 md:p-12">
          {/* Badge */}
          <div className="inline-block bg-red-950/60 border border-red-900/40 rounded-full px-4 py-1 text-xs text-red-400 tracking-widest uppercase mb-6">
            戀愛地下城 · 靈魂剝皮室
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
            <span className="text-red-500">G-MBTI</span> 哥布林人格審判<br className="hidden md:block" />
            <span className="text-neutral-400">— 你在愛情裡是什麼垃圾？</span>
          </h1>

          {/* Description */}
          <p className="text-lg text-neutral-400 max-w-2xl mb-10 leading-relaxed">
            20 道地城情境拷問，把你的戀愛黑歷史扒得一乾二淨。<br />
            別裝了，點進來就代表你心虛。測完不准哭。
          </p>

          {/* Two info cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            <div className="rounded-xl bg-neutral-800/50 border border-neutral-700/50 p-6">
              <h3 className="font-bold text-sm text-red-400 mb-3 uppercase tracking-wider">四大審判維度</h3>
              <ul className="space-y-2 text-sm text-neutral-300">
                <li className="flex items-start gap-2"><span className="text-red-700 mt-0.5">•</span>E / I — 到底是社交寄生蟲還是自閉穴居獸</li>
                <li className="flex items-start gap-2"><span className="text-red-700 mt-0.5">•</span>S / N — 活在現實還是腦補的童話裡</li>
                <li className="flex items-start gap-2"><span className="text-red-700 mt-0.5">•</span>T / F — 是冷血計算機還是動不動就 emo 的軟體</li>
                <li className="flex items-start gap-2"><span className="text-red-700 mt-0.5">•</span>J / P — 是控制狂還是爛到沒有明天</li>
              </ul>
            </div>
            <div className="rounded-xl bg-neutral-800/50 border border-neutral-700/50 p-6">
              <h3 className="font-bold text-sm text-red-400 mb-3 uppercase tracking-wider">審判須知</h3>
              <ul className="space-y-2 text-sm text-neutral-300">
                <li className="flex items-start gap-2"><span className="text-red-700 mt-0.5">•</span>20 題，3–5 分鐘。比你追的人回你訊息快</li>
                <li className="flex items-start gap-2"><span className="text-red-700 mt-0.5">•</span>題目隨機打亂，別想找攻略刷結果</li>
                <li className="flex items-start gap-2"><span className="text-red-700 mt-0.5">•</span>純前端運算，你的黑歷史不值得我們存</li>
                <li className="flex items-start gap-2"><span className="text-red-700 mt-0.5">•</span>附贈專屬通緝令，讓朋友看清你的真面目</li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/goblin/quiz"
            className="inline-block bg-red-800 hover:bg-red-700 text-white font-black text-lg px-10 py-4 rounded-xl tracking-widest uppercase transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
          >
            我不怕，開始審判
          </Link>
        </div>
      </section>

      {/* ── Goblin Gallery ── */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="flex items-baseline gap-3 mb-2">
          <Link href="/goblin/preview" className="group flex items-baseline gap-2">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">戀愛廢物圖鑑</h2>
            <span className="text-2xl text-neutral-600 group-hover:text-red-500 group-hover:translate-x-1 transition-all">→</span>
          </Link>
        </div>
        <p className="text-neutral-500 mb-8">共 {VALID_TYPES.length} 種哥布林。哪個是你？還是說你覺得自己不在裡面？</p>

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
                  <p className="text-xs text-neutral-500 truncate">{data.tag} — {data.skill}</p>
                </div>
                {/* Arrow */}
                <span className="text-neutral-700 group-hover:text-red-600 transition-colors shrink-0">⚔️</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-black tracking-tight mb-8">還在猶豫？看看這些廢話</h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <details key={i} className="group rounded-xl bg-neutral-900/60 border border-neutral-800">
              <summary className="flex items-center justify-between cursor-pointer p-5 text-base font-bold hover:text-red-400 transition-colors list-none [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="text-neutral-600 group-open:rotate-45 transition-transform text-xl ml-4 shrink-0">+</span>
              </summary>
              <div className="px-5 pb-5 text-sm text-neutral-400 leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
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
