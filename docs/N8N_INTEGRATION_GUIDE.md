# N8N Integration Guide
## Connecting Existing N8N Account with HookBuilder Project

**Last Updated:** August 5, 2025  
**Contact:** hookbuilder@proton.me

---

## 🎯 **INTEGRATION STRATEGY**

### **Recommended Approach: Hybrid Development**
- **Cloud N8N**: Keep existing production workflows
- **Local N8N**: Develop new DeFi features with custom nodes
- **Sync Strategy**: Export/import refined workflows

---

## 📋 **STEP-BY-STEP INTEGRATION**

### **Phase 1: Environment Preparation (15 minutes)**

#### **1. Start HookBuilder N8N Environment**
```bash
cd "/home/solo/Desktop/no code builder/hookbuilder-new"

# Start local n8n with custom nodes:
node scripts/docker-start.js

# Verify running:
curl http://localhost:5678/healthz

# Access in browser:
# http://localhost:5678
```

#### **2. Create Workflows Directory**
```bash
# Create backup directory for workflows:
mkdir -p apps/n8n/workflows/backups
mkdir -p apps/n8n/workflows/imports  
mkdir -p apps/n8n/workflows/development
```

### **Phase 2: Export from Existing N8N (20 minutes)**

#### **1. Access Your Cloud N8N**
- Open your existing n8n instance in browser
- Navigate to workflows section

#### **2. Export Key Workflows**
```bash
For each important workflow:
1. Open workflow
2. Click "..." menu → "Download"  
3. Save as: workflow-name-YYYY-MM-DD.json
4. Store in: apps/n8n/workflows/backups/
```

#### **3. Document Integrations**
Create inventory file:
```json
{
  "existing_integrations": {
    "webhooks": ["webhook1.n8n.cloud", "webhook2.n8n.cloud"],
    "credentials": ["Gmail", "Slack", "API Keys"],
    "community_nodes": ["@n8n/n8n-nodes-package"],
    "custom_functions": ["JavaScript functions", "HTTP requests"]
  },
  "migration_priority": ["critical", "important", "optional"]
}
```

### **Phase 3: Setup Local Development (30 minutes)**

#### **1. Configure Local N8N**
```bash
# Access local n8n:
open http://localhost:5678

# First-time setup:
1. No authentication needed (development mode)
2. Skip cloud registration
3. Ready to import workflows
```

#### **2. Install Community Nodes (if needed)**
```bash
# Check what community nodes you use in cloud:
# In n8n UI: Settings → Community nodes

# Install locally if needed:
# Settings → Community nodes → Install
# Or via docker compose (add to environment)
```

#### **3. Import Workflows to Local**
```bash
# In local n8n browser interface:
1. Click "+" → "Import from file"
2. Select .json files from backups/
3. Review imported workflows
4. Test basic functionality (without credentials)
```

### **Phase 4: DeFi Node Integration (45 minutes)**

#### **1. Test Custom DeFi Nodes**
```bash
# In local n8n:
1. Create new workflow
2. Look for "HookBuilder" or "Ethereum" nodes
3. Add EthereumBalance node
4. Configure with test address
5. Execute and verify RPC data
```

#### **2. Create Hybrid Workflows**
```bash
# Example: Existing workflow + DeFi data
1. Import existing workflow
2. Add EthereumBalance node before decision logic
3. Use balance data in existing conditions
4. Test hybrid functionality
```

#### **3. Develop New DeFi Features**
```bash
# Create DeFi-specific workflows:
1. Portfolio monitoring
2. Price alerts with balance checks
3. Multi-chain balance aggregation
4. Transaction monitoring
```

### **Phase 5: Development Workflow (Ongoing)**

#### **1. Daily Development Process**
```bash
# Morning setup:
docker compose up -d  # Start local n8n
curl http://localhost:5678/healthz  # Verify health

# Development:
1. Work on DeFi features locally
2. Test with testnet data
3. Export refined workflows
4. Import to cloud for production (optional)

# Evening:
docker compose down  # Stop containers (optional)
```

#### **2. Version Control Integration**
```bash
# Save workflows to git:
cp ~/.n8n/workflows/* apps/n8n/workflows/development/
git add apps/n8n/workflows/
git commit -m "feat: Add DeFi portfolio monitoring workflow"
```

#### **3. Evidence Generation**
```bash
# For grant applications:
1. Export working workflows as evidence
2. Take screenshots of DeFi node execution
3. Document RPC integration success
4. Record demo videos showing functionality
```

---

## 🔧 **TECHNICAL CONFIGURATION**

### **Docker Compose Setup**
```yaml
# Our docker-compose.yml already configured for:
- Custom nodes mounting: ./apps/n8n/nodes:/data/custom-nodes
- Persistent data: n8n_data volume  
- No authentication (development)
- Health checks enabled
```

### **Custom Nodes Available**
```javascript
// Currently implemented:
- EthereumBalance.node.js (140+ lines)
  - Multi-network RPC support
  - Mainnet, Sepolia, Polygon
  - Professional error handling
  - Grant evidence generation

// Planned for M1-M2:
- WalletOperations.node.js
- PriceOracle.node.js  
- TransactionBuilder.node.js
- ContractInteraction.node.js
```

### **Environment Variables**
```bash
# Local n8n configuration:
N8N_BASIC_AUTH_ACTIVE=false
N8N_HOST=localhost
N8N_PORT=5678
N8N_CUSTOM_EXTENSIONS=/data/custom-nodes
N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=false
```

---

## 🎯 **MIGRATION STRATEGIES**

### **Strategy A: Progressive Migration**
1. **Week 1**: Export critical workflows, test locally
2. **Week 2**: Integrate DeFi nodes with existing logic  
3. **Week 3**: Develop new DeFi-specific workflows
4. **Week 4**: Decide on production migration

### **Strategy B: Hybrid Permanent**
1. **Cloud**: Production workflows, real data, webhooks
2. **Local**: DeFi development, testing, custom nodes
3. **Sync**: Export/import refined workflows as needed

### **Strategy C: Full Migration** 
1. **Phase 1**: Complete backup and export
2. **Phase 2**: Recreate all credentials locally
3. **Phase 3**: Update all webhook URLs
4. **Phase 4**: Test complete functionality
5. **Phase 5**: Switch DNS/routing (advanced)

---

## ⚠️ **IMPORTANT CONSIDERATIONS**

### **Security**
- **Never export credentials** - recreate them locally
- **Use environment variables** for API keys
- **Rotate webhooks** when migrating URLs
- **Test with non-production data** first

### **URLs and Webhooks**
```bash
# Cloud webhooks typically look like:
https://your-instance.n8n.cloud/webhook/xyz

# Local webhooks will be:
http://localhost:5678/webhook/xyz

# For production local deployment:
https://your-domain.com/webhook/xyz
```

### **Data Persistence**
```bash
# Local data stored in Docker volume:
docker volume inspect hookbuilder_n8n_data

# Backup strategy:
docker run --rm -v hookbuilder_n8n_data:/data -v $(pwd):/backup alpine tar czf /backup/n8n-backup.tar.gz /data
```

---

## 🚀 **NEXT STEPS**

### **Immediate Actions:**
1. **Start local n8n**: `node scripts/docker-start.js`
2. **Access UI**: http://localhost:5678
3. **Export 1-2 test workflows** from your cloud instance
4. **Import and test** in local environment
5. **Test EthereumBalance node** with real data

### **This Week:**
1. **Complete workflow inventory** (what you have in cloud)
2. **Test DeFi node integration** with existing logic
3. **Create first hybrid workflow** (existing + DeFi data)
4. **Document integration process** for grants

### **Grant Evidence:**
- **Screenshots**: Local n8n with DeFi nodes working
- **Workflows**: JSON exports showing DeFi integration
- **Video**: Demo of existing workflow + new DeFi capabilities
- **Documentation**: This integration process

---

## 📞 **SUPPORT**

**Questions?** hookbuilder@proton.me  
**Repository:** https://github.com/hookbuilder-platform/hookbuilder  
**Local n8n:** http://localhost:5678 (after docker start)

---

**Document Version:** 1.0  
**Integration Complexity:** Medium (30-60 minutes setup)  
**Recommended Approach:** Hybrid Development  
**Grant Readiness:** High (evidence generation ready)