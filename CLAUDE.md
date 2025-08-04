# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HookBuilder is a no-code platform for building, testing, and deploying DeFi automation strategies using Uniswap V4 Hooks with an integrated strategy marketplace. The project democratizes DeFi development by enabling non-technical users to create sophisticated hooks through a visual drag-and-drop interface.

## Architecture Overview

The platform uses an integration-first approach built around these core components:

### Core Components
1. **Frontend (React + TypeScript)** - Visual drag-and-drop builder using React Flow, template gallery, marketplace UI
2. **Orchestration (n8n self-hosted)** - Custom DeFi nodes for workflow automation (UniswapV4Hook, Wallet, Oracle, Gas, TX Builder)
3. **Backend API (Node.js + Fastify)** - Authentication, orchestration APIs, templates, marketplace, audit logs
4. **Smart Contracts (Solidity 0.8.24+)** - Hook templates using OpenZeppelin libraries, UUPS proxy patterns
5. **Deployment & Operations** - OpenZeppelin Defender (relayers, sentinels), CI/CD, monitoring
6. **Data Layer** - Zapper API with fallbacks (CoinGecko, DefiLlama, The Graph) for portfolio, prices, and events

### Planned Project Structure
The repository will evolve into a monorepo:
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
/docs              # Already contains grants, research, and business documentation
```

## Development Setup Commands

### Prerequisites
- Node.js 18+, pnpm or npm
- Docker (for n8n, DB, Defender relayer)
- Wallet on Sepolia testnet for deployments

### Local Development (When Implemented)
```bash
# Local orchestration (n8n)
docker-compose up n8n

# Smart contracts
cd apps/contracts
npm run test          # Run contract tests
npm run deploy:sepolia # Deploy to Sepolia testnet
npm run coverage      # Generate test coverage report

# Backend API
cd apps/api
npm run dev          # Start development server
npm run test         # Run API tests

# Frontend
cd apps/web
npm run dev          # Start Next.js development server
npm run build        # Build for production
npm run test         # Run frontend tests
```

## Key Implementation Details

### Technology Stack
- **Frontend**: React 18+, TypeScript, React Flow, Tailwind, Wagmi + Viem
- **Backend**: Node.js, Fastify, PostgreSQL, Redis, IPFS, Docker
- **Blockchain**: Solidity 0.8.24+, Hardhat, Foundry, Create2, The Graph
- **Security/Operations**: OpenZeppelin (MIT), Defender (relayers/sentinels/autotasks)
- **AI/ML**: OpenAI API, custom models for gas/security recommendations

### MVP Development Phases (6-8 weeks)
1. **Week 1-2**: Self-host n8n, build 5 core DeFi nodes, embed editor, Sepolia testnet
2. **Week 3-4**: 10 strategy templates, Zapier triggers, Defender integration, alpha (20 users)
3. **Week 5-6**: Data integration, basic backtesting, beta (100 users), marketplace v0
4. **Week 7-8**: Hardening, audits pass (no critical), v1.0 public beta

### Security Considerations
- OpenZeppelin contracts (MIT) and standard patterns (Ownable, ReentrancyGuard, UUPS)
- Defender Sentinels for monitoring critical events
- Multiple audits before mainnet deployment
- Bug bounty program and formal verification for critical paths
- Geographic restrictions and compliance disclaimers

## Current State

This repository currently contains comprehensive project documentation and specifications. The actual code implementation will begin following the roadmap outlined in `/docs/HookBuilder/Roadmap.md`. Initial focus is on n8n orchestration setup and custom DeFi node development.

## Important Files
- `/README.md` - Main project overview and investor entry point
- `/docs/HookBuilder/HookBuilder_Business_Plan.md` - Detailed business plan with financial projections
- `/docs/HookBuilder/Roadmap.md` - Step-by-step implementation roadmap
- `/docs/grants/` - Grant applications and funding materials
- `/docs/research/` - Market research and technical learning paths