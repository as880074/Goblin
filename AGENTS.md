# Goblin — AI Agent Instructions

一個以 **Feature-Sliced Design (FSD)** 架構建置的 Next.js 心理測驗應用。  
產品背景請參閱 [docs/PRD_G-MBTI_Dungeon.md](docs/PRD_G-MBTI_Dungeon.md)，測驗題目腳本見 [docs/QUIZ_G-MBTI_Script.md](docs/QUIZ_G-MBTI_Script.md)。

---

## 常用指令

```bash
pnpm dev        # 開發伺服器，預設 http://localhost:3000
pnpm build      # 生產建置（CI 以此驗證）
pnpm lint       # ESLint 檢查
```

---

## 架構：Feature-Sliced Design

嚴格遵守 FSD 層級，**禁止上層引用下層以外的跨層引用**。

| 層級 | 路徑 | 職責 |
|------|------|------|
| `app/` | `src/app/` | Next.js App Router、API routes、全域 layout/providers |
| `widgets/` | `src/widgets/` | 頁面級組合元件（組合 entities + features） |
| `features/` | `src/features/` | 單一使用者操作（e.g. goblin-quiz） |
| `entities/` | `src/entities/` | 業務領域（comment / goblin / user / venue），各含 `api/` 與 `ui/` |
| `shared/` | `src/shared/` | 無業務邏輯的通用工具（api client、hooks、lib、types、ui） |

每個 slice 以 `index.ts` 作為公開 API（barrel export）；**不跨 slice 直接引用內部路徑**。

---

## 關鍵慣例

### API 請求
使用 `shared/api/client.ts` 的泛型 `apiRequest<T>()` — 自動處理 JSON/FormData、拋出 `ApiError`：
```ts
import { apiRequest } from "@/shared/api/client";
const data = await apiRequest<MyType>("/api/...");
```

### 環境變數
透過 `getBaseUrl()` 取得 base URL，**不直接讀取** `process.env.NEXT_PUBLIC_APP_URL`：
```ts
import { getBaseUrl } from "@/shared/lib/env";
```

### ClassName 合併
統一使用 `cn()`（`shared/lib/cn.ts`）合併 Tailwind class，禁止手動字串拼接。

### 設計 Token
顏色、間距、排版、陰影定義在 `styles/` 目錄，並透過 `tailwind.config.ts` 注入主題。  
新增樣式值請先確認 `styles/colors.ts`、`styles/spacing.ts`、`styles/typography.ts` 是否已有對應 token。

---

## 路由一覽

| 路由 | 說明 |
|------|------|
| `/` | 寵物友善場地首頁（Server Component，`force-dynamic`） |
| `/goblin/quiz` | MBTI 測驗主頁（純前端，含亂序題目） |
| `/goblin/preview` | 16 型哥布林通緝令預覽 |
| `/goblin/result/[type]` | 測驗結果分享頁（`type` 為小寫 MBTI，如 `isfp`） |

---

## 已知注意事項

- **API 為 mock 資料** — `src/app/api/` 下的 routes 回傳硬編碼數據，生產環境需串接真實資料源。
- **RSC + Client 邊界** — `app/layout.tsx` 透過 `Providers` 提供 React Query Client；`page.tsx` 為 async Server Component，資料只能由 server side fetch 或 client query 取得，不可混用。
- **測驗進度不持久** — `useGoblinQuiz` hook 無 persistence；頁面重整會遺失作答進度，這是設計決策。
- **哥布林圖片命名** — 須放置於 `public/assets/goblins/[mbti小寫].png`，例如 `isfp.png`。
