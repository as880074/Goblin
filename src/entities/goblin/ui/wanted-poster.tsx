import React from 'react';
import Image from 'next/image';

export type GoblinType = 
  | 'ISFP' | 'ENTP' | 'ESTJ' | 'ISTJ' 
  | 'ESFP' | 'ENTJ' | 'ENFJ' | 'INTP' 
  | 'INTJ' | 'INFP' | 'ISTP' | 'INFJ' 
  | 'ENFP' | 'ESFJ' | 'ESTP' | 'ISFJ';

interface GoblinData {
  name: string;
  tag: string;
  rank: string;
  skill: string;
  description: string;
}

const GOBLIN_REGISTRY: Record<GoblinType, GoblinData> = {
  ISFP: { name: '孤穴哥布林', tag: '母單 / 單身狗', rank: 'Rank E (敗犬)', skill: '防禦護盾 (物理隔離)', description: '從未與異性組隊，對精靈抱有過度幻覺，臨場會掉落武器。' },
  ENTP: { name: '幻影哥布林', tag: '渣屬性 / 逃避責任', rank: 'Rank A (極危)', skill: '隱身術 (消失)', description: '擅長甜言密語幻術，遇責任立刻隱身，留下一地爛攤子。' },
  ESTJ: { name: '幼雛哥布林', tag: '媽寶 / 依賴母親', rank: 'Rank D (平庸)', skill: '母系召喚 (叫媽來)', description: '帶著長老護身符，凡事回報通訊水晶。無法獨立決策。' },
  ISTJ: { name: '鐵算哥布林', tag: '小氣男 / 極致計較', rank: 'Rank C (固執)', skill: '精算打擊 (AA制)', description: '計較銅幣到小數點。幫隊友擋刀會記錄在案要求報償。' },
  ESFP: { name: '偽冠哥布林', tag: '公主、王子病', rank: 'Rank S (暴虐)', skill: '尖叫衝擊 (情緒勒索)', description: '自認王族，要求隊友搬運，打怪不出力只分戰利品。' },
  ENTJ: { name: '沼澤哥布林', tag: '海王 / 多線發展', rank: 'Rank S (隱蔽)', skill: '時間管理 (多線作戰)', description: '多線發展，地道四通八達。曖昧關係極多，抓不住把柄。' },
  ENFJ: { name: '營火哥布林', tag: '中央空調 / 暖男', rank: 'Rank B (過熱)', skill: '群體發熱 (無效社交)', description: '無差別發熱，無邊界感。經常導致伴侶因其火星自燃。' },
  INTP: { name: '鈍鐵哥布林', tag: '鋼鐵直男 / 務實', rank: 'Rank C (無感)', skill: '多喝熱水 (低階治癒)', description: '物理防禦點滿，魔法（暗示）免疫。只會說「多喝生命泉水」。' },
  INTJ: { name: '狂張哥布林', tag: '普信 / 喜歡說教', rank: 'Rank B (自負)', skill: '戰術說教 (Mansplaining)', description: 'Lv.1 戰力卻有 Lv.99 傲慢。最愛指導高階法師施放火球。' },
  INFP: { name: '工兵哥布林', tag: '舔狗 / 自我感動', rank: 'Rank F (崩潰)', skill: '自我感動 (燃燒金幣)', description: '自我感動，將鑽石奉獻給不看牠一眼的精靈。被踩踏仍覺幸福。' },
  ISTP: { name: '寄生哥布林', tag: '軟飯 / 缺乏自主', rank: 'Rank D (汲取)', skill: '金幣吸取 (寄生)', description: '喪失狩獵能力，專門吸附強者。宿主破產立刻切換目標。' },
  INFJ: { name: '擬態哥布林', tag: '綠茶 / 心機', rank: 'Rank A (隱晦)', skill: '無辜眼神 (挑撥)', description: '偽裝無害，擅長在強者面前假裝跌倒並挑撥離間。' },
  ENFP: { name: '焚心哥布林', tag: '戀愛腦 / 盲目', rank: 'Rank B (狂暴)', skill: '盲目衝鋒 (暈船)', description: '鎖定對象即狂暴化，無視陷阱與防禦。被賣掉也甘之如飴。' },
  ESFJ: { name: '誘鳴哥布林', tag: '海后 / 養備胎', rank: 'Rank S (支配)', skill: '糖果誘惑 (備胎管理)', description: '發出聲波吸引奉獻者勞動，只給廉價糖果不給承諾。' },
  ESTP: { name: '鑠金哥布林', tag: '拜金 / 裝備鑑定', rank: 'Rank A (貪婪)', skill: '課金感應 (鑑定)', description: '眼帶裝備鑑定術。只跟傳說套裝組隊，對方破產立刻回城。' },
  ISFJ: { name: '馱負哥布林', tag: '扶弟魔 / 家庭負擔', rank: 'Rank C (沉重)', skill: '連夜搬運 (資源轉移)', description: '將隊伍資源連夜搬回新手村送給廢物弟弟。' },
};

export const WantedPoster: React.FC<{ type: GoblinType }> = ({ type }) => {
  const data = GOBLIN_REGISTRY[type];
  const imageUrl = `/assets/goblins/${type.toLowerCase()}.png`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 p-4 font-serif">
      {/* 9:16 Poster Canvas */}
      <div className="relative aspect-[9/16] w-full max-w-md bg-[#e3d5b8] shadow-[20px_20px_60px_rgba(0,0,0,0.8)] border-[12px] border-[#3d2b1f] overflow-hidden group">
        
        {/* Parchment Texture Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/p6-dark.png')]" />
        
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
        <div className="relative mx-8 aspect-square border-4 border-[#3d2b1f] overflow-hidden bg-neutral-900 group-hover:scale-[1.02] transition-transform duration-500">
          <Image 
            src={imageUrl} 
            alt={data.name}
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]" />
        </div>

        {/* Poster Body */}
        <div className="px-8 mt-6 space-y-4 text-[#3d2b1f]">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest block opacity-70">Attribute / 屬性標籤</span>
            <p className="text-lg font-black leading-tight">{data.tag}</p>
          </div>

          <div>
            <span className="text-xs uppercase font-bold tracking-widest block opacity-70">Special Skill / 必殺技</span>
            <p className="text-lg font-bold italic">「{data.skill}」</p>
          </div>

          <div className="pt-2 border-t border-[#3d2b1f]/30">
            <p className="text-sm leading-relaxed font-medium">
              {data.description}
            </p>
          </div>
        </div>

        {/* Poster Footer */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Threat Level</span>
            <span className="text-4xl font-black text-red-900 drop-shadow-sm">{data.rank}</span>
          </div>
          
          <div className="text-right">
            <div className="w-16 h-16 bg-[#3d2b1f] flex items-center justify-center p-1 rounded-sm">
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
      
      {/* Share Button Placeholder */}
      <button className="mt-8 px-12 py-3 bg-red-900 text-white font-bold tracking-widest uppercase hover:bg-red-800 transition-colors shadow-lg">
        撤退並分享通緝令
      </button>
    </div>
  );
};
