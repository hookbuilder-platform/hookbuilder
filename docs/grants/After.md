Post‑funding execution plan (operational, 0–90 days, aligned with M1–M5 milestones and evidence-based disbursement):
Formalities and fund safety (Week 0)

- Decide disbursement form: wallet (crypto) or company bank account (fiat).
- Segregate funds: dedicated wallet/account for the grant.
- Agree “Acceptance/Evidence Criteria” per milestone with the grantor (explicit list of proofs).
- Prepare an accounting sheet: $15k budget → cost lines → evidence links (repo tags, tx hashes, reports, video, Defender IDs).

Ongoing execution practices

- Evidence‑first: after each work block, immediately produce tangible proof (tag, video, hash, test report, Defender screenshot).
- Public Roadmap & Changelog: short, dated entries (continuity and first‑mover proof).
- Security & risk:
- MVP limits/guards (TVL caps, whitelists, feature flags), DISCLAIMER and Security.md.
- Backup/recovery runbook (bus factor) and config backups (RPC/Defender).
- Communication with the grantor:
- Short updates after each milestone (1 page + evidence links).
- Request quick acceptance confirmation (shortens time to the next tranche).
🚀 **Community-First Growth Strategy (Start Day 0)**

**Pre-Development Community Building:**
- **n8n Community Engagement**: Post technical discussions about DeFi nodes, contribute to existing threads, build reputation
- **DeFi Protocol Communities**: Active participation in Uniswap, Aave, Polygon Discord/forums with valuable insights
- **Content Strategy**: Weekly blog posts/Twitter threads about DeFi automation trends and technical insights
- **Strategic Partnerships**: Early conversations with OZ team, n8n core contributors, protocol teams

**Parallel Revenue & Credibility Activities:**
- **Marketplace v0**: 5–10 community-validated strategy templates (test with early users first)
- **First MRR**: Creator plan $49/m + performance-based revenue share model (2-5% of strategy profits)
- **Strategic Partnerships**: 
  - Official n8n node package submission (community validation)
  - Zapier app store application (broader reach)
  - Protocol partnerships for white-label solutions
- **Microgrants/hackathons**: Submit 2-3 in parallel + community demos at events
- **Content Monetization**: Premium DeFi automation newsletter/course while building

What to prepare “ahead of time”

- Keep SUBMISSION_PACKAGE up‑to‑date (single link for reviewers).
- “Reviewer Pack” per tranche: max 3 clicks to verify (tag, hash, video, reports).
- Spending plan per the $15k breakdown (record costs, receipts, invoices).

💡 **Expected Outcome at 60–90 days (Enhanced)**

**Technical Deliverables:**
- MVP with UI Builder, 10+ community-validated templates, on‑chain workflows, comprehensive telemetry
- Complete evidence per milestone, positioned for follow‑on grants or pre‑seed
- Production-ready beta with 25+ active users (increased from 10 via community-first approach)

**Strategic Competitive Advantages:**
- **Data Moats**: Proprietary backtesting engine with real DeFi performance data
- **Network Effects**: Strategy marketplace with performance analytics & social proof  
- **Technical Innovation**: Gas optimization recommendations + MEV protection insights
- **Community Ownership**: Official n8n/Zapier integration status + protocol partnerships

**Revenue Foundation:**
- Templates + subscriptions ($49/m Creator plan)
- Performance fee revenue sharing (2-5% of strategy profits)
- White-label licensing pipeline (DAO/protocol tooling market)
- "Verified" strategy certification program

This plan aligns with your documents (Before.md, Polygon form M1–M5, One‑Pager, Roadmap) and maximizes tranche disbursement flow and the chance to deliver a valuable MVP quickly.

LONG:

Phase M1 — Orchestration + Polygon integration (detailed 5–7 day plan)

M1 Goal
- Local orchestration environment (n8n self‑host via Docker) running with 3 custom nodes (Wallet, PriceOracle, TxBuilder).
- Configured access to Polygon PoS/zkEVM (with Sepolia fallback) and a sample workflow JSON.
- “Walking skeleton” with a real on‑chain proof: at least 1 testnet transaction + POC Evidence section in README/POC_EVIDENCE.md.
- Artifacts: repo tag, 90–120s Loom, transaction hash, RPC/monitoring snapshot.

Day 1 — Environment bootstrap and n8n
1) Repo and standards
- Verify monorepo/turbo + npm workspaces (npm run build, npm run test).
- Ensure README has a “POC Evidence” section (links will be added once the proofs are produced).
- Add/verify SECURITY.md, DISCLAIMER, .editorconfig, and conventional commits.

2) n8n self‑host (Docker)
- docker-compose.yml: n8n service with data mounts (apps/n8n/data) and ports.
- Environment variables: RPC_URL_POLYGON, RPC_URL_ZKEVM, RPC_URL_SEPOLIA, API keys (if using managed providers), basic access auth.
- Healthcheck + run instructions in README: npm run docker:up or docker compose up -d.

3) Minimal inspector/monitoring (optional)
- Simple docker logs (docker logs n8n …), snapshot pasted into POC_EVIDENCE.md (proves the environment is live).
- If you don’t have loki/grafana yet, docker output + screenshot is sufficient.

Day artifacts:
- “docker up” and health logs.
- n8n panel screenshot (initial UI).
- Tag v0.1.0 (optional) after the first stable start.

Day 2 — 3 custom nodes v1
1) Wallet Node
- Params: network (polygon/zkevm/sepolia), address, optional private key for testnet ONLY (or rely on external signer/wallet).
- Functions: getBalance (eth_getBalance), optional getNonce, validateAddress.
- Output: balance wei/eth + hookbuilder.evidence.

2) PriceOracle Node
- Data sources: CoinGecko/DefiLlama (HTTP) with fallback strategy.
- Params: token symbol, vsCurrency (USD), fallback mode.
- Output: price, timestamp, providerUsed + hookbuilder.evidence.
- Note: keep a provider abstraction (easy provider swap).

3) TxBuilder Node
- Params: from (or use a separate signer), to, value (ETH/wei), gas/gasPrice (or EIP‑1559: maxFeePerGas, maxPriorityFee), data (hex), chainId.
- Functions: buildTransaction (returns a structured object to sign).
- Output: txObject + hookbuilder.evidence.

3) Node standards
- Each node as a separate module in apps/n8n/nodes, with README (params, examples) and basic tests (see test-n8n-node.js).
- Use this.helpers.request for RPC (HTTP JSON‑RPC), validate responses, try/catch with clear error messages.
- Return JSON with hookbuilder: { node, version, evidence }.

Day artifacts:
- 3 node files (Wallet, PriceOracle, TxBuilder) + READMEs.
- Short outputs from test-n8n-node.js (at least for 1 node).
- Tag v0.1.1 (optional) after smoke tests.

Day 3 — Polygon/zkEVM integration + sample workflow
1) RPC and networks
- In .env/.docker.env set RPC_URL_POLYGON (Alchemy/Infura/free RPC/llamaRPC), RPC_URL_ZKEVM, RPC_URL_SEPOLIA. 
- Ensure the Wallet Node can pick RPC by network name.

2) Sample workflow JSON
- Trigger (manual/time) → PriceOracle (fetch price) → Decision (threshold) → TxBuilder (build “evidence” transaction) → Output (log).
- Save the workflow JSON into the repo and add import instructions for n8n UI.

3) End‑to‑end test on testnet
- Run the workflow and verify responses (price OK, txObject has correct structure).
- If you use manual signing (e.g., MetaMask): export txObject for manual send (removes the need to keep a key within a node).

Day artifacts:
- Workflow JSON in repo + n8n UI screenshot.
- Execution logs output (for POC_EVIDENCE.md).
- Tag v0.1.2 (optional).

Day 4 — Real on‑chain evidence + docs
1) Real transaction (testnet)
- Use create-testnet-transaction.js as a reference: prepare evidence data (JSON → hex), amount 0.001 ETH, recipient (your own or a public test address), Sepolia/Polygon testnet.
- Send the TX via MetaMask/wallet and copy the tx hash + explorer URL.

2) Evidence documentation
- README → “POC Evidence”: add “Evidence Quick Links”:
  - TX hash (clickable to etherscan/polygonscan),
  - 90–120s Loom (after day 5 recording),
  - Tag ‘poc‑v1’ or v0.1.3.
- docs/grants/POC_EVIDENCE.md: add a “Blockchain Evidence (Live)” block (hash, block, timestamp, screenshot link).

3) Monitoring/Defender screenshot (optional)
- If you have a baseline (relayer/sentinel/autotask), take a configuration/log screenshot and add to POC_EVIDENCE.md.

Day artifacts:
- 1 real transaction hash (clickable), explorer screenshot (timestamp).
- Updated POC_EVIDENCE.md.
- Tag v0.1.3 (optional).

Day 5 — 90–120s Loom + “Reviewer Pack”
1) Demo recording (per existing script)
- Show repo (badges, tree), n8n canvas/workflow JSON, test outputs (RPC), explorer with TX, short M1–M5 overlay.
- Keep narration clear and concise.

2) Submission_Package.md
- Add the Loom link, the TX hash link, README (Evidence section), ‘poc‑v1’ tag, POC_EVIDENCE.md (live), workflow JSON.

3) Short M1 report → grantor
- 1 page: what’s done (M1 bullets), evidence links, request acceptance and M1 tranche.

Day artifacts:
- Public Loom link, updated Submission_Package.md.
- Short “M1 Evidence Summary”.

M1 Acceptance/Evidence Criteria
- n8n self‑host running (docker logs/screenshot).
- 3 custom nodes (Wallet, PriceOracle, TxBuilder) with READMEs and short test outputs.
- Sample workflow JSON + n8n screenshot.
- 1 real testnet TX hash (clickable explorer link) with evidence data (optional).
- README: “Evidence Quick Links” (hash, Loom, tag).
- POC_EVIDENCE.md: logs/screenshots (RPC output, workflow run, explorer).
- Loom 90–120s (repo → n8n → hash → plan M2–M5).
- Repo tag (e.g., v0.1.3 / poc‑v1).

🛡️ **M1 Enhanced Risks & Mitigations**
- **Timeline Risk**: M1 baseline 5-7 days → add 20% buffer (6-8 days) for unexpected complexity
- **Testnet funds**: Faucets + multiple addresses; **NEW**: community faucet requests via Discord/Twitter
- **RPC provider issues**: Multi-provider fallback + **NEW**: community-contributed RPC endpoints
- **Keys/privacy**: Manual MetaMask signing + **NEW**: clear security documentation for users
- **Community validation**: **NEW**: Post M1 progress in n8n community for early feedback/debugging help
- **Recording clarity**: Demo script + **NEW**: community beta testing of tutorial flow before recording

“Done” definition for M1
- All artifacts listed in Acceptance/Evidence Criteria exist and are clickable.
- Reviewer verifies in 3 clicks: (1) TX hash, (2) Loom, (3) tag + workflow JSON.
- A short one‑pager to the grantor with links is ready.

After M1 acceptance
- Move immediately to M2 (contracts + workflow exec); keep “evidence‑first” (repo tag + tests + addresses + Defender IDs) to shorten M2 acceptance time.

Phase M2 — Contracts + workflow execution (detailed 7–10 day plan)

M2 Goal
- Minimal hook templates (Solidity) with tests (Hardhat/Foundry) and deployment scripts (Create2 optional).
- Execution integration from the workflow (n8n → RPC/Defender).
- Baseline OpenZeppelin Defender config (relayer/sentinel/autotask) for observation and safe execution.
- QA: basic gas profiling and smoke tests.
- Artifacts: repo tags, testnet deployment addresses, deployment runbook, Defender IDs/logs, test and gas reports.

Day 1 — Contract skeleton and test environment
1) Contract tooling init
- Hardhat + Foundry (both recommended: Foundry for fast tests, Hardhat for scripts/plugins).
- Networks configured: hardhat, sepolia, polygon testnet (if available), Etherscan/Polygonscan API keys (optional for verification).
- Structure:
  apps/contracts/
    contracts/
    scripts/
    test/
    foundry.toml / hardhat.config.ts
- Set Solidity version (>=0.8.19) and OZ standards.

2) Minimal hook templates (MVP)
- LoggingHook (events on afterInitialize/afterSwap) — safe starter.
- LimitOrderHook (minimal “threshold” logic without holding user funds for MVP).
- Use “Permissions” pattern from BaseHook and Uniswap V4 interfaces.
- Focus on safety and simplicity for MVP; no complex funds custody.

3) Unit tests
- “Permissions and events” (proper flags/events).
- “Happy path” + minimum edge cases.
- Aim: 60–70% coverage for MVP (record the result).

Day artifacts:
- Repo tag v0.2.0.
- Test runs (screenshot/log).
- Short contract README in apps/contracts.

Day 2 — Deployment scripts and testnet addresses
1) Deployment scripts
- Hardhat scripts: deployLoggingHook.ts, deployLimitOrderHook.ts
- Params: network, optional Create2 (if deterministic address is valuable in MVP).
- Persist outputs to deployments/<network>.json.

2) Deployment runbook
- In /docs/ or contracts README: step‑by‑step deploy to sepolia/polygon testnet (keys, RPC, commands, Etherscan verification).
- Add a “Before deploy” checklist (.env keys, green tests, healthy RPC).

3) Testnet deployment
- Deploy at least 1 hook (LoggingHook) to Sepolia (or Polygon testnet).
- Verify contract in the explorer (optional).
- Record addresses and explorer links.

Day artifacts:
- Deployments JSON + explorer links.
- Repo tag v0.2.1.
- Deployment runbook (md).

Day 3 — n8n → contracts integration (execute via workflow)
1) Execution path
- Option A (faster for M2): direct n8n call: a “ContractExecute” node (or TxBuilder extension) with method/params; manual wallet signing or a simple testnet signer (handle key safety).
- Option B (recommended long‑term): Defender Relayer — workflow calls endpoint (autotask or API), Defender manages signing/nonce/fee (no keys in n8n).

2) n8n node or workflow step
- Extend TxBuilder: “contractCall” mode with ABI+method+args.
- Params: network, contractAddress, abi fragment, method, args, gas/gasPrice (or EIP‑1559), strategy “signer=defender/manual”.
- Validation: pre‑check ABI/method; handle RPC errors and revert.

3) E2E test
- Build workflow: trigger → build method call → execute → confirm (receipt/log).
- Paste logs and receipt into POC_EVIDENCE.md (hash, block, gasUsed).

Day artifacts:
- Workflow JSON with contractCall.
- Receipt screenshot + explorer link (transaction).
- Repo tag v0.2.2.

Day 4 — OpenZeppelin Defender (baseline)
1) Relayer
- Create a Relayer for testnet, record ID (mask secrets).
- Check rate limits/cost; plan safe invocations.

2) Sentinel
- Minimal event monitoring (e.g., a LoggingHook event afterInitialize/afterSwap) or TX status monitoring.
- Configure an alert (email/webhook) for selected events/failures.

3) Autotask (optional)
- Simple autotask: contract ping or off‑chain check every X minutes (show capability).
- Record ID and brief screenshots/logs.

Day artifacts:
- Defender IDs (Relayer/Sentinel/Autotask) + configuration/log screenshots.
- Repo tag v0.2.3.

Day 5 — QA: gas profiling and smoke tests
1) Gas profiling
- Basic report: selected paths (hook method calls, typical ops).
- Record results and any deltas (baseline vs. minor optimization if any).

2) Smoke tests
- Minimal scenarios: deploy → call → receipt OK → event.
- If using Foundry: lightweight fuzz/property tests (optional).

3) Results documentation
- QA.md with a short table: method, gasUsed, status, notes.
- Link QA.md in POC_EVIDENCE.md (“M2 QA”).

Day artifacts:
- QA report (gas + smoke).
- Repo tag v0.2.4.

Day 6–7 — Clean‑up, Loom, and “Reviewer Pack”
1) Loom (90–120s M2)
- Show: contracts folder, test run, deployments JSON + explorers, n8n contractCall workflow, Defender IDs/logs, short gas report.
- End with: link to POC_EVIDENCE.md (M2) and acceptance request for the M2 tranche.

2) POC_EVIDENCE.md and Submission_Package.md
- Fill “M2 Live Evidence”: addresses, hashes, screenshots, QA links.
- Add Loom (M2) link and tag v0.2.x.

3) Grantor report
- 1‑pager: “M2 Completed” — bullets + evidence links (addresses, receipt, Defender IDs, QA report).

M2 Acceptance/Evidence Criteria
- Contracts (≥1 hook) — code + tests (report, coverage).
- Deployment scripts + testnet addresses (saved and linked to explorers).
- Deployment runbook (md).
- n8n workflow executing a contract method (receipt/tx hash + log).
- Defender: Relayer/Sentinel/Autotask (at least ID + config/log screenshot).
- QA: gas profiling and smoke tests (short report).
- Loom (M2) + repo tag v0.2.x + POC_EVIDENCE updated.

M2 Risks & Mitigations
- Uniswap V4 hook integration: if V4 testnet is unstable, base M2 on your simple hook (LoggingHook) and call/receipt mechanics; V4‑specific logic can move to M3/M4.
- Key security: prefer Defender Relayer (no keys in n8n). If any local signer is used, keep it testnet‑only and document warnings.
- Failed TXs: log revert reason, check gas/gwei, retry; add RPC fallback.

“Done” definition for M2
- Reviewer has 3 clickable proofs: (1) contract address(es) + explorer, (2) contractCall workflow with receipt/event, (3) Defender ID + log.
- QA report (gas/smoke) exists and is linked.
- Loom (M2) and tag v0.2.x are published; POC_EVIDENCE updated.

Phase M3 — UI Builder + Deploy Flow (alpha)
Timeline: 7–9 days

M3 Goal
- MVP Canvas Builder (React + React Flow): drag-and-drop strategy blocks, connections, validations, and JSON serialization.
- Template Gallery (≥5 strategies) with parameterization and validation.
- Deploy Wizard: steps for network → params → sign/execute → monitor (receipt/logs).
- e2e smoke (3 scenarios) and short QA report.
- Artifacts: UI demo video, feature checklist, JSON workflow examples, e2e test report, repo tag v0.3.x.

Day 1 — UI Builder Foundation (Canvas)
1) Screen Skeleton
- Structure: Side panel (block palette), Canvas (React Flow), Right panel (selected block params), Top bar (New/Open/Save/Deploy).
- React Flow: initial setup (nodeTypes/edgeTypes), grid, snap, zoom/pan.
2) Basic Blocks (node types)
- Input/Trigger (Manual/Timer/Webhook), Data (PriceOracle), Decision (if/else), Action (TxBuilder / ContractCall), Output/Log.
- Each block includes: id, type, label, config schema (Zod), default values.
3) Serialization/Deserialization
- Strategy ↔ JSON (Zod schema): nodes[], edges[], metadata, version.
- Save/load from localStorage for MVP.
4) Live Validations
- Required fields, type consistency (e.g., Decision receives price), warnings (no output, unconnected blocks).

Artifacts:
- Components: Canvas + block palette + parameter panel.
- Strategy JSON schema.
- Tag v0.3.0.

Day 2 — Template Gallery (≥5) and Parameterization
1) Gallery
- Template cards: name, description, category, “Load” button.
- JSON templates (repo files) + preview (screenshot or JSON prettify).
2) Parameterization
- For each template: define parameters (e.g., token, threshold, amount), UI form with Zod validation.
- After “Load”: parameters injected into the corresponding nodes/edges.
3) Template Versioning
- version field (semver), metadata (author, date), link to changelog.

Artifacts:
- 5 ready-made JSON templates + Gallery UI.
- Parameter input panel (forms).
- Tag v0.3.1.

Day 3 — Deploy Wizard (Steps 1/2)
1) Wizard — Step 1 (Network)
- Selection: Sepolia/Polygon testnet (PoS/zkEVM).
- Preview: current RPC and status.
2) Wizard — Step 2 (Params)
-Overview of parameters from the loaded template (Zod validation).
- Pre-flight validation: ensure all nodes have required fields.
3) Export Execution Plan
- Based on strategy JSON, generate ordered execution plan — consumable by backend or n8n.

Artifacts:
- Wizard steps 1–2, execution plan preview component.
- Tag v0.3.2.

Day 4 — Deploy Wizard (Steps 3/4) + M2 Integration
1) Wizard — Step 3 (Sign/Execute)
- Mode A (MVP): generate execution payload (e.g., for n8n/Defender) + manual wallet signing (for critical actions).
- Mode B (if Defender available): webhook/endpoint triggering relayer call (no UI key management).
- Handle states: in progress, errors, simple retry mechanism.
2) Wizard — Step 4 (Monitor)
- Show receipt/tx hash/logs after execution (via Defender or RPC).
- Event logs (e.g., LoggingHook) — minimal viewer.

Artifacts:
- Full Deploy Wizard (1–4), integration with M2 (contract call).
- First successful strategy execution via UI (screenshots).
- Tag v0.3.3.

Day 5 — UX Polish + Validations + States
1) UX Copy
- Clear text, tooltips, understandable errors (e.g., “Missing param X in block Y”).
2) Pre-Deploy Validation
- Checklist: all parameters set, connections consistent, network selected, no dead ends.
3) Error Handling
- Visible status, “try again” option (retry), link to detailed logs.
4) Accessibility & Responsiveness
- Basic ARIA roles, tab order, mobile fallback (UI is desktop-first).

Artifacts:
- Pre-deploy checklist.
- Tag v0.3.4.

Day 6 — e2e Smoke (3 Scenarios)
Scenarios:
1) “Deploy simple hook”
- Load template (e.g., LoggingHook), set params, select network, generate execution plan, run and show receipt + event (from M2).
2) “Trigger strategy”
- Trigger → PriceOracle → Decision → ContractCall (safe call). Show result and tx hash.
3) “Monitoring”
- Show monitor screen and log fragment (RPC or Defender).

Execution:
- Playwright/Cypress light (UI tests) + fixtures with sample JSONs.

Evidence:
- Test report (HTML/CLI), screenshots.
- Tag v0.3.5.

Days 7–8 — Loom (M3) + Reviewer Pack
1) 90–120 sec Loom Video (M3)
- Show Canvas, load template, params, wizard steps, execution + monitor, short overlay “M1/M2 done → now M3 UI”.
2) POC_EVIDENCE.md + Submission_Package.md
- Add “M3 Live Evidence” section: UI screenshots, Loom link, strategy JSON samples, e2e report.
3) Grantee Report
- 1-pager: “what works” list + links (UI demo, JSON templates, e2e report, tx hash/receipt).

Artifacts:
- Loom M3, POC_EVIDENCE M3, repo tag v0.3.x.

M3 Acceptance/Evidence Criteria
- Canvas Builder: drag & drop, parameter panel, validation, JSON (de)serialization.
- Template Gallery (≥5) with parameterization.
- Deploy Wizard (network → params → sign/execute → monitor) with M2 integration.
- e2e smoke: 3 scenarios, test report.
- Loom (M3), POC_EVIDENCE.md completed, repo tag v0.3.x.

🛡️ **M3 Enhanced Risks & Mitigations**
- **Timeline Risk**: M3 baseline 7-9 days → add 25% buffer (9-11 days) - React Flow complexity is high
- **React Flow complexity**: **NEW**: Start with n8n community examples/templates, gradual feature addition
- **User Acquisition**: **NEW**: Target 25+ beta users (vs 10) via community pre-building  
- **Tx signing**: Defender Relayer priority + **NEW**: community security review of signing flow
- **Integration bugs**: Export execution plan fallback + **NEW**: community testing of integration points
- **UX overload**: Community-driven UX feedback + **NEW**: A/B testing with early users

M3 “Done” Definition
- Reviewer sees in 3 clicks: (1) Loom M3, (2) JSON sample + e2e report, (3) monitor screenshot with real tx/receipt.
- Deploy Wizard executes at least one real strategy (with M2 contract).
- Template Gallery produces usable strategies (min. 5), with blocking validations.

Phase M4 — Data Integrations + Basic Backtesting
Timeline: 5–7 days

M4 Goal
- Data providers with fallback: CoinGecko / DefiLlama / (optional) The Graph — unified interface.
- Minimal backtesting module: fetch historical data, simulate basic signals (e.g., price thresholds, moving averages).
- Minimal telemetry: events (success/fail), basic metrics (avg execution time, success rate) + dev dashboard (screenshots).
- Add 2 new n8n nodes: GasTracker and PriceAlert.

Artifacts: repo tag v0.4.x, backtest snapshots, dashboard screenshots, node packages, short QA report.

Day 1 — Provider Abstraction (Data Layer)
1) Data Provider Interface
- TypeScript interface:
  getPrice(tokenId/symbol, vsCurrency) → { price, timestamp, provider }
  getHistoricalPrices(tokenId, vsCurrency, range) → { series: [{t, price}], provider }
- Implementations:
- CoinGecko (REST): simple /simple/price & /market_chart.
- DefiLlama (REST): fallback/aggregator for tokens/LPs.
- (Optional) The Graph: sketch client.
- Retry + timeout + simple circuit breaker:
- Order: primary → fallback; log providerUsed.

2) Tests & Validation
- Unit tests for request logic and JSON → domain mapping.
- Validate output (timestamp > 0, price > 0).
- Warn logs on fallback use.

Artifacts:
- packages/sdk (or apps/api) → /data/providers/*
- Unit test report
- Tag v0.4.0

Day 2 — Minimal Backtesting (Basic)
1) Backtest Model (MVP)
- Inputs: token/symbol, vsCurrency, range (e.g., 30/90d), strategy (e.g., threshold: buy/sell above level; simple SMA crossover).
- Flow:
  Fetch series via Data Layer.
  Process series → generate signals → compute metrics (e.g., number of signals, pseudo-PnL, max drawdown — even simplified).
- Outputs:
  summary: { signalsCount, pseudoReturn, volatilityProxy, providerUsed }
  events: list of decision points (t, price, action)

2) Export Results
- JSON results (saved to /tests/artifacts or /docs/evidence).
- Simple chart (optional): frontend-generated or CSV export.
3) Stability/Error Handling
- Handle data gaps → interpolate or skip.
- Flags: useFallbackProvider, ignoreOutliers (optional, MVP level).

Artifacts:
- Backtesting module (packages/sdk/backtesting or apps/api/services/backtest)
- Sample output JSONs (snapshots) for 1–2 tokens
- Tag v0.4.1

Day 3 — UI Integration + Backtest Panel
1) Frontend “Backtest Panel”
- Form: token, period, strategy params (e.g., threshold/SMA window).
- Run backtest (local or via API), display summary + event list.
- Optional: mini chart (price line + signals) — lightweight component.
2) Export Options
- Button: Export JSON/CSV.
- Save last backtest in localStorage for comparison.
3) UI Consistency (M3)
- If possible, link “Load from Template” → auto-fill backtest params from strategy.

Artifacts:
- Backtest Panel component + screenshots
- Sample JSON/CSV output
- Tag v0.4.2

Day 4 — Minimal Telemetry + Dev Dashboard
1) Telemetry (MVP)
- Events: start, success, fail; exec times, error types/stacks.
- Basic metrics: success rate, avg exec time.
- Storage: console logging + optional local file/endpoint in apps/api.
2) Dev Dashboard (screenshots)
- Minimal status page (/dev/status) or CLI snapshot.
- Screenshots added to POC_EVIDENCE.md (Grafana/Loki not required in M4, just note it for future).
3) Error Hook
- Global error handler (frontend/node) with basic context info.

Artifacts:
- Dashboard screenshots + telemetry logs
- Tag v0.4.3

Day 5 — Two New n8n Nodes (GasTracker, PriceAlert)
1) GasTracker Node
- Inputs: network, mode (gas price/fee history).
- Output: usable EIP-1559 params (baseFee + priority suggestions) + hookbuilder.evidence.
- Use case: sensible defaults for TxBuilder/ContractCall.
2) PriceAlert Node
- Inputs: token, vsCurrency, condition (>, <, >=, <=), threshold.
- Logic: fetch price via Data Layer; return alert: true/false + raw value.
- Example flow: Trigger → PriceAlert → Decision/Action.
3) README + Tests
- README for each node (params, examples).
- Simple integration test (test-n8n-node.js style).

Artifacts:
- Two nodes with README + test output
- Tag v0.4.4

Days 6–7 — QA + Reviewer Pack M4
1) QA Backtesting
- Run 2–3 backtests (different params/ranges), save and compare summary.
- Note MVP limits (e.g., no fees, no slippage — plan for V2).
2) QA Data Layer
- Test fallback (disable primary, observe behavior).
- Document rate-limit scenarios (retry/fallback switching).
3) POC_EVIDENCE.md + Submission_Package.md
- Add “M4 Live Evidence”: backtest JSON/CSV results, Backtest Panel screenshots, telemetry logs, README for new nodes.
4) Optional Loom (M4)
- 60–90s showing Backtest Panel + new nodes.
5) Tag repo v0.4.x

M4 Acceptance/Evidence Criteria
- Data Layer with provider abstraction (min. 2 providers + fallback).
- MVP Backtesting module with real JSON/CSV output.
- Backtest Panel (form → result → export).
- Minimal telemetry + dev status screenshots.
- Two new n8n nodes (GasTracker, PriceAlert) with README and test output.
- POC_EVIDENCE.md: backtest snapshots, dashboard logs/screenshots, node/test links.
- Repo tag v0.4.x (M4 complete).

M4 Risks & Mitigations
- Data providers (limits/pricing): fallback + caching; reduce query frequency if needed.
- MVP backtest quality: communicate limitations in README and plan V2 (fees, slippage, better models).
- UI/UX overload: isolate Backtest Panel as a standalone module, simple chart, MVP-level options only.
- Telemetry: if no time for full Grafana stack, use a simple status page/screenshot.

M4 “Done” Definition
- Reviewer sees in 3 clicks:
  (1) Backtest results (JSON/CSV + panel screenshot),
  (2) Data Layer with fallback (test/description),
  (3) 2 new nodes with sample output.
- Minimal telemetry exists and is documented with screenshots.
- POC_EVIDENCE completed; tag v0.4.x set; consistent with roadmap and budget (M4 scope: adapters, backtesting, telemetry, 2 nodes).

Phase M5 — Beta, materials, and community (detailed 4–6 day plan)

M5 Goal
- Controlled public beta: onboarding guide, 2 short tutorials (text + Loom), 10 active alpha/beta users with structured feedback.
- Strategy templates v0 (≥5) prepared for marketplace: metadata, versioning, internal “verified” badge, publication policy.
- Optimization and bugfix buffer, close the telemetry/analytics loop (snapshot).
- Artifacts: tutorial links, feedback sheet, template listing with metadata, changelog, tag v0.5.x, “M5 Live Evidence” section in POC_EVIDENCE.md.

Day 1 — Onboarding Guide + Tutorials (2× Loom 60–90s)
1) Onboarding Guide (docs/Onboarding.md)
- Table of contents:
- “Start here”: requirements (browser, wallet, testnet), how to obtain testnet ETH.
- “First run”: import 1 strategy template and run the Backtest Panel.
- “First deploy”: go through Deploy Wizard (network → params → sign/execute → monitor), link to an example tx hash.
- “Troubleshooting”: common pitfalls and checklists.
- “Submitting feedback”: link to form/Issue Template.
- Format: concise, screenshots, links to README/POC_EVIDENCE sections.

2) Tutorials (2 Looms, 60–90s)
- Tutorial A: “Deploy a Hook in 90 seconds”
- Load template → set params → deploy wizard → receipt/monitor → tx hash link.
- Tutorial B: “First strategy with a decision block”
- PriceOracle → Decision (threshold) → ContractCall → read results → quick backtest.
- Add both links to Submission_Package + README (Evidence Quick Links).

Artifacts:
- Onboarding.md + 2 Loom links.
- Tag v0.5.0.

Day 2 — Beta (10 users) + Feedback
1) Recruit 10 alpha/beta users
- Channels: n8n community (custom nodes thread), Twitter/X, Discord/Web3 groups, personal contacts.
- Conditions: access to beta panel, 2 simple tasks (deploy hook + backtest).

2) Collect feedback
- Form/Issue Template (Google Form / GitHub Issue):
- Profile: DeFi experience, tools.
- Tasks: did deployment complete? issues? time taken?
- UX/Copy: what was unclear?
- Suggestions: missing blocks/strategy.
- Analysis:
- Synthetic sheet (CSV/Google Sheet), problem categories, top‑3 improvements.

Artifacts:
- Screenshot/export of the feedback sheet.
- 2–3 anonymized user quotes for grant materials.
- Tag v0.5.1.

Day 3 — Strategy Templates v0 (≥5) + publication
1) Polish 5+ strategies
- Metadata: name, description, version (semver), author, minimum requirements, parameters.
- JSON files: consistent schema, validations; brief README blurbs.
- “Verified” badge (internal): passed smoke test + basic backtest.

2) Publication policy (draft)
- Template publication rules: required metadata, minimal tests, disclaimers (no financial advice).
- Update process: semver + changelog + review.

Artifacts:
- templates/ directory with 5+ JSON + README.
- “Verified” list (internal md with date and criteria).
- Tag v0.5.2.

Day 4 — Telemetry/Analytics Snapshot + Optimization/Bugfix
1) Telemetry snapshot
- Success rate, average step exec time, error count during beta.
- Short “M5 Health snapshot” report.

2) Optimization and bugfix buffer
- Priorities per feedback (top‑3 UI/validation/message fixes).
- Changelog (v0.5.3).

3) Update POC_EVIDENCE.md and Submission_Package.md
- “M5 Live Evidence”: onboarding links, tutorial Looms, feedback sheet, template listing, telemetry snapshot, changelog.
- Finalize the “Reviewer Pack” (max 3 clicks to key evidence).

Artifacts:
- Telemetry report (screenshot/JSON).
- Changelog + tag v0.5.3.
- Updated POC_EVIDENCE (M5) and Submission_Package.

Acceptance/Evidence Criteria (M5)
- Onboarding guide and 2 Loom tutorials with public links.
- 10 alpha/beta users — feedback gathered (sheet + synthesis).
- 5+ ready strategies (JSON + metadata + internal “verified”).
- Minimal telemetry — snapshot of core metrics (success rate, avg exec time, error count).
- Changelog and tag v0.5.x (“M5 Complete”), POC_EVIDENCE: M5 section with proofs, Submission_Package: complete links.

🛡️ **M5 Enhanced Risks & Mitigations**
- **Timeline Risk**: M5 baseline 4-6 days → add 20% buffer (5-7 days) for community coordination
- **User Acquisition Enhanced**: **Target 25+ beta users** via:
  - Pre-built community from Day 0 (n8n, DeFi Discord engagement)
  - Strategic partnerships (protocol communities)  
  - Content marketing (blog series, Twitter presence)
  - Hackathon demos and microgrant visibility
- **Quality Feedback Strategy**: 
  - Task-based forms + community champions program
  - Video feedback sessions with power users
  - **NEW**: Community-driven feature prioritization voting
- **Production Readiness**: 
  - **NEW**: Community security review process
  - **NEW**: Staged rollout with feature flags
  - **NEW**: Community-contributed strategy templates

“Done” definition for M5
- Reviewer verifies in 3 clicks: (1) onboarding + Loom tutorials, (2) feedback sheet (10 users) + synthesis, (3) template listing (≥5) with metadata and “verified”, plus telemetry snapshot.
- Repo tag v0.5.x and POC_EVIDENCE with a complete “M5 Live Evidence” section; Submission_Package updated (final, grant‑ready).

After M5 — next options
- Apply for additional microgrants (feature expansion, pre‑mainnet audit).
- Start first revenues: early Creator plan ($49/m), sell “verified” template packs, implementation consulting.
- Prepare for audit and hardening (pre‑mainnet track), expand backtesting (fees/slippage), stronger telemetry (Grafana/Loki).
