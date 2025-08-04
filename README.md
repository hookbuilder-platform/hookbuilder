# HookBuilder

No-code platform for building, testing, and deploying DeFi automation strategies using Uniswap V4 Hooks with an integrated strategy marketplace.

Democratizing DeFi development — from weeks to minutes, from $50k to $50–500.

---

## Table of Contents
- [Vision](#vision)
- [Key Features](#key-features)
- [Architecture Overview](#architecture-overview)
- [MVP Scope (6–8 weeks)](#mvp-scope-6–8-weeks)
- [Tech Stack](#tech-stack)
- [Project Structure (planned)](#project-structure-planned)
- [Development Setup (MVP path)](#development-setup-mvp-path)
- [Security & Compliance](#security--compliance)
- [Roadmap](#roadmap)
- [Grants & Materials](#grants--materials)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Polski — Streszczenie](#polski--streszczenie)

---

## Vision
Enable anyone (not just Solidity engineers) to create sophisticated, secure DeFi strategies via a visual builder that compiles to battle-tested smart contracts and deploys with one click. Build the marketplace where strategies can be discovered, reused, and monetized.

### Application Context (Solo Founder, No Prior Funding)
This project is currently led by a solo founder without prior funding and without an internal engineering team. Execution relies on open-source components (n8n, OpenZeppelin), public testnets, free tiers, and AI/no‑code tooling. The MVP plan is milestone-based, with costs concentrated at auditable deliverables (e.g., security review) to ensure capital efficiency and verifiable progress.

---

## Key Features
- Visual strategy builder (React Flow) → code generation → one-click deploy
- Uniswap V4 Hooks integration (hook templates, parameters, safety checks)
- Integration-first approach: n8n (workflows), Zapier (triggers), OpenZeppelin (security), Zapper/alternatives (data)
- Basic backtesting and simulation (progressively enhanced)
- Strategy marketplace (v0 in MVP) with reviews and versioning
- AI-assisted code validation and optimization (phased rollout)

---

## Architecture Overview
- Frontend (React + TS): Drag-and-drop builder, template gallery, marketplace UI
- Orchestration (n8n self-hosted): Custom DeFi nodes (UniswapV4Hook, Wallet, Oracle, Gas, TX Builder)
- Backend API (Node + Fastify): Auth, orchestration APIs, templates, marketplace, audit logs
- Smart Contracts (Solidity 0.8.24+): Hook templates using OpenZeppelin libraries, UUPS proxy patterns where required
- Deployment & Ops: OpenZeppelin Defender (relayers, sentinels), CI/CD, monitoring
- Data: Zapper or fallbacks (CoinGecko, DefiLlama, The Graph) for portfolio, prices, and events

---

## MVP Scope (6–8 weeks)

### Delivery Model & Resourcing
- Solo founder coordinating build using AI/no‑code and open-source tools.
- Contracting specialized tasks (e.g., security audit) only at the milestone they are needed.
- Transparent evidence at each step (repo updates, hashes of on-chain tx, demo video).
Week 1–2:
- Self-host n8n, build 5 core DeFi nodes, embed editor, Sepolia testnet
Week 3–4:
- 10 strategy templates, Zapier triggers, Defender integration, alpha (20 users)
Week 5–6:
- Zapper/alternatives, basic backtesting, beta (100 users), marketplace v0
Week 7–8:
- Hardening, audits pass (no critical), v1.0 public beta

KPIs (6–9 months): 100+ beta users, 5k+ executions/month, 95% success rate.

---

## Tech Stack
- Frontend: React 18+, TypeScript, React Flow, Tailwind, Wagmi + Viem
- Backend: Node.js, Fastify, PostgreSQL, Redis, IPFS, Docker
- Blockchain: Solidity 0.8.24+, Hardhat, Foundry, Create2, The Graph
- Security/Ops: OpenZeppelin (MIT), Defender (relayers/sentinels/autotasks)
- AI/ML (later): OpenAI API, custom models for gas/security recommendations

---

## Project Structure (planned)
This repo will evolve into a mono-repo:

```
/apps
  /web               # Next.js/React builder + marketplace
  /api               # Fastify API
  /n8n               # n8n Docker + custom nodes
  /contracts         # Solidity hooks + templates (Hardhat/Foundry)
/packages
  /ui                # Shared UI components
  /sdk               # JS/TS SDK for HookBuilder API
  /schemas           # Zod/JSON schemas for strategies/nodes
/docs
  /grants            # Grant materials (one-pager, deck, forms)
  /research          # Market research, interviews, analysis
```

Initial documents already present in docs/.

---

## Development Setup (MVP path)
1) Prerequisites
- Node.js 18+, pnpm or npm
- Docker (for n8n, DB, Defender relayer if needed)
- Wallet on Sepolia testnet for deployments

2) Local Orchestration (n8n)
- Run n8n via Docker
- Install custom DeFi nodes (to be published under /apps/n8n/nodes)
- Embed n8n editor into web app (iFrame or SDK; restrict to DeFi nodes)

3) Contracts
- Scaffold /apps/contracts with Hardhat
- Implement minimal hook templates using OpenZeppelin patterns
- Configure deployments (Create2 where appropriate), Sepolia first

4) Backend/API
- Scaffold /apps/api with Fastify
- Endpoints: strategies, templates, executions, marketplace (v0)
- Integrate Defender (relayers, sentinels) for safe execution

5) Frontend
- Scaffold /apps/web (Next.js recommended)
- Implement builder canvas, template gallery, deploy flow, simple marketplace

Note: The code scaffolding will be added as the next step; this README serves as the product/engineering blueprint and investor/grant entry point.

---

## Security & Compliance
- OpenZeppelin contracts (MIT) and standard patterns (Ownable, ReentrancyGuard, UUPS)
- Defender Sentinels to monitor critical events, Autotasks for scheduled checks
- Multiple audits before mainnet, bug bounty program, formal verification for critical paths
- Clear disclaimers: tooling, not financial advice; geographic restrictions as needed

---

## Roadmap
- V0 (POC): Sepolia deploys, 5 nodes, 5 templates, manual verification
- V1 (MVP): 10+ templates, Zapier triggers, marketplace v0, Defender wired
- V2: Multi-chain (Polygon, Arbitrum, Base), advanced analytics, API access
- V3: AI strategy suggestions, automated optimization, enterprise features

---

## Grants & Materials
- One-Pager + Executive Summary (PL/EN): docs/grants/HookBuilder_OnePager_ExecutiveSummary_PL_EN.md
- Pitch Deck: docs/grants/HookBuilder_Pitch_Deck.md
- PARP/NCBR Concept: docs/grants/PARP_NCBR.md
- Integration Feasibility: docs/HookBuilder/Integration_Feasibility_Report.md
- Business Plan: docs/HookBuilder/HookBuilder_Business_Plan.md
- Market Research Plan: docs/research/Market_Research_Plan.md

---

## Contributing
We plan to open-source significant parts of the platform:
- contract templates (MIT)
- n8n DeFi nodes
- SDKs and schemas

Until then, contributions are welcomed via issues and proposals. Please include:
- Problem statement
- Proposed solution
- Scope and acceptance criteria
- Security considerations

---

## License
To be finalized with legal review (MIT for libraries/templates; source-available or dual licensing for core platform). Draft LICENSE will be added before public release.

---

## Contact
- Name: [Your Name]
- Email: [your-email@hookbuilder.com]
- GitHub: https://github.com/HookBuilder
- Website: https://hookbuilder.com
- Deck: https://hookbuilder.com/deck
- Demo: https://hookbuilder.com/demo

---

## Polski — Streszczenie
HookBuilder to platforma no-code do tworzenia i automatyzacji strategii DeFi (Uniswap V4 Hooks) z marketplace’em. Wykorzystujemy podejście integracyjne (n8n, Zapier, OpenZeppelin, Zapper), co skraca czas i koszt MVP o 70–80% oraz zmniejsza ryzyko. MVP w 6–8 tygodni: 10 szablonów strategii, wdrożenie na testnecie, marketplace v0, monitoring przez Defender. Szukam grantów (PARP/NCBR, Polygon), partnerstw i wczesnych użytkowników.
