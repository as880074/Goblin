'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export interface Question {
  id: number;
  scenario?: string;
  text: string;
  options: {
    text: string;
    type: string; // E, I, S, N, T, F, J, P
  }[];
}

const RAW_QUESTIONS: Question[] = [
  // E vs I
  { id: 1, scenario: '當你在冒險者公會的酒館休息時...', text: '看到一群高等精靈在慶功，你的直覺反應是：', options: [{ text: '主動拿酒杯過去，試圖加入話題。', type: 'E' }, { text: '默默移動到角落，祈禱別被注意到。', type: 'I' }] },
  { id: 2, text: '你收到一個不知名的魔法卷軸（私訊），你會：', options: [{ text: '立刻回覆並開始興奮地交換情報。', type: 'E' }, { text: '思考三小時後還是決定當作沒看到。', type: 'I' }] },
  { id: 3, text: '經歷一整天慘烈戰鬥後，你如何恢復魔力？', options: [{ text: '跟隊友繼續續攤，在大笑中找回動力。', type: 'E' }, { text: '躲回安靜洞穴，一個人發呆或整理裝備。', type: 'I' }] },
  { id: 4, text: '當你在公會看板尋找任務（滑交友軟體）時：', options: [{ text: '只要不錯就立刻送出組隊請求。', type: 'E' }, { text: '仔細閱讀背景，猶豫再三才敢申請。', type: 'I' }] },
  { id: 5, text: '關於「孤獨」這件事，你的看法是：', options: [{ text: '慢性的毒素傷害，沒人刷怪毫無意義。', type: 'E' }, { text: '是我最好的防禦護盾，在人群中會掉血。', type: 'I' }] },
  // S vs N
  { id: 6, scenario: '關於你心目中的「命定隊友」...', text: '第一次與潛在隊友吃飯，你最在意的是：', options: [{ text: '點餐價格、AA制是否確實、CP值。', type: 'S' }, { text: '是否有心靈感應，以及對方是否完美。', type: 'N' }] },
  { id: 7, text: '當對方送你一個「守護墜飾」作為禮物，你首先想到：', options: [{ text: '材質是什麼？市場價值多少金幣？', type: 'S' }, { text: '這代表他想守護我一生嗎？(開始腦補)', type: 'N' }] },
  { id: 8, text: '你在地城入口遇到受傷的精靈，你會：', options: [{ text: '評估藥水成本與救人後的報酬。', type: 'S' }, { text: '感受到史詩冒險開端，認定自己是英雄。', type: 'N' }] },
  { id: 9, text: '關於未來，你的規劃通常是：', options: [{ text: '精確存款清單、保險規劃、明天有飯吃。', type: 'S' }, { text: '幻想屠龍成功，在城堡過著幸福生活。', type: 'N' }] },
  { id: 10, text: '你如何解讀對方的訊息（暗示）？', options: [{ text: '字面說什麼就是什麼，隱喻很頭痛。', type: 'S' }, { text: '推敲文字背後的魔力波動，解讀各種可能。', type: 'N' }] },
  // T vs F
  { id: 11, scenario: '當隊伍發生衝突或對方受傷時...', text: '隊友犯錯導致滅團，你的第一反應：', options: [{ text: '指出邏輯失誤，說明正確操作(說教)。', type: 'T' }, { text: '關心對方有沒有受驚嚇，給予安慰。', type: 'F' }] },
  { id: 12, text: '如果你需要拒絕一個不感興趣的組隊請求，你會：', options: [{ text: '直接列出雙方戰力不匹配的事實。', type: 'T' }, { text: '擔心傷害對方自尊，編造委婉藉口。', type: 'F' }] },
  { id: 13, text: '當你心情不好時，你希望對方施放什麼技能？', options: [{ text: '給予實質建議，分析現況並提供方案。', type: 'T' }, { text: '不需要方案，只需要陪我罵魔物。', type: 'F' }] },
  { id: 14, text: '在一段關係中，你認為最重要的是：', options: [{ text: '公平、互惠且符合邏輯的契約。', type: 'T' }, { text: '共鳴、和諧以及那份情緒價值。', type: 'F' }] },
  { id: 15, text: '當別人說你「很奇怪」時：', options: [{ text: '思考邏輯是否成立，並試圖辯論。', type: 'T' }, { text: '感到極度受挫，心碎一地想躲起來哭。', type: 'F' }] },
  // J vs P
  { id: 16, scenario: '關於冒險的規劃與執行...', text: '週末要去刷新的副本，你的風格是：', options: [{ text: '事前查好攻略、準備藥水、訂好時間。', type: 'J' }, { text: '到門口再說，看當當下心情決定。', type: 'P' }] },
  { id: 17, text: '關於你的冒險日誌（行事曆）：', options: [{ text: '條列式記錄行程，沒按計畫會焦慮。', type: 'J' }, { text: '雜亂無章，想起來才記一筆。', type: 'P' }] },
  { id: 18, text: '答應了邀請，但臨時有更強的獵物出現：', options: [{ text: '堅持原本承諾，誠信是基本。', type: 'J' }, { text: '可能會失約，因為更有趣的事發生了。', type: 'P' }] },
  { id: 19, text: '關於你的「老媽（長老）」對冒險的干預：', options: [{ text: '習慣詢問意見，讓長老決定防具。', type: 'J' }, { text: '追求自由，長老越反對我越想去闖。', type: 'P' }] },
  { id: 20, text: '你的房間（哥布林巢穴）通常是：', options: [{ text: '物品分類整齊，戰利品按顏色擺放。', type: 'J' }, { text: '像被巨龍踩過，亂中有序的藝術。', type: 'P' }] },
];

/**
 * Fisher-Yates Shuffle Algorithm
 */
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useGoblinQuiz = () => {
  const [questions] = useState<Question[]>(() => shuffleArray(RAW_QUESTIONS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const router = useRouter();

  const handleAnswer = (type: string) => {
    if (isFinished) return;

    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
      const result = calculateMBTI(newAnswers);
      // Pure Frontend: Calculate and Redirect
      router.push(`/goblin/result/${result.toLowerCase()}`);
    }
  };

  const calculateMBTI = (allAnswers: string[]) => {
    const counts: Record<string, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    allAnswers.forEach(type => { 
      if (type in counts) counts[type]++; 
    });

    const mbti = [
      counts.E >= counts.I ? 'E' : 'I',
      counts.S >= counts.N ? 'S' : 'N',
      counts.T >= counts.F ? 'T' : 'F',
      counts.J >= counts.P ? 'J' : 'P',
    ].join('');

    return mbti;
  };

  return {
    currentQuestion: questions[currentIndex],
    totalQuestions: questions.length,
    currentIndex,
    handleAnswer,
    progress: questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0,
    isLoading: questions.length === 0,
  };
};
