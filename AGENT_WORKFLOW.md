# AI Agent Workflow Log

## Agents Used
- GitHub Copilot (inline)
- ChatGPT (planning, scaffolding, fixes)
- VS Code (Codespaces) terminals

## Prompts & Outputs
- Example 1 (Scaffold): “Create Express + Prisma backend with hexagonal ports/adapters…”  
  *Output:* initial folder tree, server skeleton.
- Example 2 (Fix): “Prisma client not initializing”  
  *Output:* identify wrong generator + custom output, fix to `prisma-client-js`, regenerate.

## Validation / Corrections
- Verified Prisma models via `node -e "const { Prisma } = require('@prisma/client'); console.log(Prisma.ModelName)"`.
- cURL-tested each endpoint (Routes, Comparison, CB, Banking, Pooling).
- Frontend verified via Vite + Recharts + API calls.

## Observations
- Saved time generating boilerplate & quick fixes (tsconfig, prisma).
- Hallucinations avoided by pasting exact file paths & running one-liner commands.
- Combining Copilot inline + ChatGPT for architecture & debugging was most effective.

## Best Practices Followed
- Hexagonal separation (core/application/ports ↔ adapters).
- Strong typing and Zod validation at HTTP boundary.
- Prisma migrations + seed; environment in `.env`.
