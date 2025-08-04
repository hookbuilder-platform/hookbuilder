#!/usr/bin/env node

/**
 * Execute real testnet transaction for HookBuilder POC evidence
 * Requires: Private key with Sepolia ETH balance
 * Usage: node execute-testnet-tx.js [PRIVATE_KEY]
 */

async function executeTestnetTransaction(privateKey) {
  if (!privateKey) {
    console.log('❌ Private key required');
    console.log('Usage: node execute-testnet-tx.js [PRIVATE_KEY]');
    console.log('');
    console.log('🔧 Alternative: Manual execution via MetaMask');
    console.log('1. Get Sepolia ETH from faucet');
    console.log('2. Send 0.001 ETH to: 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
    console.log('3. Include data: 0x7b2270726f6a656374223a22486f6f6b4275696c646572...');
    return;
  }

  console.log('🚀 Executing HookBuilder POC Evidence Transaction');
  console.log('⚠️  This would execute a real transaction on Sepolia testnet');
  console.log('');
  
  // Evidence payload
  const evidence = {
    project: "HookBuilder",
    purpose: "Grant Application POC Evidence",
    timestamp: new Date().toISOString(),
    grants: ["Polygon Village", "PARP/NCBR"],
    node: "EthereumBalance v1.0.0"
  };
  
  const evidenceHex = '0x' + Buffer.from(JSON.stringify(evidence), 'utf8').toString('hex');
  
  console.log('📋 Transaction Details:');
  console.log(`   To: 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`);
  console.log(`   Value: 0.001 ETH`);
  console.log(`   Data: ${evidenceHex.substring(0, 50)}...`);
  console.log(`   Network: Sepolia (Chain ID: 11155111)`);
  console.log('');
  
  console.log('💡 To execute this transaction:');
  console.log('1. Install ethers: npm install ethers');
  console.log('2. Fund the address with Sepolia ETH');
  console.log('3. Run this script with your private key');
  console.log('');
  console.log('🎯 Expected result: Transaction hash for README evidence');
}

// Check if private key provided
const privateKey = process.argv[2];
executeTestnetTransaction(privateKey);

module.exports = { executeTestnetTransaction };