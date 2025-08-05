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

### Current Project Structure
The repository is a working monorepo with the following structure:
```
/apps
  /web               # Vite + React + TypeScript frontend (working)
  /api               # Fastify API (placeholder structure)
  /n8n               # n8n Docker + custom DeFi nodes (working)
  /contracts         # Solidity hooks + templates (placeholder)
/packages
  /ui                # Shared UI components (placeholder)
  /sdk               # JS/TS SDK for HookBuilder API (placeholder)
  /schemas           # Zod/JSON schemas (placeholder)
/docs              # Complete grants, research, and business documentation
```

## Development Setup Commands

### Prerequisites
- Node.js 18+, npm 8+ (specified in package.json engines)
- Docker (for n8n orchestration)
- Wallet on Sepolia testnet for deployments

### Root-Level Commands (Turbo Monorepo)
```bash
# Development
npm run dev           # Start all development servers
npm run build         # Build all packages using Turbo
npm run test          # Run tests across all packages
npm run lint          # Lint all packages
npm run type-check    # TypeScript checking across monorepo
npm run clean         # Clean all build artifacts and node_modules

# Docker orchestration
npm run docker:up     # Start n8n container
npm run docker:down   # Stop n8n container

# Evidence and demo scripts
npm run evidence:generate  # Generate grant evidence
npm run demo:record       # Demo recording for grants
npm run grant:package     # Package submission materials
```

### Individual Package Commands
```bash
# Frontend (apps/web) - Vite + React + TypeScript
cd apps/web
npm run dev          # Start Vite dev server
npm run build        # Build with TypeScript compilation + Vite
npm run lint         # ESLint with React rules
npm run preview      # Preview production build

# n8n Custom Nodes (apps/n8n)
cd apps/n8n
npm run dev          # Mock n8n development (see scripts/docker-mock.js)
npm run build        # Build custom nodes
npm run test         # Test n8n nodes

# API (apps/api) - Placeholder structure
cd apps/api
npm run dev          # Currently placeholder
npm run build        # Currently placeholder
```

## Key Implementation Details

### Technology Stack
- **Frontend**: React 19, TypeScript 5.8, Vite 7, Tailwind 4, ESLint 9
- **Build System**: Turbo monorepo, npm workspaces, TypeScript compilation
- **n8n Integration**: Custom DeFi nodes, Docker orchestration, SQLite storage
- **Planned**: Node.js/Fastify backend, Solidity contracts, OpenZeppelin security
- **Development**: Docker Compose, professional monorepo structure

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

This repository contains a working POC with professional monorepo structure:

### Implemented Components
- **Monorepo Structure**: Turbo + npm workspaces with 7 packages
- **Frontend**: Production-ready React 19 + TypeScript 5.8 + Vite 7 + Tailwind 4 (apps/web)
- **n8n Integration**: Custom EthereumBalance node with multi-network RPC support (apps/n8n)
- **Build System**: All packages building successfully with TypeScript compilation
- **Docker Environment**: n8n orchestration with custom node mounting
- **Documentation**: Complete grant application materials and evidence

### Working Features
- Custom n8n node for Ethereum balance checking across networks (Mainnet, Sepolia, Polygon)
- Vite-based frontend with modern React + TypeScript stack
- Docker environment for n8n orchestration
- Evidence generation scripts for grant applications
- Testnet integration with blockchain transaction proof

### Next Development Phase
Following the roadmap in `/docs/HookBuilder/Roadmap.md`, next steps focus on:
1. Expanding custom DeFi nodes (5 core nodes)
2. Visual strategy builder implementation
3. Smart contract templates
4. Marketplace v0

## Important Files and Locations

### Key Implementation Files
- `apps/n8n/nodes/EthereumBalance.node.js` - Custom DeFi node with multi-network RPC support
- `apps/web/` - React 19 + TypeScript + Vite + Tailwind frontend
- `turbo.json` - Monorepo build pipeline with caching configuration
- `docker-compose.yml` - n8n orchestration with custom node mounting
- `package.json` - Root workspace configuration with development scripts
- `tests/` - Integration tests and blockchain evidence generation scripts

### Documentation and Business Materials
- `/README.md` - Main project overview and investor entry point
- `/docs/HookBuilder/HookBuilder_Business_Plan.md` - Detailed business plan with financial projections
- `/docs/HookBuilder/Roadmap.md` - Step-by-step implementation roadmap
- `/docs/grants/` - Grant applications and funding materials
- `/docs/research/` - Market research and technical learning paths

### Evidence and Testing
- `tests/test-ethereum-rpc.js` - Working RPC integration test
- `tests/create-testnet-transaction.js` - Blockchain evidence generator
- `tests/execute-testnet-tx.js` - Live testnet transaction execution

## Development Workflow

### Running the Application
1. **Frontend Development**: `cd apps/web && npm run dev` (Vite dev server on port 5173)
2. **n8n Integration**: `npm run docker:up` (n8n on port 5678 with custom nodes)
3. **Full Development**: `npm run dev` (starts all development servers)

### Build and Quality Checks
- **Build All**: `npm run build` (uses Turbo for parallel builds)
- **Type Checking**: `npm run type-check` (TypeScript across all packages)
- **Linting**: `npm run lint` (ESLint across all packages)
- **Testing**: `npm run test` (runs tests across all packages)

### Package-Specific Commands
- **Frontend**: Standard Vite commands (`dev`, `build`, `lint`, `preview`)
- **n8n**: Custom node development with Docker integration
- **API/Contracts**: Currently placeholder structures

### Git Workflow
The repository uses conventional commits and has complete grant submission materials. Current branch structure supports both development and grant evidence generation.