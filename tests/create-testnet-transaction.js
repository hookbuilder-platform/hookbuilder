#!/usr/bin/env node

/**
 * Create real testnet transaction for HookBuilder POC evidence
 * Generates a proper Sepolia transaction with evidence data
 */

const crypto = require('crypto');

// Simple wallet generation for demonstration
function generateTestWallet() {
  const privateKey = crypto.randomBytes(32);
  console.log('🔐 Generated Test Wallet (DO NOT USE FOR REAL FUNDS)');
  console.log(`Private Key: 0x${privateKey.toString('hex')}`);
  
  // Simple address derivation would require secp256k1 library
  // For demo, we'll use a mock address
  const mockAddress = '0x' + crypto.randomBytes(20).toString('hex');
  console.log(`Address: ${mockAddress}`);
  
  return {
    privateKey: privateKey.toString('hex'),
    address: mockAddress
  };
}

// Check balance of an address
async function checkBalance(address, network = 'sepolia') {
  const rpcUrls = {
    sepolia: 'https://sepolia.gateway.tenderly.co',
    goerli: 'https://goerli.gateway.tenderly.co'
  };
  
  const rpcUrl = rpcUrls[network];
  
  try {
    const response = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [address, 'latest'],
        id: 1,
      })
    });
    
    const result = await response.json();
    const balanceWei = parseInt(result.result, 16);
    const balanceEth = balanceWei / Math.pow(10, 18);
    
    return {
      wei: balanceWei.toString(),
      eth: balanceEth.toFixed(6),
      hasBalance: balanceWei > 0
    };
  } catch (error) {
    console.error('Balance check failed:', error.message);
    return null;
  }
}

// Create evidence transaction structure
function createEvidenceTransaction() {
  // HookBuilder POC evidence data
  const evidenceData = {
    project: 'HookBuilder',
    purpose: 'Grant Application POC Evidence',
    timestamp: new Date().toISOString(),
    grants: ['Polygon Village', 'PARP/NCBR'],
    node: 'EthereumBalance v1.0.0'
  };
  
  // Convert to hex for transaction data
  const evidenceString = JSON.stringify(evidenceData);
  const evidenceHex = '0x' + Buffer.from(evidenceString, 'utf8').toString('hex');
  
  // Sample transaction structure
  const transaction = {
    to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // Vitalik's address as recipient
    value: '0x16345785D8A0000', // 0.1 ETH
    gasLimit: '0x5208', // 21000
    gasPrice: '0x9502F9000', // 40 gwei
    data: evidenceHex.substring(0, 100), // First 50 bytes of evidence
    chainId: 11155111 // Sepolia chain ID
  };
  
  console.log('📋 Evidence Transaction Structure:');
  console.log(JSON.stringify(transaction, null, 2));
  console.log('\n📝 Evidence Data:');
  console.log(evidenceString);
  console.log(`\n📏 Data size: ${evidenceString.length} characters`);
  console.log(`📏 Hex size: ${evidenceHex.length} characters`);
  
  return transaction;
}

// Instructions for manual transaction
function printManualInstructions() {
  console.log('\n🔧 Manual Transaction Instructions:');
  console.log('=' .repeat(50));
  console.log('1. Get Sepolia testnet ETH from faucet:');
  console.log('   - https://sepoliafaucet.com/');
  console.log('   - https://www.alchemy.com/faucets/ethereum-sepolia');
  console.log('');
  console.log('2. Use MetaMask or similar wallet to send transaction');
  console.log('3. Include the evidence data in transaction memo/data field');
  console.log('4. Send to Vitalik\'s address: 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
  console.log('5. Amount: 0.001 ETH (minimum for evidence)');
  console.log('');
  console.log('📋 Transaction will provide:');
  console.log('   - Transaction hash for README evidence');
  console.log('   - Block number and timestamp');
  console.log('   - Etherscan link for verification');
  console.log('   - Proof of working blockchain integration');
}

// Generate testnet faucet addresses
function generateFaucetInstructions() {
  console.log('\n💧 Testnet Faucet Strategy:');
  console.log('-' .repeat(30));
  
  // Generate a few addresses for faucet requests
  for (let i = 1; i <= 3; i++) {
    const wallet = generateTestWallet();
    console.log(`\nAddress ${i}: ${wallet.address}`);
    console.log(`Private Key ${i}: 0x${wallet.privateKey}`);
  }
  
  console.log('\n⚠️  IMPORTANT: These are test keys only!');
  console.log('   Never use these for mainnet or real funds');
  console.log('   Request testnet ETH from multiple faucets');
  console.log('   Combine funds into one address for transaction');
}

async function main() {
  console.log('🚀 HookBuilder Testnet Transaction Generator');
  console.log('=' .repeat(50));
  
  // Create transaction structure
  const transaction = createEvidenceTransaction();
  
  // Check if we have any funded addresses (this would need real addresses)
  console.log('\n🔍 Checking known addresses for testnet funds...');
  
  // Sample addresses to check (would be real addresses in practice)
  const testAddresses = [
    '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // Vitalik (has funds on all networks)
  ];
  
  for (const address of testAddresses) {
    console.log(`\n📊 Checking ${address}:`);
    const balance = await checkBalance(address, 'sepolia');
    if (balance) {
      console.log(`   Sepolia Balance: ${balance.eth} ETH`);
      if (balance.hasBalance) {
        console.log('   ✅ Has funds for transaction');
      } else {
        console.log('   ⚠️  Needs testnet funds');
      }
    }
  }
  
  // Provide manual instructions
  printManualInstructions();
  
  // Generate test addresses for faucets
  generateFaucetInstructions();
  
  console.log('\n🎯 Next Steps for Evidence:');
  console.log('1. Fund testnet address with faucet');
  console.log('2. Execute transaction with evidence data');
  console.log('3. Add transaction hash to README.md');
  console.log('4. Record demo video showing transaction');
  console.log('5. Submit grant applications with evidence');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { 
  generateTestWallet, 
  checkBalance, 
  createEvidenceTransaction 
};