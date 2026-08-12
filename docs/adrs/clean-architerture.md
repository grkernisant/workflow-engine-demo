PROJECT/
├── docs/
│   ├── adrs/                  <-- Architecture Decision Records
├── src/
│   ├── api/                   <-- Data Interface Layer
│   ├── components/            <-- Core App components (.tsx)
│   ├── types/                 <-- Core App types and interfaces (.ts)
│   │   ├── aaa.ts
│   │   └── bbb.ts
│   ├── utils/                 <-- utility methods
│   ├── features/              <-- Business Logic by Domain (no external dependencies)
│   │   └── workflows/         <-- Core state management
│   ├── examples/
│   │   └── supplierOnboarding.ts <-- Pre-configured workflow model
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── tsconfig.json