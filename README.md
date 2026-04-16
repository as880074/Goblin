# Goblin

Pet-friendly venue discovery platform scaffolded with Next.js (App Router), TypeScript, Tailwind CSS, and FSD-light architecture.

## Suggested project structure

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
├── entities/
│   ├── comment/
│   │   ├── api/
│   │   └── ui/
│   ├── user/
│   │   ├── api/
│   │   └── ui/
│   └── venue/
│       ├── api/
│       └── ui/
├── shared/
│   ├── api/
│   ├── hooks/
│   ├── lib/
│   │   ├── mobile/
│   │   └── seo/
│   ├── types/
│   └── ui/
└── widgets/
    ├── profile-section/
    │   └── ui/
    └── venue-detail/
        └── ui/

styles/
├── colors.ts
├── shadows.ts
├── spacing.ts
└── typography.ts
```
