# 🛡️ Project GOBLIN: G-MBTI 戀愛地下城

本專案是一個結合了 **MBTI 性格分析**、**台灣自嘲哥布林文化** 與 **《哥布林殺手》暗黑美學** 的心理測驗產品。透過 20 題靈魂審判，判定使用者屬於哪一種「變異哥布林」。

---

## 🚀 快速啟動 (Quick Start)

### 1. 安裝環境需求
- **Node.js**: v20.x or higher
- **pnpm**: v8.x or higher

### 2. 初始化專案
```bash
# 安裝所有相依套件
pnpm install

# (選用) 初始化 AI UI 生成工具
npm install -g uipro-cli
uipro init --ai gemini
```

### 3. 啟動開發伺服器
```bash
pnpm dev
```
啟動後造訪：`http://localhost:3000/goblin/quiz`

---

## 🗺️ 地城地圖 (Project Routes)

| 路由路徑 | 功能說明 |
| :--- | :--- |
| `/goblin/quiz` | **靈魂審判入口**：20 題隨機化心理測驗 (Pure Frontend) |
| `/goblin/preview` | **地城大廳**：所有 16 種哥布林通緝令預覽 |
| `/goblin/result/[TYPE]` | **通緝令結果頁面**：針對特定 MBTI 的 9:16 分享圖卡 |

---

## 🎨 視覺與資產規範 (Visual Specs)

### 1. 圖片存放與命名
- **路徑**: `public/assets/goblins/`
- **格式**: `.png` (確保透明背景支援)
- **命名**: `[mbti_小寫].png` (例如：`isfp.png`, `entp.png`)

### 2. 視覺風格
- **主題**: Dark Fantasy Anime (Goblin Slayer Style)
- **比例**: 9:16 (手機全螢幕優化，適合 IG/Threads 分享)
- **調色盤**: 深紅 (#991b1b), 炭黑 (#0a0a0a), 仿古羊皮紙 (#e3d5b8)

---

## ⚔️ 技術核心 (Tech Core)

- **框架**: Next.js 14 (App Router)
- **樣式**: Tailwind CSS
- **架構**: FSD (Feature-Sliced Design) Light
- **隱私**: **零數據上傳**。所有的計分與判定皆在瀏覽器端（Client-side）透過 `use-goblin-quiz.ts` 進行純前端計算。

---

## 📜 文件索引 (Documentation)
- **[完整產品規格書 (PRD)](docs/PRD_G-MBTI_Dungeon.md)**
- **[測驗題目與計分腳本](docs/QUIZ_G-MBTI_Script.md)**

---

## 🛠️ 開發與維護
如果您需要調整測驗內容或視覺細節，請修改：
- **測驗題目**: `src/features/goblin-quiz/model/use-goblin-quiz.ts`
- **通緝令 UI**: `src/entities/goblin/ui/wanted-poster.tsx`
