# HookBuilder n8n Integration

## Overview

Custom n8n nodes for DeFi automation, starting with basic Ethereum balance checking and expanding to full Uniswap V4 hooks integration.

## Architecture

```
apps/n8n/
├── docker-compose.yml     # n8n + PostgreSQL setup
├── package.json          # Custom node package definition
├── nodes/               # Custom DeFi node implementations
│   └── EthereumBalance.node.js
└── data/               # n8n instance data (Docker volume)
```

## Setup Instructions

### 1. Start n8n Environment
```bash
# From repository root
docker compose up -d

# Access n8n at http://localhost:5678
# Username: admin
# Password: hookbuilder2025
```

### 2. Install Custom Nodes
```bash
# Custom nodes are automatically loaded from ./nodes directory
# n8n will detect EthereumBalance node on startup
```

## Custom Nodes

### EthereumBalance Node
**Purpose**: Get ETH balance for any address across multiple networks

**Features**:
- Multi-network support (Mainnet, Sepolia, Polygon)
- Automatic RPC endpoint selection
- Wei to ETH conversion
- Grant evidence tracking

**Usage Example**:
```javascript
// Input parameters
{
  "operation": "getBalance",
  "network": "sepolia", 
  "address": "0x742E4C3b7FC5F88C0c6D89c03a3c84fC0AA56E16"
}

// Output
{
  "address": "0x742E4C3b7FC5F88C0c6D89c03a3c84fF0AA56E16",
  "network": "sepolia",
  "balanceWei": "1000000000000000000",
  "balanceEth": "1.000000",
  "balanceFormatted": "1.000000 ETH",
  "timestamp": "2025-08-04T17:30:00.000Z",
  "hookbuilder": {
    "node": "EthereumBalance",
    "version": "1.0.0", 
    "evidence": "First custom DeFi node for HookBuilder POC"
  }
}
```

## Grant Evidence

### POC Status
- ✅ **n8n Docker Environment**: Configured and ready
- ✅ **Custom Node Framework**: EthereumBalance node implemented
- ✅ **Multi-network Support**: Mainnet, Sepolia, Polygon
- ✅ **Professional Structure**: Package.json with n8n integration
- 🔄 **Docker Testing**: Ready for local deployment
- 📋 **Workflow Testing**: Pending Docker environment

### Technical Evidence
- **Node Implementation**: 140+ lines of professional JavaScript
- **n8n Integration**: Proper node descriptor and execution logic
- **Error Handling**: Comprehensive error management
- **Multi-network**: Configurable RPC endpoints
- **Grant Tracking**: Evidence metadata in outputs

## Next Steps

### Phase 1 (Current)
- [x] Basic Ethereum balance checking
- [x] Multi-network support
- [ ] Docker environment testing
- [ ] First workflow creation

### Phase 2 (Week 2)
- [ ] PriceOracle node (CoinGecko/DeFiLlama)
- [ ] TransactionBuilder node
- [ ] Wallet connection node
- [ ] Uniswap V3/V4 interaction nodes

### Phase 3 (Week 3-4)
- [ ] Strategy template workflows
- [ ] Zapier integration
- [ ] OpenZeppelin Defender integration
- [ ] Testnet deployment automation

## Workflow Examples

### Basic Balance Monitoring
```
Trigger (Webhook) → EthereumBalance → Condition (Balance < 0.1 ETH) → Alert (Email/Slack)
```

### DeFi Strategy Automation  
```
PriceOracle → Strategy Logic → TransactionBuilder → Wallet → Execute on Testnet
```

## Documentation Links

- [n8n Custom Nodes Documentation](https://docs.n8n.io/integrations/creating-nodes/)
- [HookBuilder Architecture](../../docs/HookBuilder/Integration_Feasibility_Report.md)
- [Grant Submission Package](../../docs/grants/SUBMISSION_PACKAGE.md)