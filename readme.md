# FuelEU Maritime — Compliance Module (Full-Stack)

React + TypeScript + Tailwind (frontend)  
Node.js + TypeScript + Express + Prisma + PostgreSQL (backend)  
Hexagonal architecture (core ↔ ports ↔ adapters)

## Features
- Routes tab: list/filter seed routes; set baseline.
- Compare tab: baseline vs others, % diff, target 89.3368 gCO₂e/MJ, chart.
- Banking (Art. 20): compute CB, bank surplus, apply to deficit; KPIs.
- Pooling (Art. 21): greedy allocation, no member exits worse/negative; sum ≥ 0.

## Run (dev)
### Backend
```bash
cd backend
cp .env.example .env # or ensure DATABASE_URL + PORT=4000 exist
npm i
docker compose up -d   # Postgres
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
